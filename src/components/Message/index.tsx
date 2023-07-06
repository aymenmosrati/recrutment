import ICSuccess from "../../assets/img/IcSuccess.svg";
import ICWarning from "../../assets/img/IcWarning.svg";
import IcNormale from "../../assets/img/IcNormale.svg";
import ICError from "../../assets/img/IcError.svg";
import "./_index.scss";

type MessageProps = {
  text: string;
  status: string;
};

const Message = (props: MessageProps) => {
  return (
    <>
      <p className={`message ${props.status}`}>
        <img
          src={
            props.status === "error"
              ? `${ICError}`
              : props.status === "success"
              ? `${ICSuccess}`
              : props.status === "normal"
              ? `${IcNormale}`
              : `${ICWarning}`
          }
          alt={`IC${props.status}`}
        />
        {props.text}
      </p>
    </>
  );
};
export default Message;
