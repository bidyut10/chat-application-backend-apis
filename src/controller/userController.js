const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Please provide your User details in body",
                });
        }

        if (!data.name || data.name.trim().length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Name field is required" });
        } else if (/\d/.test(data.name)) {
            return res
                .status(400)
                .send({ status: false, message: "Name cannot have numbers" });
        }

        if (!data.phone || data.phone.length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Phone Number feild is required" });
        }

        if (
            !/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
                data.phone
            )
        ) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter a valid Mobile Number" });
        }

        const phoneNumberCheck = await userModel.findOne({ phone: data.phone });
        if (phoneNumberCheck) {
            return res
                .status(400)
                .send({ status: false, message: "Phone number is already registered" });
        }

        if (!data.email || data.email.trim().length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Email field is required" });
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid Email" });
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email: data.email });
        if (isEmailAlreadyUsed) {
            return res
                .status(400)
                .send({ status: false, message: "Email is already registered" });
        }

        if (!data.password || data.password.trim().length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Password is required" });
        }

        if (!/^.{8,15}$/.test(data.password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Password length should be in between 8 to 15",
                });
        }


        let saveData = await userModel.create(data);
        {
            res
                .status(201)
                .send({ status: true, message: "Success", data: saveData });
        }
    } catch (err) {
        res
            .status(500)
            .send({ status: false, message: "Error", error: err.message });
    }
};

const loginUser = async function (req, res) {
    try {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Please provide your Book details in body",
                });
        }

        if (!email || email.trim().length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Email details" });
        }

        if (!password || password.trim().length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Password details" });
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Email should be valid email address",
                });
        }

        if (!/^.{8,15}$/.test(password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "password length should be in between 8 to 15",
                });
        }

        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res
                .status(401)
                .send({
                    status: false,
                    message: "Invalid User",
                });
        }

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                project: "chat=Management@backend-apis",
                iat: Math.floor(Date.now() / 1000), 
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            },
            "5^8LydB!mso^o!Yx"
        );

        {
            res.status(201).send({ status: true, data: token });
            // res.redirect redirect to chat app(main page)
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { createUser, loginUser };
