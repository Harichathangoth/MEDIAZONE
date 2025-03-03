const puppeteer = require('puppeteer');

// const username = "Vishnuc";
// const password = "vishnuc213";

const keralavisonData = async (username, password) => {

        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport : false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage() 
       
    try {
       
         // Navigate to the login page
    await page.goto('https://selfcare.keralavisionisp.com'); // Replace with the actual login URL

    // Wait for the inputs to be available
    await page.waitForSelector('input[autocomplete="off"]'); // Adjust the selector as needed for username
    await page.waitForSelector('input[type="password"]'); // Adjust the selector as needed for password

    // Type username and password
    await page.type('input[type="autocomplete="off""]', 'your-username-here'); // Replace with the actual username selector
    await page.type('input[type="password"]', 'your-password-here'); // Replace with the actual password selector

    // Click the login button (you need to find the right selector for the button)
    await page.click('button[type="submit"]'); // Adjust the selector as necessary

    
    } catch (error) {
       console.log(error)
    }

    finally {
        // await browser.close()
    }
}


// module.exports = keralavisonData

keralavisonData()