import { Box, Typography, Button } from "@mui/material";
import Accordon from "./accordon";
import Wrapper from "../wrapper";
const FaqData = [
    {
        key: "What is Nebulafi?",
        value: 'We believe the future is modular, and @dymension is set to become the foundational protocol for the modular vision.'
    },
    {
        key: "What is Nebulafi?",
        value: 'We believe the future is modular, and @dymension is set to become the foundational protocol for the modular vision.'
    },
    {
        key: "What is Nebulafi?",
        value: 'We believe the future is modular, and @dymension is set to become the foundational protocol for the modular vision.'
    }
];

export default function Faq() {
    return(
        <>
                <Box sx={{
                    background: 'black',
                    fontFamily: '',
                    padding: '100px 0'
                }}>
                    <Wrapper>
                       <Box sx={{
                        display: 'flex',
                        gap: '50px',
                        mb: '200px'
                       }}>
                       <Typography sx={{
                        // flex: 1,
                        color: '#fff',
                        fontSize: '48px',
                        fontWeight: 400
                       }}>
                                Everything you 
                                need to know
                            </Typography>
                       <Box sx={{display: 'inline'}}>
                       {
                            FaqData.map((value, k) => (
                                <Accordon value={value.value} name={value.key}  key={k}/>
                            ))
                        }
                       </Box>    
                       </Box>
                       <Below />

                    </Wrapper>
                </Box>
        </>
    )
}

function Below() {
    return(
        <>
            <Box sx={{
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
                // fl
            }}>
                <Typography fontWeight={500} fontSize={'24px'}>
                Future is modular, and were just getting started
                </Typography>
                <Typography fontWeight={500} fontSize={'54px'}>
                Be part of the community and keep up to date with latest news !
                </Typography>
                <Button  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#CCFFFF',
                    // cursor: 'pointer',
                    fontSize: '16px',
                    textTransform: 'lowercase',
                    "::after": {
                        content: '""',
                        display:'block',
                        width: '20px',
                        height: '2px',
                        background: '#CCFFFF',
                        
                    },
            
                }}>t.me/nebulafi</Button>
            </Box>
        </>
    )
}