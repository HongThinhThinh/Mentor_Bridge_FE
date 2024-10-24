import BookingMentor from "../../../components/templates/booking-mentor";
import { SystemRole } from "../../../constants/role";


export type Mentor = {
    avatar: string;
    dayOfBirth: string;
    email: string;
    fullName: string;
    gender: string;
    id: string;
    phone: string;
    role: SystemRole;
    studentCode: string;
    teamCode: string | null;
    username: string;
}

function BookingMentorPage() {
    return <BookingMentor/>;
}

export default BookingMentorPage;
