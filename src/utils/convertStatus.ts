export const convertStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Đang xử lí";
    case "deny":
      return "Bị từ chối";
    case "inactive":
      return "Được chấp nhận";
    case "requested":
      return "Đang yêu cầu ";
    case "rejected":
      return "Đã từ chối ";
    case "accepted":
      return "Đã chấp nhận";
    case "finished":
      return "Đã hoàn thành";
    default:
      return status;
  }
};

export const convertStatusEnum = (status: string): string => {
  switch (status.toUpperCase()) {
    case "REQUESTED":
      return "default";
    case "ACCEPTED":
      return "success";
    case "REJECTED":
      return "deny";
    default:
      return "Trạng thái không xác định";
  }
};
export const convertColorTag = (status: string): string => {
  switch (status.toUpperCase()) {
    case "REQUESTED":
      return "#d9d9d9";
    case "ACCEPTED":
      return "#52c41a";
    case "REJECTED":
      return "#f5222d";
    case "FINISHED":
      return "#70c7f4";
    default:
      return "#000000";
  }
};
