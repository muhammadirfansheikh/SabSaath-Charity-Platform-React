import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap"

import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { baseImageUrl, fetchData } from "utils/Api"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  SetupMasterIds,
} from "utils/Constants"
import { GetSetupMaster, AllowAlphabatic } from "utils/CommonMethods"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"

import Swal from "sweetalert2"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import { CSVLink } from "react-csv"
import ReactToPrint, { useReactToPrint } from "react-to-print"
import * as api from "../../utils/Api.js"
import { Link } from "react-router-dom"
import moment from "moment"

const Report_Subscription_List = (props) => {
  const searchingValues = {
    OperationID: 1,
    UserId: localStorage.getItem("UserId"),
    CategoryWise: 0,
    SubscriptionDate: "",
    PostingFreq: "",
    DonationType: 0,
  }

  const [tableView, setTableView] = useState(false)
  const [tablemasterView, settablemasterView] = useState(true)
  const [tablemasterinfo, settablemasterinfo] = useState(false)
  const [searchValues, setSearchVlues] = useState(searchingValues)
  const [reportList, setreportList] = useState([])
  const [reportListinfo, setreportListinfo] = useState([])
  const [reportListdetail, setreportListdetail] = useState([])
  const [donationTypeddl, setdonationTypeddl] = useState([])
  const [paymentTypeddl, setpaymentTypeddl] = useState([])
  const [finalData, setFinalData] = useState({})
  const [finalinfoData, setFinalinfoData] = useState({})
  const [finalDatadetail, setFinalDatadetail] = useState({})
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let _values = e.target.value
    if (e.target.getAttribute("isalphabetic") === "true") {
      _values = AllowAlphabatic(e.target.value)
    } else if (e.target.getAttribute("isnumber") == "true")
      _values = e.target.value.replace(/\D/g, "")
    setSearchVlues({
      ...searchValues,
      [name]: _values,
    })
  }

  const [pending, setPending] = React.useState(true)
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(reportList)
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  React.useEffect(() => {
    const load = async () => {
      resetFormelement()
    }
    load()
  }, [])

  const columns1 = [
    { field: "DonatedOn", name: "DonatedOn" },
    { field: "InvoiceNo", name: "InvoiceNo" },

    { field: "Amount", name: "Amount" },
    { field: "subscribedOn", name: "subscribedOn" },

    { field: "DonationType", name: "DonationType" },
    { field: "Casewise", name: "Casewise" },

    { field: "Rate", name: "Rate" },
    { field: "PKRAmount", name: "PKRAmount" },
  ]
  const columns = [
    {
      name: "Cause",
      selector: "Cause",
      sortable: true,
    },
    {
      name: "SubscriptionDateTime",
      selector: "SubscriptionDateTime",
      sortable: true,
    },
    {
      name: "DonationType",
      selector: "DonationType",
      sortable: true,
    },
    {
      name: "TotalAmount",
      selector: "TotalAmount",
      sortable: true,
    },
    {
      name: "PostingFrequency",
      selector: "PostingFrequency",
      sortable: true,
    },
  ]

  const columnsdetails = [
    {
      name: "CreatedDate",
      selector: "CreatedDate",
      sortable: true,
    },
    {
      name: "PostingDate",
      selector: "PostingDate",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "Amount",
      sortable: true,
    },
    {
      name: "ActualPostingDate",
      selector: "ActualPostingDate",
      sortable: true,
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },
    {
      name: "PKRRate",
      selector: "PKRRate",
      sortable: true,
    },
    {
      name: "InvoiceNo",
      selector: "InvoiceNo",
      sortable: true,
    },
    {
      name: "Receipt",
      selector: "Receipt",
      sortable: true,
    },
    {
      name: "SubscriptionDetailId",
      selector: "SubscriptionDetailId",
      sortable: true,
    },
  ]

  const resetFormelement = async () => {
    setSearchVlues(searchingValues)
    let ddlDonationType = await GetDonationType()
    // setdonationTypeddl(ddlDonationType.data);
    ReBindGrid()
    // ReBindGriddetail();
  }
  const GetDonationType = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0)
    return data
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()
    if (searchValues.FromDate != "") {
      if (searchValues.ToDate != "") {
        ReBindGrid()
        //ReBindGriddetail();
      } else {
        Swal.fire({ title: "Warning", text: "Select To Date", icon: "warning" })
      }
    } else {
      Swal.fire({ title: "Warning", text: "Select From Date", icon: "warning" })
    }
  }
  const handleCancelClick = async (e) => {
    e.preventDefault()
    resetFormelement()
  }
  const GetSubscription_List = async () => {
    // alert(localStorage.getItem("UserId"));
    try {
      var RequestData = {
        OperationID: 2,
        UserId: localStorage.getItem("UserId"),
        CategoryWise: 0,
        SubscriptionDate: null,
        PostingFreq: "",
        DonationType: 0,
      }
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Subscription_List,
        RequestData
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          return data.DataSet.Table
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
  const ReBindGrid = async () => {
    var data = await GetSubscription_List()
    setreportList(data)
    setFinalData({ columns, data })
  }

  // detail
  const GetSubscription_List_detail = async (obj) => {
    try {
      var RequestData = {
        OperationID: 1,
        SubscriptionId: obj,
      }
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Subscription_List_Detail,
        RequestData
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          var detaildata = data.DataSet.Table
          setreportListdetail(detaildata)
          setFinalDatadetail({ columnsdetails, detaildata })
          return data.DataSet.Table
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
  //end
  async function funCancel(e) {
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure you want to cancel this donation?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .fetchData(ControllerName.Reporting, "Report_SubscriptionCancel", {
            OperationID: 3,
            SubscriptionDetailId: e,
            UserId: localStorage.getItem("UserId"),
          })
          .then((result) => {
            if (result?.DataSet?.Table[0].haserror > 0) {
              Swal.fire({
                title: "error",
                text: result?.DataSet?.Table[0].Error_Message,
                icon: "error",
              })
              return
            } else {
              Swal.fire({
                // title: "Your donation is canceled",
                title: result.ResponseMessage,
                text: result?.DataSet?.Table[0].Message,
                icon: "success",
              })

              GetSubscription_List_detail(e)
              setTableView(true)
              settablemasterView(false)
              settablemasterinfo(true)
            }
          })
      } else {
        Swal.fire({
          title: "",
          text: "Thankyou for continuing with your donation",
          icon: "success",
        })
      }
    })
  }

  const handleClick = (obj) => {
    // e.preventDefault();
    //localStorage.setItem('subsId', obj)
    //window.open("/Report_Subscription_Info_list", "_Blank");
    GetSubscription_List_detail(obj.SubscriptionId)
    setTableView(true)
    settablemasterView(false)
    var data = reportList.find((x) => x.SubscriptionId === obj.SubscriptionId)
    setreportListinfo([data])
    settablemasterinfo(true)
  }

  const backClick = (e) => {
    ReBindGrid()
    setTableView(false)
    settablemasterView(true)
    settablemasterinfo(false)
  }

  return (
    <>
      <div className="content">
        {tablemasterinfo === true ? (
          <Row>
            <Col lg={12} md={12}>
              <Card className="">
                <CardBody>
                  <Form>
                    {reportListinfo &&
                      reportListinfo?.map((item1, key1) => (
                        <Row key={key1}>
                          <Col lg={12} md={12}>
                            <b>
                              Case Title:
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </b>{" "}
                            {item1.Cause}
                          </Col>
                          <Col lg={12} md={12}>
                            <b>Subscription Date: </b> &nbsp;&nbsp;
                            {item1.SubscriptionDateTime}
                          </Col>
                          <Col lg={12} md={12}>
                            <b>Frequency: </b>{" "}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {item1.PostingFrequency}
                          </Col>
                          <Col lg={12} md={12}>
                            <b>Donation Type: </b>{" "}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {item1.DonationType}
                          </Col>
                        </Row>
                      ))}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}
        {tablemasterView === true ? (
          <Row id="subscriptionmaster">
            <Col lg={12} md={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={6} md={6}>
                      Subscription Info
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table bordered striped>
                    <thead>
                      <tr>
                        <th>Sr #</th>
                        <th>Cause</th>
                        <th>Subscription Date</th>
                        <th>Donation Type</th>
                        <th>Total Amount</th>
                        <th>Total Occurrences</th>
                        <th>Posting Frequency</th>
                        <th>Status</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportList &&
                        reportList.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.Cause}</td>
                            <td>{item.SubscriptionDateTime}</td>
                            <td>{item.DonationType}</td>
                            <td>{item.TotalAmount}</td>
                            <td>{item.TotalMonth}</td>
                            <td>{item.PostingFrequency}</td>
                            <td>{item.SubscriptionStatus}</td>
                            <td>
                              {/* <Link to="/Report_Subscription_Info_list">
                                                            Details
                                                        </Link> */}
                              <a
                                onClick={(e) => handleClick(item)}
                                href="#subscriptiondetail"
                              >
                                Details
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}

        {/* detail */}
        {tableView === true ? (
          <Row id="subscriptiondetail">
            <Col lg={12} md={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={6} md={6} className="subscription-text-height">
                      Subscription Info Detail
                    </Col>
                    <Col lg={6} md={6} className="text-right">
                      <Button
                        style={{ textTransform: "capitalize" }}
                        onClick={(e) => backClick()}
                      >
                        Back
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table bordered striped>
                    <thead>
                      <tr>
                        <th>Sr #</th>
                        {/* <th>Subscription ID</th> */}
                        {/* <th>Created Date</th> */}
                        <th>Donation Date</th>
                        <th>Amount - Currency</th>
                        <th>Status - Reason</th>
                        <th>Posting Date</th>
                        <th>PKR Rate</th>
                        <th>Transaction ID</th>
                        <th>Receipt</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportListdetail &&
                        reportListdetail.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            {/* <td>{item.SubscriptionDetailId}</td> */}
                            {/* <td>{item.CreatedDate}</td> */}
                         
                            <td>
                              {item.DonationDate
                                ? moment(item.DonationDate).format("DD/MM/YYYY")
                                : null}
                            </td>
                            <td>{item.Amount}</td>
                            <td>{item.Status}</td>
                            <td>{item.PostingDate}</td>
                            <td>{item.PKRRate}</td>
                            <td>{item.InvoiceNo}</td>
                            <td>
                              {(item.Status === "Pending" ||
                                item.Status === "Canceled" ||
                                item.Status === "Cancelled") &&
                              item.Receipt === null
                                ? null
                                : item.Receipt && (
                                    <a
                                      href={baseImageUrl + item.Receipt}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {" "}
                                      <i className="fa fa-file" />
                                    </a>
                                  )}
                            </td>
                            <td>
                              {item.Status === "Pending" ? (
                                <a
                                  onClick={(e) =>
                                    funCancel(item.SubscriptionDetailId)
                                  }
                                  href="#"
                                >
                                  Cancel
                                </a>
                              ) : item.Status === "Canceled" ||
                                item.Status === "Cancelled" ? (
                                <span>
                                  Cancelled on : {item.ModifiedDateTime}
                                </span>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}

        {/* end */}
      </div>
    </>
  )
}

export default Report_Subscription_List
