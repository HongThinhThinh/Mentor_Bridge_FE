import { Table } from "antd";
import { useEffect, useState } from "react";
import { Column } from "../../templates/dashboard-template";
import { bookingMentorDummyData } from "../../../dummy-data/booking-dummy-data";
import { Button } from "../../atoms/button/Button";

export interface BookingRecordData {
    id: string;
    topic: string;
    groupName: string;
    date: string; // Adjust types as necessary
    suffix?: React.ReactNode; // Adjust types as necessary
}

interface BookingAcceptanceProps {
    columns?: Column[];
}

const bookingColumns: Column[] = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Topic",
        dataIndex: "topic",
        key: "topic",
    },
    {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
];

function BookingAcceptance({
    columns
}: BookingAcceptanceProps) {
    const [dataSource, setDataSource] = useState<BookingRecordData[]>(bookingMentorDummyData);
    const [isFetching, setIsFetching] = useState(false);
    const [tableColumns, setTableColumns] = useState<Column[]>(bookingColumns);

    const BookingSuffix = () => (<div className="flex gap-2">
        <Button>Từ chối</Button>
        <Button>Chấp nhận</Button>
    </div>)

    useEffect(() => {
        const newColumns: Column[] = [
            ...tableColumns,
            {
                title: "",
                dataIndex: "id",
                key: "id",
                render: (id: string, record: any) => (
                    <div className="flex gap-2 float-end">
                        <Button status="none" variant="outlined" size="xs" fontSize="xs">Từ chối</Button>
                        <Button size="xs" fontSize="xs">Chấp nhận</Button>
                    </div>
                ),
            },
        ];
        setTableColumns(newColumns);
    }, [columns]);



    return (
        <>
            <Table columns={tableColumns} dataSource={dataSource} loading={isFetching}></Table>
        </>
    );
}

export default BookingAcceptance;
