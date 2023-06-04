import moment from "moment"
import DataTableExtensions from "react-data-table-component-extensions"
import DataTable from "react-data-table-component"
import { useMemo, useState } from "react"
import {
  ApiMethods,
  ControllerName,
  DataTableCustomStyles,
} from "utils/Constants"
import { baseImageUrl, fetchData } from "utils/Api"
import { useEffect } from "react"
import Loader from "./GeneralComponent/Loader"

const {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col,
  Spinner,
} = require("reactstrap")

const columns = [
  {
    name: "Donor Email",
    selector: "DonorEmail",
    width: "150px",
    sortable: true,
  },
  {
    name: "Donor Name ",
    selector: "DonorName",
    width: "150px",
    sortable: true,
  },
  {
    name: "Donation Date",
    selector: "DonationDate",
    cell: (row) =>
      row.DonationDate ? moment(row.DonationDate).format("DD/MM/YYYY") : "",
    sortable: true,
    width: "150px",
  },
  {
    name: "Amount - Currency",
    selector: "AmountCurrency",
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
    name: "Failure Reason",
    selector: "FailureReason",
    width: "200px",
    sortable: true,
  },

  {
    name: "Posting Date",
    selector: "PostingDate",
    cell: (row) =>
      row.PostingDate ? moment(row.PostingDate).format("DD/MM/YYYY") : "",
    width: "150px",
    sortable: true,
  },
  {
    name: "Conversion Rate",
    selector: "ExchangeRate",
    width: "150px",
    sortable: true,
  },
  {
    name: "Transaction ID",
    selector: "TransactionID",
    width: "150px",
    sortable: true,
  },
  {
    name: "Payment Type",
    selector: "PaymentType",
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
    name: "Receipt",
    selector: "Receipt",
    cell: (row) =>
      row?.Receipt ? (
        <a href={baseImageUrl + row?.Receipt} target="_blank" rel="noreferrer">
          {" "}
          <i className="fa fa-file" />
        </a>
      ) : (
        <></>
      ),
    width: "150px",
    sortable: true,
  },

  {
    name: "Email Status",
    selector: "EmailStatus",
    width: "150px",
    sortable: true,
  },
]

const ReportModalCaseDonationDetails = ({
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
  const GetCaseDonationDetail = async (obj) => {
    try {
      var RequestData = {
        OperationID: 2,
        ApplicantCaseId: clickedRow?.ApplicantCaseId,
      }
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Case_Donation_Details,
        RequestData
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          const detailDataTable = data.DataSet.Table
          setreportListdetail(detailDataTable)
          setFinalDatadetail({
            columns,
            data: detailDataTable,
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
      GetCaseDonationDetail()
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
        Case Donation Details
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
                <Col lg={12} md={12} xs={12}>
                  <Row>
                    <Col lg={2}>
                      <b>Category - Sub Category:</b>{" "}
                    </Col>
                    <Col lg={10}>{clickedRow?.Category}</Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Row>
                    <Col lg={2}>
                      <b>Cause:</b>{" "}
                    </Col>
                    <Col lg={10}>{clickedRow?.Cause}</Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Row>
                    <Col lg={2}>
                      <b>Case Status:</b>
                    </Col>
                    <Col lg={10}> {clickedRow?.CaseStatus}</Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Row>
                    <Col lg={2}>
                      <b>Total Subs:</b>
                    </Col>
                    <Col lg={10}> {clickedRow?.TotalSubs}</Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <DataTableExtensions
              {...finalData}
              exportToXlsx={true}
              exportHeaders={true}
              fileName="Case Donation Report"
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

export default ReportModalCaseDonationDetails
