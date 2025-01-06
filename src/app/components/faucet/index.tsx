import { Box, Button, Stack, TextField, Typography, LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);


export default function Facuet() {
    const [address, setAddress] =  useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function getAddress() {
        try {
            web3.setProvider((window as any).ethereum)
            const add = await web3.eth.getAccounts();
            // console.log(add[0], "add");
            setAddress(add[0]);
        } catch (error) {
            console.log(error);   
        }
    }
    async function handleFund() {
        try {
            if(address == '') return alert('address is required');
            setLoading(true);

            let resp = await fetch('http://localhost:3000/api/transfer', {
                method: "POST",
                body: JSON.stringify({
                    address: address,
                    amount: 5
                })
            })
            const np = await resp.json();
            // console.log(np);
            if(np?.code == 100) {
                setLoading(false);
                return alert(np?.message)
                
            }
            alert('Request Submitted')
            // localStorage.setItem('onlytime', JSON.stringify({amount: 1}));
            setLoading(false);
            router.push('/stake')
        } catch (error) {
            // console.log(error);
            setLoading(false);
            
        }
    }
    useEffect(() => {
        getAddress()
    }, [])
     return(
        <>
            <Typography sx={{
                marginTop: '100px',
                color: '#fff',
                fontSize: '38px',
                fontWeight: 800
            }}>
            NBL FAUCET
            </Typography>
            <Typography sx={{
                marginTop: '15px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 200
            }}>
            Request testnet NBL to cover gas fees for liquid staking.
            </Typography>
            <Box sx={{
                    marginTop: '30px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(23px)',
                        border: '1px solid rgba(255, 255, 255, 1)',
                        borderRadius: '10px',
                        width: '50%',
                        flex: 8,
                        padding: "36px",
                        rowGap: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff'
                    }}>
                        <Stack>
                            <Typography mb={'10px'}>Wallet Address</Typography>
                            <TextField sx={{
                                background: '#fff',
                                borderRadius: '10px',
                                ":focus-visible": {
                                    borderColor: 'white'
                                },
                                "::placeholder": {
                                    color: '#000'
                                }
                            }} placeholder="0x" value={address} onChange={(e:any) => setAddress(e.target.value)} />
                          
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
                    }} onClick={() => handleFund()} disabled={loading}>Request</Button>
                        </Stack>
                    </Box>
        </>
     )
}