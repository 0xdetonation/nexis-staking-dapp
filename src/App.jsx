import React, { useEffect, useState } from 'react'
import { createAccount } from './utils/create'
import { getAccountInfo } from './utils/account/info';
import { delegate } from './utils/delegate';

function App() {
  const [loggedIn,setLoggedIn]= useState(false);
  const [generatedCredentials,setGeneratatedCredentials] = useState(undefined);
  const [displayMnemonic,setDisplayMnemonic] = useState(false);
  const [accountBalance,setAccountBalance] = useState("Loading ...");

  // checks if user has logged in or not
  useEffect(() => {
    const checkIfLoggedIn = async () => {
        try {
            const storedMnemonic = localStorage.getItem('NEXIS_LOGGED_IN_MNEMONIC');
            if (storedMnemonic) {
                setLoggedIn(true);
                console.log(storedMnemonic);
                setGeneratatedCredentials(JSON.parse(storedMnemonic));
            }
        } catch (error) {
            console.error('Error checking if logged in:', error);
        }
    };
    checkIfLoggedIn();
}, []);


  const generateMnemonic = async()=>{
    try {
      const _generatedCredentials = await createAccount();
      setGeneratatedCredentials(_generatedCredentials);
      localStorage.setItem(
        'NEXIS_LOGGED_IN_MNEMONIC',
        JSON.stringify(_generatedCredentials)
      )
      setDisplayMnemonic(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const fetchBalance = async()=>{
      const {balance} = await getAccountInfo(generatedCredentials.publicKey);
      setAccountBalance(balance + " NZT");
    }
    if(generatedCredentials){
      fetchBalance();
    }
  },[loggedIn])

  return (
    <div>
      {!loggedIn && <button onClick={generateMnemonic}>Create Wallet</button>}
      {displayMnemonic && <>
      {generatedCredentials.mnemonic}
      <button onClick={()=>setDisplayMnemonic(false)}>Next</button>
      </>}
      {loggedIn && !displayMnemonic && <>
      <div>
      Native Address: {generatedCredentials.publicKey}
      </div>
      <div>
      Balance: {accountBalance}
      </div>
      <button onClick={()=>delegate()}>delegate</button>
      </>}
    </div>
  )
}

export default App