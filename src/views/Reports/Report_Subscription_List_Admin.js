import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap"
import DatePicker from "react-datepicker"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { baseImageUrl } from "utils/Api"
import { fetchData } from "utils/Api"
import {
  ApiMethods,
  ControllerName,
  DataTableCustomStyles,
  OperationTypeId,
  SetupMasterIds,
} from "utils/Constants"
import {
  GetSetupMaster,
  AllowAlphabatic,
  ConvertNumricToComaSeparate,
} from "utils/CommonMethods"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
} from "utils/CommonMethods"
import Swal from "sweetalert2"
import { useEffect } from "react"
import moment from "moment"
import { useIsMount } from "hooks/useIsMount"
import ReportModalSubscription from "components/ReportModalSubscription"
import EditColumns from "components/EditColumns"

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#d60b11",
      placeContent: "center",
      color: "white",
      borderRadius: "3px",
      fontWeight: "bolder",
      fontSize: "0.9rem",
    },
  },
}

const initialColumns = [
  // {
  //   name: "Category",
  //   selector: "CategoryId",
  //   width: "150px",
  //   sortable: true,
  // },
  // {
  //   name: "Sub Category",
  //   selector: "SubCategoryId",
  //   width: "150px",
  //   sortable: true,
  // },
  {
    name: "Cause",
    selector: "Cause",
    sortable: true,
    grow: 3,
  },
  {
    name: "Donor Name",
    selector: "DonorName",
    width: "150px",
    sortable: true,
  },
  {
    name: "Donor Email",
    selector: "DonorEmail",
    width: "200px",
    sortable: true,
  },
  {
    name: "Donor Phone",
    selector: "DonorPhone",
    width: "200px",
    sortable: true,
    omit: true,
  },

  {
    name: "Subscription Date",
    selector: "SubscriptionDateTime",
    cell: (row) => (
      <span>{moment(row.SubscriptionDateTime).format("DD/MM/YYYY")}</span>
    ),
    width: "150px",
    sortable: true,
  },
  {
    name: "Subscription ID",
    selector: "SubscriptionId",
    width: "150px",
    sortable: true,
  },
  {
    name: "Donation Type",
    width: "150px",
    selector: "DonationType",
    sortable: true,
  },
  {
    name: "Total PKR Amount",
    selector: "TotalPKRAmount",
    width: "150px",
    sortable: true,
    sortFunction: (a, b) => {
      const val1 = parseFloat(a.TotalPKRAmount.replace(/,/g, ""))
      const val2 = parseFloat(b.TotalPKRAmount.replace(/,/g, ""))
      return val1 - val2
    },
  },
  {
    name: "Paid",
    selector: "Paid",
    width: "150px",
    sortable: true,
    cell: (row) => <span>{ConvertNumricToComaSeparate(row.Paid)}</span>,
  },
  {
    name: "Pledged",
    selector: "pledge",
    width: "150px",
    sortable: true,
    cell: (row) => <span>{ConvertNumricToComaSeparate(row.pledge)}</span>,
  },
  {
    name: "Frequency",
    selector: "Frequency",
    width: "150px",
    sortable: true,
  },

  {
    name: "Total Occurrences",
    selector: "TotalOccurrences",
    width: "150px",
    sortable: true,
  },
  {
    name: "Subscription Status",
    selector: "SubscriptionStatus",
    width: "150px",
    sortable: true,
  },
  {
    name: "Failed",
    selector: "FailedCount",
    width: "150px",
    sortable: true,
  },
  {
    name: "Cancelled",
    selector: "CancelledCount",
    width: "150px",
    sortable: true,
  },
  {
    name: "Details",
    width: "150px",
    cell: (row) => <DetailsButton name={"Details"} row={row} />,
  },
]
const staticCols = initialColumns

const Report_Subscription_List_Admin = () => {
  const initialValues = {
    // 1 month ago
    SubscriptionFromDate: getDate(Date.now() - 2592000000, "-", "yyyy/mm/dd"),
    // SubscriptionFromDate: null,
    // SubscriptionFromDate: getDate(new Date(null).getTime , "-", "yyyy/mm/dd"),
    // SubscriptionFromDate: Date.now(),
    // Initial Date is 1970/01/01 
    // SubscriptionFromDate: getDatefrom(Date.now(), "-", "yyyy/mm/dd"),
    // SubscriptionFromDate: getDate(Date., "-", "yyyy/mm/dd"),
    SubscriptionToDate: getDate(Date.now(), "-", "yyyy/mm/dd"),
    // SubscriptionToDate: null,
    // SubscriptionToDate: Date.now(),
    // Source: null,
    DonorName: null,
    DonorContact: null,
    SubscriptionId: null,
    PaymentSource: null,
    Currency: null,
    Category: null,
    SubCategory: null,
    Cause: null,
    Note: null,
    FundCategoryId: -1,
    FundSubCategoryId: -1,
  }
  const isMount = useIsMount()
  const ref = React.useRef()

  const [showModal, setShowModal] = useState(false)
  const [clickedRow, setClickedRow] = useState({})
  // const [categoryddl, setcategoryddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [categoryddl, setcategoryddl] = useState([])
  const [fundCategroyddl, setfundCategroyddl] = useState([])
  const [editColumns, setEditColumns] = useState(false)
  const [columns, setColumns] = useState(initialColumns)

  const [searchValues, setSearchVlues] = useState(initialValues)

  const [finalData, setFinalData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let _values = e.target.value
    // console.log("Handle Input Change", name, value)

    if (e.target.getAttribute("isalphabetic") === "true") {
      _values = AllowAlphabatic(e.target.value)
    } else if (e.target.getAttribute("isnumber") == "true")
      _values = e.target.value.replace(/\D/g, "")

    const numbers = ["Category", "SubCategory", "PaymentSource", "Currency"]

    if (name === "SubscriptionId" && (_values || _values === "0")) {
      _values = Number(e.target.value)
    }
    if (numbers.includes(name)) {
      _values = Number(e.target.value)
    }

    setSearchVlues({
      ...searchValues,
      [name]: _values,
    })

    //const { name, value } = e.target;

    //seatSearchVlues({
    //  ...searchValues,
    //  [name]: value,
    //});
  }
  const [pending, setPending] = useState(true)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setPending(false)
  //   }, 2000)
  //   return () => clearTimeout(timeout)
  // }, [])

  useEffect(() => {
    // need to define the function and call it separately
    resetFormelement()
  }, [])

  // const GetCategory = async (e) => {
  //   var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0)

  //   return data
  // }

  const GetCategory = async (e) => {
    const data = await fetchData(
      ControllerName.Reporting,
      ApiMethods.Report_Donation_List,
      {
        OperationId: 4,
      }
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
  }

  const GetSubCategory = async (CategoryId) => {
    const data = await fetchData(
      ControllerName.Reporting,
      ApiMethods.Report_Donation_List,
      {
        OperationId: 5,
        Category: CategoryId,
      }
    )
    if (data != null) {
      if (data.Response === true && data.DataSet != null) {
        // setPending(false)
        return data.DataSet.Table
      } else {
        // setPending(false)
        return []
      }
    } else {
      // setPending(false)
      return []
    }
  }

  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          console.log(data.data)
          const sortings = data.data.sort(function (a, b) {
            const keyA = a.Flex2
            const keyB = b.Flex2
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
          })

          return sortings
        }
      }
    } catch (error) {
      return []
    }
  }

  const resetFormelement = async (OID = 1) => {
    // setSearchVlues({ ...initialValues })

    const ddlCategory = await GetCategory()
    const ddlCurrency = await GetCurrency()

    console.log("Categories", ddlCategory)

    setCurrencyddl(ddlCurrency)
    setcategoryddl(ddlCategory)

    ReBindGrid(OID)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()

    if(searchValues.SubscriptionToDate && !searchValues.SubscriptionFromDate){
      Swal.fire({ title: "Warning", text: "Select From Date", icon: "warning" })
      return
    }

    if(searchValues.SubscriptionFromDate && !searchValues.SubscriptionToDate){
      Swal.fire({ title: "Warning", text: "Select To Date", icon: "warning" })
      return
    }

    if (
      searchValues.SubscriptionFromDate != "" ||
      searchValues.SubscriptionToDate != ""
    ) {
      let OID

      ReBindGrid()
    } else {
      Swal.fire({ title: "Warning", text: "Select To Date", icon: "warning" })
    }
  }

  const handleCancelClick = async (e) => {
    e.preventDefault()
    ref.current.reset()

    setSearchVlues({
      ...initialValues,
    })
    const data = await GetSubscriptionListReport()
    setFinalData({ columns, data })
  }

  const GetSubscriptionListReport = async (
    OID = 1,
    pValues = initialValues
  ) => {
    setPending(true)
    try {
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Subscription_List_Admin,
        {
          OperationId: OID,
          ...pValues,
        }
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setPending(false)
          console.log("Data", data.DataSet.Table)
          return data.DataSet.Table
        } else {
          setPending(false)
          return []
        }
      } else {
        setPending(false)
        return []
      }
    } catch (error) {
      setPending(false)
      return []
    }
  }

  const ReBindGrid = async (OID = 1) => {
    console.log("Operation ID", OID)
    const data = await GetSubscriptionListReport(OID, searchValues)
    setFinalData({ columns, data })
  }

  const handleDateChange = (event, type) => {
    setSearchVlues({
      ...searchValues,
      // [type]: new Date(event),
      [type]: getDate(event, "-", "yyyy/mm/dd"),
      // [type]: event,
    })
  }

  const handleRowClicked = (row, e) => {
    console.log("Event Clicked", row)
    setShowModal(!showModal)
    setClickedRow(row)
  }

  const GetFundCategory = async (CategoryId) => {
    var data = await GetSetupMaster(
      SetupMasterIds.FundCategory,
      CategoryId == "0" ? "-1" : CategoryId,
      "",
      0
    )

    return data
  } 

  const handleCategoryChange = async (e) => {
    handleInputChange(e)
    let fundCategoryddl = await GetSubCategory(e.target.value)

    setfundCategroyddl(fundCategoryddl)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form innerRef={ref}>
                  <Row form>
                    <Col md={3}>
                      <Label for="InputDate">Subscription From Date</Label>
                      <DatePicker
                        value={getDate(searchValues.SubscriptionFromDate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) =>
                          handleDateChange(e, "SubscriptionFromDate")
                        }
                        className="form-control"
                        name="SubscriptionFromDate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                      <Label for="InputDate">Subscription To Date</Label>
                      <DatePicker
                        value={getDate(searchValues.SubscriptionToDate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) =>
                          handleDateChange(e, "SubscriptionToDate")
                        }
                        className="form-control"
                        name="SubscriptionToDate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Donor Name</Label>
                        <Input
                          type="text"
                          placeholder="Donor Name"
                          onChange={handleInputChange}
                          name="DonorName"
                          isalphabetic="true"
                          maxLength="50"
                          value={searchValues.DonorName}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Donor Contact</Label>
                        <Input
                          type="email"
                          placeholder="Donor Contact"
                          onChange={handleInputChange}
                          name="DonorContact"
                          maxLength="50"
                          value={searchValues.DonorContact}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Subscription ID</Label>
                        <Input
                          type="text"
                          placeholder="Subscription ID"
                          onChange={handleInputChange}
                          name="SubscriptionId"
                          isnumber="true"
                          maxLength="50"
                          value={searchValues.SubscriptionId}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Currency</Label>
                        <Input
                          id="exampleSelect"
                          name="Currency"
                          type="select"
                          value={searchValues.Currency}
                          onChange={handleInputChange}
                        >
                          <option key={-1} value={-1}>
                            Select
                          </option>

                          {currencyddl.map((item, key) => (
                            <option key={key} value={item.SetupDetailId}>
                              {item.Flex1}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    {/* Start Commented by Irfan 17-3-2023 for now due to Discussion releated to Process understanding */}
 
                    {/* <Col md={3}>
                      <FormGroup>
                        <Label for="">Category</Label>
                        <Input
                          id="exampleSelect"
                          name="Category"
                          type="select"
                          value={searchValues.Category}
                          onChange={handleCategoryChange}
                        >
                          <option key={-1} value={-1}>
                            Select
                          </option>

                          {categoryddl &&
                            categoryddl.length > 0 &&
                            categoryddl.map((item, key) => (
                              <option key={key} value={item.SetupMasterId}>
                                {item.SetupMasterName}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Sub Category</Label>
                        <Input
                          id="exampleSelect"
                          name="SubCategory"
                          type="select"
                          value={searchValues.SubCategory}
                          onChange={handleInputChange}
                        >
                          <option key={-1} value={-1}>
                            Select
                          </option>

                          {fundCategroyddl.map((item, key) => (
                            <option key={key} value={item.SetupDetailId}>
                              {item.SetupDetailName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col> */}

                    {/* End Commented by Irfan 17-3-2023 for now due to Discussion releated to Process understanding */}

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Cause</Label>
                        <Input
                          type="text"
                          placeholder="Cause"
                          onChange={handleInputChange}
                          name="Cause"
                          maxLength="50"
                          value={searchValues.Cause}
                        />
                      </FormGroup>
                    </Col>
                  
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        onClick={() => setEditColumns(true)}
                      >
                        Edit Display Columns
                      </Button>
                    </Col>
                    <Col md={8} className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        onClick={handleSearchClick}
                      >
                        Search
                      </Button>
                      <Button
                        color="secondary"
                        size="sm"
                        type="reset"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Subscription List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTableExtensions
                  {...finalData}
                  columns={columns}
                  exportHeaders={true}
                  fileName="DonationListReport"
                >
                  <DataTable
                    dense
                    direction="auto"
                    defaultSortField="DonorName"
                    fixedHeader
                    striped
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    expandOnRowClicked
                    // onRowClicked={(r, e) => handleRowClicked(r, e)}
                    // When user click on action button
                    onRowDoubleClicked={(r, e) => handleRowClicked(r, e)}
                    progressPending={pending}
                    fixedHeaderScrollHeight="auto"
                    subHeaderAlign="right"
                    subHeaderWrap
                    customStyles={DataTableCustomStyles}
                    expandOnRowDoubleClicked={true}
                  />
                </DataTableExtensions>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EditColumns
          columnsFor="Report_Subscription_List_Admin"
          columns={columns}
          editColumns={editColumns}
          setEditColumns={setEditColumns}
          setColumns={setColumns}
          initialColumns={initialColumns}
        />
      </div>
    </>
  )
}

export default Report_Subscription_List_Admin

const DetailsButton = ({ name, row }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        color="primary"
        size="sm"
        className="btn-primary mr-2"
        style={{
          fontSize: "12px !important",
          width: "100px",
          border: "none",
        }}
        cssModule={{ "font-size": "12px" }}
        onClick={() => {
          console.log("Use Effect Called Clicked")
          setShowModal(true)
        }}
      >
        {name}
      </button>
      <ReportModalSubscription
        showModal={showModal}
        setShowModal={setShowModal}
        clickedRow={row}
      />
    </>
  )
}
