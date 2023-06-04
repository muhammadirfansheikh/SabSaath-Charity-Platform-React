import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Router } from "react-router-dom/cjs/react-router-dom.min"
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
} from "reactstrap"

import routes from "routes.js"
import Login from "views/Login"

import dblogo from "../../assets/img/sabsaath-logo2.png"
import { useHistory } from "react-router-dom"
import { baseApplicationUrl, baseImageUrl, fetchData } from "utils/Api"
import Swal from "sweetalert2"

function DemoNavbar_Home(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [color, setColor] = React.useState("transparent")
  const sidebarToggle = React.useRef()
  const location = useLocation()
  var UserName = localStorage.getItem("Name")
  const toggle = () => {
    if (isOpen) {
      setColor("transparent")
    } else {
      setColor("dark")
    }
    setIsOpen(!isOpen)
  }
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen)
  }

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open")
    sidebarToggle.current.classList.toggle("toggled")
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      //   setColor("dark");
    } else {
      setColor("transparent")
    }
  }

  const history = useHistory()
  async function funLogOut(e) {
    e.preventDefault()
    var data = {
      OperationTypeId: 6,
      UserId: localStorage.getItem("UserId"),
    }
    var result = await fetchData("User", "LogOut", data)
    if (result?.Response === true) {
      if (result?.Data[0]?.HasError === 0) {
        window.localStorage.clear() //clear all localstorage
        history.push("/Login")
      }
    } else {
      Swal.fire({
        title: "Error",
        text: result.data[0].MESSAGE,
        icon: "error",
      })
    }
  }

  async function Reset_Password(e) {
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Note: You will be logged out after your password has been changed. Please reset your password through email.",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchData("website", "Get_Profile_Data", {
          FirstName: "",
          LastName: "",
          Address: "",
          CountryId: 0,
          UserIP: "",
          OperationID: "3",
          UserId: localStorage.getItem("UserId"),
          URL: baseApplicationUrl + "/ResetPassword",
        }).then((result) => {
          if (result?.DataSet?.Table[0]?.hasError > 0) {
            Swal.fire({
              title: "Error",
              text: result?.DataSet?.Table[0]?.Message,
              icon: "error",
            })
            return
          }
          Swal.fire({
            title: "Success",
            text: result?.DataSet?.Table[0]?.Message,
            icon: "success",
          })
          props.toggle(true)

          setTimeout(() => {
            props.setFetchAgain((x) => x + 1)
          }, 500)
        })
      }
    })
  }

  // e.preventDefault();
  // var  data =  {
  //   OperationTypeId: 6,
  //   UserId: localStorage.getItem('UserId'),
  // }
  //   var result = await fetchData(
  //   "User",
  //   "LogOut",
  //   data
  // );
  // if (result?.Response === true)
  // {
  //   if (result?.Data[0]?.HasError === 0)
  //    {
  //      window.localStorage.clear(); //clear all localstorage
  //       history.push("/Login");
  //   };
  //   }
  //   else {
  //     Swal.fire({
  //       title: "Error",
  //       text: result.data[0].MESSAGE,
  //       icon: "error",
  //     });
  //   }
  // }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        //  props.location.pathname.indexOf("full-screen-maps") !== -1
        //    ? "dark"
        //    :
        color
      }
      expand="lg"
      className={
        //  indexOf("full-screen-maps") !== -1
        //    ? "navbar-absolute fixed-top"
        //    : "navbar-absolute fixed-top " +
        color === "transparent" ? "navbar-transparent" : ""
      }
    >
      <Container fluid className="p-0">
        {/* <Collapse isOpen={isOpen} navbar className="justify-content-end">*/}

        {localStorage.getItem("Name") === null ? (
          <>
            <Link className="nav-link login-btn login-border-left" to="/login">
              <span className="d-md-block">Login</span>
            </Link>
            <Link
              className="nav-link login-btn login-border-right"
              to="/register"
            >
              <span className="d-md-block"> Sign Up</span>
            </Link>
          </>
        ) : (
          //   <DropdownMenu right>
          //   <DropdownItem tag="a" href="/Login">
          //     Login
          //   </DropdownItem>
          //   <DropdownItem tag="a"  href="/SignUpPanel">
          //    Sign Up
          //   </DropdownItem>
          // </DropdownMenu>

          <>
            <Nav navbar>
              <Dropdown
                className="user-logout"
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
                <DropdownMenu className="logout-dropdown" right>
                  <DropdownItem tag="a" href="/DonorDashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem divider />
                  <DropdownItem tag="a" onClick={(e) => funLogOut(e)}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </>
        )}
        {/* </Collapse> */}
      </Container>
    </Navbar>
  )
}

export default DemoNavbar_Home
