'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import Hero from "../components/hero";
import About from "../components/about/page";
import Community from "../components/community";
import Faq from "../components/faq";
import Footer from "../components/footer";
import {ThemeProvider, useTheme, createTheme} from "@mui/material";

export default function Home() {
  const theme = createTheme({
    typography: {
        fontFamily: ['__Lexend_Deca_e53e8d'].join(',')
    }
  });
  return (
   <>
   {/* <Box sx={{
    maxWidth: "1180px",
    margin: "auto"
   }}> */}
   <ThemeProvider theme={theme}>
   <Hero />
   <About />
   <Community />
   <Faq />
   <Footer />
   </ThemeProvider>
   {/* </Box> */}
   </>
  );
}
