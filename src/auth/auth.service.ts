import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signin(dto: AuthDto): Promise<Tokens> {
    // check if there is user with this id
    const std = await this.prisma.student.findUnique({
      where: {
        matricNumber: dto.matricNumber,
      },
    });

    if (!std) throw new ForbiddenException('Creditials error.');

    const pswMatch = await bcrypt.compare(dto.password, std.hash);
    if (!pswMatch) throw new ForbiddenException('Credentials error pass');

    // signeToken for the user
    const tokens = await this.signedToken(std.id, std.matricNumber);
    await this.updateHash(std.id, tokens.refreshToken);
    return tokens;
  }

  async signup(dto: SignupDto): Promise<Tokens> {
    try {
      const hash = await bcrypt.hash(dto.password, 11);
      const std = await this.prisma.student.create({
        data: {
          matricNumber: dto.matricNumber,
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

  async refreshToken(userId: string, rToken: string): Promise<Tokens> {
    const user = await this.prisma.student.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.rToken)
      throw new ForbiddenException('Access denied std!');

    const rtMatch = await bcrypt.compare(rToken, user.rToken);
    if (!rtMatch) throw new ForbiddenException('Access denied rt!');

    const tokens = await this.signedToken(user.id, user.matricNumber);
    await this.updateHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.student.updateMany({
      where: {
        id: userId,
        rToken: {
          not: null,
        },
      },
      data: {
        rToken: null,
      },
    });
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
          expiresIn: 60 * 30,
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
