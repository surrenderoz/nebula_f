
'use client'
import {Box, Typography, Button} from "@mui/material"
import ArrowIcon from "../../../../public/assets/Arrow Right.svg";
import Image from "next/image";
import Background from "../background";
import Wrapper from "../wrapper";

import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter()
    return(
        <>
        <Background />
        <Wrapper>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '150px 0',
                rowGap: '100px',
                alignItems: 'center'
            }} >
                    <Typography sx={{
                        fontSize: '64px',
                        fontWeight: 400,
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                    Explore the infinite potential of liquid staking, step into the future of Dymension
                    </Typography>
                <Button sx={{
                    borderRadius: '100px',
                    border: '1px solid white',
                    height: '54px',
                    width: '180px',
                    color: '#fff',
                    boxSizing: 'border-box',
                    padding: '8px',
                    // gap: '10px',
                    justifyContent: 'space-evenly',
                    cursor: 'pointer',
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }

                }} onClick={() => router.push("/stake")}> Stake Now 
                <Box sx={{
                    background: '#B9F7FD',
                    borderRadius: '100%',                    
                    alignContent: 'end',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '30px',
                    width: '30px'
                }}>
                    <Image src={ArrowIcon} width={20} height={20} alt="key"/>
                    </Box></Button>
            </Box>
            </Wrapper>

        </>
    )
}