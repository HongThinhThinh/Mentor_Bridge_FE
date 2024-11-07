export const convertStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Đang xử lí";
    case "deny":
      return "Bị từ chối";
    case "active":
      return "Đã có nhóm chọn";
    // return "Đang hoạt động";
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
    case "pending_reschedule":
      return "Đang đợi dời lịch";
    case "rescheduled":
      return "Đã dời lịch";
    case "approved":
      return "Chưa có nhóm chọn";
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
      return "#D43900";
    case "FINISHED":
      return "#70c7f4";
    default:
      return "#000000";
  }
};

export const convertTeamType = (status: string): string => {
  switch (status.toUpperCase()) {
    case "INDIVIDUAL":
      return "Cá nhân";
    case "TEAM":
      return "Nhóm";
    default:
      return "Trống";
  }
};

export const convertPointChangeType = (status: string): string => {
  switch (status.toUpperCase()) {
    case "DEDUCTION":
      return "Khấu trừ";
    case "REFUND":
      return "Hoàn điểm";
    default:
      return "Trống";
  }
};
