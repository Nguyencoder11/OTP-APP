import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const location = useLocation();
  const emailOrPhone = location.state?.emailOrPhone || "";
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
      if (!otp) {
          toast.error("Please enter OTP");
          return;
      }

      try {
          const response = await axios.post("http://localhost:9090/api/otp/verify", null, {
             params: { emailOrPhone, otp },
          });

          if (response.status === 200) {
              toast.success("OTP verified successfully!");
          } else {
              toast.error("Invalid OTP");
          }

      } catch (error) {
          toast.error(error.response?.data?.message || "Invalid OTP!");
      }
  };

  return (
      <div className="p-4 container">
              <input
                  type="text"
                  value={emailOrPhone}
                  disabled
                  className="border p-2 rounded mr-2 bg-gray-200"
              />
              <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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