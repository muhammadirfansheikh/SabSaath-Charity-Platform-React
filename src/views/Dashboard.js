import React, { useState, useEffect } from "react"
import "chart.js/auto"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { Doughnut, Bar } from "react-chartjs-2"
import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import { fetchData } from "utils/Api"
import { Roles } from "../utils/Constants.js" //"../../utils/Constants.js";
import { object } from "prop-types"
import { Column } from "@ant-design/plots"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js"

const Dashboard = (props) => {
  const RoleId = localStorage.getItem("RoleId")
  var UserId = localStorage.getItem("UserId")
  var UserIP = localStorage.getItem("UserIP")

  const history = useHistory()

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
  }

  const columns = [
    {
      field: "ApplicantCaseCode",
      name: "ApplicantCaseCode",
    },
    {
      field: "CnicNo",
      name: "CnicNo",
    },
    {
      field: "Name",
      name: "Name",
    },
    {
      field: "FatherName",
      name: "Father Name",
    },

    {
      field: "PrimaryFunCat",
      name: "Primary Fund category",
    },

    {
      field: "primaryContactNo",
      name: "Primary ContactNo",
    },
  ]

  const donor_columns = [
    {
      field: "orderid",
      name: "orderid",
    },
    {
      field: "CreatedDate",
      name: "CreatedDate",
    },

    {
      field: "Name",
      name: "donor Name",
    },
    {
      field: "EmailAddress",
      name: "EmailAddress",
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
      name: "ExchangeRate",
    },

    {
      field: "Amount",
      name: "Amount",
    },

    {
      field: "TotalAmount",
      name: "TotalAmount",
    },
  ]

  const [searchvalues, setSearchValues] = useState(initialValues)
  const [applicantList, setapplicantList] = useState([])
  const [rows, setRows] = useState([])
  const [DashboardListModal, setDashboardListModal] = useState(false)
  const [ListShowVal, setListShowVal] = useState({})
  const [TotalApplications_Tabs, setTotalApplications_Tabs] = useState([])
  const [dataSet, setDataSet] = useState([])

  //const [Total_Marketing_Tabs, setTotal_Marketing_Tabs] = useState([]);

  //const [Total_Marketing_BarCharVal, setTotal_Marketing_BarCharVal] = useState([]);

  const [donorvalue, setdonorvalue] = useState()
  const [donorDate, setdonorDate] = useState()

  const [TabName, setTabName] = useState()

  const [RegisterDonor, setRegisterDonor] = useState([])

  const [RegisterDonor_sum, setRegisterDonor_sum] = useState([])

  const [RegisterDonorDate, setRegisterDonorDate] = useState([])

  const [RegbarColor, setRegbarColor] = useState()

  const [data, setData] = useState([])

  //const [showPriPanel, setshowPriPanel] = useState(true);

  const fetchApplicantId = async (name) => {
    fetchData("DashBoard", "DashBoard_Card_List", {
      ...searchvalues,
      UserId: parseInt(UserId),
      TabName: name.toString(),
    }).then((result) => {
      setRows(result?.DataSet?.Table)
    })
  }

  useEffect(() => {
    if (localStorage.getItem("RoleId") == 37) {
      window.localStorage.clear() //clear all localstorage
      window.sessionStorage.clear()
      window.open("/Login")
    } else {
      Fetch_Applicant_Case_TotalCounts()
    }
  }, [])
  var donorval = 0
  const Fetch_Applicant_Case_TotalCounts = async (name) => {
    fetchData("DashBoard", "DashBoard_Card_TotalCounts", {
      ...searchvalues,
      UserId: localStorage.getItem("UserId"),
    }).then((result) => {
      setTotalApplications_Tabs(result?.DataSet?.Table)
      //setTotal_Marketing_Tabs(result?.DataSet?.Table1);
      //
      //setTotal_Marketing_BarCharVal(result?.DataSet?.Table1);
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

  const Marketing_Donor_barChartData = {
    labels: donorDate, //["02/07/2022", "03/07/2022", "04/07/2022", "05/07/2022", "06/07/2022" , "07/07/2022" , "08/07/2022" , "30/06/2022"],
    datasets: [
      {
        label: "Last 30 Days",
        backgroundColor: "rgb(214,11,17)",
        data: donorvalue,
      },
    ],
  }

  return (
    <div className="content dashboard">
      <Container fluid className="pt-2 mt-4">
        <Row>
          <Col lg="12" md="12" sm="12">
            <Row>
              <Col lg="12" md="12" sm="12">
                <Row>
                  {/* {TotalApplications_Tabs.map((data, key) => (
                    <>
                      <Col lg="2" md="2">
                        <Card className="card-s4 card-count">
                          <CardBody>
                            <p className="card-number mb-0 pb-0">
                              {data.CaseCount}
                            </p>
                            {data.ROW_NUM === 13 ? (
                              <>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: donor_columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </>
                            ) : (
                              <>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </>
                            )}
                          </CardBody>
                        </Card>
                      </Col>
                    </>
                  ))} */}

                  {parseInt(RoleId) === parseInt(Roles.Donor) ? (
                    <>
                      <Container fluid className="pt-2">
                        <Row></Row>
                        <Row className="justify-content-center">
                          <Col lg="10" md="10" sm="12" xs="12">
                            <Card>
                              <CardBody>
                                <Column {...config} />
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) === parseInt(Roles.InvestigatingOfficer) ? (
                    <>
                      {TotalApplications_Tabs.filter(
                        (data) =>
                          data.ROW_NUM === 10 ||
                          data.ROW_NUM === 1 ||
                          data.ROW_NUM === 2 ||
                          data.ROW_NUM === 3 ||
                          data.ROW_NUM === 4 ||
                          data.ROW_NUM === 5 ||
                          data.ROW_NUM === 6 ||
                          data.ROW_NUM === 7 ||
                          data.ROW_NUM === 8 ||
                          data.ROW_NUM === 9
                      ).map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.name,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) === parseInt(Roles.Trustee) ? (
                    <>
                      {TotalApplications_Tabs.map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) === parseInt(Roles.HOD) ? (
                    <>
                      {TotalApplications_Tabs.filter(
                        (data) =>
                          data.ROW_NUM === 11 ||
                          data.ROW_NUM === 1 ||
                          data.ROW_NUM === 2 ||
                          data.ROW_NUM === 3 ||
                          data.ROW_NUM === 4 ||
                          data.ROW_NUM === 5 ||
                          data.ROW_NUM === 6 ||
                          data.ROW_NUM === 7 ||
                          data.ROW_NUM === 8 ||
                          data.ROW_NUM === 9 ||
                          data.ROW_NUM === 18
                      ).map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) ===
                  parseInt(Roles.EducationalCounsellor) ? (
                    <>
                      {TotalApplications_Tabs.filter(
                        (data) => data.ROW_NUM === 18
                      ).map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) === parseInt(Roles.Marketing) ? (
                    <>
                      {TotalApplications_Tabs.filter(
                        (data) =>
                          data.ROW_NUM === 13 ||
                          data.ROW_NUM === 1 ||
                          data.ROW_NUM === 2 ||
                          data.ROW_NUM === 3 ||
                          data.ROW_NUM === 4 ||
                          data.ROW_NUM === 5 ||
                          data.ROW_NUM === 6 ||
                          data.ROW_NUM === 7 ||
                          data.ROW_NUM === 9
                      ).map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                {data.ROW_NUM === 13 ? (
                                  <>
                                    <a
                                      href
                                      onClick={() =>
                                        toggleModal({
                                          ROW_NUM: data.ROW_NUM,
                                          name: data.CaseStatus,
                                          column: donor_columns,
                                        })
                                      }
                                      target="_blank"
                                      style={{ color: "white" }}
                                    >
                                      {data.CaseStatus}
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      href
                                      onClick={() =>
                                        toggleModal({
                                          ROW_NUM: data.ROW_NUM,
                                          name: data.CaseStatus,
                                          column: columns,
                                        })
                                      }
                                      target="_blank"
                                      style={{ color: "white" }}
                                    >
                                      {data.CaseStatus}
                                    </a>
                                  </>
                                )}
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {parseInt(RoleId) === parseInt(Roles.Accounts) ||
                  parseInt(RoleId) === parseInt(Roles.Audit) ? (
                    <>
                      {TotalApplications_Tabs.filter(
                        (data) =>
                          data.ROW_NUM === 1 ||
                          data.ROW_NUM === 2 ||
                          data.ROW_NUM === 3 ||
                          data.ROW_NUM === 4 ||
                          data.ROW_NUM === 5 ||
                          data.ROW_NUM === 6 ||
                          data.ROW_NUM === 7 ||
                          data.ROW_NUM === 9
                      ).map((data, key) => (
                        <>
                          <Col lg="2" md="2">
                            <Card className="card-s4 card-count">
                              <CardBody>
                                <p className="card-number mb-0 pb-0">
                                  {data.CaseCount}
                                </p>
                                <a
                                  href
                                  onClick={() =>
                                    toggleModal({
                                      ROW_NUM: data.ROW_NUM,
                                      name: data.CaseStatus,
                                      column: columns,
                                    })
                                  }
                                  target="_blank"
                                  style={{ color: "white" }}
                                >
                                  {data.CaseStatus}
                                </a>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row></Row>
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

        {/* <ModalBody>
         <FormGroupTable rows={rows} columns={UnAssign_columns}/>
        </ModalBody> */}
      </Modal>
    </div>
  )
}

export default Dashboard
