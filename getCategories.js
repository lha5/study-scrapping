const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

function getInfo() {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let data = [];
    
    await page.goto(`https://datalab.naver.com/shoppingInsight/sCategory.naver`);

    const content = await page.content();

    const $ = cheerio.load(content);

    let tempData = $('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1) > ul > li');

    tempData.each((idx, category) => {
      const temp = {};

      const title = $(category).find('a').text();
      const dataid = $(category).find('a').get();

      temp.cid = dataid[0].attribs['data-cid'];
      temp.categoryName = title;

      data.push(temp);
    })
    
    fs.writeFile(`./data/categoryData/firstCategory.json`, JSON.stringify(data, null, 2), error => {
      if (error) {
        console.log('파일 생성 실패 ', error);
      }
    });
    
    await browser.close();
  })();
}

function category() {
  (async() => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 937 });

    await page.goto('https://datalab.naver.com/shoppingInsight/sCategory.naver');

    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1)');
    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(1) > ul > li:nth-child(2)');
    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2)');
    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li:nth-child(1)');
    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(3)');
    // await page.click('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(3) > ul > li:nth-child(1)');

    setTimeout(async() => {
      const content = await page.content();
  
      const $ = cheerio.load(content);
  
      let data2 = $('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(2) > ul > li');
      let data3 = $('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(3) > ul > li');
      let data4 = $('#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(4) > ul > li');

      let second = [];
      let third = [];
      let fourth = [];
  
      data2.each((idx, data) => {
        const temp = {};
  
        const title = $(data).find('a').text();
        const dataid = $(data).find('a').get();
  
        temp.cid = dataid[0].attribs['data-cid'];
        temp.categoryName = title;
  
        second.push(temp);
      });
      // console.log('두 번째 카테고리:: ', second);
  
      data3.each((idx, data) => {
        const temp = {};
  
        const title = $(data).find('a').text();
        const dataid = $(data).find('a').get();
  
        temp.cid = dataid[0].attribs['data-cid'];
        temp.categoryName = title;
  
        third.push(temp);
      });
      // console.log('세 번째 카테고리:: ', third);

      data4.each((idx, data) => {
        const temp = {};
  
        const title = $(data).find('a').text();
        const dataid = $(data).find('a').get();
  
        temp.cid = dataid[0].attribs['data-cid'];
        temp.categoryName = title;
  
        fourth.push(temp);
      });
      // console.log('네 번째 카테고리:: ', fourth);
  
      // fs.writeFile(`./data/categoryData/002.json`, JSON.stringify(second, null, 2), error => {
      //   if (error) {
      //     console.log('파일 생성 실패 ', error);
      //   }
      // });

      fs.writeFile(`./data/categoryData/003.json`, JSON.stringify(third, null, 2), error => {
        if (error) {
          console.log('파일 생성 실패 ', error);
        }
      });

      fs.writeFile(`./data/categoryData/004.json`, JSON.stringify(fourth, null, 2), error => {
        if (error) {
          console.log('파일 생성 실패 ', error);
        }
      });
      // 패션잡화 > 패션소품 부터 시작
      await browser.close();
    }, 10000);
  })();
}

category();
