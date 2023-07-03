import Logo from "../../../assets/img/logo.svg";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Description from "../Reusable_Component/Description";
import Design from "../Reusable_Component/Design";
import "./_index.scss";
import Message from "../../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
const ResetPassword = () => {
  const initialValues = {
    newpassword: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    newpassword: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters")
      .max(20, "New password must be 8 to 20 characters max"),
    confirmpassword: Yup.string()
      .oneOf(
        [Yup.ref("newpassword"), ""],
        "New password and Confirm Password must match"
      )
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters")
      .max(20, "Confirm Password must be 8 to 20 characters max"),
  });

  const handleSubmit = () => {
    console.log("ResetPassword", formik.values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="reset-password-page" onSubmit={formik.handleSubmit}>
      <Design />
      <div className="reset-password-page-content">
        <img src={`${Logo}`} alt="Logo" />
        <div className="reset-password-page-form">
          <Description
            title="Reset Password"
            description="Lorem, ipsum dolor sit amet . volupta luptatum soluta, sed aperiam expedita iure!aperiam expedita iure!."
          />
          <div className="reset-password-form-newpassword">
            <label htmlFor="newpassword">New Password</label>
            <Input
              type="password"
              id="newpassword"
              placeholder="New Password"
              className="input-form"
              {...formik.getFieldProps("newpassword")}
            />
            {formik.errors.newpassword && formik.touched.newpassword ? (
              <Message text={formik.errors.newpassword} status="error" />
            ) : null}
          </div>
          <div className="reset-password-form-confirm-password">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <Input
              type="password"
              id="confirmpassword"
              placeholder="Confirm Password"
              className="input-form"
              {...formik.getFieldProps("confirmpassword")}
            />
            {formik.errors.confirmpassword && formik.touched.confirmpassword ? (
              <Message text={formik.errors.confirmpassword} status="error" />
            ) : null}
          </div>
          <Button text="Save" className="btn-reset-password" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
