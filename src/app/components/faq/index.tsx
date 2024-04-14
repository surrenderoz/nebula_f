import { Box, Typography, Button } from "@mui/material";
import Accordon from "./accordon";
import Wrapper from "../wrapper";
const FaqData = [
    {
        key: "What is Nebula Finance?",
        value: 'Nebula Finance is a RollApp which offers liquid staked DYM. By staking your DYM coins with Nebula, you will receive an on-chain equal to your DYM staking position called nDYM. Liquid staked DYM will be used to secure Dymension, and you will be able to utilize nDYM for various DeFi activities in near future.'
    },
    {
        key: "How does Nebula work? ",
        value: 'Nebula is built on top of  Dymension. You can liquid stake your DYM for nDYM. The DYM you staked will be delegated uniformly across Nebula’s validators through Nebula RollApp. Staking rewards will be automatically reflected on the dashboard.'
    },
    {
        key: "How is the conversion rate calculated?",
        value: 'The conversion rate is 1:1 as Dym/nDym'
    },
    {
        key: "Fees",
        value: 'Since Nebula operates as an on-chain protocol on Dymension, interacting with the platform will cause gas fees. The cost of gas fees will depend on the chains settings and demand.In addition to gas fees, there are other costs to consider. Nebula applies a 10% protocol fee on staking rewards.'
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
                        padding: {
                            xs: '0 20px',
                            md: 0
                        },
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        },
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