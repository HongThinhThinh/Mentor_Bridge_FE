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
