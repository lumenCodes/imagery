require('dotenv').config()
require('./config/database')()
const app = require('./app');


const port  = process.env.PORT || 4000;

app.listen(port, () => console.log('Speak Lumen, your server is listening.', port));
