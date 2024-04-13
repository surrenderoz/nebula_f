import StakeComp from "@/app/components/stake";
import Wrapper from "@/app/components/wrapper";

export default function Stake() {
    return(
        <>
            <video 
            autoPlay
            loop
            muted
            style={{
                height:"100vh",
                objectFit:"fill",
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1
            }}
            >
                <source src="/videos/stake.mp4"/>
            </video>
            <Wrapper>
                <StakeComp />
            </Wrapper>
        </>
    )
}