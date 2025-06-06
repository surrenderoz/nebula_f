'use client'
import {Box, Typography, Button, Link, LinearProgress} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect_wallet } from "@/app/services/wallet";
import {Widget} from "../../components/stake/stake";
import abi from "../../services/abi.json";
import Web3 from "web3";
import {ConnectMeta} from "@/app/services/evmstake";

const web3 = new Web3(Web3.givenProvider);

export default function Navbar() {
    const[address, setAddress] = useState(undefined);
    const menue_items = [
        {name: "Home", url: "/", target: ""},
        {name: "FAQ's", url: "#", target: ""},
        {name: "Docs", url: "#", target: ""},
        {name: "Faucet", url: "/faucet", target: ""},
    ];
    const router = useRouter();
    const [conn, setConn] = useState(true);
    
    async function handleRequest() {
        try {
            await ConnectMeta()
            web3.setProvider((window as any).ethereum);
            let wallet = await web3.eth.getAccounts();
            // console.log(wallet, 'wallets');
            setAddress(wallet[0] as any)
        } catch (error) {
            
        }
    }

    async function GetDymBal() {
        try {
            web3.setProvider((window as any).ethereum);
            let wallet = await web3.eth.getAccounts();
            // console.log(wallet, 'wallets');
            
            const contract = new web3.eth.Contract(abi, "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687");
            let mtd = await contract.methods.balanceOf(wallet[0]).call({from: wallet[0]}).catch((err) => err);
            // console.log(mtd, "mtd");
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        ConnectMeta()
        GetDymBal()
        handleRequest()
    }, [])
    return(
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: {
                    xs: 'center',
                    md: 'space-between'
                },
                alignItems: 'center',
                padding: '20px',
                fontFamily: '__Lexend_Deca_e53e8d'
            }}>
                <Link href="/">
                <Image src={'/images/logo.png'} width={200} height={40} alt="logo" />
                </Link>
                <Box sx={{
                    display: 'inline-flex',
                    columnGap: '20px',
                    color: '#B9F7FD',
                    fontSize: '18px',
                    fontFamily: '__Lexend_Deca_e53e8d'
                }}>
                    {
                        menue_items.map((value ,key) => (
                            <Typography fontFamily={'__Lexend_Deca_e53e8d'} key={key} aria-activedescendant={"active" }sx={{
                                cursor: 'pointer',
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                },
                                ":active": {
                                    color: 'red'
                                }
                            }}><a href={value.url} target={value.target} style={{all: 'unset'}}>{value.name}</a></Typography> 
                        ))
                    }
                </Box>
                
                {!address ? 
                    <Button sx={{
                        borderRadius: '100px',
                        background: '#B9F7FD',
                        padding: '14px 28px',
                        height: '54px',
                        color: 'black',
                        maxWidth: '220px',
                        fontWeight: '400',
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        ":hover": {
                            background: 'white'
                        }
                    }} onClick={() => handleRequest()}>Connect Wallet</Button>
                :
                <Button sx={{
                    borderRadius: '100px',
                    background: '#B9F7FD',
                    padding: '14px 28px',
                    height: '54px',
                    color: 'black',
                    maxWidth: '180px',
                    fontWeight: '400',
                    display: {
                        xs: 'none',
                        md: 'flex'
                    },
                    ":hover": {
                        background: 'white'
                    }
                }} onClick={() => router.push("/stake")}>{
                    String(address).substring(0 ,10)
                }</Button>
                
                }
                 {/* <Widget conn={conn} loader={setConn}/> */}
                
            </Box>
        
        </>
    )
}