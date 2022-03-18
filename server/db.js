const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `,
        [first, last, email, password]
    );
};

module.exports.login = (email) => {
    return db.query(
        `
        SELECT password, id, email FROM users WHERE email = $1
    `,
        [email]
    );
};

module.exports.insertCode = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *
        `,
        [email, code]
    );
};

module.exports.verifyCode = (email) => {
    return db.query(
        `
        SELECT * FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
        ORDER BY timestamp DESC
        LIMIT 1
    `,
        [email]
    );
};

module.exports.updatePass = (password) => {
    return db.query(
        `
        UPDATE users SET password = $1
    `,
        [password]
    );
};

module.exports.getUser = (userId) => {
    return db.query(
        `
    SELECT * FROM users WHERE id = $1
    `,
        [userId]
    );
};

module.exports.updatePic = (id, pic) => {
    return db.query(
        `
        UPDATE users SET profile_pic = $2 WHERE id = $1
        RETURNING profile_pic
    `,
        [id, pic]
    );
};

module.exports.updateBio = (id, bio) => {
    return db.query(
        `
        UPDATE users SET bio = $2 WHERE id = $1
        RETURNING bio
    `,
        [id, bio]
    );
};

module.exports.getAllUsers = () => {
    return db.query(`
        SELECT id, first, last, profile_pic FROM users
        ORDER BY created_at DESC
        LIMIT 3
    `);
};

module.exports.getMatchingUsers = (val) => {
    return db.query(
        `
        SELECT id, first, last, profile_pic FROM users
        WHERE first ILIKE $1
    
    `,
        [val + "%"]
    );
};

module.exports.fetchOtherUser = (userId) => {
    return db.query(
        `
        SELECT id, first, last, email, profile_pic, bio  FROM users WHERE id = $1
    `,
        [userId]
    );
};

module.exports.getStatus = (loggedId, otherUserId) => {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
    `,
        [loggedId, otherUserId]
    );
};

module.exports.createInvite = (loggedId, otherUserId) => {
    return db.query(
        `
        INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES ($1, $2, $3) 
    `,
        [loggedId, otherUserId, false]
    );
};

module.exports.acceptInvite = (loggedId, otherUserId) => {
    return db.query(
        `
        UPDATE friendships SET accepted = $3 WHERE (recipient_id = $1 AND sender_id = $2)
        
    `,
        [loggedId, otherUserId, true]
    );
};

module.exports.unfriend = (loggedId, otherUserId) => {
    return db.query(
        `
        DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1) 
    `,
        [loggedId, otherUserId]
    );
};
