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
            message: "Try Again In Next 24hrs"
          })
      }
      
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

      let obj = {address};
      let success = myCache.set(address, obj, 120);
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
        { error: "api not working", message: error },
        {
          status: 400
        }
      );
    }
  }


const addresses = [
  "0xe7cD1BBe3b3A36484BCd5288924a13f22217F9CF",
  "0x617Ad728B6B0e7c3Da94b066A64F2fA8F0e7d7A0",
  "0x25fe4E73dd489633eEC171A9BC76d50199FAed11",
  "0x62F8d14aE98e350B9fD0955a6B00e7B1755cC9E6",
  "0x488DC1e39D973ebf2F933744F6B0b9bEcC38230a",
  "0xbea55f36760AD4A8144B57Ef7136Ec66B188E913",
  "0x7b9C5C8506D22196bD6F41983bdd5629Eb8224e3",
  "0x94B33bd980ab61657F913F41CFedE158CD062f5f",
  "0xc24806dd03D483A7A6C0DCa11F530E689E639101",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0x3FDa798f1D4018A6a4129054d71a6fa702146E98",
  "0xC0D535bACa891e9104Ac3bafB6D039C4dAE2c995",
  "0x77f9fb219AEE3540832a288114A00e64C42EEC41",
  "0x2617A02302F9C1c5BD0dd9AdeA4ED08d06e762e9",
  "0x45D48e4d04458f33845024Ff2E5FFC8ca6d2d8FA",
  "0xebE7F028F69289C1Ef617638369e760DFA22F160",
  "0xA6FD22E7BE798cF35E296FBb68B23639D43B0D0F",
  "0xDc5C44d850d1744fF91718870d1CfFc1b77A4A35",
  "0xD39D32F7cDDF831e0588e9194d61A378215c2CCe",
  "0x1F92CA41f6a769BdB771496b4b847edCC32342FB",
  "0x5c728c75f4845Dc19f1107a173268297908aC883",
  "0x0E131B1537E57FeA011c7FcEcf0dDbC829A9a347",
  "0xD9Ba01Fd9b3c9523094FfC476eF59181587ca267",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0xB2586C0bB57796F6eE8ff48eFD07171450E6b545",
  "0xF2445B5688cdA8e18aFE4dB89d3C6Eee54b66A65",
  "0xfaB78320f1a07D6DB13B1a8D2D2b668E10Ded183",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0xf9ea8B3dfcc0b55D759b48c58B34f71B1c4F7132",
  "0x2D851d05402CDB63EDB4F7826B68862F4328FD72",
  "0x13B19fd63d34Be9d3D6d25ebd7142134C0cfc725",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0x26bE2C1c22c22590eE02172CbA2E1ca4ef1C735f",
  "0x898CAC6cA0F7b031556ae5Bd968C3CF622F70469",
  "0x6e50cdB7d4620621Aed3738c1c7409D8aa67A523",
  "0x4222d70bE0b11e2Ef351325A49B8F5933BC496fb",
  "0x00a29D40da8718B992a9d1E46717d826e7D817f5",
  "0xAC9BD03F89C71A028107809432F27CbE16DF1aF8",
  "0xd19e5d57Af3ff37d9f6B94BBb86Dc808f2e1cd25",
  "0x2d2F34F4364c2cffAd02f844315660620E979E7f",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0x258BBb1Ceb575f6f3Dd3c56d65D73Bb1788388c2",
  "0x92751712B2F6ADE4AD1F35a837591A66394C6799",
  "0xfaE78A90a4769e8f92c606ED0eF2D367DFAc7AAc",
  "0xEc296Fd08e560d8FDcB81E9EA4C06d8eCc01189F",
  "0x67733d62bCF6C3E790F6146f515EdBbDeDD044dd",
  "0xCD3bb9Db198f3F1E5eD8b4ee41D5beF642247Beb",
  "0xE3e2c649fef52652a17394Fe139373CA315DD83E",
  "0x93574c1E3273Dd85389EC59B6a2DfCd8cB7b79Cb",
  "0xEf5225409BAa31c9e1Aa1CD4A4564c59c08bb0CE",
  "0xaEC3e20Ac93D0E276ec78fF8e69D91f2304724AB",
  "0x258BBb1Ceb575f6f3Dd3c56d65D73Bb1788388c2",
  "0xF36A444A76176Edf130908AFeA9F264C9af87B2C",
  "0x898CAC6cA0F7b031556ae5Bd968C3CF622F70469",
  "0xA2B5F0114E7935EFcBd7c038d789Bfa71f2Bfe5D",
  "0x94875Ab3F15FE2E04BaBB0911D63001fAde5f641",
  "0xD0e7efC5c7b454FaE7c7E1A3d8bC2683CDe1Ea40",
  "0xf5640acf55E39DA9C0dD670D7A5A5Ac3815FFA55",
  "0x40386Bc77396b690AEb11A08a5bE61edF84D213A",
  "0xA2B5F0114E7935EFcBd7c038d789Bfa71f2Bfe5D",
  "0xCD3bb9Db198f3F1E5eD8b4ee41D5beF642247Beb",
  "0xfaE78A90a4769e8f92c606ED0eF2D367DFAc7AAc",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0xBD9c4E1D434f2D3e21f7F33316B4Ee7F61869fab",
  "0x3e46DD3dCa90b390A666E384291786Da59979a3D",
  "0xBD9c4E1D434f2D3e21f7F33316B4Ee7F61869fab",
  "0x73bA8DB495F8278Aa3c94C81a4FFeabFC43a9E70",
  "0xe533c54572719dC864A66AaeA4C23F15b654a6F2",
  "0x70ae41103E1ec8Fc1a39B1706E3458597ec4f61E",
  "0x514B7B3E8FD816E54aAb5954A7547Af0ca19e848",
  "0xF636a67B3C65a3aE4f2B8FB9b93F5998dd4607bc",
  "0x7B72272C6d3d3f3e6b14967b8818710e12474588",
  "0x1e8E6953055C732054CD8350A5D0967A90973E4A",
  "0xb16f5B214E162C71E57C822048b3f554E546874e",
  "0x407153f20D65B5419eba98Ed657FbF7622466A8B",
  "0x883F172a9D7f1E8a87ca8FB60Ed9ad18d7E6ba56",
  "0x9E3B9bAa562199aF18caA18161A10BB8F77a92be",
  "0x6B67fF345da567F0b8E1AA0B325409E913e75cdC",
  "0x3D83a8AC288A10b7A22c91C4Bf4c2aAbE053b71d",
  "0x23Fd20161f367c572cF88A4078FA9Ddc414127B1",
  "0x849793839Aedcb14d6C9c7011684f96377298B10",
  "0x9a8c862F80fC9c59eA51e2346511a910857A8214",
  "0xAd6300584Ca5D1133aaae4F85C29c68C512E8e19",
  "0xb9345e88880895051812B1776D2138f562ff4727",
  "0xdce63dd97Bfe106B3190a5EcDD012d86f6bef597",
  "0xC0ac70880619409F8d0315199dA2188DA9C589A6",
  "0xB59F4DA8D8af5bA248AF1f09d58Fcc883D04808e",
  "0x4cEF9a17C8997B8B8CE5c7D3FB20e2df0902495E",
  "0x1E3E0924A23CcAD761dcFC321800Ac190E92b2b8",
  "0xB184d8df9553013d6eb76429e49e9d0b4EC12bce",
  "0xebBb1A059E98849ae11685c3cFA5432f0D0C29d0",
  "0xfaE78A90a4769e8f92c606ED0eF2D367DFAc7AAc"
]


export async function GET() {
  try {
    const sendAddress = [];
      for(let add of addresses) {
        console.log(add, "address");

        let trx = await contractDYM.methods.transfer(add, 5*10**18).send({from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E'});
      // web3.eth.accounts.
          const sign = await web3.eth.accounts.signTransaction({
            value: 5*10**18,
            to: add,
            from: '0xcF4fC2a1b70Da35311719B82E0EE633Bf143239E',
            gas: 500000,
            gasPrice: 100
        
          }, key as string)
          // if(address != )
          let neTRx =  await web3.eth.sendSignedTransaction(sign.rawTransaction)
          console.log(add, trx);
          console.log("trx", neTRx);
          sendAddress.push(add)
      }
      return NextResponse.json({
        message: 'success'
      })
  } catch (error) {
    console.log(error);

    
  }
}