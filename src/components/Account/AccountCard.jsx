import React from 'react'
import { shortenAddress } from '../../utils/address/shorten';
import "./AccountCard.css"
import { CircularProgress, Tooltip } from '@mui/material';

function AccountCard(props) {
  return (
    <div className='account-card--container'>
    <img src={`https://api.dicebear.com/8.x/identicon/svg?backgroundColor=3072f8&seed=${props.address}`} className='account-card--avatar' alt="" />
    <Tooltip title={props.address} placement="bottom">
    <div className='account-card' >
        <div className='account-card--address account-card--elems-common'>
        {shortenAddress(props.address)}
        </div>
        <div className='account-card--balance account-card--elems-common'>
            {props.balance??<CircularProgress size={12} className='account-card-balance--loader' />}
        </div>
    </div>
    </Tooltip>
    </div>
  )
}

export default AccountCard