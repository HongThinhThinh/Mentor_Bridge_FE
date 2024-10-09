import { Semester } from "./semester";
import { Topic } from "./topic";

enum RoleEnum {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
  // Add other roles as needed
}

export interface User {
  id: string; // UUID as string
  fullName: string;
  studentCode: string;
  gender: string;
  dayOfBirth: string;
  phone: string;
  address: string;
  email: string;
  avatar: string;
  username: string;
  password: string;
  role: RoleEnum;
  semesters: Semester[];
  topics: Topic[];
}
