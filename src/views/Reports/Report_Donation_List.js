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
  Badge,
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
import EditColumns from "components/EditColumns"

const initialColumns = [
  {
    name: "Donation Type",
    selector: "DonationType",
    sortable: true,
    width: "150px",
    omit: false,
  },

  {
    name: "Donor Name",
    selector: "DonorName",
    width: "150px",
    sortable: true,
    omit: false,
  },

  {
    name: "Donor Email",
    selector: "EmailAddress",
    width: "200px",
    sortable: true,
    omit: false,
  },
  {
    name: "Donor Mobile",
    selector: "DonorMobile",
    sortable: true,
    width: "150px",
    omit: true,
  },

  {
    name: "Donor Address",
    selector: "DonorAddress",
    sortable: true,
    width: "150px",
    omit: true,
  },
  {
    name: "Donor Country",
    selector: "CountryName",
    sortable: true,
    width: "150px",
    omit: true,
  },

  {
    name: "Donation Date",
    selector: "DonationDate",
    cell: (row) => (
      <span>{moment(row.DonationDate).format("MMM-Do-YYYY")}</span>
    ),
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "NGO Name",
    selector: "NGO",
    width: "150px",
    sortable: true,
    omit: true,
  },
  {
    name: "Transaction ID",
    selector: "TransactionID",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "PGW Ref",
    selector: "PaymentID",
    width: "150px",
    sortable: true,
    omit: true,
  },
  {
    name: "Total PKR Amount",
    selector: "Total_PKR_Amount",
    cell: (row) => (
      <span>
        {row.Total_PKR_Amount
          ? ConvertNumricToComaSeparate(row.Total_PKR_Amount.toFixed(2))
          : null}
      </span>
    ),
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Total Amount",
    width: "150px",
    selector: "AmountCurrency",
    cell: (row) => (
      <span>
        {row.AmountCurrency
          ? ConvertNumricToComaSeparate(
              parseInt(row.AmountCurrency.split(" ")[0])
            ) +
            " " +
            row.AmountCurrency.split(" ")[1]
          : null}
      </span>
    ),
    sortable: true,
    omit: false,
  },
  {
    name: "Receive Update",
    selector: "IsRecievedUpdates",
    cell: (row) => (row.IsRecievedUpdates ? "Yes" : "No"),
    width: "100px",
    sortable: true,
    omit: false,
  },
  {
    name: "Status",
    selector: "StatusSuccess",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Failure Reason",
    selector: "FailureReason",
    grow: 3,
    sortable: true,
    omit: false,
  },
  {
    name: "Cause",
    selector: "Cause",
    sortable: true,
    grow: 3,
    omit: false,
  },
  {
    name: "Note",
    selector: "Note",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Conversion Rate",
    selector: "ConversionRate",
    width: "150px",
    sortable: true,
    omit: false,
  },

  {
    name: "Payment Source",
    width: "150px",
    selector: "PaymentSource",
    sortable: true,
    omit: false,
  },

  {
    name: "Payment Type",
    selector: "PaymentType",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Posting Type",
    width: "150px",
    selector: "PostingType",
    sortable: true,
    omit: false,
  },
  {
    name: "Category",
    selector: "Category",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Sub Category",
    selector: "SubCategory",
    width: "150px",
    sortable: true,
    omit: false,
  },

  {
    name: "Receipt",
    selector: "Receipt",
    cell: (row) =>
      row.Receipt ? (
        <a href={baseImageUrl + row.Receipt} target="_blank" rel="noreferrer">
          <i className="fa fa-file" />
        </a>
      ) : (
        <></>
      ),
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Email Status",
    selector: "EmailStatus",
    width: "150px",
    sortable: true,
    omit: false,
  },
  {
    name: "Pop up Status",
    selector: "PopUpStatus",
    width: "150px",
    sortable: true,
    omit: false,
  },
]

const showedFields = [
  "CreatedDate",
  "SetupDetailId",
  "IsWebsiteDonor",
  "CurrencyId",
  "CategoryId",
]

const Report_Donation_List = () => {
  const initialValues = {
    DonationFromDate: getDate(Date.now() - 2592000000, "-", "yyyy/mm/dd"),
    DonationToDate: getDate(Date.now(), "-", "yyyy/mm/dd"),
    DonorName: null,
    DonorEmail: null,
    TransactionID: null,
    PaymentSource: null,
    Currency: null,
    Category: null,
    SubCategory: null,
    Cause: null,
    Note: null,
    FundCategoryId: -1,
    FundSubCategoryId: -1,
    NGO: null,
  }
  const isMount = useIsMount()
  const ref = React.useRef()
  const [editColumns, setEditColumns] = useState(false)
  const [columns, setColumns] = useState(initialColumns)
  const [showModal, setShowModal] = useState(false)
  const [clickedRow, setClickedRow] = useState({})
  const [currencyddl, setCurrencyddl] = useState([])
  const [categoryddl, setcategoryddl] = useState([])
  const [fundCategroyddl, setfundCategroyddl] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [activeTab, setActiveTab] = useState("All")
  const [searchValues, setSearchVlues] = useState(initialValues)

  const [finalData, setFinalData] = useState({})

  useEffect(() => {
    if (isMount) return
    localStorage.setItem("Report_Donation_List", JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    if (isMount) return
    if (activeTab === "All") {
      console.log("Called All")
      ReBindGrid(1)
    }
    if (activeTab === "success") {
      ReBindGrid(2)
    }

    if (activeTab === "failed") {
      ReBindGrid(3)
    }
  }, [activeTab])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let _values = e.target.value

    if (e.target.getAttribute("isalphabetic") === "true") {
      _values = AllowAlphabatic(e.target.value)
    } else if (e.target.getAttribute("isnumber") == "true")
      _values = e.target.value.replace(/\D/g, "")

    const numbers = ["Category", "SubCategory", "PaymentSource", "Currency"]

    if (name === "TransactionID" && (_values || _values === "0")) {
      _values = Number(e.target.value)
    }
    if (numbers.includes(name)) {
      _values = Number(e.target.value)
    }

    setSearchVlues({
      ...searchValues,
      [name]: _values,
    })
  }
  const [pending, setPending] = useState(true)

  useEffect(() => {
    // need to define the function and call it separately
    resetFormelement()
  }, [])

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
        setPending(false)
        return data.DataSet.Table
      } else {
        setPending(false)
        return []
      }
    } else {
      setPending(false)
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
        setPending(false)
        return data.DataSet.Table
      } else {
        setPending(false)
        return []
      }
    } else {
      setPending(false)
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
    const ddlCategory = await GetCategory()
    const ddlCurrency = await GetCurrency()

    setCurrencyddl(ddlCurrency)
    setcategoryddl(ddlCategory)

    ReBindGrid(OID)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()

    if (
      searchValues.DonationFromDate != "" ||
      searchValues.DonationToDate != ""
    ) {
      let OID
      if (activeTab === "All") {
        OID = 1
      }
      if (activeTab === "success") {
        OID = 2
      }
      if (activeTab === "failed") {
        OID = 3
      }

      ReBindGrid(OID)
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
    setActiveTab("All")
    const data = await GetDonationListReport()
    setFinalData({ columns, data })
  }

  const GetDonationListReport = async (OID = 1, pValues = initialValues) => {
    setPending(true)
    try {
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Donation_List,
        {
          OperationId: OID,
          ...pValues,
        }
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setPending(false)
          setTotalAmount(data.DataSet?.Table1[0]?.Totaldonationamount)
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
    const data = await GetDonationListReport(OID, searchValues)
    setFinalData({ columns, data })
  }

  const handleDateChange = (event, type) => {
    setSearchVlues({
      ...searchValues,
      [type]: getDate(event, "-", "yyyy/mm/dd"),
    })
  }

  const handleRowClicked = (row) => {
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
                      <Label for="InputDate">Date From</Label>
                      <DatePicker
                        value={getDate(searchValues.DonationFromDate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) =>
                          handleDateChange(e, "DonationFromDate")
                        }
                        className="form-control"
                        name="DonationFromDate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                      <Label for="InputDate">Date To</Label>
                      <DatePicker
                        value={getDate(searchValues.DonationToDate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => handleDateChange(e, "DonationToDate")}
                        className="form-control"
                        name="DonationToDate"
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
                        <Label for="">Donor Email</Label>
                        <Input
                          type="email"
                          placeholder="Donor Email"
                          onChange={handleInputChange}
                          name="DonorEmail"
                          maxLength="50"
                          value={searchValues.DonorEmail}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">NGO</Label>
                        <Input
                          type="text"
                          placeholder="NGO"
                          onChange={handleInputChange}
                          name="NGO"
                          maxLength="50"
                          value={searchValues.NGO}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Transaction ID</Label>
                        <Input
                          type="text"
                          placeholder="Transaction ID"
                          onChange={handleInputChange}
                          name="TransactionID"
                          isnumber="true"
                          maxLength="50"
                          value={searchValues.TransactionID}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Payment Source</Label>
                        <Input
                          id="exampleSelect"
                          name="PaymentSource"
                          type="select"
                          value={searchValues.PaymentSource}
                          onChange={handleInputChange}
                        >
                          <option key={-1} value={-1}>
                            Select
                          </option>

                          <option value={1}>Online</option>
                          <option value={0}>Manual</option>

                          {/* {donationTypeddl.map((item, key) => (
                            <option key={key} value={item.SetupDetailId}>
                              {item.SetupDetailName}
                            </option>
                          ))} */}
                        </Input>
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
                          isalphabetic="true"
                          maxLength="50"
                          value={searchValues.Cause}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Note</Label>
                        <Input
                          type="text"
                          placeholder="Note"
                          onChange={handleInputChange}
                          name="Note"
                          isalphabetic="true"
                          maxLength="50"
                          value={searchValues.Note}
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
                    Donation List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={activeTab === "success" ? "active" : ""}
                      onClick={() => {
                        setActiveTab("success")
                      }}
                    >
                      Successful Donations
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "failed" ? "active" : ""}
                      onClick={() => {
                        setActiveTab("failed")
                      }}
                    >
                      Failed Donations
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "All" ? "active" : ""}
                      onClick={() => {
                        setActiveTab("All")
                      }}
                    >
                      All Donations
                    </NavLink>
                  </NavItem>
                  <Col className="text-lg-right">
                    <h5>
                      <Badge className="p-2" color="primary">
                        Total Donated Amount:{" "}
                        {ConvertNumricToComaSeparate(totalAmount.toFixed(2))}
                      </Badge>
                    </h5>
                  </Col>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="All">
                    {activeTab === "All" && (
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
                          onRowClicked={(r) => handleRowClicked(r)}
                          progressPending={pending}
                          fixedHeaderScrollHeight="auto"
                          subHeaderAlign="right"
                          subHeaderWrap
                          customStyles={DataTableCustomStyles}
                        />
                      </DataTableExtensions>
                    )}
                  </TabPane>

                  <TabPane tabId="success">
                    {activeTab === "success" && (
                      <DataTableExtensions
                        {...finalData}
                        columns={columns.filter(
                          (x) => x.name !== "Failure Reason"
                        )}
                        data={finalData?.data}
                        exportHeaders={true}
                        fileName="DonorListReport"
                      >
                        <DataTable
                          dense
                          direction="auto"
                          defaultSortField="FirstName"
                          fixedHeader
                          striped
                          onRowClicked={(r) => handleRowClicked(r)}
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                          progressPending={pending}
                          fixedHeaderScrollHeight="auto"
                          subHeaderAlign="right"
                          subHeaderWrap
                          customStyles={DataTableCustomStyles}
                        />
                      </DataTableExtensions>
                    )}
                  </TabPane>

                  <TabPane tabId="failed">
                    {activeTab === "failed" && (
                      <DataTableExtensions
                        {...finalData}
                        columns={columns}
                        exportHeaders={true}
                        fileName="DonorListReport"
                      >
                        <DataTable
                          dense
                          direction="auto"
                          defaultSortField="FirstName"
                          fixedHeader
                          striped
                          onRowClicked={(r) => handleRowClicked(r)}
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                          progressPending={pending}
                          fixedHeaderScrollHeight="auto"
                          subHeaderAlign="right"
                          subHeaderWrap
                          customStyles={DataTableCustomStyles}
                        />
                      </DataTableExtensions>
                    )}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={showModal}
          toggle={() => {
            setShowModal(false)
            setClickedRow(null)
          }}
          size="md"
          backdrop="static"
        >
          <ModalHeader toggle={() => setShowModal(false)}>
            {clickedRow?.DonorName} Record
          </ModalHeader>

          <ModalBody>
            {clickedRow &&
              Object.keys(clickedRow).length > 0 &&
              Object.keys(clickedRow).map((key) =>
                clickedRow[key] ? (
                  !showedFields.includes(key) ? (
                    <div>
                      <strong> {key} : </strong>
                      <span>{clickedRow[key]}</span>
                    </div>
                  ) : null
                ) : null
              )}
            <div>
              <b className="bold">Donation Type : </b>
              <span className="bold">{clickedRow?.DonationType}</span>
            </div>
          </ModalBody>

          {/* <ModalBody>
         <FormGroupTable rows={rows} columns={UnAssign_columns}/>
        </ModalBody> */}
        </Modal>
        <EditColumns
          columnsFor="Report_Donation_List"
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

export default Report_Donation_List
