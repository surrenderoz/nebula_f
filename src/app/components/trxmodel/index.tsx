import { Box, Button, Typography } from "@mui/material";

export default function TrxModel({hash}: any) {
    return(
        <>
        <Box sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(23px)',
            border: '1px solid rgba(255, 255, 255, 1)',
            padding: '50px',
            borderRadius: '10px',
            position: 'absolute',
            transform: 'translate(0, 100%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <Typography color={'#fff'} textAlign={'center'}>
                Transaction Successfull
            </Typography>
            <Typography color={'#fff'} textAlign={'center'}>
                Your nDYM balance will updated after the transaction is completed
            </Typography>
            <Typography color={'#fff'} textAlign={'center'}>
                {String(hash).substring(0,7)}
            </Typography>
            <Button sx={{
                color: '#B9F7FD'
            }} href={`https://explorer.nebula.silknodes.io/local/tx/${hash}`} target="blank">View Transaction</Button>
        </Box>
        </>
    )
}