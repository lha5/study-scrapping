const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];

const selector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';

let i = 1;
function repeater(data, len) {
  if (i === len) {
    return console.log('끝');
  } else {
    checkFourth(i, data).then(repeater);
    i++;
  }
}

function getElements() {
  (async() => {
    const browser = await puppeteer.launch({ headless: false });
    
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 937
    });

    await page.goto(`https://datalab.naver.com/shoppingInsight/sCategory.naver`);
        
    setTimeout(async () => {
      await page.click(
        `${selector} > div:nth-child(1)`
      );
      await page.click(
        `${selector} > div:nth-child(1) > ul > li:nth-child(1) > a`
      );
    }, 500);

    setTimeout(async () => {
      await page.click(
        `${selector} > div:nth-child(2)`
      );
      await page.click(
        `${selector} > div:nth-child(2) > ul > li:nth-child(1)`
      );
    }, 1000);

    setTimeout(async() => {
      await page.click(
        `${selector} > div:nth-child(3)`
      );
      await page.click(
        `${selector} > div:nth-child(3) > ul > li:nth-child(1) > a`
      );
    }, 1500);

    setTimeout(async() => {
      let elements = await page.$$(`${selector} > div:nth-child(3) > ul > li`);
      console.log('테스트:: ', elements.length);

      for (let i = 1; i <= elements.length; i++) {
        setTimeout(async() => {
          await page.click(`#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(3)`);
        }, 300);
        
        (() => {
          setTimeout(async() => {
            try {
              await page.click(`#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div:nth-child(1) > div > div:nth-child(3) > ul > li:nth-child(${i}) > a`);
            } catch (error) {
              console.error( i, '번째 ,', '에러!! ', error);
            }
          }, 500)
        })(i);
        setTimeout(async() => {
          try {
            if (await page.$(`${selector} > div:nth-child(4)`)) {
              console.log('네 번째 카테고리 있음');
            }
          } catch (error) {
            console.error('에러!! ', error);
          }
        }, 700);
      }
    }, 2000);

    setTimeout(async() => {
      const content = await page.content();
      const $ = cheerio.load(content);
      
      const forthSelector = `${selector} > div:nth-child(1) > div > div:nth-child(4)`;
      
      let tempData2 = $(`${selector} > div:nth-child(2) > ul > li`);
      let tempData3 = $(`${selector} > div:nth-child(3) > ul > li`);
      let tempData4 = $(forthSelector) ? $(`${forthSelector} > ul > li`) : null;
  
      setTimeout(() => {
        tempData2.each((idx, one) => {
          let temp = {};
    
          let dataid = $(one).find('a').get();
          const title = $(one).find('a').text();
    
          temp.cid = dataid[0].attribs['data-cid'];
          temp.categoryName = title;
  
          data2.push(temp);
        });
        // console.log('가져온 두 번째 카테고리:: ', data2);
      }, 500);

      setTimeout(() => {
        tempData3.each((idx, one) => {
          let temp = {};
    
          let dataid = $(one).find('a').get();
          const title = $(one).find('a').text();
    
          temp.cid = dataid[0].attribs['data-cid'];
          temp.categoryName = title;
  
          data3.push(temp);
        });
        // console.log('가져온 세 번째 카테고리:: ', data3);
      }, 1000);
  
      if (tempData4) {
        setTimeout(() => {
          tempData4.each((idx, one) => {
            let temp = {};
      
            let dataid = $(one).find('a').get();
            const title = $(one).find('a').text();
      
            temp.cid = dataid[0].attribs['data-cid'];
            temp.categoryName = title;
    
            data4.push(temp);
          });
          console.log('가져온 네 번째 카테고리:: ', data4);
        }, 1200);
      }
    }, 5000);
    
    setTimeout(async() => {
      // setTimeout(() => {
      //   fs.writeFile(`./data/category/02.json`, JSON.stringify(data2, null, 2), error => {
      //     if (error) {
      //       console.log(i, '번째', ' 파일 생성 실패 ', error);
      //     }
      //   });
            
      //   fs.writeFile(`./data/category/03.json`, JSON.stringify(data3, null, 2), error => {
      //     if (error) {
      //       console.log(i, '번째', ' 파일 생성 실패 ', error);
      //     }
      //   });

      //   fs.writeFile(`./data/category/04.json`, JSON.stringify(data4, null, 2), error => {
      //     if (error) {
      //       console.log(i, '번째', ' 파일 생성 실패 ', error);
      //     }
      //   });
      // }, 1200);

      browser.close();
    }, 7000);
  })();
}

function test() {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    
    const page = await browser.newPage();

    // await page.setViewport({
    //   width: 1920,
    //   height: 937
    // });

    await page.goto(`https://datalab.naver.com/shoppingInsight/sCategory.naver`);

    let temp;

    setTimeout(async() => {
      await page.click(
        `${selector} > div:nth-child(1)`
      );
      await page.click(
        `${selector} > div:nth-child(1) > ul > li:nth-child(1) > a`
      );
      console.log('첫 번째 카테고리 클릭 완료');
      await page.click(
        `${selector} > div:nth-child(2)`
        );
      await page.click(
        `${selector} > div:nth-child(2) > ul > li:nth-child(1)`
      );
      console.log('두 번째 카테고리 클릭 완료');
    }, 500);

    setTimeout(async() => {
      const sel = '`#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div > div:nth-child(3)'
      let data = {};
      await page.waitForSelector(sel, { timeout: 1000 });
      let tempData = await page.$$(`${sel} > ul > li > a`);
      data.one = await page.evalueate(data => data.textContent, tempData);

      console.log('?>???? ', data.one);
      // console.log('?>???? ', tempData2);
    }, 1000);

    setTimeout(async() => {
      await browser.close();
    }, 1500);
  })();
}

function checkFourth(i, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      (async () => {
        const page = await browser.page();

        await page.click(
          `${selector} > div:nth-child(3)`
        );

        await page.click(
          `${selector} > div:nth-child(3) > ul > li:nth-child(${i}) > a`
        );

        console.log('세 번째 카테고리 클릭 완료');

        try {
          if (await page.$(`${selector} > div:nth-child(4)`)) {
            console.log("네 번째 카테고리 있음");
          }
        } catch (error) {
          console.error("에러!! ", error);
        }

        browser.close();
      })();
      resolve();
    }, 1000);
  });
}

// getElements();

test();
