const getJwtToken = require('./jwtToken')

const cookieToken = (user) => {
    const token = getJwtToken(user.id)
    const options ={
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true
    }

    user.password = undefined;

    return { token, options };
}

module.exports = cookieToken;