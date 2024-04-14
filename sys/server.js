const express = require('express');
const {exec} = require('child_process');
const {Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require("nodejs-web-scraper");

const app = express();
app.use(express.json())
const cmd = " "
function execute_cmd(address, amount) {
    exec(`rollapp_evm tx ibc-transfer transfer transfer channel-0 ${address} ${amount}uNDYM --from rollapp_sequencer --keyring-backend test --home ~/.roller/rollapp --broadcast-mode block`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

app.get("/", async (req, res) => {
    try {
        const {address, amount} = req.body;
        // execute_cmd(address, Number(address)*10**18)
        return res.json({
            message: 'success1'
        })

    } catch (error) {
        
    }
})

async function scrap_apr() {
    try {
        const config = {
            baseSiteUrl: `https://portal.dymension.xyz/dymension/metrics`,
            startUrl: `https://portal.dymension.xyz/dymension/metrics`,
            filePath: './images/',
            concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
            maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
            logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
        };
        const scraper = new Scraper(config);
        const root = new Root();

        //
        const category = new OpenLinks('.page');
        root.addOperation(category);
        let scrapped = await scraper.scrape(root);
        console.log(scrapped);
    } catch (error) {
        
    }
};
app.get("/app", async(req, res) => {
    try {
        scrap_apr();
        return res.json({
            message: 'supreme'
        })
    } catch (error) {
        
    }
})

app.listen(3001, () => {
    console.log("running");
});