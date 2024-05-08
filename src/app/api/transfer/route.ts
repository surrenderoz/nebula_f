import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import {exec} from "child_process"
import { assert } from "console";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
const url = "https://json-rpc.nebula.evm.ra.blumbus.noisnemyd.xyz/";
const key = process.env.NEXT_PUBLIC_PK;
const provider: any = new HDWalletProvider(String(key), url);

const web3 = new Web3(provider);
const abi = require("./abi.json");

const contractDYM = new web3.eth.Contract(abi, "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd");
// const contractNBL = new web3.eth.Contract(abi, "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd");

export async function POST(req: NextRequest) {
  // await execute_cmd()
    try {
      const {address, amount} = await req.json();
      // let data = await web3.eth.getBlock();
      let trx = await contractDYM.methods.transfer(address, amount*10**18).send({from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E'});
      // web3.eth.accounts.
      const sign = await web3.eth.accounts.signTransaction({
        value: amount*10**18,
        to: address,
        from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E',
        gas: 25000,
        gasPrice: 10
    
      }, key as string)
      // if(address != )
       let neTRx =  await web3.eth.sendSignedTransaction(sign.rawTransaction)
      console.log(address, trx);
      console.log("trx", neTRx);
      
      // await execute_cmd()
      return NextResponse.json(
        { message: "api working" },
        {
          status: 200
        }
      );
    } catch (error) {
      console.log(error);
      
      return NextResponse.json(
        { error: "api not working" },
        {
          status: 400
        }
      );
    }
  }
