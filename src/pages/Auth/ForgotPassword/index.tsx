import Logo from "../../../assets/img/logo.svg";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Description from "../Reusable_Component/Description";
import Design from "../Reusable_Component/Design";
import "./_index.scss";
import Message from "../../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(100, "Email must be 6 to 100 characters max"),
  });

  const handleSubmit = () => {
    console.log("forgetPassword", formik.values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="forgot-password-page" onSubmit={formik.handleSubmit}>
      <Design />
      <div className="forgot-password-page-content">
        <img src={`${Logo}`} alt="Logo" />
        <div className="forgot-password-page-form">
          <Description
            title="Forgot Password"
            description="Lorem, ipsum dolor sit amet . volupta luptatum soluta, sed aperiam expedita iure!aperiam expedita iure!."
          />
          <div className="forgot-password-form-email">
            <label htmlFor="email">Enter your Email</label>
            <Input
              type="email"
              id="email"
              placeholder="username@gmail.com"
              className="input-form"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <Message text={formik.errors.email} status="error" />
            ) : null}
          </div>
          <Button
            text="Reset Password"
            className="btn-forgot-password"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
