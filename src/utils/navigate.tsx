import { useNavigate } from "react-router-dom";
import { Role } from "../constants/role";
import { ADMIN_ROUTES, MENTOR_ROUTES } from "../constants/routes";

export const useNavigateByRole = () => {
  const navigate = useNavigate(); // sử dụng hook useNavigate bên trong custom hook

  const navigateByRole = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        navigate(`/${ADMIN_ROUTES.ADMIN}`);
        break;
      case Role.STUDENT:
        navigate(`/${ADMIN_ROUTES.ADMIN}`);
        break;
      case Role.MENTOR:
        navigate(`/${MENTOR_ROUTES.MENTOR}/${MENTOR_ROUTES.MENTOR_PAGE}`);
        break;
      default:
        navigate("/login");
        break;
    }
  };

  return navigateByRole;
};
