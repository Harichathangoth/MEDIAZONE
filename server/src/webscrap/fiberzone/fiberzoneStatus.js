const puppeteer = require('puppeteer');


const fiberzonStatus = async (username, password) => {

    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage() 

    // await page.emulateNetworkConditions(puppeteer.networkConditions.Fast3G);
    // await page.setViewport({ width: 1280, height: 720 });
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (['image', 'stylesheet', 'font'].includes(resourceType)) {
            req.abort(); // Ignore images, fonts, stylesheets
        } else {
            req.continue(); // Continue with everything else
        }
    });
   
try {
   
    let response = await page.goto("https://customer.fiberzone.in", { timeout: 5000, waitUntil: 'domcontentloaded', })

    // Check the page is accessed correctly with status code
    if (!response.ok()) {
        throw new Error(`Failed to load page with status: ${response.status()}`);
      }

    
    // Login to the "fiberzon.in" as a customer
    await page.waitForSelector('#username')
    await page.type('#username', username)
    await page.waitForSelector("#password")
    await page.type("#password", password)
    await page.waitForSelector(".btn.btn.btn-primary.pull-right")
    await page.click(".btn.btn.btn-primary.pull-right", { visible: true }, { force: true })

    await page.waitForSelector('a[href="/aDhyZ25JVFR1MExQZU5lVDVvRnhQUT09"]', {timeout : 4000});
    await page.click('a[href="/aDhyZ25JVFR1MExQZU5lVDVvRnhQUT09"]');

     // Wait for the table to load
     await page.waitForSelector('#responsive-example-table', {timeout : 4000});

     // Extract the "Login Status" value
     const loginStatus = await page.evaluate(() => {
         const rows = document.querySelectorAll('#responsive-example-table tbody tr');
         for (let row of rows) {
             const label = row.querySelector('td:first-child')?.innerText?.trim();
             if (label === 'Login Status') {
                 return row.querySelector('td:nth-child(2)')?.innerText?.trim();
             }
         }
         return null;
     });

     await page.waitForSelector('a[href="/RWFWZHZNdVNIak51UGIwbkIxa0pDUT09"]', {timeout : 4000});
     await page.click('a[href="/RWFWZHZNdVNIak51UGIwbkIxa0pDUT09"]');
 
     // Print the extracted "Login Status"
     console.log('Login Status:', loginStatus);

    return loginStatus;

} catch (error) {
    console.log(error)
   try {
     // Extract the text from the error message and check if it matches
     const errorMessage = await page.$eval('.errorMessage', el => el.innerText);

     if (errorMessage.includes('Incorrect Username or Password.')) {
         return { error : "Your fiberzone Username or Password is incorrect.." };
     }
   } catch (error) {
    console.log(error)
    return { error : "server is down please try again later...!!" }
   }
    
}

finally {
    await browser.close()
}
}


module.exports = fiberzonStatus
