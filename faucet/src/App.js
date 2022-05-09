import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
//cùng metamask co nhap window.ethereum & to window.web3
//metamask cam the gioi api gui toi web
// api day luon web gui yeu cau toi nguoi dung, accounts, read data to block chain
//dang nhap message and hop dong

import { loadContract } from "./utils/load-contract";

// if (window.ethereum) {
//         provider = window.ethereum;

//         try {
//           await provider.request({ method: "eth_requestAccounts" });
//         } catch {
//           console.log("User denied accounts access!");
//         }
//       } else if (window.web3) {
//         provider = window.web3.currentProvider;
//       } else if (!process.env.production) {
//         provider = new Web3.providers.HttpProvider("htt://localhost:7545");
//       }

//  console.log(window.web3);
//       console.log(window.ethereum);
//     };
function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
    
  });

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);



  //khi ma minh nhap vao mang chinh se k phat ra canh bao tick hop dc voi mang chinh
  const canConnectToContract = account && web3Api.contract
  const reloadEffect = useCallback(() => reload(!shouldReload, [shouldReload]));


  //ham change accounts
  const setAccountListener = (provider) => {
    // provider.on("accountsChanged", (_) => setAccount(accounts[0]));
    //connect metamask
    provider.on("accountsChanged", (_) => window.location.reload());
    //tu dong doi
    provider.on("chainChanged", (_) => window.location.reload());
    // provider._jsonRpcConnection.events.on("notification",(payload) =>{
    //   const {method} = payload

    //   if(method === "metamask_unlockStateChanged") {

    //   }
    // })
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);

        setAccountListener(provider);
        // provider.request({method:"eth_requestAccounts"})
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        });
      } else {
        // setWeb3Api({ ...web3Api, isProviderLoaded: true });
        setWeb3Api((api) => ({
          ...api,
          isProviderLoaded: true,
        }));
        console.log("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);

  //ham goi ket noi vi
  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    reloadEffect();

    // window.location.reload()
  }, [web3Api, account, reloadEffect]);

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account,
    });
    reloadEffect();
  };

  return (
    <>
      <div className='faucet-wrapper'>
        <div className='faucet '>
          {web3Api.isProviderLoaded ? (
            <div className='is-flex is-align-items-center'>
              <span>
                <strong className='mr-2'>Account: </strong>
              </span>
              {account ? (
                <div> {account}</div>
              ) : !web3Api.provider ? (
                <>
                  <div className='notification is-warning is-size-7 is-rounded'>
                    Wallet is not detected!{` `}
                    <a
                      rel='noopener noreferrer'
                      target='_blank'
                      href='https://docs.metamask.io'
                    >
                      Install Metamask
                    </a>
                  </div>
                </>
              ) : (
                <button
                  className='button is-small'
                  onClick={() =>
                    web3Api.provider.request({ method: "eth_requestAccounts" })
                  }
                >
                  Connect Wallet
                </button>
              )}
            </div>
          ) : (
            <span>Looking for Web3... </span>
          )}

          <div className='balance-view is-size-2 my-4'>
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          {!canConnectToContract && 
          <i className="is-block">
            Connect to Ganache
          </i>
          }
          <button
            disabled={!canConnectToContract}
            onClick={addFunds}
            className='button is-link mr-2 '
          >
            Donate 1 eth
          </button>
          <button
            disabled={!canConnectToContract}
            onClick={withdraw}
            className='button is-primary '
          >
            Withdraw 0.1 eth
          </button>
        </div>
      </div>
    </>
  );
}

export default App;


//ALL random

// Private key 32 byte number  
// 85d1722d750f22f052816dbbeee2a4301e77683fe610fad35a7b99e6ceb3cd5e


//Public key(Uncompressed) 64 byte number
// 04d1e103f0a98bf4b661254f101b5d1e8ae055038855cd8f1f57fded5a59f23c7e3bcd57285de82dfbfa793d70241691f9d2ee888476f478dbb6f47e61b18be933



// Public key (Compressed) 33 byte number
// 03d1e103f0a98bf4b661254f101b5d1e8ae055038855cd8f1f57fded5a59f23c7e

