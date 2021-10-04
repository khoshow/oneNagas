import Header from "./Header";
import React from 'react';
import ReactDOM from 'react-dom';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "" }}>
        <Header />
        <div className="container">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
