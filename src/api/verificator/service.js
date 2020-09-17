import Users from "../../models/Users/index";
import Codes from "../../models/Codes/index";

import bcrypt from "bcrypt"
const accountSid = "AC14f22c42e1101f84c50331cac00ef091";
const authToken = '1f8543155fcc64c8f5b73397ecaf632f';
const crNum = '+18596671471';
const client = require('twilio')(accountSid, authToken);
import { getResponse, getErrorResponse } from '../mainModels.js';
const nodemailer = require('nodemailer');


import mainConfig from '../../env';

class VerificatorServices {

  verification = async (email,phone, codeEmail, codePhone) => {

    const code = new Codes({ email, phone, codeEmail, codePhone })

    code.save();
    // const findPhone = await Codes.findOne({ phone });
    // if (!findPhone) {

    //   return getResponse(false, "phoneNumber is not found");
    // }
    // if (findPhone.codePhone !== code) {

    //   return getResponse(false, "verification code is not valid");
    // }
    return getResponse(true, "success");

  }

  checkPhone = async (phone, code) => {

    const findPhone = await Users.findOne({ phone });
    if (!findPhone) {

      return getResponse(false, "phoneNumber is not found");
    }
    if (findPhone.codePhone !== code) {

      return getResponse(false, "verification code is not valid");
    }
    return getResponse(true, "success");

  }

  checkEmail = async (email, code) => {
    const findEmail = await Users.findOne({ email });
    if (!findEmail) {

      return getResponse(false, "Email is not found");
    }
    if (findEmail.codeEmail !== code) {

      return getResponse(false, "verification code is not valid");
    }
    return getResponse(true, "success");
  }

  sendCode = async (phone, codePhone) => {

    const findPhone = await Users.findOne({ phone });

    if (!findPhone) {

      return getResponse(false, "Phone is not found");
    }

    findPhone.codePhone = codePhone;

    await findPhone.save();

    return getResponse(true, "has been sended");

  }


  sendEmail = async (phone, email, code, codeEmail) => {

    const findPhone = await Users.findOne({ phone });
    if (!findPhone) {

      return getResponse(false, "phoneNumber is not found");
    }
    if (findPhone.codePhone !== code) {

      return getResponse(false, "verification code is not valid");
    }
    if (findPhone.email !== email) {

      return getResponse(false, "email is not correct");
    }

    findPhone.codeEmail = codeEmail;
    await findPhone.save();

    return getResponse(true, `электронный адрес ${findPhone.email}`);
  }

}


export default new VerificatorServices();