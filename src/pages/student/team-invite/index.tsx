import React, { useState, useEffect } from "react";
import { Result, Typography, Avatar, Space, Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "../../../components/atoms/button/Button";
import Confetti from "react-confetti";
import Logo from "../../../assets/logo.svg";

const { Text, Title } = Typography;

const TeamInvitePage = () => {
  const [response, setResponse] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const groupName = "Mentor Bridge";
  const leaderName = "Hong Thinh";
  const leaderAvatar =
    "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/294230453_1016043015773433_1076043979386053547_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGuDm2_Slkddrs5wmTwFcNEUymdH7-wMqNTKZ0fv7Ayox1sNsF84wgu1NAryHfPpJJSU7Cpz5fRgUypqObBnfiN&_nc_ohc=EaqzAKr2FD4Q7kNvgGKcZvI&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=AJAHblOpSzfGkU-e_9RkEb_&oh=00_AYDRNVzuex9VJkneWcRuZjwk6_i4vV2abBHy5OGfqXSwFQ&oe=671B0AC0";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const handleAccept = () => {
    setResponse("accepted");
    setShowConfetti(true);
  };

  const handleDecline = () => {
    setResponse("declined");
  };

  if (response === "accepted") {
    return (
      <>
        {showConfetti && (
          <Confetti
            width={windowSize?.width}
            height={windowSize?.height}
            recycle={false}
            numberOfPieces={200}
          />
        )}
        <Result
          icon={
            <CheckCircleOutlined
              style={{ fontSize: "72px", color: "#52c41a" }}
            />
          }
          title={
            <h1 style={{ color: "#52c41a", fontSize: "32px" }}>
              Bạn đã chấp nhận lời mời!
            </h1>
          }
          subTitle={`Chào mừng bạn đến với nhóm ${groupName}, hãy bắt đầu hành trình mới của mình.`}
          extra={<Button>Vào nhóm ngay</Button>}
        />
      </>
    );
  }

  if (response === "declined") {
    return (
      <Result
        icon={
          <CloseCircleOutlined style={{ fontSize: "72px", color: "#ff4d4f" }} />
        }
        title={
          <h1 style={{ color: "#ff4d4f", fontSize: "32px" }}>
            Bạn đã từ chối lời mời
          </h1>
        }
        subTitle="Lời mời của bạn đã bị từ chối. Nếu thay đổi quyết định, hãy liên hệ với quản trị viên."
        extra={<Button>Quay về trang chủ</Button>}
      />
    );
  }

  return (
    <Card
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        backgroundSize: "cover",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Result
        icon={
          <div className="flex items-center  justify-center">
            <img src={Logo} alt="Logo" />
          </div>
        }
        title={<Title level={2}>Bạn được mời vào nhóm {groupName}</Title>}
        subTitle={
          <>
            <Text>
              Bạn có muốn tham gia nhóm này cùng đồng đội của mình không?
            </Text>
            <div style={{ marginTop: "16px" }}>
              <Space align="center">
                <Avatar size={64} src={leaderAvatar} />
                <div>
                  <Text strong>Leader:</Text>
                  <Text>{` ${leaderName}`}</Text>
                </div>
              </Space>
            </div>
          </>
        }
        extra={
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <Button
              status="success"
              onClick={handleAccept}
            >
            <CheckCircleOutlined /> Đồng ý
            </Button>
            <Button
              status="date"
              onClick={handleDecline}
            >
              <CheckCircleOutlined /> Từ chối
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default TeamInvitePage;