import React, { useEffect, useState } from 'react'
import { createAccount } from './utils/create'
import { getAccountStakes, getBalance } from './utils/account/info';
import { NEXIS_LOGGED_IN_MNEMONIC } from './utils/lsIdents';
import { getVoteAccounts } from './utils/getVoteAccounts';
import { deactivate } from './utils/delegate/deactivate';
import { createStakeAcc } from './utils/delegate/createStakeAccount';
import { stake } from './utils/delegate/stake';
import { withdrawStake } from './utils/delegate/withdraw';
import { getConnection } from './utils/connection';
import { PublicKey } from '@velas/web3';
import { logout } from './utils/account/loogout';
import Navbar from './components/Nav/Navbar';
import ValidatorsSection from './components/Sections/Validators/ValidatorsSection';
import UserStakesSection from './components/Sections/Stakes/UserStakesSection';

function App() {
  const [loggedIn,setLoggedIn]= useState(false);
  const [generatedCredentials,setGeneratatedCredentials] = useState(undefined);
  const [displayMnemonic,setDisplayMnemonic] = useState(false);
  const [accountBalance,setAccountBalance] = useState(undefined);
  const [voteAccounts,setVoteAccounts] = useState();
  const [accountStakes,setAccountStakes] = useState();

  if(generatedCredentials){
    // listens to account changes through ws
    getConnection().onAccountChange(new PublicKey(generatedCredentials.publicKey),(accountInfo,ctx)=>{
      console.log(accountInfo)
    },'max')
  }

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
  const fetchAccountStakes = async()=>{
    const _accountStakes = await getAccountStakes();
    console.log(_accountStakes);
    setAccountStakes(_accountStakes);
  }
  fetchAccountStakes()
},[])

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
      <Navbar address={generatedCredentials?generatedCredentials.publicKey:undefined} balance={accountBalance?accountBalance:undefined} />
      {!loggedIn && !generatedCredentials && <button onClick={generateMnemonic}>Create Wallet</button>}
      {displayMnemonic && <>
      {generatedCredentials.mnemonic}
      <button onClick={()=>{
        window.location.reload();
        setDisplayMnemonic(false)}}>Next</button>
      </>}
      {loggedIn && !displayMnemonic && <>
        <UserStakesSection accountStakes={accountStakes} />
        <ValidatorsSection validators={voteAccounts} />
        {accountStakes && <>
          <h2>User Stakes : {accountStakes.totalStakeBalance/1e9} NZT</h2>
          {accountStakes.allStakeAccounts.map((val)=>{
            return <div>
              <b>{val.pubkey.toString()}</b>

              {val.account.data.parsed.type=="delegated"?
                <div>Staked To: {val.account.data.parsed.info.stake.delegation.voter}</div>:<></>}

              {val.account.data.parsed.type=="initialized"?<div style={{display:'flex'}}> 
                <button onClick={async()=>{
                  stake("todo",val.pubkey.toString());
                }}>Not yet delegated, Delegate Now</button>
              </div>:<></>}
              
              <div style={{
                display:'flex'
              }}>
                <div style={{marginRight:'10px'}}>Delegated: {val.account.lamports/1e9} NZT</div>
                <div style={{marginRight:'10px'}}>Rent Epoch: {val.account.rentEpoch.toString()}</div>
                <button  onClick={async()=>{
                  if(val.account.data.parsed.type=="delegated"){
                    deactivate(val.pubkey.toString())
                  }
                  withdrawStake(val.pubkey.toString())}
                }>withdraw</button>
              </div>
              
              <br/>
            </div>
          })}

          <button onClick={()=>createStakeAcc(10)}>create stake account</button>
          <button onClick={()=>logout()}>logout</button>
        </>}
      </>}
    </div>
  )
}

export default App;
