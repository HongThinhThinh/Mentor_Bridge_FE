import React, { ReactNode } from "react";
import useIsUpcoming from "../../hooks/useIsUpComing";
import Alert from "../../components/atoms/alert";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isInTerm } = useIsUpcoming();
  // Check if isInTerm has data
  const hasTermData = isInTerm && isInTerm?.length > 0;

  const message = hasTermData
    ? `Thời gian bắt đầu: ${isInTerm[0]?.dateFrom}. Thời gian kết thúc: trước ${isInTerm[0]?.dateTo}`
    : "No upcoming term information available.";
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
                message={message}
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
