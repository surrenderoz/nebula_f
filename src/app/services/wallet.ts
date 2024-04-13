export async function connect_wallet() {
    try {
        if(typeof window != "undefined") {
            console.log("hit connect");
            
            (window as any).keplr.enable('froopyland_100-1');
            const offlineSigner = (window as any).keplr.getOfflineSigner('froopyland_100-1');
            const accounts = await offlineSigner.getAccounts();
            return accounts;
            
        }
    } catch (error) {
        
    }
}