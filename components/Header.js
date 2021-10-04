import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import ReactDOM from "react-dom";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ".././node_modules/nprogress/nprogress.css";
import Search from "./blog/Search";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-navbar" style={{ backgroundColor: "" }}>
      <div className="nav-top container">
        <Navbar light expand="md">
          <div className="container-fluid">
            <Link href="/">
              <a className="font-weight-bold nav-link">{APP_NAME}</a>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {!isAuth() && (
                  <React.Fragment>
                    <NavItem className="nav-item">
                      <Link href="/signin">
                        <a className="nav-link">Signin</a>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href="/signup">
                        <a className="nav-link">Signup</a>
                      </Link>
                    </NavItem>
                    
              
                  </React.Fragment>
                )}

               

               
                 <NavItem>
                  <Link href="/discover">
                    <a className="nav-link">Discover</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/blogs">
                    <a className="nav-link">Blogs</a>
                  </Link>
                </NavItem>
                {isAuth() && isAuth().role === 0 && (
                  <NavItem>
                    <Link href="/user">
                      <a className="nav-link">{`${isAuth().name}`}</a>
                    </Link>
                  </NavItem>
                )}

                {isAuth() && isAuth().role === 1 && (
                  <NavItem>
                    <Link href="/admin">
                      <a className="nav-link">{`${isAuth().name}`}</a>
                    </Link>
                  </NavItem>
                )}

                {isAuth() && (
                  <NavItem>
                    <a className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => signout(() => Router.replace(`/signin`))}
                    >
                      Signout
                    </a>
                  </NavItem>
                )}
                <NavItem>
                  <Link href="/user/crud/blog">
                    <a
                      className="btn bg-info nav-link"
                      style={{ color: "white", padding:"0.3rem 1rem"}}
                    >
                      Write
                    </a>
                  </Link>
                </NavItem>
                <NavItem className="">
                  <Search />
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
