import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const location = useLocation();
  const emailOrPhone = location.state?.emailOrPhone || "";
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
      if (!otp) {
          toast.error("Please enter OTP", {
              position: "top-right",
              autoClose: 3000, // Đóng sau 3 giây
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
          return;
      }

      try {
          const response = await axios.post("http://localhost:9090/api/otp/verify", null, {
             params: { emailOrPhone, otp },
          });

          if (response.status === 200) {
              toast.success("OTP verified successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
              });
          } else {
              toast.error("Invalid OTP", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
              });
          }

      } catch (error) {
          toast.error(error.response?.data?.message
              || "Invalid OTP!");
      }
  };

  return (
      <div className="p-4 container">
          <ToastContainer />
          <input
              type="text"
              value={emailOrPhone}
              disabled
              className="border p-2 rounded mr-2 bg-gray-200"
          />
          <input
              type="text"
              value={otp}
              onChange={(e) =>
                  setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 rounded mr-2"
          />
          <button onClick={verifyOtp} className="bg-green-500 text-white p-2">
              Verify OTP
          </button>
      </div>
  )
}

export default VerifyOtp;