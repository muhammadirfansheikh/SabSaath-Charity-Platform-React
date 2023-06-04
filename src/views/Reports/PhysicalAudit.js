import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import React, { useEffect, useState } from "react"
import { SetupMasterIds } from "../../utils/Constants.js"
import { Roles } from "utils/Constants"
import Swal from "sweetalert2"

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  Alert,
} from "reactstrap"
import { fetchData } from "utils/Api"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
  GetSetupMaster,
} from "utils/CommonMethods"
import useEditRole from "hooks/useEditRole.js"

const initialValues = {
  //Search List
  AuditStatus: 0,
  Auditor: "",
  AssignDate: null,
  StartDate: null,
  CloseDate: null,
  CompleteDate: null,
  CaseCode: "",
  ApplicantCnic: "",
  ApplicantName: "",
  // End Search List

  //EDIT DETAILS
  AuditStatus_edit: 0,
  StartDate_edit: new Date(),
  Complete_edit: new Date(),
  AuditorRemarks: "",
  //End EDIT DETAILS

  TrusteeRemarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  OperationId: 1,
}

const PhysicalAudit = (props) => {
  const RoleId = localStorage.getItem("RoleId")
  const [formFields, setFormFields] = useState(initialValues)
  const [paymentListSummary, setPaymentListSummary] = useState([])
  const [PhysicalAuditStatus, setPhysicalAuditStatus] = useState([])
  const [PhysicalAuditStatus_Edit, setPhysicalAuditStatus_Edit] = useState([])
  const [ModalPhysicalHistory, setModalPhysicalHistory] = useState(false)
  const [ModalEdit, setModalEdit] = useState(false)
  const [PhyscialAuditID, setPhyscialAuditID] = useState([])
  const [AuditStatusID, setAuditStatusID] = useState([])
  const [role, appId] = useEditRole()
  const [selectionList, setSelectionList] = useState({
    PaymentListStatus: [],
  })
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
  const [EditModalData, setEditModalData] = useState([])
  const [PaymentHistory_Table, setPaymentHistory_Table] = useState([])
  const [PaymentSchedule_Table, setPaymentSchedule_Table] = useState([])
  const [selectedAuditor, setSelectedAuditor] = useState({})
  const [viewModal, setViewModal] = useState(false)

  const GetSupportStatus = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.PhysicalAuditor, 0, "", 0)
    setPhysicalAuditStatus(data.data)
  }

  const HandlePhysicalHistory = (index, row) => {
    setModalPhysicalHistory(true)
    applicanthistory(row.ApplicantCase_InvestigationId)
  }
  const handleCloseModal = () => {
    setModalPhysicalHistory(false)
  }
  const handleViewModal = (index, row) => {
    console.log("ROW", row)
    fetchData("Applicant", "Get_Physical_Audit_List", {
      OperationId: 3,
      PhysicalAuditId: row.PhysicalAuditId,
      RoleId: localStorage.getItem("RoleId"),
      UserID : localStorage.getItem("UserId"),
    }).then((result) => {
      setPhysicalAuditStatus_Edit(result?.DataSet?.Table)
      setSelectedAuditor({
        ...row,
        AuditStatus_edit: result?.DataSet?.Table[0].SetupDetailId,
        AuditorRemarks: row.AuditorRemarks,
        TrusteeRemarks: row.TrusteeRemarks,
      })
    })

    setViewModal(true)
    setPhyscialAuditID(row.PhysicalAuditId)
    setAuditStatusID(row.SetupDetailId)
  }

  const handleEditModal = (index, row) => {
    console.log("ROW", row)
    fetchData("Applicant", "Get_Physical_Audit_List", {
      OperationId: 3,
      PhysicalAuditId: row.PhysicalAuditId,
      RoleId: localStorage.getItem("RoleId"),
      UserID : localStorage.getItem("UserId"),
    }).then((result) => {
      setPhysicalAuditStatus_Edit(result?.DataSet?.Table)
      setFormFields({
        ...formFields,
        AuditStatus_edit: result?.DataSet?.Table[0].SetupDetailId,
        AuditorRemarks: row.AuditorRemarks,
        TrusteeRemarks: row.TrusteeRemarks,
      })
    })

    // setFormFields({
    //     ...formFields,
    //     AuditStatus_edit: row.SetupDetailId,
    // })
    // setFormFields({
    //     ...formFields,
    //     //AuditStatus_edit: row.SetupDetailId,
    //     AuditorRemarks: row.AuditorRemarks,
    //     TrusteeRemarks: row.TrusteeRemarks,
    //     AuditStatus_edit: row.SetupDetailId,

    // })
    // formFields.AuditStatus_edit = row.PhysicalAuditId
    setModalEdit(true)
    setPhyscialAuditID(row.PhysicalAuditId)
    setAuditStatusID(row.SetupDetailId)
  }
  const CloseEditModal = () => {
    setModalEdit(false)
  }

  const CloseViewModal = () => {
    setViewModal(false)
    setSelectedAuditor({})
  }

  const OnEditSubmit = () => {
    if (AuditStatusID == formFields.AuditStatus_edit) {
      Swal.fire({
        title: "Error",
        text: "Changed Audit Status",
        icon: "error",
      })
    } else {
      fetchData("Applicant", "Get_Physical_Audit_List", {
        OperationId: 4,
        PhysicalAuditId: PhyscialAuditID,
        StartDate: formFields.StartDate_edit,
        CloseDate: formFields.Complete_edit,
        AuditStatus: AuditStatusID,
        AuditorRemarks: formFields.AuditorRemarks,
        TrusteeRemarks: formFields.TrusteeRemarks,
        AuditStatusEdit: formFields.AuditStatus_edit,
        //RoleId:  localStorage.getItem("RoleId"),
        UserID : localStorage.getItem("UserId"),
      }).then((result) => {
        setEditModalData(result?.DataSet?.Table)
        Swal.fire({
          title: "success",
          text: "Submitted Successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setModalEdit(false)
          } else {
            setModalEdit(true)
          }
        })
        fetchPaymentData()
      })
    }
  }

  const customFnForBtns = (row, index) => {
    const status = row.AuditStatus

    if (
      (RoleId == "12" && status === "Closed") ||
      (RoleId == "38" && status === "Complete") ||
      status === "Closed"
    ) {
      return (
        <Button
          color="success"
          outline
          size="sm"
          onClick={() => handleViewModal(index, row)}
        >
          View
        </Button>
      )
    } else {
      return (
        <Button
          color="danger"
          outline
          size="sm"
          onClick={() => handleEditModal(index, row)}
        >
          Edit
        </Button>
      )
    }

    //     return condition   ?
    //     <Button
    //     color="success"
    //     outline
    //     size="sm"
    //     onClick={() => handleEditModal(index, row)}
    //   >
    //     View
    //   </Button>
    //    :
    //    <Button
    //     color="danger"
    //     outline
    //     size="sm"
    //     onClick={() => handleEditModal(index, row)}
    //   >
    //     Edit
    //   </Button>
  }

  const fetchPaymentData = async () => {
    fetchData("Applicant", "Get_Physical_Audit_List", {
      OperationId: 1,
      ApplicantCase_InvestigationId: 1346,
      UserID : localStorage.getItem("UserId"),
      // CreatedDateFrom: formFields.CreatedDateFrom,
      // CreatedDateTo: formFields.CreatedDateTo,
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table)
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table,
      })
    })
  }

  const applicanthistory = async (ApplicantCaseInvestigationId) => {
    fetchData("Applicant", "GetApplicantCaseHistory", {
      OperationId: 1,
      ApplicantCase_InvestigationId: ApplicantCaseInvestigationId,
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

  useEffect(() => {
    GetSupportStatus()
    fetchPaymentData()
  }, [])

  const PersInformation_Table_columns = [
    //  {
    //        field: "CnicNo",
    //        name: "CnicNo",
    //      },

    //      {
    //        field: "ApplicantName",
    //        name: "Applicant Name",
    //      },
    {
      field: "FatherName",
      name: "Father Name",
    },
    {
      field: "DateOfBirth",
      name: "Date Of Birth",
    },
    {
      field: "Gender",
      name: "Gender",
    },

    // {
    //   field: "ApplicantCaseCode",
    //   name: "App Case Code",
    // },
    // {
    //   field: "PrimaryContactNo",
    //   name: "Primary ContactNo",
    // },

    {
      field: "AlternateContactNo",
      name: "Alternate ContactNo",
    },

    {
      field: "CaseNature",
      name: "Case Nature",
    },

    {
      field: "City",
      name: "City",
    },

    {
      field: "Area",
      name: "Area",
    },

    {
      field: "CaseTitle",
      name: "CaseTitle",
    },

    {
      field: "CaseExpiry",
      name: "CaseExpiry",
    },

    {
      field: "IsCaseofthe_Day",
      name: "Case Day",
    },

    {
      field: "IsCaseShow",
      name: "Case Show",
    },

    {
      field: "NoofFamilyAccompanying",
      name: "NoofFamily Accompanying",
    },

    {
      field: "NoofHouseholdMember",
      name: "NoofHouse holdMember",
    },

    {
      field: "TemperoryAddresss",
      name: "Temperory Addresss",
    },

    {
      field: "PermanentAddress",
      name: "Permanent Address",
    },

    {
      field: "FamilyNumber",
      name: "Family Number",
    },
    {
      field: "PrimaryFundCat",
      name: "Primary Fund Cat",
    },
    {
      field: "FundAmount_Required",
      name: "Fund Amount Required",
    },

    {
      field: "IsJoinFamily",
      name: "IsJoinFamily",
    },
  ]
  const FamilyInfo_Columns = [
    {
      field: "Name",
      name: "Name",
    },
    {
      field: "CNIC_B_FormNumber",
      name: "CNIC/B Form Number",
    },
    {
      field: "Mother_Father_HusbandName",
      name: "Mother/Father/Husband Name",
    },
    {
      field: "DateOfBirth",
      name: "Date Of Birth",
    },
    {
      field: "DateOfDeath",
      name: "Date Of Death",
    },

    {
      field: "Religion",
      name: "Religion",
    },

    {
      field: "Gender",
      name: "Gender",
    },
    {
      field: "Marital_Status",
      name: "Marital Status",
    },

    {
      field: "Contact_Type",
      name: "Contact Type",
    },

    {
      field: "Contact_Number",
      name: "Contact Number",
    },

    {
      field: "Remarks",
      name: "Remarks",
    },

    {
      field: "CanRead",
      name: "CanRead",
    },

    {
      field: "CanWrite",
      name: "CanWrite",
    },

    {
      field: "IsEmployeed",
      name: "IsEmployeed",
    },

    {
      field: "JobRemarks",
      name: "Job Remarks",
    },

    {
      field: "LastWorkExperience",
      name: "Last Work Experience",
    },

    {
      field: "IsPartOfBannedOrg",
      name: "Part Of BannedOrg",
    },

    {
      field: "IsInvolveInCriminalActivity",
      name: "Criminal Activity",
    },

    {
      field: "HasMedicalHistory",
      name: "Medical History",
    },
  ]
  const EducationDetails_Columns = [
    {
      field: "Academic",
      name: "Academic",
    },
    {
      field: "ProgramName",
      name: "Program Name",
    },
    {
      field: "Degree",
      name: "Degree",
    },
    {
      field: "ClassyearSemester",
      name: "Class year Semester",
    },

    {
      field: "Grade_Percentage_CGPA_Marks",
      name: "Grade Percentage CGPA Marks",
    },

    {
      field: "YearOfCompletion",
      name: "Year Of Completion",
    },

    {
      field: "Location",
      name: "Location",
    },

    {
      field: "Educational_ContactNo",
      name: "Educational ContactNo",
    },

    {
      field: "NameOfInstitute",
      name: "Name Of Institute",
    },
  ]

  const MedicalDetails_Columns = [
    {
      field: "Eligible",
      name: "Eligible/Disability/Disase",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "HospitalName",
      name: "Hospital Name",
    },

    {
      field: "HospitalContactNo",
      name: "Hospital ContactNo",
    },
    {
      field: "HospitalAddress",
      name: "Hospital Address",
    },

    // {
    //   field: "HospitalContactNo",
    //   name: "Hospital Contact No",
    // },

    {
      field: "DoctorName",
      name: "Doctor Name",
    },

    {
      field: "Doctor ContactNo",
      name: "Doctor ContactNo",
    },

    // {
    //   field: "Disease",
    //   name: "Disease",
    // },

    // {
    //   field: "HospitalName",
    //   name: "Hospita lName",
    // },

    // {
    //   field: "HospitalContactNo",
    //   name: "Hospital ContactNo",
    // },

    // {
    //   field: "HospitalAddress",
    //   name: "Hospital Address",
    // },

    // {
    //   field: "DoctorName",
    //   name: "Doctor Name",
    // },

    // {
    //   field: "DoctorContactNo",
    //   name: "Doctor ContactNo",
    // },
  ]
  const Guardian_Columns = [
    {
      field: "GuardianCnic",
      name: "GuardianCnic",
    },
    {
      field: "GuardianName",
      name: "GuardianName",
    },

    {
      field: "GuardianContactNo",
      name: "GuardianContactNo",
    },

    {
      field: "Occupation",
      name: "Occupation",
    },

    {
      field: "Relation",
      name: "Relation",
    },

    {
      field: "CompanyName",
      name: "CompanyName",
    },
  ]
  const MonthlyExpanse_Columns = [
    {
      field: "Expnse",
      name: "Expense",
    },
    {
      field: "Amount",
      name: "Amount",
    },
  ]
  const Earnings_Columns = [
    {
      field: "JobStatus",
      name: "JobStatus",
    },
    {
      field: "EarningAmount",
      name: "Earning Amount",
    },

    {
      field: "LastCompanyName",
      name: "LastCompanyName",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
  ]
  const AssetInformation_Columns = [
    {
      field: "AssetInfoType",
      name: "Asset Information Type",
    },
    {
      field: "AssetType",
      name: "AssetType",
    },

    {
      field: "AssetSubType",
      name: "Asset Sub Type",
    },

    {
      field: "Mortgagee_LandlordName",
      name: "Mortgagee Landlord Name",
    },

    {
      field: "Mortagagee_LandlordContactNumber",
      name: "Mortagagee Land lord Contact Number",
    },

    {
      field: "Mortgagee_LandlordAddress",
      name: "Mortgagee LandlordAddress",
    },

    {
      field: "AssetStatus",
      name: "AssetStatus",
    },
  ]

  const LoanComatee_Columns = [
    {
      field: "loantype",
      name: "loan type",
    },
    {
      field: "LoanAmount",
      name: "Loan Amount",
    },

    {
      field: "BalanceAmount",
      name: "Balance Amount",
    },

    {
      field: "Remarks",
      name: "Remarks",
    },
  ]
  const Pets_Columns = [
    {
      field: "PetName",
      name: "Pet Name",
    },
    {
      field: "Quantity",
      name: "Quantity",
    },
  ]
  const SourceofDrinkwater_Columns = [
    {
      field: "typeName",
      name: "type Name",
    },
    {
      field: "typedetailname",
      name: "Type detail name",
    },
  ]
  const PrimarySupport_Columns = [
    // {
    //   field: "Sr#",
    //   name: "Sr #",
    // },
    {
      field: "familyMemberName",
      name: "Family Member",
    },

    {
      field: "relationName",
      name: "Self/Relation",
    },

    {
      field: "categoryName",
      name: "Fund Category",
    },

    {
      field: "fundCategoryName",
      name: "Fund Sub Category",
    },

    {
      field: "frequencyName",
      name: "Frequency",
    },

    {
      field: "fundRequired",
      name: "Fund Required",
    },

    {
      field: "repeatition",
      name: "Repetition",
    },

    {
      field: "totalFundAmount",
      name: "Total Fund Amount",
    },
  ]
  const SecondarySupport_Columns = [
    {
      field: "familyMemberName",
      name: "Family Member",
    },

    {
      field: "relationName",
      name: "Self/Relation",
    },

    {
      field: "categoryName",
      name: "Fund Category",
    },

    {
      field: "fundCategoryName",
      name: "Fund Sub Category",
    },

    {
      field: "frequencyName",
      name: "Frequency",
    },

    {
      field: "fundRequired",
      name: "Fund Required",
    },

    {
      field: "repeatition",
      name: "Repetition",
    },

    {
      field: "totalFundAmount",
      name: "Total Fund Amount",
    },
  ]

  const ApprovalHistory_Columns = [
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
  const Approval_Columns = [
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
      name: "Month",
    },
  ]
  const columns_PaymentSchedule = [
    {
      field: "SupportType",
      name: "Support Type",
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
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentFrequency",
      name: "Payment Frequency",
    },
  ]

  const columns_PaymentHistory = [
    {
      field: "VoucherNo",
      name: "Voucher No",
    },
    {
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentStatus",
      name: "Payment Status",
    },

    {
      field: "PaymentType",
      name: "Payment Type",
    },
    // {
    //   field: "BankName",
    //   name: "Bank Name",
    // },
    // {
    //   field: "AccountTitle",
    //   name: "Account Title",
    // },
    // {
    //   field: "AccountNumber",
    //   name: "Account No",
    // },
    // {
    //   field: "PaymentCNICNo",
    //   name: "Payee CNIC",
    // },
    // {
    //   field: "PaymentGateway",
    //   name: "Payment Gateway",
    // },

    // {
    //   field: "ActionBy",
    //   name: "Action By",
    // },
    // {
    //   field: "ActionDatetime",
    //   name: "Action Date",
    // },
    // {
    //   field: "Remarks",
    //   name: "Remarks",
    // },
  ]
  const columns = [
    {
      name: "Applicant CNIC",
      field: "ApplicantCnic",
    },
    {
      name: "Applicant Name",
      field: "ApplicantName",
    },
    {
      name: "Applicant Case Code",
      field: "CaseCode",
    },
    {
      name: "Auditor",
      field: "Auditor",
    },
    {
      name: "Audit Status",
      field: "AuditStatus",
    },
    {
      name: "Assigned Date",
      field: "AssignDate",
    },
    {
      name: "Start Date",
      field: "StartDate",
    },
    {
      name: "Complete Date",
      field: "CloseDate",
    },
    {
      name: "Contact",
      field: "Contact",
    },
    {
      name: "Gender",
      field: "Gender",
    },
    {
      name: "Area",
      field: "Area",
    },
    {
      name: "City",
      field: "City",
    },
    {
      name: "Fund Category",
      field: "fundCategory",
    },
    {
      name: "Auditor Remarks",
      field: "AuditorRemarks",
    },
  ]
  const handleInputChange = (e) => {
    let { name, value } = e.target

    if (name === "AuditStatus_edit") {
      value = Number(value)
    }

    setFormFields({
      ...formFields,
      [name]: value,
    })
  }
  const searchListData = async () => {
    fetchData("Applicant", "Get_Physical_Audit_List", {
      OperationId: 1,
      AuditStatus: formFields.AuditStatus,
      Auditor: formFields.Auditor,
      AssignDate: formFields.AssignDate
        ? getDate(formFields.AssignDate, "-", "yyyy/mm/dd")
        : null, //formFields.AssignDate,
      StartDate: formFields.StartDate
        ? getDate(formFields.StartDate, "-", "yyyy/mm/dd")
        : null, //formFields.StartDate,
      CloseDate: formFields.CloseDate
        ? getDate(formFields.CloseDate, "-", "yyyy/mm/dd")
        : null, //formFields.CloseDate,
      CaseCode: formFields.CaseCode,
      ApplicantCnic: formFields.ApplicantCnic,
      ApplicantName: formFields.ApplicantName,
      UserID: localStorage.getItem("UserId"),
      // PaymentListStatusId: formFields.PaymentListStatusId == "" ? 0 : formFields.PaymentListStatusId,
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table)
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table,
      })
    })
  }
  const cancelListData = async () => {
    // setFormFields({
    //     ...initialValues,
    // });
    fetchPaymentData()
  }
  const handleClick = () => {}
  const onView = (idx, row) => {
    // history.push(
    //   "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
    //   { ACIid: row.ApplicantCase_InvestigationId, isEdit: row.IsEdit }
    // );
    // localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId);
    // localStorage.setItem("role", row.IsEdit == true ? 1 : 0);ubm

    localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId)

    localStorage.setItem("role", 0)

    window.open(
      "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
      "_blank"
    )
  }
  const AllDateSet = (event, type) => {
    if (type === "StartDateddl") {
      setFormFields({
        ...formFields,
        StartDate: event,
      })
    } else if (type === "CloseDateddl") {
      setFormFields({
        ...formFields,
        CloseDate: event,
      })
    } else if (type === "AssignDateddl") {
      setFormFields({
        ...formFields,
        AssignDate: event,
      })
    } else if (type === "StartDate_edit") {
      setFormFields({
        ...formFields,
        StartDate_edit: event,
      })
    } else if (type === "Complete_edit") {
      setFormFields({
        ...formFields,
        Complete_edit: event,
      })
    }
  }

  // alert(RoleId)

  return (
    <div className="content">
      <Row>
        <Col lg={12} md={12}>
          <Card className="card-user">
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Physical Audit
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label>Audit Status</Label>
                      <Input
                        id="AuditStatus"
                        name="AuditStatus"
                        type="select"
                        onChange={handleInputChange}
                      >
                        <option key={-1} value={-1}>
                          Select
                        </option>
                        {PhysicalAuditStatus.map((item, key) => (
                          <option key={key} value={item.SetupDetailId}>
                            {item.SetupDetailName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroupInput
                      label="Auditor"
                      name="Auditor"
                      value={formFields.Auditor}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col md={3}>
                    <Label for="InputDate">Assigned Date</Label>
                    <DatePicker
                      value={getDate(formFields.AssignDate, "/")}
                      dateFormat={dateFormat}
                      onChange={(e) => AllDateSet(e, "AssignDateddl")}
                      className="form-control"
                      //name="CreatedDateFrom"
                      placeholderText={dateFormatPlaceholder}
                      showYearDropdown
                    />
                  </Col>

                  <Col md={3}>
                    <Label for="InputDate">Start Date</Label>
                    <DatePicker
                      value={getDate(formFields.StartDate, "/")}
                      dateFormat={dateFormat}
                      onChange={(e) => AllDateSet(e, "StartDateddl")}
                      className="form-control"
                      name="StartDate"
                      placeholderText={dateFormatPlaceholder}
                      showYearDropdown
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Label for="InputDate">Close Date</Label>
                    <DatePicker
                      value={getDate(formFields.CloseDate, "/")}
                      dateFormat={dateFormat}
                      onChange={(e) => AllDateSet(e, "CloseDateddl")}
                      className="form-control"
                      name="CloseDateddl"
                      placeholderText={dateFormatPlaceholder}
                      showYearDropdown
                    />
                  </Col>
                  <Col md={3}>
                    <FormGroupInput
                      label="Case Code"
                      name="CaseCode"
                      value={formFields.CaseCode}
                      onChange={handleInputChange}
                      // onKeyPress={handleKeyPress}
                      //required={true}
                    />
                  </Col>
                  <Col md={3}>
                    <FormGroupInput
                      label="Applicant CNIC"
                      name="ApplicantCnic"
                      value={formFields.ApplicantCnic}
                      onChange={handleInputChange}
                      // onKeyPress={handleKeyPress}
                      //required={true}
                    />
                  </Col>
                  <Col md={3}>
                    <FormGroupInput
                      label="Applicant Name"
                      name="ApplicantName"
                      value={formFields.ApplicantName}
                      onChange={handleInputChange}
                      // onKeyPress={handleKeyPress}
                      //required={true}
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
              </form>
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
                  Physical Audit List
                </Col>
                {parseInt(RoleId) === parseInt(Roles.Physical_Auditor) ? (
                  <Col lg={6} md={6} className="text-right">
                    <FormGroupButton
                    //onClick={handleClick}
                    // color="primary2"
                    // title="Add New Payment"
                    />
                  </Col>
                ) : null}
              </Row>
            </CardHeader>
            <CardBody>
              {console.log("paymentListSummary", paymentListSummary)}
              <Row>
                <Col md={12}>
                  <FormGroupTable
                    columns={
                      RoleId == "38"
                        ? columns.filter((col) => col.name != "Auditor")
                        : columns
                    }
                    rows={paymentListSummary}
                    ButtonText={"Edit"}
                    // onDynamic={(index, row) => (handleEditModal(index, row))}
                    customField={(row, index) => customFnForBtns(row, index)}
                    ButtonText1="History"
                    onDynamic1={HandlePhysicalHistory}
                    // customField={(row, index) => <h1>ABCD {index}</h1>}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {ModalPhysicalHistory && (
        <Modal
          isOpen={ModalPhysicalHistory}
          // toggle={toggle}
          size="lg"
          backdrop="static"
        >
          <ModalHeader>Physical Audit History</ModalHeader>

          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Identification</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <img
                    name="imgApplicant"
                    // src={

                    //     PersInformation_Table[0]?.ApplicantPhoto === null ||
                    //         PersInformation_Table[0]?.ApplicantPhoto === ""
                    //         ?// SabSathDefault
                    //         : api.baseImageUrl +
                    //         PersInformation_Table[0]?.ApplicantPhoto
                    // }
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
                  <strong>{" " + PersInformation_Table[0]?.CnicNo}</strong>{" "}
                  <br />
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
              <h6 className="font-weight-bold mb-0">
                Source of Drinking Water
              </h6>
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

          <ModalBody>
            {/* <Row>
                            <Col md={12}>
                                <FormGroupTable
                                    columns={columnsHistory}
                                    rows={paymentListSummary}
                                    // ButtonText="Create Voucher"
                                    // onView={onView}
                                    hideAction={true}
                                // onDelete={onDelete}
                                />
                            </Col>
                        </Row> */}

            <Row>
              <Col>
                <Button onClick={handleCloseModal}>Close</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      )}

      <Modal isOpen={ModalEdit} size="xl">
        <ModalHeader></ModalHeader>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Edit Details</h6>
          </CardHeader>
          <CardBody>
            <ModalBody>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>Audit Status</Label>
                    <Input
                      id="AuditStatus_edit"
                      name="AuditStatus_edit"
                      type="select"
                      value={formFields.AuditStatus_edit}
                      disabled={
                        formFields.AuditStatus_edit !== 1555 && RoleId == 12
                      }
                      onChange={handleInputChange}
                    >
                      {/* <option key={-1} value={-1}>
                                                Select
                                            </option> */}
                      {PhysicalAuditStatus_Edit !== undefined
                        ? PhysicalAuditStatus_Edit.map((item, key) => (
                            <option
                              selected={key === 0}
                              key={key}
                              value={item.SetupDetailId}
                            >
                              {item.SetupDetailName}
                            </option>
                          ))
                        : null}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Start Date</Label>
                  <DatePicker
                    value={getDate(formFields.StartDate_edit, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) => AllDateSet(e, "StartDate_edit")}
                    className="form-control"
                    name="StartDate_edit"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled={
                      formFields.AuditStatus_edit !== 1555 && RoleId == 12
                    }
                  />
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Complete Date</Label>
                  <DatePicker
                    value={getDate(formFields.Complete_edit, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) => AllDateSet(e, "Complete_edit")}
                    className="form-control"
                    name="Complete_edit"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled={
                      formFields.AuditStatus_edit !== 1555 && RoleId == 12
                    }
                  />
                </Col>
              </Row>
              <Row>
                {/* {renderRemarks()} */}
                <Col md={12}>
                  <FormGroup>
                    <Label>Auditor Remarks</Label>
                    <Input
                      type="textarea"
                      className="form-control"
                      id="txtAuditorRemarks"
                      name="AuditorRemarks"
                      value={formFields.AuditorRemarks}
                      onChange={handleInputChange}
                      disabled={RoleId == "38" ? false : true}
                    />
                  </FormGroup>
                </Col>
                {RoleId == "38" ? null : (
                  <Col md={12}>
                    <FormGroup>
                      <Label>Trustee Remarks</Label>
                      <Input
                        type="textarea"
                        className="form-control"
                        id="txtTrusteeRemarks"
                        name="TrusteeRemarks"
                        value={formFields.TrusteeRemarks}
                        onChange={handleInputChange}
                        disabled={
                          formFields.AuditStatus_edit == 1555 && RoleId == 12
                            ? false
                            : true
                        }
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Button onClick={OnEditSubmit}>Submit</Button>
                  <Button onClick={CloseEditModal}>Close</Button>
                </Col>
              </Row>
            </ModalBody>
          </CardBody>
        </Card>
      </Modal>

      {/* ============================================================================================== */}

      <Modal isOpen={viewModal} size="xl">
        <ModalHeader></ModalHeader>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">View Details</h6>
          </CardHeader>
          <CardBody>
            <ModalBody>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>Audit Status</Label>
                    <Input
                      id="AuditStatus_edit"
                      name="AuditStatus_edit"
                      type="select"
                      value={selectedAuditor.AuditStatus_edit}
                      disabled
                    >
                      {/* <option key={-1} value={-1}>
                                                Select
                                            </option> */}
                      {PhysicalAuditStatus_Edit !== undefined
                        ? PhysicalAuditStatus_Edit.map((item, key) => (
                            <option
                              selected={key === 0}
                              key={key}
                              value={item.SetupDetailId}
                            >
                              {item.SetupDetailName}
                            </option>
                          ))
                        : null}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Start Date</Label>
                  <DatePicker
                    value={getDate(selectedAuditor.StartDate, "/")}
                    dateFormat={dateFormat}
                    className="form-control"
                    name="StartDate_edit"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled
                  />
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Complete Date</Label>
                  <DatePicker
                    disabled
                    value={getDate(selectedAuditor.CloseDate, "/")}
                    dateFormat={dateFormat}
                    className="form-control"
                    name="Complete_edit"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                  />
                </Col>
              </Row>
              <Row>
                {/* {renderRemarks()} */}
                <Col md={12}>
                  <FormGroup>
                    <Label>Auditor Remarks</Label>
                    <Input
                      type="textarea"
                      className="form-control"
                      id="txtAuditorRemarks"
                      name="AuditorRemarks"
                      value={selectedAuditor.AuditorRemarks}
                      // onChange={handleInputChange}
                      // disabled={RoleId == "38" ? false : true}
                      disabled
                    />
                  </FormGroup>
                </Col>

                {RoleId == "38" ? null : (
                  <Col md={12}>
                    <FormGroup>
                      <Label>Trustee Remarks</Label>
                      <Input
                        type="textarea"
                        className="form-control"
                        id="txtTrusteeRemarks"
                        name="TrusteeRemarks"
                        value={formFields.TrusteeRemarks}
                        onChange={handleInputChange}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Button disabled>Submit</Button>
                  <Button onClick={CloseViewModal}>Close</Button>
                </Col>
              </Row>
            </ModalBody>
          </CardBody>
        </Card>
      </Modal>
    </div>
  )
}

export default PhysicalAudit
