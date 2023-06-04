import moment from "moment"
import DataTableExtensions from "react-data-table-component-extensions"
import DataTable from "react-data-table-component"
import { useMemo, useState } from "react"
import { ApiMethods, ControllerName, DataTableCustomStyles } from "utils/Constants"
import { baseImageUrl, fetchData } from "utils/Api"
import { useEffect } from "react"
import Loader from "./GeneralComponent/Loader"

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
    name: "Donation Date",
    selector: "DonationDate",
    width: "150px",
    sortable: true,
  },
  {
    name: "Amount ",
    selector: "Amount",
    width: "150px",
    sortable: true,
  },
  {
    name: "Status",
    selector: "Status",
    sortable: true,
    width: "150px",
  },
  {
    name: "Failure Reason",
    selector: "FailureReason",
    grow: 3,
    sortable: true,
  },
  {
    name: "Posting Date",
    selector: "PostingDate",
    width: "200px",
    sortable: true,
  },
  {
    name: "Conversion Rate",
    selector: "PKRRate",
    width: "200px",
    sortable: true,
  },

  {
    name: "Transaction ID",
    selector: "InvoiceNo",
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

  // {
  //   name: "Pop Up Status",
  //   selector: "PopUpStatus",
  //   width: "150px",
  //   sortable: true,
  // },
]

const ReportModalSubscription = ({
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
  const GetSubscription_List_detail = async (obj) => {
    try {
      var RequestData = {
        OperationID: 2,
        SubscriptionId: clickedRow?.SubscriptionId,
      }
      const data = await fetchData(
        ControllerName.Reporting,
        ApiMethods.Report_Subscription_List_Admin,
        RequestData
      )
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          const formDataDB = data.DataSet.Table[0]
          const detailDataTable = data.DataSet.Table1
          setFormData(formDataDB)
          console.log("detaildata", detailDataTable)
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
      GetSubscription_List_detail()
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
                      <b>Category - Sub Category:</b>{" "}
                    </Col>
                    <Col lg={8}>{formData?.Category}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Cause:</b>{" "}
                    </Col>
                    <Col lg={8}>{formData?.Cause}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Donor Name:</b>{" "}
                    </Col>
                    <Col lg={8}> {formData?.DonorName}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Donor Email:</b>{" "}
                    </Col>
                    <Col lg={8}> {formData?.DonorEmail}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Donor Phone:</b>{" "}
                    </Col>
                    <Col lg={8}>{formData?.DonorPhone}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Subscription Date:</b>{" "}
                    </Col>
                    <Col lg={8}>
                      {" "}
                      {formData?.SubscriptionDateTime &&
                        moment(formData?.SubscriptionDateTime).format(
                          "DD/MM/YYYY"
                        )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Subscription ID:</b>{" "}
                    </Col>
                    <Col lg={8}>{formData?.SubscriptionId}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Donation Type:</b>
                    </Col>
                    <Col lg={8}> {formData?.DonationType}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Subscription Status:</b>
                    </Col>
                    <Col lg={8}> {clickedRow?.SubscriptionStatus}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Failed Count:</b>
                    </Col>
                    <Col lg={8}> {clickedRow?.FailedCount}</Col>
                  </Row>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <Row>
                    <Col lg={4}>
                      <b>Cancelled Count:</b>
                    </Col>
                    <Col lg={8}> {clickedRow?.CancelledCount}</Col>
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

export default ReportModalSubscription
