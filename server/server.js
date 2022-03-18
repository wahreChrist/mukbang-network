const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { compare, hash } = require("./bc");
const ses = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");

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

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/profile-pic", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("file object:", req.file);
    db.updatePic(
        req.session.sessId,
        `https://s3.amazonaws.com/khorneworldeaters/${req.file.filename}`
    )
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in uploading new profile pic", err);
            res.json({ success: false });
        });
});

app.post("/update-bio", async (req, res) => {
    try {
        const updateBio = await db.updateBio(
            req.session.sessId,
            req.body.bioDraft
        );
        // console.log("updated bio from db", updateBio.rows);
        res.json(updateBio.rows[0]);
    } catch (err) {
        console.log("error in updating bio in db", err);
    }
});

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

app.get("/user", async (req, res) => {
    try {
        const getUser = await db.getUser(req.session.sessId);
        res.json(getUser.rows[0]);
    } catch (err) {
        console.log("error in retreiving a user data", err);
    }
});

app.get("/friendship/:otherUserId", async (req, res) => {
    // console.log(req.params); works
    try {
        const getStatus = await db.getStatus(
            req.session.sessId,
            req.params.otherUserId
        );
        console.log("pair status", getStatus.rows[0]);
        getStatus.rows.length == 0
            ? res.json({ status: "empty" })
            : res.json(getStatus.rows[0]);
    } catch (err) {
        console.log("error in getting friend status", err);
    }
});

app.post("/friendship-status", async (req, res) => {
    // req.body
    if (req.body.action === "Send fren request") {
        // eslint-disable-next-line no-unused-vars
        const performReq = await db.createInvite(
            req.session.sessId,
            req.body.otherUserId
        );
        res.json({ status: "inviteSent" });
    } else if (
        req.body.action === "Unfren" ||
        req.body.action === "Cancel fren request"
    ) {
        // eslint-disable-next-line no-unused-vars
        const performReq = await db.unfriend(
            req.session.sessId,
            req.body.otherUserId
        );
        res.json({ status: "unfriended/canceled" });
    } else if (req.body.action === "Accept fren request") {
        // eslint-disable-next-line no-unused-vars
        const performReq = await db.acceptInvite(
            req.session.sessId,
            req.body.otherUserId
        );
        res.json({ status: "accepted" });
    }
});

//get all users route
app.get("/getAllUsers", async (req, res) => {
    try {
        const getAllUsers = await db.getAllUsers();
        res.json(getAllUsers.rows);
    } catch (err) {
        console.log("error in getting all users", err);
    }
});

app.get("/searchUsers/:search", async (req, res) => {
    try {
        // console.log("req.params:", req.params);
        const getMatchingUsers = await db.getMatchingUsers(req.params.search);
        res.json(getMatchingUsers.rows);
    } catch (err) {
        console.log("error in searching query", err);
    }
});

app.get("/fetchUser/:otherUserId", (req, res) => {
    db.fetchOtherUser(req.params.otherUserId)
        .then(({ rows }) => {
            rows.push(req.session.sessId);
            // console.log("rows object from fetching other user info", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in getting user info", err);
        });
});

app.post("/user/register.json", async (req, res) => {
    const { first, last, email, password } = req.body;
    if (
        first != "" &&
        first.length > 3 &&
        last != "" &&
        last.length > 3 &&
        email != "" &&
        email.length > 3 &&
        password != "" &&
        password.length > 3
    ) {
        try {
            const hashedPassword = await hash(password);
            const addUser = await db.addUser(
                first,
                last,
                email,
                hashedPassword
            );
            console.log(addUser.rows[0].id);
            req.session.sessId = addUser.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("error in adding user", err);
            res.json({ success: false });
        }
    } else {
        console.log("provide valid credentials");
        res.json({ success: false });
    }
});

app.post("/user/login.json", async (req, res) => {
    if (req.body.email != "" && req.body.password != "") {
        try {
            let tempId;
            const login = await db.login(req.body.email);
            tempId = login.rows[0].id;
            const comparison = await compare(
                req.body.password,
                login.rows[0].password
            ); // bcrypts function that compares first and second arguments
            // console.log("match?", comparison); //isMatch property omited?
            if (comparison) {
                req.session.sessId = tempId;
                res.json({
                    success: true,
                });
            } else {
                throw new Error("password doesnt match");
            }
        } catch (err) {
            console.log("login error on backend", err);
            res.json({
                success: false,
            });
        }
    } else {
        console.log("provide valid login credentials");
        res.json({
            success: false,
        });
    }
});

app.post("/password/reset/start", (req, res) => {
    // console.log("req.body:", req.body);
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
            // console.log("returned object after code insertion", rows);
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
    // console.log("req.body:", req.body); // req.body.code && req.body.newPass
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
