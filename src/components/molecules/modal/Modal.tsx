import { Form, Modal } from "antd";

export interface ModalProps {
  header: string;
  headerDetail?: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  width?: number;
  isOpen?: boolean;
  onCancel?: () => void;
  onFinish?: (values: any) => void;
}

/** Primary UI component for user interaction */
export const CustomModal = ({
  header,
  headerDetail,
  body,
  footer,
  isOpen,
  onCancel,
  width,
  onFinish,

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
        footer={null}
        onCancel={onCancel}
        width={width}
        {...props}
      >
        <Form onFinish={onFinish} layout="horizontal">
          {body}
          {footer}
        </Form>
      </Modal>
    </>
  );
};
