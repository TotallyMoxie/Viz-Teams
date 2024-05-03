const crypto = require("crypto");

function generateRandom2048BitHex() {
	const randomBytes = crypto.randomBytes(256); // 256 bytes for 2048 bits
	return randomBytes.toString("hex");
}

console.log(generateRandom2048BitHex());
