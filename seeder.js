const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Question = require('./models/Question');
const Answers = require('./models/Answers');
const TIps = require('./models/Tips');
const Zone = require('./models/Zone');
const Tips = require('./models/Tips');



// Connect to DB
mongoose.connect('mongodb+srv://Donacien:GyZVdc1McWPmSZ86@cluster0.nllfx.mongodb.net/whatsays?retryWrites=true&w=majority', {
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

// Read JSON files
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/question.json`, 'utf-8')
);

const answers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/answers.json`, 'utf-8')
);

const tips = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tips.json`, 'utf-8')
);

const zones = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/zone.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Question.create(questions);
    await Answers.create(answers);
    await Tips.create(tips);
    await Zone.create(zones);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
