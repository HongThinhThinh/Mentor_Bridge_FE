import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Collapse,
  Steps,
  Tag,
  Avatar,
  Select,
  Popconfirm,
  Modal,
} from "antd";
import useBookingService from "../../../services/useBookingService";
import { formatDateAndHour } from "../../../utils/dateFormat";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import { Role } from "../../../constants/role";
import { convertColorTag, convertStatus } from "../../../utils/convertStatus";
import { Button } from "../../../components/atoms/button/Button";
import useGetParams from "../../../hooks/useGetParams";
import { User } from "../../../model/user";
import { useNavigate } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import { bookingHistoryDummyData } from "../../../dummy-data/booking-dummy-data";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Step } = Steps;
const { Option } = Select;

const BookingDetailCard = ({ title, children }) => (
  <div style={{ marginBottom: 16 }}>
    <Text strong>{title}</Text>
    <div>{children}</div>
  </div>
);

const TreeBookingDetail = ({ booking }) => {
  console.log(booking.status);
  const user = useCurrentUser();
  return (
    <Collapse bordered={false}>
      <Panel header={"Xem chi tiết"} key={booking.id}>
        <BookingDetailCard title="Lịch sử đặt chỗ">
          <Steps
            direction="vertical"
            current={booking.bookingHistories.length - 1}
            className="pt-4"
          >
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

        <BookingDetailCard
          title={`Loại: ${
            booking.type == "INDIVIDUAL" ? "Cuộc họp cá nhân" : "Cuộc họp nhóm"
          }`}
        >
          {booking?.status == "REQUESTED" ? null : (
            <>
              <Text strong>Liên kết cuộc họp: </Text>
              <a
                href={booking.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1890ff" }}
              >
                {booking.meetLink}
              </a>
            </>
          )}

          <br />
        </BookingDetailCard>
        {user?.role === Role.STUDENT ? (
          <BookingDetailCard title="Thông tin giảng viên">
            <Text type="secondary">Tên: {booking?.mentor?.fullName}</Text>
            <br />
            <Text type="secondary">Mã: {booking?.mentor?.studentCode}</Text>
            <br />
            <Text type="secondary">Email: {booking?.mentor?.email}</Text>
          </BookingDetailCard>
        ) : (
          <BookingDetailCard title="Thông tin nhóm: ">
            {booking?.team != null ? (
              <>
                <Text type="secondary">Mã nhóm: {booking?.team?.code}</Text>
                <br />
                <Text type="secondary">
                  Số lượng thành viên: {booking?.team?.userTeams?.length}
                </Text>
              </>
            ) : (
              <>
                <Text type="secondary">Tên: {booking?.student?.fullName}</Text>
                <br />
                <Text type="secondary">
                  Mã: {booking?.student?.studentCode}
                </Text>
                <br />
                <Text type="secondary">Email: {booking?.student?.email}</Text>
              </>
            )}
          </BookingDetailCard>
        )}

        <BookingDetailCard title="Thông tin kỳ học">
          <Text type="secondary">Mã: {booking?.semester?.code}</Text>
          <br />
          <Text type="secondary">Tên: {booking?.semester?.name}</Text>
          <br />
          <Text type="secondary">Trạng thái: {booking?.semester?.status}</Text>
        </BookingDetailCard>
      </Panel>
    </Collapse>
  );
};

const BookingHistory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { getBooking, makeBookingCompleted, getBookingDetails } =
    useBookingService();
  const user = useCurrentUser();
  const params = useGetParams();
  const idBooking = params("bookingId");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [leader, setLeader] = useState<User>();
  const fetchBookingDetails = async () => {
    try {
      const response = await getBookingDetails(idBooking);
      console.log(response);
      const leader = response?.userTeams?.find(
        (member) => member?.role === "LEADER"
      );
      setLeader(leader);
      setBookingDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (idBooking) {
      setShow(true);
      fetchBookingDetails();
    }
  }, []);
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
      <Modal footer={null} open={show} onCancel={() => setShow(false)}>
        <Card style={{ width: 300 }}>
          {bookingDetails?.team == null ? (
            <Card.Meta
              avatar={<Avatar src={bookingDetails?.student?.avatar} />}
              title={bookingDetails?.student?.fullName}
              description={
                <>
                  <p>
                    <strong>Mã sinh viên: </strong>
                    {bookingDetails?.student?.studentCode}
                  </p>

                  <p>
                    <strong>Email : </strong> {bookingDetails?.student?.email}
                  </p>
                  <p>
                    <strong>Số điện thoại</strong>:{" "}
                    {bookingDetails?.student?.phone}
                  </p>
                </>
              }
            />
          ) : (
            <Card.Meta
              avatar={
                <Avatar
                  src={
                    "https://e7.pngegg.com/pngimages/364/836/png-clipart-computer-icons-users-group-others.png"
                  }
                />
              }
              title={bookingDetails?.team?.code}
              description={
                <>
                  <p>
                    <strong>Mã sinh viên nhóm trưởng: </strong>
                    {leader?.studentCode}
                  </p>

                  <p>
                    <strong>Email : </strong> {leader?.email}
                  </p>
                  <p>
                    <strong>Số điện thoại</strong>: {leader?.phone}
                  </p>
                </>
              }
            />
          )}
          <div style={{ marginTop: "16px" }}>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(bookingDetails?.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-end">
            <Popconfirm
              title="Bạn có chắc là đã tham gia cuộc họp này rồi chứ ?"
              onConfirm={() => {
                makeBookingCompleted(bookingDetails?.id);
                navigate("/mentor/booking-history");
                setShow(false);
              }}
            >
              <IoMdDoneAll
                style={{
                  fontSize: 24,
                  color: "#52c41a",
                  cursor: "pointer",
                  marginLeft: 8,
                }}
              />
            </Popconfirm>
          </div>
        </Card>
      </Modal>

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
        <Option value="FINISHED">Hoàn thành</Option>
        <Option value="RESCHEDULED">Đặt lại lịch</Option>
        <Option value="PENDING_RESCHEDULE">Đang chờ đặt lại lịch</Option>
        <Option value="RESCHEDULE_REJECTED">Đặt lại lịch bị từ chối</Option>
        <Option value="FINISHED">Hoàn thành</Option>
      </Select>

      {filteredData
        ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
        .map((booking) => (
          <Card className="pt-3 mb-3" key={booking?.id}>
            <Card.Meta
              title={
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    <p className="flex justify-between">
                      <Button
                        fontSize="xs"
                        fontWeight="book"
                        size="xxs"
                        status="none"
                        variant="outlined"
                      >
                        {booking?.id}
                      </Button>
                      {booking?.timeFrame?.timeFrameStatus === "COMPLETED" &&
                        booking?.status !== "FINISHED" &&
                        user?.role === Role.MENTOR && (
                          <Popconfirm
                            title="Bạn có chắc là đã tham gia cuộc họp này rồi chứ ?"
                            onConfirm={() => makeBookingCompleted(booking?.id)}
                          >
                            <Button variant="frosted-glass" status="date">
                              Đánh dấu hoàn thành
                            </Button>
                          </Popconfirm>
                        )}
                    </p>
                  </div>

                  {user?.role === Role.STUDENT ? (
                    <Button
                      fontSize="xs"
                      fontWeight="book"
                      size="xxs"
                      status="none"
                      variant="outlined"
                    >
                      <p>Cuộc họp với Mentor: {booking?.mentor?.fullName}</p>
                    </Button>
                  ) : (
                    <Button
                      fontSize="xs"
                      fontWeight="book"
                      size="xxs"
                      status="none"
                      variant="outlined"
                    >
                      <p>
                        Cuộc họp với:{" "}
                        {booking?.team != null
                          ? "Nhóm " + booking?.team?.code
                          : booking?.student?.fullName}
                      </p>
                    </Button>
                  )}
                </div>
              }
              description={
                <>
                  <Button
                    fontSize="xs"
                    fontWeight="book"
                    size="xxs"
                    status="none"
                    styles={{ background: convertColorTag(booking?.status) }}
                  >
                    {convertStatus(booking?.status)}
                  </Button>
                  <p className="my-2 text-sm-book">
                    <strong className="text-black text-sm-medium">
                      Ngày tạo
                    </strong>
                    : {formatDateAndHour(booking?.createdAt)}
                  </p>
                  <BookingDetailCard
                    title={
                      <strong className="text-black text-sm-medium">
                        Khung giờ
                      </strong>
                    }
                  >
                    <Text type="secondary" className="text-sm-book">
                      Từ:{" "}
                      {new Date(
                        booking?.timeFrame?.timeFrameFrom
                      ).toLocaleString()}
                    </Text>
                    <br />
                    <Text type="secondary" className="text-sm-book">
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
