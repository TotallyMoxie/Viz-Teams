const express = require('express');
const app = express();
const port = process.env.PORT || port;
const www = process.env.WWW || './';
app.use(express.static(www));
console.log(`serving ${www}`);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
