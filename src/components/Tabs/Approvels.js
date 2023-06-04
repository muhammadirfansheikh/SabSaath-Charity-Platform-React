import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
} from "reactstrap"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import {
  getCurrentDate,
  getDateMDY,
  GetSetupMaster,
} from "../../utils/CommonMethods.js"
import { Roles, SetupMasterIds, CaseStatuses } from "../../utils/Constants.js"
import * as api from "../../utils/Api.js"
import Swal from "sweetalert2"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx"
import { fetchData } from "utils/Api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
} from "utils/CommonMethods"
import moment, { min, parseZone } from "moment"
import ModalBasicInfo from "components/modal/ModalBasicInfo.js"

const Approvels = ({ state }) => {
  let my_url = window.location.href.split("/")
  const id = my_url[my_url.length - 1] // localStorage.getItem('ACIid')
  // const { id } = useParams();
  const RoleId = localStorage.getItem("RoleId")
  var UserId = localStorage.getItem("UserId")
  var UserIp = localStorage.getItem("UserIP")

  let initialValuesPrimary = {
    CaseStatus: "0",
    CaseRemarks: "",
    FundRequired: "0",
    ApprovedFundPercent: "0",
    ApprovedFundAmount: "0",
    CaseSupportStatus: "0",
    Remarks: "",
    PaymentStartDateT: new Date(),
    PaymentTypeT: "0",
    // IsBlackList: false,
    // CaseStartDate: "",
  }

  const [caseStatusDDL, setCaseStatusDDL] = useState([])
  const [supportStatusDDL, setSupportStatusDDL] = useState([])
  const [PhysicalAuditorDDL, setPhysicalAuditorDDL] = useState([])
  const [PaymentTypeDDL, setPaymentTypeDDL] = useState([])

  const [selectedCaseStatusId, setSelectedCaseStatusId] = useState(0)
  const [selectedPhysicalAuditor, setselectedPhysicalAuditor] = useState(0)
  const [selectedPrimarySupportStatusId, setSelectedPrimaryupportStatusId] =
    useState(0)
  const [valuesPrimary, setValuesPrimary] = useState(initialValuesPrimary)
  const [primarySupportList, setPrimarySupportList] = useState([])
  const [selectedCaseRemarks, setSelectedCaseRemarks] = useState("")
  const [caseStatusList, setCaseStatusList] = useState([])
  const [showPriPanel, setshowPriPanel] = useState(true)
  const [showCasePanel, setshowCasePanel] = useState(true)
  const [isBlackList, setIsBlackList] = useState(false)
  const [caseStartDate, setCaseStartDate] = useState("")
  const [showCaseStartDate, setShowCaseStartDate] = useState(true)
  const [ModalPhysicalHistory, setModalPhysicalHistory] = useState(false)
  const [primarySupportdetailshow, setprimarySupportdetailshow] = useState([])
  const [isProbation, setisProbation] = useState(false)
  const [PhysicalAudit, setPhysicalAudit] = useState(false)
  const [Lstatusid, setLstatusid] = useState()
  const [paymentListSummary, setPaymentListSummary] = useState([])
  const [isPhysicalAudit, setIsPhysicalAudit] = useState(null)

  const data = []
  const [ButtonPhysicalAuditHistory, setButtonPhysicalAuditHistory] =
    useState(false)

  const HandlePhysicalHistory = () => {
    setModalPhysicalHistory(true)
  }

  const handleCloseModal = () => {
    setModalPhysicalHistory(false)
  }

  const validate = () => {
    let msg = ""
    if (PhysicalAudit === true) {
      if (selectedPhysicalAuditor === 0) {
        msg = "Please select Physical auditor"
      }
    }

    // const onView = () => {
    //   //console.log(row);
    // }
    if (showCaseStartDate && parseInt(RoleId) === parseInt(Roles.Trustee)) {
      if (
        parseInt(selectedCaseStatusId) ===
        parseInt(CaseStatuses.Approved_Trustee)
      ) {
        if (caseStartDate === "") {
          msg = "Please enter the payment start date"
        }
      }
    }

    if (!showPriPanel) {
      if (parseInt(selectedCaseStatusId) === 0) {
        msg = "please select case status"
      }
    } else {
      if (parseInt(selectedCaseStatusId) === 0) {
        msg = "please select case status"
      } else {
        var filterArr = primarySupportList.filter(
          (data) => data.CaseSupportStatus === 0
        )

        if (filterArr.length > 0) {
          msg = "please select support status"
        } else {
          var filterArrApproved = primarySupportList.filter(
            (data) =>
              parseInt(data.CaseSupportStatus) ===
              parseInt(SetupMasterIds.CaseSupportStatusApproved)
          )

          primarySupportList.map((row) => {
            let number = Number.isNaN(
              row.FundCategoryAmountApproved &&
                msg === "" &&
                row.CaseSupportStatus === 415 &&
                msg === ""
            )

            if (number == true && row.CaseSupportStatus == 415) {
              msg = "Please enter the approved amount for support eeee"
            }

            if (
              row.FundCategoryAmountApproved == 0 &&
              row.CaseSupportStatus == 415 &&
              msg === ""
            ) {
              //415 Approved id
              msg = "Please enter the approved amount for support"
            }
          })

          if (
            parseInt(selectedCaseStatusId) ===
            parseInt(CaseStatuses.Approved_Trustee)
          ) {
            if (
              parseInt(RoleId) === parseInt(Roles.Trustee) ||
              parseInt(RoleId) === parseInt(Roles.HOD)
            ) {
              primarySupportList.map((row) => {
                if (
                  (row.CaseSupportStatus == 415 &&
                    row.PaymentTypeT == -1 &&
                    msg === "") ||
                  (row.CaseSupportStatus == 415 &&
                    row.PaymentTypeT == 0 &&
                    msg === "") ||
                  (row.CaseSupportStatus == 415 &&
                    row.PaymentTypeT == null &&
                    msg === "")
                ) {
                  msg = "Please select Payment Type"
                }
              })
            }
          }
        }
      }
    }

    return msg
  }

  const fetchAuditListData = async () => {
    let ApplicantCase_InvestigationId = id

    fetchData("Applicant", "Get_Physical_Audit_List", {
      OperationId: 1,
      ApplicantCase_InvestigationId,
      // CreatedDateFrom: formFields.CreatedDateFrom,
      // CreatedDateTo: formFields.CreatedDateTo,
    }).then((result) => {
      result?.DataSet?.Table2.length > 0
        ? setIsPhysicalAudit({
            ...result?.DataSet?.Table2[0],
            fromDB: true,
          })
        : setIsPhysicalAudit(null)
      if (result?.DataSet?.Table1.length != 0) {
        setButtonPhysicalAuditHistory(true)
        setPaymentListSummary(result?.DataSet?.Table1)
      } else {
        setButtonPhysicalAuditHistory(false)
      }

      let AuditInvId = paymentListSummary.filter(
        (item) => item.status == "open"
      )

      // setSelectionList({
      //   ...selectionList,
      //   PaymentListStatus: result?.DataSet?.Table,
      // });
    })
  }

  const onSubmit = () => {
    var msg = validate()

    if (msg === "") {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Are you sure to submit the record?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#2f4050",
        confirmButtonText: `Confirm`,
        confirmButtonColor: "#bf1e2e",
      }).then((result) => {
        if (result.isConfirmed) {
          SaveGetStatus(2).then((result) => {
            //if (result !== undefined) {
            if (result?.data?.DataSet?.Table[0]?.HasError > 0) {
              Swal.fire({
                title: "Error",
                text: result?.data?.DataSet?.Table[0]?.Message,
                icon: "error",
              })
            } else {
              Swal.fire({
                title: "Success",
                text: result?.data?.DataSet?.Table[0]?.Message,
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.open("/admin/ApplicantListing", "_Self")
                }
              })

              if (result?.data?.DataSet?.Table[0]?.Message !== "") {
                setshowPriPanel(false)
                setshowCasePanel(false)

                setCaseStatusList(result?.data?.DataSet?.Table1)
              }
            }
          })
        }
      })
    } else {
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      })
    }
  }

  const SaveGetStatus = async (opId) => {
    var arr = []
    if (opId > 1) {
      primarySupportList.map((row) => {
        if (
          row.CaseSupportStatus !== 0 &&
          parseInt(row.CaseSupportStatus) ===
            SetupMasterIds.CaseSupportStatusApproved
        ) {
          arr.push({
            ApplicantCaseSupportId: row.ApplicantCaseSupportId,
            AmountApproved: parseFloat(row.FundCategoryAmountApproved),
            Remarks: "",
            SupportStatusId: parseInt(row.CaseSupportStatus),
            PaymentStartDateT:
              row.PaymentStartDateT == "0" ? null : row.PaymentStartDateT,
            PaymentTypeID: parseInt(row.PaymentTypeT),
            ApplicantCaseSupportDetailId: row.ApplicantCaseSupportDetailId,
            PhysicalAudit: PhysicalAudit === true ? true : false,
            Physical_Audit_Assign:
              selectedPhysicalAuditor === 0 ? 0 : selectedPhysicalAuditor,
          })
        }
      })

      if (parseInt(selectedCaseStatusId) > 0 && arr.length > 0) {
        return await api.postRecord(
          `applicant`,
          `ApplicantCase_StatusHistory`,
          {
            OperationId: opId,
            ApplicantCase_InvestigationId: id,
            CaseStatusId: selectedCaseStatusId,
            Remarks: selectedCaseRemarks,
            UserIP: UserIp,
            UserId: UserId,
            ArrayApplicantCaseSupportHistory: arr,
            IsBlackList: isBlackList,
            CaseStartDate: caseStartDate,
            IsProbation: isProbation,
            PhysicalAudit: PhysicalAudit === true ? true : false,
            Physical_Audit_Assign:
              selectedPhysicalAuditor === 0 ? 0 : selectedPhysicalAuditor,
          }
        )
      } else if (parseInt(selectedCaseStatusId) > 0 && arr.length === 0) {
        //if (!showPriPanel)
        //{
        return await api.postRecord(
          `applicant`,
          `ApplicantCase_StatusHistory`,
          {
            OperationId: opId,
            ApplicantCase_InvestigationId: id,
            CaseStatusId: selectedCaseStatusId,
            Remarks: selectedCaseRemarks,
            UserIP: UserIp,
            UserId: UserId,
            ArrayApplicantCaseSupportHistory: [],
            IsBlackList: isBlackList,
            CaseStartDate: caseStartDate,
            PhysicalAudit: PhysicalAudit,
            Physical_Audit_Assign: selectedPhysicalAuditor,
          }
        )
        //}
      }
    } else {
      return await api.postRecord(`applicant`, `ApplicantCase_StatusHistory`, {
        OperationId: opId,
        ApplicantCase_InvestigationId: id,
        CaseStatusId: selectedCaseStatusId,
        Remarks: selectedCaseRemarks,
        UserIP: UserIp,
        UserId: UserId,
        ArrayApplicantCaseSupportHistory: arr,
        IsBlackList: isBlackList,
        CaseStartDate: caseStartDate,
        PhysicalAudit: PhysicalAudit,
        Physical_Audit_Assign: selectedPhysicalAuditor,
      })
    }
  }

  const statusColumn = [
    {
      field: "ActionBy",
      name: "Action By",
    },
    {
      field: "Status",
      name: "Status",
    },
    {
      field: "AmountApproved",
      name: "Amount Approved",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
    {
      field: "Investigator",
      name: "Investigator",
    },
    {
      field: "CreatedDate",
      name: "Date",
    },
  ]

  const showColumns = [
    {
      field: "FamilyMember",
      name: "FamilyMember",
    },
    {
      field: "Relation",
      name: "Self/Relation",
    },
    {
      field: "FundCategory",
      name: "Fund Category",
    },
    {
      field: "FundSubCategory",
      name: "Fund Sub Category",
    },

    {
      field: "AmountApproved",
      name: "Fund Approved",
    },

    {
      field: "ApprovedFundPercent",
      name: "%age",
    },

    {
      field: "Frequency",
      name: "Frequency",
    },

    {
      field: "TotalAmount",
      name: "Total Amount",
    },

    {
      field: "Months",
      name: "No Of Month",
    },
  ]

  const GetCaseStatus = async (e) => {
    api
      .postRecord(
        `Setup`,
        `Get_Case_Status_By_Role_Map?UserId=${UserId}&ApplicantCase_InvestigationId=${id}`,
        null
      )
      .then((result) => {
        if (result?.data?.ResponseMessage === "Success") {
          if (result?.data?.DataSet?.Table !== null) {
            setCaseStatusDDL(result?.data?.DataSet?.Table)
            setPhysicalAuditorDDL(result?.data?.DataSet?.Table1)
          }
        }
      })
  }

  const GetSupportStatus = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.SupportStatus, 0, "", 0)

    setSupportStatusDDL(data.data)
  }

  const GetPaymentType = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.PaymentTypeDetail, 0, "", 0)

    setPaymentTypeDDL(data.data)
  }

  React.useEffect(() => {
    let newDate = new Date()
    setCaseStartDate(newDate)
    const fetchSupportData = () => {
      api
        .postRecord(`applicant`, `GetCaseSupportData?Id=${id}`, null)
        .then((result) => {
          if (result?.data.ResponseMessage !== "Success") {
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            })
            return
          }

          if (result.data.Data != null) {
            const resultFin = result?.data?.Data.map((res) => {
              return {
                ...res,
                PaymentStartDateT:
                  res?.PaymentStartDateT || getDateMDY(Date.now()),
              }
            })
            if (result?.data?.Data) {
              setPrimarySupportList([...resultFin])
            }
          }
        })
    }
    fetchAuditListData()
    const primarySupportDetailShow = () => {
      api
        .postRecord(`applicant`, `Get_PrimarySupportDetailShow?Id=${id}`, null)
        .then((result) => {
          if (result?.data.ResponseMessage !== "Success") {
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            })
            return
          }
          if (result?.data?.DataSet != null) {
            setprimarySupportdetailshow(result?.data?.DataSet?.Table)
          }
        })
    }

    GetCaseStatus()
    GetSupportStatus()
    GetPaymentType()
    fetchSupportData()
    primarySupportDetailShow()

    if (RoleId == parseInt(Roles.Trustee)) {
      setSelectedCaseStatusId(CaseStatuses.Approved_Trustee)
    } else if (RoleId == parseInt(Roles.HOD)) {
      setSelectedCaseStatusId(CaseStatuses.Submitted_HOD)
    }

    if (RoleId === Roles.InvestigatingOfficer.toLocaleString()) {
      setshowPriPanel(false)
      setshowCasePanel(true)
    } else {
      setshowPriPanel(true)
      setshowCasePanel(true)
    }

    SaveGetStatus(1).then((result) => {
      if (result?.data?.DataSet?.Table !== null) {
        setCaseStatusList(result?.data?.DataSet?.Table)

        setShowCaseStartDate(
          result?.data?.DataSet?.Table[0].PaymentSchedule_Count > 0
            ? false
            : true
        )

        if (result?.data?.DataSet?.Table.length === 1) {
          setshowPriPanel(false)
          setshowCasePanel(true)
        } else {
          if (
            result?.data?.DataSet?.Table[
              result?.data?.DataSet?.Table.length - 1
            ].IsTransaction === 1
          ) {
            setshowPriPanel(false)
            setshowCasePanel(false)

            if (parseInt(RoleId) === parseInt(Roles.Trustee)) {
              setshowPriPanel(false)
              setshowCasePanel(true)
            }
          }
        }
      }
      panelSettings(
        result?.data?.DataSet?.Table[result?.data?.DataSet?.Table.length - 1]
          .CaseStatusId,
        result?.data?.DataSet?.Table[0].PaymentSchedule_Count
      )
    })
  }, [])

  function panelSettings(lastStatusId, paymentScheduleCount) {
    setLstatusid(lastStatusId)

    setshowPriPanel(false)
    setshowCasePanel(false)

    if (parseInt(lastStatusId) === parseInt(CaseStatuses.Unassigned)) {
      setshowPriPanel(true)
      setshowCasePanel(true)
      if (parseInt(RoleId) === parseInt(Roles.InvestigatingOfficer)) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Assigned_Investigator)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.InvestigatingOfficer)) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      } else if (
        parseInt(RoleId) === parseInt(Roles.HOD) ||
        parseInt(RoleId) === parseInt(Roles.Trustee)
      ) {
        setshowPriPanel(true)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Submitted_Investigator)
    ) {
      if (
        parseInt(RoleId) === parseInt(Roles.HOD) ||
        parseInt(RoleId) === parseInt(Roles.Trustee)
      ) {
        setshowPriPanel(true)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Submitted_HOD)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.Trustee)) {
        setshowPriPanel(true)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Objection_HOD)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.InvestigatingOfficer)) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Objection_Trustee)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.HOD)) {
        setshowPriPanel(true)
        setshowCasePanel(true)
      } else if (parseInt(RoleId) === parseInt(Roles.InvestigatingOfficer)) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Approved_Trustee)
    ) {
      if (
        parseInt(RoleId) === parseInt(Roles.Accounts) ||
        parseInt(RoleId) === parseInt(Roles.Audit)
      ) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Objection_Accounts) ||
      parseInt(lastStatusId) === parseInt(CaseStatuses.Objection_Auditor)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.HOD)) {
        setshowPriPanel(true)
        setshowCasePanel(true)
      }
    } else if (
      parseInt(lastStatusId) === parseInt(CaseStatuses.Case_Hold_Trustee)
    ) {
      if (parseInt(RoleId) === parseInt(Roles.Trustee)) {
        setshowPriPanel(false)
        setshowCasePanel(true)
      }
    }

    if (paymentScheduleCount > 0) {
      setshowPriPanel(false)
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target

    if (e.target.type === "select-one") {
      // if (Role.Physical_Auditor){
      if (e.target.name === "PhysicalAuditor") {
        setPhysicalAudit(true)
        setselectedPhysicalAuditor(e.target.value)
      }
    }
  }

  const columns = [
    {
      name: "Assignment Date",
      field: "AssignDate",
    },
    {
      name: "Start Date",
      field: "StartDate",
    },
    {
      name: "Closed Date",
      field: "CloseDate",
    },
    {
      name: "Audit Status",
      field: "AuditStatus",
    },
    {
      name: "Auditor",
      field: "Auditor",
    },
    {
      name: "Case Code",
      field: "CaseCode",
    },
    {
      name: "Applicant Cnic",
      field: "ApplicantCnic",
    },
    {
      name: "Applicant Name",
      field: "ApplicantName",
    },
    {
      name: "Physical Auditor Remarks",
      field: "PhysicalAuditorRemarks",
    },
    {
      name: "Trustee Remarks",
      field: "TrusteeRemarks",
    },
  ]

  const handleInputChangePrimary = (e) => {
    let { name, value } = e.target
    if (e.target.type === "select-one") {
      if (e.target.name === "CaseStatus") {
        console.log(e.target.value)
        setSelectedCaseStatusId(e.target.value)
      }

      if (e.target.name === "CasePrimarySupportStatus") {
        setSelectedPrimaryupportStatusId(e.target.value)
      }
    }

    if (e.target.name === "ApprovedFundPercent") {
      if (value <= 100) {
        let calcAmount = Math.Round((valuesPrimary.FundRequired * value) / 100)

        setValuesPrimary({
          ...valuesPrimary,
          [name]: value,
          ApprovedFundAmount: calcAmount,
        })
      }
    } else if (e.target.name === "ApprovedFundAmount") {
      if (value <= valuesPrimary.FundRequired) {
        let calcAmount = Math.Round((value * 100) / valuesPrimary.FundRequired)

        setValuesPrimary({
          ...valuesPrimary,
          [name]: value,
          ApprovedFundPercent: calcAmount,
        })
      }
    } else if (e.target.name === "CaseRemarks") {
      setSelectedCaseRemarks(e.target.value)
    } else if (e.target.name === "IsBlackList") {
      setSelectedCaseRemarks(e.target.value)
    } else if (e.target.name === "CaseStartDate") {
      setCaseStartDate(e.target.value)
    } else {
      setValuesPrimary({
        ...valuesPrimary,
        [name]: value,
      })
    }
  }

  const handleCheckedValue = (e, index) => {
    //console.log(e.target.name, e.target.value, "show");
    if (e.target.name === "FundCategoryAmountApproved") {
      if (
        parseFloat(primarySupportList[index]["FundRequired"]) >=
        parseFloat(e.target.value)
      ) {
        primarySupportList[index][e.target.name] = e.target.value

        let percent =
          (parseFloat(e.target.value) * 100) /
          parseFloat(primarySupportList[index]["FundRequired"])
        //  console.log(percent,"First")
        primarySupportList[index]["ApprovedFundPercent"] = percent

        setPrimarySupportList([...primarySupportList])
      }
    } else if (e.target.name === "ApprovedFundPercent") {
      let arr = primarySupportList
      if (e.target.value === "") {
        arr[index].CaseSupportStatus = SetupMasterIds.CaseSupportStatusReject
      } else {
        arr[index].CaseSupportStatus = SetupMasterIds.CaseSupportStatusApproved
      }
      setPrimarySupportList([...arr])
      if (parseFloat(e.target.value === "" ? 0 : e.target.value) <= 100) {
        primarySupportList[index][e.target.name] = e.target.value

        let amt =
          (parseFloat(primarySupportList[index]["FundRequired"]) / 100) *
          parseFloat(primarySupportList[index]["ApprovedFundPercent"])
        // console.log(parseFloat(amt),"second")
        primarySupportList[index]["FundCategoryAmountApproved"] = amt

        setPrimarySupportList([...primarySupportList])
      }
    } else if (e.target.name === "CaseSupportStatus") {
      if (
        parseInt(e.target.value) ===
        parseInt(SetupMasterIds.CaseSupportStatusReject)
      ) {
        primarySupportList[index]["FundCategoryAmountApproved"] = "0"
        primarySupportList[index]["ApprovedFundPercent"] = "0"

        primarySupportList[index][e.target.name] = e.target.value
        setPrimarySupportList([...primarySupportList])
      } else {
        primarySupportList[index][e.target.name] = e.target.value

        setPrimarySupportList([...primarySupportList])
      }
    } else {
      primarySupportList[index][e.target.name] = e.target.value

      setPrimarySupportList([...primarySupportList])
    }
  }
  const AllDateSet = (event, type) => {
    if (type === "CaseStartDate") {
      setCaseStartDate(event)
    }
  }
  function CaseApprovalPanel() {
    return (
      <>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Case Approval</h6>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="InputState">Case Status</Label>
                    <Input
                      id="ddlCaseStatus"
                      name="CaseStatus"
                      type="select"
                      value={selectedCaseStatusId}
                      onChange={handleInputChangePrimary}
                    >
                      <option key={0} value={0}>
                        Select
                      </option>
                      {caseStatusDDL.map((item, key) => (
                        <option
                          key={item.SetupDetailName}
                          value={item.SetupDetailId}
                        >
                          {item.SetupDetailName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>

                {parseInt(RoleId) === parseInt(Roles.Trustee) ||
                parseInt(RoleId) === parseInt(Roles.HOD) ? (
                  <>
                    {showCaseStartDate ||
                    parseInt(Lstatusid) ===
                      parseInt(CaseStatuses.Case_Hold_Trustee) ? (
                      <Col md={3} style={{ display: "none" }}>
                        <FormGroup>
                          <Label for="">Payment Start Date</Label>
                          <DatePicker
                            value={getDate(caseStartDate, "/")}
                            dateFormat={dateFormat}
                            onChange={(e) => AllDateSet(e, "CaseStartDate")}
                            className="form-control"
                            name="CaseStartDate"
                            placeholderText={dateFormatPlaceholder}
                            // minDate={Date.now()} -- SSO-136 as per ZarNabi sab
                            showYearDropdown
                          />
                        </FormGroup>
                      </Col>
                    ) : null}
                    {parseInt(RoleId) === parseInt(Roles.HOD) ||
                    parseInt(RoleId) === parseInt(Roles.Trustee) ? (
                      <Col md={3}>
                        <FormGroupCheckbox
                          label="Mark as BlackList"
                          name="IsBlackList"
                          value={isBlackList}
                          onChange={() => setIsBlackList(!isBlackList)}
                        />
                      </Col>
                    ) : null}

                    {parseInt(RoleId) === parseInt(Roles.HOD) ||
                    parseInt(RoleId) === parseInt(Roles.Trustee) ? (
                      <Col md={3}>
                        <FormGroupCheckbox
                          label="Mark as Probation"
                          name="IsProbation"
                          value={isProbation}
                          onChange={() => setisProbation(!isProbation)}
                        />
                      </Col>
                    ) : null}
                    {ButtonPhysicalAuditHistory === true ? (
                      <Col md={3}>
                        <FormGroup>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={HandlePhysicalHistory}
                          >
                            Physical Audit History
                          </Button>
                        </FormGroup>
                      </Col>
                    ) : null}
                  </>
                ) : null}

                {
                  // PhysicalAudit == true &&
                  <>
                    {parseInt(RoleId) === parseInt(Roles.Trustee) ? (
                      <Col md={3}>
                        <FormGroupCheckbox
                          //disabled={row.status == "open"}
                          label="Physical Audit"
                          name="PhysicalAudit"
                          value={isPhysicalAudit?.IsPhysicalAudit}
                          disabled={
                            isPhysicalAudit && isPhysicalAudit.fromDB
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            // console.log("Physical Audit", v)

                            !isPhysicalAudit && !isPhysicalAudit?.fromDB
                              ? setIsPhysicalAudit({
                                  IsPhysicalAudit:
                                    isPhysicalAudit?.IsPhysicalAudit
                                      ? !isPhysicalAudit.IsPhysicalAudit
                                      : true,
                                })
                              : setIsPhysicalAudit({
                                  ...isPhysicalAudit,
                                  IsPhysicalAudit:
                                    isPhysicalAudit?.IsPhysicalAudit
                                      ? !isPhysicalAudit.IsPhysicalAudit
                                      : true,
                                })
                          }}
                        />
                      </Col>
                    ) : null}
                  </>
                }

                {isPhysicalAudit?.IsPhysicalAudit === true && (
                  <>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="InputState">Physical Auditor*</Label>
                        <Input
                          id="ddlPhysicalAuditor"
                          name="PhysicalAuditor"
                          type="select"
                          disabled={isPhysicalAudit?.fromDB ? true : false}
                          value={isPhysicalAudit.PhysicalAuditor}
                          onChange={handleInputChange}
                          required={true}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          {isPhysicalAudit?.PhysicalAuditor ? (
                            <option value={isPhysicalAudit.PhysicalAuditor}>
                              {isPhysicalAudit.Name}
                            </option>
                          ) : PhysicalAuditorDDL !== undefined ? (
                            PhysicalAuditorDDL.map((item, key) => (
                              <option key={item.UserId} value={item.UserId}>
                                {item.Name}
                              </option>
                            ))
                          ) : (
                            <option value={12}>abc</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                  </>
                )}

                {caseStatusDDL.length > 0 ? (
                  <Col md={12}>
                    <FormGroup>
                      <Label for="">Remarks</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="txtCaseRemarks"
                        name="CaseRemarks"
                        value={selectedCaseRemarks}
                        onChange={handleInputChangePrimary}
                      />
                    </FormGroup>
                  </Col>
                ) : null}
              </Row>
              {caseStatusDDL.length > 0 ? (
                <Row form>
                  <Col md={12} className="text-right">
                    <FormGroup>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => onSubmit()}
                      >
                        Submit
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              ) : null}
            </Form>
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <div>
      {showPriPanel === true ? (
        <>
          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Case Support Approval</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12}>
                  <Table bordered striped responsive>
                    <thead>
                      <tr>
                        <th>Sr #</th>
                        <th>Id</th>
                        <th>Support</th>
                        <th>Fund Category</th>
                        <th>Fund Sub Category</th>
                        <th>Family Member Name</th>
                        <th>Fund Required Amount</th>
                        <th>Fund Approved Percentage</th>
                        <th>Fund Approved</th>
                        <th>Status</th>
                        <th>Payment Start Date</th>
                        <th>Payment Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {primarySupportList.map((item, index) => {
                        return (
                          // (item.CaseSupportStatus =  parseInt(415)),
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.ApplicantCaseSupportDetailId}</td>
                            <td>
                              {item.IsPrimarySupport === false
                                ? "Secondary"
                                : "Primary"}
                            </td>
                            <td>{item.FundCategory}</td>
                            <td>{item.FundSubCategory}</td>
                            <td>{item.FamilyMemberName}</td>
                            <td>{item.FundRequired}</td>
                            <td>
                              <FormGroupInput
                                name="ApprovedFundPercent"
                                //  value={item.ApprovedFundPercent}
                                value={
                                  parseInt(RoleId) ===
                                    parseInt(Roles.Trustee) &&
                                  item.ApprovedFundPercent == 0.0 &&
                                  item.ApprovedFundAmount == 0
                                    ? 0
                                    : item.ApprovedFundPercent
                                }
                                // required={true}
                                onChange={(e) => {
                                  handleCheckedValue(e, index)
                                }}
                                isNumber="true"
                              />
                            </td>
                            <td>
                              <FormGroupInput
                                name="FundCategoryAmountApproved"
                                value={
                                  parseInt(RoleId) ===
                                    parseInt(Roles.Trustee) &&
                                  item.ApprovedFundPercent == 0.0 &&
                                  item.ApprovedFundAmount == 0
                                    ? 0
                                    : item.FundCategoryAmountApproved
                                }
                                // value={item.FundCategoryAmountApproved}
                                onChange={(e) => handleCheckedValue(e, index)}
                                isNumber="true"
                              />
                            </td>
                            <td>
                              {/* <FormGroupSelect
                              name="CaseSupportStatus"
                              value={parseInt(RoleId) === parseInt(Roles.Trustee) && item.ApprovedFundPercent == 0.0000000000000000 && item.ApprovedFundAmount == 0 ? SetupMasterIds.CaseSupportStatusReject : item.CaseSupportStatus }
                              onChange={(e) => handleCheckedValue(e, index)}
                              list={supportStatusDDL}
                              fieldId="SetupDetailId"
                              fieldName="SetupDetailName"
                              required={true}
                            /> */}

                              <FormGroup>
                                <Input
                                  id="exampleSelect"
                                  name="CaseSupportStatus"
                                  type="select"
                                  value={
                                    parseInt(RoleId) ===
                                      parseInt(Roles.Trustee) &&
                                    item.ApprovedFundPercent == 0.0 &&
                                    item.ApprovedFundAmount == 0
                                      ? SetupMasterIds.CaseSupportStatusReject
                                      : item.CaseSupportStatus
                                  }
                                  onChange={(e) => handleCheckedValue(e, index)}
                                  disabled={
                                    parseInt(RoleId) ===
                                      parseInt(Roles.Trustee) &&
                                    item.ApprovedFundPercent == 0.0 &&
                                    item.ApprovedFundAmount == 0
                                  }
                                >
                                  {supportStatusDDL.map((item, key) => (
                                    <option
                                      key={key}
                                      value={item.SetupDetailId}
                                    >
                                      {item.SetupDetailName}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </td>

                            <td>
                              {/* <FormGroup> */}

                              {/* <DatePicker
                                  value={item?.PaymentStartDateT}
                                  dateFormat={dateFormat}
                                  onChange={(e) => AllDateSet(e, "CaseStartDate")}
                                  className="form-control"
                                  name="CreatedDateFrom"
                                  placeholderText={dateFormatPlaceholder}
                                   required={true}
                                  showYearDropdown
                                />  */}
                              <Input
                                type="date"
                                className="form-control"
                                name="PaymentStartDateT"
                                id="Date"
                                value={item?.PaymentStartDateT}
                                // min={new Date().toISOString().split("T")[0]} sso_135 as per zar Nabi
                                onChange={(e) => {
                                  handleCheckedValue(e, index)
                                }}
                              />
                              {/* </FormGroup> */}
                            </td>
                            <td>
                              {/* <FormGroupSelect
                                name="PaymentTypeT"
                                value={item.PaymentTypeT}
                                onChange={(e) => handleCheckedValue(e, index)}
                                list={PaymentTypeDDL}
                                fieldId="SetupDetailId"
                                fieldName="SetupDetailName"
                                required={true}
                              /> */}
                              <FormGroup>
                                <Input
                                  id="exampleSelect"
                                  name="PaymentTypeT"
                                  type="select"
                                  value={item.PaymentTypeT}
                                  onChange={(e) => handleCheckedValue(e, index)}
                                >
                                  <option key={-1} value={-1}>
                                    Select
                                  </option>

                                  {PaymentTypeDDL.map((item, key) => (
                                    <option
                                      key={key}
                                      value={item.SetupDetailId}
                                    >
                                      {item.SetupDetailName}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      ) : null}

      {showCasePanel === true || RoleId == Roles.Trustee
        ? CaseApprovalPanel()
        : null}

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Approval History</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <FormGroupTable
                columns={statusColumn}
                rows={caseStatusList}
                hideAction={true}
                onEdit={null}
                onDelete={null}
              />
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Primary Support Detail Show</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <FormGroupTable
                columns={showColumns}
                rows={primarySupportdetailshow}
                hideAction={true}
                // onEdit={null}
                // onDelete={null}
              />
            </Row>
          </Form>
        </CardBody>
      </Card>

      {ModalPhysicalHistory && (
        <Modal
          isOpen={ModalPhysicalHistory}
          // toggle={toggle}
          size="lg"
          backdrop="static"
        >
          <ModalHeader>Physical Audit History</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FormGroupTable
                  columns={columns}
                  rows={paymentListSummary}
                  // ButtonText="Create Voucher"
                  // onView={onView}
                  hideAction={true}
                  // onDelete={onDelete}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Button onClick={handleCloseModal}>Close</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      )}

      {/* {openModal && (
        <ModalApplHistory
          HeaderText="Applicant History"
          Ismodalshow={openModal}
          closeNewmodal={closeNewmodal}
        />
      )} */}
    </div>
  )
}

export default Approvels
