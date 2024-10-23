/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { Button, Form, Input, Upload, Switch, Table, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useTopicService from "../../../services/useTopicService";
import useStudentService from "../../../services/useStudentService";
import debounce from "lodash.debounce";

interface AddTopicFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => void;
}

function AddTopicForm({ isOpen, onClose, fetchData }: AddTopicFormProps) {
  const { createTopic, loading } = useTopicService();
  const { searchTeamMembers } = useStudentService();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [assignToTeam, setAssignToTeam] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [teamSearchResults, setTeamSearchResults] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);

  const onFinish = async (values: any) => {
    if (file) {
      const topicData: any = {
        name: values.name,
        description: values.description,
      };

      if (assignToTeam && selectedTeam) {
        topicData.teamId = selectedTeam.id;
      }

      await createTopic(topicData, file);
      fetchData();
      form.resetFields();
      setFile(null);
      setSelectedTeam(null);
      onClose();
    } else {
      console.error("Please upload a file.");
    }
  };

  const handleFileChange = (info: any) => {
    if (info.fileList[0].originFileObj) {
      setFile(info.fileList[0].originFileObj);
    }
  };

  const handleTeamSearch = useCallback(
    debounce(async (teamName: string) => {
      setSearchLoading(true);
      try {
        const results = await searchTeamMembers(teamName);
        console.log(results);
        setTeamSearchResults(results);
      } catch (error) {
        console.error("Error searching for teams:", error);
      } finally {
        setSearchLoading(false);
      }
    }, 300), // Adjust the debounce time as needed
    [searchTeamMembers]
  );

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team);
    setTeamSearchResults([]);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <img
          src={record.user.avatar}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Student Code",
      dataIndex: "studentCode",
      key: "studentCode",
      render: (_, record) => record.user.studentCode,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => record.user.fullName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => record.user.email,
    },
  ];

  return (
    <Modal
      width={700}
      title="Thêm đề tài mới"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên đề tài"
          name="name"
          rules={[{ required: true, message: "Please input the topic name!" }]}
        >
          <Input placeholder="Enter topic name" />
        </Form.Item>

        <Form.Item
          label="Mô tả đề tài"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Đề tài này của sinh viên">
          <Switch checked={assignToTeam} onChange={setAssignToTeam} />
        </Form.Item>

        {assignToTeam && (
          <>
            <Form.Item
              label="Tìm team theo tên"
              name="teamSearch"
              rules={[{ required: true, message: "Không bỏ trống" }]}
            >
              <Input
                placeholder="Enter team name"
                onChange={(e) => handleTeamSearch(e.target.value)}
              />
            </Form.Item>

            {teamSearchResults?.userTeams && (
              <div style={{ marginTop: 16 }}>
                <Table
                  dataSource={teamSearchResults?.userTeams}
                  columns={columns}
                  rowKey="id"
                  loading={searchLoading}
                  onRow={(record) => ({
                    onClick: () => handleTeamSelect(record.user), // Select team on row click
                  })}
                />
              </div>
            )}
          </>
        )}

        <Form.Item
          label="Upload File"
          name="file"
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Topic
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTopicForm;
