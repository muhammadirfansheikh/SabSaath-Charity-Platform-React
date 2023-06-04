/* eslint-disable react-hooks/exhaustive-deps */
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import DatePicker from "react-datepicker"
import { fetchData } from "utils/Api"
import { ApiMethods, ControllerName, DataTableCustomStyles, SetupMasterIds } from "utils/Constants"
import { GetSetupMaster } from "utils/CommonMethods"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { dateFormat, dateFormatPlaceholder, getDate } from "utils/CommonMethods"
import Swal from "sweetalert2"
import { useEffect } from "react"
import moment from "moment"
import EditColumns from "components/EditColumns"
import ReportModalScheduler from "components/ReportModalScheduler"

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#d60b11",
      placeContent: "center",
      color: "white",
      borderRadius: "3px",
      fontWeight: "bolder",
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "0.9rem",
    },
  },
}

const initialColumns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    width: "150px",
    omit: false,
  },

  {
    name: "Date",
    selector: "Date",
    cell: (row) => (
      <span>
        {row.Date ? moment(row.Date).format("Do-MMM-YYYY hh:mm:ss A") : null}
      </span>
    ),
    width: "200px",
    sortable: true,
    omit: false,
  },

  {
    name: "Count",
    selector: "Count",
    width: "200px",
    sortable: true,
    omit: false,
  },
  {
    name: "Status",
    selector: "Status",
    sortable: true,
    width: "150px",
    omit: false,
  },

  {
    name: "Success Count",
    selector: "SuccessCount",
    sortable: true,
    width: "150px",
    omit: false,
  },
  {
    name: "Failed Count",
    selector: "FailedCount",
    sortable: true,
    width: "150px",
    omit: false,
  },

  {
    name: "Reason",
    selector: "Reason",
    width: "300px",
    grow : 3,
    sortable: true,
    omit: false,
  },
  {
    name: "Last Updated",
    selector: "LastUpdated",
    grow : 1,
    cell: (row) => (
      <span>
        {row.LastUpdated
          ? moment(row.LastUpdated).format("Do-MMM-YYYY hh:mm:ss A")
          : null}
      </span>
    ),
    width: "200px",
    sortable: true,
    omit: false,
  },
  {
    name: "Details",
    width: "150px",
    cell: (row) => <DetailsButton name={"Details"} row={row} />,
  },
]

const Report_Task_Scheduler = () => {
  const initialValues = {
    operationid: 3,
    ID: null,
    Status: null,
    count: null,
    Reason: null,
    Fromdate: getDate(Date.now() - 2592000000, "-", "yyyy/mm/dd"),
    Todate: getDate(Date.now(), "-", "yyyy/mm/dd"),
    Schedulerdate: null,
  }
  const ref = React.useRef()
  const [editColumns, setEditColumns] = useState(false)
  const [columns, setColumns] = useState(initialColumns)
  const [statuses, setStatuses] = useState([])
  const [searchValues, setSearchVlues] = useState(initialValues)
  const [pending, setPending] = useState(true)
  const [finalData, setFinalData] = useState({})

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === "Status" && value === "Select") {
      value = null
    }

    setSearchVlues({
      ...searchValues,
      [name]: value,
    })
  }

  useEffect(() => {
    resetFormelement()
  }, [])

  const resetFormelement = async (OID = 3) => {
    ReBindGrid(OID)
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()

    if (!searchValues.Fromdate) {
      return Swal.fire({
        title: "Warning",
        text: "Select From Date",
        icon: "warning",
      })
    }

    if (!searchValues.Todate) {
      return Swal.fire({
        title: "Warning",
        text: "Select To Date",
        icon: "warning",
      })
    }
    ReBindGrid(3)
  }

  const handleCancelClick = async (e) => {
    e.preventDefault()
    ref.current.reset()
    setSearchVlues({
      ...initialValues,
    })
    const data = await GetTaskSchedulerListReport()
    setFinalData({ columns, data })
  }

  const GetTaskSchedulerListReport = async (
    OID = 3,
    pValues = initialValues
  ) => {
    setPending(true)
    try {
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Task_Scheduler,
        {
          OperationID: OID,
          ...pValues,
        }
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setPending(false)
          setStatuses(data.DataSet.Table1)
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

  const ReBindGrid = async (OID = 3) => {
    const data = await GetTaskSchedulerListReport(OID, searchValues)
    setFinalData({ columns, data })
  }

  const handleDateChange = (event, type) => {
    setSearchVlues({
      ...searchValues,
      // [type]: new Date(event),
      [type]: getDate(event, "-", "yyyy/mm/dd"),
    })
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
                      <Label for="InputDate">Date From *</Label>
                      <DatePicker
                        value={getDate(searchValues.Fromdate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => handleDateChange(e, "Fromdate")}
                        className="form-control"
                        name="Fromdate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                      <Label for="InputDate">Date To *</Label>
                      <DatePicker
                        value={getDate(searchValues.Todate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => handleDateChange(e, "Todate")}
                        className="form-control"
                        name="Todate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Status</Label>
                        <Input
                          id="exampleSelect"
                          name="Status"
                          type="select"
                          value={searchValues.Status}
                          onChange={handleInputChange}
                        >
                          <option key={null} value={null}>
                            Select
                          </option>

                          {statuses?.length &&
                            statuses?.map((item, key) => (
                              <option key={key} value={item.logstatus}>
                                {item.logstatus}
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
                    Scheduler List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTableExtensions
                  {...finalData}
                  columns={columns}
                  exportHeaders={true}
                  fileName="ReportSubscriptionScheduler"
                >
                  <DataTable
                    dense
                    direction="auto"
                    defaultSortField="id"
                    fixedHeader
                    striped
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    expandOnRowClicked
                    progressPending={pending}
                    fixedHeaderScrollHeight="auto"
                    subHeaderAlign="right"
                    subHeaderWrap
                    customStyles={DataTableCustomStyles}
                  />
                </DataTableExtensions>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <EditColumns
          columnsFor="Report_Task_Scheduler"
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

export default Report_Task_Scheduler

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
      <ReportModalScheduler
        showModal={showModal}
        setShowModal={setShowModal}
        clickedRow={row}
      />
    </>
  )
}
