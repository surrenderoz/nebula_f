import Web3 from "web3";
import {SigningStargateClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc"
import {decodePubkey, encodePubkey, makeSignDoc} from "@cosmjs/proto-signing"
import type {IbcExtension} from '@cosmjs/stargate/build/modules/ibc/queries';
import { SecretNetworkClient, WalletOptions, Wallet, MetaMaskWallet, MsgSend, pubkeyToAddress, base64PubkeyToAddress, tendermintPubkeyToValconsAddress } from "secretjs";
import {toBech32,  fromBech32} from "@cosmjs/encoding"
import SignMsg from "./evmmsg";

const web3 = new Web3(Web3.givenProvider);
const abi = require("./abi.json");

export async function ConnectMeta() {
   try {
    // let meta = ethereum;\
    //@ts-ignore
    let acc = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(acc, "acc");
    // const sig = await web3.eth.personal.sign("hello", "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd", "password!");
    //@ts-ignore
    const chainID = await ethereum.request({method: "eth_chainId"});
    console.log(chainID, "chaindi");
    
    if(chainID != "0x23a62") {
        //@ts-ignore
       async function Attatch () {
        try {
            //@ts-ignore
            await ethereum.request({
                "method": "wallet_addEthereumChain",
                "params": [
                  {
                    "chainId": "0x23a62",
                    "chainName": "Nebula Finance",
                    "rpcUrls": [
                      "https://nebula.rpc.silknodes.io"
                    ],
                    "iconUrls": [
                      "",
                      ""
                    ],
                    "nativeCurrency": {
                      "name": "NBL",
                      "symbol": "nbl",
                      "decimals": 18
                    },
                    "blockExplorerUrls": [
                      "https://bb.dym.fyi/r/dev-nebula"
                    ]
                  }
                ]
              });
             
           } catch (error) {
            //@ts-ignore
            await ethereum.request({
              "method": "wallet_addEthereumChain",
              "params": [
                {
                  "chainId": "0x23a62",
                  "chainName": "Nebula Finance",
                  "rpcUrls": [
                    "https://nebula.rpc.silknodes.io"
                  ],
                  "iconUrls": [
                    "https://xdaichain.com/fake/example/url/xdai.svg",
                    "https://xdaichain.com/fake/example/url/xdai.png"
                  ],
                  "nativeCurrency": {
                    "name": "NBL",
                    "symbol": "unbl",
                    "decimals": 18
                  },
                  "blockExplorerUrls": [
                    ""
                  ]
                }
              ]
            });
           } 
       }
       await Attatch();
    //    window.location.reload();
    }
    else {
        //@ts-ignore
       
    }
    console.log(chainID, "chainID");
    
   } catch (error) {
    console.log(error, "errr");
    
   }
}


class EVMCompatibleProvider {
  keplrProvider;
  chainId;
  constructor(keplrProvider: any, chainId: any) {
      this.keplrProvider = keplrProvider;
      this.chainId = chainId;
  }

  // Simulate the send method expected by web3.js
  send(method: any, params: any) {
      return this.keplrProvider.send(method, params);
  }

  // Simulate the request method expected by ethers.js
  request(args: any) {
      const { method, params } = args;
      return this.keplrProvider.send(method, params);
  }
}




export async function Stake(value: number) {
    try {
        await ConnectMeta();

        web3.setProvider((window as any).ethereum);
        let wallet = await web3.eth.getAccounts();
        console.log(wallet, "adda");
        //adress for evmmsg
        // await SignMsg(wallet[0])

        if(value ==0) return alert('Enter Amount');
        

        const contract = new web3.eth.Contract(abi, "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687");
        const contract2 = new web3.eth.Contract(require("./cof.json"), "0xA7e3C7e3Aed8A32E23D1f5303455CEEdAD1565fE");

        let mtd = await contract.methods.balanceOf(wallet[0]).call({from: wallet[0]});
        // let keplr = (window as any).keplr;
        console.log(mtd, "balanceOf dym");
        const checkAllowed = await contract.methods.allowance(wallet[0], "0xA7e3C7e3Aed8A32E23D1f5303455CEEdAD1565fE").call({from: wallet[0]});
        if(Number(checkAllowed) < value*10**18) {
            await contract.methods.approve("0xA7e3C7e3Aed8A32E23D1f5303455CEEdAD1565fE", value*10**18).send({from: wallet[0]})
        }
            
        let rx = await contract2.methods.depositDYM(value*10**18).send({from: wallet[0], gas: "5000000"})
        console.log(rx);
        
        
        
        // const web3 = new Web3(provider);
        // const sig = await web3.eth.personal.sign(, wallet[0], "password!");

        // await web3.eth.sendSignedTransaction(sig)
        // await withKeplr(value)
        return rx;
    } catch (error) {
        console.log(error);
        
    }
}

async function withKeplr(value: number) {
    try {
        //@ts-ignore
        const [ethAddress] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(ethAddress, "et");
       let normalText=  new Wallet(undefined,{
            bech32Prefix:"dym",
            coinType: 60
        } )

        console.log(normalText, "normalText");
        
        const wallet = await MetaMaskWallet.create((window as any).ethereum, ethAddress);
        // console.log(wallet., "hhh");
        // wallet.``
        const secretjs = new SecretNetworkClient({
            url: "https://blumbus.blockpi.network/lcd/v1/6da67406c258d5e7849590c843ae7d7324d03079",
            chainId: "blumbus_111-1",
            wallet: wallet,
            walletAddress: pubkeyToAddress(wallet.publicKey, "dym"),
        });

          const bob = "0x11a029ed783c80D01Ac052736905067d45efEf69";
          console.log(pubkeyToAddress(wallet.publicKey, "dym"), "o;");
        

          const msg = new MsgSend({
            from_address: "ethm16zsdqvgvn4tw48mf6h8s68kgps2440w8a827g9",
            to_address: bob,
            amount: [{amount: "100000", denom: "udym"}],
          });
        //   const sig = await web3.eth.personal.sign(JSON.stringify(msg), wallet.ethAddress, "password!");
          

        //   let trx = web3.eth.sendSignedTransaction(sig);
        //   let converted = decodePubkey()
        //   console.log(converted, "why ");
          const tx = await secretjs.tx.broadcast([msg], {
            gasLimit: 20_000,
            gasPriceInFeeDenom: 0.1,
            feeDenom: "adym",
          });
          
    } catch (error) {
        console.log(error, ":er");
        
    }
}