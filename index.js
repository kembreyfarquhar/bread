// import app from server.js file
const app = require('./server')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT

// LISTEN
app.listen(PORT, () => console.log(`\n***Running on port:${PORT}***\n`))
