
const bcrypt = require('bcrypt');

const encriptText = async (text) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt);
}

const encriptCompare = async (text, hash) => {
    return await bcrypt.compare(text, hash);
}

module.exports = {encriptText, encriptCompare};