import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
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
  Label,
} from "reactstrap"
//import {header} from "reactstrap";
import "../../assets/css/homestyles.css"

import hsimagel from "../../assets/img/sabsaath-logo.png"
import {
  Get_Active_Reserved_Cases,
  SaveSingleDataToLocalStorage,
  GetLocalStorageValue,
  GetSetupMaster,
  NGOController,
} from "utils/CommonMethods"
import Swal from "sweetalert2"
import TawkTo from "tawkto-react"
import { useLocation } from "react-router-dom"
import Login from "views/Login"
import { fetchData } from "utils/Api"
//import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import DemoNavbar from "../../components/Navbars/DemoNavbar.js"
import Sidebar from "../../components/Sidebar/Sidebar"
import routes from "routes"
import DemoNavbar_Home from "components/Navbars/DemoNavbar_Home"
import { SetupMasterIds } from "utils/Constants"
import Select from "react-select"

const HomeHeader = (props) => {
  var username = localStorage.getItem("Name")
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    document.scrollingElement.scrollTop = 0

    const load = async () => {
      await GetCurrency()
    }
    load()
  }, [location])
  const [isOpen, setIsOpen] = useState(false)
  const [currencyddl, setCurrencyddl] = useState([])
  const [globalCurrency, setglobalCurrency] = useState(null)
  const [ngos, setNgos] = useState([])
  const [globalCurrencyISOCode, setglobalCurrencyISOCode] = useState("")
  const [caseCount, setCaseCount] = useState([])
  const [caseCountry, setCaseCountry] = useState([])
  const propertyId = "625d4033b0d10b6f3e6e14ce"
  const tawkId = "1g0u45j65"
  useEffect(() => {
    if (
      localStorage.getItem("RoleId") != null && // Means if user is logged in
      localStorage.getItem("RoleId") != 37 // And if user is not a guest user
    ) {
      window.localStorage.clear() //clear all localstorage

      window.sessionStorage.clear()
      const load = async () => {
        await GetCurrency()
      }
      load()
      history.push("/Login")
    }
    // GetCasesCount()
    GetFeaturedNGOsDetails()
  }, [])

  const handleInputChange = (event) => {
    // if(event.target.value > 0){
    setglobalCurrency(event)

    sessionStorage.setItem("globalSelectedCurrency", JSON.stringify(event))
    global.sessionUpdate = !global.sessionUpdate

    window.location.reload()
  }

  const GetCasesCount = async () => {
    try {
      var data = await Get_Active_Reserved_Cases(0, 0)
      if (data != null) {
        setCaseCount({ ...data.DataSet.Table1[0] })
        setCaseCountry(data.DataSet.Table2)
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const GetFeaturedNGOsDetails = async () => {
    try {
      var data = await NGOController(
        0,
        4,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        true
      )
      if (data) {
        setNgos(data.Table)
        if (props?.pickNGOsData) {
          props.pickNGOsData(data)
        }
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          var sortings = data.data.sort(function (a, b) {
            var keyA = a.Flex2
            var keyB = b.Flex2
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
          })

          setCurrencyddl(sortings)

          if (
            sessionStorage.getItem("globalSelectedCurrency") === undefined ||
            sessionStorage.getItem("globalSelectedCurrency") === null
          ) {
            global.sessionUpdate = true

            let selectedCurrencyAccordingRegionIp = sortings.filter(
              (x) =>
                x.Flex1 == sessionStorage.getItem("geoLocationcurrencyCode") ||
                "PKR"
            )
            if (selectedCurrencyAccordingRegionIp.length > 0) {
              sessionStorage.setItem(
                "globalSelectedCurrency",
                JSON.stringify(selectedCurrencyAccordingRegionIp[0])
              )
              setglobalCurrency(
                JSON.parse(sessionStorage.getItem("globalSelectedCurrency"))
              )
            }
          } else {
            setglobalCurrency(
              JSON.parse(sessionStorage.getItem("globalSelectedCurrency"))
            )
          }

          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  function toggle() {
    setIsOpen(!isOpen)
  }

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
  const [backgroundColor, setBackgroundColor] = React.useState("black")
  const [activeColor, setActiveColor] = React.useState("info")

  return (
    <>
      <div
        className="top-bar"
        onClick={() => {
          props.toggleCurrencySelect("close")
        }}
      >
        <div className="container">
          <Row>
            <Col md={6}>
              <ul className="topbar-list">
                <li>
                  <span>
                    <i className="fa fa-phone"> </i> <a>Tel: 042-111-222-500</a>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="fa fa-envelope"> </i>{" "}
                    <a href="mailto:info@sabsaath.org">info@sabsaath.org</a>
                  </span>
                </li>
              </ul>
            </Col>

            <Col md={6}>
              <ul className="top-social-icons">
                <li className="social-title">Stay informed: </li>
                <li>
                  <a
                    href="https://www.facebook.com/SabSaath.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/sabsaathpk?utm_medium=copy_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/zamanfoundation/ "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <Navbar
        expand="md"
        className="navbar-custom"
        onClick={() => {
          props.toggleCurrencySelect && props.toggleCurrencySelect("close")
        }}
      >
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
                <Nav className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Impact
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        tag={Link}
                        to="/flood-impact"
                      >
                        Pakistan Floods Relief
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        tag={Link}
                        to="/covid-impact"
                      >
                        Covid-19
                      </DropdownItem>
                      <DropdownItem divider />
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </li>
              <li className="nav-item">
                <Nav className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Donate
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        tag={Link}
                        to={"/QurbaniCampaign"}
                      >
                        Qurbani
                      </DropdownItem>
                      {ngos &&
                        ngos.length > 0 &&
                        // Rearrange the order of the NGOs and put Zaman Foundation at the top
                        ngos
                          .sort((a, b) => {
                            if (
                              a.NGOFeatureID ===
                                SetupMasterIds.ZamanFoundation ||
                              a.NGOFeatureID ===
                                SetupMasterIds.ZamanFoundationNGO
                            ) {
                              return -1
                            }
                            if (
                              b.NGOFeatureID ===
                                SetupMasterIds.ZamanFoundation ||
                              b.NGOFeatureID ===
                                SetupMasterIds.ZamanFoundationNGO
                            ) {
                              return 1
                            }
                            return 0
                          })
                          .map((ngo, index) => {
                            return (
                              <div key={index}>
                                <DropdownItem
                                  type="button"
                                  className="dropdown-item"
                                  tag={Link}
                                  to={
                                    ngo?.NGOFeatureID ===
                                      SetupMasterIds.ZamanFoundation ||
                                    ngo?.NGOFeatureID ===
                                      SetupMasterIds.ZamanFoundationNGO
                                      ? "/ramazancampaign"
                                      : `/cases-list/${ngo.NGOFeatureID}`
                                  }
                                >
                                  {ngo?.NGOFeatureID ===
                                    SetupMasterIds.ZamanFoundation ||
                                  ngo?.NGOFeatureID ===
                                    SetupMasterIds.ZamanFoundationNGO
                                    ? ngo.Heading
                                    : ngo.NGOInitials}
                                </DropdownItem>
                                <DropdownItem divider />
                              </div>
                            )
                          })}
                      <DropdownItem
                        type="button"
                        className="dropdown-item"
                        tag={Link}
                        to={
                          "/subscription-quick-donate?id=314&name=General%20Donation"
                        }
                      >
                        Quick Donate
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </li>
              {/* <li className="nav-item">
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
                                      // padding: "0px",
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
                                  <a href="/cases-list#health">Health</a>
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
                                  <a href="/cases-list#education">Education</a>
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
                                  <a href="/cases-list#relief">Relief</a>
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
                                  <a href="/cases-list#meal">Meal</a>
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
                                      <DropdownItem>{data.City}</DropdownItem>
                                      <span>({data.Count})</span>
                                    </div>
                                  </div>
                                ))}
                          </DropdownMenu>
                        </Col>
                      </Row>
                    </div>
                  </UncontrolledDropdown>
                </Nav>
              </li> */}
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

          {props.isShow && (
            <Label
              className="label mr-3 fw-bold currency-label-desktop"
              style={{
                fontSize: "16px",
                display: props.isShow ? "block" : "none",
                color: "#6E6E6E",
              }}
            >
              Currency
            </Label>
          )}

          <div
            className="country-select"
            style={{
              width: "150px",
              zIndex: 10,
              display: props.isShow ? "block" : "none",
            }}
          >
            {props.isShow && (
              <Label
                className="label mr-3 fw-bold currency-label-mobile"
                style={{
                  fontSize: "16px",
                  display: props.isShow ? "block" : "none",
                  color: "#6E6E6E",
                }}
              >
                Currency
              </Label>
            )}
            <div
              onClick={(e) => {
                e.stopPropagation()
                props.toggleCurrencySelect()
              }}
            >
              <Select
                placeholder="Select Currency"
                closeMenuOnSelect
                id="currency-select"
                getOptionValue={(option) => option.SetupDetailId} // changes here!!!
                value={globalCurrency}
                options={currencyddl}
                onChange={handleInputChange}
                isDisabled={props.Disableds ? props.Disableds : false}
                getOptionLabel={(e) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      zIndex: "10",
                    }}
                  >
                    <span class={e.Flex3}></span>
                    <span style={{ marginLeft: 5 }}>{e.Flex1}</span>
                  </div>
                )}
              />
            </div>
          </div>
          {!props.hide && (
            <div className="ngorel">
              <DemoNavbar_Home />
            </div>
          )}
        </Container>
      </Navbar>
    </>
  )
}
export default HomeHeader
