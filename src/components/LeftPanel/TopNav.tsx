import React from 'react';
import reactLogo from '@/assets/react.svg'
//import NavBar from './NavBar';
//import TopicList from './TopicList';

function TopNav() {
  return (
    <div className='bg-black p-2'>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
    </div>
  );
}

export default TopNav;