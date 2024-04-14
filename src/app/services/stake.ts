import {SigningStargateClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc"
import type {IbcExtension} from '@cosmjs/stargate/build/modules/ibc/queries';


export async function StakeNow(value: any) {
    try {
        console.log("working stake");
        if(value == 0) return alert('Enter Stake Amount')
        
        const receiver = "dym1393szjexfh4mfh5uv30zp8vq9492fadl557sh9";
        const url = "https://froopyland.blockpi.network/rpc/v1/public";

        const keplr = await (window as any).keplr;

        const offlineSigner = keplr.getOfflineSigner('froopyland_100-1')
        const acc = await offlineSigner.getAccounts();

        const stargate = SigningStargateClient;
        const tm_client = await Tendermint34Client.connect(url);
        let temp = QueryClient.withExtensions(tm_client);
        let query_client: IbcExtension = setupIbcExtension(temp);

        let client = await stargate.connectWithSigner(
            url,
            offlineSigner,
        );

        let key = await (window as any).keplr?.getKey("froopyland_100-1");
        console.log(key.bech32Address);

        const valid_Value = value*10**18;

        let sendtx = await client.sendTokens(key.bech32Address, receiver, [{amount: String(valid_Value), denom: 'udym'}], {amount: [], gas: '500000'}, 'nDYM Staking');
        console.log(sendtx);
    
        return sendtx

    } catch (error) {
        console.log('errr', error);
        return true
    }
}