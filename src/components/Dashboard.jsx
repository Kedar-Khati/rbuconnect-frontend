import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Dashboard.css';

export const Dashboard = () => {
  return (
    <div className='dashboard-container'>

      {/* Logo Section */}
      <div id='logo-div'>
        <NavLink to='/'>Logo</NavLink>
      </div>

      {/* Search Box Section */}
      <div id="search-box">
        <form className="search-form">   
            <label htmlFor="default-search" className="sr-only">Search</label>
            <div className="search-wrapper">
                <input 
                  type="search" 
                  id="default-search" 
                  className="search-input" 
                  placeholder="Search..." 
                  required 
                />
                <button type="submit" className="search-button">Search</button>
            </div>
        </form>
      </div>

      {/* Navigation Links Section */}
      <div id="nav-div">
        <NavLink to='/connect'>Connect</NavLink>
        <NavLink to='/community'>Community</NavLink>
        <NavLink to='/companies'>Companies</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
      </div>

      {/* Authentication Buttons */}
      <div className='auth-buttons'>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <SignOutButton />
          <UserButton className="custom-user-button"/>
        </SignedIn>
      </div>

    </div>
  );
};
