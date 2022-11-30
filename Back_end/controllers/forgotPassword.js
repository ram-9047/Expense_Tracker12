const ForgotPassword = require("../models/forgotPassword.js");
const User = require("../models/user.js");

const sib = require("sib-api-v3-sdk");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const id = uuid.v4();
      //   console.log(user.__proto__);
      user.createForgotPassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });

      const client = sib.ApiClient.instance;

      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.API_KEY;

      const sender = {
        email: "new.rs9047@gmail.com",
        name: "Test_Expense_Tracker_Project",
      };

      const recivers = [
        {
          email: "ramgk9047@gmail.com",
        },
      ];

      const transactionalEmailApi = new sib.TransactionalEmailsApi();

      transactionalEmailApi
        .sendTransacEmail({
          subject: "Please reset your password via this link",
          sender,
          to: recivers,
          // textContent: `Cules Coding will teach you how to become a {{params.role}} developer.`,
          htmlContent: `
                        <a href="http://localhost:3000/resetPassword/${id}">Reset password</a>
                    `,
        })
        .then((result) => {
          console.log(result);
          return res.status(200).json({
            success: true,
            message: "reset password link has been sent to your email",
          });
        })
        .catch((error) => {
          //   throw new Error(error);
          console.log(error, "error in sending email");
        });

      //send mail
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, sucess: false });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    ForgotPassword.findOne({ where: { id } }).then((forgotpasswordrequest) => {
      if (forgotpasswordrequest) {
        if (forgotpasswordrequest.active === true) {
          forgotpasswordrequest.update({ active: false });
          res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                      </script>
                                    <form action="http://localhost:3000/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                            <input name="newpassword" type="password" required></input>
                                            <button>reset password</button>
                                     </form>
                                 </html>`);
          res.end();
        } else {
          throw new Error("request has expired");
        }
      } else {
        throw new Error("request not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const resetpasswordid = req.params.id;
    // console.log("new password------------", newpassword);
    // console.log("resetpassword id---------------", resetpasswordid);

    ForgotPassword.findOne({ where: { id: resetpasswordid } }).then(
      (resetpasswordrequest) => {
        // console.log(resetpasswordrequest, "reset id request");
        User.findOne({ where: { id: resetpasswordrequest.userId } }).then(
          (user) => {
            // console.log("userDetails", user);
            if (user) {
              //encrypt the password

              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
                  // Store hash in your password DB.
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  user.update({ password: hash }).then(() => {
                    res.status(201).json({
                      message: "Successfuly updated the new password",
                    });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};
