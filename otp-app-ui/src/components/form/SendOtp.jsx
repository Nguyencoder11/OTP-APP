import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendOtp = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!emailOrPhone) {
            toast.error("Please enter an email or phone number.",{
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
            const response = await axios.post("http://localhost:9090/api/otp/send", null, {
                params: { emailOrPhone },
            });

            if (response.data.otp){
                toast.success(`OTP sent: ${response.data.otp}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    navigate("/verify-otp", { state: { emailOrPhone } });
                }, 5000);
            } else {
              toast.error("OTP is missing from the response!");
            }
        } catch (error) {
            console.error("Error sending OTP: ", error);
            toast.error(error.response?.data?.message
                || "Failed to send OTP!");
        }
    };

    return (
        <div className="p-4 container flex flex-col items-center">
            <ToastContainer />
            <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter Email or Phone"
                className="border p-2 rounded"
            />
            <button
                onClick={sendOtp}
                className="bg-blue-500 text-white p-2 ml-2">
                Send OTP
            </button>
        </div>
    )
}

export default SendOtp;