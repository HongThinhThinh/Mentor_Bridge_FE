import { Modal } from "antd";
import React, { FC, useState } from "react";
import QRCode from "react-qr-code";
import { USER_ROUTES } from "../../../constants/routes";

interface ModalQRProps {
  visible?: boolean;
  onClose: () => void;
  teamCode?: string;
}

const ModalQR: FC<ModalQRProps> = ({ visible, onClose, teamCode }) => {
  const [text, setText] = useState("https://your-link.com");
  const token = localStorage.getItem("token");

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          color: "#f46500",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        QR mời vào nhóm
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          border: "2px dashed #4A90E2",
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <QRCode
          size={300} // Đặt kích thước QR code
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`http://localhost:5173/${USER_ROUTES.TEAM_INVITE}?token=${token}&teamCode=${teamCode}`}
        />
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "16px",
          color: "#666",
          textAlign: "center",
        }}
      >
        Quét mã QR để tham gia nhóm của chúng tôi
      </p>
    </Modal>
  );
};

export default ModalQR;
