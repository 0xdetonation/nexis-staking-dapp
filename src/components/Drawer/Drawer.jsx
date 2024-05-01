import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import logo from "../../assets/nexis.svg"

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  const [selectedTab, setSelectedTab] = useState('Your Stakes');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      {props.navbar}
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'black',
              color:'white'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div style={{
            padding:'18px'
          }}>
            <img src={logo} alt="" />
          </div>
          <Divider sx={{ bgcolor: 'white' }}/>
          <List>
            {['Your Stakes', 'Validators'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => handleTabClick(text)}
                selected={selectedTab === text}
                sx={{
                    '&:hover': {
                      '& .MuiListItemText-primary': {
                        color: 'var(--primary)',
                      },
                    },
                  }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: '#171717', p: 3 }}
        >
          {selectedTab === 'Your Stakes' && props.userStakes}
          {selectedTab === 'Validators' && props.validators}
        </Box>
      </Box>
    </>
  );
}
