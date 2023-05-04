const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');

const app = express();
dotenv.config();

const postData = {
  assertion: process.env.ASSERTION,
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
};

app.get("/", (req,res) => {res.send("Getting JWT Token By using Admin Credentials... ")})

app.post('/oauth/token', async (req, res) => {
  try {
    const response = await axios.post('https://account-d.docusign.com/oauth/token', postData);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while requesting the access token.');
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.use('/',(req,res) => (res.send("Welcome to generate the Access Token by using JWT...")))
