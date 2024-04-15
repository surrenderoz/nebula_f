import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import {exec} from "child_process"
import { assert } from "console";

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

export async function POST(req: NextRequest) {
  // await execute_cmd()
    try {
      const {address, amount} = await req.json();

      // if(address != )
      console.log(address, amount);
      
      // await execute_cmd()
      return NextResponse.json(
        { error: "api working" },
        {
          status: 200
        }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "api not working" },
        {
          status: 400
        }
      );
    }
  }
