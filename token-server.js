const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// 🔐 Replace these with your actual Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY_SID;
const apiSecret = process.env.TWILIO_API_SECRET;
const appSid = process.env.TWILIO_APP_SID;

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
