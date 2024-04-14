'use client'
import { Box, Button, Typography } from "@mui/material";
import DymImg from "../../../../public/images/dymmoney.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Community() {
    const router = useRouter()
    return(
        <>
        <Box sx={{
           background: '#B9F7FD',
           padding: {
            xs: '50px',
            md: '100px 20px 0 100px'
           },
           display: 'flex',
           flexDirection: {
            xs: 'column',
            md: 'row'
           },
           justifyContent: 'space-between',
           alignItems: 'center',
           fontFamily: "__Lexend_Deca_e53e8d, __Lexend_Deca_Fallback_e53e8d"
        }}>
            <Box>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 300
                    }} mb={'10px'}>Dont miss out</Typography>
                    <Typography mb={'30px'} sx={{
                        fontSize: '48px',
                        fontWeight: 500
                    }}>Stake with Nebula</Typography>
                    <Button sx={{
                        borderRadius: '100px',
                        width: '180px',
                        height: '54px',
                        background: '#fff',
                        color: '#000',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 4px 0px #00000040'

                    }} onClick={() => router.push("/stake")}>Stake Now</Button>
            </Box>
            <Box sx={{
                // width
            }}>
                <Image src={DymImg} width={undefined} height={undefined} alt="logo image"/>
            </Box>
        </Box>
        </>
    )
}