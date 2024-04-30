import React from 'react';
import "./Navbar.css"
import AccountCard from '../Account/AccountCard';

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-left">Left Content</div>
      <div className="navbar-right">
        <AccountCard address={props.address} balance={props.balance}/>
      </div>
    </div>

  );
}

export default Navbar;
