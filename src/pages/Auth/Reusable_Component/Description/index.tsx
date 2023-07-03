import "./_index.scss";
type typeDescription = {
  title: string;
  description: string;
  className?: string;
};

const Description = (props: typeDescription) => {
  return (
    <div className="form-description">
      <span>{props.title}</span>
      <span>{props.description}</span>
    </div>
  );
};

export default Description;
