// ADMIN
export enum ADMIN_API {
  ADMIN = "admin",
  UPLOADCSV = "admin/upload-csv",
}

//USER
export enum USER_API {
  LOGIN_GOOGLE = "login-google",
  REGISTER = "register",
  LOGIN = "login",
}
//SEMESTER
export enum SEMESTER_API {
  SEMESTER = "semester",
}
export enum CONFIG_API {
  CONFIG = "config",
}
//TOPIC
export enum TOPIC_API {
  TOPIC = "topic",
  TOPIC_REJECT = "topic/rejected",
  TOPIC_ACCEPTED = "topic/accepted",
}
export enum SCHEDULE_API {
  SCHEDULE = "schedule",
  SCHEDULE_VALIDATE = "schedule/validate",
}
export enum BOOKING_API {
  BOOKING = "booking",
  MENTOR_MEETING = "booking/mentor-meeting",
}

export enum TEAM_API {
  TEAM = "team",
  INVITE = "invite",
}
