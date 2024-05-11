const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require('zod');


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

console.log(' me ')

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);



function signJwt(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }

    const signature = jwt.sign({username}, jwtPassword)
    return signature;
}

// const me = signJwt('abhishek@gmail.com' , 'fdfdf')
// console.log(me)



/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */


//verify is kinda differnet from decode , if errror occurs it throws an error

function verifyJwt(token) {
    try{    
        const verified = jwt.verify(token , jwtPassword);
        return true;
    } catch(e){
        ans = false;
    }
    return ans

}

console.log(verifyJwt('sdfdfdfd'))





/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */


function decodeJwt(token) {
    // Your code here
    // return true or false if token can be decodedddd
    const decoded = jwt.decode(token);
    // this decoding is same me going to jwt.io to decode to get into the value
    // this does not require jwtpassword
    if(decoded){
        return true;
    }else{
        return false;
    }
}

// const me = decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzaGVrQGdtYWlsLmNvbSIsImlhdCI6MTcxNTMxNjY5NH0.0SFIfUdAATml_0KnXU6NX4xgjVWrpU9AqWLoPXaYeas')
// console.log(me)



module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
