import moment from "moment";

export const formatDateToDDMMYY = (date: Date | string): string => {
  return moment(date).format("DD-MM-YYYY");
};

export const formatHours = (date: Date | string): string => {
  return moment(date).format("HH:mm");
};
