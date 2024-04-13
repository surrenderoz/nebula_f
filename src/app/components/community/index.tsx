import { Box, Button, Typography } from "@mui/material";
import DymImg from "../../../../public/images/dymmoney.svg";
import Image from "next/image";

export default function Community() {
    return(
        <>
        <Box sx={{
           background: '#B9F7FD',
           padding: '100px 20px 0 100px',
           display: 'flex',
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
                    }}>Stake with Nebulafi</Typography>
                    <Button sx={{
                        borderRadius: '100px',
                        width: '180px',
                        height: '54px',
                        background: '#fff',
                        color: '#000',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 4px 0px #00000040'

                    }}>Stake Now</Button>
            </Box>
            <Box>
                <Image  src={DymImg} width={undefined} height={undefined} alt="logo image"/>
            </Box>
        </Box>
        </>
    )
}