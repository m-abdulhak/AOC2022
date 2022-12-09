const fs = require('fs');
const request = require('request');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const cookie = process.env.cookie;
const day = process.argv[2];

const fileUrl = `https://adventofcode.com/2022/day/${day}/input`;

const fileRelativePath1 = `./input/day${day}_1.txt`;
const fileRelativePath2 = `./input/day${day}_2.txt`;
const filePath1 = path.join(process.cwd(), fileRelativePath1);
const filePath2 = path.join(process.cwd(), fileRelativePath2);

request({
    url: fileUrl,
    jar: request.jar(),
    headers: {
        'Cookie': cookie
    }}, (error, response, body) => {
    if (error) {
        console.log(error);
    } else {
        if (body[body.length - 1] === '\n') {
            body = body.slice(0,-1);
        }
        fs.writeFile(filePath1, body, (err) => {
            if (err) {
            console.log(err);
            } else {
            console.log(`File saved to: ${filePath1}`);
            }
        });
        fs.writeFile(filePath2, body, (err) => {
            if (err) {
            console.log(err);
            } else {
            console.log(`File saved to: ${filePath2}`);
            }
        });
    }
});
