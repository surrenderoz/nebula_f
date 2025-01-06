'use client'
import { Box, Button, Stack, TextField, Typography, Alert, Slider,CircularProgress  } from "@mui/material";

import {SigningStargateClient, QueryClient, setupIbcExtension} from "@cosmjs/stargate";
// import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import type {IbcExtension} from '@cosmjs/stargate/build/modules/ibc/queries';

import {connect_wallet} from "../../services/wallet";
import {StakeNow} from "../../services/stake";
import { useCallback, useEffect, useRef, useState } from "react";
import TrxModel from "../trxmodel";
import {Stake} from "../../services/evmstake"
import Web3 from "web3";
import Image from "next/image";

const web3 = new Web3(Web3.givenProvider);

export default function StakeComp() {   
    const [value, setValue] = useState(0);
    const[ndym, setNDYM] = useState('');
    const[dym, setDYM] = useState(0);
    const[price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const[trx, setTrx] = useState('')
    const[apr, setAPR] = useState(0);
    const [conn, setConn] = useState(false);

    const [dloader, setDloader] = useState(false);

    const [dp, setDP] = useState(false);
    const [md, setMD] = useState(false);

    function handleModel() {
        // setDP(false)
        setMD(false)
    }

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
        getnDYM()
        if(value == 0) return alert('Enter Amount')
        setLoading(true)
        let res: any = await Stake(value);
        if(res) {
            setLoading(false);
            // console.log(res.transactionHash);
        }
        setTrx(res?.transactionHash)
        setValue(0)
        setLoading(false);
        setTimeout(() => {
            setTrx('')
        },10000)
    };

    async function getnDYM() {
        try {
            web3.setProvider((window as any).ethereum);
            const contractdym = new web3.eth.Contract(require("../../services/abi.json"), "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687");
            const contractNdym = new web3.eth.Contract(require("../../services/abi.json"), "0xB35D9d5D54AFD1946cBD6527669e377BCaEfA793");
            let address = await web3.eth.getAccounts();
            const balance = await contractdym.methods.balanceOf(address[0]).call({from: address[0]});
            const balance2 = await contractNdym.methods.balanceOf(address[0]).call({from: address[0]});
            // console.log("balance of NDYM", balance2);
            
            const __value_of = Number(balance)/10**18;
            const __value_of2 = Number(balance2)/10**18;
            // const contract = await web
            setDYM(+__value_of.toFixed(2))
            setNDYM(__value_of2.toFixed(2));            
        } catch (error) {
            console.log(error);
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
    function handleSubmit2() {
        setConn(conn ? false : true)
    }
    const marks = [
        {
          value: 0,
          label: '0%',
        },
        {
          value: 25,
          label: '25%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 75,
          label: '75%',
        },
        {
          value: 100,
          label: '100%',
        },
    ]
    useEffect(() => {
        getnDYM();
        getDymPrice();
        getAPR();
    }, [])

    function SetDloaders() {
        setDloader(true)
    }

    function handleSlider(value: any) {
        setValue((dym*value)/100)
        // console.log(value);
        
    }

    return(
        <>
            {
                trx && <TrxModel hash={trx} />
            }
            <Box sx={{display: 'flex', justifyContent: 'space-between', position: 'relative', top: '50px', gap: '20px', width: '300px'}}>
                {/* <Box sx={{
                    background: '#fff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>1</Box>
                <Box sx={{
                    borderTop: '1px solid #fff',
                    width: '150px'
                }}></Box>
                <Box  sx={{
                    background: '#fff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>2</Box> */}
            </Box>
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
                        <Typography fontSize={'16px'}  fontWeight={700}>{ndym || 0} nDYM</Typography>
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
                {/* ///
                ///
                /// */}
                {
                    dp ? 
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(23px)',
                        border: '1px solid rgba(255, 255, 255, 1)',
                        borderRadius: '10px',
                        flex: 8,
                        padding: "36px",
                        rowGap: '24px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography>DYM needs to be deposited to Nebula RollApp on this step. </Typography>
                        <Stack>
                            <Typography mb={'10px'}>Wallet</Typography>
                            <Button sx={{
                                 background: '#fff',
                                 borderRadius: '10px',
                                 width: '100%',
                                 height: '50px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 columnGap: '15px',
                                 padding: '0 10px',
                                 cursor: 'pointer',
                                 position: 'relative',
                                 fontFamily: '__Lexend_Deca_e53e8d',
                                 ":hover": {
                                    background: '#b9f7fd'
                                 }
                            }}  onClick={() => setMD((prop: boolean) => prop ? false : true)}>
                                <Box display={'flex'} gap={'10px'}>
                                <Image src={"/assets/Metamask.svg"} alt="" width={25} height={25}/>
                                <Typography  sx={{'color': '#000', fontWeight: 700,}}>MetaMask</Typography>
                                </Box>
                                <Image src={"/assets/downarrow.svg"} style={{
                                    transform: md ? `rotateZ(178deg)` : `rotateZ(0)`
                                }} width={20} height={20} alt=""/>
                                {
                                    md &&
                                    <WalletLoader modler={handleModel} />
                                }
                            </Button>
                        </Stack>
                        <Stack>
                            <Typography mb={'10px'}>Your Deposit</Typography>
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
                           <Button sx={{
                            mt: '30px',
                            width: '100px',
                            height: '51px',
                            borderRadius: '100px',
                            padding: '14px 28px',
                            background: '#B9F7FD',
                            color: '#000',
                            ":hover": {
                                background: 'white'
                            }
                        }}  onClick={() => handleSubmit2()}>Deposit</Button>
                        </Stack>
                            <Typography>DYM deposited will be IBC transferred in order to liquid stake on next step.</Typography>
                        {/*  */}
    
                    </Box>
                    :
                    // {}
                    <Box sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(23px)',
                        border: '1px solid rgba(255, 255, 255, 1)',
                        borderRadius: '10px',
                        flex: 8,
                        padding: "36px",
                        rowGap: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        // color: '#fff'
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
                            <Slider
                                step={25}
                                // shiftStep={25}
                                marks={marks}
                                value={+((value/dym || 0)*100).toFixed()}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                onChange={(v: any) => handleSlider(v.target.value)}
                            
                               sx={{
                                width: '95%',
                                margin: 'auto',
                                '& .MuiSlider-track': {
                                    background: '#B9F7FD'
                                },
                                '& .MuiSlider-thumb': {
                                    background: '#B9F7FD'
                                },
                                "& .MuiSlider-markLabel": {
                                    color: '#fff'
                                }
                               }}
                            />

                            
                           {
                            loading ? <Box 
                        
                            sx={{
                                mt: '30px',
                             width: '100px',
                             height: '51px',
                             borderRadius: '100px',
                            //  padding: '14px 28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                             background: '#ccc',
                             color: '#000',
                           
                            }}
                            >
                                <CircularProgress size={30}/>
                            </Box>
                            : <Button 
                           
                            sx={{
                             mt: '30px',
                             width: '100px',
                             height: '51px',
                             borderRadius: '100px',
                             padding: '14px 28px',
                             background: '#B9F7FD',
                             color: '#000',
                             ":hover": {
                                 background: 'white'
                             }
                     }} onClick={() => handleSubmit()}>Stake</Button>
                    }
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
                }
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
            </Box>
    
           
            
        </>
    )
}



 function WalletLoader({modler}: any) {
    return (
        <>
        
            <Box sx={{
                display: 'flex',
                padding: '10px 20px',
                background: '#fff',
                borderRadius: '7px',
                flexDirection: 'column',
                rowGap: '15px',
                position: 'absolute',
                top: "110%",
                left: "0",
                // transform: "translate(-50%, -50%)",
                backdropFilter: "blur(50px)",
                zIndex: 1,
            }}>
                <Box  sx={{display: 'flex', columnGap: '20px', alignItems: 'center'}} >
                    <Image src={"/assets/MetaMask.svg"} width={25} height={25} alt="" />
                    <Typography color={'#000'} fontSize={'16px'} fontWeight={600}>MetaMask</Typography>
                    <Image src={"/assets/active.svg"} width={20} height={20} alt="" />
                </Box>
                <Box sx={{display: 'flex', columnGap: '20px', alignItems: 'center'}}>
                    <Image  src={"/assets/leap.svg"} width={25} height={25} alt="" />
                    <Typography color={'#000'} fontSize={'16px'} fontWeight={600}>Leap</Typography>
                </Box>
                <Box sx={{display: 'flex', columnGap: '20px', alignItems: 'center'}}>
                    <Image  src={"/assets/keplr.svg"} width={25} height={25} alt=""/>
                    <Typography color={'#000'} fontSize={'16px'} fontWeight={600}>Keplr</Typography>
                </Box>
            </Box>

        </>
    )
}


export function Widget(conn: any, loader: Function) {
    const DYMENSION_CONNECT_URL = "https://testnet.dymension.xyz";
    const DYMENSION_CONNECT_NETWORK_ID = "blumbus_111-1";
    const [dymensionConnectOpen, setDymensionConnectOpen] = useState(false);

    const iframeRef = useRef(null);
    const buttonRef = useRef(null);
    const [dymensionConnectReady, setDymensionConnectReady] = useState(false);

        // @ts-ignore
    const sendMessage = useCallback((message: any) => iframeRef.current?.contentWindow?.postMessage(message, DYMENSION_CONNECT_URL), []);

    const updateTriggerBoundingRect = useCallback(() => {
        //@ts-ignore
        const boundingRect = buttonRef['current']?.getBoundingClientRect();
        if (boundingRect) {
            sendMessage({type: 'triggerBoundingRectChange', rect: boundingRect});
        }
    }, [sendMessage]);
    const initModal = useCallback(() => {
        updateTriggerBoundingRect();
        sendMessage({
            type: 'stylesChange',
            modalType: "wallet-selector",
            
            styles: {
                '--control-color-normal': 'rgb(31 35 30)',
                '--background-color': 'red',
                '--background-color-secondary': 'rgb(63 78 63)',

                // 'display': 'none'
            }
        });
        sendMessage({type: 'menuAlignChange', align: 'center'});
    }, [sendMessage, updateTriggerBoundingRect]);


    useEffect(() => {
        window.addEventListener('scroll', updateTriggerBoundingRect, true);
        window.addEventListener('resize', updateTriggerBoundingRect, true);
        return () => {
            window.removeEventListener('scroll', updateTriggerBoundingRect, true);
            window.removeEventListener('resize', updateTriggerBoundingRect, true);
        }
    }, [updateTriggerBoundingRect]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.origin !== DYMENSION_CONNECT_URL) {
                return;
            }
            if (event.data.type === 'ready') {
                setDymensionConnectReady(true);
            }
            if (event.data.type === 'close') {
                setDymensionConnectOpen(false);
            }
            if (event.data.type === 'connect') {
                setAddress(event.data.hexAddress);
                sendMessage({type: 'modalTypeChange', modalType: 'account'});
                updateTriggerBoundingRect();
            }
            if (event.data.type === 'disconnect') {
                setAddress('');
                sendMessage({type: 'modalTypeChange', modalType: 'wallet-selector'});
                updateTriggerBoundingRect();
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [initModal, sendMessage, updateTriggerBoundingRect]);
    
    useEffect(() => {
        function exe() {
            if(dymensionConnectReady) {
                setDymensionConnectOpen(!dymensionConnectOpen)
                updateTriggerBoundingRect();
                // loader()
            }
        }
        if(dymensionConnectReady) {
            // loader()
        }
        exe();
        // console.log("constantly");
        // console.log((iframeRef.current as any));
        
    }, [conn])
    return(
        <Box sx={{
        }}>
            <button
                disabled={!dymensionConnectReady}
                ref={buttonRef}
                onClick={() => {
                    setDymensionConnectOpen(!dymensionConnectOpen)
                    updateTriggerBoundingRect();
                }}
            >
                {address || 'Connect'}
            </button>
            <iframe
                ref={iframeRef}
                onLoad={initModal}
                style={{ display: dymensionConnectOpen ? "block" : "none",  height: '100%', width: '100%', position: 'absolute', top: 0, right: 0, border: 'none',
                outline: 'none' }}
                allow="clipboard-read; clipboard-write"
                title="dymension-connect"
                className="dymension-connect-iframe"
                src={`${DYMENSION_CONNECT_URL}/connect?networkId=${DYMENSION_CONNECT_NETWORK_ID}`}
            />
        </Box>
    )
}