import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';;
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

export default function ValidatorCard(props) {
  return (
    <Card sx={{ maxWidth: 'fit-content' ,background:'var(--bg-light)', position: 'relative' }}>
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 18,fontWeight:'bold',color:'var(--primary)' }} color="text.secondary" gutterBottom>
          {props.votePubkey}
        </Typography>
        <div style={{
            display:'flex'
        }}>
        <Typography sx={{ mb: 1.5,mr:2.5 }} color="var(--text-light)">
          Activated Stake  <Chip label={`${props.activatedStake/1e9} NZT`} color="primary" variant="outlined" />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="var(--text-light)">
          Commission  <Chip label={`${props.commission} %`} color="primary" variant="outlined" />
        </Typography>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'var(--primary)',
          color: 'white',
          padding: '4px 8px',
          borderTopRightRadius: '4px',
          borderBottomLeftRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Rank #{props.rank}
        </div>
      </CardContent>
    </Card>
  );
}
