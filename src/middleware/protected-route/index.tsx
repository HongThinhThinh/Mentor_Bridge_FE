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
            {children}
            <div>
              <Alert
                // onCancel={() => setIsopen(false)}
                open={true}
                type="error"
                message="Thời gian bắt đầu: 08:00 ngày 14/08/2024. Thời gian kết thúc: trước 23:59 ngày 23/08/2024"
                timeClose={3}
              />
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
