import React, { useContext } from 'react';
import UserCard from './UserCard';
import { Typography } from '@mui/material';
import { createStakeAcc } from '../../../utils/delegate/createStakeAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserStakesSection(props) {
  
  return (
    <div className='user-stakes-section'>
      <Typography sx={{ fontSize: 26, fontWeight: '400', color: 'var(--text-light)' }} color="text.secondary" gutterBottom>
        Your Stakes
      </Typography>
      {props.accountStakes?.allStakeAccounts.map((val, idx) => {
        return <UserCard key={idx} pubkey={val.pubkey.toString()} lamports={val.account.lamports} rentEpoch={val.account.rentEpoch} val={val}/>;
      })}
       <button className='create-stake' onClick={()=>createStakeAcc(10,toast)}>Create Stake</button>
       <ToastContainer />
    </div>
  );
}

export default UserStakesSection;
