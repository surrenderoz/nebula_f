import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
    const menue_items = [
        {
            key: 'home'
        }
    ]
    return(
        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row'
                },
                alignItems: {
                    xs: 'center',
                    md: 'normal'
                },
                gap: {
                    xs: '50px'
                },
                background: '#000',
                color: '#ccc',
                justifyContent: 'space-between',
                padding: '100px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #ccc',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '40px',
                    flex: 3
                }}>
                    <Image src={"/images/logo.png"} width={200} height={40} alt="logo" style={{
                        cursor: 'pointer'
                    }}/>
                    <Typography color={'#9E9E9E'}>Modular Liquid Staking RollApp - built <br></br> on top of @dymension</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '100px',
                    flex: 8,
                    justifyContent: 'end'
                }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <Typography fontSize={'20px'} fontWeight={600}>Home</Typography>
                            <Typography color={'#9E9E9E'}>FAQs</Typography>
                            <Typography color={'#9E9E9E'}>Docs </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <Typography fontSize={'20px'} fontWeight={600}>Contact Us</Typography>
                            <Box sx={{
                                display: 'flex',
                                gap: '20px',
                                cursor: 'pointer'
                            }}>
                                <Box sx={{
                                    gap: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#9E9E9E',
                                   
                                }}>
                                    <Typography>
                                        <a style={{all: 'unset'}} target="blank" href="https://x.com/nebulafi_"> Twitter</a>
                                    </Typography>
                                    <Typography>
                                    <a style={{all: 'unset'}} target="blank" href="https://t.me/nebulafi"> Telegram</a>
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    gap: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#9E9E9E'
                                }}>
                                    <Typography ><a style={{all: 'unset'}} target="blank" href="https://discord.gg/AMjcew9TtZ"> Discord</a></Typography>
                                    <Typography><a style={{all: 'unset'}} target="" href="/#"> Github</a></Typography>
                                </Box>
                            </Box>
                        </Box>
                </Box>
            </Box>

        {/* row */}

        </>
    )
}