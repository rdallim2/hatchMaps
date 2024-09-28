const puppeteer = require('puppeteer');

const url = "https://waterdata.usgs.gov/or/nwis/current?type=qw&PARAmeter_cds=STATION_NM,DATETIME,00010,00011";

const temps = async () => {
    const browser = await puppeteer.launch(); //launch the browser
    const page = await browser.newPage(); // make new tab
    await page.goto(url); //got to url
    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i) {
            console.log(`PAGE LOG: ${msg.args()[i]}`);
        }
    });

    const trdata = await page.evaluate(() => {
        const tbodyElements =  document.querySelectorAll('body > table > tbody');
        const tbody = tbodyElements[1];
        if (!tbody) {
            console.log("The <tbody> element was not found on the page.");
        }
        console.log('Content of <tbody>:', tbody.innerHTML);
        const trElements = tbody.querySelectorAll('tr');
        return Array.from(trElements).map(tr => {
            const tdElements = tr.querySelectorAll('td'); // Select all <td> elements within the <tr>

            
            const idNumText = tdElements[0]?.querySelector('a')?.textContent.trim() || 'N/A'; //Question marks are optional chaining, wont throw and error if it is null
            const idNum = !isNaN(idNumText) && idNumText !== '' ? Number(idNumText) : 'N/A';
            const waterBody = tdElements[1]?.textContent.trim() || 'N/A';
            const dateTime = tdElements[2]?.textContent.trim() || 'N/A';
            const temp = tdElements[3]?.querySelector('span')?.textContent.trim() || 'N/A';
            
            console.log(idNum, waterBody, dateTime, temp); //Log the data found
            return {idNum, waterBody, dateTime, temp};
        });
    });
    await browser.close();
};

temps();