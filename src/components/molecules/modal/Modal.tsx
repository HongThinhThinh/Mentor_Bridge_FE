import { Modal } from "antd";
import { HeaderDetail } from "./Modal.stories";
import { useState } from "react";

export interface ModalProps {
  header: string;
  headerDetail?: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  isOpen?: boolean;

  onCancel?: () => void;
}

/** Primary UI component for user interaction */
export const CustomModal = ({
  header,
  headerDetail,
  body,
  footer,
  isOpen,
  onCancel,

  // onClose,
  ...props
}: ModalProps) => {
  

  return (
    <>
      <Modal
        title={
          <div>
            <p>{header}</p>
            {headerDetail && (
              <p
                className="bg-gradient-to-b from-[#FF6001] to-[#ff9759] 
              w-[80px] h-[30px] text-xs-medium text-white rounded-full flex justify-center items-center"
              >
                {headerDetail}
              </p>
            )}
          </div>
        }
        open={isOpen}
        footer={footer}
        width={610}
        onCancel={onCancel}
        {...props}
      >
        {body}
      </Modal>
    </>
  );
};
