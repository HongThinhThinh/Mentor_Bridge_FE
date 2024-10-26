import React, { ReactNode } from "react";
import useIsUpcoming from "../../hooks/useIsUpComing";
import Alert from "../../components/atoms/alert";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isInTerm } = useIsUpcoming();

  return (
    <div>
      {isInTerm ? (
        <>
          <div>
            <div style={{}}>
              {children}
              <div>
                <Alert
                  // onCancel={() => setIsopen(false)}
                  open={true}
                  type="error"
                  message="Giảng viên vui lòng cập nhật lịch trống trước ngày 30-08-2024"
                  timeClose={3}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default ProtectedRoute;
