import React, { useState } from "react"
import { useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  Label,
} from "reactstrap"
import { fetchData } from "utils/Api"
import SabSathDefault from "assets/img/SabSathDefault.png"
import * as api from "utils/Api"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import {
  columns,
  PersInformation_Table_columns,
  FamilyInfo_Columns,
  EducationDetails_Columns,
  MedicalDetails_Columns,
  Guardian_Columns,
  MonthlyExpanse_Columns,
  Earnings_Columns,
  AssetInformation_Columns,
  LoanComatee_Columns,
  Pets_Columns,
  SourceofDrinkwater_Columns,
  PrimarySupport_Columns,
  SecondarySupport_Columns,
  ApprovalHistory_Columns,
  Approval_Columns,
  columns_PaymentSchedule,
  columns_PaymentHistory,
} from "utils/ApplicantHistoryColumns/ApplicantHistoryColumns.jsx"

const ApplicantHistoryModal = ({
  ApplicantCaseId,
  historyModal,
  setHistoryModal,
}) => {

  console.log("Checking history modal data", ApplicantCaseId )

  const [rows, setRows] = useState([])
  const [PersInformation_Table, setPersInformation_Table] = useState([])
  const [familyInformation_Table, setfamilyInformation_Table] = useState([])
  const [EducationDetails_Table, setEducationDetails_Table] = useState([])
  const [MedicalDetails_Table, setMedicalDetails_Table] = useState([])
  const [MonthlyExpDetails_Table, setMonthlyExpDetails_Table] = useState([])
  const [GuardiansDetails_Table, setGuardiansDetails_Table] = useState([])
  const [AssetsInformation_Table, setAssetsInformation_Table] = useState([])
  const [LoanComatee_Table, setLoanComatee_Table] = useState([])
  const [PetDetails_Table, setPetDetails_Table] = useState([])
  const [SourceofDWater_Table, setSourceofDWater_Table] = useState([])
  const [PrimarySupport_Table, setPrimarySupport_Table] = useState([])
  const [SecondarySupport_Table, setSecondarySupport_Table] = useState([])
  const [EarningDetails_Table, setEarningsDetails_Table] = useState([])
  const [Approvalshistory_Table, setApprovalshistory_Table] = useState([])
  const [Approvals_Table, setApprovals_Table] = useState([])

  const [PaymentHistory_Table, setPaymentHistory_Table] = useState([])
  const [PaymentSchedule_Table, setPaymentSchedule_Table] = useState([])
  const requestCall = () => {
    fetchData("Applicant", "GetApplicantCaseHistory", {
      OperationId: 1,
      ApplicantCase_InvestigationId: ApplicantCaseId,
    }).then((result) => {
      setRows(result?.DataSet?.Table)
      setPersInformation_Table(result?.DataSet?.Table1)
      setfamilyInformation_Table(result?.DataSet?.Table2)
      setEducationDetails_Table(result?.DataSet?.Table3)
      setMedicalDetails_Table(result?.DataSet?.Table4)
      setMonthlyExpDetails_Table(result?.DataSet?.Table5)
      setGuardiansDetails_Table(result?.DataSet?.Table6)
      setEarningsDetails_Table(result?.DataSet?.Table7)

      setAssetsInformation_Table(result?.DataSet?.Table8)
      setLoanComatee_Table(result?.DataSet?.Table9)
      setPetDetails_Table(result?.DataSet?.Table10)
      setSourceofDWater_Table(result?.DataSet?.Table11)

      setPrimarySupport_Table(result?.DataSet?.Table12)
      setSecondarySupport_Table(result?.DataSet?.Table13)

      setApprovalshistory_Table(result?.DataSet?.Table14)
      setApprovals_Table(result?.DataSet?.Table15)

      setPaymentHistory_Table(result?.DataSet?.Table16)
      setPaymentSchedule_Table(result?.DataSet?.Table17)
    })
  }

  const onView = (idx, row) => {
    localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId)

    localStorage.setItem("role", 0)

    window.open(
      "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
      "_blank"
    )
  }

  useEffect(() => {
    if (ApplicantCaseId) {
      requestCall()
    }
  }, [ApplicantCaseId])

  const toggleModal = () => {
    setHistoryModal(!historyModal)
  }

  return (
    <Modal
      isOpen={historyModal}
      toggle={toggleModal}
      size="xl"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        Applicant Case Wise History
      </ModalHeader>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Identification</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={3}>
              <img
                name="imgApplicant"
                alt=""
                src={
                  PersInformation_Table[0]?.ApplicantPhoto === null ||
                  PersInformation_Table[0]?.ApplicantPhoto === ""
                    ? SabSathDefault
                    : api.baseImageUrl +
                      PersInformation_Table[0]?.ApplicantPhoto
                }
                style={{
                  height: "130px",
                  width: "100%",
                  objectFit: "contain",
                  overflow: "hidden",
                  //marginLeft: "-55px",
                }}
              />
            </Col>

            <Col md={4}>
              <Label
                style={{
                  fontSize: 13,
                  marginBottom: 2,
                  color: "rgb(214, 11, 17)",
                  fontWeight: "500",
                }}
              >
                {"Applicant Name : "}
              </Label>
              <strong>{PersInformation_Table[0]?.ApplicantName}</strong>
              <br />
              <Label
                style={{
                  fontSize: 13,
                  marginBottom: 2,
                  color: "rgb(214, 11, 17)",
                  fontWeight: "500",
                }}
              >
                {"Applicant Case Code : "}
              </Label>
              <strong>
                {" " + PersInformation_Table[0]?.ApplicantCaseCode}
              </strong>{" "}
              <br />
              <Label
                style={{
                  fontSize: 13,
                  marginBottom: 2,
                  color: "rgb(214, 11, 17)",
                  fontWeight: "500",
                }}
              >
                {"CNIC : "}
              </Label>
              <strong>{" " + PersInformation_Table[0]?.CnicNo}</strong> <br />
              <Label
                style={{
                  fontSize: 13,
                  marginBottom: 2,
                  color: "rgb(214, 11, 17)",
                  fontWeight: "500",
                }}
              >
                {"Primary Contact # : "}
              </Label>
              <strong>
                {" " + PersInformation_Table[0]?.PrimaryContactNo}
              </strong>{" "}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">
            Applicant Personal Information
          </h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={PersInformation_Table}
                columns={PersInformation_Table_columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">
            Applicant Family Information
          </h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={familyInformation_Table}
                columns={FamilyInfo_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Education Details</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={EducationDetails_Table}
                columns={EducationDetails_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">
            Medical CARD / DISABILITY / DISEASE Details
          </h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={MedicalDetails_Table}
                columns={MedicalDetails_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Monthly Expense Details</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={MonthlyExpDetails_Table}
                columns={MonthlyExpanse_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Earning Details</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={EarningDetails_Table}
                columns={Earnings_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Guardians Details</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={GuardiansDetails_Table}
                columns={Guardian_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* <CardHeader className="mb-3">
      <h6 className="font-weight-bold mb-0">Additional Details</h6>
    </CardHeader> */}
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Asset Information</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={AssetsInformation_Table}
                columns={AssetInformation_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Loan/Comatee</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={LoanComatee_Table}
                columns={LoanComatee_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Pets Details</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={PetDetails_Table}
                columns={Pets_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Source of Drinking Water</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={SourceofDWater_Table}
                columns={SourceofDrinkwater_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Primary Support</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={PrimarySupport_Table}
                columns={PrimarySupport_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Secondary Support</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={SecondarySupport_Table}
                columns={SecondarySupport_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Approval History </h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={Approvalshistory_Table}
                columns={ApprovalHistory_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Approvals</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={Approvals_Table}
                columns={Approval_Columns}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Payment History</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={PaymentHistory_Table}
                columns={columns_PaymentHistory}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Payment Schedule</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                rows={PaymentSchedule_Table}
                columns={columns_PaymentSchedule}
                onView={onView}
                hideAction={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default ApplicantHistoryModal
