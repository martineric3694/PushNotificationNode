// server.js
const express = require('express');
const webPush = require('web-push');

const app = express();
const port = 3000;

const vapidKeys = {
    publicKey: 'BN9DTn5s1QTDijhjJTlf4pvKGy1Mp3_edTfBmTCDbzhKebgVPk6LaDoIoVZYvbURNHtjj-1y22DTd2Pm3k-7m1E', // Replace with your public key
    privateKey: 'H1Zt3xpKwzudtdQmR6X7UrS72PJC9QIIv4r07u4G2hA' // Replace with your private key
};

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({}); // Respond to the client immediately

    const payload = JSON.stringify({ title: 'Push Notification', body: 'You have a new notification!' });
    
    webPush.sendNotification(subscription, payload)
        .catch(err => console.error('Error sending notification:', err));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
