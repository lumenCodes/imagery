const mongoose = require('mongoose');


module.exports= () => {
    mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }).then(() => {
        console.log('Connected to database...')

    })
    .catch((error) => {
        console.log('Failed connecting to db', error)

    })
};
