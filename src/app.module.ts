import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './auth/common/guards';
import { StudentModule } from './student/student.module';
import { CourseRegModule } from './course-reg/course-reg.module';

@Module({
  imports: [AuthModule, PrismaModule, StudentModule, CourseRegModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
