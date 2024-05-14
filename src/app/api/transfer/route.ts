import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import {exec} from "child_process"
import { assert } from "console";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
const url = "https://json-rpc.nebula.evm.ra.blumbus.noisnemyd.xyz/";
const key = process.env.NEXT_PUBLIC_PK;
const provider: any = new HDWalletProvider(String(key), url);
import NodeCache from "node-cache";

const web3 = new Web3(provider);
const abi = require("./abi.json");

const myCache = new NodeCache({checkperiod: 10, });

const contractDYM = new web3.eth.Contract(abi, "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd");
// const contractNBL = new web3.eth.Contract(abi, "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd");

myCache.on("expired", (key, value) => {
  console.log(key, value, "key is expired ");
})

export async function POST(req: NextRequest) {
  // await execute_cmd()
    try {
      const {address, amount} = await req.json();
      let find: any = myCache.get(address);
      console.log(find);
      
      if(find?.address == address) {
          return NextResponse.json({
            code: 100,
            message: "Try again in next 24hrs"
          })
      }      
      let trx = await contractDYM.methods.transfer(address, 2*10**18).send({from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E'});
      // web3.eth.accounts.
      let nonce = await web3.eth.getBlock();
      console.log(nonce, "nonce");
      
      const sign = await web3.eth.accounts.signTransaction({
        value: 5*10**18,
        to: address,
        from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E',
        gas: 25000,
        gasPrice: 10,
        // nonce
      }, key as string)
      // if(address != )
       let neTRx =  await web3.eth.sendSignedTransaction(sign.rawTransaction)
      console.log(address, trx);
      console.log("trx", neTRx);

      let obj = {address};
      let success = myCache.set(address, obj, 86400);
      console.log(success);
      
      
      // await execute_cmd()
      return NextResponse.json(
        { message: "done" },
        {
          status: 200
        }
      );
    } catch (error) {
      console.log(error);
      
      return NextResponse.json(
        { error: "api not working", },
        {
          status: 400
        }
      );
    }
  }


const addresses = [
  "0xbac3b25a91d36f9771714be3b163026f1d9f728d",
    "0x1E3E0924A23CcAD761dcFC321800Ac190E92b2b8",
    "0x8B581327F1dF849A912bb516B16706bfcc387bAa",
    "0xC01214660A5458A568D0301dcd89174FeB6dD45C",
    "0xAA8292640467177ff67892aC2E0824afB092e2b0",
    "0xe533c54572719dC864A66AaeA4C23F15b654a6F2",
    "0xf7cFd8FAF818503c0a13de3697573e83264dE5bD",
    "0xdC6dDA287c93Ac7C7CEf33889151839A5924FA0A",
    "0xE0015423D697878C530d8D2Aa8fb1CAb2aDBa757",
    "0x160bE805dd3e06997a58159268150afB4bE44535",
    "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
    "0xdC6dDA287c93Ac7C7CEf33889151839A5924FA0A",
    "0x887Fe7DcDE96c25eaF3bAC83E24c67F13ce4055d"
]


// export async function GET() {
//   try {
//     const sendAddress = [];
//       for(let add of addresses) {
//         console.log(add, "address");
//         let trx = await contractDYM.methods.transfer(add, 2*10**18).send({from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E'});
//       // web3.eth.accounts.
//         let nonce = await  web3.eth.getBlockTransactionCount(add);
//         console.log(nonce, "nonce");
        
//           const sign = await web3.eth.accounts.signTransaction({
//             value: 5*10**18,
//             to: add,
//             from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E',
//             gas: 500000,
//             gasPrice: 100,
//             nonce: nonce
        
//           }, key as string)
//           // if(address != )
//           let neTRx =  await web3.eth.sendSignedTransaction(sign.rawTransaction)
//           console.log(add, trx);
//           console.log("trx", neTRx);
//           sendAddress.push(add)
//       }
//       return NextResponse.json({
//         message: 'success'
//       })
//   } catch (error) {
//     console.log(error);
//   }
// }