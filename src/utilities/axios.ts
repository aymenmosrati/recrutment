import axios from "axios";
import { RECRUTMENT_API_KEY } from "../config";

const axiosInstance = axios.create({ baseURL: RECRUTMENT_API_KEY });

export default axiosInstance;
