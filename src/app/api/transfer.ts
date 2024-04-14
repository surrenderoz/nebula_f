import type { NextApiRequest, NextApiResponse } from 'next'
import {exec} from "child_process"

function execute_cmd(address:string, amount: Number) {
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // const  {address} = req.body;

        // console.log(address);
        
        // await execute_cmd()
        return res.status(200).json({
            message: 'sent',
        })
    } catch (error) {
        return res.status(200).json({
            message: 'sent',
        })
    }
}