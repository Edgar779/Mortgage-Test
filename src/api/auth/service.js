import Users from "../../models/Users/index";
import bcrypt from "bcrypt"
const accountSid = "AC14f22c42e1101f84c50331cac00ef091";
const authToken = 'ffdd0c4895451aa2472a21ebb1d7d405';
const crNum = '+18596671471';
const client = require('twilio')(accountSid, authToken);
import { getResponse, getErrorResponse } from '../mainModels.js';
const nodemailer = require('nodemailer');


import mainConfig from '../../env';

class AuthServices {

  signin = async (name, phone, email, password) => {
    let codePhone = Math.floor(1000 + Math.random() * 9000);
    const message = await client.messages
      .create({
        to: phone,
        from: '+18596671471',
        body: codePhone,
      })



    let codeEmail = Math.floor(1000 + Math.random() * 9000);


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cherqezyancherqezyan97@gmail.com',
        pass: 'Lenta.123#$'
      }
    });

    var mailOptions = {
      from: 'cherqezyancherqezyan97@gmail.com',
      to: 'mher13.02.94@gmail.com',
      subject: 'Sending Email using Node.js',
      text: codeEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


    const hashPassword = await bcrypt.hash(password, 10);

    const user = new Users({ name, phone, email, codePhone, codeEmail, password: hashPassword })
    user.save();
    return getResponse(true, "successfully sign in")
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

  sendCode = async (phone) => {
    const findPhone = await Users.findOne({ phone });
    if (!findPhone) {

      return getResponse(false, "Phone is not found");
    }

    let codePhone = Math.floor(1000 + Math.random() * 9000);

    const message = await client.messages
      .create({
        to: phone,
        from: '+18596671471',
        body: codePhone,
      })
    findPhone.codePhone = codePhone;

    findPhone.save();

    return getResponse(true, "has been sended");

  }


  sendEmail = async (phone, code) => {
    const findPhone = await Users.findOne({ phone });
    if (!findPhone) {

      return getResponse(false, "phoneNumber is not found");
    }
    if (findPhone.codePhone !== code) {

      return getResponse(false, "verification code is not valid");
    }

    let codeEmail = Math.floor(1000 + Math.random() * 9000);


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cherqezyancherqezyan97@gmail.com',
        pass: 'Lenta.123#$'
      }
    });

    var mailOptions = {
      from: 'cherqezyancherqezyan97@gmail.com',
      to: findPhone.email,
      subject: 'Sending Email using Node.js',
      text: codeEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    findPhone.codeEmail = codeEmail;
    findPhone.save();

    return getResponse(true, `электронный адрес ${findPhone.email}`);
  }



  changePassword = async (email, newPassword) => {
    const findUser = await Users.findOne({ email });
    if (!findUser) {

      return getResponse(false, "User is not found");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    findUser.password = hashPassword;

    findUser.save();

    return getResponse(true, "Password has been changed");

  }


  login = async (login, password) => {

    const worker = await Workers.findOne({ login });
    if (!worker) {
      return getResponse(false, "worker was not founded");
    }

    const comparePassword = await bcrypt.compare(password, worker.password);

    if (!comparePassword) {
      return getResponse(false, "Incorrect password");
    }

    const authToken = jwt.sign({ _id: worker._id, userRole: worker.role, login: worker.login }, mainConfig.JWT_SECRET, { expiresIn: '7d' });

    return getResponse(true, "Worker successfuly logged in", authToken);



  }


  loginAdmin = async (adminEmail, adminPassword) => {
    const findAdmin = await admin.findOne({ email: adminEmail });
    if (!findAdmin) {
      return getResponse(false, "admin was not founded");
    }
    const comparePassword = await bcrypt.compare(adminPassword, findAdmin.password);
    if (!comparePassword) {
      return getResponse(false, "Incorrect password");
    }
    let token = await jwt.sign({ _id: findAdmin._id, role: roleEnum.admin },
      mainConfig.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    return getResponse(true, "Admin successfuly logged in", token);
  }


}


export default new AuthServices();