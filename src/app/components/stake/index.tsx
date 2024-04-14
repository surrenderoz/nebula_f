'use client'
import { Box, Button, Stack, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import {SigningStargateClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc"
import type {IbcExtension} from '@cosmjs/stargate/build/modules/ibc/queries';

import {connect_wallet} from "../../services/wallet";
import {StakeNow} from "../../services/stake";
import { useEffect, useState } from "react";
import TrxModel from "../trxmodel";


export default function StakeComp() {   
    const [value, setValue] = useState(0);
    const[ndym, setNDYM] = useState('');
    const[dym, setDYM] = useState('');
    const[price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const[trx, setTrx] = useState('')
    const[apr, setAPR] = useState(0);

    async function getAPR() {
        try {
            const res = await fetch('https://fetchanalyticsrequest-xqbg2swtrq-uc.a.run.app/?networkId=dymension_1100-1');
            let jsn = await res.json();
            const { inflation, amount, bondedAmount } = jsn.totalSupply.value;
            const fixedInflation =inflation * 100 / Math.pow(10, 18);
            const apr = fixedInflation * amount / bondedAmount;
            setAPR(+apr.toFixed(2))
        } catch (error) {
            
        }
    }

    async function handleSubmit() {
        setLoading(true)
        let res: any = await StakeNow(value);
        if(res) {
            setLoading(false);
            console.log(res.transactionHash);
        }
        setTrx(res.transactionHash)
        setValue(0)
        setLoading(false);
        setTimeout(() => {
            setTrx('')
        },10000)
    };

    async function getnDYM() {
        try {
            const receiver = "dym1393szjexfh4mfh5uv30zp8vq9492fadl557sh9";
            const url = "https://froopyland.blockpi.network/rpc/v1/public";
    
            const keplr = await (window as any).keplr;
            await keplr.enable("froopyland_100-1")
            const offlineSigner = keplr.getOfflineSigner('froopyland_100-1')
            const acc = await offlineSigner.getAccounts();
    
            const stargate = SigningStargateClient;
            const tm_client = await Tendermint34Client.connect(url);
            let temp = QueryClient.withExtensions(tm_client);
            let query_client: IbcExtension = setupIbcExtension(temp);
            
            const sigingClient = SigningStargateClient;

            let client = await stargate.connectWithSigner(
                url,
                offlineSigner,
            );

            let key = await (window as any).keplr?.getKey("froopyland_100-1");
            console.log(key.bech32Address);
            let bal = await client.getBalance(key.bech32Address, 'ibc/7665D4508878234CA0B012F68701EF6CE69BE39413A7557F4583EBD614F8CEC9');
            let bal2 = await client.getBalance(key.bech32Address, 'udym');
            let bal3 = await client.getAllBalances(key.bech32Address);

            setNDYM(String(bal.amount).substring(0,3))
            setDYM(String(bal2.amount).substring(0,3))
            // console.log("bal", bal2);
            
        } catch (error) {
            
        }
    }

    async function getDymPrice() {
        try {
            const res = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=DYMUSDT');
            const jsn = await res.json();
            setPrice(jsn.price)
        } catch (error) {
            setPrice('')
        }
    }
    useEffect(() => {
        getnDYM();
        getDymPrice();
        getAPR()
    })

    return(
        <>
            {
                trx && <TrxModel hash={trx} />
            }
            <Box sx={{
                display: 'flex',
                mt: '100px',
                width: '100%',
                maxWidth: '700px',
                columnGap: '25px',
                color: '#fff',
                fontFamily: '__Lexend_Deca_e53e8d!important'
            }}>

                <Box sx={{
                    padding: "36px",
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(23px)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    borderRadius: '10px',
                    flex: 4,
                    gap: '30px'
                }}>
                    <Stack>
                        <Typography fontSize={'14px'}>Available to stake</Typography>
                        <Typography fontSize={'16px'}  fontWeight={700}>{dym || 0} DYM</Typography>
                        {/* <Typography fontSize={'14px'}>$ 0</Typography> */}
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Dym Price</Typography>
                        <Typography fontSize={'16px'}  fontWeight={700}>$ {Number(price).toFixed(2)}</Typography>
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Available to use in DeFi</Typography>
                        <Typography fontSize={'16px'}  fontWeight={700}>{ndym} nDYM</Typography>
                        {/* <Typography>$ 0</Typography> */}
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Nebula APR</Typography>
                        <Typography color={'#05FF00'} fontSize={'16px'}  fontWeight={700}>{apr} %</Typography>
                        <Typography>
                            {
                                String(apr/54).substring(0, 4)
                            } % per week</Typography>
                    </Stack>

                </Box>
                <Box sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(23px)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    borderRadius: '10px',
                    flex: 8,
                    padding: "36px",
                    rowGap: '48px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Stack>
                        <Typography mb={'10px'}>You Stake</Typography>
                        <TextField sx={{
                            background: '#fff',
                            borderRadius: '10px',
                            ":focus-visible": {
                                borderColor: 'white'
                            },
                            "::placeholder": {
                                color: '#000'
                            }
                        }} placeholder="0" value={value} onChange={(e:any) => setValue(e.target.value)} />
                        {
                            !dym && <Typography sx={{
                                color: 'grey',
                                mt: '10px',
                                fontSize: '12px'
                            }}>connect your wallet to view your DYM balance</Typography>
                        }
                       {loading ? <CircularProgress />
                       : <Button sx={{
                            mt: '30px',
                        width: '101px',
                        height: '51px',
                        borderRadius: '100px',
                        padding: '14px 28px',
                        background: '#B9F7FD',
                        color: '#000',
                        ":hover": {
                            background: 'white'
                        }
                    }} onClick={() => handleSubmit()}>Stake</Button>}
                    </Stack>
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap:'16px',
                        fontSize: '14px'
                    }}>
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Typography >You will recieve</Typography>
                            <Typography fontSize={'16px'}  fontWeight={700} >{value} nDYM</Typography>
                        </Stack>
                        {/* <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Typography>Annual Interest</Typography>
                            <Typography fontSize={'16px'}  fontWeight={700}>0 nDYM</Typography>
                        </Stack> */}
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Typography>Conversion Rate</Typography>
                            <Typography fontSize={'16px'}  fontWeight={700}>1 DYM = 1 nDYM</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}