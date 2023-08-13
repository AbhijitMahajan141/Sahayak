import React from 'react';

interface DataValidatorProps {
  name:string,
  email:string,
  contact:string,
  address:string,
  aadhar?: string,
  services?:string[],
  password:string,
}

const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isContactNumberValid = (contactNumber: string): boolean => {
  const contactNumberRegex = /^\d{10}$/;
  return contactNumberRegex.test(contactNumber);
};

const isAadharNumberValid = (aadharNumber: string): boolean => {
  const aadharNumberRegex = /^\d{4}-\d{4}-\d{4}$/;
  return aadharNumberRegex.test(aadharNumber);
};

const isPasswordValid = (password: string): boolean => {
  // Password validation logic
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const Validator = ({name,email,contact,address,aadhar,services,password}:DataValidatorProps) => {

     if(email && !isEmailValid(email)){
        return "Invalid Email address! Must contain @ and .";
     }else if(contact && !isContactNumberValid(contact)){
        return "Invalid Contact Number! Must be 10 Digit's"
     }else if(aadhar && !isAadharNumberValid(aadhar)){
        return "Invalid Aadhar Number! Must be 12 Digit's"
     }else if(password && !isPasswordValid(password)){
        return "Invalid Password! Must be atleast 8 digit's and contain Characters, Digits and Special Characters"
     }else{
        return true;
     }

}

export default Validator;
