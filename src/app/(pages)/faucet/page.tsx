'use client'
import StakeComp from "@/app/components/stake";
import Wrapper from "@/app/components/wrapper";
import {ThemeProvider, useTheme, createTheme} from "@mui/material";
import Facuet from "@/app/components/faucet";
export default function Page() {
    const theme = createTheme({
        typography: {
            fontFamily: ['__Lexend_Deca_e53e8d'].join(',')
        }
      });
    return (
        <>
             <video 
            autoPlay
            loop
            muted
            style={{
                height:"100vh",
                width: '100%',
                objectFit:"fill",
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1
            }}
            >
                <source src="/videos/stake.mp4"/>
            </video>
           <ThemeProvider theme={theme}>
           <Wrapper>
                <Facuet />
            </Wrapper>
           </ThemeProvider>
        </>
    )
}