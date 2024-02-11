import { CoursesDto } from './course-reg.dto';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateCourseRegDto {
  @IsString()
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  semester?: string;

  @IsString()
  @IsOptional()
  session?: string;

  @IsArray()
  @IsOptional()
  courses?: CoursesDto[];
}
