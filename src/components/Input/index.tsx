import "./_index.scss";

type InputProps = {
  type: "password" | "text" | "email";
  className: string;
  name: string;
  id?: string;
  placeholder?: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  const { ...rest } = props;
  return (
    <>
      <input {...rest} />
    </>
  );
};
export default Input;
