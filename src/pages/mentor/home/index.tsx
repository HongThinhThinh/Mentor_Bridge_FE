import UpcomingSemester from "../../upcoming-semester";
import HomeTemplate from "../../../components/templates/home";
import useIsUpcoming from "../../../hooks/useIsUpComing";

const MentorHomePage = () => {
  const { isInTerm } = useIsUpcoming();
  return <>{!isInTerm ? <HomeTemplate /> : <UpcomingSemester />}</>;
};

export default MentorHomePage;
