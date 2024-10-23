import { Semester } from "./semester";
import { Team } from "./team";
import { User } from "./user";

export interface Topic {
  id: string; // UUID as a string
  name: string;
  description: string;
  createdAt: string; // ISO date string for LocalDateTime
  team?: Team; // Optional because of @JsonIgnore in Java
  status: TopicEnum; // Enum type for status
  creator: User;
  semester?: Semester; // Optional because of @JsonIgnore in Java
  files: File[];
}

export enum TopicEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  // add other enum values as needed
}
