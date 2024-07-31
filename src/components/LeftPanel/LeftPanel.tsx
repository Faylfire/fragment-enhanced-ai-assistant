import React from 'react';
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import TopNav from './TopNav';
import Header from './Header';

function LeftPanel() {
  return (
    <div className="left-panel">
      <TopNav />
      <Header />
    </div>
  );
}

export default LeftPanel;