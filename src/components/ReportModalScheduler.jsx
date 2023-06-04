import moment from "moment"
import DataTableExtensions from "react-data-table-component-extensions"
import DataTable from "react-data-table-component"
import { useMemo, useState } from "react"
import { ApiMethods, ControllerName, DataTableCustomStyles } from "utils/Constants"
import { baseImageUrl, fetchData } from "utils/Api"
import { useEffect } from "react"
import Loader from "./GeneralComponent/Loader"
import { ConvertNumricToComaSeparate } from "utils/CommonMethods"

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#d60b11",
      placeContent: "center",
      margin: "1px",
      color: "white",
      borderRadius: "3px",
      fontWeight: "bolder",
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "0.9rem",
    },
  },
}
const {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Col,
  Spinner,
} = require("reactstrap")

const columns = [
  {
    name: "Donation Tx ID",
    selector: "DonationTxID",
    width: "150px",
    sortable: true,
  },
  {
    name: "Email address",
    selector: "EmailAddress",
    width: "200px",
    sortable: true,
  },
  {
    name: "Amount PKR",
    selector: "DonationAmount",
    cell: (row) =>
      row.DonationAmount
        ? ConvertNumricToComaSeparate(row.DonationAmount)
        : null,
    width: "150px",
    sortable: true,
  },
  {
    name: "Cause",
    selector: "Cause",
    width: "250px",
    grow: 3,
    sortable: true,
  },
  {
    name: "Status",
    selector: "Status",
    width: "200px",
    sortable: true,
  },

  {
    name: "Reason",
    selector: "Reason",
    width: "300px",
    grow: 2,
    sortable: true,
  },
  {
    name: "Email Status",
    selector: "EmailStatus",
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
    name: "Subscription Detail ID",
    selector: "SubscriptionDetailId",
    sortable: true,
    width: "150px",
  },
  {
    name: "Donation Date",
    selector: "DonationDate",
    cell: (row) =>
      row.DonationDate
        ? moment(row.DonationDate).format("DD-MMM-YYYY hh:mm:ss A")
        : null,
    // moment(clickedRow?.Date).format("DD-MMM-YYYY hh:mm:ss A")
    grow: 3,
    width: "200px",
    sortable: true,
  },
  {
    name: "Posting Date",
    selector: "PostingDate",
    cell: (row) =>
      row.PostingDate
        ? moment(row.PostingDate).format("DD-MMM-YYYY hh:mm:ss A")
        : null,
    width: "200px",
    sortable: true,
  },
]

const ReportModalScheduler = ({
  showModal,
  setShowModal,
  setClickedRow,
  clickedRow,
}) => {
  const [loading, setLoading] = useState(true)
  const [reportList, setreportListdetail] = useState([])
  const [formData, setFormData] = useState(null)
  const [finalData, setFinalDatadetail] = useState({
    columns,
    data: reportList,
  })
  const GetScheduler_List_detail = async (obj) => {
    try {
      var RequestData = {
        OperationID: 4,
        Schedulerdate: moment(clickedRow?.Date).format("YYYY-MM-DD"),
      }
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Task_Scheduler,
        RequestData
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          const formDataDB = data.DataSet.Table
          const detailDataTable = data.DataSet.Table1
          setFormData(formDataDB)
          console.log("detaildata", detailDataTable)
          setreportListdetail(detailDataTable)
          setFinalDatadetail({
            columns,
            data: formDataDB,
          })
          setLoading(false)
          return data.DataSet.Table
        } else {
          setLoading(false)
          return []
        }
      } else {
        setLoading(false)
        return []
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }
  useEffect(() => {
    if (showModal === true && clickedRow !== null) {
      GetScheduler_List_detail()
    }
    return () => {
      if (showModal === false) {
        setreportListdetail([])
        setFinalDatadetail({
          columns,
          data: [],
        })
      }
    }
  }, [showModal])

  return (
    <Modal
      isOpen={showModal}
      toggle={() => {
        setShowModal(false)
        setClickedRow(null)
      }}
      style={{
        // maxWidth: "90%",
        height: "90vh",
      }}
      size="xl"
      backdrop="static"
    >
      <ModalHeader toggle={() => setShowModal(false)}>
        {clickedRow?.DonorName} Record
      </ModalHeader>

      <ModalBody>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "60px",
            }}
          >
            <Spinner
              style={{
                width: "10rem",
                height: "10rem",
              }}
              color="danger"
            />
          </div>
        ) : (
          <>
            {/* Previous View */}
            <Container>
              <Row>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Scheduled Run ID:</b>{" "}
                    </Col>
                    <Col lg={8}>{clickedRow?.id}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Count:</b>{" "}
                    </Col>
                    <Col lg={8}>{clickedRow?.Count}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Date:</b>{" "}
                    </Col>
                    <Col lg={8}>
                      {" "}
                      {moment(clickedRow?.Date).format(
                        "DD-MMM-YYYY hh:mm:ss A"
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Status:</b>{" "}
                    </Col>
                    <Col lg={8}>
                      {" "}
                      {clickedRow?.Status}{" "}
                      {clickedRow?.Reason ? clickedRow?.Reason : ""}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <DataTableExtensions
              {...finalData}
              exportToXlsx={true}
              exportHeaders={true}
              fileName="Subscription Report"
              // Style for Export Button
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <DataTable
                style={{
                  marginTop: "10px",
                }}
                dense
                progressPending={loading}
                progressComponent={<Loader />}
                direction="auto"
                defaultSortField="FirstName"
                fixedHeader
                striped
                defaultSortAsc={false}
                pagination
                highlightOnHover
                fixedHeaderScrollHeight="auto"
                subHeaderAlign="right"
                subHeaderWrap
                customStyles={DataTableCustomStyles}
              />
            </DataTableExtensions>
          </>
        )}
      </ModalBody>

      {/* <ModalBody>
         <FormGroupTable rows={rows} columns={UnAssign_columns}/>
        </ModalBody> */}
    </Modal>
  )
}

export default ReportModalScheduler
