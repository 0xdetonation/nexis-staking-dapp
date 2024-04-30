import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

export default function UserCard(props) {
  return (
    <Card sx={{ maxWidth: 'fit-content', background: 'var(--bg-light)', position: 'relative' }}>
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'var(--primary)' }} color="text.secondary" gutterBottom>
          {props.pubkey}
        </Typography>
        <div style={{
          display: 'flex'
        }}>
          <Typography sx={{ mb: 1.5, mr: 2.5 }} color="var(--text-light)">
            Delegated  <Chip label={`${props.lamports / 1e9} NZT`} color="primary" variant="outlined" />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="var(--text-light)">
            Rent Epoch: {props.rentEpoch}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
