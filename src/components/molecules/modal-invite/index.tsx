/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, Input, Button, Table, Spin, Popconfirm } from "antd";
import useStudentService from "../../../services/useStudentService";
import { User } from "../../../model/user";

interface ModalInviteProps {
  visible: boolean;
  onClose: () => void;
}

const ModalInvite: React.FC<ModalInviteProps> = ({ visible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { loading, searchTeamMembers, inviteToGroup } = useStudentService();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm) {
        setIsSearching(true);
        const results = await searchTeamMembers(searchTerm);
        setSearchResults(results?.content || []);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, searchTeamMembers]);

  const handleInvite = async (member: User) => {
    const email = member.email;
    try {
      await inviteToGroup(email);
      console.log("Invited teammate:", member);
    } catch (error) {
      console.error("Error inviting teammate:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img
          src={avatar}
          alt="Avatar"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentCode",
      key: "studentCode",
      width: 120,
      sorter: (a: User, b: User) => a.studentCode.localeCompare(b.studentCode),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      sorter: (a: User, b: User) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dayOfBirth",
      key: "dayOfBirth",
      width: 120,
      sorter: (a: User, b: User) =>
        new Date(a.dayOfBirth).getTime() - new Date(b.dayOfBirth).getTime(),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      sorter: (a: User, b: User) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, member: User) => (
        <Popconfirm
          title={`Bạn có chắc chắn muốn mời ${member.fullName} không?`}
          onConfirm={() => handleInvite(member)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary">Mời</Button>
        </Popconfirm>
      ),
      width: 100,
    },
  ];

  return (
    <Modal
      title="Mời thành viên"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <Input
        placeholder="Tìm kiếm thành viên theo tên, email hoặc mã số sinh viên"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4">
        {isSearching || loading ? (
          <Spin />
        ) : (
          <Table
            dataSource={searchResults}
            columns={columns}
            rowKey="studentCode"
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalInvite;
