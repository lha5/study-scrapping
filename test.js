const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
// const fs = require('fs');

const selector = '#content > div.section_instie_area.space_top > div > div.section.insite_inquiry > div > div > div.form_row:nth-child(1) > div';

function main() {
  (async () => {
    const pageURL = 'https://datalab.naver.com/shoppingInsight/sCategory.naver';
    
    const browser = await puppeteer.launch({ headless: false });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setViewport({
      width: 1920,
      height: 937
    });
    await page.goto(pageURL);

    // await page.click(`${selector} > div:nth-child(1)`);
    
    setTimeout(async() => {
      const content1 = await page.content();
      const $1 = cheerio(content1);
      let first = $1(`${selector} > div:nth-child(1) > ul > li`);

      first.each((idx, one) => {
        let temp = {};
  
        let dataid = $(one).find('a').get();
        const title = $(one).find('a').text();
  
        temp.cid = dataid[0].attribs['data-cid'];
        temp.categoryName = title;

        console.log('temp?? ', temp);
      });
      await context.close();
    }, 1000);
  })();
}

main();
