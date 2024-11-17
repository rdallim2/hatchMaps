import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { parse } from 'date-fns-tz'; // For handling time zones
import { format } from 'date-fns';

const parseDateTime = (dateTimeStr) => {
    try {
        // Parse the input string
        const parsedDate = parse(dateTimeStr, 'MM/dd HH:mm zzz', new Date());
        // Convert to MySQL DATETIME format
        return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
        console.error("Error parsing dateTime:", error);
        return null; // Return null if parsing fails
    }
};

dotenv.config();
const url = "https://waterdata.usgs.gov/or/nwis/current?type=qw&PARAmeter_cds=STATION_NM,DATETIME,00010,00011";

const temps = async () => {
    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,  // 'db' from docker-compose
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const deleteData = 'DELETE FROM temp_data';
    await connection.execute(deleteData);
    console.log("Old data deleted from db");
    console.log("poop.");
    if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
    console.log("PUPPETEER_EXECUTABLE_PATH is not set. Please set the environment variable.");
    return; // or throw an error, or handle it as needed
    }
    const browser = await puppeteer.launch({
	executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,  // Ensure this is set correctly
        headless: true, // Set to false if you want to see the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox', "--disable-dev-shm-usage"]
    }); //launch the browser
    console.log("Browser set");
    const page = await browser.newPage(); // make new tab
    await page.goto(url); //got to url
    console.log("No errors yet.");
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
            const waterBody = tdElements[1]?.textContent.trim().substring(0,45) || 'N/A';
            const dateTime = tdElements[2]?.textContent.trim() || 'N/A';
            const temp = tdElements[3]?.querySelector('span')?.textContent.trim() || 'N/A';
            
            return {idNum, waterBody, dateTime, temp};
        });
    });

    for (let row of trdata) {
        const { idNum, waterBody, dateTime, temp } = row;
        const formattedDateTime = parseDateTime(dateTime);
        console.log(idNum, waterBody ,dateTime, temp); //Log the data found
        const query = `INSERT INTO temp_data (idNum, waterBody, dateTime, temp) VALUES (?, ?, ?, ?)`;
        await connection.execute(query, [idNum, waterBody, dateTime, temp]);
    }

    console.log("New data entered into the DB.");


    await browser.close();
    await connection.end();
}   

export default temps;
