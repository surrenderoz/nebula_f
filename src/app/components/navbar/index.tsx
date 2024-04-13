'use client'
import {Box, Typography, Button} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const menue_items = [
        "Home",
        "Faq",
        "Docs"
    ]
    const router = useRouter();
    return(
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
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
                                ":active": {
                                    color: 'red'
                                }
                            }}>{value}</Typography> 
                        ))
                    }
                </Box>
                
                <Button sx={{
                    borderRadius: '100px',
                    background: '#B9F7FD',
                    padding: '14px 28px',
                    height: '54px',
                    color: 'black',
                    maxWidth: '180px',
                    fontWeight: '400',
                    ":hover": {
                        background: 'white'
                    }
                }} onClick={() => router.push("/stake")}>Stake Now</Button>
                
            </Box>
        
        </>
    )
}