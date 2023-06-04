import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Router } from "react-router-dom/cjs/react-router-dom.min";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";
import Login from "views/Login";

import dblogo from "../../assets/img/sabsaath-logo2.png";
import { useHistory } from "react-router-dom";
import { fetchData } from "utils/Api";
import Swal from "sweetalert2";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  var UserName = localStorage.getItem("Name");
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  const history = useHistory();
  async function funLogOut(e) { 
    //async function handleLoginClick(e) {
      e.preventDefault();
        var  data =  {
          OperationTypeId: 6,
          UserId: localStorage.getItem('UserId'),
        }
          var result = await fetchData(
          "User",
          "LogOut",
          data
        );
        if (result?.Response === true) 
        {
          if (result?.Data[0]?.HasError === 0) 
           {
             window.localStorage.clear(); //clear all localstorage
              history.push("/Login");
          };
          } 
          else {
            Swal.fire({
              title: "Error",
              text: result.data[0].MESSAGE,
              icon: "error",
            });
          }
        } 
      
    
   // window.localStorage.clear(); //clear all localstorage
   // history.push("/Login");

    // alert('logout');
  //}
  const funChangePassword = () =>{
    history.push("/admin/changePassword");
  }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent" : "")
      }
    >
      <Container fluid className="p-0">
        <div className="navbar-wrapper">
          {/* <NavbarBrand href="/">{getBrand()}</NavbarBrand> */}
          <NavbarBrand href="/">
            <img src={dblogo} alt="..." />
          </NavbarBrand>
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-bell-55" />
              </Link>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-single-02" />
                <p>
                  <span className="d-md-block">{UserName}</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" onClick={(e) => funChangePassword(e)}>
                  Change Password
                </DropdownItem>
                <DropdownItem tag="a" onClick={(e) => funLogOut(e)}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
