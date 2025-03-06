import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SendOtp = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!emailOrPhone) {
            toast.error("Please enter an email or phone number.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            await axios.post("http://localhost:9090/api/otp/send", null, {
                params: { emailOrPhone },
            });
            toast.success("OTP sent successfully!");
            navigate("/verify-otp", { state: {emailOrPhone} });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP!");
        }
    };

    return (
        <div className="p-4 container">
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