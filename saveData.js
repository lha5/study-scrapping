const mongoose = require('mongoose');

// const Category = require('./model/Category');
// const save1 = require('./data/category/001.json');

// const Keyword = require('./model/Keyword');
// const keywordData1 = require('./data/keyword1/001.json');
// const keywordData2 = require('./data/keyword1/002.json');
// const keywordData3 = require('./data/keyword1/003.json');
// const keywordData4 = require('./data/keyword1/004.json');
// const keywordData5 = require('./data/keyword1/005.json');
// const keywordData6 = require('./data/keyword1/006.json');
// const keywordData7 = require('./data/keyword1/007.json');
// const keywordData8 = require('./data/keyword1/008.json');
// const keywordData9 = require('./data/keyword1/009.json');
// const keywordData10 = require('./data/keyword1/010.json');
// const keywordData11 = require('./data/keyword1/011.json');

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

function insertData() {
  // 카테고리 데이터 저장
  // for (let i = 0; i < save1.length; i++) {
  //   Category
  //     .create(save1[i])
  //     .then(category => console.log('데이터 생성 성공'))
  //     .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));  
  // }

  // 키워드(인기검색어) 저장
  // for (let i = 0; i < keywordData1.length; i++) {
  //   Keyword
  //   .create(keywordData1[i])
  //   .then(keyword => {})
  //   .catch(err => console.log('DB에 데이터 생성 중 에러 발생:: ', err));
  // }
  console.log('저장 완료');
}

insertData();
