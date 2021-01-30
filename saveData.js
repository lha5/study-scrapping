const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb://localhost:27017/sellerbee',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    .then(() => console.log('MongoDB is connected!'))
    .catch(err => console.log(err));

const Category = require('./model/Category');

const save1 = require('./data/category/001.json');
const save2 = require('./data/category/002.json');
const save3 = require('./data/category/003.json');
const save4 = require('./data/category/004.json');

function insertData() {
  for (let i = 0; i < save1.length; i++) {
    Category
      .create(save1[i])
      .then(category => console.log('데이터 생성 성공'))
      .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));  
  }

  for (let i = 0; i < save2.length; i++) {
    Category
      .create(save2[i])
      .then(category => console.log('데이터 생성 성공'))
      .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));  
  }

  for (let i = 0; i < save3.length; i++) {
    Category
      .create(save3[i])
      .then(category => console.log('데이터 생성 성공'))
      .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));  
  }

  for (let i = 0; i < save4.length; i++) {
    Category
      .create(save4[i])
      .then(category => console.log('데이터 생성 성공'))
      .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));  
  }

  return null;
}

insertData();

mongoose.disconnect();