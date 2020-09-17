import Users from "../../models/Users/index";
import Codes from "../../models/Codes/index";

import bcrypt from "bcrypt"
const accountSid = "AC14f22c42e1101f84c50331cac00ef091";
const authToken = '1f8543155fcc64c8f5b73397ecaf632f';
const crNum = '+18596671471';
const client = require('twilio')(accountSid, authToken);
import { getResponse, getErrorResponse } from '../mainModels.js';
const nodemailer = require('nodemailer');


class AuthServices {

  signin = async (name, phone, email, password, codeEmail, codePhone) => {
    const findCode = await Codes.findOne({ email, phone })
    if (!findCode) {
      return getResponse(false, "User is not found verification code is not found");

    }
    if (findCode.codeEmail !== codeEmail && findCode.codePhone !== codePhone) {

      return getResponse(false, "Verification code is incorrect");

    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new Users({ name, phone, email, codePhone, codeEmail, password: hashPassword })

    user.save();

    await Codes.deleteOne({ email });

    return getResponse(true, "successfully sign in", user)
  }


  changePassword = async (email, codePhone, codeEmail, newPassword) => {
    const findUser = await Users.findOne({ email });
    if (!findUser) {

      return getResponse(false, "User is not found");
    }
    if (findUser.codePhone !== codePhone && findUser.codeEmail !== codeEmail) {
      return getResponse(false, "Verification Error");

    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    findUser.password = hashPassword;

    findUser.save();

    return getResponse(true, "Password has been changed");

  }

}


export default new AuthServices();