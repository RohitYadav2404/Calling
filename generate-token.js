const jwt = require('jsonwebtoken');

// 🔒 Replace these with your actual Twilio credentials
const ACCOUNT_SID = 'ACeb619479c58f132b11ecf2d17dd8aca9'; // Your Twilio Account SID
const API_KEY_SID = 'SKcb0748651f295d081dc15e4904d2d292'; // Your Twilio API Key SID
const API_KEY_SECRET = 'hcU4AVhzxJwkrYFTNFRrp5zjdjT9jCzT';           // Your Twilio API Key Secret
const TWIML_APP_SID = 'AP862c21b14ccb74756418219f8826152b'; // Your TwiML App SID

const token = jwt.sign(
  {
    jti: API_KEY_SID + '-' + Date.now(),
    grants: {
      identity: 'example-user', // Set user identity here
      voice: {
        incoming: { allow: true },
        outgoing: {
          application_sid: TWIML_APP_SID,
        },
      },
    },
  },
  API_KEY_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: API_KEY_SID,
    subject: ACCOUNT_SID,
  }
);

console.log('Generated JWT:\n', token);
