import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
//import styled from "styled-components";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  
  NavItem,
  
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

  function SubMenu(props) {

     props.Menus.SubMenus.map((prop,key)=>{
   //      console.log(props.Menus.SubMenus.length)
  return (
     
      
     <DropdownItem key={props.key} >
      sdf
     </DropdownItem> 
  );
       
     })
  
}
export default SubMenu;


