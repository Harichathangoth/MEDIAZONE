const puppeteer = require('puppeteer');

const username = "Vishnuc";
const password = "vishnuc213";

const fiberzonData = async (username, password) => {

        const browser = await puppeteer.launch({ 
            headless: "new",
            defaultViewport : false,
            userDataDir: "./tmp"
        });
        const page = await browser.newPage() 
       
    try {
       
        let response = await page.goto("https://customer.fiberzone.in", { timeout: 20000, waitUntil: 'networkidle2' })
        // const title = await page.title()
        // const url = await page.url()
        // console.log(title, url)

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
    
        // Optional: wait for the specific table element to be loaded
        await page.waitForSelector('#responsive-example-table', { timeout : 4000 });
    
        // Extract table data
        const tableData  = await page.evaluate(() => {
            const table = document.getElementById('responsive-example-table');
            const result = {};
            
            for (const row of table.getElementsByTagName('tr')) {
                const cols = row.getElementsByTagName('td');
                if (cols.length > 0) {
                    const key = cols[0].innerText.trim().replace(/[\s.]+/g, '');
                    let value = cols[1].innerText.trim();
    
                    // Handle special cases for formatting (like font colors)
                    if (cols[1].querySelector('font')) {
                        value = cols[1].querySelector('font').innerText.trim();
                    }
    
                    result[key] = value; // Add key-value pair to the result object
                }
            }
            
            return result;
        });
    
    
        // Extract "Data Usage and  Remaining Days" information from the keybox
        const keyboxData = await page.evaluate(() => {
            const result = {};
            const keyElements = document.querySelectorAll('.keybox .clearall');
    
            keyElements.forEach((element) => {
                const label = element.querySelector('.col-lg-7').innerText.trim().replace(/[\s.]+/g, '');
                const valueText = element.querySelector('.col-lg-5 span').innerText.trim();
                const value = parseFloat(valueText.split(' ')[0]); // Extract numeric part
                
                result[label] = value; // Store as number
            });
    
            return result;
        });
    
    
        //Open the "My profile" page , and fetch the USER information
        await page.waitForSelector("#toggle", { visible: true }); // Wait for the "My Profile" link to appear
        await page.click("#toggle"); // Click the link
        await page.waitForSelector(".fa.fa-user", { visible: true }); // Wait for the "My Profile" link to appear
        await page.click(".fa.fa-user", { force: true }); // Click the link
    
        // Scrape the table data
        await page.waitForSelector(".table", { visible: true })
        const userInfo = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('#responsive-example-table tr'));
            const data = {};
    
            rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 1) {
                const key = cells[0].textContent.trim().replace(/[\s.]+/g, '');
                const value = cells[1].textContent.trim();
                data[key] = value;
            }
            });
    
            return data;
        });
    
        // Combine data from table and keybox
        const combinedData = { ...tableData, ...keyboxData, ...userInfo };
    
        // Convert to JSON format
        // const  json = JSON.stringify(combinedData, null, 4);
    
        // Print the JSON data
        // console.log("json data", json);
    
        // Logout
        await page.waitForSelector(".dropdown-toggle.text-white", { visible: true });
        await page.click(".dropdown-toggle.text-white");
        await page.waitForSelector(".icon-upload", { visible: true });
        await page.click(".icon-upload", { force: true });

        // Clean the Data of broadband user
        combinedData.TotalNoOfDays = combinedData.TotalNoofDays
        combinedData.TotalNoOfData = combinedData.TotalNoofData
        combinedData.DataUsedInGB = combinedData.DataUsedinGB
        combinedData.Address = combinedData.Address ? combinedData.Address.replace(/\n/g, ', ') : "";

        //delete unwanted object 
        delete combinedData.TotalNoofDays;
        delete combinedData.TotalNoofData
        delete combinedData.DataUsedinGB

        console.log(combinedData)
      
        return combinedData;
    
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


module.exports = fiberzonData