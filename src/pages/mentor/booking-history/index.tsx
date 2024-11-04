import React, { useEffect, useState } from "react";
import { Card, Typography, Collapse, Steps, Tag, Avatar, Select } from "antd";
import useBookingService from "../../../services/useBookingService";
import { formatDateAndHour } from "../../../utils/dateFormat";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import { Role } from "../../../constants/role";
import { convertColorTag, convertStatus } from "../../../utils/convertStatus";
import { Button } from "../../../components/atoms/button/Button";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Step } = Steps;
const { Option } = Select;

const BookingDetailCard = ({ title, children }) => (
  <Card style={{ marginBottom: 16 }}>
    <Text strong>{title}</Text>
    <div>{children}</div>
  </Card>
);

const TreeBookingDetail = ({ booking }) => {
  const user = useCurrentUser();
  return (
    <Collapse bordered={false} style={{ marginBottom: 16 }}>
      <Panel header={"Xem chi tiết"} key={booking.id}>
        <BookingDetailCard title="Lịch sử đặt chỗ">
          <Steps direction="vertical" current={0}>
            {booking.bookingHistories.map((history) => (
              <Step
                key={history?.id}
                title={convertStatus(history?.type)}
                description={`Vào lúc: ${new Date(
                  history?.createdAt
                ).toLocaleString()}`}
              />
            ))}
          </Steps>
        </BookingDetailCard>

        <BookingDetailCard title={`Loại: ${booking.type}`}>
          <Text strong>Liên kết cuộc họp:</Text>
          <a
            href={booking.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff" }}
          >
            {booking.meetLink}
          </a>
          <br />
        </BookingDetailCard>

        {user?.role === Role.STUDENT ? (
          <BookingDetailCard title="Thông tin sinh viên">
            <Text type="secondary">Tên: {booking?.student?.fullName}</Text>
            <br />
            <Text type="secondary">Mã: {booking?.student?.studentCode}</Text>
            <br />
            <Text type="secondary">Email: {booking?.student?.email}</Text>
          </BookingDetailCard>
        ) : (
          <BookingDetailCard title="Thông tin kỳ học">
            <Text type="secondary">Mã: {booking?.semester?.code}</Text>
            <br />
            <Text type="secondary">Tên: {booking?.semester?.name}</Text>
            <br />
            <Text type="secondary">
              Trạng thái: {booking?.semester?.status}
            </Text>
          </BookingDetailCard>
        )}
      </Panel>
    </Collapse>
  );
};

const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { getBooking } = useBookingService();
  const user = useCurrentUser();

  const fetch = async () => {
    try {
      const response = await getBooking();
      console.log(response);
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    if (value) {
      setFilteredData(data.filter((booking) => booking.status === value));
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <Select
        placeholder="Chọn trạng thái"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleStatusChange}
        value={selectedStatus}
      >
        <Option value="">Tất cả</Option>
        <Option value="REQUESTED">Yêu cầu</Option>
        <Option value="ACCEPTED">Chấp nhận</Option>
        <Option value="REJECTED">Từ chối</Option>
        <Option value="CANCELLED">Hủy</Option>
        <Option value="RESCHEDULED">Đặt lại lịch</Option>
        <Option value="PENDING_RESCHEDULE">Đang chờ đặt lại lịch</Option>
        <Option value="RESCHEDULE_REJECTED">Đặt lại lịch bị từ chối</Option>
        <Option value="FINISHED">Hoàn thành</Option>
      </Select>

      {filteredData
        ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
        .map((booking) => (
          <Card className="mb-3" key={booking?.id}>
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              }
              title={
                <>
                  <p>Mã cuộc họp: {booking?.id}</p>
                  {user?.role === Role.STUDENT ? (
                    <p>Cuộc họp với Mentor: {booking?.mentor?.fullName}</p>
                  ) : (
                    <p>
                      Cuộc họp với:{" "}
                      {booking?.team != null
                        ? "Nhóm " + booking?.team?.code
                        : booking?.student?.fullName}
                    </p>
                  )}
                </>
              }
              description={
                <>
                  <Tag color={convertColorTag(booking?.status)}>
                    {convertStatus(booking?.status)}
                  </Tag>
                  <p className="my-2">
                    <strong>Ngày tạo</strong>:{" "}
                    {formatDateAndHour(booking?.createdAt)}
                  </p>
                  <BookingDetailCard title="Khung thời gian">
                    <Text type="secondary">
                      Từ:{" "}
                      {new Date(
                        booking?.timeFrame?.timeFrameFrom
                      ).toLocaleString()}
                    </Text>
                    <br />
                    <Text type="secondary">
                      Đến:{" "}
                      {new Date(
                        booking?.timeFrame?.timeFrameTo
                      ).toLocaleString()}
                    </Text>
                  </BookingDetailCard>
                </>
              }
            />
            <TreeBookingDetail booking={booking} />
          </Card>
        ))}
    </div>
  );
};

export default BookingHistory;
