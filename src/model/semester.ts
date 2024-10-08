import { Team } from "./team";
import { Topic } from "./topic";
import { User } from "./user";

enum SemesterEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface Semester {
  id: string;
  code: string;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  status: SemesterEnum;
  createdAt: Date;
  users: User[];
  teams: Team[];
  topics: Topic[];
}
