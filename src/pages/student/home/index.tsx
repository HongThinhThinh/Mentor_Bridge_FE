import StudentPages from "../../../components/templates/student-pages";
import useIsUpcoming from "../../../hooks/useIsUpComing";
import UpcomingSemester from "../../upcoming-semester";

function StudentHomePage() {
  const { isInTerm } = useIsUpcoming();
  return <>{!isInTerm ? <StudentPages /> : <UpcomingSemester />}</>;
}

export default StudentHomePage;
