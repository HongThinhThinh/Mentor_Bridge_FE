import moment from "moment";

export const formatDateToDDMMYY = (date: Date | string): string => {
  return moment(date).format("DD-MM-YYYY");
};

export const formatHours = (date: Date | string): string => {
  return moment(date).format("HH:mm");
};

export const formatDateAndHour = (date: Date | string): string => {
  return ` ${moment(date).format("HH[h]mm[ phút ]")}   -   ${moment(
    date
  ).format("DD [tháng] MM [năm] YYYY")}   `;
};

export const formatDateForRequest = (
  dateFrom: Date | string,
  dateTo: Date | string
): string => {
  const formattedTimeFrom = moment(dateFrom).format("HH:mm");
  const formattedTimeTo = moment(dateTo).format("HH:mm");
  const formattedDate = moment(dateFrom).format("DD [tháng] MM [năm] YYYY");
  return `${formattedTimeFrom} - ${formattedTimeTo} ngày ${formattedDate}`;
};
