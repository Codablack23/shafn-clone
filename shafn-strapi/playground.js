// Generate Secret Keys:
const crypto = require("crypto");

for (let x = 0; x < 5; x++) {
  console.log(crypto.randomBytes(16).toString("base64"));
}
