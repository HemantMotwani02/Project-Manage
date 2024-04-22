const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const db = require('../models/index');
const Users = db.users;

async function Login(req, res){
    const { email, password } = req.body;
    try {

        let data = await Users.findOne({
            where: { email: email, deleted_at: null }
        });
        const user = { name: data.name, email: data.email, role: data.role };
        if (data) {
            const passwordMatch = await bcrypt.compare(password, data.password);
            if (passwordMatch) {
                const token = jwt.sign({ id: data.user_id, email: email, role: data.role }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
                res.status(200).json({ message: "Login Successfully", userData: user, token: token });
                console.log("Login Successfully");
            }
            else {
                res.send("Wrong Password");
                console.log("Wrong Password");
            }
        }
        else {
            res.send("User does not exist");
        }

    } catch (error) {
        res.send("Error in Login");
        console.log("Error in Login", error);
    }

}


async function Register(req, res){
    const { name, email, password, role } = req.body;
    try {
        let data = await Users.findOne({
            where: { email: email }
        });
        if (data) { res.send('User already exist'); return; }

        if (!name || !email || !password || !role) { return res.status(400).json({ error: "Fill all the fields" }); }
        // if (!validator.isEmail(email)) { res.send("Enter Valid Email"); return; }
        // if (!validator.isStrongPassword(password)) { res.send("Weak Password"); return; }

        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = await Users.create({ name: name, email: email, password: hashedPassword, role: role });
            const user = { name: newUser.name, email: newUser.email, role: newUser.role };
            const token = jwt.sign({ id: newUser.user_id, email: email, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });

            res.status(200).json({ message: "User Registered Successfully", userData: user, token: token });
            console.log("User Registered Successfully");
        }

    } catch (error) {
        res.send("Error in Registration");
        console.log("Error in Registration", error);
    }
}


async function Delete(req, res) {
    const { user_id } = req.body;
    let removeUser = await Users.update({ deleted_at: new Date() }, {
        where: { user_id: user_id }
    });
    res.status(200).send("Account Deleted");

}

module.exports = {Login,Register,Delete};