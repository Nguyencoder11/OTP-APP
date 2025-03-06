package com.tutorial.otpapp.controller;

import com.tutorial.otpapp.service.EmailService;
import com.tutorial.otpapp.service.OtpService;
import com.tutorial.otpapp.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "*")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String emailOrPhone) {
        String otp = otpService.generateOtp(emailOrPhone);
        if(emailOrPhone.contains("@")){
            emailService.sendEmail(emailOrPhone, "Your OTP Code", "Your OTP: " + otp);
        }else{
            smsService.sendSms(emailOrPhone, "Your OTP: " + otp);
        }

        return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String emailOrPhone, @RequestParam String otp) {
        if (otpService.validateOtp(emailOrPhone, otp)) {
            return ResponseEntity.ok("OTP verified successfully!");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }
}
