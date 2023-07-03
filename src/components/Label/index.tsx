import React from "react";
import "./_index.scss";

type LabelProps = {
  label: string;
  htmlFor: string;
};

const Label = (props: LabelProps) => {
  const { label, ...rest } = props;
  return <label {...rest}>{label}</label>;
};
export default Label;
