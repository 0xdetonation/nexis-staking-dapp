import React from 'react'
import ValidatorCard from './ValidatorCard'
import { CircularProgress, Typography } from '@mui/material';

function ValidatorsSection(props) {
  return (
    <div>
        <Typography sx={{ fontSize: 26,fontWeight:'400',color:'var(--text-light)' }} color="text.secondary" gutterBottom>Validators</Typography>
        {!props.validators && <CircularProgress />}
        {props.validators?.map((v,idx)=>{
            return <ValidatorCard votePubkey={v.votePubkey} activatedStake={v.activatedStake} commission={v.commission} rank={idx+1}/>
        })}
    </div>
  )
}

export default ValidatorsSection;