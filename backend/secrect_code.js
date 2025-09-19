// Node.js
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');
const refreshSecret = crypto.randomBytes(32).toString('hex');

console.log('JWT_SECRET:', jwtSecret);
console.log('JWT_REFRESH_SECRET:', refreshSecret);

