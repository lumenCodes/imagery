const mongoose = require('mongoose');


module.exports= () => {
    mongoose.connect('mongodb://localhost:27017/imagery',
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
