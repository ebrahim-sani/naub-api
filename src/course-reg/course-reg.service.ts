import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CoursesDto, CourseRegDto, UpdateCourseRegDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseRegService {
  constructor(private prisma: PrismaService) {}

  async createCourseReg(
    userId: string,
    coursesInfo: CourseRegDto,
    courses: CoursesDto[],
  ): Promise<CourseRegDto> {
    try {
      const courseReg = await this.prisma.registerCourse.create({
        data: {
          studentId: userId,
          level: coursesInfo.level,
          semester: coursesInfo.semester,
          session: coursesInfo.session,
          CourseRegisteration: {
            create: courses,
          },
        },
        select: {
          id: true,
          level: true,
          registeredTime: true,
          semester: true,
          session: true,
          studentId: true,
          CourseRegisteration: true,
        },
      });
      return courseReg;
    } catch (error) {
      throw error;
    }
  }

  async updateCourseReg(
    userId: string,
    courseRegId: string,
    dto: UpdateCourseRegDto,
  ) {
    try {
      const courseReg = await this.prisma.registerCourse.findUnique({
        where: { id: courseRegId },
      });

      if (!courseReg)
        throw new ForbiddenException('Could not find the course!');

      if (courseReg.studentId !== userId)
        throw new ForbiddenException('Not authorized!');

      const res = await this.prisma.registerCourse.update({
        where: { id: courseRegId },
        data: {
          studentId: userId,
          level: dto.level,
          semester: dto.semester,
          session: dto.session,
          CourseRegisteration: {
            deleteMany: {},
            createMany: {
              data: dto.courses.map((course) => ({
                id: course.id,
                courseId: course.courseId,
                courseCode: course.courseCode,
                courseTitle: course.courseTitle,
                department: course.department,
                level: course.level,
                unit: course.unit,
                courseStatus: course.courseStatus,
                preReq: course.preReq,
              })),
            },
          },
        },
        include: { CourseRegisteration: true },
      });

      return res;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ConflictException('Duplicate registration exists!');
          default:
            throw new BadRequestException(
              'Failed to update course registration!',
            );
        }
      } else {
        throw new InternalServerErrorException('An unexpected error occurred!');
      }
    }
  }
}
