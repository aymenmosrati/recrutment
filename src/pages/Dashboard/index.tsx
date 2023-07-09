import { useAppDispatch } from "../../hooks";
import { logoutAction } from "../../store/authSlice";
import { Toast } from "../../utilities/toast";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    // logoutAction();
    Toast({
      status: "success",
      message: "Logout successful",
      toastId: "LogoutSuccess",
    });
  };
  return (
    <>
      <h1>login succesfully</h1>
      <button onClick={() => dispatch(logoutAction())}>Logout</button>
    </>
  );
};

export default Dashboard;