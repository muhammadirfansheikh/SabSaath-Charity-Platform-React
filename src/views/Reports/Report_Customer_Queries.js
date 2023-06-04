import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap"
import { baseImageUrl } from "utils/Api"
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
  ContactUsController,
} from "utils/CommonMethods"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { getDate } from "utils/CommonMethods"
import Swal from "sweetalert2"
import { useEffect } from "react"
import moment from "moment"
import { useIsMount } from "hooks/useIsMount"
import EditCustomerQueryModal from "components/ReportModals/CustomerQuery/EditCustomerQueryModal"
import AddCustomerQueryModal from "components/ReportModals/CustomerQuery/AddCustomerQueryModal"

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#d60b11",
      margin: "1px",
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

const Report_Customer_Queries = () => {
  const isMount = useIsMount()
  const [activeTab, setActiveTab] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [clickedRow, setClickedRow] = useState({})
  const [allQueries, setAllQueries] = useState([])
  const [pendingQueries, setPendingQueries] = useState([])
  const [inProgressQueries, setInProgressQueries] = useState([])
  const [closedQueries, setClosedQueries] = useState([])
  const [finalData, setFinalData] = useState({})

  const columns = [
    {
      name: "Ticket ID",
      width: "150px",
      selector: "TicketID",
      sortable: true,
    },
    {
      name: "Module",
      width: "150px",
      selector: "TicketArea",
      sortable: true,
    },
    {
      name: "Ticket Type",
      width: "150px",
      selector: "TicketType",
      sortable: true,
    },
    {
      name: "Name",
      selector: "FirstName",
      width: "150px",
      sortable: true,
      cell: (row) => <span>{row?.FirstName + " " + row?.LastName}</span>,
    },

    {
      name: "Phone",
      selector: "Phoneno",
      sortable: true,
      grow: 3,
    },
    {
      name: "Email",
      selector: "Emailaddress",
      width: "150px",
      sortable: true,
    },
    {
      name: "City Name",
      selector: "CityName",
      width: "150px",
      sortable: true,
    },
    {
      name: "Message",
      selector: "QueryMessage",
      width: "200px",
      sortable: true,
    },
    {
      name: "Transaction Link",
      selector: "TransactionLink",
      width: "150px",
      sortable: true,
    },
    {
      name: "Status",
      selector: "QueryStatus",
      width: "200px",
      sortable: true,
    },

    {
      name: "Source",
      selector: "QuerySource",
      width: "150px",
      sortable: true,
    },
    {
      name: "Comments",
      selector: "Comments",
      width: "150px",
      sortable: true,
    },
    {
      name: "Created Date",
      width: "200px",
      selector: "CreatedDate",
      cell: (row) => (
        <span className="one-line-paragraph">
          {row.CreatedDate
            ? moment(row.CreatedDate).format("MMM-Do-YYYY hh:mm A")
            : ""}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: "LastUpdatedDate",
      cell: (row) => (
        <span className="one-line-paragraph">
          {row.LastUpdatedDate
            ? moment(row.LastUpdatedDate).format("MMM-Do-YYYY hh:mm A")
            : ""}
        </span>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Last Updated By",
      selector: "LastUpdatedBy",
      width: "150px",
      sortable: true,
    },
    // {
    //   name: "Closed Date",
    //   selector: "LastUpdatedDate",
    //   cell: (row) => (
    //     <span>
    //       {row.LastUpdatedDate
    //         ? moment(row.LastUpdatedDate).format("MMM-Do-YYYY")
    //         : ""}
    //     </span>
    //   ),
    //   width: "150px",
    //   sortable: true,
    // },
    {
      name: "Actions",
      width: "260px",
      cell: (row) => (
        <FormGroup>
          {row.QueryStatus === "Pending" ||
          row.QueryStatus === "In Progress" ? (
            <DetailsButton
              name={"Edit"}
              row={row}
              isEdit
              ReBindGrid={ReBindGrid}
            />
          ) : (
            ""
          )}
          <DetailsButton name={"View"} row={row} />{" "}
        </FormGroup>
      ),
    },
  ]
  const [pending, setPending] = useState(true)

  useEffect(() => {
    if (isMount) return
    if (activeTab === "All") {
      setFinalData({
        columns: columns,
        data: allQueries,
      })
    }
    if (activeTab === "Pending") {
      setFinalData({
        columns: columns,
        data: pendingQueries,
      })
    }
    if (activeTab === "In Progress") {
      setFinalData({
        columns: columns,
        data: inProgressQueries,
      })
    }
    if (activeTab === "Closed") {
      setFinalData({
        columns: columns,
        data: closedQueries,
      })
    }
  }, [activeTab])

  useEffect(() => {
    ReBindGrid(2)
  }, [])

  const GetCustomerQueriesListReport = async (OID = 2) => {
    setPending(true)
    try {
      const data = await ContactUsController(OID)
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setPending(false)
          setAllQueries(data.DataSet.Table)
          setPendingQueries(data.DataSet.Table1)
          setInProgressQueries(data.DataSet.Table2)
          setClosedQueries(data.DataSet.Table3)
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

  const ReBindGrid = async (OID = 2) => {
    const data = await GetCustomerQueriesListReport(OID)
    setFinalData({ columns, data })
  }

  const handleRowClicked = (row, e) => {
    setShowModal(!showModal)
    setClickedRow(row)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Donor Connect List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={8}>
                    <Nav tabs className="border-bottom-0">
                      <NavItem>
                        <NavLink
                          className={activeTab === "Pending" ? "active" : ""}
                          onClick={() => {
                            setActiveTab("Pending")
                          }}
                        >
                          Pending
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={
                            activeTab === "In Progress" ? "active" : ""
                          }
                          onClick={() => {
                            setActiveTab("In Progress")
                          }}
                        >
                          In Progress
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "Closed" ? "active" : ""}
                          onClick={() => {
                            setActiveTab("Closed")
                          }}
                        >
                          Closed
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "All" ? "active" : ""}
                          onClick={() => {
                            setActiveTab("All")
                          }}
                        >
                          All
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md={4} className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => setShowAddModal(true)}
                    >
                      {" "}
                      Add Donor Connect{" "}
                    </Button>
                  </Col>
                </Row>

                <DataTableExtensions
                  {...finalData}
                  exportHeaders={true}
                  fileName="CustomerQueriesReport"
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
      </div>
      {showAddModal && (
        <AddCustomerQueryModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          ReBindGrid={ReBindGrid}
        />
      )}
    </>
  )
}

export default Report_Customer_Queries

const DetailsButton = ({ name, row, isEdit, ReBindGrid }) => {
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
          margin: "5px",
        }}
        cssModule={{ "font-size": "12px" }}
        onClick={() => {
          setShowModal(true)
        }}
      >
        {name}
      </button>

      {showModal && (
        <EditCustomerQueryModal
          showModal={showModal}
          setShowModal={setShowModal}
          clickedRow={row}
          isEdit={isEdit}
          ReBindGrid={ReBindGrid}
        />
      )}
    </>
  )
}
