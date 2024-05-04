import React, { useEffect, useState } from 'react'
import { createAccount } from './utils/create'
import { getAccountStakes, getBalance } from './utils/account/info';
import { NEXIS_LOGGED_IN_MNEMONIC } from './utils/lsIdents';
import { getVoteAccounts } from './utils/getVoteAccounts';
import { getConnection } from './utils/connection';
import { PublicKey } from '@velas/web3';
import Navbar from './components/Nav/Navbar';
import ValidatorsSection from './components/Sections/Validators/ValidatorsSection';
import UserStakesSection from './components/Sections/Stakes/UserStakesSection';
import PermanentDrawerLeft from './components/Drawer/Drawer';
import { ValidatorContext } from './context/ValidatorContext';
import Landing from './components/Landing/Landing';

function App() {
  const [loggedIn,setLoggedIn]= useState(false);
  const [generatedCredentials,setGeneratatedCredentials] = useState(undefined);
  const [displayMnemonic,setDisplayMnemonic] = useState(false);
  const [accountBalance,setAccountBalance] = useState(undefined);
  const [voteAccounts,setVoteAccounts] = useState();
  const [accountStakes,setAccountStakes] = useState();

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
    <ValidatorContext.Provider value={voteAccounts}>
    <div>
      {!loggedIn && !generatedCredentials && <Landing connectBtn={<button className='btn-connect' onClick={generateMnemonic}>Create Wallet</button>}/>}
      {displayMnemonic && <>
      {generatedCredentials.mnemonic}
      <button onClick={()=>{
        setDisplayMnemonic(false)
        window.location.reload();
        }}>Next</button>
      </>}
      {loggedIn && !displayMnemonic && <>
      <PermanentDrawerLeft navbar={<Navbar address={generatedCredentials?generatedCredentials.publicKey:undefined} balance={accountBalance?accountBalance:undefined} />} userStakes={<UserStakesSection accountStakes={accountStakes} />} validators={ <ValidatorsSection validators={voteAccounts} />}/>
      </>}
    </div>
    </ValidatorContext.Provider>
  )
}

export default App;
