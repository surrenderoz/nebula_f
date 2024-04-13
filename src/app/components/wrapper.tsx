import { Box } from "@mui/material";

export default function Wrapper({children}: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <Box sx={{
            maxWidth: '1170px',
            width: '100%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {children}
        </Box>
    )
}