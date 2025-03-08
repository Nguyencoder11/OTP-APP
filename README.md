# DEMO OTP SENDER

This is an application with UI which is developed based on a module for sending OTP code through thirdty-part like 
email, phone number or SMS.

## Features
1. Sending OTP: The OTP code will be sent through an email, SMS or private phone number for user to ask them to verify
2. Verify OTP: Users will receive an OTP code through their email, SMS or private phone number and ready to verify with
their account.
3. UI Toast Message: Active toast message components help user know about status when receiving OTP code, verify successfully,
verify failed.

## Tech Stacks
1. Front-End: Using framework ReactJs with Vite config.
2. Back-End: Spring Boot, integrated with ...
3. Storage: Redis is used to store temporary data, or real-time.
4. Mail Testing: Using SMTP through JavaMailSender, open source Mailosaur to test with an email
5. SMS: Using Twilio open source to show send and receive OTP code through phone number

## Deployment



## Installation And Preparation

Install Redis Insight

## Start Application

First, you need to clone the repository into local
```shell
git clone https://github.com/Nguyencoder11/OTP-APP.git
```
To run application you can run it with terminal follow this command
```shell
cd OTP-APP
```
Run Back-end first
```shell
cd otpapp
mvn springboot:run
```
Run Front-end next
```shell
cd otp-app-ui
npm start
```

Or you can start it with Docker container
