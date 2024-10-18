import "./Message.scss";

interface MessageProps {
  me: string;
  text: string;
  avt: string;
}
const Message = ({ me = "", text = "", avt = "" }: MessageProps) => {
  <div className={`message ${me}`}>
    <div className="message__detail">
      <div className="message__detail__avatar">
        <img src={avt} alt="" />
      </div>
      <div className="message__detail__text">
        <p>{text}</p>
      </div>
    </div>
  </div>;
};

export default Message;
