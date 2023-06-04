import React, { useState } from "react"
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar"
import { Route, Switch, useLocation } from "react-router-dom"

import DemoNavbar from "components/Navbars/DemoNavbar.js"
import Footer from "components/Footer/Footer.js"
import Sidebar from "components/Sidebar/Sidebar.js"
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js"
//import {routesnew} from "../routesnew.js";
import { useHistory } from "react-router-dom"
import UnAuthorized from "components/GeneralComponent/UnAuthorized"
import ChangePassword from "views/Pages/ChangePassword"

var ps

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black")
  const [activeColor, setActiveColor] = React.useState("info")
  const list = JSON.parse(localStorage.getItem("routes"))
  const [subMenuList, setSubMenuList] = useState(
    JSON.parse(localStorage.getItem("routes"))
  )
  const [childSubMenu, setChildSubMenu] = useState(
    JSON.parse(localStorage.getItem("routes"))
  )
  const mainPanel = React.useRef()
  const location = useLocation()
  //var routesData=null;
  const history = useHistory()
  var UserId = localStorage.getItem("UserId")
  var RoleId = localStorage.getItem("RoleId")
  React.useEffect(() => {
    // console.log( localStorage.getItem('UserId'));

    if (!UserId || !RoleId) {
      history.push("/Login")
    }
  }, [])

  React.useEffect(() => {
    let arr1 = []
    list.forEach((x) => {
      if (x.subMenus.length > 0) {
        return x.subMenus.forEach((y) => arr1.push(y))
      }
    })
    setSubMenuList(arr1)
  }, [])

  React.useEffect(() => {
    let arr1 = []
    list.forEach((x) => {
      if (x.subMenus.length > 0) {
        return x.subMenus.forEach((y) => {
          if (y.childSubMenu?.length > 0) {
            return y.childSubMenu.forEach((z) => arr1.push(z))
          }
        })
      }
    })
    setChildSubMenu(arr1)
  }, [])

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current)
      document.body.classList.toggle("perfect-scrollbar-on")
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy()
        document.body.classList.toggle("perfect-scrollbar-on")
      }
    }
  })
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [location])
  // const handleActiveClick = (color) => {
  //   setActiveColor(color);
  // };
  // const handleBgClick = (color) => {
  //   setBackgroundColor(color);
  // };

  return (
    <div className="wrapper">
      <DemoNavbar {...props} />
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <Switch>
          {routes
            .filter((x) => list.some((y) => y.path === x.path))
            .map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              )
            })}

          {routes
            .filter((x) => subMenuList.some((y) => y.path === x.path))
            .map((prop, key) => {
              return (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component} //authRoute(prop.component, prop.path, prop.layout, key)}
                  key={key}
                />
              )
            })}
          {routes
            .filter((x) => childSubMenu.some((y) => y.path === x.path))
            .map((prop, key) => {
              return (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component} //authRoute(prop.component, prop.path, prop.layout, key)}
                  key={key}
                />
              )
            })}
          {UserId && RoleId && (
            <Route
              exact
              path={"/admin/ChangePassword"}
              component={ChangePassword}
            />
          )}
          <Route component={UnAuthorized} />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  )
}

export default Dashboard
