import "./_index.scss";

type ButtonProps = {
  text: string;
  className: string;
  type?: "submit" | "reset" | "button";
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: ButtonProps) => {
  const { text, ...rest } = props;
  return <button {...rest}>{text}</button>;
};
export default Button;
