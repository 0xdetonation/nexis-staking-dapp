import React from 'react';
import "./Navbar.css"
import AccountCard from '../Account/AccountCard';
import logo from "../../assets/nexis.svg"

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-right">
        <AccountCard address={props.address} balance={props.balance}/>
      </div>
    </div>

  );
}

export default Navbar;
