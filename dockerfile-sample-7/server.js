'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

process.on('SIGTERM', function() {
    console.log('\ncaught SIGTERM, stopping gracefully');
    process.exit(1);
});

process.on('SIGINT', function() {
    console.log('\ncaught SIGINT, stopping gracefully');
    process.exit(1);
});

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
