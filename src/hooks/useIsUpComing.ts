import { useEffect, useState } from "react";
import useSemesterService from "../services/useSemesterService ";

const useIsUpcoming = () => {
  const { getUpcomingSemester } = useSemesterService();
  const [isInTerm, setIsInTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSemesterStatus = async () => {
      try {
        const response = await getUpcomingSemester();
        setIsInTerm(response?.length > 0);
      } catch (err) {
        console.error("Error fetching semester status:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSemesterStatus();
  }, [getUpcomingSemester]);

  return { isInTerm, loading, error };
};

export default useIsUpcoming;
