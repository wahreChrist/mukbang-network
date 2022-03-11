const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { compare, hash } = require("./bc");
const ses = require("./ses");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(
    cookieSession({
        secret: `secret string`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.get("/user/id.json", (req, res) => {
    if (req.session.sessId) {
        res.json({
            userId: req.session.sessId,
        });
    } else {
        res.json({
            userId: null,
        });
    }
});

// app.get('/user', (req, res) => {

// })

app.post("/user/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPassword) => {
            return db.addUser(first, last, email, hashedPassword);
        })
        .then(({ rows }) => {
            req.session.sessId = rows[0].id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in adding user", err);
            res.json({ success: false });
        });
});

app.post("/user/login.json", (req, res) => {
    let tempId;
    db.login(req.body.email)
        .then(({ rows }) => {
            tempId = rows[0].id;
            return compare(req.body.password, rows[0].password); // bcrypts function that compares first and second arguments
        })
        .then((isMatch) => {
            if (isMatch) {
                req.session.sessId = tempId;
                res.json({
                    success: true,
                });
            }
        })
        .catch((err) => {
            console.log("login error on backend", err);
            res.json({
                success: false,
            });
        });
});

app.post("/password/reset/start", (req, res) => {
    console.log("req.body:", req.body);
    db.login(req.body.email)
        .then(({ rows }) => {
            if (rows[0].id) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                return db.insertCode(rows[0].email, secretCode).catch((err) => {
                    console.log("error inserting a code", err);
                    res.json({ success: false });
                });
            }
        })
        .then(({ rows }) => {
            //returned code
            console.log("returned object after code insertion", rows);
            ses.sendEmail(
                "frollscuba@gmail.com",
                `Please enter this code to confirm your E-mail: ${rows[0].code}`,
                "Confirm your email"
            );
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log("error in sending email with code", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("req.body:", req.body); // req.body.code && req.body.newPass
    db.verifyCode(req.body.email)
        .then(({ rows }) => {
            if (rows[0].code == req.body.code) {
                hash(req.body.newPass).then((hashedPass) => {
                    return db
                        .updatePass(hashedPass)
                        .catch((err) =>
                            console.log("error updating db with new pass", err)
                        );
                });
            }
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in updating pass", err);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
