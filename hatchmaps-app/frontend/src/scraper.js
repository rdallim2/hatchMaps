const puppeteer = require('puppeteer');

const url = "https://waterdata.usgs.gov/or/nwis/current?type=qw&PARAmeter_cds=STATION_NM,DATETIME,00010,00011";

const temps = async () => {
    const browser = await puppeteer.launch(); //launch the browser
    const page = await browser.newPage(); // make new tab
    await page.goto(url); //got to url

    await page.screenshot({ path: 'screenshot.png'});
    await browser.close();

    /*
    const allTd = await page.evaluate(() => {
        const trData =  document.querySelectorAll('body > table > tbody > tr > td');

        return Array.from(trData).slice(0, 9).map((td) => {
            const idElement = td.querySelector('td').href;
            const idNum = tdElement && tdElement.querySelector('a') ? tdElement.querySelector('a').href : null;
            return {idNum};
        });
    });

    if (allTd.length === 0) {
        throw new Error('No matching elements found.');
    }

    console.log(allTd);
    */
};

temps();