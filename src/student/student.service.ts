import { ForbiddenException, Injectable } from '@nestjs/common';
import { StudentDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Tokens } from 'src/auth/types';
import { UrlWithStringQuery } from 'url';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getMe(userId: string): Promise<StudentDto> {
    try {
      const std = await this.prisma.student.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          matricNumber: true,
        },
      });
      return std;
    } catch (error) {
      console.log(error);
    }
  }

  async getStudent(matricNumber: string): Promise<StudentDto> {
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          matricNumber: matricNumber,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          matricNumber: true,
        },
      });
      return student;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllStudent(): Promise<StudentDto[]> {
    try {
      const all_students = await this.prisma.student.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          matricNumber: true,
        },
      });
      return all_students;
    } catch (error) {
      console.log(error);
    }
  }
  async createStudent(stdInfo: SignupDto) {
    try {
      const hash = await bcrypt.hash(stdInfo.password, 11);
      const std = await this.prisma.student.create({
        data: {
          matricNumber: stdInfo.matricNumber,
          hash,
        },
      });

      const tokens = await this.signedToken(std.id, std.matricNumber);
      await this.updateHash(std.id, tokens.refreshToken);
      return tokens;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Crdentials taken by another user!');
        }
        console.log(e);
      }
    }
  }
  async updateStudent(id: string, stdInfo: StudentDto) {
    try {
      const user = await this.prisma.student.update({
        where: {
          id,
        },
        data: {
          ...stdInfo,
        },
        select: {
          firstName: true,
          id: true,
          lastName: true,
          matricNumber: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateHash(userId: string, rToken: string) {
    const hash = await bcrypt.hash(rToken, 11);
    await this.prisma.student.update({
      where: {
        id: userId,
      },
      data: {
        rToken: hash,
      },
    });
  }

  async signedToken(userId: string, matric_number: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          matric_number,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 16,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          matric_number,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
