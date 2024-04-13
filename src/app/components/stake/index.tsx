'use client'
import { Box, Button, Stack, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import {connect_wallet} from "../../services/wallet";
import {StakeNow} from "../../services/stake";
import { useState } from "react";


export default function StakeComp() {   
    const [value, setValue] = useState(0) ;
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true)
        // if(value == 0) return
        let res = await StakeNow(value);
        // console.log(res.code );
        // if((res as any)?.code == 0) {
        //     alert('Success')
        // }
        // else {
        //     alert('there was an error');
        //     setLoading(false)
        // }

        if(res) {
            setLoading(false);
            alert('success')
        }
        setValue(0)
    }
    return(
        <>
        {/* <Alert content="View" title="title" /> */}
            <Box sx={{
                display: 'flex',
                mt: '100px',
                width: '100%',
                maxWidth: '700px',
                columnGap: '25px',
                color: '#fff'
              
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
                        <Typography fontSize={'16px'}  fontWeight={700}>0 DYM</Typography>
                        <Typography fontSize={'14px'}>$ 0</Typography>
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Dym Price</Typography>
                        <Typography fontSize={'16px'}  fontWeight={700}>$5.0</Typography>
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Available to use in DeFi</Typography>
                        <Typography fontSize={'16px'}  fontWeight={700}>0 nDYM</Typography>
                        <Typography>$ 0</Typography>
                    </Stack>
                    <Stack sx={{
                        fontSize: '14px'
                    }}>
                        <Typography>Nebulifi APR</Typography>
                        <Typography color={'#05FF00'} fontSize={'16px'}  fontWeight={700}>17.0%</Typography>
                        <Typography>0.26% per week</Typography>
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
                        <Typography sx={{
                            color: 'grey',
                            mt: '10px',
                            fontSize: '12px'
                        }}>connect your wallet to view your DYM balance</Typography>
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
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Typography>Annual Interest</Typography>
                            <Typography fontSize={'16px'}  fontWeight={700}>0 nDYM</Typography>
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
            </Box>
        </>
    )
}