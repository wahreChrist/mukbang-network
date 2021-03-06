const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("multer failed");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    // eslint-disable-next-line no-unused-vars
    const promise = s3
        .putObject({
            Bucket: "khorneworldeaters",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise()
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
};
