import React from "react";
import "./_index.scss";

type CheckboxProps = {
  id: string;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="cl-checkbox">
      <input type="checkbox" id={props.id} />
      <span></span>
    </label>
  );
};

export default Checkbox;
