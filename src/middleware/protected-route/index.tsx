import React, { ReactNode } from "react";
import useIsUpcoming from "../../hooks/useIsUpComing";
import Alert from "../../components/atoms/alert";
import { formatDateAndHour } from "../../utils/dateFormat";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isInTerm } = useIsUpcoming();
  // Check if isInTerm has data
  const hasTermData = isInTerm && isInTerm?.length > 0;
  const message = hasTermData ? (
    <div style={{ textAlign: "left" }}>
      Thời gian bắt đầu: {formatDateAndHour(isInTerm[0]?.dateFrom)}. <br />
      Thời gian kết thúc: trước {formatDateAndHour(isInTerm[0]?.dateTo)}
    </div>
  ) : (
    "No upcoming term information available."
  );
  return (
    <div>
      {isInTerm && isInTerm?.length > 0 ? (
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
