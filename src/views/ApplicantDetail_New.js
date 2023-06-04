import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  check,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import PrimaryInformation_New from "../components/Tabs/PrimaryInformation_New.js";
import PersonalInformation_New from "../components/Tabs/PersonalInformation_New.js";
import FamilyMemberInformation from "../components/Tabs/FamilyMemberInformation.js";
import EducationDetails from "../components/Tabs/EducationDetails.js";
import MedicalDetail from "../components/Tabs/MedicalDetails.js";
import MonthlyExpenseDetail from "../components/Tabs/MonthlyExpenseDetail.js";
import AdditionalDetails from "../components/Tabs/AdditionalDetails.js";

import AssetsInformation from "../components/Tabs/AssetsInformation.js";
import CommitteeDetails from "../components/Tabs/CommitteeDetails.js";
import DiseaseDisabledDetails from "../components/Tabs/DiseaseDisabledDetails.js";
// import HomeAppliances from '../components/Tabs/HomeAppliances.js'
import LoanDetails from "../components/Tabs/LoanDetails.js";
import PetsDetails from "../components/Tabs/PetsDetails.js";
import SourceOfDrinkingSanitationAndWashroom from "../components/Tabs/SourceOfDrinkingSanitationAndWashroom.js";

import PrimarySupport from "../components/Tabs/PrimarySupport.js";
import SupportingDocument from "../components/Tabs/SupportingDocument.js";
import EducationAssistanceChecklist from "../components/Tabs/EducationAssistanceChecklist.js";
import MedicalAssistanceChecklist from "../components/Tabs/MedicalAssistanceChecklist.js";
import MarriageAssistanceChecklist from "../components/Tabs/MarriageAssistanceChecklist.js";
import RationAssistanceChecklist from "../components/Tabs/RationAssistanceChecklist.js";

import Approvels from "../components/Tabs/Approvels.js";
import Payment from "../components/Tabs/Payment.js";
import Story from "../components/Tabs/Story.js";
import FollowUp from "../components/Tabs/FollowUps.js";

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
  HomeAppInitialValues,
  SupportingDocInitialValues,
  AdditionDocInitialValues,
  PrimarySupportInitialValues,
  SecondarySupportInitialValues,
} from "../utils/Common.js";
import { fetchData } from "../utils/Api.js";
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  SetupMasterIds,
  Roles,
} from "../utils/Constants.js";
import Swal from "sweetalert2";

const ApplicantDetail_New = (props) => {
  const [tabNo, settabNo] = useState("1");
  const [subtabNo, setsubtabNo] = useState("11");
  const [primaryValues, setPrimaryValues] = useState(PrimaryinitialValues);
  const [personalValues, setpersonalValues] = useState(PersonalinitialValues);
  const [familyValues, setFamilyValues] = useState(FamilyInitialValues);
  const [educationDetailsValues, seteducationDetailsValues] = useState(
    EducationDetailinitialValues
  );
  const [medicalDetailValues, setmedicalDetailValues] = useState(
    MedicalDetailinitialValues
  );
  const [monthlyExpenseValues, setMonthlyExpenseValues] = useState(
    MonthlyExpenseInitialValues
  );
  const [generalAdditionalDetailValues, setGeneralAdditionalDetailValues] =
    useState(GeneralAdditionalDetailInitialValues);
  const [petsValues, setPetsValues] = useState(PetsInitialValues);
  const [drinkSanitationValues, setDrinkSanitationValues] = useState(
    DrinkSanitationInitialValues
  );
  const [diseaseDisableValues, setDiseaseDisableValues] = useState(
    DiseaseDisableInitialValues
  );
  const [loanValues, setLoanValues] = useState(LoanInitialValues);
  const [committeValues, setCommitteValues] = useState(CommitteInitialValues);
  const [assetsValues, setAssetsValues] = useState(AssetsInitialValues);
  const [supportingDocValues, setSupportingDocValues] = useState(
    SupportingDocInitialValues
  );
  const [additionDocValues, setAdditionDocValues] = useState(
    AdditionDocInitialValues
  );
  const [primarySupportValues, setPrimarySupportValues] = useState(
    PrimarySupportInitialValues
  );
  const [secondarySupportValues, setSecondarySupportValues] = useState(
    SecondarySupportInitialValues
  );

  const handlePrimaryInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPrimaryValues({
      ...primaryValues,
      [name]: values,
    });
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setpersonalValues({
      ...personalValues,
      [name]: values,
    });
  };
  const handleFamilyInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFamilyValues({
      ...familyValues,
      [name]: values,
    });
  };

  const handleFamilyGridChange = (FamilyGridList) => {
    setFamilyValues({ ...familyValues, FamilyDetailGridList: FamilyGridList });
  };
  const handleEducatrionDetailInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    seteducationDetailsValues({
      ...educationDetailsValues,
      [name]: values,
    });
  };

  const handleMedicalDetailInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setmedicalDetailValues({
      ...medicalDetailValues,
      [name]: values,
    });
  };

  const handleMonthlyExpenseInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setMonthlyExpenseValues({
      ...monthlyExpenseValues,
      [name]: values,
    });
  };
  const handleAdditionalInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setGeneralAdditionalDetailValues({
      ...generalAdditionalDetailValues,
      [name]: values,
    });
  };
  const handleExpenseGridChange = (ExpenseGridList) => {
    setMonthlyExpenseValues({
      ...monthlyExpenseValues,
      ExpenseGridList: ExpenseGridList,
    });
  };

  const handlePetsInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPetsValues({
      ...petsValues,
      [name]: values,
    });
  };
  const handlePetsGridChange = (PetsGridList) => {
    setPetsValues({
      ...petsValues,
      PetsGridList: PetsGridList,
      petId: "0",
      Quantity: "",
      ExpenseAmount: "",
    });
  };

  const handleDrinkingInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDrinkSanitationValues({
      ...drinkSanitationValues,
      [name]: values,
    });
  };
  const handleDiseaseInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDiseaseDisableValues({
      ...diseaseDisableValues,
      [name]: values,
    });
  };
  const handleLoanInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLoanValues({
      ...loanValues,
      [name]: values,
    });
  };
  const handleCommitteInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCommitteValues({
      ...committeValues,
      [name]: values,
    });
  };
  const handleLoanGridChange = (LoanGrid) => {
    setLoanValues({ ...loanValues, LoanGrid: LoanGrid });
  };
  const handleCommitteGridChange = (CommitteGrid) => {
    setCommitteValues({ ...committeValues, CommitteGrid: CommitteGrid });
  };

  const handleSupportDocInputChange = (e) => {
    //e.preventDefault();
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setSupportingDocValues({
      ...supportingDocValues,
      [name]: values,
    });
  };
  const handleAdditionDocInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setAdditionDocValues({
      ...additionDocValues,
      [name]: values,
    });
  };
  const handleSuppDocGridChange = (SupportDocGrid) => {
    setSupportingDocValues({
      ...supportingDocValues,
      SupportDocGrid: SupportDocGrid,
    });
  };
  const handleAdditionalDocGridChange = (AdditionalDocGrid) => {
    setAdditionDocValues({
      ...additionDocValues,
      AdditionalDocGrid: AdditionalDocGrid,
    });
  };

  const handlePrimarySuppInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPrimarySupportValues({
      ...primarySupportValues,
      [name]: values,
    });
  };
  const handlePrimarySuppGridChange = (PrimarySupportGrid) => {
    setPrimarySupportValues({
      ...primarySupportValues,
      PrimarySupportGrid: PrimarySupportGrid,
    });
  };
  const handleSecondarySuppInputChange = (e) => {
    const { name, value } = e.target;
    const values =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSecondarySupportValues({
      ...secondarySupportValues,
      [name]: values,
    });
  };
  const handleSecondarySuppGridChange = (SecondarySupportGrid) => {
    setSecondarySupportValues({
      ...secondarySupportValues,
      SecondarySupportGrid: SecondarySupportGrid,
    });
  };
  async function GetSetupMaster(SetupMasterId, ParentId) {
    try {
      var RequestData = {
        OperationId: OperationTypeId.Select,
        SetupMasterId: SetupMasterId,
        ParentId: ParentId,
      };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.MasterDetail_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");
        Swal.fire({
          title: "Error",
          text: "same thing went wrong",
          icon: "error",
        });
        //    
      }
    } catch (error) {
      return [];
      //     
    }
  }

  async function GetInvestigatingOfficer(RoleId) {
    try {
      var RequestData = {
        OperationTypeId: OperationTypeId.Select,
        RoleId: RoleId,
      };
      const data = await fetchData(
        ControllerName.User,
        ApiMethods.CrudUser,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        // alert("Error");
        Swal.fire({ title: "Error", text: "Error", icon: "Error" }); 
      }
    } catch (error) {
      return [];
      
    }
  }

  async function GetCompany() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Company_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");manzoor commit
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //    
      }
    } catch (error) {
      return [];
    
    }
  }

  async function GetBeneficiary() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Beneficiary_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        // alert("Error");manzoor commit
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //    
      }
    } catch (error) {
      return [];
    
    }
  }

  async function GetCategory() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Category_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");manzoor commit
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //      
      }
    } catch (error) {
      return [];
      //    
    }
  }
  async function GetFundCategory() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.FundCategory_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");manzoor commit
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //     
      }
    } catch (error) {
      return [];
      //    
    }
  }

  async function GetFrequency() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.Frequency_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //   
      }
    } catch (error) {
      return [];
      //    
    }
  }
  async function GetPaymentType() {
    try {
      var RequestData = { OperationId: OperationTypeId.Select };
      const data = await fetchData(
        ControllerName.Setup,
        ApiMethods.PaymentType_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        // alert("Error");manzoor commit
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //    
      }
    } catch (error) {
      return [];
      
    }
  }

  React.useEffect(() => {
    // console.log("sdfad");
    const LoadGender = async () => {
      let tempDate = new Date();
      let date =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate();
      var AllSetupDetail = await GetSetupMaster(0, 0);
      var InvestigatingOfficers = await GetInvestigatingOfficer(
        Roles.InvestigatingOfficerRoleId
      );
      var Companyddl = await GetCompany();
      var Benificiaryddl = await GetBeneficiary();
      var Categoryddl = await GetCategory();
      var FundCategoryddl = await GetFundCategory();
      var Frequencyddl = await GetFundCategory();
      var PaymentTypeddl = await GetPaymentType();

      var responseGenderList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Gender
      );
      var responseProvinceList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Province
      );
      var responseNatureOfCase = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.NatureOfCase
      );
      var responseCity = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.City
      );
      var responseUnion = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Union
      );
      var responseCouncil = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Council
      );
      var responseVillage_Muhalla = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Village_Muhalla
      );
      var responseMaritalList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.MaritalStatus
      );
      var responseRelationList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Relation
      );
      var responseExpenseList = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Expense
      );
      var responseOccupation = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Occupation
      );
      var responseReferrer = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Referrer
      );
      var responsePets = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.Pets
      );
      var responseSourceOfDrinking = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.SourceOfDrinking
      );
      var responseLoanType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.LoanType
      );
      var responseSuppDocumentType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.SupportingDocuments
      );
      var responseDocumentType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.DocumentParentTypes
      );
      var responseDocumentSubType = AllSetupDetail.filter(
        (item) => item.SetupMasterId === SetupMasterIds.DocumentSubTypes
      );
      //  var responseAdditionalList=await GetSetupMaster(SetupMasterIds.Expense,0);

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
      });

      setFamilyValues({
        RelationList: responseRelationList,
        MaritalList: responseMaritalList,
      });

      setMonthlyExpenseValues({ ExpenseDdl: responseExpenseList });

      setGeneralAdditionalDetailValues({
        Companyddl: Companyddl,
        Beneficiaryddl: Benificiaryddl,
        Organizationddl: Companyddl,
        AssistanceDetailddl: Categoryddl,
        Occupationddl: responseOccupation,
        Referrerddl: responseReferrer,
      });

      setPetsValues({ petsddlList: responsePets });

      setDrinkSanitationValues({ SourceDrinkddl: responseSourceOfDrinking });

      setSupportingDocValues({
        SupportDocumnetTypeddl: responseSuppDocumentType,
      });

      setAdditionDocValues({
        DocumnetTypeddl: responseDocumentType,
        DocumnetSubTypeddl: responseDocumentSubType,
      });
    };
    LoadGender();
  }, []);

  function ValidateParams(params) {
    return primaryValues.some((item) => item.hasOwnProperty(params));
  }
  function SetSubTabOnParentTab(params) {
    settabNo(params);
    setsubtabNo((params + "" + 1).toString());
  }
  async function OnCLickSave(e) {
    try {
      e.preventDefault();
      var ListOfFamily = [];
      var UserId = localStorage.getItem("UserId");
      var UserIp = localStorage.getItem("UserIP");

      var RequestData = {
        ApplicantInformation: {
          OperationId: 2,
          ApplicantDate: primaryValues.ApplicationDate,
          Cnic: primaryValues.CNIC,
          FullName: primaryValues.ApplicantName,
          DateOfBirth: primaryValues.DOB,
          GenderId: primaryValues.GenderId,
          FullName: primaryValues.FullName,
        },
        ApplicantCaseDetail: {
          ApplicantId: 0,
          ApplicantCaseId: 0,
          ApplicantCaseCode: "",
          MartialStatusId: primaryValues.MartialStatusId,
          Father_HusbandName: primaryValues.Father_HusbandName,
          ContactNumber: primaryValues.ContactNumber,
          ProvinceId: primaryValues.ProvinceId,
          CityId: primaryValues.CityId,
          UnionId: primaryValues.UnionId,
          CouncilId: primaryValues.CouncilId,
          Village_Muhalla_Id: primaryValues.Village_MuhallaId,
          TemporaryAddress: primaryValues.TemporaryAddress,
          PermanentAddress: primaryValues.PermanentAddress,
          InvestigatingOfficerId: primaryValues.InvestigatingOfficerId,
          ReferrerName: primaryValues.Referrer,
          CaseNatureId: primaryValues.NatureOfCaseId,
          IsCriminalActivity: primaryValues.IsCriminalActivity,
          IsPartOfBannedOrg: primaryValues.IsPartOfBannedOrg,
          CreatedBy: UserId,
          UserIP: UserIp,
        },
        ApplicantFamilyInformation: familyValues.FamilyDetailGridList,
      };
      const data = await fetchData(
        ControllerName.Applicant,
        ApiMethods.Applicant_Operation,
        RequestData
      );
      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data.data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");
        Swal.fire({ title: "Error", text: "Error", icon: "Error" });
        //    
      }
    } catch (error) {
      return [];
      //     
    }
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
                    User
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0">
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={tabNo === "0" ? "active" : ""}
                      onClick={() => SetSubTabOnParentTab("0")}
                    >
                      Basic Details
                    </NavLink>
                  </NavItem>

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
                      Approvels
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
                  <NavItem>
                    <NavLink
                      className={tabNo === "6" ? "active" : ""}
                      onClick={() => settabNo("6")}
                    >
                      Story
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={tabNo === "7" ? "active" : ""}
                      onClick={() => settabNo("7")}
                    >
                      Follow Up
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={tabNo}>
                  <TabPane tabId="1">
                    <ul className="nav nav-tabs">
                      <li className={subtabNo === "11" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("11")}
                          activeclassname={subtabNo === "11" ? "active" : ""}
                        >
                          Primary InformationN
                        </Link>
                      </li>
                      <li className={subtabNo === "12" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("12")}
                          activeclassname={subtabNo === "12" ? "active" : ""}
                        >
                          Personal Information
                        </Link>
                      </li>
                      <li className={subtabNo === "13" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("13")}
                          activeclassname={subtabNo === "13" ? "active" : ""}
                        >
                          Family Member Information
                        </Link>
                      </li>
                      <li className={subtabNo === "14" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("14")}
                          activeclassname={subtabNo === "14" ? "active" : ""}
                        >
                          Education Details
                        </Link>
                      </li>
                      <li className={subtabNo === "15" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("15")}
                          activeclassname={subtabNo === "15" ? "active" : ""}
                        >
                          Medical Details
                        </Link>
                      </li>
                      <li className={subtabNo === "16" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("16")}
                          activeclassname={subtabNo === "16" ? "active" : ""}
                        >
                          Monthly Expense Detail
                        </Link>
                      </li>
                      <li className={subtabNo === "17" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("17")}
                          activeclassname={subtabNo === "17" ? "active" : ""}
                        >
                          Additional Details
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "11" && (
                        <PrimaryInformation_New
                          {...props}
                          PrimaryinitialValues={PrimaryinitialValues}
                          primaryValues={primaryValues}
                          handlePrimaryInputChange={handlePrimaryInputChange}
                        />
                      )}
                      {subtabNo === "12" && (
                        <PersonalInformation_New
                          Aid={props.location.state.ApplicantId}
                          PersonalinitialValues={PersonalinitialValues}
                          personalValues={personalValues}
                          handlePersonalInputChange={handlePersonalInputChange}
                        />
                      )}
                      {subtabNo === "13" && (
                        <FamilyMemberInformation
                          {...props}
                          FamilyInitialValues={FamilyInitialValues}
                          familyValues={familyValues}
                          handleFamilyInputChange={handleFamilyInputChange}
                          handleFamilyGridChange={handleFamilyGridChange}
                        />
                      )}
                      {subtabNo === "14" && (
                        <EducationDetails
                          {...props}
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
                          {...props}
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
                          {...props}
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
                          {...props}
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
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <ul className="nav nav-tabs">
                      <li className={subtabNo === "21" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("21")}
                          activeclassname={subtabNo === "21" ? "active" : ""}
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
                          activeclassname={subtabNo === "23" ? "active" : ""}
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
                          activeclassname={subtabNo === "26" ? "active" : ""}
                        >
                          Pets Details
                        </Link>
                      </li>
                      <li className={subtabNo === "27" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("27")}
                          activeclassname={subtabNo === "27" ? "active" : ""}
                        >
                          Source of Drinking/ Sanitation and Washroom
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "21" && <AssetsInformation />}
                      {/* {
                      subtabNo==="22" &&
                      <HomeAppliances/>
                    } */}
                      {subtabNo === "23" && (
                        <LoanDetails
                          {...props}
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
                      {
                        // subtabNo==="24" &&
                        // <CommitteeDetails/>
                      }
                      {
                        // subtabNo==="25" &&
                        // <DiseaseDisabledDetails {...props}
                        // handleDiseaseInputChange={handleDiseaseInputChange}
                        // diseaseDisableValues={diseaseDisableValues}
                        // DiseaseDisableInitialValues={DiseaseDisableInitialValues}
                        // />
                      }
                      {subtabNo === "26" && (
                        <PetsDetails
                          {...props}
                          handlePetsInputChange={handlePetsInputChange}
                          petsValues={petsValues}
                          PetsInitialValues={PetsInitialValues}
                          handlePetsGridChange={handlePetsGridChange}
                        />
                      )}
                      {subtabNo === "27" && (
                        <SourceOfDrinkingSanitationAndWashroom
                          {...props}
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
                          activeclassname={subtabNo === "31" ? "active" : ""}
                        >
                          Primary Support
                        </Link>
                      </li>
                      <li className={subtabNo === "32" ? "active" : ""}>
                        <Link
                          to="#"
                          onClick={() => setsubtabNo("32")}
                          activeclassname={subtabNo === "32" ? "active" : ""}
                        >
                          Supporting Document
                        </Link>
                      </li>
                      {
                        // <li className={subtabNo==="33"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("33")} activeclassname={subtabNo==="33"?"active":""}>
                        // Education Assistance Checklist</Link>
                        // </li>
                        // <li className={subtabNo==="34"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("34")} activeclassname={subtabNo==="34"?"active":""}>
                        // Medical Assistance Checklist</Link>
                        // </li>
                        // <li className={subtabNo==="35"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("35")} activeclassname={subtabNo==="35"?"active":""}>
                        // Marriage Assistance Checklist</Link>
                        // </li>
                        // <li className={subtabNo==="36"?"active":""}>
                        // <Link  onClick={()=>setsubtabNo("36")} activeclassname={subtabNo==="36"?"active":""}>
                        // Ration Assistance Checklist</Link>
                        // </li>
                      }
                    </ul>
                    <div className="tab-content">
                      {subtabNo === "31" && <PrimarySupport />}
                      {subtabNo === "32" && (
                        <SupportingDocument
                          {...props}
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
                      {
                        // subtabNo==="33" &&
                        // <EducationAssistanceChecklist/>
                      }
                      {
                        // subtabNo==="34" &&
                        // <MedicalAssistanceChecklist/>
                      }
                      {
                        // subtabNo==="35" &&
                        // <MarriageAssistanceChecklist/>
                      }
                      {
                        // subtabNo==="36" &&
                        // <RationAssistanceChecklist/>
                      }
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <Approvels />
                  </TabPane>
                  <TabPane tabId="5">
                    <Payment />
                  </TabPane>
                  <TabPane tabId="6">
                    <Story />
                  </TabPane>
                  <TabPane tabId="7">
                    <FollowUp />
                  </TabPane>
                </TabContent>
                <Col md={12} className="text-right">
                  <FormGroup>
                    <Button color="primary" onClick={(e) => OnCLickSave(e)}>
                      Save
                    </Button>
                  </FormGroup>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ApplicantDetail_New;
