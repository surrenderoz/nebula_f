export default function Background() {
    return(
        <>
            <video autoPlay muted loop style={{
                zIndex: '-1',
                position: 'fixed',
                width: '100%',
                height: '100vh',
                objectFit: 'none',
                top: 0
            }}>
                <source src="/videos/background.mp4"/>
            </video>
        </>
    )
}