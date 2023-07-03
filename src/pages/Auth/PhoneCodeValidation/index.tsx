import Logo from "../../../assets/img/logo.svg";
import Description from "../Reusable_Component/Description";
import Button from "../../../components/Button";
import Design from "../Reusable_Component/Design";
import Message from "../../../components/Message";
import "./_index.scss";
import React, { useRef } from "react";
import { useFormik } from "formik";

const PhoneCodeValidation = () => {
  const initialValues = {
    codeValidation0: "",
    codeValidation1: "",
    codeValidation2: "",
    codeValidation3: "",
  };

  const handleSubmit = () => {
    if (
      !formik.values.codeValidation0 ||
      !formik.values.codeValidation1 ||
      !formik.values.codeValidation2 ||
      !formik.values.codeValidation3
    ) {
      formik.setErrors({
        codeValidation3: "Check Your Code validation",
      });
    } else {
      console.log(
        "test code validation",
        formik.values.codeValidation0 +
          formik.values.codeValidation1 +
          formik.values.codeValidation2 +
          formik.values.codeValidation3
      );
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maxLength = parseInt(e.target.getAttribute("maxLength") || "0", 10);
    if (
      e.target.value.length >= maxLength &&
      index < inputRefs.length - 1 &&
      inputRefs[index + 1].current
    ) {
      inputRefs[index + 1].current!.focus();
    }
    formik.setFieldValue(`codeValidation${index}`, e.target.value);
  };

  return (
    <form className="PhoneCodeValidation-page" onSubmit={formik.handleSubmit}>
      <Design />
      <div className="PhoneCodeValidation-page-content">
        <img src={`${Logo}`} alt="Logo" />
        <div className="PhoneCodeValidation-page-form">
          <Description
            title="Enter Code"
            description="Lorem, ipsum dolor sit amet . volupta luptatum soluta, sed aperiam expedita iure!aperiam expedita iure!."
          />
          <div className="phone-validation">
            {inputRefs.map((ref, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  id={`codeValidation${index}`}
                  maxLength={1}
                  className="input-field"
                  ref={ref}
                  value={
                    formik.values[
                      `codeValidation${index}` as keyof typeof initialValues
                    ]
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInput(index, e)
                  }
                />
              </React.Fragment>
            ))}
            {formik.errors.codeValidation3 && formik.touched.codeValidation3 ? (
              <Message text={formik.errors.codeValidation3} status="error" />
            ) : null}
          </div>
          <Button
            text="Send"
            className="btn-phone-code-validation"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default PhoneCodeValidation;
