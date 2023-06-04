import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";
import { fetchData } from "../utils/Api.js";
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  Roles,
  SetupMasterIds,
} from "../utils/Constants.js";
import { GetSetupMaster, GetUser } from "../utils/CommonMethods.js";

import GridUnAssignedApplicantCases from "components/Grids/GridUnAssignedApplicantCases";
import GridMyCases from "components/Grids/GridMyCases";
import GridFollowUpCases from "components/Grids/GridFollowUpCases";
import GridUpCommingInvestigation from "components/Grids/GridUpCommingInvestigation";
import GridInvestigationPending from "components/Grids/GridInvestigationPending";
import GridCloseCases from "components/Grids/GridCloseCases";
import GridMarketingCases from "components/Grids/GridMarketing";
import { useHistory } from "react-router-dom";
import Modal_Save_Basic_Information from "components/modal/Modal_Save_Basic_Info_Applicant_Detail.js";

import Swal from "sweetalert2";
import Relation from "./Relation.js";

const ApplicantList = (props) => {
  const initialValues = {
    serachApplicantCode: "",
    serachApplicantCaseCode: "",
    searchApplicantName: "",
    searchApplicantCNIC: "",
    searchContactNo: "",
    searchGenderValue: 0,
    searchCountryValue: 0,
    searchProvinceValue: 0,
    searchCityValue: 0,
    searchDistrictValue: 0,
    searchUnionValue: 0,
    serachAreaValue: 0,
    sesrchCaseOfNatureValue: 0,
    searchSupportValue: 0,
    searchCategoryValue: 0,
    searchFrequency: 0,
    serachReferralTypeConstant: 0,
    searchReferredById: 0,
    searchReferedByName: "",
    searchRelationShipId: 0,
    searchIsCaseOfADay: 2,
    seacrhIsJoinFamily: 2,
    searchIsClose: 2,
    searchIsShowCase: 2,
    searchIsCaseTerminated: 2,
    searchIsBlock: 2,
    searchIsFreezed: 2,
    searchInvestigatorId: 0,
    searchtab: 1,
  };

  const [activetabNo, setactivetabNo] = useState("1");
  const [render, setrender] = useState(0);
  const history = useHistory();
  const [searchvalues, setSearchValues] = useState(initialValues);
  const [applicantList, setapplicantList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applicantEditId, setapplicantEditId] = useState(0);
  const [countryddl, setcountryddl] = useState([]);
  const [provinceddl, setprovinceddl] = useState([]);
  const [cityddl, setcityddl] = useState([]);
  const [genderddl, setgenderddl] = useState([]);
  const [caseOfNatureddl, setcaseOfNatureddl] = useState([]);
  const [supportddl, setsupportddl] = useState([]);
  const [categoryddl, setcategoryddl] = useState([]);
  const [frequencyddl, setfrequencyddl] = useState([]);
  const [districtddl, setdistrictddl] = useState([]);
  const [unionddl, setunionddl] = useState([]);
  const [areaddld, setareaddld] = useState([]);
  const [caseOfAddl, setcaseOfAddl] = useState([]);
  const [joinFamilyddl, setjoinFamilyddl] = useState([]);
  const [showCaseddl, setshowCaseddl] = useState([]);
  const [blockddl, setblockddl] = useState([]);
  const [referrerTypeddld, setreferrerTypeddld] = useState([]);
  const [referedByIdddl, setreferedByIdddl] = useState([]);
  const [raltionShipddl, setraltionShipddl] = useState([]);
  const [closeCasesddl, setcloseCasesddl] = useState([]);
  const [freezeddl, setfreezeddl] = useState([]);
  const [investigatorddl, setinvestigatorddl] = useState([]);

  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
    let values = e.target.value;

    if (e.target.type === "checkbox") values = e.target.checked;
    else if (e.target.getAttribute("isnumber") == "true")
      values = e.target.value.replace(/\D/g, "");

    setSearchValues({
      ...searchvalues,
      [name]: values,
    });
  };

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      resetFormelement();
    };
    load();
  }, []);

  React.useEffect(() => {
    setapplicantList([]);
    if (render > 0) {
      ReBindGrid();
    }

    setrender(render + 1);
  }, [activetabNo]);
  const resetFormelement = async () => {
    let ddlGender = await GetGender();
    let ddlCountryData = await GetCountry();
    let ddlProvinceData = await GetProvince(-1);
    let ddlCityData = await GetCity(-1);
    let ddlDistrictData = await GetDistrict(-1);
    let ddlUnionData = await GetUnion(-1);
    let ddlAreaData = await GetArea(-1);
    let ddlNatureOfCase = await GetNatureOfCase();
    let ddlSupport = await GetCatgeory();
    let ddlSubCategory = await GetFundCatgeory(-1);
    let ddlFrequencyData = await GetFrequency();
    let ddlCaseOfNAturedata = await GetNatureOfCase();
    let ddlReferrerTypedata = await GetReferrerType();
    let ddlReferredByData =
      await GetApplicantOrCompanyReferrerDataAccordingToType();
    let ddlRelationData = await GetRelation();
    let ddlInvestigatorData = await GetInvestigator();

    setinvestigatorddl(ddlInvestigatorData.data);
    setcountryddl(ddlCountryData.data);
    setprovinceddl(ddlProvinceData.data);
    setcityddl(ddlCityData.data);
    setdistrictddl(ddlDistrictData.data);
    setunionddl(ddlUnionData.data);
    setareaddld(ddlAreaData.data);
    setgenderddl(ddlGender.data);
    setcaseOfNatureddl(ddlNatureOfCase.data);
    setsupportddl(ddlSupport.data);
    setcategoryddl(ddlSubCategory.data);
    setfrequencyddl(ddlFrequencyData.data);
    setcaseOfNatureddl(ddlCaseOfNAturedata.data);
    setreferrerTypeddld(ddlReferrerTypedata.data);
    setreferedByIdddl(ddlReferredByData.data);
    setraltionShipddl(ddlRelationData.data);
    setSearchValues(initialValues);

    ReBindGrid();
  };

  const GetApplicantOrCompanyReferrerDataAccordingToType = async (
    ReferrerType = 0
  ) => {
    try {
      let RequestData = [ReferrerType];
      const data = await fetchData(
        ControllerName.Applicant,
        ApiMethods.Get_Data_According_To_ReferrerType,
        RequestData
      );

      // 
      if (data != null) {
        if (data.response === true && data.data != null) {
          return data;
        } else {
          return [];
        }
      } else {
        return [];
        //alert("Error");
        //
      }
    } catch (error) {
      //    
    }
  };
  const GetRelation = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Relation, 0, "", 0);

    return data;
  };

  const onDelete = async ({ ApplicantCaseId }) => {
    try {
      var UserId = localStorage.getItem("UserId");
      var UserIp = localStorage.getItem("UserIP");

      var deleteData = await DeleteApplicantCase(
        ApplicantCaseId,
        UserId,
        UserIp
      );

      if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
          //alert(deleteData.data[0].Message);
          Swal.fire({
            title: "Error",
            text: deleteData.data[0].Message,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "success",
            text: "Deleted Successfully",
            icon: "success",
          });
          // alert("Deleted Successfully");
        }
      }
      resetFormelement();
    } catch (e) {
      Swal.fire({ title: "Error", text: e, icon: "error" });
    }
  };
  const GetReferrerType = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.ReferrerType, 0, "", 0);

    return data;
  };
  const AssignInvetigator = async (
    InvestigatorId,
    Remarks,
    ApplicantCaseId
  ) => {
    ////There Apply Investigation Officer Save Functionality

    alert();
  };
  const DeleteApplicantCase = async (ApplicantCaseId, CreatedBy, UserIP) => {
    //Apply Delete API for Delete Applicant
    ////;
    //var RequestData = { OperationId: OperationTypeId.Delete, SetupDetailId: SetupDetailId, CreatedBy: CreatedBy, UserIP: UserIP }
    //const data = await fetchData(ControllerName.Setup, ApiMethods.MasterDetail_Operation, RequestData);
    //// 
    //if (data != null) {
    //    if (data.response === true && data.data != null) {
    //        return data;
    //    }
    //    else {
    //        return [];
    //    }
    //}
    //else {
    //    return [];
    //    Swal.fire({ title: 'Error', text: "Error", icon: 'error' }); 
    //}
  };

  const GetCountry = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Country, 0, "", 0);

    return data;
  };

  const GetGender = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0);

    return data;
  };
  const GetProvince = async (CountryId = 0) => {
  
    if (CountryId == "0") CountryId = "-1";

    var data = await GetSetupMaster(SetupMasterIds.Province, CountryId, "", 0);

    return data;
  };

  const GetFrequency = async () => {
  

    var data = await GetSetupMaster(SetupMasterIds.Frequency, 0, "", 0);

    return data;
  };
  const GetCity = async (ProvinceId = 0) => {
  
    if (ProvinceId == "0") ProvinceId = "-1";

    var data = await GetSetupMaster(SetupMasterIds.City, ProvinceId, "", 0);

    return data;
  };

  const GetDistrict = async (CityId = 0) => {
  
    if (CityId == "0") CityId = "-1";

    var data = await GetSetupMaster(SetupMasterIds.District, CityId, "", 0);

    return data;
  };

  const GetUnion = async (DistrictId = 0) => {
  
    if (DistrictId == "0") DistrictId = "-1";

    var data = await GetSetupMaster(SetupMasterIds.Union, DistrictId, "", 0);

    return data;
  };

  const GetArea = async (UnionId = 0) => {
  
    if (UnionId == "0") UnionId = "-1";

    var data = await GetSetupMaster(
      SetupMasterIds.Village_Muhalla,
      UnionId,
      "",
      0
    );

    return data;
  };
  const GetNatureOfCase = async () => {
    var data = await GetSetupMaster(SetupMasterIds.NatureOfCase, 0, "", 0);

    return data;
  };

  const GetCatgeory = async () => {
    var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

    return data;
  };
  const GetFundCatgeory = async (CategoryId) => {
  
    if (CategoryId == "0") CategoryId = "-1";

    var data = await GetSetupMaster(
      SetupMasterIds.FundCategory,
      CategoryId,
      "",
      0
    );

    return data;
  };
  const handleSearchClick = async (e) => {
    e.preventDefault();
  
  
    ReBindGrid();
  };

  const handleCancelClick = async (e) => {
  
    e.preventDefault();

    setSearchValues(initialValues);

    resetFormelement();
  };

  const handleSearchCountryChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await GetProvince(e.target.value);
    setprovinceddl(data.data);
  };

  const handleSearchProvinceChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await GetCity(e.target.value);
    setcityddl(data.data);
  };

  const handleSearcSupportChangeEvent = async (e) => {
 
    handleInputChange(e);
    let data = await GetFundCatgeory(e.target.value);
    setcategoryddl(data.data);
  };

  const onEdit = (Id) => {
    history.push("/admin/ApplicantDetail/" + Id);
  };

  const handleSearchCityChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await GetDistrict(e.target.value);
    setdistrictddl(data.data);
  };

  const handleSearchDistrictChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await GetUnion(e.target.value);
    setunionddl(data.data);
  };

  const handleModalReferrerTypeChangeEvent = async (e) => {
 
    handleInputChange(e);
    let data = await GetApplicantOrCompanyReferrerDataAccordingToType(
      e.target.value
    );

    setreferedByIdddl(data.data);
  };

  const handleSearchUnitChangeEvent = async (e) => {
    handleInputChange(e);
    let data = await GetArea(e.target.value);
    setareaddld(data.data);
  };
  const GetInvestigator = async () => {
    var data = await GetUser("", "", Roles.InvestigatingOfficerRoleId);

    return data;
  };
  const ReBindGrid = async () => {
 
    let finalData = [];
    try {
      let ObjSearch = {
        ApplicantCode: searchvalues.serachApplicantCode,
        ApplicantCaseCode: searchvalues.serachApplicantCaseCode,
        CategoryId: searchvalues.searchCategoryValue,
        Cnic: searchvalues.searchApplicantCNIC,
        GenderID: searchvalues.searchGenderValue,
        FullName: searchvalues.searchApplicantName,
        ProvinceId: searchvalues.searchProvinceValue,
        Village_CityId: searchvalues.searchCityValue,
        IsBlocked: searchvalues.searchIsBlock,
        countryid: searchvalues.searchCountryValue,

        referbyid: searchvalues.searchReferredById,
        referbyname: searchvalues.searchReferedByName,

        muhallahid: searchvalues.serachAreaValue,
        unionid: searchvalues.searchUnionValue,
        districtid: searchvalues.searchDistrictValue,
        refertypeconstant: searchvalues.serachReferralTypeConstant,
        Isjoinfamily: searchvalues.seacrhIsJoinFamily,
        referrealationshipid: searchvalues.searchRelationShipId,
        IsShowcase: searchvalues.searchIsShowCase,
        ISCaseofaday: searchvalues.searchIsCaseOfADay,
        isclosed: searchvalues.searchIsClose,
        isfreeze: searchvalues.searchIsFreezed,
        investigatorid: searchvalues.searchInvestigatorId,
        tab: activetabNo,
        isterminate: searchvalues.searchIsCaseTerminated,
      };

   

      let RequestData = ObjSearch;
      const data = await fetchData(
        ControllerName.Applicant,
        ApiMethods.Get_Applicant_Cases,
        RequestData
      );
      console.log(JSON.stringify(data.data));
      if (data != null) {
        if (data.response === true && data.data != null) {
          finalData = data.data;
        } else {
          finalData = [];
        }
      } else {
        finalData = [];
        Swal.fire({ title: "Error", text: "Error", icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error, icon: "error" });
      finalData = [];
      
    }

    setapplicantList([...finalData]);

    ////Apply Fetch Data According To This Filter For Appolicant.
  };
  const openNewmodal = () => {
 

    setOpenModal(true);
  };
  const closeNewmodal = () => {
    setOpenModal(false);

    resetFormelement();
    setSearchValues(initialValues);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form>
                                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant Code</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="serachApplicantCode"
                          value={searchvalues.serachApplicantCode}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant Case Code</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="serachApplicantCaseCode"
                          value={searchvalues.serachApplicantCaseCode}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant Name</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="searchApplicantName"
                          maxLength="50"
                          value={searchvalues.searchApplicantName}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant CNIC</Label>
                        <Input
                          type="text"
                          isnumber="true"
                          onChange={handleInputChange}
                          name="searchApplicantCNIC"
                          value={searchvalues.searchApplicantCNIC}
                          maxLength="13"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant Contact</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="searchContactNo"
                          isnumber="true"
                          value={searchvalues.searchContactNo}
                          maxLength="13"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Gender</Label>
                        <Input
                          id="exampleSelect"
                          name="searchGenderValue"
                          type="select"
                          value={searchvalues.searchGenderValue}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {genderddl.map((item, key) => (
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

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Country</Label>
                        <Input
                          id="exampleSelect"
                          name="searchCountryValue"
                          type="select"
                          value={searchvalues.searchCountryValue}
                          onChange={handleSearchCountryChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {countryddl.map((item, key) => (
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

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Province</Label>
                        <Input
                          id="exampleSelect"
                          name="searchProvinceValue"
                          type="select"
                          value={searchvalues.searchProvinceValue}
                          onChange={handleSearchProvinceChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {provinceddl.map((item, key) => (
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
                  </Row>

                                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">City</Label>
                        <Input
                          id="exampleSelect"
                          name="searchCityValue"
                          type="select"
                          value={searchvalues.searchCityValue}
                          onChange={handleSearchCityChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {cityddl.map((item, key) => (
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
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">District</Label>
                        <Input
                          id="exampleSelect"
                          name="searchDistrictValue"
                          type="select"
                          value={searchvalues.searchDistrictValue}
                          onChange={handleSearchDistrictChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {districtddl.map((item, key) => (
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

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Union</Label>
                        <Input
                          id="exampleSelect"
                          name="searchUnionValue"
                          type="select"
                          value={searchvalues.searchUnionValue}
                          onChange={handleSearchUnitChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {unionddl.map((item, key) => (
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
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Area</Label>
                        <Input
                          id="exampleSelect"
                          name="serachAreaValue"
                          type="select"
                          value={searchvalues.serachAreaValue}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {areaddld.map((item, key) => (
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
                  </Row>
                                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Support</Label>
                        <Input
                          id="exampleSelect"
                          name="searchSupportValue"
                          type="select"
                          value={searchvalues.searchSupportValue}
                          onChange={handleSearcSupportChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {supportddl.map((item, key) => (
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
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Catgroy</Label>
                        <Input
                          id="exampleSelect"
                          name="searchUnionValue"
                          type="select"
                          value={searchvalues.searchCategoryValue}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {categoryddl.map((item, key) => (
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

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Frequency</Label>
                        <Input
                          id="exampleSelect"
                          name="searchFrequency"
                          type="select"
                          value={searchvalues.searchFrequency}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {frequencyddl.map((item, key) => (
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

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Case Of Nature</Label>
                        <Input
                          id="exampleSelect"
                          name="sesrchCaseOfNatureValue"
                          type="select"
                          value={searchvalues.sesrchCaseOfNatureValue}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {caseOfNatureddl.map((item, key) => (
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
                  </Row>
                                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Referrer Type</Label>
                        <Input
                          id="exampleSelect1NOCase"
                          name="serachReferralTypeConstant"
                          type="select"
                          value={searchvalues.serachReferralTypeConstant}
                          onChange={handleModalReferrerTypeChangeEvent}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {referrerTypeddld.map((item, key) => (
                            <option
                              key={item.SetupDetailName}
                              value={item.ConstantValue}
                            >
                              {item.SetupDetailName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Applicant/Company</Label>
                        <Input
                          id="exampleSelect1NOCase"
                          name="searchReferredById"
                          type="select"
                          value={searchvalues.searchReferredById}
                          onChange={handleInputChange}
                        >
                          {referedByIdddl.map((item, key) => (
                            <option
                              key={item.FeildValue}
                              value={item.FeildValue}
                            >
                              {item.FeildName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Referer Name</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="searchReferedByName"
                          value={searchvalues.searchReferedByName}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Investigator</Label>
                        <Input
                          id="exampleSelect1NOCase"
                          name="searchInvestigatorId"
                          type="select"
                          value={searchvalues.searchInvestigatorId}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {investigatorddl.map((item, key) => (
                            <option key={item.Name} value={item.UserId}>
                              {item.Name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        onClick={handleSearchClick}
                      >
                        Search
                      </Button>
                      <Button color="secondary" size="sm" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Applicant Cases List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button
                      color="primary2"
                      className="m-0"
                      onClick={() => openNewmodal()}
                    >
                      Register New Case
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={activetabNo === "2" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("2");
                      }}
                    >
                      Un Assigned
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activetabNo === "1" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("1");
                      }}
                    >
                      Investigation
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={activetabNo === "3" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("3");
                      }}
                    >
                      Investigation Pending Cases
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={activetabNo === "4" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("4");
                      }}
                    >
                      Follow Up
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={activetabNo === "5" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("5");
                      }}
                    >
                      Closed
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={activetabNo === "6" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("6");
                      }}
                    >
                      Re Investigation
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={activetabNo === "7" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("7");
                      }}
                    >
                      Maketing
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="1">
                    {activetabNo === "1" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridMyCases
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="2">
                    {activetabNo === "2" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridUnAssignedApplicantCases
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="3">
                    {activetabNo === "3" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridInvestigationPending
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="4">
                    {activetabNo === "4" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridFollowUpCases
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="5">
                    {activetabNo === "5" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridCloseCases
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="6">
                    {activetabNo === "6" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridUpCommingInvestigation
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="7">
                    {activetabNo === "7" &&
                      applicantList != null &&
                      applicantList.length > 0 && (
                        <GridMarketingCases
                          ApplicantList={applicantList}
                          SaveAssignInvestigator={AssignInvetigator}
                          onEdit={onEdit}
                        />
                      )}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openModal && (
          <Modal_Save_Basic_Information
            {...props}
            HeaderText="Add Applicant Basic Information"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            GetCountry={GetCountry}
            GetProvince={GetProvince}
            GetCity={GetCity}
            GetDistrict={GetDistrict}
            GetUnion={GetUnion}
            GetReferrerType={GetReferrerType}
            GetApplicantOrCompanyReferrerDataAccordingToType={
              GetApplicantOrCompanyReferrerDataAccordingToType
            }
            GetRelation={GetRelation}
            GetInvestigator={GetInvestigator}
            ReBindGrid={ReBindGrid}
          />
        )}
      </div>
    </>
  );
};

export default ApplicantList;
