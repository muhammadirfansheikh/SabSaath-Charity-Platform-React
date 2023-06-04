import React, { useState, useEffect } from "react"
import { NavLink as RRNavLink, Link } from "react-router-dom"
import { Nav } from "reactstrap"

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar"
import logo from "sabsaath-logo.png"

import { routesnew } from "../../routesnew.js"
import SubMenus from "./SubMenus.js"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  UncontrolledButtonDropdown,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap"
var ps,
  routesData = []

function Sidebar(props) {
  const [menuResponse, setMenuResponse] = React.useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [itemList, setItemList] = useState([])
  const [itemId, setItemId] = useState(0)
  const [menu, setMenu] = useState(null)

  const [open, setOpen] = useState("1")
  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  const sidebar = React.useRef()

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : ""
  }

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy()
      }
    }
  })

  useEffect(() => {
    setMenu(localStorage.getItem("UserId"))
  }, [])

  useEffect(async () => {
    try {
      routesData = await routesnew()

      setMenuResponse(routesData.routes)
      return routesData
    } catch (error) {
      //    console.log(error);
    }
  }, [])
  const childClick = (data, id) => {
    console.log({ id, data })
    setItemList(data)
    // setItemId(id)
    setIsOpen(!isOpen)
  }
  console.log("menuResponse", menuResponse)

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      {/*<p>{menu}</p>*/}

      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {menuResponse?.map((prop, key) => {
            return prop?.is_Displayed_In_Menu ? (
              <li key={key} className="hover-li-sidebar">
                {prop?.subMenus?.length === 0 || !prop?.subMenus ? (
                  <NavItem key={key}>
                    <NavLink
                      activeClassName="active-route"
                      tag={RRNavLink}
                      to={prop.layout + prop.path}
                      key={key}
                    >
                      <i className="nc-icon nc-tv-2" /> {prop.name}
                    </NavLink>
                  </NavItem>
                ) : (
                  <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle caret nav>
                      <i className="nc-icon nc-tv-2" /> {prop.name}
                    </DropdownToggle>
                    <DropdownMenu t>
                      {prop.subMenus.map((propes, keyes) => {
                        return (
                          <li key={keyes} className="hover-li-sidebar">
                            {propes?.childSubMenu?.length <= 0 ||
                            !propes?.childSubMenu ? (
                              <NavItem key={keyes} className="hover-li-sidebar">
                                <NavLink
                                  tag={RRNavLink}
                                  activeClassName="active-route"
                                  to={propes.layout + propes.path}
                                  key={keyes}
                                >
                                  <i /> {propes.name}
                                </NavLink>
                              </NavItem>
                            ) : (
                              <UncontrolledDropdown inNavbar nav>
                                <DropdownToggle
                                  className="inner-dropdown hover-li-sidebar"
                                  style={{
                                    background: "#736e67",
                                    paddingLeft: "30px",
                                  }}
                                  caret
                                  nav
                                  onClick={() =>
                                    childClick(
                                      propes.childSubMenu,
                                      propes.menuItemId
                                    )
                                  }
                                >
                                  {propes.name}
                                </DropdownToggle>

                                {itemList.map((item, key) => {
                                  if (
                                    isOpen === true &&
                                    propes.menuItemId === item.subMenuItemId
                                  ) {
                                    return (
                                      <NavItem
                                        style={{ background: "#736e67" }}
                                        key={key}
                                      >
                                        <NavLink
                                          tag={RRNavLink}
                                          activeClassName="active-route"
                                          className="inner-child-dropdown hover-li-sidebar text-transfrom-capitalize ml-2"
                                          style={{
                                            paddingLeft: "30px",
                                            paddingTop: "5px",
                                            paddingBottom: "5px",
                                            lineHeight: "18px",
                                          }}
                                          to={item.layout + item.path}
                                        >
                                          - {item.name}
                                        </NavLink>
                                      </NavItem>
                                    )
                                  } else {
                                    return null
                                  }
                                })}
                              </UncontrolledDropdown>
                            )}
                          </li>
                        )
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </li>
            ) : null
          })}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar
