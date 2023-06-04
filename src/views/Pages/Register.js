import React, { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  CardHeader,
  Table,
  Button,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
//import {fetchData} from '../../utils/Api.js'
//import {ApiMethods} from '../../utils/Constants.js'
import { Link, useParams } from "react-router-dom"

import { fetchIp } from "../../utils/Api.js"

import Approvels from "components/Tabs/Approvels.js"
import ModalDonor from "components/modal/ModalDonor.js"
import Donor from "views/Donor.js"
import SignUpPanel from "components/Tabs/SignUpPanel.js"
import NGOSignUpPanel from "components/Tabs/NGOSignUpPanel.js"

const Register = (props) => {
  const [tabNo, settabNo] = useState("1")
  const [selecteNTNImage, setselecteNTNImage] = useState()

  const Image_changeHandler_NTN = (event) => {
    setselecteNTNImage(event.target.files[0])
  }

  const [selecteFBRtaxexemption, setFBRtaxexemption] = useState()

  const Image_changeHandler_FBRtaxexemption = (event) => {
    setFBRtaxexemption(event.target.files[0])
  }

  const [selectFoundingDocuments, setFoundingDocuments] = useState()

  const Image_changeHandler_FoundingDocuments = (event) => {
    setFoundingDocuments(event.target.files[0])
  }

  const [selectAuditedaccounts, setAuditedaccounts] = useState()
  const Image_changeHandler_Auditedaccounts = (event) => {
    setAuditedaccounts(event.target.files[0])
  }

  const [selectEAD, setEAD] = useState()
  const Image_changeHandler_EAD = (event) => {
    setEAD(event.target.files[0])
  }

  const [
    selectAnyotherMoUswiththegovernment,
    setAnyotherMoUswiththegovernment,
  ] = useState()
  const Image_changeHandler_AnyotherMoUswiththegovernment = (event) => {
    setAnyotherMoUswiththegovernment(event.target.files[0])
  }

  const [
    optTELLUSABOUTYOURORGANIZATION_1,
    setoptTELLUSABOUTYOURORGANIZATION_1,
  ] = useState()
  const [
    optTELLUSABOUTYOURORGANIZATION_2,
    setoptTELLUSABOUTYOURORGANIZATION_2,
  ] = useState()
  const [
    optTELLUSABOUTYOURORGANIZATION_3,
    setoptTELLUSABOUTYOURORGANIZATION_3,
  ] = useState()
  const [
    optTELLUSABOUTYOURORGANIZATION_4,
    setoptTELLUSABOUTYOURORGANIZATION_4,
  ] = useState()

  const [optRESPONDTODECLARATIONS_1, setoptRESPONDTODECLARATIONS_1] = useState()
  const [optRESPONDTODECLARATIONS_2, setoptRESPONDTODECLARATIONS_2] = useState()
  const [optRESPONDTODECLARATIONS_3, setoptRESPONDTODECLARATIONS_3] = useState()
  const [optRESPONDTODECLARATIONS_4, setoptRESPONDTODECLARATIONS_4] = useState()
  const [optRESPONDTODECLARATIONS_5, setoptRESPONDTODECLARATIONS_5] = useState()
  const [optRESPONDTODECLARATIONS_6, setoptRESPONDTODECLARATIONS_6] = useState()

  const [CHKBByclickingSubmit_1, setCHKBByclickingSubmit_1] = useState()
  const [CHKBByclickingSubmit_2, setCHKBByclickingSubmit_2] = useState()
  const [CHKBByclickingSubmit_3, setCHKBByclickingSubmit_3] = useState()

  // const [NameVal,  setNameVal]  = useState();
  // const [EmailVal,  setEmailVal]  = useState();
  // const [PhoneVal,  setPhoneVal]  = useState();
  // const [NameoftheAltCont,  setGetTitle]  = useState();
  // const [GetTitle,  setGetTitle]  = useState();

  const handleChange_TELLUSABOUTYOURORGANIZATION_1 = (e) => {
    setoptTELLUSABOUTYOURORGANIZATION_1(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_TELLUSABOUTYOURORGANIZATION_2 = (e) => {
    setoptTELLUSABOUTYOURORGANIZATION_2(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_TELLUSABOUTYOURORGANIZATION_3 = (e) => {
    setoptTELLUSABOUTYOURORGANIZATION_3(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_TELLUSABOUTYOURORGANIZATION_4 = (e) => {
    setoptTELLUSABOUTYOURORGANIZATION_4(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_1 = (e) => {
    setoptRESPONDTODECLARATIONS_1(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_2 = (e) => {
    setoptRESPONDTODECLARATIONS_2(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_3 = (e) => {
    setoptRESPONDTODECLARATIONS_3(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_4 = (e) => {
    setoptRESPONDTODECLARATIONS_4(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_5 = (e) => {
    setoptRESPONDTODECLARATIONS_5(e.target.value)
    // do whatever you want with isChecked value
  }

  const handleChange_setoptRESPONDTODECLARATIONS_6 = (e) => {
    setoptRESPONDTODECLARATIONS_6(e.target.value)
    // do whatever you want with isChecked value
  }

  const [CheckByClickingSubmit_1, setCheckByClickingSubmit_1] = useState()
  const [CheckForclarity_2, setCheckForclarity_2] = useState()
  const [CheckYourorganization_3, setCheckCYourorganization_3] = useState()

  const handleChange_CheckByClickingSubmit_1 = (e) => {
    setCheckByClickingSubmit_1(e.target.checked)
    // do whatever you want with isChecked value
  }

  const handleChange_CheckCheckForclarity_2 = (e) => {
    setCheckForclarity_2(e.target.checked)
    // do whatever you want with isChecked value
  }

  const handleChange_CheckCYourorganization_3 = (e) => {
    setCheckCYourorganization_3(e.target.checked)
    // do whatever you want with isChecked value
  }

  function OnTextChange(e) {
    setPrimaryInfo({
      ...PrimaryInfo,
      [e.target.name]: e.target.value,
    })
  }

  const [PrimaryInfo, setPrimaryInfo] = useState({
    Name: "",
    Email: "",
    Phone: "",
    NOTACont: "",
    EmailFALTCont: "",
  })
  React.useEffect(() => {
    const load = async () => {
      var result = await fetchIp()
      if (result != undefined && result != null) {
        localStorage.setItem(
          "UserIP",
          result.IPv4 +
            ",CountryCode:" +
            result.country_code +
            ",country_name:" +
            result.country_name +
            ",latitude:" +
            result.latitude +
            ",longitude:" +
            result.longitude
        )
      } else {
        localStorage.setItem("UserIP", "No Ip")
      }
    }
    load()
  }, [])

  async function OnFormSubmit(e) {
    e.preventDefault()

    //var data=await Insert_Register(selecteNTNImage , selecteFBRtaxexemption , selectFoundingDocuments , selectAuditedaccounts , selectEAD , selectAnyotherMoUswiththegovernment ,    optTELLUSABOUTYOURORGANIZATION_1 , optTELLUSABOUTYOURORGANIZATION_2 , optTELLUSABOUTYOURORGANIZATION_3 , optTELLUSABOUTYOURORGANIZATION_4 , optRESPONDTODECLARATIONS_1 ,optRESPONDTODECLARATIONS_2 ,optRESPONDTODECLARATIONS_3 , optRESPONDTODECLARATIONS_4 , optRESPONDTODECLARATIONS_5 , optRESPONDTODECLARATIONS_6 , PrimaryInfo.Name , PrimaryInfo.Email , PrimaryInfo.Phone , PrimaryInfo.NOTACont , PrimaryInfo.EmailFALTCont ,CheckByClickingSubmit_1 ,  CheckForclarity_2 , CheckYourorganization_3);
  }

  const [myState, setMyState] = useState("")
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            {localStorage.getItem("Name") === null ? (
              <h1 className="mb-0">Sign Up </h1>
            ) : (
              <h1 className="mb-0">Update Profile</h1>
            )}

            
          </div>
        </section>
        <section className="section p-0 mt-5 mb-4"></section>

        <section className="section pt-0">
          <div className="container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={tabNo === "1" ? "active" : ""}
                  onClick={() => settabNo("1")}
                >
                  Donor
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={tabNo === "2" ? "active" : ""}
                  onClick={() => settabNo("2")}
                >
                  NGO
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={tabNo}>
              <TabPane tabId="1">
                <SignUpPanel state={myState} />
              </TabPane>
              <TabPane tabId="2">
                <NGOSignUpPanel state={myState} />
              </TabPane>
            </TabContent>
          </div>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default Register
