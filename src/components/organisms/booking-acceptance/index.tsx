import { Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { Column } from "../../templates/dashboard-template";
import { Button } from "../../atoms/button/Button";
import useBookingService from "../../../services/useBookingService";
import { CustomModal } from "../../molecules/modal/Modal";

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
  const [isOpenCancelModel, setIsOpenCancelModel] = useState(false);

  const { getBooking, updateBooking } = useBookingService();

  const bookingColumns: Column[] = [
    {
      title: "Người gửi",
      dataIndex: "sender",
      key: "sender",
      render: (id: string, record: any) => (
        <span>
          {record?.student
            ? record.student.fullName
            : record?.team?.userTeams[0]?.user?.fullName}
        </span>
      ),
    },
    {
      title: "Đề tài",
      dataIndex: "topic",
      key: "topic",
      render: (id: string, record: any) => (
        <span>{record?.team?.topics[0]?.name}</span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (id: string, record: any) => <span>{record?.createdAt}</span>,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id: string, record: any) => (
        <div className="flex gap-2 float-end">
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
        console.log(response);
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
      <Table
        columns={bookingColumns}
        dataSource={dataSource}
        loading={isFetching}
      ></Table>
    </>
  );
}

export default BookingAcceptance;
