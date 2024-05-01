import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import "./index.css"
import { withdrawStake } from '../../../utils/delegate/withdraw';
import { deactivate } from '../../../utils/delegate/deactivate';
import { stake } from '../../../utils/delegate/stake';
import { ValidatorContext } from '../../../context/ValidatorContext';

export default function UserCard(props) {
  const voteAccounts = useContext(ValidatorContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVotePubkey, setSelectedVotePubkey] = useState(voteAccounts?voteAccounts[0].votePubkey:undefined);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (event) => {
    setSelectedVotePubkey(event.target.value);
  };

  return (
    <div className='userStakesCard'>
      <Card sx={{ minWidth: 'fit-content', background: 'var(--bg-light)', position: 'relative' }}>
        <CardContent>
          <br />
          <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'var(--primary)' }} color="text.secondary" gutterBottom>
            {props.pubkey}
          </Typography>
          <div style={{display:'flex'}}>
            {props.val.account.data.parsed.type==="initialized" ? (
              <div style={{display:'flex',marginRight:'10px'}}> 
                <Button 
                  variant="outlined" 
                  sx={{ marginBottom:'14px' }}
                  onClick={handleOpenModal}
                >
                  Not yet delegated, Delegate Now
                </Button>
                <Dialog open={isModalOpen} onClose={handleCloseModal} PaperProps={{
                    sx: {
                      backgroundColor: 'var(--bg)',
                      color: '#F5F5F5',
                    },
                  }}>
                  <DialogTitle>Delegate Now</DialogTitle>
                  <DialogContent>
                    <Typography>Select a validator to delegate to:</Typography>
                    <select value={selectedVotePubkey} onChange={handleSelectChange}>
                      {voteAccounts?.map((voteAccount) => (
                        <option key={voteAccount.votePubkey} value={voteAccount.votePubkey}>
                          {voteAccount.votePubkey}
                        </option>
                      ))}
                    </select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={() => {
                      handleCloseModal();
                      console.log(selectedVotePubkey)
                      stake(selectedVotePubkey, props.val.pubkey.toString());
                    }}>Delegate</Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}
              
            <Button 
              variant='outlined'
              color="success" 
              sx={{ marginBottom:'14px' }}
              onClick={async()=>{
                if(props.val.account.data.parsed.type==="delegated"){
                  deactivate(props.val.pubkey.toString())
                }
                withdrawStake(props.val.pubkey.toString())}
              }
            >
              Withdraw
            </Button>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ mb: 1.5, mr: 2.5 }} color="var(--text-light)">
              Staked  <Chip label={`${props.lamports / 1e9} NZT`} color="primary" variant="outlined" />
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="var(--text-light)">
              Rent Epoch: {props.rentEpoch}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}