import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import PlusSign from "../../../../public/assets/plussign.svg";
import Image from "next/image";

export default function Accordon({name, value}: any) {    
    return(
        <>
        <Accordion sx={{
            all: 'unset',
            color: '#fff'
        }}>
            <AccordionSummary  expandIcon={<Image src={PlusSign} width={20} height={20} alt="icon"/>}>
            <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails >
                <Typography>
                        {value}
                </Typography>
            </AccordionDetails>
        </Accordion>
        
        </>
    )
}