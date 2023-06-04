import React, { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Card,
  Col,
  Row,
  CardHeader,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Link, useParams } from "react-router-dom"
import SignUpPanel from "components/Tabs/SignUpPanel.js"
import { FastForex_FetchOnlyOne } from "utils/CommonMethods.js"
import { fetchData } from "utils/Api.js"
import DonorDashboardPage from "./DonorDashboardPage.js"
import ChangePassword from "./ChangePassword.js"
import Report_DonationHistory from "views/Reports/Report_DonationHistory.js"
import ManageEmailNotification from "./ManageEmailNotification.js"
// import Report_Subscription_List from 'views/Reports/Report_Subscription_List.js';
import Report_Subscription_List from "views/Reports/Report_Subscription_Info"
import { SaveFile } from "functions/SaveFile.js"
import { saveAs } from "save-as"

const DonorDashboard = (props) => {

  const [tabNo, settabNo] = useState("1")
  const [subtabNo, setsubtabNo] = useState("3")
  const [selecteNTNImage, setselecteNTNImage] = useState()
  const [myState, setMyState] = useState("")

  const RoleId = localStorage.getItem("RoleId")
  var UserId = localStorage.getItem("UserId")
  var UserIP = localStorage.getItem("UserIP")

  if(!UserId || !RoleId){
    props.history.push("/login")
  }

  const initialValues = {
    ApplicantCode: "",
    ApplicantCaseCode: "",
    ApplicantName: "",
    Cnic: "",
    ReferralName: "",
    GenderID: 0,
    CountryId: 0,
    ProvinceId: 0,
    CityId: 0,
    FundCategoryId: 0,
    CaseNatureId: 0,
    Referral_TypeId: 0,
    Investigatorid: 0,
    TabName: "",
    UserId: localStorage.getItem("UserId"),
    UserIP: localStorage.getItem("UserIP"),
    IsCaseStory: 2,
    ViewFilterId: 2,
    currencyType: 0,

    CurrencyFromSymbol: "",
    CurrencyToSymbol: "PKR",
    ConversionRate: 1,
    NoOfMonths: 1,
    AmountInPKR: 0,
    TotalAmount: 0,
  }

  const donor_columns = [
    {
      field: "DonationDate",
      name: "Donation Date",
    },

    // {
    //   field: "Name",
    //   name: "donor Name",
    // },
    {
      field: "DonationType",
      name: "Donation Type",
    },
    {
      field: "ContactNumber",
      name: "Contact Number",
    },

    {
      field: "Currency",
      name: "Currency",
    },

    {
      field: "ExchangeRate",
      name: "Exchange Rate",
    },

    {
      field: "Amount",
      name: "Amount",
    },

    {
      field: "TotalAmount",
      name: "Total Amount",
    },
  ]

  const [searchvalues, setSearchValues] = useState(initialValues)
  const [applicantList, setapplicantList] = useState([])
  const [rows, setRows] = useState([])
  const [DashboardListModal, setDashboardListModal] = useState(false)
  const [ListShowVal, setListShowVal] = useState({})
  const [TotalApplications_Tabs, setTotalApplications_Tabs] = useState([])
  const [dataSet, setDataSet] = useState([])
  const [donorvalue, setdonorvalue] = useState()
  const [donorDate, setdonorDate] = useState()
  const [TabName, setTabName] = useState()
  const [data, setData] = useState([])
  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)

  const fetchApplicantId = async (name) => {
    fetchData("DashBoard", "DashBoard_Card_List", {
      ...searchvalues,
      TabName: name.toString(),
      UserId: parseInt(UserId),
    }).then((result) => {
      setRows(result?.DataSet?.Table)
    })
  }

  useEffect(() => {
    Fetch_Applicant_Case_TotalCounts()
    const load = async () => {
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )
      if (_CurrencyData.Response && _CurrencyData.Data != "") {
        let _parseData = JSON.parse(_CurrencyData.Data)
        searchvalues.ConversionRate = _parseData.result.PKR
        searchvalues.CurrencyFromSymbol = _parseData.base
        setBasicInfoValues({ ...searchvalues })
      } else {
        searchvalues.ConversionRate = 1
        searchvalues.CurrencyFromSymbol = "PKR"
        setBasicInfoValues({ ...searchvalues })
      }
    }
    load()
  }, [])
  var donorval = 0
  const Fetch_Applicant_Case_TotalCounts = async (name) => {
    fetchData("DashBoard", "DashBoard_Card_TotalCounts", {
      ...searchvalues,
      UserId: localStorage.getItem("UserId"),
    }).then((result) => {
      setTotalApplications_Tabs(result?.DataSet?.Table)

      const cases = result?.DataSet?.Table1.map((obj) =>
        JSON.stringify(obj.CaseCounts)
      )
      const donordate = result?.DataSet?.Table1.map((obj) => obj.donationDate)
      setdonorvalue(cases)
      setdonorDate(donordate)
      //Register donor---------------------------------------------
      setData(result?.DataSet?.Table2)
    })
  }
  const toggleModal = (obj) => {
    fetchApplicantId(obj.ROW_NUM)
    setTabName(obj.name)
    setListShowVal(obj)
    setDashboardListModal(!DashboardListModal)
  }

  const config = {
    data,
    xField: "donationDate",
    yField: "TotalAmount",
    seriesField: "donationType",
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  }
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen)
  }

  const pageoopn = () => {
    ;<SignUpPanel />
  }

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">{localStorage.getItem("Name")}'s Dashboard</h1>
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
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink onClick={() => settabNo("2")}> */}
                <Dropdown
                  className={tabNo === "2" ? "active" : ""}
                  isOpen={dropdownOpen}
                  toggle={(e) => dropdownToggle(e)}
                >
                  <DropdownToggle caret nav>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu className="logout-dropdown" right>
                    <DropdownItem tag="a" onClick={() => settabNo("31")}>
                      Edit Profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem divider />
                    <DropdownItem tag="a" onClick={() => settabNo("32")}>
                      Update Password
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem divider />
                    <DropdownItem tag="a" onClick={() => settabNo("33")}>
                      Manage Email Notifications
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <NavLink
                  className={tabNo === "3" ? "active" : ""}
                  onClick={() => settabNo("3")}
                >
                  Donation History
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={tabNo === "4" ? "active" : ""}
                  onClick={() => settabNo("4")}
                >
                  Subscription Info
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={tabNo}>
              <TabPane tabId="1">
                <DonorDashboardPage state={myState} />
              </TabPane>
              <TabPane tabId="3">
                <Report_DonationHistory state={myState} />
              </TabPane>
              <TabPane tabId="31">
                <SignUpPanel state={myState} />
              </TabPane>
              <TabPane tabId="32">
                <ChangePassword state={myState} />
              </TabPane>
              <TabPane tabId="33">
                <ManageEmailNotification state={myState} />
              </TabPane>

              <TabPane tabId="4">
                <Report_Subscription_List state={myState} />
              </TabPane>
            </TabContent>
          </div>
        </section>
      </div>
      <HomeFooter />
    </div>
  )
}

export default DonorDashboard
