const https = require('follow-redirects').https;
const crypto = require('crypto');

exports.send = (otp, receiver) => {
  let options = {
    method: 'POST',
    hostname: process.env.HOST_NAME,
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: `App ${process.env.AUTHORIZATION}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    maxRedirects: 20,
  };

  let req = https.request(options, function (res) {
    let chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      let body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  let postData = JSON.stringify({
    messages: [
      {
        destinations: [{ to: receiver }],
        from: '447491163443',
        text: `WELCOME TO SUNFLOWER WORLD🌻
Your verification code is ${otp}`,
      },
    ],
  });

  req.write(postData);

  req.end();
};

exports.generateOTP = () => {
  return crypto.randomInt(10000, 100000);
};
