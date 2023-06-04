import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
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
  Badge,
  Row,
  Col,
  Input
} from "reactstrap";
import Select from 'react-select';
//import {header} from "reactstrap";
import "../../assets/css/homestyles.css";
import { SetupMasterIds } from "utils/Constants.js";
import {
  GetCurrency_ExchangeRate,
  GetSetupMaster,
} from "utils/CommonMethods.js";
import hsimagel from "../../assets/img/sabsaath-logo.png";
import { Get_Active_Reserved_Cases,SaveSingleDataToLocalStorage,GetLocalStorageValue } from "utils/CommonMethods";
import Swal from "sweetalert2";
import TawkTo from 'tawkto-react'
import { useLocation } from "react-router-dom";
import { fetchData } from "utils/Api";



const HomeHeader_DonorDashboard = (props) => {
  const location = useLocation();
  const history = useHistory();
  var UserName = localStorage.getItem("Name");
useEffect(() => {
  
    document.scrollingElement.scrollTop = 0;
     
   const load = async () => {
   await GetCurrency();
    
 };
 load();
   
  }, [location]);
  const [isOpen, setIsOpen] = useState(false);
  const [currencyddl, setCurrencyddl] = useState([]);
  const [globalCurrency, setglobalCurrency] = useState(null);
  const [globalCurrencyISOCode, setglobalCurrencyISOCode] = useState("");
  const [caseCount, setCaseCount] = useState([]);
  const [caseCountry, setCaseCountry] = useState([]);
  const propertyId = '625d4033b0d10b6f3e6e14ce'
  const tawkId = '1g0u45j65'
  useEffect(() => {
    // var tawk = new TawkTo(propertyId, tawkId)

    // tawk.onStatusChange((status) => 
    // { 
    // })
    GetCasesCount();
  }, []);

  const handleInputChange = (event) => {  
     setglobalCurrency(event);
     sessionStorage.setItem('globalSelectedCurrency',JSON.stringify( event));
     global.sessionUpdate = !global.sessionUpdate;
     window.open('?','_self');
 };
 
  const GetCasesCount = async () => {
    try {
      var data = await Get_Active_Reserved_Cases(0, 0);
      if (data != null) {
        setCaseCount({ ...data.DataSet.Table1[0] });
        setCaseCountry(data.DataSet.Table2 );
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {

          var sortings = data.data.sort(function (a, b) {
            var keyA = a.Flex2
            var keyB = b.Flex2
            if(keyA < keyB) return 1
            if(keyA > keyB) return -1
            return 0
          });
      
          setCurrencyddl(sortings);
          if(sessionStorage.getItem('globalSelectedCurrency') === undefined || sessionStorage.getItem('globalSelectedCurrency') === null)
          {
            global.sessionUpdate = true;
              let selectedCurrencyAccordingRegionIp= sortings.filter(x => x.Flex1 == sessionStorage.getItem('geoLocationcurrencyCode'));
              if(selectedCurrencyAccordingRegionIp.length > 0)
              {
                sessionStorage.setItem('globalSelectedCurrency',JSON.stringify(selectedCurrencyAccordingRegionIp[0]) );
                setglobalCurrency(JSON.parse( sessionStorage.getItem('globalSelectedCurrency')));
              }
          }
          else
          {
            setglobalCurrency(JSON.parse(sessionStorage.getItem('globalSelectedCurrency')));
          }
          return data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  function toggle() {
    setIsOpen(!isOpen);
  }

  async function funLogOut(e) {
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
  return (
    <>
      <Navbar expand="md" className="navbar-custom">
        <Container>
          <Link to="/home">
            <img
              className="navbar-brand"
              height={90}
              src={hsimagel}
              alt="SabSaath"
            />
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <ul className="nav main-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Nav className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      About Us
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#how-we-started"
                      >
                        How We Started
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#vision-mission"
                      >
                        Vision and Mission
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#our-values"
                      >
                        Our Values
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#what-we-do"
                      >
                        What We Do
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#how-we-work"
                      >
                        How We Work
                      </DropdownItem>

                      <DropdownItem divider />

                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#what-makes-us-unique"
                      >
                        What Makes us Unique
                      </DropdownItem>
                      <DropdownItem divider />

                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        href="/about-us#our-partner"
                      >
                        Our Partners
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/impact">
                  Impact
                </Link>
              </li>
              <li className="nav-item">
                <Nav className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Donate
                    </DropdownToggle>
                    <div className="menu-drop">
                      <Row>
                        <Col>
                          <DropdownMenu right className="dropdown-custom">
                            <div className="child-menu">
                              <div className="inner-dropdown">
                                <DropdownItem>
                                  <Link
                                    className="dropdown-link"
                                    to="/cases-list"
                                    style={{
                                      padding: "0px",
                                      color: "#fff !important",
                                    }}
                                  >
                                    ZF Cases
                                  </Link>
                                </DropdownItem>
                                <span>
                                  (
                                  {caseCount && caseCount.AllCases !== null
                                    ? caseCount.AllCases
                                    : "0"}
                                  )
                                </span>
                              </div>
                              <div className="inner-dropdown pl-4">
                                <DropdownItem>
                                  <a href="/cases-list#health">
                                  Health
                                  </a>
                                </DropdownItem>
                                <span>
                                  (
                                  {caseCount && caseCount.Medical !== null
                                    ? caseCount.Medical
                                    : "0"}
                                  )
                                </span>
                              </div>
                              <div className="inner-dropdown pl-4">
                                <DropdownItem>
                                <a href="/cases-list#education">
                                  Education
                                  </a>
                                  </DropdownItem>
                                <span>
                                  (
                                  {caseCount && caseCount.Education !== null
                                    ? caseCount.Education
                                    : "0"}
                                  )
                                </span>
                              </div>
                              <div className="inner-dropdown pl-4 ">
                                <DropdownItem>
                                  <a href="/cases-list#relief">
                                  Relief
                                  </a>
                                  </DropdownItem>
                                <span>
                                  (
                                  {caseCount && caseCount.Relief !== null
                                    ? caseCount.Relief
                                    : "0"}
                                  )
                                </span>
                              </div>
                              <div className="inner-dropdown pl-4 ">
                                <DropdownItem>
                                <a href="/cases-list#meal">
                                  Meal
                                  </a>
                                  </DropdownItem>
                                <span>
                                  (
                                  {caseCount && caseCount.Meal !== null
                                    ? caseCount.Meal
                                    : "0"}
                                  )
                                </span>
                              </div>
                            </div>
                            <DropdownItem divider />
                            <DropdownItem
                              style={{ color: "#d60b11", fontWeight: "600" }}
                            >
                              Donations
                            </DropdownItem>
                          </DropdownMenu>
                        </Col>
                        <Col>
                          <DropdownMenu right className="second-menu">
                            <DropdownItem
                              style={{ color: "#d60b11", fontWeight: "600" }}
                            >
                              {caseCountry[0] && caseCountry[0].Country != ""
                                ? caseCountry[0].Country
                                : "Pakistan"}
                            </DropdownItem>
                            <DropdownItem divider />
                            {caseCountry &&
                        caseCountry
                          .filter((data) => data.Country === "Pakistan")
                          .map((data, key) => (
                            <div className="child-menu" key={key}>
                              <div className="inner-dropdown">
                               <DropdownItem>
                                  {data.City}
                                </DropdownItem>
                                <span>
                                  (
                                  {data.Count}
                                  )
                                </span>
                              </div>
                            </div>
                                ))}
                          </DropdownMenu>
                        </Col>
                      </Row>
                    </div>
                  </UncontrolledDropdown>
                </Nav>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/volunteer">
                  Volunteer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Collapse>
          <div className="country-select" style={{width:"150px",zIndex:10,display: props.isShow ? "block" : "none"}}>
           <Select
  placeholder="Select Option"
  getOptionValue={(option) => option.SetupDetailId} // changes here!!!
  value={globalCurrency}
  options={currencyddl}
  onChange={handleInputChange}
  v
  isDisabled={props.Disableds != undefined ?props.Disableds : false }
  getOptionLabel={e => (
    <div style={{ display: 'flex', alignItems: 'center',zIndex:"10" }}>
      <span class={e.Flex3}></span>
      <span style={{ marginLeft: 5 }}>{e.Flex1}</span>
    </div>
  )}
/>
           </div>
          <div className="ngorel">
          {/* <p className="ngos">
              <span className="glow">For NGO's only</span>
            </p> */}
          <Nav
            className="ml-auto nav-right"
            navbar
            style={{ alignItems: "center" }}
          >
           <li className="nav-item" style={{margin:"30px"}}>
           </li>
            <li className="nav-item">
              <a className="nav-link login-btn">
              <span className="d-md-block">{UserName}</span>
              
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link register-btn" onClick={(e) => funLogOut(e)} href='#'>
                Log Out
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link register-btn" onClick={(e) => funLogOut(e)} href='#'>
                Reset Password
              </a>
            </li>
            
          </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
};
export default HomeHeader_DonorDashboard;
