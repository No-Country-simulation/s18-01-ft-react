const Emp = require('../persistencia/models/emp.models.js');
const crip = require("bcryptjs")
const {createAccess}= require("../utils/createAcesstoken.js")

const registerEmp = async (req, res) => {
    console.log("aa");
    const { domain, name, email, password } = req.body;
    try {
        const empex = await Emp.findOne({ name });
        if (empex) {
            return res.status(409).json({
                code: 409,
                data: [],
                status: 'error',
                message: `El username ${username} ya esta en uso`
            });
        }
        const empemail = await Emp.findOne({ email });

        if (empemail) {
            return res.status(409).json({
                code: 409,
                data: [],
                status: 'error',
                message: "El email ya esta registrado"
            });
        }
        const hash = await crip.hash(password, 10);
        const newEmp = new Emp({
            email,
            password: hash,
            name,
            domain 
        });
        console.log("aaa", newEmp);
        const rEmp = await newEmp.save();
        console.log("guardo", rEmp);
        
        const token = await createAccess({ id: rEmp.id });
        console.log("token creado");
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.status(201).json({
            code: 201,
            data: {
                id: rEmp.id,
                name: rEmp.name,
                token: token,
                email: rEmp.email,
                domain: rEmp.domain 
            },
            status: 'success'
        });

    } catch (err) {
        return res.status(500).json({
            code: 500,
            data: [],
            status: 'error',
            message: error.message
        });
    }
};

const loginEmp = async (req, res) => {
    const { email, password } = req.body
    const exEmp = await Emp.findOne({ "email": email })
    if (!exEmp) {
        return res.status(409).json({ message: "email no register" })
    }
    try {
        const compareHash = await crip.compare(password, exEmp.password)
        if (!compareHash) {
            return res.status(401).json({ message: "Invalid credentials" })
        };
        const token = await createAccess({ id: exEmp.id })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.json({
            id: exEmp.id,
            email: exEmp.email,
            name: exEmp.name,
            domain: exEmp.domain
        })
    } catch (err) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {
    registerEmp,
    loginEmp
};