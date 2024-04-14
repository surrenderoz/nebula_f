import {Box, Typography } from "@mui/material";
import OmanIcon from "../../../../public/assets/Ornamenleft.svg";
import Image from "next/image";
import Wrapper from "../wrapper";

export default function About() {

    return(
        <>
           <Box sx={{
            background: '#000',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            padding: '100px 0',
            // flexDirection: {
            //     xs: 'column'
            // }
            // gap: '30px'
            
           }}>
            <Image src={OmanIcon} width={400} height={400} alt="icon" style={{
                position: 'absolute',
                top: -190,
                left: -150,                
                zIndex: 0,
            }}/>
            <Box>
            <Wrapper>
            <Box mb={'80px'} sx={{
                color: '#fff',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
               
            }}>
                <Typography sx={{
                    fontSize: '20px'
                }}>We are the home of</Typography>
                <Typography sx={{
                    fontSize: {
                        xs: '30px',
                        md: '48px'
                    },
                    fontWeight: 400
                }}>Modular Liquid Staking 🏛️</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                gap: '100px',
                textAlign: 'center',
                padding: {
                    xs: '40px',
                    md: 0
                },
                flexDirection: {
                    xs: 'column',
                    md: 'row'
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#fff',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Typography sx={{fontSize: '70px'}}>💫</Typography>
                    <Typography sx={{fontSize: '20px', fontWeight: 500}}>Cosmic flexibility</Typography>
                    <Typography sx={{fontSize: '12px', fontWeight:300}}>Nebula provides liquid staking, which allows 
                        more flexibility for stakers as they 
                        will be able to withdraw their funds at any time 
                        as opposed to staking DYM directly
                         and having it locked up.
                    </Typography>

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#fff',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Typography sx={{fontSize: '70px'}}>🔐</Typography>
                    <Typography sx={{fontSize: '20px', fontWeight: 500}}>Security Alignment</Typography>
                    <Typography sx={{fontSize: '12px', fontWeight:300}}>Nebula will provide improved network security to Dymension
                     as liquid staking incentivizes token holders to stake their assets, 
                     which fosters the overall network security.
                    </Typography>

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#fff',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Typography sx={{fontSize: '70px'}}>🎯</Typography>
                    <Typography sx={{fontSize: '20px', fontWeight: 500}}>Capital Efficiency</Typography>
                    <Typography sx={{fontSize: '12px', fontWeight:300}}>Liquid staking is enabling capital efficiency for users, 
                    chain itself and DeFi protocols, as they dont compete with native APR; 
                    rather adding a layer on top to strengthen the ecosystem.
                    </Typography>

                </Box>

            </Box>
            </Wrapper>
            </Box>
            
            </Box> 
        </>
    )
}