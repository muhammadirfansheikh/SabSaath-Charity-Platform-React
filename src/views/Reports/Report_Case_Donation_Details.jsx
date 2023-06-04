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
} from "reactstrap"
import { fetchData } from "utils/Api"
import {
  ApiMethods,
  ControllerName,
  DataTableCustomStyles,
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
import { getDate } from "utils/CommonMethods"
import Swal from "sweetalert2"
import { useEffect } from "react"
import EditColumns from "components/EditColumns"
import ReportModalCaseDonationDetails from "components/ReportModalCaseDonationDetails"
import moment from "moment"

const initialColumns = [
  {
    name: "Category",
    selector: "Category",
    sortable: true,
    grow: 3,
  },
  {
    name: "Cause",
    selector: "Cause",
    sortable: true,
    grow: 3,
  },
  {
    name: "Case Show Date",
    selector: "CaseShowDate",
    width: "150px",
    cell: (row) => {
      return (
        <span>
          {row.CaseShowDate
            ? moment(row.CaseShowDate).format("DD/MM/YYYY")
            : ""}
        </span>
      )
    },
    sortable: true,
  },
  {
    name: "Total Funds Required PKR",
    selector: "TotalFundsRequiredPKR",
    width: "200px",
    cell: (row) =>
      row.TotalFundsRequiredPKR
        ? ConvertNumricToComaSeparate(row.TotalFundsRequiredPKR)
        : "",
    sortable: true,
  },
  {
    name: "Total Paid PKR",
    selector: "TotalPaidPKR",
    cell: (row) =>
      row.TotalPaidPKR ? ConvertNumricToComaSeparate(row.TotalPaidPKR) : "",
    width: "200px",
    sortable: true,
  },
  {
    name: "Total Pledged PKR",
    selector: "TotalPledgedPKR",
    cell: (row) =>
      row.TotalPledgedPKR
        ? ConvertNumricToComaSeparate(row.TotalPledgedPKR)
        : "",
    width: "200px",
    sortable: true,
  },
  {
    name: "Total Remaining",
    selector: "TotalRemaining",
    cell: (row) =>
      row.TotalRemaining ? ConvertNumricToComaSeparate(row.TotalRemaining) : "",
    width: "200px",
    sortable: true,
  },
  {
    name: "Cancelled",
    selector: "Cancelled",
    width: "200px",
    sortable: true,
  },
  {
    name: "Failed",
    selector: "Failed",
    width: "200px",
    sortable: true,
  },
  {
    name: "Total Subs",
    selector: "TotalSubs",
    width: "200px",
    sortable: true,
    omit: false,
  },
  {
    name: "Case Status",
    selector: "CaseStatus",
    width: "200px",
    sortable: true,
    omit: false,
  },

  {
    name: "Subscription Details",
    width: "150px",
    cell: (row) => <DetailsButton name={"Details"} row={row} />,
  },
]

const Report_Case_Donation_Details = () => {
  const initialValues = {
    CaseStatus: null,
    Cause: null,
    Category: null,
    OperationID: 1,
  }
  const ref = React.useRef()

  const [showModal, setShowModal] = useState(false)
  const [categoryddl, setCategoryddl] = useState([])
  const [editColumns, setEditColumns] = useState(false)
  const [columns, setColumns] = useState(initialColumns)

  const [searchValues, setSearchVlues] = useState(initialValues)
  const [pending, setPending] = useState(true)
  const [finalData, setFinalData] = useState({})

  const handleInputChange = (e) => {
    const { name } = e.target
    let _values = e.target.value

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
  }

  useEffect(() => {
    resetFormelement()
  }, [])

  const GetCategory = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0)
    return data
  }

  const resetFormelement = async (OID = 1) => {
    const ddlCategory = await GetCategory()

    setCategoryddl(ddlCategory.data)

    ReBindGrid(OID)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()
    ReBindGrid()
  }

  const handleCancelClick = async (e) => {
    e.preventDefault()
    ref.current.reset()

    setSearchVlues({
      ...initialValues,
    })
    const data = await GetCaseDonationDetailsReport()
    setFinalData({ columns, data })
  }

  const GetCaseDonationDetailsReport = async (pValues = initialValues) => {
    setPending(true)
    try {
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Case_Donation_Details,
        {
          ...searchValues,
          CaseStatus : searchValues.CaseStatus ? searchValues.CaseStatus : null,
          Category : searchValues.Category ? searchValues.Category : null,
          Cause : searchValues.Cause ? searchValues.Cause : null,
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
    } catch (error) {
      setPending(false)
      return []
    }
  }

  const ReBindGrid = async (OID = 1) => {
    const data = await GetCaseDonationDetailsReport(OID, searchValues)
    setFinalData({ columns, data })
  }

  const handleRowClicked = (row, e) => {
    setShowModal(!showModal)
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
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Case Status</Label>
                        <Input
                          id="Case Status"
                          name="CaseStatus"
                          type="select"
                          value={searchValues.CaseStatus}
                          onChange={handleInputChange}
                        >
                          <option key={-1} value={""}>
                            Select
                          </option>
                          <option value={"Active"}>Active</option>
                          <option value={"Closed"}>Closed</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Category</Label>
                        <Input
                          id="exampleSelect"
                          name="Category"
                          type="select"
                          value={searchValues.Category}
                          onChange={handleInputChange}
                        >
                          <option key={-1} value={""}>
                            Select
                          </option>

                          {categoryddl.map((item, key) => (
                            <option key={key} value={item.SetupDetailId}>
                              {item.SetupDetailName}
                            </option>
                          ))}
                        </Input>
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
                    Case Donation Details
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
          columnsFor="Report_Case_Donation_Details"
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

export default Report_Case_Donation_Details

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
          setShowModal(true)
        }}
      >
        {name}
      </button>
      <ReportModalCaseDonationDetails
        showModal={showModal}
        setShowModal={setShowModal}
        clickedRow={row}
      />
    </>
  )
}
