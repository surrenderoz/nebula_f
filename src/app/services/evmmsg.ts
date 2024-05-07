import Web3 from "web3";
import {SigningStargateClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
import {DecodedTxRaw, encodePubkey} from "@cosmjs/proto-signing"
// import {Et} from "@cosmjs/encoding"
// encodeEthSecp256k1Pubkey
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { fromHex, toBech32 } from "@cosmjs/encoding";
import { SecretNetworkClient, MetaMaskWallet, pubkeyToAddress } from "secretjs";
import { encodeEthSecp256k1Pubkey, encodeSecp256k1Pubkey } from "@cosmjs/amino/build/encoding";
import { pubkeyToRawAddress } from "@cosmjs/amino";

const web3 = new Web3();

const msg = {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "string"
        },
        // {
        //   "name": "salt",
        //   "type": "string"
        // }
      ],
      "Tx": [
        {
          "name": "account_number",
          "type": "string"
        },
        {
          "name": "chain_id",
          "type": "string"
        },
        {
          "name": "fee",
          "type": "Fee"
        },
        {
          "name": "memo",
          "type": "string"
        },
        {
          "name": "msgs",
          "type": "Msg[]"
        },
        {
          "name": "sequence",
          "type": "string"
        }
      ],
      "Fee": [
        {
          "name": "feePayer",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "Coin[]"
        },
        {
          "name": "gas",
          "type": "string"
        }
      ],
      "Coin": [
        {
          "name": "denom",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "string"
        }
      ],
      "Msg": [
        {
          "name": "type",
          "type": "string"
        },
        {
          "name": "value",
          "type": "MsgValue"
        }
      ],
      "MsgValue": [
        {
          "name": "source_port",
          "type": "string"
        },
        {
          "name": "source_channel",
          "type": "string"
        },
        {
          "name": "token",
          "type": "TypeToken"
        },
        {
          "name": "sender",
          "type": "string"
        },
        {
          "name": "receiver",
          "type": "string"
        },
        {
          "name": "timeout_height",
          "type": "TypeTimeoutHeight"
        },
        {
          "name": "timeout_timestamp",
          "type": "uint64"
        }
      ],
      "TypeToken": [
        {
          "name": "denom",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "string"
        }
      ],
      "TypeTimeoutHeight": [
        {
          "name": "revision_number",
          "type": "uint64"
        },
        {
          "name": "revision_height",
          "type": "uint64"
        }
      ]
    },
    "primaryType": "Tx",
    "domain": {
      "name": "Cosmos Web3",
      "version": "1.0.0",
      "chainId": 111,
      "verifyingContract": "cosmos",
      //"salt": "0"
    },
    "message": {
      "account_number": "7255",
      "chain_id": "blumbus_111-1",
      "fee": {
        "amount": [
          {
            "amount": "1093070000000000",
            "denom": "adym"
          }
        ],
        "gas": "109307",
        "feePayer": "dym16zsdqvgvn4tw48mf6h8s68kgps2440w855g6wf"
      },
      "memo": "",
      "msgs": [
        {
          "type": "cosmos-sdk/MsgTransfer",
          "value": {
            "receiver": "ethm16zsdqvgvn4tw48mf6h8s68kgps2440w8a827g9",
            "sender": "dym16zsdqvgvn4tw48mf6h8s68kgps2440w855g6wf",
            "source_channel": "channel-14",
            "source_port": "transfer",
            "timeout_height": {
              "revision_height": "1",
              "revision_number": "9999"
            },
            "timeout_timestamp":  "1714321900000000000",
            "token": {
              "amount": "100000000000000000",   
              "denom": "adym"
            }
          }
        }
      ],
      "sequence": "18"
    }
  }

export default async function SignMsg(address: string) {
    try { 
        const url = "https://blumbus.blockpi.network/rpc/v1/6da67406c258d5e7849590c843ae7d7324d03079";
      
        const [ethAddress] = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const singer = (window as any).ethereum;
        const client = SigningStargateClient.connectWithSigner(url, singer)

        // const hexSignerAddress = convertToHexAddress(signerAddress);
        const eip712Payload = JSON.stringify(msg);
        // const provider = await this.getProvider(); // window.ethereum
        //@ts-ignore
        const signature = await ethereum.request({ method: 'eth_signTypedData_v4', params: [ address, eip712Payload ] });


        console.log(signature, "here wallet");
      (await client).broadcastTx(Uint8Array.from(signature))
        // pubkeyToAddress(wallet.publicKey);
        // console.log(toBech32(wallet.publicKey, ), "here");
        

    } catch (error) {
            console.log('signa', error);
    }
}


function ethereumSigToCosmosSig(ethSignature: any) {
    // Assuming ethSignature is '0x{r}{s}{v}' format, 130 characters long
    // const r = ethSignature.substring(2, 66);
    // const s = ethSignature.substring(66, 130);
    // const v = ethSignature.substring(130, 132);
    const { r, s } = splitSignature(ethSignature);
    // Convert hex values to binary buffer
    const rBuffer = Buffer.from(r, 'hex');
    const sBuffer = Buffer.from(s, 'hex');
    // const vValue = parseInt(v, 16);

    // Typically, v is not used in Cosmos signatures, so we usually concatenate r and s only
    const cosmosSignature = Buffer.concat([rBuffer, sBuffer]);

    return cosmosSignature.toString('base64');
}


function splitSignature(signature: any) {
    const r = signature.substring(2, 66);    // Extract 'r' component
    const s = signature.substring(66, 130);  // Extract 's' component
    let v = signature.substring(130, 132);   // Extract 'v' component

    // Ethereum generally uses '27' or '28', or '0x1b' or '0x1c' (27, 28 in hex)
    // Convert hex to integer
    v = parseInt(v, 16);

    // If v is 0 or 1, common with some signing tools, adjust it
    if (v < 27) {
        v += 27;
    }

    return { r, s, v };
}

// public async getOfflineSigner(network: Network): Promise<OfflineSigner> {
//     this.validateNetwork(network);
//     return {
//         getAccounts: () => this.getWalletAccounts(network),
//         signEIP712: async (signerAddress: string, signDoc: EIP712ToSign): Promise<Uint8Array> => {
//             await this.switchNetwork(network);
//             const hexSignerAddress = convertToHexAddress(signerAddress);
//             const eip712Payload = JSON.stringify(signDoc);
//             const provider = await this.getProvider();
//             const signature = await provider.request({ method: 'eth_signTypedData_v4', params: [ hexSignerAddress, eip712Payload ] });
//             return fromHex((signature as string).replace('0x', ''));
//         },
//     };
// }

// export const signTx = async ({
//     client,
//     network,
//     signerAddress,
//     messages,
//     memo,
//     gasEstimation,
//     signMethod,
// }: PerformTxParams): Promise<Uint8Array> => {
//     if (gasEstimation === undefined) {
//         const { gas } = await simulateTx({ client, network, signerAddress, messages });
//         gasEstimation = gas;
//     }
//     const fee = calculateFee(Math.round(gasEstimation * (network.gasAdjustment || DEFAULT_GAS_ADJUSTMENT)), client.getGasPrice());
//     const txRaw = await client.sign(signerAddress, messages, fee, memo || '', undefined, signMethod).catch((error) => {
//         throw new ClientError('BROADCAST_TX_FAILED', network, error);
//     });
//     return TxRaw.encode(txRaw).finish();
// };

// export const broadcastTx = async (client: SigningStationClient, txBytes: Uint8Array): Promise<TxResponse> => {
//     const network = client.getNetwork();
//     const response = await client.broadcastTx(txBytes, 600_000).catch((error) => {
//         throw new ClientError('BROADCAST_TX_FAILED', network, error);
//     });
//     return { hash: response.transactionHash, network, deliveryTxCode: response.code, nativeResponse: response };
// };

