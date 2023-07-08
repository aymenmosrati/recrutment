import Logo from "../../../assets/img/logo.svg";
import Tunisie from "../../../assets/img/Tunisie.svg";
import Design from "../Reusable_Component/Design";
import Button from "../../../components/Button";
import Description from "../Reusable_Component/Description";
import Message from "../../../components/Message";
import "./_index.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { Toast } from "../../../utilities/toast";

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    gender: "",
    level: "",
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(20, "First name must be 2 to 20 characters max"),
    lastname: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(20, "Last name must be 2 to 20 characters max"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .min(6, "Email must be at least 6 characters")
      .max(100, "Email must be 6 to 100 characters max"),
    phonenumber: Yup.string()
      .matches(/^(\+216)?[24579][0-9]{7}$/, "Invalid phone number")
      .required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    level: Yup.string().required("Level is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 8 to 20 characters max"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters")
      .max(20, "Confirm Password must be 8 to 20 characters max"),
  });

  const handleSubmit = () => {
    console.log("values : ", formik.values);
    Toast({
      status: "success",
      message: "Register successful",
      toastId: "RegisterSuccess",
    });
    // Toast({
    //   status: "info",
    //   message: "Form submission in progress...",
    //   toastId: "RegisterInfo",
    // });
    // Toast({
    //   status: "error",
    //   message: "Form submission failed. Please try again.",
    //   toastId: "RegisterError",
    // });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handlePhoneNumberChange = (event: any) => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    // Split the value into parts: 2 digits, 3 digits, and 3 digits
    const areaCode = inputValue.slice(0, 2);
    const firstPart = inputValue.slice(2, 5);
    const secondPart = inputValue.slice(5, 8);
    formik.setFieldValue(event.target.name, areaCode + firstPart + secondPart);
  };

  return (
    <form className="register-page" onSubmit={formik.handleSubmit}>
      <Design />
      <div className="register-page-content">
        <img src={`${Logo}`} alt="Logo" />
        <div className="register-page-form">
          <Description
            title="Register"
            description=" Lorem, ipsum dolor sit amet . volupta luptatum soluta, sed aperiam
        expedita iure!aperiam expedita iure!."
          />
          <div className="register-page-form-fullname">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter your First Name"
                {...formik.getFieldProps("firstname")}
              />
              {formik.errors.firstname && formik.touched.firstname ? (
                <Message text={formik.errors.firstname} status="error" />
              ) : null}
            </div>
            <div>
              <label htmlFor="lastname">last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter your Last Name"
                {...formik.getFieldProps("lastname")}
              />
              {formik.errors.lastname && formik.touched.lastname ? (
                <Message text={formik.errors.lastname} status="error" />
              ) : null}
            </div>
          </div>
          <div className="register-page-form-email-phone">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <Message text={formik.errors.email} status="error" />
              ) : null}
            </div>
            <div>
              <label htmlFor="phonenumber">Phone Number</label>
              <div className="register-page-form-phone-number">
                <img src={`${Tunisie}`} alt="tunisie" />
                <div className="country-code">+216</div>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="20 000 000"
                  className="register-page-form-input-phone"
                  value={formik.values.phonenumber}
                  onChange={handlePhoneNumberChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.phonenumber && formik.touched.phonenumber ? (
                <Message text={formik.errors.phonenumber} status="error" />
              ) : null}
            </div>
          </div>
          <div className="register-page-form-gender-level">
            <div>
              <label htmlFor="gender">Gender</label>
              <select id="gender" {...formik.getFieldProps("gender")}>
                <option hidden>-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.errors.gender && formik.touched.gender ? (
                <Message text={formik.errors.gender} status="error" />
              ) : null}
            </div>
            <div>
              <label htmlFor="level">Level</label>
              <select id="level" {...formik.getFieldProps("level")}>
                <option hidden>-- Select level --</option>
                <option value="Baccalaureate">Baccalaureate</option>
                <option value="Licence">Licence</option>
              </select>
              {formik.errors.level && formik.touched.level ? (
                <Message text={formik.errors.level} status="error" />
              ) : null}
            </div>
          </div>
          <div className="register-page-form-password">
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <Message text={formik.errors.password} status="error" />
              ) : null}
            </div>
            <div>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                placeholder="Enter your Confirm Password"
                {...formik.getFieldProps("confirmpassword")}
              />
              {formik.errors.confirmpassword &&
              formik.touched.confirmpassword ? (
                <Message text={formik.errors.confirmpassword} status="error" />
              ) : null}
            </div>
          </div>
          <Button text="Create account" className="btn-regiter" type="submit" />
          <ToastContainer />
        </div>
      </div>
    </form>
  );
};

export default Register;
