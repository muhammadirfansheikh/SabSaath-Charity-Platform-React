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
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import Swal from "sweetalert2"
import { Link, useParams } from "react-router-dom"
import { fetchData } from "utils/Api.js"
import * as api from "../../utils/Api.js"
import { useLocation } from "react-router-dom"
import { Column } from "@ant-design/plots"
import HomeHeader_DonorDashboard from "components/Header/HomeHeader_DonorDashboard.js"
import { FastForex_FetchOnlyOne } from "utils/CommonMethods.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js"

const DonorDashboardPage = (props) => {
  // const {id} = useParams()

  const history = useHistory()
  const RoleId = localStorage.getItem("RoleId")
  var UserId = localStorage.getItem("UserId")
  var UserIP = localStorage.getItem("UserIP")

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

  const fetchApplicantId = async (name) => {
    // console.log("'" + name + "'")
    fetchData("DashBoard", "DashBoard_Card_List", {
      ...searchvalues,
      TabName: name.toString(),
      UserId: parseInt(UserId),
    }).then((result) => {
      setRows(result?.DataSet?.Table)
    })
  }

  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)

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
      if (localStorage.getItem("RoleId") == 37) {
        setTotalApplications_Tabs(result?.DataSet?.Table)
        const cases = result?.DataSet?.Table1.map((obj) =>
          JSON.stringify(obj.CaseCounts)
        )
        const donordate = result?.DataSet?.Table1.map((obj) => obj.donationDate)
        setdonorvalue(cases)
        setdonorDate(donordate)
        //Register donor---------------------------------------------
        setData(result?.DataSet?.Table2)
      } else {
        window.localStorage.clear() //clear all localstorage
        window.open("/Login")
      }
    })
  }
  const toggleModal = (obj) => {
    //console.log(obj.ROW_NUM);
    //alert(obj.ROW_NUM);
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

  return (
    <div className="maincontent">
      {/* <HomeHeader_DonorDashboard /> */}
      <div className="content">
        <section className="section p-0 mt-5 mb-4"></section>
        <section className="section pt-0">
          <div className="container"></div>
          <div className="content">
            <Container>
              <Row>
                <Col lg={12} md={12}>
                  <Card className="card-user">
                    <CardBody>
                      {/* <Row> */}
                      <Row>
                        {TotalApplications_Tabs.map((data, key) => (
                          <>
                            <Col lg="4" md="4">
                              <Card className="card-s4 card-count">
                                <CardBody>
                                  <p className="card-number mb-0 pb-0">
                                    {data.CaseCount}
                                  </p>
                                  <>
                                    <a
                                      href
                                      target="_blank"
                                      style={{ color: "white" }}
                                    >
                                      {data.CaseStatus}
                                    </a>
                                  </>
                                </CardBody>
                              </Card>
                            </Col>
                          </>
                        ))}
                      </Row>

                      <Row className="justify-content-center pt-2">
                        <Col lg="12" md="12" sm="12" xs="12">
                          <Card>
                            <CardBody>
                              <Column {...config} />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Modal
              isOpen={DashboardListModal}
              toggle={() => setDashboardListModal(false)}
              size="xl"
              backdrop="static"
            >
              <ModalHeader toggle={() => setDashboardListModal(false)}>
                {ListShowVal?.name} List
              </ModalHeader>

              <ModalBody>
                <FormGroupTable
                  rows={rows}
                  columns={ListShowVal?.column}
                  hideAction={true}
                />
              </ModalBody>
            </Modal>
          </div>
        </section>
      </div>
      {/* <HomeFooter /> */}
    </div>
  )
}

export default DonorDashboardPage
