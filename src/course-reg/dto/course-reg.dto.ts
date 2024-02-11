export class CoursesDto {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  level: string;
  unit: string;
  courseStatus: string;
  preReq?: string;
  registerCourseId?: string;
}

export class CourseRegDto {
  id: string;
  semester: string;
  session: string;
  level: string;
  CourseRegisteration: CoursesDto[];
}
