var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BP6U4VanYwNnw45VxIJ83QNUBZ_fmUbw4iHb2Ct9kGlfBWc5LKSAVgGXBJDRCZ9wi2hPIcAaL8X2c05DpqcG4Xw",
   "privateKey": "veK0SCxgaCh2BPPyqPh1lzQGNZ2ylBWkJmrHuT9yXug"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ccV7eH1Nf1s:APA91bExcR0Q96WJYk1bsWFAP72in7dvoduqqNVsvwioM2v_FgI7E5dzXnDh7ku8MBPM683DXSV5b4JOuB9rzlSAi_WeXEEeKr2VDcrUX5ZLNI7NsBmrF7VD1gPEzAzTXwzIXtzAWmt4",
   "keys": {
       "p256dh": "BPOiKsk66oMGFr7yRRIpXExpjlUGnLhEN1hQmljkQK2u58nP/YcoG1K/b5TGsFjhj6lcUiAjw/ytshfUksoZvdU=",
       "auth": "MvHze7KnvNCSA6FED+BEGg=="
   }
};
var payload = 'Ayo tambahkan tim favorit kamu!';
 
var options = {
   gcmAPIKey: '846814434410',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);