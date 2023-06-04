import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import Swal from "sweetalert2"
import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import { fetchData } from "utils/Api"
import { GetSetupMaster } from "utils/CommonMethods"
import { DataTableCustomStyles, PaymentMethod, SetupMasterIds } from "utils/Constants"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
const initialValues = {
  ApplicantCode: "",
  ApplicantCaseCode: "",
  ApplicantName: "",
  ApplicantCNIC: "",
  ReceiverName: "",
  ReceiverCNIC: "",
  ReceiverContactNumber: "",
  UploadReceipt: "",
  Remarks: "",
  PaymentListDetailId: 0,
  PaymentListStatusId: 0,
  PaymentListMasterId: 0,
  UserId: localStorage.getItem("UserId") ? localStorage.getItem("UserId") : 0,
  PrimaryFundCategoryId: 0,
  PaymentType: 0,
  PaymentStatusId: 0,
}

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

const PaymentDisbursed = (props) => {
  const initialColumns = [
    {
      name: "Payment Generate Date",
      selector: "PaymentGenerateDate",
      sortable: true,
      width: "150px",
      omit: false,
    },

    {
      name: "Voucher No",
      selector: "VoucherNo",
      width: "150px",
      sortable: true,
      omit: false,
    },

    {
      name: "Applicant Case Code",
      selector: "ApplicantCaseCode",
      width: "200px",
      sortable: true,
      omit: false,
    },
    {
      name: "Name",
      selector: "ApplicantName",
      sortable: true,
      width: "150px",
      omit: true,
    },

    {
      name: "CNIC No",
      selector: "CnicNo",
      sortable: true,
      width: "150px",
      omit: true,
    },
    {
      name: "City",
      selector: "City",
      sortable: true,
      width: "150px",
      omit: true,
    },

    {
      name: "Fund Category",
      selector: "FundCategory",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Fund Sub Category",
      selector: "FundSubCategory",
      width: "150px",
      sortable: true,
      omit: true,
    },
    {
      name: "Case Status",
      selector: "CaseStatus",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Total Approved Amount",
      selector: "CaseTotalAmountApproved",
      width: "150px",
      sortable: true,
      omit: true,
    },
    {
      name: "Balance Amount",
      selector: "CaseTotalAmountBalance",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Installment Amount",
      width: "150px",
      selector: "Case_Current_InstallmentAmount",
      sortable: true,
      omit: false,
    },
    {
      name: "Repetition",
      selector: "Repitation",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Frequency",
      selector: "Frequency",
      sortable: true,
      omit: false,
    },
    {
      name: "Payment Type",
      selector: "PaymentType",
      sortable: true,
      grow: 3,
      omit: false,
    },
    {
      name: "Payment Status",
      selector: "PaymentStatus",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Bank",
      selector: "BankName",
      width: "150px",
      sortable: true,
      omit: false,
    },

    {
      name: "Account Title",
      width: "150px",
      selector: "AccountTitle",
      sortable: true,
      omit: false,
    },

    {
      name: "Account No",
      selector: "AccountNumber",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Receiver CNIC No",
      width: "150px",
      selector: "PaymentCNICNo",
      sortable: true,
      omit: false,
    },
    {
      name: "Electronic Payment",
      selector: "PaymentGateway",
      width: "150px",
      sortable: true,
      omit: false,
    },
    {
      name: "Action",
      width: "190px",
      cell: (row) =>
        row.PaymentStatusId === PaymentMethod.ReadyToDisbursed ? (
          <FormGroup>
            <FormGroupButton
              color="primary"
              title="Disburse"
              onClick={() => onDisbursed(row)}
              className="disbursed-button"
            />
            <FormGroupButton
              color="primary1"
              title="Reverse"
              onClick={() => onReverse(row)}
              className="disbursed-button"
            />
          </FormGroup>
        ) : (
          ""
        ),
      omit: false,
    },
  ]
  const [formFields, setFormFields] = useState(initialValues)
  const [finalData, setFinalData] = useState(null)
  const [paymentListSummary, setPaymentListSummary] = useState([])
  const [isDisbursed, setIsDisbursed] = useState(false)
  const [isReversed, setIsReversed] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [applicantList, setApplicantList] = useState({})
  const [selectionList, setSelectionList] = useState({
    PaymentListStatus: [],
  })
  const [pending, setPending] = useState(false)

  const [PayStartDateEndDateList, setPayStartDateEndDateList] = useState([])

  const fetchPaymentData = async (para) => {
    setPending(true)
    fetchData("Payment", "Payment_List_Table", {
      OperationId: 7,
      para,
      // ...formFields,
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table)
      setFinalData({
        columns: initialColumns,
        data: result?.DataSet?.Table,
      })
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table1,
      })
      setPending(false)
    })
  }

  const categoryData = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          setCategoryList(data.data)
          return data
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

  const PaymentStartdateEndDateList = async (para) => {
    fetchData("Payment", "Payment_List_Table", {
      OperationId: 9,
      para,
    }).then((result) => {
      //console.log(result.DataSet.Table);
      setPayStartDateEndDateList(result?.DataSet?.Table)
    })
  }

  useEffect(() => {
    // fetchPaymentData()
    categoryData()
    PaymentStartdateEndDateList()
  }, [])

  const handleInputChange = (e) => {
    let { name, value } = e.target

    setFormFields({
      ...formFields,
      [name]: value,
    })
  }

  const searchListData = async () => {
    if (!formFields.PaymentListMasterId) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Select Payment Generated Date",
      })
    }

    setPending(true)
    fetchData("Payment", "Payment_List_Table", {
      OperationId: 7,
      ...formFields,
      PaymentListMasterId: formFields.PaymentListMasterId,
      UserId : localStorage.getItem("UserId") ? localStorage.getItem("UserId") : 0
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table)
      setFinalData({
        columns: initialColumns,
        data: result?.DataSet?.Table,
      })
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table1,
      })
      setPending(false)
    })
  }
  const cancelListData = async () => {
    setFormFields({
      ...initialValues,
    })

    var obj = { ...initialValues }
    setFinalData(null)
  }
  const onDisbursed = (data) => {
    setIsDisbursed(!isDisbursed)
    setApplicantList(data)
    setFormFields({
      ...formFields,
      PaymentListDetailId: data?.PaymentListDetailId,
      PaymentStatusId: 660,
    })
  }

  const onReverse = (data) => {
    setIsReversed(!isReversed)
    setApplicantList(data)
    setFormFields({
      ...formFields,
      PaymentListDetailId: data?.PaymentListDetailId,
      PaymentStatusId: 661,
    })
  }
  const submitDisbursed = async (e) => {
    e.preventDefault()
    requestCall(8, formFields)
  }
  const submitReversed = async (e) => {
    e.preventDefault()
    requestCall(8, formFields)
  }

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    fetchData("Payment", "Payment_List_Table", {
      OperationId: opId,
      ...payload,
    }).then((result) => {
      if (result?.DataSet?.Table2[0]?.HasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table2[0]?.Message,
          icon: "error",
        })
        // .then((result) => {
        //   if (result.isConfirmed) {
        //     setPaymentListSummary(result?.DataSet?.Table1);
        //   }
        // })
      } else {
        Swal.fire({
          title: "Success",
          text: result?.DataSet?.Table2[0]?.Message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      }
      setPaymentListSummary(result?.DataSet?.Table)
      setFinalData({
        columns: initialColumns,
        data: result?.DataSet?.Table,
      })

      setIsDisbursed(false)
      setIsReversed(false)
    })
  }

  return (
    <div className="content">
      <Row>
        <Col lg={12} md={12}>
          <Card className="card-user">
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Payment
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroupInput
                    label="Applicant Code"
                    name="ApplicantCode"
                    value={formFields.ApplicantCode}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Applicant Case Code"
                    name="ApplicantCaseCode"
                    value={formFields.ApplicantCaseCode}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Col>

                <Col md={3}>
                  <FormGroupInput
                    label="Applicant Name"
                    name="ApplicantName"
                    value={formFields.ApplicantName}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Col>

                <Col md={3}>
                  <FormGroupInput
                    label="Applicant CNIC"
                    name="ApplicantCNIC"
                    value={formFields.ApplicantCNIC}
                    onChange={handleInputChange}
                    required={true}
                    isNumber="true"
                  />
                </Col>
                <Col md={3}>
                  <FormGroupSelect
                    label="Fund Category"
                    name="PrimaryFundCategoryId"
                    value={formFields.PrimaryFundCategoryId}
                    onChange={handleInputChange}
                    list={categoryList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                  />
                </Col>
                <Col md={3}>
                  <FormGroupSelect
                    label="Payment Status"
                    name="PaymentStatusId"
                    value={formFields.PaymentStatusId}
                    onChange={handleInputChange}
                    list={selectionList.PaymentListStatus}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                  />
                </Col>
                <Col md={3}>
                  <FormGroupSelect
                    label="Payment Generated Date"
                    name="PaymentListMasterId"
                    value={formFields.PaymentListMasterId}
                    onChange={handleInputChange}
                    list={PayStartDateEndDateList}
                    fieldId="PaymentListMasterId"
                    fieldName="PayGeneratedDate"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} className="text-right">
                  <Button
                    color="primary"
                    size="sm"
                    className="mr-2"
                    type="button"
                    onClick={searchListData}
                  >
                    Search
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    type="button"
                    onClick={cancelListData}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12}>
          <Card className="card-user">
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Payment Summary
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12}>
                  <DataTableExtensions
                    {...finalData}
                    columns={initialColumns}
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
                      // onRowClicked={(r) => handleRowClicked(r)}
                      progressPending={pending}
                      fixedHeaderScrollHeight="auto"
                      subHeaderAlign="right"
                      subHeaderWrap
                      customStyles={DataTableCustomStyles}
                      paginationPerPage={50}
                      paginationRowsPerPageOptions={[50, 100, 150]}
                    />
                  </DataTableExtensions>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={isDisbursed}
        toggle={onDisbursed}
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={onDisbursed}>Payment Disbursement</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12} md={12}>
              <div
                className="card-header text-light mb-2"
                style={{ background: "#d60b11", fontWeight: "bold" }}
              >
                Applicant Details
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <td>Applicant Name</td>
                      <td>{applicantList?.ApplicantName}</td>
                    </tr>
                    <tr>
                      <td>Applicant CNIC</td>
                      <td>{applicantList?.CnicNo}</td>
                    </tr>
                    <tr>
                      <td>Applicant Case Code</td>
                      <td>{applicantList?.ApplicantCaseCode}</td>
                    </tr>
                    <tr>
                      <td>Case Status</td>
                      <td>{applicantList?.CaseStatus}</td>
                    </tr>
                    <tr>
                      <td>Fund Category</td>
                      <td>{applicantList?.FundCategory}</td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <form onSubmit={submitDisbursed}>
            <Row>
              <Col lg={12} md={12}>
                <div
                  className="card-header text-light mb-2"
                  style={{ background: "#d60b11", fontWeight: "bold" }}
                >
                  Disburse
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroupInput
                  label="Receiver Name*"
                  name="ReceiverName"
                  onChange={handleInputChange}
                  value={formFields.ReceiverName}
                  required={true}
                />
              </Col>
              <Col md={6}>
                <FormGroupInput
                  label="Receiver Cnic*"
                  name="ReceiverCNIC"
                  onChange={handleInputChange}
                  value={formFields.ReceiverCNIC}
                  required={true}
                  isNumber="true"
                  maxLength="13"
                  placeholder="xxxxxxxxxxxxx"
                />
              </Col>
              <Col md={6}>
                <FormGroupInput
                  label="Receiver Contact#*"
                  name="ReceiverContactNumber"
                  onChange={handleInputChange}
                  value={formFields.ReceiverContactNumber}
                  required={true}
                  isNumber="true"
                  maxLength="11"
                />
              </Col>
              {/* <Col md={6}>
              <FormGroupInput 
                  label="Upload Receipt"
                  name="UploadReceipt"
                  type="file"
                  onChange={handleInputChange}
                  value={formFields.UploadReceipt}
                  />
              </Col> */}
              <Col md={12}>
                <FormGroupInput
                  label="Remarks"
                  name="Remarks"
                  onChange={handleInputChange}
                  value={formFields.Remarks}
                />
              </Col>
              <Col className="text-right" md={12}>
                <FormGroupButton title="Submit" />
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={isReversed} toggle={onReverse} size="lg" backdrop="static">
        <ModalHeader toggle={onReverse}>Payment Reversed</ModalHeader>
        <ModalBody>
          <form onSubmit={submitReversed}>
            <Row>
              <Col lg={12} md={12}>
                <div
                  className="card-header text-light mb-2"
                  style={{ background: "#d60b11", fontWeight: "bold" }}
                >
                  Applicant Details
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Applicant Name</td>
                        <td>{applicantList?.ApplicantName}</td>
                      </tr>
                      <tr>
                        <td>Applicant Case Code</td>
                        <td>{applicantList?.ApplicantCaseCode}</td>
                      </tr>
                      <tr>
                        <td>Case Status</td>
                        <td>{applicantList?.CaseStatus}</td>
                      </tr>
                      <tr>
                        <td>Fund Category</td>
                        <td>{applicantList?.FundCategory}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12}>
                <div
                  className="card-header text-light mb-2"
                  style={{ background: "#d60b11", fontWeight: "bold" }}
                >
                  Reverse
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroupInput
                  label="Remarks"
                  name="Remarks"
                  onChange={handleInputChange}
                  value={formFields.Remarks}
                  required={true}
                />
              </Col>
              <Col className="text-right" md={12}>
                <FormGroupButton title="Submit" />
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default PaymentDisbursed
