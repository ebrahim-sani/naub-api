import { Module } from '@nestjs/common';
import { CourseRegController } from './course-reg.controller';
import { CourseRegService } from './course-reg.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseRegController],
  providers: [CourseRegService],
})
export class CourseRegModule {}
