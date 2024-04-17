export async function connect_wallet() {
    try {
        console.log("loggin");
        
        if(typeof window != "undefined") {
            console.log("hit connect");
            
            let enable = await (window as any).keplr.enable('froopyland_100-1');
            console.log(enable, "enable the chain");
            
            const offlineSigner = (window as any).keplr.getOfflineSigner('froopyland_100-1');
            const accounts = await offlineSigner.getAccounts();
            return accounts;
        }
    } catch (error) {
        console.log(error);
        suggetChain()
        
    }
}

const suggetChain = async () => {
    try {
        await (window as any).keplr.experimentalSuggestChain({
            chainId: "froopyland_100-1",
            chainName: "Dymension Testnet",
            rpc: "https://froopyland.blockpi.network/rpc/v1/public",
            rest: "https://froopyland.blockpi.network/lcd/v1/public",
            bip44: {
                coinType: 60,
            },
            bech32Config: {
                bech32PrefixAccAddr: "dym",
                bech32PrefixAccPub: "dym" + "pub",
                bech32PrefixValAddr: "dym" + "valoper",
                bech32PrefixValPub: "dym" + "valoperpub",
                bech32PrefixConsAddr: "dym" + "valcons",
                bech32PrefixConsPub: "dym" + "valconspub",
            },
            currencies: [ 
                { 
                    coinDenom: "DYM", 
                    coinMinimalDenom: "udym", 
                    coinDecimals: 18, 
                    coinGeckoId: "DYM", 
                }, 
            ],
            feeCurrencies: [
                {
                    coinDenom: "DYM",
                    coinMinimalDenom: "udym",
                    coinDecimals: 18,
                    coinGeckoId: "DYM",
                    gasPriceStep: {
                        low: 0.01,
                        average: 0.025,
                        high: 0.04,
                    },
                },
            ],
            stakeCurrency: {
                coinDenom: "DYM",
                coinMinimalDenom: "udym",
                coinDecimals: 18,
                coinGeckoId: "dym",
            },
        });
        
    } catch (error) {
        alert(" It appears that Keplr has not been installed, Could you kindly install Keplr wallet?")
    }
}