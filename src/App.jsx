import React, { useEffect, useState } from 'react'
import { createAccount } from './utils/create'
import { getAccountStakes, getBalance } from './utils/account/info';
import { NEXIS_LOGGED_IN_MNEMONIC } from './utils/lsIdents';
import { getVoteAccounts } from './utils/getVoteAccounts';
import { deactivate } from './utils/account/withdraw';

function App() {
  const [loggedIn,setLoggedIn]= useState(false);
  const [generatedCredentials,setGeneratatedCredentials] = useState(undefined);
  const [displayMnemonic,setDisplayMnemonic] = useState(false);
  const [accountBalance,setAccountBalance] = useState("Loading ...");
  const [voteAccounts,setVoteAccounts] = useState();

  // checks if user has logged in or not
  useEffect(() => {
    const checkIfLoggedIn = async () => {
        try {
            const storedMnemonic = localStorage.getItem(NEXIS_LOGGED_IN_MNEMONIC);
            if (storedMnemonic) {
                setLoggedIn(true);
                setGeneratatedCredentials(JSON.parse(storedMnemonic));
            }
        } catch (error) {
            console.error('Error checking if logged in:', error);
        }
    };
    checkIfLoggedIn();
}, []);

useEffect(()=>{
  const fetchVoteAccounts = async()=>{
    const _voteAccounts = await getVoteAccounts();
    const { current, delinquent } = _voteAccounts;
    setVoteAccounts(current.concat(delinquent));
  }
  fetchVoteAccounts();
},[])
  const generateMnemonic = async()=>{
    try {
      const _generatedCredentials = await createAccount();
      setGeneratatedCredentials(_generatedCredentials);
      localStorage.setItem(
        NEXIS_LOGGED_IN_MNEMONIC,
        JSON.stringify(_generatedCredentials)
      )
      setDisplayMnemonic(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const fetchBalance = async()=>{
      const {balance} = await getBalance(generatedCredentials.publicKey);
      setAccountBalance(balance + " NZT");
    }
    if(generatedCredentials){
      fetchBalance();
    }
  },[loggedIn])

  return (
    <div>
      {!loggedIn && !generatedCredentials && <button onClick={generateMnemonic}>Create Wallet</button>}
      {displayMnemonic && <>
      {generatedCredentials.mnemonic}
      <button onClick={()=>setDisplayMnemonic(false)}>Next</button>
      </>}
      {loggedIn && !displayMnemonic && <>
      <h2>Connected Account</h2>
      <div>
      Native Address: {generatedCredentials.publicKey}
      </div>
      <div>
      Balance: {accountBalance}
      </div>
      <hr />
      {voteAccounts && voteAccounts.length && <>
        <h2>Validators</h2>
        {voteAccounts.map((va,idx)=>{
          return (
          <div>
            <div style={{display:'flex'}}>
            <b  style={{marginRight:'10px'}}>{va.votePubkey}</b> 
            <i>Rank #{idx+1}</i>
            </div>
            <div>root slot: {va.rootSlot}</div>
            <div style={{display:'flex'}}>
              <div style={{marginRight:'10px'}}>
              activated stake: {va.activatedStake/1e9} NZT
              </div>
              <div>
              commission: {va.commission}%
              </div>
              </div>
          </div>
          )
        })}
      </>}
      <button onClick={()=>getAccountStakes()}>getAccountStakes</button>
      <button onClick={()=>deactivate("7LNj3XtZKsA7eNMa7CD4FpBoUVfyKbBngdiXYzYhTCLm")}>deactivate</button>
      </>}
    </div>
  )
}

export default App