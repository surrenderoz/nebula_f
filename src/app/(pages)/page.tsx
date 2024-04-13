import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import Hero from "../components/hero";
import About from "../components/about/page";
import Community from "../components/community";
import Faq from "../components/faq";
export default function Home() {
  return (
   <>
   {/* <Box sx={{
    maxWidth: "1180px",
    margin: "auto"
   }}> */}
   <Hero />
   <About />
   <Community />
   <Faq />
   {/* </Box> */}
   </>
  );
}
