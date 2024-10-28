import "./index.scss";

interface MessageProps {
  key: string; // This should not be included in props; it's handled by React when rendering lists.
  me: string;
  text: string;
  avt: string;
}

const Message = ({ me = "", text = "", avt = "" }: MessageProps) => {
  return (
    // Add the return statement here
    <div className={`message ${me}`}>
      <div className="message__detail">
        <div className="message__detail__avatar">
          <img src={avt} alt="" />
        </div>
        <div className="message__detail__text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
