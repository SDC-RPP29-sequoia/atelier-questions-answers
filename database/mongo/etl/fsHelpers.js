const fs = require('fs');
const path = require('path');

module.exports.getFileAsObject = (section) => {
  const filePath = path.resolve(__dirname, `./json/${section}.json`);
  try {
    let data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

module.exports.updateFile = (section, data) => {
  const filePath = path.resolve(__dirname, `./json/${section}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
