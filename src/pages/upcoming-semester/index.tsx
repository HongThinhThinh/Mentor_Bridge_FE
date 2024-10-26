import MentorHomeUpcoming from "../../components/organisms/mentor-home-upcoming";
import StudentHomeUpcoming from "../../components/organisms/student-home-upcoming";
import { useCurrentUser } from "../../utils/getcurrentUser";

function UpcomingSemester() {
  const user = useCurrentUser();

  return (
    <div className="mt-7">
      {user?.role === "STUDENT" ? (
        <StudentHomeUpcoming />
      ) : (
        <MentorHomeUpcoming />
      )}
    </div>
  );
}

export default UpcomingSemester;
