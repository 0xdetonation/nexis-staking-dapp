import React from 'react';
import ValidatorCard from './ValidatorCard'
import { CircularProgress, Typography, Badge } from '@mui/material';

function ValidatorsSection(props) {
  return (
    <>
    {props.validators?
    <div style={{ position: 'absolute', right: 0, top: '4rem', zIndex: '9999', height: '80vh' }}>
      <Typography sx={{ fontSize: 26, fontWeight: '400', color: 'var(--text-light)' }} color="text.secondary" gutterBottom>
        Validators <Badge badgeContent={props.validators ? props.validators.length : 0} color="primary" style={{ marginLeft: '10px' }} />
      </Typography>
      {props.validators?.map((v, idx) => {
        return <ValidatorCard key={idx} votePubkey={v.votePubkey} activatedStake={v.activatedStake} commission={v.commission} rank={idx + 1} />
      })}
    </div>:<></>
  }
    </>
  )
}

export default ValidatorsSection;
