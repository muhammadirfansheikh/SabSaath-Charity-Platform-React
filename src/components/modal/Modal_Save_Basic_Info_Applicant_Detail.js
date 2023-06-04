import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { fetchData } from "../../utils/Api.js";
import { GetSetupMaster } from "../../utils/CommonMethods.js";
import {
  ApiMethods,
  ControllerName,
  SetupMasterIds,
} from "../../utils/Constants.js";
import Swal from "sweetalert2";

// const initiaFormlValues = {
//   FirstName: "",
//   LastName: "",
//   FatherHusbandName: "",
//   CnicNo: "",
//   GenderId: -1,
//   CountryId: -1,
//   ProvinceId: -1,
//   CityId: -1,
//   FundCategoryId: -1,
//   FundRequired: null,
//   InvestigatorId: -1,
//   NatureOfCaseId: -1,
//   NoOfHouseHoldMember: null,
//   NoOfFamilyMemberAccompanying: null,
//   PermanentAddress: "",
//   ReferrerTypeId: -1,
//   ApplicantCompanyId: -1,
//   ReferrerName: "",
//   RelationId: -1,
//   isJointFamily: false,
// };

// const initialSelectLists = {
//   GenderList: [],
//   CountryList: [],
//   ProvinceList: [],
//   CityList: [],
//   FundCategoryList: [],
//   InvestigatorList: [],
//   NatureOfCaseList: [],
//   ReferrerList: [],
//   ApplicantCompanyList: [],
//   RelationList: [],
// };

export const Modal_Save_Basic_Information = (props) => {
//   const resetModalFormelement = async () => { 
//     let ddlGender = await GetGender();
//     let ddlCountryData = await GetCountry();
//     let ddlProvinceData = await GetProvince(-1);
//     let ddlCityData = await GetCity(-1);
//     let ddlDistrictData = await GetDistrict(-1);
//     let ddlUnionData = await GetUnion(-1);
//     let ddlAreaData = await GetArea(-1);
//     let ddlNatureOfCase = await GetNatureOfCase();
//     let ddlCategory = await GetCatgeory();
//     let ddlRelationData = await props.GetRelation();
//     let ddlReferreTypeData = await props.GetReferrerType();
//     let ddlApplicantOrCompanyData =
//       await props.GetApplicantOrCompanyReferrerDataAccordingToType();

//     let ddlInvsetigator = await props.GetInvestigator();

//     setModalcountryddl(ddlCountryData.data);
//     setModalprovinceddl(ddlProvinceData.data);
//     setModalcityddl(ddlCityData.data);
//     setModaldistrictddl(ddlDistrictData.data);
//     setModalunionddl(ddlUnionData.data);
//     setModalAreaddl(ddlAreaData.data);
//     SetModalGenderddl(ddlGender.data);
//     setModalCaseOfNatureddl(ddlNatureOfCase.data);
//     SetModalCategory(ddlCategory.data);
//     setModalRelationddl(ddlRelationData.data);
//     SetModalReferrerType(ddlReferreTypeData.data);
//     SetModalInvestigatorddl(ddlInvsetigator.data);
//     SetModalApplicantOrCompany(ddlApplicantOrCompanyData.data);
//     setBasicInfoValues(initialValues);
 
//     props.ReBindGrid();
//   };

//   const handleModalCountryChangeEvent = async (e) => {
//     handleInputChange(e);
//     let data = await GetProvince(e.target.value);
//     setModalprovinceddl(data.data);
//   };

//   const handleModalProvinceChangeEvent = async (e) => {
//     handleInputChange(e);
//     let data = await GetCity(e.target.value);
//     setModalcityddl(data.data);
//   };

//   const handleModalReferrerTypeChangeEvent = async (e) => { 
//     handleInputChange(e);
//     let data = await props.GetApplicantOrCompanyReferrerDataAccordingToType(
//       e.target.value
//     );

//     const [BasicInfoValues, setBasicInfoValues] = useState(initialValues);

//     const [Modalcountryddl, setModalcountryddl] = useState([]);
//     const [Modalprovinceddl, setModalprovinceddl] = useState([]);
//     const [Modalcityddl, setModalcityddl] = useState([]);
//     const [Modaldistrictddl, setModaldistrictddl] = useState([]);
//     const [Modalunionddl, setModalunionddl] = useState([]);
//     const [ModalAreaddl, setModalAreaddl] = useState([]);
//     const [ModalRelationddl, setModalRelationddl] = useState([]);

//     const [ModalCaseOfNatureddl, setModalCaseOfNatureddl] = useState([]);
//     const [ModalGenderddl, SetModalGenderddl] = useState([]);
//     const [ModalCategory, SetModalCategory] = useState([]);
//     const [ModalApplicantOrCompany, SetModalApplicantOrCompany] = useState([]);
//     const [ModalReferrerType, SetModalReferrerType] = useState([]);
//     const [ModalInvestigatorddl, SetModalInvestigatorddl] = useState([]);

//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       let values = e.target.value;

//       if (e.target.type === "checkbox") values = e.target.checked;
//       else if (e.target.getAttribute("isnumber") == "true")
//         values = e.target.value.replace(/\D/g, "");

//       setBasicInfoValues({
//         ...BasicInfoValues,
//         [name]: values,
//       });
//     };
//     function toggle() {
//       props.closeNewmodal();
//     }

//     React.useEffect(() => {
//       const load = async () => {
//         resetModalFormelement();
//       };

//       load();
//     }, []);
//     const resetModalFormelement = async () => {
//       let ddlGender = await GetGender();
//       let ddlCountryData = await GetCountry();
//       let ddlProvinceData = await GetProvince(-1);
//       let ddlCityData = await GetCity(-1);
//       let ddlDistrictData = await GetDistrict(-1);
//       let ddlUnionData = await GetUnion(-1);
//       let ddlAreaData = await GetArea(-1);
//       let ddlNatureOfCase = await GetNatureOfCase();
//       let ddlCategory = await GetCatgeory();
//       let ddlRelationData = await props.GetRelation();
//       let ddlReferreTypeData = await props.GetReferrerType();
//       let ddlApplicantOrCompanyData =
//         await props.GetApplicantOrCompanyReferrerDataAccordingToType();

//       let ddlInvsetigator = await props.GetInvestigator();

//       setModalcountryddl(ddlCountryData.data);
//       setModalprovinceddl(ddlProvinceData.data);
//       setModalcityddl(ddlCityData.data);
//       setModaldistrictddl(ddlDistrictData.data);
//       setModalunionddl(ddlUnionData.data);
//       setModalAreaddl(ddlAreaData.data);
//       SetModalGenderddl(ddlGender.data);
//       setModalCaseOfNatureddl(ddlNatureOfCase.data);
//       SetModalCategory(ddlCategory.data);
//       setModalRelationddl(ddlRelationData.data);
//       SetModalReferrerType(ddlReferreTypeData.data);
//       SetModalInvestigatorddl(ddlInvsetigator.data);
//       SetModalApplicantOrCompany(ddlApplicantOrCompanyData.data);
//       setBasicInfoValues(initialValues);

//       props.ReBindGrid();
//     };

//     const handleModalCountryChangeEvent = async (e) => {
//       handleInputChange(e);
//       let data = await GetProvince(e.target.value);
//       setModalprovinceddl(data.data);
//     };

//     const handleModalProvinceChangeEvent = async (e) => {
//       handleInputChange(e);
//       let data = await GetCity(e.target.value);
//       setModalcityddl(data.data);
//     };

//     const handleModalReferrerTypeChangeEvent = async (e) => {
//       handleInputChange(e);
//       let data = await props.GetApplicantOrCompanyReferrerDataAccordingToType(
//         e.target.value
//       );

//       SetModalApplicantOrCompany(data.data);
//     };

//     // const handleModalCityChangeEvent = async (e) => {
//     //   handleInputChange(e);
//     //   let data = await GetDistrict(e.target.value);
//     //   setModaldistrictddl(data.data);
//     // };

//     const handleModalDistrictChangeEvent = async (e) => {
//       handleInputChange(e);
//       let data = await GetUnion(e.target.value);
//       setModalunionddl(data.data);
//     };

//     const handleModalUnionChangeEvent = async (e) => {
//       handleInputChange(e);
//       let data = await GetArea(e.target.value);
//       setModalAreaddl(data.data);
//     };

//     //   const GetRelation = async (e) => {

//     //         var data = await GetSetupMaster(SetupMasterIds.Relation, 0, "", 0);

//     //         return data;
//     //     }

//     // const GetCountry = async (e) => {
//     //   var data = await GetSetupMaster(SetupMasterIds.Country, 0, "", 0);

//     //   return data;
//     // };

//     // const GetGender = async (e) => {
//     //   var data = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0);

//     //   return data;
//     // };
//     // const GetProvince = async (CountryId = 0) => {
//     //   if (CountryId == "0") CountryId = "-1";

//     //   var data = await GetSetupMaster(
//     //     SetupMasterIds.Province,
//     //     CountryId,
//     //     "",
//     //     0
//     //   );

//     //   return data;
//     // };

//     // const GetCity = async (ProvinceId = 0) => {
//     //   if (ProvinceId == "0") ProvinceId = "-1";

//     //   var data = await GetSetupMaster(SetupMasterIds.City, ProvinceId, "", 0);

//     //   return data;
//     // };

//     // const GetDistrict = async (CityId = 0) => {
//     //   if (CityId == "0") CityId = "-1";

//     //   var data = await GetSetupMaster(SetupMasterIds.District, CityId, "", 0);

//     //   return data;
//     // };

//     // const GetUnion = async (DistrictId = 0) => { 
//     //   if (DistrictId == "0") DistrictId = "-1";

//     //   var data = await GetSetupMaster(SetupMasterIds.Union, DistrictId, "", 0);

//     //   return data;
//     // };

//     const handleModalCityChangeEvent = async (e) => { 
//       handleInputChange(e);
//       let data = await GetDistrict(e.target.value);
//       setModaldistrictddl(data.data);
//     };

//     // const handleModalDistrictChangeEvent = async (e) => { 
//     //   handleInputChange(e);
//     //   let data = await GetUnion(e.target.value);
//     //   setModalunionddl(data.data);
//     // };

//     // const handleModalUnionChangeEvent = async (e) => { 
//     //   handleInputChange(e);
//     //   let data = await GetArea(e.target.value);
//     //   setModalAreaddl(data.data);
//     // };

//     //   const GetRelation = async (e) => {

//     //         var data = await GetSetupMaster(SetupMasterIds.Relation, 0, "", 0);

//     //         return data;
//     //     }

//     const GetCountry = async (e) => {
//       var data = await GetSetupMaster(SetupMasterIds.Country, 0, "", 0);

//       return data;
//     };

//     const GetGender = async (e) => {
//       var data = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0);

//       return data;
//     };
//     const GetProvince = async (CountryId = 0) => { 
//       if (CountryId == "0") CountryId = "-1";

//       var data = await GetSetupMaster(
//         SetupMasterIds.Province,
//         CountryId,
//         "",
//         0
//       );

//       return data;
//     };

//     const GetCity = async (ProvinceId = 0) => { 
//       if (ProvinceId == "0") ProvinceId = "-1";

//       var data = await GetSetupMaster(SetupMasterIds.City, ProvinceId, "", 0);

//       return data;
//     };

//     // const GetApplicantOrCompanyReferrerDataAccordingToType = async (ReferrerType = 0) => {
//     //     try {

//     //         let RequestData = [ReferrerType];
//     //         const data = await fetchData(ControllerName.Applicant, ApiMethods.Get_Data_According_To_ReferrerType, RequestData);

//     //        
//     //         if (data != null) {
//     //             if (data.response === true && data.data != null) {
//     //                 SetModalApplicantOrCompany(data.data);
//     //             }
//     //             else {
//     //                 SetModalApplicantOrCompany([]);
//     //             }
//     //         }
//     //         else {
//     //             SetModalApplicantOrCompany([]);
//     //             Swal.fire({ title: 'Error', text: "Error", icon: 'error' });
//     //             //alert("Error");
//     //             
//     //         }
//     //     } catch (error) {
//     //         
//     //     }

//     // }

//     const GetDistrict = async (CityId = 0) => { 
//       if (CityId == "0") CityId = "-1";

//       var data = await GetSetupMaster(SetupMasterIds.District, CityId, "", 0);

//       return data;
//     };

//     const GetUnion = async (DistrictId = 0) => { 
//       if (DistrictId == "0") DistrictId = "-1";

//       e.preventDefault();

//       return data;
//     };

//     const GetArea = async (UnionId = 0) => { 
//       if (UnionId == "0") UnionId = "-1";

//       var data = await GetSetupMaster(
//         SetupMasterIds.Village_Muhalla,
//         UnionId,
//         "",
//         0
//       );

//       return data;
//     };
//     const GetNatureOfCase = async () => {
//       var data = await GetSetupMaster(SetupMasterIds.NatureOfCase, 0, "", 0);

//       return data;
//     };

//     const GetCatgeory = async () => {
//       var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

//       return data;
//     };

//     async function AddBasicInformationOfApplicantCase(e) {
//       try {
//         e.preventDefault(); 

//         if (BasicInfoValues.NameOfApplicant !== "0") {
//           if (BasicInfoValues.FHName != "") {
//             if (BasicInfoValues.CNICNo != "") {
//               if (BasicInfoValues.ContactNo != "") {
//                 if (BasicInfoValues.CNICNo.length == 13) {
//                   if (BasicInfoValues.GenderValue != "0") {
//                     if (BasicInfoValues.CountryValue != "0") {
//                       if (BasicInfoValues.ProvinceValue != "0") {
//                         if (BasicInfoValues.CityValue != "0") {
//                           if (BasicInfoValues.DistrictValue != "0") {
//                             if (BasicInfoValues.UnionValue != "0") {
//                               if (BasicInfoValues.AreaValue != "0") {
//                                 if (BasicInfoValues.PermanentAddress != "") {
//                                   if (BasicInfoValues.CategoryValue != "0") {
//                                     if (
//                                       BasicInfoValues.FundsRequired != "" &&
//                                       parseInt(BasicInfoValues.FundsRequired) >
//                                         0
//                                     ) {
//                                       var UserId =
//                                         localStorage.getItem("UserId");
//                                       var UserIp =
//                                         localStorage.getItem("UserIP");
//                                       let RequestData;
//                                       let data;

//                                       let objPrimaryInformation = {
//                                         Nameofpplicant:
//                                           BasicInfoValues.NameOfApplicant,
//                                         FatherNameHusbandName:
//                                           BasicInfoValues.FHName,
//                                         CNIC: BasicInfoValues.CNICNo,
//                                         ContactNo: BasicInfoValues.ContactNo,
//                                         CountryId: BasicInfoValues.CountryValue,
//                                         ProvinceId:
//                                           BasicInfoValues.ProvinceValue,
//                                         CityId: BasicInfoValues.CityValue,
//                                         DistrictId:
//                                           BasicInfoValues.DistrictValue,
//                                         UnionId: BasicInfoValues.UnionValue,
//                                         AreaId: BasicInfoValues.AreaValue,
//                                         PermenantAddress:
//                                           BasicInfoValues.PermanentAddress,
//                                         FundsCategory:
//                                           BasicInfoValues.CategoryValue,
//                                         FundsRequired:
//                                           BasicInfoValues.FundsRequired,
//                                         InvestigatorId:
//                                           BasicInfoValues.InvestigatorValue,
//                                         IsActive: BasicInfoValues.IsActive,

//                                         ReferralTypeId:
//                                           BasicInfoValues.ReferrerTypeValue,
//                                         ReferedByEmployeeID: null,
//                                         ReferedByCompanyId: null,
//                                         ReferedByApplicantId: null,
//                                         ReferedByFamilyId: null,

//                                         ReferedByName:
//                                           BasicInfoValues.ReferrerName,
//                                         RelationshipId:
//                                           BasicInfoValues.RelationValue,
//                                         NatureOfCase:
//                                           BasicInfoValues.NatureOfCaseValue,
//                                         GenderId: BasicInfoValues.GenderValue,
//                                         NoOfFamilyMembersAccompanying:
//                                           BasicInfoValues.NoOfFamilyMembersAccompanying,
//                                         NoOfHouseHoldMembers:
//                                           BasicInfoValues.NoOfHouseHoldMembers,
//                                         IsJoinFamily:
//                                           BasicInfoValues.IsJoinedFamily,
//                                         UserIp: UserIp,
//                                         CreatedBy: UserId,
//                                       };

//                                       switch (
//                                         parseInt(
//                                           BasicInfoValues.ReferrerTypeValue
//                                         )
//                                       ) {
//                                         case 1:
//                                           objPrimaryInformation.ReferedByEmployeeID =
//                                             null;
//                                           objPrimaryInformation.ReferedByCompanyId =
//                                             null;
//                                           objPrimaryInformation.ReferedByApplicantId =
//                                             BasicInfoValues.ApplicantOrCompanyId;
//                                           objPrimaryInformation.ReferedByFamilyId =
//                                             null;
//                                           break;
//                                         case 2:
//                                           objPrimaryInformation.ReferedByEmployeeID =
//                                             null;
//                                           objPrimaryInformation.ReferedByCompanyId =
//                                             BasicInfoValues.ApplicantOrCompanyId;
//                                           objPrimaryInformation.ReferedByApplicantId =
//                                             null;
//                                           objPrimaryInformation.ReferedByFamilyId =
//                                             null;
//                                           break;
//                                         case 3:
//                                           objPrimaryInformation.ReferedByEmployeeID =
//                                             null;
//                                           objPrimaryInformation.ReferedByCompanyId =
//                                             BasicInfoValues.ApplicantOrCompanyId;
//                                           objPrimaryInformation.ReferedByApplicantId =
//                                             null;
//                                           objPrimaryInformation.ReferedByFamilyId =
//                                             null;
//                                           break;
//                                         case 4:
//                                           objPrimaryInformation.ReferedByEmployeeID =
//                                             null;
//                                           objPrimaryInformation.ReferedByCompanyId =
//                                             null;
//                                           objPrimaryInformation.ReferedByApplicantId =
//                                             null;
//                                           objPrimaryInformation.ReferedByFamilyId =
//                                             BasicInfoValues.ApplicantOrCompanyId;
//                                           break;
//                                         default:
//                                           objPrimaryInformation.ReferedByEmployeeID =
//                                             null;
//                                           objPrimaryInformation.ReferedByCompanyId =
//                                             null;
//                                           objPrimaryInformation.ReferedByApplicantId =
//                                             null;
//                                           objPrimaryInformation.ReferedByFamilyId =
//                                             null;
//                                       }

//                                       RequestData = [objPrimaryInformation];
//                                       data = await fetchData(
//                                         ControllerName.Applicant,
//                                         ApiMethods.Register_Applicant_Case,
//                                         RequestData
//                                       );

//                                     
//                                       if (data != null) {
//                                         if (data.data[0].haserror !== 1) {
//                                           Swal.fire({
//                                             title: "Success",
//                                             text: data.data[0].Message,
//                                             icon: "success",
//                                           });
//                                           props.closeNewmodal();

//                                           resetModalFormelement();
//                                         } else {
//                                           Swal.fire({
//                                             title: "Error",
//                                             text: data.data[0].Message,
//                                             icon: "warning",
//                                           });
//                                         }
//                                       } else {
//                                         Swal.fire({
//                                           title: "Error",
//                                           text: "Something Went Wrong",
//                                           icon: "warning",
//                                         });
//                                         //alert("Error");
//                                         
//                                       }
//                                     }

//                                     RequestData = [objPrimaryInformation];
//                                     data = await fetchData(
//                                       ControllerName.Applicant,
//                                       ApiMethods.Register_Applicant_Case,
//                                       RequestData
//                                     );

//                                    
//                                     if (data != null) {
//                                       if (data.data[0].haserror !== 1) {
//                                         Swal.fire({
//                                           title: "Success",
//                                           text: data.data[0].Message,
//                                           icon: "success",
//                                         });
//                                         props.closeNewmodal();

//                                         resetModalFormelement();
//                                       } else {
//                                         Swal.fire({
//                                           title: "Error",
//                                           text: data.data[0].Message,
//                                           icon: "warning",
//                                         });
//                                       }
//                                     } else {
//                                       Swal.fire({
//                                         title: "Error",
//                                         text: "Something Went Wrong",
//                                         icon: "warning",
//                                       });
//                                        
//                                     }
//                                   } else {
//                                     Swal.fire({
//                                       title: "Error",
//                                       text: "Enter Required Funds Or Required Funds Must Be Greater Then Zero.",
//                                       icon: "warning",
//                                     });
//                                   }
//                                 } else {
//                                   Swal.fire({
//                                     title: "Error",
//                                     text: "Select Category",
//                                     icon: "warning",
//                                   });
//                                 }
//                               } else {
//                                 Swal.fire({
//                                   title: "Error",
//                                   text: "Enter Permanant Address.",
//                                   icon: "warning",
//                                 });
//                               }
//                             } else {
//                               Swal.fire({
//                                 title: "Error",
//                                 text: "Select Area",
//                                 icon: "warning",
//                               });
//                             }
//                           } else {
//                             Swal.fire({
//                               title: "Error",
//                               text: "Select Union",
//                               icon: "warning",
//                             });
//                           }
//                         } else {
//                           Swal.fire({
//                             title: "Error",
//                             text: "Select District",
//                             icon: "warning",
//                           });
//                         }
//                       } else {
//                         Swal.fire({
//                           title: "Error",
//                           text: "Select City",
//                           icon: "warning",
//                         });
//                       }
//                     } else {
//                       Swal.fire({
//                         title: "Error",
//                         text: "Select Province",
//                         icon: "warning",
//                       });
//                     }
//                   } else {
//                     Swal.fire({
//                       title: "Error",
//                       text: "Select Country",
//                       icon: "warning",
//                     });
//                   }
//                 } else {
//                   Swal.fire({
//                     title: "Error",
//                     text: "Select Gender",
//                     icon: "warning",
//                   });
//                 }
//               } else {
//                 Swal.fire({
//                   title: "Error",
//                   text: "CNIC Length Must Be Equal To 15 Character. ",
//                   icon: "warning",
//                 });
//               }
//             } else {
//               Swal.fire({
//                 title: "Error",
//                 text: "Enter Contact No",
//                 icon: "warning",
//               });
//             }
//           } else {
//             Swal.fire({
//               title: "Error",
//               text: "Enter CNIC No ",
//               icon: "warning",
//             });
//           }
//         }
//         // else {
//         //       //alert("Enter Area Name");
//         //       Swal.fire({
//         //         title: "Error",
//         //         text: "Enter Father/Husband Name",
//         //         icon: "warning",
//         //       });
//         //     }
//         //   } else {
//         //     Swal.fire({
//         //       title: "Error",
//         //       text: "Enter Applicant Name",
//         //       icon: "warning",
//         //     });
//         //   }
//       } catch (error) { 
//       }
//     }

//     return (
//       <Modal isOpen={props.Ismodalshow} toggle={toggle} size="lg">
//         <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
//         <ModalBody>
//           <Form>
//             <div>
//               <Row>
//                 <FormGroup>
//                   <Label>CNIC</Label>
//                   <Input
//                     placeholder="CNIC"
//                     type="text"
//                     name="CnicNo"
//                     isnumber="true"
//                     onChange={handleInputChange}
//                     value={BasicInfoValues.CnicNo}
//                     maxLength="13"
//                   />
//                 </FormGroup>
//               </Row>
//               <Card className="mb-3">
//                 <CardHeader>
//                   <h6 className="font-weight-bold mb-0">Details</h6>
//                 </CardHeader>
//                 <CardBody>
//                   <Row>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label>Name Of Applicant</Label>
//                         <Input
//                           placeholder="Name Of Applicant"
//                           type="text"
//                           name="NameOfApplicant"
//                           onChange={handleInputChange}
//                           value={BasicInfoValues.NameOfApplicant}
//                           maxLength="50"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label>Father/Husband Name</Label>
//                         <Input
//                           placeholder="Father/Husband Name"
//                           type="text"
//                           name="FHName"
//                           onChange={handleInputChange}
//                           value={BasicInfoValues.FHName}
//                           maxLength="50"
//                         />
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label>CNIC</Label>
//                         <Input
//                           placeholder="CNIC"
//                           type="text"
//                           name="CNICNo"
//                           isnumber="true"
//                           onChange={handleInputChange}
//                           value={BasicInfoValues.CNICNo}
//                           maxLength="13"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label>Contact</Label>
//                         <Input
//                           placeholder="Contact"
//                           type="text"
//                           name="ContactNo"
//                           isnumber="true"
//                           onChange={handleInputChange}
//                           value={BasicInfoValues.ContactNo}
//                           maxLength="11"
//                         />
//                       </FormGroup>
//                     </Col>
//                     {/* </Row>
//                 <Row> */}
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Gender</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="GenderValue"
//                           type="select"
//                           value={BasicInfoValues.GenderValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalGenderddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Country</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="CountryValue"
//                           type="select"
//                           value={BasicInfoValues.CountryValue}
//                           onChange={handleModalCountryChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {Modalcountryddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Province</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="ProvinceValue"
//                           type="select"
//                           value={BasicInfoValues.ProvinceValue}
//                           onChange={handleModalProvinceChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {Modalprovinceddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">City</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="CityValue"
//                           type="select"
//                           value={BasicInfoValues.CityValue}
//                           onChange={handleModalCityChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {Modalcityddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     {/* </Row>
//                 <Row> */}
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">District</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="DistrictValue"
//                           type="select"
//                           value={BasicInfoValues.DistrictValue}
//                           onChange={handleModalDistrictChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {Modaldistrictddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Union</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="UnionValue"
//                           type="select"
//                           value={BasicInfoValues.UnionValue}
//                           onChange={handleModalUnionChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {Modalunionddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Area</Label>
//                         <Input
//                           id="exampleSelect"
//                           name="AreaValue"
//                           type="select"
//                           value={BasicInfoValues.AreaValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalAreaddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Fund Category</Label>
//                         <Input
//                           id="exampleSelect1"
//                           name="CategoryValue"
//                           type="select"
//                           value={BasicInfoValues.CategoryValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalCategory.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     {/* </Row>
//                 <Row> */}
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Funds Required</Label>
//                         <Input
//                           type="text"
//                           onChange={handleInputChange}
//                           name="FundsRequired"
//                           isnumber="true"
//                           value={BasicInfoValues.FundsRequired}
//                           maxLength="13"
//                         />
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Investigator</Label>
//                         <Input
//                           id="exampleSelect1NOCase"
//                           name="InvestigatorValue"
//                           type="select"
//                           value={BasicInfoValues.InvestigatorValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalInvestigatorddl.map((item, key) => (
//                             <option key={item.Name} value={item.UserId}>
//                               {item.Name}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Nature Of Case</Label>
//                         <Input
//                           id="exampleSelect1NOCase"
//                           name="NatureOfCaseValue"
//                           type="select"
//                           value={BasicInfoValues.NatureOfCaseValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalCaseOfNatureddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                     {/* </Row>
//                 <Row> */}
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">No Of House Hold Members</Label>
//                         <Input
//                           type="text"
//                           onChange={handleInputChange}
//                           name="NoOfHouseHoldMembers"
//                           isnumber="true"
//                           value={BasicInfoValues.NoOfHouseHoldMembers}
//                           maxLength="13"
//                         />
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">No Of Family Members Accompanying</Label>
//                         <Input
//                           type="text"
//                           onChange={handleInputChange}
//                           name="NoOfFamilyMembersAccompanying"
//                           isnumber="true"
//                           value={BasicInfoValues.NoOfFamilyMembersAccompanying}
//                           maxLength="13"
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={12}>
//                       <FormGroup>
//                         <Label for="">Permanant Address</Label>
//                         <Input
//                           type="text"
//                           onChange={handleInputChange}
//                           name="PermanentAddress"
//                           value={BasicInfoValues.PermanentAddress}
//                           maxLength="100"
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Referrer Type</Label>
//                         <Input
//                           id="exampleSelect1NOCase"
//                           name="ReferrerTypeValue"
//                           type="select"
//                           value={BasicInfoValues.ReferrerTypeValue}
//                           onChange={handleModalReferrerTypeChangeEvent}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalReferrerType.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.ConstantValue}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Applicant/Company</Label>
//                         <Input
//                           id="exampleSelect1NOCase"
//                           name="ApplicantOrCompanyId"
//                           type="select"
//                           value={BasicInfoValues.ApplicantOrCompanyId}
//                           onChange={handleInputChange}
//                         >
//                           {ModalApplicantOrCompany.map((item, key) => (
//                             <option
//                               key={item.FeildValue}
//                               value={item.FeildValue}
//                             >
//                               {item.FeildName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>

//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Name</Label>
//                         <Input
//                           type="text"
//                           onChange={handleInputChange}
//                           name="ReferrerName"
//                           value={BasicInfoValues.ReferrerName}
//                           maxLength="50"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col md={3}>
//                       <FormGroup>
//                         <Label for="">Relation</Label>
//                         <Input
//                           id="exampleSelect1NOCase"
//                           name="RelationValue"
//                           type="select"
//                           value={BasicInfoValues.RelationValue}
//                           onChange={handleInputChange}
//                         >
//                           <option key={0} value={0}>
//                             Select
//                           </option>

//                           {ModalRelationddl.map((item, key) => (
//                             <option
//                               key={item.SetupDetailName}
//                               value={item.SetupDetailId}
//                             >
//                               {item.SetupDetailName}
//                             </option>
//                           ))}
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={4}>
//                       <FormGroup>
//                         <div className="form-check-inline mt-3">
//                           <Label className="form-check-Label">
//                             <Input
//                               type="checkbox"
//                               className="form-check-Input"
//                               name="IsJoinedFamily"
//                               checked={BasicInfoValues.IsJoinedFamily}
//                               onChange={handleInputChange}
//                             />
//                             Is Join Family ?
//                           </Label>
//                         </div>
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </CardBody>
//               </Card>
//             </div>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={AddBasicInformationOfApplicantCase}>
//             Save
//           </Button>
//           <Button color="secondary" onClick={toggle}>
//             Close
//           </Button>
//         </ModalFooter>
//       </Modal>
//     );
//   };
};
export default Modal_Save_Basic_Information;
