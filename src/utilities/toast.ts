import "react-toastify/dist/ReactToastify.css";
import { toast, Zoom } from "react-toastify";
type toastType = {
  status: "success" | "info" | "error";
  message: string;
  toastId: string;
};

export function Toast(props: toastType) {
  if (props.status === "success") {
    return toast.success(props.message, {
      position: "top-center",
      autoClose: 3000, // 3 seconds
      hideProgressBar: true,
      transition: Zoom,
      toastId: props.toastId,
    });
  } else if (props.status === "info") {
    toast.info(props.message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      transition: Zoom,
      toastId: props.toastId,
    });
  } else if (props.status === "error") {
    toast.error(props.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      transition: Zoom,
      toastId: props.toastId,
    });
  }
}
