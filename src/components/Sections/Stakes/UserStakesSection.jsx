import React from 'react';
import UserCard from './UserCard';
import { Typography } from '@mui/material';
import { createStakeAcc } from '../../../utils/delegate/createStakeAccount';

function UserStakesSection(props) {
  return (
    <div className='user-stakes-section'>
      <Typography sx={{ fontSize: 26, fontWeight: '400', color: 'var(--text-light)' }} color="text.secondary" gutterBottom>
        Your Stakes
      </Typography>
      {props.accountStakes?.allStakeAccounts.map((val, idx) => {
        return <UserCard key={idx} pubkey={val.pubkey.toString()} lamports={val.account.lamports} rentEpoch={val.account.rentEpoch} val={val}/>;
      })}
       <button className='create-stake' onClick={()=>createStakeAcc(10)}>Create Stake</button>
    </div>
  );
}

export default UserStakesSection;
