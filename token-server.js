const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// 🔐 Replace these with your actual Twilio credentials
const accountSid = 'ACeb619479c58f132b11ecf2d17dd8aca9';
const apiKey = 'SKc780f67f965c4d226da2f13e3ff98256';
const apiSecret = 'dcJ91HWkcgAcf6BMrX9SleDT2mp35x7G';
const outgoingAppSid = 'AP862c21b14ccb74756418219f8826152b'; // optional

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/token', (req, res) => {
  const identity = req.query.identity || 'anonymous';

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingAppSid,
    incomingAllow: true
  });

  const token = new AccessToken(accountSid, apiKey, apiSecret, { identity });
  token.addGrant(voiceGrant);

  res.send({
    identity,
    token: token.toJwt()
  });
});

app.listen(port, () => {
  console.log(`Twilio token server running on port ${port}`);
});
