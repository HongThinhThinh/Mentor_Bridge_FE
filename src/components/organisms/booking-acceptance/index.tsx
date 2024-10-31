import { Popconfirm, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { Column } from "../../templates/dashboard-template";
import { Button } from "../../atoms/button/Button";
import useBookingService from "../../../services/useBookingService";
import { CustomModal } from "../../molecules/modal/Modal";
import {
  formatDateAndHour,
  formatDateForRequest,
} from "../../../utils/dateFormat";
import { downloadBase64File } from "../../../utils/dowloadBase64File";

export interface BookingRecordData {
  id: string;
  topic: string;
  groupName: string;
  date: string;
  suffix?: React.ReactNode;
}

interface BookingAcceptanceProps {
  columns?: Column[];
}

function BookingAcceptance({ columns }: BookingAcceptanceProps) {
  const [dataSource, setDataSource] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { getBooking, updateBooking, loading } = useBookingService();

  const bookingColumns: Column[] = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (id: string, record: any) => (
        <img
          src={
            record?.student?.avatar || record?.team?.userTeams[0]?.user?.avatar
          }
          alt="Avatar"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Người gửi",
      dataIndex: "sender",
      key: "sender",
      render: (id: string, record: any) => (
        <div
          style={{
            padding: "8px",
            border: "1px solid #f0f0f0",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            {record?.student
              ? record.student.fullName
              : record?.team?.userTeams[0]?.user?.fullName}
          </span>
          {record?.team && (
            <div
              style={{
                marginTop: "5px",
                paddingLeft: "10px",
                fontSize: "12px",
              }}
            >
              <span style={{ display: "block", marginBottom: "4px" }}>
                Nhóm: {record?.team?.code} {/* Tên nhóm */}
              </span>
              <div>
                <p style={{ margin: "2px 0" }}>
                  Email:{" "}
                  {record?.student?.email ||
                    record?.team?.userTeams[0]?.user?.email}
                </p>
                <p style={{ margin: "2px 0" }}>
                  Điện thoại:{" "}
                  {record?.student?.phone ||
                    record?.team?.userTeams[0]?.user?.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      ),
    },

    {
      title: "Đề tài",
      dataIndex: "topic",
      key: "topic",
      render: (id: string, record: any) => {
        return <span>{record?.semester?.topics[0].name}</span>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "topic",
      key: "description", // Đã sửa lại key để tránh trùng lặp
      render: (id: string, record: any) => {
        return <span>{record?.semester?.topics[0].description}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (id: string, record: any) => (
        <span>
          {formatDateForRequest(
            record?.timeFrame?.timeFrameFrom,
            record?.timeFrame?.timeFrameTo
          )}
        </span>
      ),
    },
    {
      title: "Tài liệu nhóm",
      dataIndex: "createdAt",
      key: "document",
      render: (id: string, record: any) => (
        <a
          className="underline text-blue"
          onClick={() => {
            downloadBase64File(
              record?.semester?.topics[0].files[0].content,
              record?.semester?.topics[0].files[0].name
            );
          }}
        >
          {record?.semester?.topics[0].files[0].name}
        </a>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "actions",
      render: (id: string, record: any) => (
        <div className="flex gap-2 ">
          <Popconfirm
            title={`Giảng viên có chắc chắn muốn từ chối yêu cầu này không?`}
            onConfirm={() => handleReject(record?.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button status="none" variant="outlined" size="xs" fontSize="xs">
              Từ chối
            </Button>
          </Popconfirm>

          <Popconfirm
            title={`Giảng viên có chắc chắn muốn chấp nhận yêu cầu này không?`}
            onConfirm={() => handleApprove(record?.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button size="xs" fontSize="xs">
              Chấp nhận
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const fetchData = () => {
    getBooking(undefined, "REQUESTED")
      .then((response) => {
        setDataSource(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [columns, isFetching]);

  const handleReject = (id: string) => {
    setIsFetching(true);
    updateBooking(id, "REJECTED");
  };

  const handleApprove = (id: string) => {
    updateBooking(id, "ACCEPTED");
    setIsFetching(true);
  };

  return (
    <>
      {loading && <Spin />}

      <Table
        columns={bookingColumns}
        dataSource={dataSource}
        loading={isFetching}
      ></Table>
    </>
  );
}

export default BookingAcceptance;
