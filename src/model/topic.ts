import { Semester } from "./semester";
import { Team } from "./team";
import { User } from "./user";

export interface Topic {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  team?: Team;
  status: TopicEnum;
  creator: User;
  semester?: Semester;
  files: File[];
}

export enum TopicEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}
