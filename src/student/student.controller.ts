import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { GetCurrentUser } from 'src/auth/common/decorators';
import { StudentDto } from './dto';
import { StudentService } from './student.service';
import { SignupDto } from 'src/auth/dto';

@Controller('v1')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('getStudent/:matricNumber')
  @HttpCode(HttpStatus.OK)
  getStudent(@Param('id') matricNumber: string): Promise<StudentDto> {
    return this.studentService.getStudent(matricNumber);
  }

  @Get('getMe')
  @HttpCode(HttpStatus.OK)
  getMe(@GetCurrentUser('sub') userId: string): Promise<StudentDto> {
    return this.studentService.getMe(userId);
  }

  @Get('getAllStudent')
  @HttpCode(HttpStatus.OK)
  getAllStudent(): Promise<StudentDto[]> {
    return this.studentService.getAllStudent();
  }

  @Post('createStudent')
  @HttpCode(HttpStatus.CREATED)
  createStudent(@Body() stdInfo: SignupDto) {
    return this.studentService.createStudent(stdInfo);
  }

  @Post('updateStudent/:id')
  @HttpCode(HttpStatus.CREATED)
  updateStudent(@Param('id') id: string, @Body() stdInfo: StudentDto) {
    return this.studentService.updateStudent(id, stdInfo);
  }
}
