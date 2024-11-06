import { Role } from "../../../constants/role";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import "./index.scss";

interface MessageProps {
  me: string;
  text: string;
  avt: string;
  name: string; // Added name to match the component's props
  id: string; // Added id to match the component's props
}

const Message = ({
  me = "",
  text = "",
  avt = "",
  name = "",
  id = "",
}: MessageProps) => {
  const user = useCurrentUser();
  return (
    // Add the return statement here
    <div className={`message ${me}`}>
      <div className="message__detail">
        <div className="message__detail__avatar">
          <img src={avt} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!me && (
            <span
              style={{
                color: "black",
                marginBottom: "0px",
                fontSize: "12px",
                opacity: "0.3",
                marginLeft: "7px",
              }}
            >
              {name?.split(" ").pop()}
            </span>
          )}
          <div className="message__detail__text">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
