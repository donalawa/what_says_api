/**
* Description of the file. Add link pointers with {@link link
    name}
    * @author Donacien
    * @date 13/08/2020
    * Contributors : 
**/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

//IMPORTING THE ROUTES BELLOW
const tipsRouter = require('./routes/tipsRouter');
const questionRouter = require('./routes/questionsRouter');
const zoneRouter = require('./routes/zoneRoutes');
const answerRouter = require('./routes/answersRouter'); 


const app = express();

app.use(express.json()); 


// cors
app.use(cors())
//Install dotenv module
dotenv.config();


app.use('/uploads', express.static(path.join(__dirname,'/uploads')));


app.use(tipsRouter);
app.use(questionRouter);
app.use(zoneRouter);
app.use(answerRouter);

var port = process.env.PORT || 8070;

mongoose.connect('mongodb://localhost:27017/safe_app3', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
});

//mongodb://127.0.0.1:27017/seven_website4'
// 'mongodb+srv://mnde:Je+5*sus@cluster0.gbv3b.gcp.mongodb.net/SevenApi?retryWrites=true&w=majority'

// mongoose.connect('mongodb+srv://mnde:Je+5*sus@cluster0.gbv3b.gcp.mongodb.net/SevenApi?retryWrites=true&w=majority', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
// }, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Connected')
//     }
// });
// by default, you need to set it to false.
mongoose.set('useFindAndModify', true);
app.listen(port, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log(`Project is running on port ${port}`)
    }
})
