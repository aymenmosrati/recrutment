import Logo from "../../../assets/img/logo.svg";
import Back_ground from "../../../assets/img/Maskgroup.svg";
import PersonLoginPage from "../../../assets/img/personLoginPage.svg";
import Button from "../../../components/Button";
import "./_index.scss";
import Message from "../../../components/Message";
import { useAppDispatch } from "../../../hooks/hooksRedux";
import { loginAction } from "../../../store/authSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(100, "Email must be 6 to 100 characters max"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 8 to 20 characters max"),
  });
  const handleSubmit = async () => {
    dispatch(
      loginAction({
        ...formik.values,
        type: "STUDENT",
      })
    );
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <form className="login-page" onSubmit={formik.handleSubmit}>
      <div className="login-form-design">
        <img src={`${Back_ground}`} alt="Maskgroup" className="maskgroup" />
        <img
          src={`${PersonLoginPage}`}
          alt="PersonLoginPage"
          className="personLoginPage"
        />
      </div>
      <div className="login-page-content">
        <div className="login-form">
          <img src={`${Logo}`} alt="" className="login-form-logo" />
          <div className="login-form-description">
            <span>Login</span>
            <span>Sign in on the internal platform</span>
          </div>
          <div className="login-form-email">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <Message text={formik.errors.email} status="error" />
            ) : null}
          </div>
          <div className="login-form-password">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <Message text={formik.errors.password} status="error" />
            ) : null}
          </div>
          <div className="login-form-remenberme">
            <div>
              <input type="checkbox" value="Remember me" id="rememberme" />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <div
              className="login-forget-password"
              onClick={() => {
                navigate("/ForgotPassword");
              }}
            >
              Forget password?
            </div>
          </div>
          <Button className="btn-login" text="Login" type="submit" />
          <ToastContainer />
        </div>
      </div>
    </form>
  );
};

export default Login;
