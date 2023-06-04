import React, { useEffect, useLayoutEffect, useState } from "react"
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import PrimaryInformation from "../components/Tabs/PrimaryInformation.js"
import PersonalInformations from "../components/Tabs/PersonalInformation"
import FamilyMemberInformation from "../components/Tabs/FamilyMemberInformation.js"
import EducationDetails from "../components/Tabs/EducationDetails.js"
import MedicalDetail from "../components/Tabs/MedicalDetails.js"
import MonthlyExpenseDetail from "../components/Tabs/MonthlyExpenseDetail.js"
import AdditionalDetails from "../components/Tabs/AdditionalDetails.js"

import AssetsInformation from "../components/Tabs/AssetsInformation.js"
import LoanDetails from "../components/Tabs/LoanDetails.js"
import PetsDetails from "../components/Tabs/PetsDetails.js"
import SourceOfDrinkingSanitationAndWashroom from "../components/Tabs/SourceOfDrinkingSanitationAndWashroom.js"

import PrimarySupport from "../components/Tabs/PrimarySupport.js"
import SupportingDocument from "../components/Tabs/SupportingDocument.js"

import Approvels from "../components/Tabs/Approvels.js"
import Payment from "../components/Tabs/Payment.js"
import Story from "../components/Tabs/Story.js"
import FollowUp from "../components/Tabs/FollowUps.js"

import {
  PrimaryinitialValues,
  PersonalinitialValues,
  FamilyInitialValues,
  EducationDetailinitialValues,
  MedicalDetailinitialValues,
  MonthlyExpenseInitialValues,
  GeneralAdditionalDetailInitialValues,
  PetsInitialValues,
  DrinkSanitationInitialValues,
  DiseaseDisableInitialValues,
  LoanInitialValues,
  CommitteInitialValues,
  AssetsInitialValues,
  SupportingDocInitialValues,
  AdditionDocInitialValues,
  PrimarySupportInitialValues,
  SecondarySupportInitialValues,
} from "../utils/Common.js"
import { fetchData } from "../utils/Api.js"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  SetupMasterIds,
  Roles,
} from "../utils/Constants.js"
import Swal from "sweetalert2"
import Marketing from "./Marketing.js"
import EarningDetails from "components/Tabs/EarningDetail.js"
import BasicInfoTab from "components/Tabs/BasicInfoTab.js"
import ReInvestigation from "components/Tabs/ReInvestigation.js"
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx"
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx"
import useEditRole from "hooks/useEditRole.js"
import SuccessStories_AfterApproved from "./SuccessStories_AfterApproved.js"
import SabSathDefault from "../assets/img/SabSathDefault.png"
//import SabSathDefault from "../../assets/img/SabSathDefault.png";
import * as api from "utils/Api"
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

const ApplicantDetail = (props) => {
  const history = useHistory()
  var customRoles = localStorage.getItem("RoleId")
  const [role, appId] = useEditRole()

  const [historyModal, setHistoryModal] = useState(false)
  const [myState, setMyState] = useState(props.location.state)
  const [tabNo, settabNo] = useState("1")
  const [subtabNo, setsubtabNo] = useState(null)
  const [primaryValues, setPrimaryValues] = useState(PrimaryinitialValues)
  const [personalValues, setpersonalValues] = useState(PersonalinitialValues)
  const [familyValues, setFamilyValues] = useState(FamilyInitialValues)
  const [educationDetailsValues, seteducationDetailsValues] = useState(
    EducationDetailinitialValues
  )
  const [medicalDetailValues, setmedicalDetailValues] = useState(
    MedicalDetailinitialValues
  )
  const [monthlyExpenseValues, setMonthlyExpenseValues] = useState(
    MonthlyExpenseInitialValues
  )
  const [generalAdditionalDetailValues, setGeneralAdditionalDetailValues] =
    useState(GeneralAdditionalDetailInitialValues)
  const [petsValues, setPetsValues] = useState(PetsInitialValues)
  const [drinkSanitationValues, setDrinkSanitationValues] = useState(
    DrinkSanitationInitialValues
  )
  const [diseaseDisableValues, setDiseaseDisableValues] = useState(
    DiseaseDisableInitialValues
  )
  const [loanValues, setLoanValues] = useState(LoanInitialValues)
  const [committeValues, setCommitteValues] = useState(CommitteInitialValues)
  const [assetsValues, setAssetsValues] = useState(AssetsInitialValues)
  const [supportingDocValues, setSupportingDocValues] = useState(
    SupportingDocInitialValues
  )
  const [additionDocValues, setAdditionDocValues] = useState(
    AdditionDocInitialValues
  )
  const [primarySupportValues, setPrimarySupportValues] = useState(
    PrimarySupportInitialValues
  )
  const [secondarySupportValues, setSecondarySupportValues] = useState(
    SecondarySupportInitialValues
  )
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

  const handlePrimaryInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setPrimaryValues({
      ...primaryValues,
      [name]: values,
    })
  }

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setpersonalValues({
      ...personalValues,
      [name]: values,
    })
  }
  const handleFamilyInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFamilyValues({
      ...familyValues,
      [name]: values,
    })
  }

  const handleFamilyGridChange = (FamilyGridList) => {
    setFamilyValues({ ...familyValues, FamilyDetailGridList: FamilyGridList })
  }
  const handleEducatrionDetailInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    seteducationDetailsValues({
      ...educationDetailsValues,
      [name]: values,
    })
  }

  const handleMedicalDetailInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setmedicalDetailValues({
      ...medicalDetailValues,
      [name]: values,
    })
  }

  const handleMonthlyExpenseInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setMonthlyExpenseValues({
      ...monthlyExpenseValues,
      [name]: values,
    })
  }
  const handleAdditionalInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setGeneralAdditionalDetailValues({
      ...generalAdditionalDetailValues,
      [name]: values,
    })
  }
  const handleExpenseGridChange = (ExpenseGridList) => {
    setMonthlyExpenseValues({
      ...monthlyExpenseValues,
      ExpenseGridList: ExpenseGridList,
    })
  }

  const handlePetsInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setPetsValues({
      ...petsValues,
      [name]: values,
    })
  }
  const handlePetsGridChange = (PetsGridList) => {
    setPetsValues({
      ...petsValues,
      PetsGridList: PetsGridList,
      petId: "0",
      Quantity: "",
      ExpenseAmount: "",
    })
  }

  const handleDrinkingInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setDrinkSanitationValues({
      ...drinkSanitationValues,
      [name]: values,
    })
  }
  const handleDiseaseInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setDiseaseDisableValues({
      ...diseaseDisableValues,
      [name]: values,
    })
  }
  const handleLoanInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setLoanValues({
      ...loanValues,
      [name]: values,
    })
  }
  const handleCommitteInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    setCommitteValues({
      ...committeValues,
      [name]: values,
    })
  }
  const handleLoanGridChange = (LoanGrid) => {
    setLoanValues({ ...loanValues, LoanGrid: LoanGrid })
  }
  const handleCommitteGridChange = (CommitteGrid) => {
    setCommitteValues({ ...committeValues, CommitteGrid: CommitteGrid })
  }

  const handleSupportDocInputChange = (e) => {
    //e.preventDefault();
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value
    setSupportingDocValues({
      ...supportingDocValues,
      [name]: values,
    })
  }
  const handleAdditionDocInputChange = (e) => {
    const { name, value } = e.target
    const values =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value
    setAdditionDocValues({
      ...additionDocValues,
      [name]: values,
    })
  }
  const handleSuppDocGridChange = (SupportDocGrid) => {
    setSupportingDocValues({
      ...supportingDocValues,
      SupportDocGrid: SupportDocGrid,
    })
  }
  const handleAdditionalDocGridChange = (AdditionalDocGrid) => {
    setAdditionDocValues({
      ...additionDocValues,
      AdditionalDocGrid: AdditionalDocGrid,
    })
  }

  // const handlePrimarySuppInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const values =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //   setPrimarySupportValues({
  //     ...primarySupportValues,
  //     [name]: values,
  //   });
  // };
  // const handlePrimarySuppGridChange = (PrimarySupportGrid) => {
  //   setPrimarySupportValues({
  //     ...primarySupportValues,
  //     PrimarySupportGrid: PrimarySupportGrid,
  //   });
  // };
  // const handleSecondarySuppInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const values =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //   setSecondarySupportValues({
  //     ...secondarySupportValues,
  //     [name]: values,
  //   });
  // };
  // const handleSecondarySuppGridChange = (SecondarySupportGrid) => {
  //   setSecondarySupportValues({
  //     ...secondarySupportValues,
  //     SecondarySupportGrid: SecondarySupportGrid,
  //   });
  // };
  async function GetSetupMaster(SetupMasterId, ParentId) {
    try {
      var RequestData = {
        OperationId: OperationTypeId.Select,
        SetupMasterId: SetupMasterId,
        ParentId: ParentId,
      }
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.MasterDetail_Operation,
        RequestData
      )
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
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

  async function GetInvestigatingOfficer(RoleId) {
    try {
      var RequestData = {
        OperationTypeId: OperationTypeId.Select,
        RoleId: RoleId,
      }
      const data = await fetchData(
        ControllerName.User,
        ApiMethods.CrudUser,
        RequestData
      )
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
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

  async function GetCompany() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select }
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Company_Operation,
        RequestData
      )
      if (data != null && data.length > 0) {
        if (data.response === true && data.data != null) {
          return data.data
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

  async function GetFundCategory() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select }
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.FundCategory_Operation,
        RequestData
      )
      //
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
        } else {
          return []
        }
      } else {
        return []
        //
      }
    } catch (error) {
      return []
      //
    }
  }

  async function GetFrequency() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select }
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Frequency_Operation,
        RequestData
      )
      //
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
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
  async function GetPaymentType() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select }
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.PaymentType_Operation,
        RequestData
      )
      //
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
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

  React.useEffect(() => {
    const LoadGender = async () => {
      let tempDate = new Date()
      let date =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate()
      var AllSetupDetail = await GetSetupMaster(0, 0)
      var InvestigatingOfficers = await GetInvestigatingOfficer(
        Roles.InvestigatingOfficerRoleId
      )

      // var Companyddl = await GetCompany();
      var Companyddl = []
      var FundCategoryddl = await GetFundCategory()
      var Frequencyddl = await GetFundCategory()
      var PaymentTypeddl = await GetPaymentType()

      var responseGenderList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Gender
      )
      var responseProvinceList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Province
      )
      var responseNatureOfCase = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.NatureOfCase
      )
      var responseCity = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.City
      )
      var responseUnion = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Union
      )
      var responseCouncil = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Council
      )
      var responseVillage_Muhalla = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Village_Muhalla
      )

      var responseMaritalList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.MaritalStatus
      )

      var responseContactTypeList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.ContactType
      )

      var responseReligionList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Religion
      )

      var responseJobStatusList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.ReferrerCategory
      )

      var responseGenderList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Gender
      )

      var responseRelationList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Relation
      )
      var responseExpenseList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Expense
      )
      var responseOccupation = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Occupation
      )
      var responseReferrer = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Referrer
      )
      var responsePets = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Pets
      )
      var responseSourceOfDrinking = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.SourceOfDrinking
      )
      var responseLoanType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.LoanType
      )
      var responseSuppDocumentType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.SupportingDocuments
      )
      var responseDocumentType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.DocumentParentTypes
      )
      var responseDocumentSubType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.DocumentSubTypes
      )

      setPrimaryValues({
        InvestigatingOfficerList: InvestigatingOfficers,
        NatureOfCaseList: responseNatureOfCase,
        ApplicationDate: date,
        GenderList: responseGenderList,
        ProvinceList: responseProvinceList,
        CityList: responseCity,
        UnionList: responseUnion,
        CouncilList: responseCouncil,
        VillageMuhallaList: responseVillage_Muhalla,
      })

      setFamilyValues({
        RelationList: responseRelationList,
        MaritalList: responseMaritalList,
        ReligionList: responseReligionList,
        GenderList: responseGenderList,
        JobStatusList: responseJobStatusList,
        ContactTypeList: responseContactTypeList,
      })

      setMonthlyExpenseValues({ ExpenseDdl: responseExpenseList })

      setGeneralAdditionalDetailValues({
        Companyddl: Companyddl,
        Organizationddl: Companyddl,
        Occupationddl: responseOccupation,
        Referrerddl: responseReferrer,
      })

      setPetsValues({ petsddlList: responsePets })

      setDrinkSanitationValues({ SourceDrinkddl: responseSourceOfDrinking })

      setSupportingDocValues({
        SupportDocumnetTypeddl: responseSuppDocumentType,
      })

      setAdditionDocValues({
        DocumnetTypeddl: responseDocumentType,
        DocumnetSubTypeddl: responseDocumentSubType,
      })
    }
    LoadGender()
    requestCall(1)
  }, [])

  const requestCall = (opId) => {
    fetchData("Applicant", "GetApplicantCaseHistory", {
      OperationId: 1,
      ApplicantCase_InvestigationId: appId,
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

  function ValidateParams(params) {
    return primaryValues.some((item) => item.hasOwnProperty(params))
  }
  function SetSubTabOnParentTab(params) {
    settabNo(params)
    setsubtabNo(parseInt(params) + 1)
  }
  async function OnCLickSave(e) {
    try {
      alert("click save")

      e.preventDefault()
      var ListOfFamily = []
      var UserId = localStorage.getItem("UserId")
      var UserIp = localStorage.getItem("UserIP")

      var RequestData = {
        ApplicantInformation: {
          OperationId: 2,
          FullName: primaryValues.FullName,
          //Cnic:primaryValues.CNIC,
          //FullName:primaryValues.ApplicantName,
          //  DateOfBirth:primaryValues.DOB
          /// GenderId:primaryValues.GenderId,
          //  FullName:primaryValues.FullName},
          // ApplicantCaseDetail:{ApplicantId:0,ApplicantCaseId:0,ApplicantCaseCode:""
          // ,MartialStatusId:primaryValues.MartialStatusId,Father_HusbandName:primaryValues.Father_HusbandName
          // ,ContactNumber:primaryValues.ContactNumber,ProvinceId:primaryValues.ProvinceId
          // ,CityId:primaryValues.CityId,UnionId:primaryValues.UnionId,CouncilId:primaryValues.CouncilId
          // ,Village_Muhalla_Id:primaryValues.Village_MuhallaId,TemporaryAddress:primaryValues.TemporaryAddress
          // ,PermanentAddress:primaryValues.PermanentAddress,InvestigatingOfficerId:primaryValues.InvestigatingOfficerId
          // ,ReferrerName:primaryValues.Referrer,CaseNatureId:primaryValues.NatureOfCaseId
          // ,IsCriminalActivity:primaryValues.IsCriminalActivity,IsPartOfBannedOrg:primaryValues.IsPartOfBannedOrg
          // ,CreatedBy:UserId,UserIP:UserIp,Religionid:primaryValues.Religionid,Genderid:primaryValues.Genderid,JobStatusId:primaryValues.JobStatusId
        },
        ApplicantFamilyInformation: familyValues.FamilyDetailGridList,
      }
      //var RequestData = { OperationId: 2 , id: 1, value: "value"}
      const data = await fetchData(
        ControllerName.Applicant,
        ApiMethods.Applicant_Operation,
        RequestData
      )

      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data
        } else {
          return []
        }
      } else {
        return []
        //
      }
    } catch (error) {
      return []
      //
    }
  }
  /**
   * toggle the history modal
   */
  const toggleModal = () => {
    setHistoryModal(!historyModal)
  }

  // const onView = (i, row) => {

  //   // history.push(
  //   //   "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
  //   //   { ACIid: row.ApplicantCase_InvestigationId, isEdit: false }
  //   // );

  //   window.open("/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId);

  // };

  const onView = (idx, row) => {
    // history.push(
    //   "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
    //   { ACIid: row.ApplicantCase_InvestigationId, isEdit: row.IsEdit }
    // );
    // localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId);
    // localStorage.setItem("role", row.IsEdit == true ? 1 : 0);

    localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId)

    localStorage.setItem("role", 0)

    window.open(
      "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
      "_blank"
    )
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={12} md={12} className="text-right">
                    <FormGroupButton
                      onClick={toggleModal}
                      title="History"
                      color="secondary"
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem></NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "1" ? "active" : ""}
                      onClick={() => SetSubTabOnParentTab("1")}
                    >
                      General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "2" ? "active" : ""}
                      onClick={() => SetSubTabOnParentTab("2")}
                    >
                      Additional Information
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "3" ? "active" : ""}
                      onClick={() => SetSubTabOnParentTab("3")}
                    >
                      Applicant Support Information
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "4" ? "active" : ""}
                      onClick={() => settabNo("4")}
                    >
                      Approvals
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "5" ? "active" : ""}
                      onClick={() => settabNo("5")}
                    >
                      Payment
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={tabNo === "6" ? "active" : ""}
                      onClick={() => settabNo("6")}
                    >
                      Story
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={tabNo === "7" ? "active" : ""}
                      onClick={() => settabNo("7")}
                    >
                      Follow Up
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {Roles.SuperAdmin === parseInt(customRoles) ||
                    Roles.HOD === parseInt(customRoles) ||
                    Roles.Trustee === parseInt(customRoles) ? (
                      <NavLink
                        className={tabNo === "9" ? "active" : ""}
                        onClick={() => settabNo("9")}
                      >
                        Re Investigation
                      </NavLink>
                    ) : (
                      ""
                    )}
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "8" ? "active" : ""}
                      onClick={() => settabNo("8")}
                    >
                      Case Story
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={tabNo === "10" ? "active" : ""}
                      onClick={() => settabNo("10")}
                    >
                      Success Story
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={tabNo}>
                  <TabPane tabId="0">
                    {" "}
                    <div className="tab-content">
                      {
                        <PrimaryInformation
                          state={myState}
                          PrimaryinitialValues={PrimaryinitialValues}
                          primaryValues={primaryValues}
                          handlePrimaryInputChange={handlePrimaryInputChange}
                        />
                      }
                    </div>
                  </TabPane>

                  <TabPane tabId="1">
                    <ul className="nav nav-tabs">
                      {/* <li className={subtabNo==="11"?"active":""}>
                      <Link to='#' onClick={()=>setsubtabNo("11")} activeclassname={subtabNo==="11"?"active":""}>Primary Information</Link>
                      </li> */}
                      <li className={subtabNo === 2 ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("basicInfo")}
                          // activeclassname={
                          //   subtabNo === "basicInfo" ? "active" : ""
                          // }
                          className={subtabNo === "basicInfo" ? "active" : ""}
                        >
                          Basic Information
                        </Link>
                      </li>
                      <li className={subtabNo === 2 ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("12")}
                          className={subtabNo === "12" ? "active" : ""}
                        >
                          Personal Information
                        </Link>
                      </li>

                      <li className={subtabNo === "13" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => {
                            // console.log(subtabNo);
                            setsubtabNo("13")
                          }}
                          className={subtabNo === "13" ? "active" : ""}
                        >
                          Family Member Information
                        </Link>
                      </li>
                      <li className={subtabNo === "14" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("14")}
                          className={subtabNo === "14" ? "active" : ""}
                        >
                          Education Details
                        </Link>
                      </li>
                      <li className={subtabNo === "15" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("15")}
                          className={subtabNo === "15" ? "active" : ""}
                        >
                          Medical Details
                        </Link>
                      </li>
                      <li className={subtabNo === "16" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("16")}
                          className={subtabNo === "16" ? "active" : ""}
                        >
                          Monthly Expense Detail
                        </Link>
                      </li>
                      <li className={subtabNo === "17" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("17")}
                          className={subtabNo === "17" ? "active" : ""}
                        >
                          Guardians Details
                        </Link>
                      </li>
                      <li className={subtabNo === "18" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("18")}
                          className={subtabNo === "18" ? "active" : ""}
                        >
                          Earning Details
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "basicInfo" && (
                        <BasicInfoTab
                          PrimaryinitialValues={PrimaryinitialValues}
                          state={myState}
                          primaryValues={primaryValues}
                          handlePersonalInputChange={handlePersonalInputChange}
                        />
                      )}
                      {/* { manzoor commit */}
                      {subtabNo === "11" && (
                        <PersonalInformations
                          state={myState}
                          PrimaryinitialValues={PrimaryinitialValues}
                          primaryValues={primaryValues}
                          handlePrimaryInputChange={handlePrimaryInputChange}
                        />
                      )}

                      {/* } manzoor commit */}
                      {subtabNo === "12" && (
                        <PersonalInformations
                          PrimaryinitialValues={PrimaryinitialValues}
                          state={myState}
                          primaryValues={primaryValues}
                          handlePersonalInputChange={handlePersonalInputChange}
                        />
                      )}
                      {subtabNo === "13" && (
                        <FamilyMemberInformation
                          state={myState}
                          FamilyInitialValues={FamilyInitialValues}
                          familyValues={familyValues}
                          handleFamilyInputChange={handleFamilyInputChange}
                          handleFamilyGridChange={handleFamilyGridChange}
                        />
                      )}
                      {subtabNo === "14" && (
                        <EducationDetails
                          state={myState}
                          EducationDetailinitialValues={
                            EducationDetailinitialValues
                          }
                          educationDetailsValues={educationDetailsValues}
                          handleEducatrionDetailInputChange={
                            handleEducatrionDetailInputChange
                          }
                        />
                      )}
                      {subtabNo === "15" && (
                        <MedicalDetail
                          state={myState}
                          MedicalDetailinitialValues={
                            MedicalDetailinitialValues
                          }
                          medicalDetailValues={medicalDetailValues}
                          handleMedicalDetailInputChange={
                            handleMedicalDetailInputChange
                          }
                        />
                      )}
                      {subtabNo === "16" && (
                        <MonthlyExpenseDetail
                          state={myState}
                          handleMonthlyExpenseInputChange={
                            handleMonthlyExpenseInputChange
                          }
                          monthlyExpenseValues={monthlyExpenseValues}
                          MonthlyExpenseInitialValues={
                            MonthlyExpenseInitialValues
                          }
                          handleExpenseGridChange={handleExpenseGridChange}
                        />
                      )}
                      {subtabNo === "17" && (
                        <AdditionalDetails
                          state={myState}
                          handleAdditionalInputChange={
                            handleAdditionalInputChange
                          }
                          generalAdditionalDetailValues={
                            generalAdditionalDetailValues
                          }
                          GeneralAdditionalDetailInitialValues={
                            GeneralAdditionalDetailInitialValues
                          }
                        />
                      )}
                      {subtabNo === "18" && (
                        <EarningDetails
                          state={myState}
                          // handleAdditionalInputChange={
                          //   handleAdditionalInputChange
                          // }
                          // generalAdditionalDetailValues={
                          //   generalAdditionalDetailValues
                          // }
                          // GeneralAdditionalDetailInitialValues={
                          //   GeneralAdditionalDetailInitialValues
                          // }
                        />
                      )}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <ul className="nav nav-tabs">
                      <li className={subtabNo === "21" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("21")}
                          className={subtabNo === "21" ? "active" : ""}
                        >
                          Assets Information
                        </Link>
                      </li>
                      {
                        //   <li className={subtabNo==="22"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("22")} activeclassname={subtabNo==="22"?"active":""}>
                        // Home Appliances</Link>
                        // </li>
                      }
                      <li className={subtabNo === "23" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("23")}
                          className={subtabNo === "23" ? "active" : ""}
                        >
                          Loan/Committee Details
                        </Link>
                      </li>
                      {
                        //   <li className={subtabNo==="24"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("24")} activeclassname={subtabNo==="24"?"active":""}>
                        // Committee Details</Link>
                        // </li>
                        // <li className={subtabNo==="25"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("25")} activeclassname={subtabNo==="25"?"active":""}>
                        // Disease/Disabled Details</Link>
                        // </li>
                      }
                      <li className={subtabNo === "26" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("26")}
                          className={subtabNo === "26" ? "active" : ""}
                        >
                          Pets Details
                        </Link>
                      </li>
                      <li className={subtabNo === "27" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("27")}
                          className={subtabNo === "27" ? "active" : ""}
                        >
                          Source of Drinking/ Sanitation and Washroom
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "21" && <AssetsInformation {...props} />}
                      {/* {
                      subtabNo==="22" &&
                      <HomeAppliances/>
                    } */}
                      {subtabNo === "23" && (
                        <LoanDetails
                          state={myState}
                          handleLoanInputChange={handleLoanInputChange}
                          loanValues={loanValues}
                          LoanInitialValues={LoanInitialValues}
                          handleLoanGridChange={handleLoanGridChange}
                          handleCommitteInputChange={handleCommitteInputChange}
                          committeValues={committeValues}
                          CommitteInitialValues={CommitteInitialValues}
                          handleCommitteGridChange={handleCommitteGridChange}
                        />
                      )}
                      {subtabNo === "26" && (
                        <PetsDetails
                          state={myState}
                          handlePetsInputChange={handlePetsInputChange}
                          petsValues={petsValues}
                          PetsInitialValues={PetsInitialValues}
                          handlePetsGridChange={handlePetsGridChange}
                        />
                      )}
                      {subtabNo === "27" && (
                        <SourceOfDrinkingSanitationAndWashroom
                          state={myState}
                          handleDrinkingInputChange={handleDrinkingInputChange}
                          drinkSanitationValues={drinkSanitationValues}
                          DrinkSanitationInitialValues={
                            DrinkSanitationInitialValues
                          }
                        />
                      )}
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <ul className="nav nav-tabs">
                      <li className={subtabNo === "31" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("31")}
                          className={subtabNo === "31" ? "active" : ""}
                        >
                          Primary Support
                        </Link>
                      </li>
                      <li className={subtabNo === "32" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("32")}
                          className={subtabNo === "32" ? "active" : ""}
                        >
                          Supporting Document
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "31" && <PrimarySupport />}
                      {subtabNo === "32" && (
                        <SupportingDocument
                          state={myState}
                          handleSupportDocInputChange={
                            handleSupportDocInputChange
                          }
                          supportingDocValues={supportingDocValues}
                          SupportingDocInitialValues={
                            SupportingDocInitialValues
                          }
                          handleSuppDocGridChange={handleSuppDocGridChange}
                          handleAdditionDocInputChange={
                            handleAdditionDocInputChange
                          }
                          additionDocValues={additionDocValues}
                          AdditionDocInitialValues={AdditionDocInitialValues}
                          handleAdditionalDocGridChange={
                            handleAdditionalDocGridChange
                          }
                          setAdditionDocValues={setAdditionDocValues}
                        />
                      )}
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <Approvels state={myState} />
                  </TabPane>
                  <TabPane tabId="5">
                    <Payment state={myState} />
                  </TabPane>
                  <TabPane tabId="7">
                    <FollowUp state={myState} />
                  </TabPane>
                  <TabPane tabId="9">
                    <ReInvestigation state={myState} />
                  </TabPane>
                  <TabPane tabId="8">
                    <Marketing state={myState} />
                  </TabPane>
                  <TabPane tabId="10">
                    <SuccessStories_AfterApproved state={myState} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
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
              {/* <Col md={3}>
                <img
                  name="imgThumb"
                  src={
                    ApplicantThumbPrint === null ||
                    ApplicantThumbPrint === ""
                      ? SabSathDefault
                      : api.baseImageUrl + formFields.ApplicantThumbPrint
                  }
                  style={{
                    height: "130px",
                    width: "100%",
                    objectFit: "contain",
                    overflow: "hidden",
                    //marginLeft: "-55px",
                  }}
                />
              </Col>  */}
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
                {/* <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Code : "}
                </Label>
                <strong>{" " + PersInformation_Table[0]?.ApplicantPhoto}</strong> <br /> */}
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
                {/* <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Alternate Contact # : "}
                </Label>
                <strong>
                  {" " + ApplicantAlternateContactNumber}
                </strong>{" "}
                <br /> */}
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          {/* <CardHeader>
            <h6 className="font-weight-bold mb-0">Applicant Case Status</h6>
          </CardHeader> */}
          <CardBody>
            <Row>
              <Col>
                {/* <FormGroupTable rows={rows} columns={columns} onView={onView} /> */}
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

        {/* <ModalBody>
          <FormGroupTable rows={rows} columns={columns} onView={onView} />
        </ModalBody> */}

        {/* <ModalHeader toggle={toggleModal}>Applicant Personal Information</ModalHeader>
        <ModalBody>
          <FormGroupTable rows={PersInformation_Table} columns={PersInformation_Table_columns} onView={onView} />
        </ModalBody> */}

        {/* <ModalHeader toggle={toggleModal}>Applicant Family Information</ModalHeader>
        <ModalBody>
          <FormGroupTable rows={familyInformation_Table} columns={FamilyInfo_Columns} onView={onView} />
        </ModalBody> */}

        {/* <ModalHeader toggle={toggleModal}>Education Details</ModalHeader>
        <ModalBody>
          <FormGroupTable rows={EducationDetails_Table} columns={EducationDetails_Columns} onView={onView} />
        </ModalBody> */}

        {/* <ModalHeader toggle={toggleModal}>Medical CARD / DISABILITY / DISEASE  Details</ModalHeader>
        <ModalBody>
          <FormGroupTable rows={MedicalDetails_Table} columns={MedicalDetails_Columns} onView={onView} />
        </ModalBody> */}

        {/* <ModalHeader toggle={toggleModal}>Monthly Expanse Details</ModalHeader>
        <ModalBody>
          <FormGroupTable rows={MonthlyExpDetails_Table} columns={MonthlyExpanse_Columns} onView={onView} />
        </ModalBody>  */}

        {/* <ModalHeader toggle={toggleModal}>Guardians Details</ModalHeader>
        <ModalBody>
         <FormGroupTable rows={GuardiansDetails_Table} columns={Guardian_Columns} onView={onView} /> 
        </ModalBody>


        <ModalHeader toggle={toggleModal}>Earning Details</ModalHeader>
        <ModalBody>
        <FormGroupTable rows={EarningDetails_Table} columns={Earnings_Columns} onView={onView} /> 
        </ModalBody> */}
      </Modal>
    </>
  )
}

export default ApplicantDetail
