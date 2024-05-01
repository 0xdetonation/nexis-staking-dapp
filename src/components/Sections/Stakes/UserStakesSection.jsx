import React from 'react';
import UserCard from './UserCard';
import { Typography } from '@mui/material';

function UserStakesSection(props) {
  return (
    <div >
      <Typography sx={{ fontSize: 26, fontWeight: '400', color: 'var(--text-light)' }} color="text.secondary" gutterBottom>
        User Stakes
      </Typography>
      {props.accountStakes?.allStakeAccounts.map((val, idx) => {
        return <UserCard key={idx} pubkey={val.pubkey.toString()} lamports={val.account.lamports} rentEpoch={val.account.rentEpoch} val={val}/>;
      })}
    </div>
  );
}

export default UserStakesSection;
