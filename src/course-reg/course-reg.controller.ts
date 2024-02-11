import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/auth/common/decorators';
import { CoursesDto, CourseRegDto, UpdateCourseRegDto } from './dto';
import { CourseRegService } from './course-reg.service';

@Controller('v1')
export class CourseRegController {
  constructor(private courseRegService: CourseRegService) {}
  @Post('course-reg')
  @HttpCode(HttpStatus.CREATED)
  createCourseReg(
    @GetCurrentUser('sub') userId: string,
    @Body()
    requestBody: {
      coursesInfo: CourseRegDto;
      courses: CoursesDto[];
    },
  ): Promise<CourseRegDto> {
    const { courses, coursesInfo } = requestBody;
    return this.courseRegService.createCourseReg(userId, coursesInfo, courses);
  }

  @Patch('update-course-reg/:id')
  @HttpCode(HttpStatus.OK)
  updateCourseReg(
    @GetCurrentUser('sub') userId: string,
    @Param('id') courseRegId: string,
    @Body() dto: UpdateCourseRegDto,
  ) {
    return this.courseRegService.updateCourseReg(userId, courseRegId, dto);
  }
}
