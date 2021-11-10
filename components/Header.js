import { useEffect, useState } from "react";
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
import Modal from "./blog/Modal";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [firstName, setFirstName] = useState();
  const [mounted, setMounted] = useState(false);

  const getFirstName =()=>{
    if (isAuth()) {
      let fullName = isAuth().name;
      let displayName = fullName.split(" ")[0];
      setFirstName(displayName);
    }
    else return
  
  }
 
  useEffect(() => {
    setMounted(true);
    getFirstName()
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    mounted && (
      <div className="my-navbar">
        <div className="nav-top container">
          <Navbar light expand="md">
            <div className="container-fluid">
              <a href="/" className="font-weight-bold navbar-brand">
                {APP_NAME}
              </a>
              <NavbarToggler onClick={() => toggle()} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {isAuth() ? (
                    <NavItem>
                      <Link href="/user/crud/blog">
                        <a className="btn btn-info">Write</a>
                      </Link>
                    </NavItem>
                  ) : (
                    <div className="text-center">
                      <div
                        className="BUTTON_WRAPPER_STYLES"
                        onClick={() => console.log("")}
                      >
                        <NavItem>
                          <a
                            className="btn btn-info"
                            style={{ color: "white", padding: "0.3rem 1rem" }}
                            onClick={() => setIsOpenLogin(true)}
                          >
                            Write
                          </a>
                        </NavItem>
                        <Modal
                          open={isOpenLogin}
                          onClose={() => setIsOpenLogin(false)}
                        >
                          <div>
                            <h4>Please log in to start writing!</h4>
                            <Link href={`/signin`}>
                              <a className=" btn btn-primary">Sign In</a>
                            </Link>
                          </div>
                        </Modal>
                      </div>
                      <div className="OTHER_CONTENT_STYLES"></div>
                    </div>
                  )}
                  <NavItem>
                    <a href="/discover" className="nav-link">
                      Discover
                    </a>
                  </NavItem>
                  <NavItem>
                    <a href="/blogs" className="nav-link">
                      Blogs
                    </a>
                  </NavItem>
                  {!isAuth() ? (
                    <React.Fragment>
                      <NavItem className="nav-item">
                        <Link href="/signin">
                          <a className="nav-link">Sign In</a>
                        </Link>
                      </NavItem>
                      <NavItem className="nav-item">
                        <Link href="/signup">
                          <a className="nav-link">Sign Up</a>
                        </Link>
                      </NavItem>
                    </React.Fragment>
                  ) : (
                    ""
                  )}

                  {isAuth() && isAuth().role === 0 ? (
                    <NavItem>
                      <Link href="/user">
                        <a className="nav-link">{firstName}</a>
                      </Link>
                    </NavItem>
                  ) : (
                    ""
                  )}

                  {isAuth() && isAuth().role === 1 ? (
                    <NavItem>
                      <Link href="/admin">
                        <a className="nav-link">{firstName}</a>
                      </Link>
                    </NavItem>
                  ) : (
                    ""
                  )}

                  {isAuth() && (
                    <NavItem>
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => signout(() => Router.replace(`/signin`))}
                      >
                       <i class="fas fa-lightbulb fa-lightbulb-hover" title="Sign Out"></i>
                      </a>
                    </NavItem>
                  )}

                  <NavItem className="">
                    <Search />
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </div>
      </div>
    )
  );
};

export default Header;
