'use client'
import {Box, Typography, Button} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const[address, setAddress] = useState(undefined);
    const menue_items = [
        "Home",
        "FAQ's",
        "Docs"
    ]
    const router = useRouter();

    async function handleRequest() {
        try {
            const keplr = (window as any).keplr;
        await keplr.enable("froopyland_100-1");
        const offlineSigner = keplr.getOfflineSigner('froopyland_100-1');
        const accounts = await offlineSigner.getAccounts("froopyland_100-1");
        setAddress(accounts[0].address);
        console.log("aaa");
        return accounts[0].address;
        } catch (error) {
            
        }
    }
    useEffect(() => {
        handleRequest()
    })
    return(
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: {
                    xs: 'center',
                    md: 'space-between'
                },
                alignItems: 'center',
                padding: '20px'
            }}>
                <Image src={'/images/logo.png'} width={200} height={40} alt="logo" />
                <Box sx={{
                    display: 'inline-flex',
                    columnGap: '20px',
                    color: '#B9F7FD',
                    fontSize: '18px'
                }}>
                    {
                        menue_items.map((value ,key) => (
                            <Typography key={key} aria-activedescendant={"active" }sx={{
                                cursor: 'pointer',
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                },
                                ":active": {
                                    color: 'red'
                                }
                            }}>{value}</Typography> 
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
                }</Button>}
                
            </Box>
        
        </>
    )
}