package com.tutorial.otpapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public String generateOtp(String key) {
        String otp = String.valueOf(new Random().nextInt(900000) +100000);
        redisTemplate.opsForValue().set(key, otp, 1, TimeUnit.MINUTES); // Luu OTP trong 1 phut

        return otp;
    }

    public boolean validateOtp(String key, String otp){
        String storedOtp = redisTemplate.opsForValue().get(key);
        return storedOtp != null && storedOtp.equals(otp);
    }
}
