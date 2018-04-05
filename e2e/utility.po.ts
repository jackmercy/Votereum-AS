import { browser, element, by, protractor } from 'protractor';
const fs = require('fs');


function writeScreenShot(data, filename) {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
}

export default {
    writeScreenShot
};
