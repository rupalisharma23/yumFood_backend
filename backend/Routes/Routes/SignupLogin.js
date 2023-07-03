const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/createUser",
  body("email", "incorrect email").isEmail(),
  body("password", "minimum length should be 5").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      let salt = await bcrypt.genSalt(10);
      let securePass = await bcrypt.hash(req.body.password, salt);
      const isEmailPresent = await User.findOne({ 'email': req.body.email });
      if (!isEmailPresent) {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePass,
          address:req.body.address
        });

        res.json({ success: true });
      }
      else{
        res.status(400).json({ error: "email is already in use" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  body("email", "incorrect email").isEmail(),
  body("password", "minimum length should be 5").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      let email = req.body.email;
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "incorrect credentials" });
      }

      let comparePass = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!comparePass) {
        return res.status(400).json({ errors: "incorrect password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, process.env.jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;

// learning points

// here bcypt is used from encryption of the pass, bcrypt.compare(req.data.password , userData.password) this is used to compared the encrypted password in the userData to the req.body.password
// for more secrurity purposes here authorization is used by jwtwebtoken, this use a jwtsecret where any random string can be used, then it needs a header, in out case we have used userdData.id
//  for authorization  const data = {
//          user:{
//             id:userData.id
//          }
//       }
// these code is nessesary

// the tocken genrated from authorization can be used in frontend and pass the tocken in headers fo every api call
