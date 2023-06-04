import React, { useEffect, useRef, useState } from "react"
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
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import { fetchData } from "../utils/Api.js"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
  Roles,
  SetupMasterIds,
} from "../utils/Constants.js"
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  GetSetupMaster,
  GetUser,
} from "../utils/CommonMethods.js"
import * as api from "../utils/Api.js"
import { useHistory } from "react-router-dom"
import ModalBasicInfo from "components/modal/ModalBasicInfo.js"
import Swal from "sweetalert2"
import TabGrid from "components/Grids/TabGrid"
import ModalAssignInvestigator from "components/modal/ModalAssignInvestigator.js"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import FollowUpModal from "components/modal/FollowUpModal.jsx"
import FormGroupCheckbox from "../components/GeneralComponent/FormGroupCheckbox.jsx"
import DatePicker from "react-datepicker"
import moment from "moment"
import { useIsMount } from "hooks/useIsMount.js"
import { kdf } from "crypto-js"

const ApplicantListing = (props) => {
  var UserId = localStorage.getItem("UserId")
  var UserIP = localStorage.getItem("UserIP")
  const isMount = useIsMount()
  const initialValues = {
    FromDate: null,
    ToDate: null,
    // FromDate: getDate(Date.now() - 2592000000, "-", "yyyy/mm/dd"),
    // ToDate: getDate(Date.now(), "-", "yyyy/mm/dd"),
    ApplicantCode: "",
    ApplicantCaseCode: "",
    ApplicantName: "",
    Cnic: "",
    ReferralName: "",
    GenderID: 0,
    CountryId: 0,
    ProvinceId: 0,
    CityId: 0,
    FundCategoryId: 0,
    CaseNatureId: 0,
    Referral_TypeId: 0,
    Investigatorid: 0,
    TabName: "",
    UserId: localStorage.getItem("UserId"),
    UserIP: localStorage.getItem("UserIP"),
    IsCaseStory: 2,
    ViewFilterId: 2,
    CaseStatusId: 0,
  }

  const basicInfoValues = {
    UserId: localStorage.getItem("UserId"),
    NameOfApplicant: "",
    FHName: "",
    CNICNo: "",
    ContactNo: "",
    CountryValue: 0,
    ProvinceValue: 0,
    CityValue: 0,
    DistrictValue: 0,
    UnionValue: 0,
    AreaValue: 0,
    PermanentAddress: "",
    CategoryValue: 0,
    IsJoinedFamily: false,
    IsActive: true,
    NoOfHouseHoldMembers: 0,
    NoOfFamilyMembersAccompanying: 0,
    FundsRequired: 0,
    InvestigatorValue: 0,
    ReferrerTypeValue: 0,
    ApplicantOrCompanyId: 0,
    ReferrerName: "",
    RelationValue: 0,
    NatureOfCaseValue: 0,
    GenderValue: 0,
  }

  const initialValuesAss = {
    Id: 0,
    InvestigatorId: 0,
    Remarks: "",
    ApplicantId: 0,
  }

  const columns = [
    {
      name: "Applicant Case Code",
      selector: "ApplicantCaseCode",
      sortable: true,
      width: "50px",
      cell: (row) => <span>{row?.ApplicantCaseCode}</span>,
      omit: false,
      wrap: true,
    },
    {
      name: "Applicant Name",
      selector: "ApplicantName",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "CNIC",
      selector: "CnicNo",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Gender",
      selector: "Gender",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "City",
      selector: "City",
      sortable: true,
      width: "150px",
      omit: false,
    },

    {
      name: "Area",
      selector: "Area",
      sortable: true,
      width: "150px",
      omit: false,
    },

    {
      name: "Case Nature",
      selector: "CaseNature",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Fund Category",
      selector: "FundCategory",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Fund Required",
      selector: "FundAmount_Required",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Investigator",
      selector: "Investigator",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Referrer",
      selector: "ReferralName",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Case Status",
      selector: "CaseStatus",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "No Of Days",
      selector: "NoOfDays",
      sortable: true,
      width: "150px",
      omit: false,
    },
    {
      name: "Contact No",
      selector: "ApplicantPrimaryContactNumber",
      sortable: true,
      width: "150px",
      omit: false,
    },
  ]

  const columnsMkt = [
    {
      field: "ApplicantCaseCode",
      name: "Applicant Case Code",
    },
    {
      field: "ApplicantName",
      name: "Applicant Name",
    },
    {
      field: "CnicNo",
      name: "CNIC",
    },
    {
      field: "Gender",
      name: "Gender",
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
      field: "CaseNature",
      name: "Case Nature",
    },
    {
      field: "FundCategory",
      name: "Fund Category",
    },
    {
      field: "FundAmount_Required",
      name: "Fund Required",
    },
    {
      field: "Investigator",
      name: "Investigator",
    },
    {
      field: "ReferralName",
      name: "Referrer",
    },
    {
      field: "CaseStatus",
      name: "Case Status",
    },
    {
      field: "CaseTitle",
      name: "CaseTitle",
    },
    {
      field: "NoOfDays",
      name: "No Of Days",
    },

    {
      field: "IsCaseShow",
      name: "Case on Web",
    },
  ]

  const RoleId = localStorage.getItem("RoleId")
  const formRef = useRef(null)

  const [activetabNo, setactivetabNo] = useState(
    RoleId !== Roles.Marketing.toLocaleString() ? "Mycases" : "Marketing"
  )
  const [render, setrender] = useState(0)
  const history = useHistory()
  const [searchvalues, setSearchValues] = useState(initialValues)
  const [isDateChanged, setIsDateChanged] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [countryddl, setcountryddl] = useState([])
  const [provinceddl, setprovinceddl] = useState([])
  const [cityddl, setcityddl] = useState([])
  const [genderddl, setgenderddl] = useState([])
  const [caseOfNatureddl, setcaseOfNatureddl] = useState([])

  const [caseStatusddl, setcaseStatusddl] = useState([])

  const [supportddl, setsupportddl] = useState([])
  const [categoryddl, setcategoryddl] = useState([])
  const [frequencyddl, setfrequencyddl] = useState([])
  const [districtddl, setdistrictddl] = useState([])
  const [unionddl, setunionddl] = useState([])
  const [areaddld, setareaddld] = useState([])
  const [referrerTypeddld, setreferrerTypeddld] = useState([])
  const [referedByIdddl, setreferedByIdddl] = useState([])
  const [investigatorddl, setinvestigatorddl] = useState([])
  const [openAssignModalPopUpModal, setopenAssignModalPopUpModal] =
    useState(false)
  const [assignApplicantCaseId, setassignApplicantCaseId] = useState([])
  const [assignedInvestigatorId, setassignedInvestigatorId] = useState([])
  const [valuesAss, setValuesAss] = useState(initialValuesAss)
  const [valuesBasicInfo, setValuesBasicInfo] = useState(basicInfoValues)
  const [followUpModal, setFollowUpModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [applicantLists, setApplicantLists] = useState([])
  const [followUpDetail, setFollowUpDetail] = useState({})

  const closeAssignInvestigatorModalNewmodal = () => {
    setopenAssignModalPopUpModal(false)
  }

  const openNewmodalAssign = (obj) => {
    setassignApplicantCaseId(obj.Caseid)
    setassignedInvestigatorId(obj.Investigatorid)
    setopenAssignModalPopUpModal(true)
  }

  const onAssign = (obj) => {
    openNewmodalAssign(obj)
    setValuesAss({
      ...valuesAss,
      // Id: obj.Caseid,
      // ApplicantId: obj.ApplicantId,
      InvestigatorId: obj.Investigatorid,
      ApplicantCase_InvestigationId: obj.ApplicantCase_InvestigationId,
    })
  }

  const onView = (row) => {
    //history.push(
    //  "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
    //  { ACIid: row.ApplicantCase_InvestigationId, isEdit: row.IsEdit }
    //);
    console.log("localStorage.setItem")
    window.open(
      "/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId,
      "_blank"
    )

    localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId)
    //localStorage.setItem("role", row.IsEdit);
    localStorage.setItem("role", row.IsEdit == true ? 1 : 0)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "InvestigatorId" || name === "Remarks") {
      setValuesAss({
        ...valuesAss,
        [name]: value,
      })
    } else {
      setSearchValues({
        ...searchvalues,
        [name]: value,
      })
    }
  }

  const handleDateChange = (event, type) => {
    if (type === "FromDate") {
      setIsDateChanged(true)
    }

    setSearchValues({
      ...searchvalues,
      [type]: getDate(event, "-", "yyyy/mm/dd"),
    })
  }

  const fetchApplicantId = async (search) => {
    // Reduce data fetching by memoization.
    if (
      applicantLists[activetabNo] &&
      applicantLists[activetabNo].length > 0 &&
      !search
    ) {
      return
    }

    setLoading(true)
    // if (activetabNo === "Mycases" && isMount && !isDateChanged) {
    //   setSearchValues({
    //     ...searchvalues,
    //     FromDate:
    //       activetabNo === "Mycases" && isMount
    //         ? getDate(new Date(null), "-", "yyyy/mm/dd")
    //         : searchvalues.FromDate,
    //   })
    // }

    // if (activetabNo !== "Mycases" && !isDateChanged) {
    //   setSearchValues({
    //     ...searchvalues,
    //     FromDate: initialValues.FromDate,
    //   })
    // }

    fetchData("Applicant", "Get_Applicant_List", {
      ...searchvalues,
      // FromDate:
      //   activetabNo === "Mycases" && isMount && !isDateChanged
      //     ? getDate(new Date(null), "-", "yyyy/mm/dd")
      //     : !isDateChanged
      //     ? initialValues.FromDate
      //     : searchvalues.FromDate,
      TabName: activetabNo,
      UserId: parseInt(UserId),
    })
      .then((result) => {
        if (!search) {
          setApplicantLists({
            ...applicantLists,
            [activetabNo]: result?.DataSet?.Table,
          })
        } else {
          setApplicantLists({
            [activetabNo]: result?.DataSet?.Table,
          })
        }
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.log(e)
      })
  }

  useEffect(() => {
    if (isMount) return
    fetchApplicantId()
  }, [activetabNo])

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      resetFormelement()
    }
    load()
  }, [])

  React.useEffect(() => {
    if (render > 0) {
      ReBindGrid()
    }
    setrender(render + 1)
  }, [])
  const resetFormelement = async () => {
    let ddlGender = await GetGender()
    let ddlCountryData = await GetCountry()
    let ddlProvinceData = await GetProvince(-1)
    let ddlCityData = await GetCity(-1)
    let ddlDistrictData = await GetDistrict(-1)
    let ddlUnionData = await GetUnion(-1)
    let ddlAreaData = await GetArea(-1)
    let ddlNatureOfCase = await GetNatureOfCase()
    let ddlSupport = await GetCatgeory()
    let ddlSubCategory = await GetCatgeory()
    let ddlFrequencyData = await GetFrequency()
    let ddlCaseOfNAturedata = await GetNatureOfCase()
    let ddlReferrerTypedata = await GetReferrerType()
    let ddlReferredByData =
      await GetApplicantOrCompanyReferrerDataAccordingToType()
    let ddlInvestigatorData = await GetInvestigator()
    let ddlCaseStatusData = await GetCaseStatus()

    setinvestigatorddl(ddlInvestigatorData.data)
    setcountryddl(ddlCountryData.data)
    setprovinceddl(ddlProvinceData.data)
    setcityddl(ddlCityData.data)
    setdistrictddl(ddlDistrictData.data)
    setunionddl(ddlUnionData.data)
    setareaddld(ddlAreaData.data)
    setgenderddl(ddlGender.data)
    setcaseOfNatureddl(ddlNatureOfCase.data)
    setsupportddl(ddlSupport.data)
    setcategoryddl(ddlSubCategory.data)
    setfrequencyddl(ddlFrequencyData.data)
    setcaseOfNatureddl(ddlCaseOfNAturedata.data)
    setreferrerTypeddld(ddlReferrerTypedata.data)
    setreferedByIdddl(ddlReferredByData.data)
    //setraltionShipddl(ddlRelationData.data);

    setcaseStatusddl(ddlCaseStatusData.data)
    setSearchValues(initialValues)
    ReBindGrid()
  }

  const GetApplicantOrCompanyReferrerDataAccordingToType = async (
    ReferrerType = 0
  ) => {
    try {
      let RequestData = [ReferrerType]
      const data = await fetchData(
        ControllerName.Applicant,
        ApiMethods.Get_Data_According_To_ReferrerType,
        RequestData
      )

      if (data != null) {
        if (data.response === true && data.data != null) {
          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      //
    }
  }
  const GetRelation = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Relation, 0, "", 0)

    return data
  }

  const GetReferrerType = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.ReferrerType, 0, "", 0)

    return data
  }

  const toggleFollowUp = () => {
    setFollowUpModal(!followUpModal)
  }

  const onFollowUp = (row) => {
    setFollowUpDetail(row)
    toggleFollowUp()
  }

  const SaveAssign = async () => {
    let arr = {
      ApplicantCase_InvestigationId: valuesAss.ApplicantCase_InvestigationId,
      InvestigatorId: valuesAss.InvestigatorId,
      UserId: UserId,
      UserIP: UserIP,
    }
    var res = await api.postRecord(`applicant`, `Assign_Investigator`, arr)

    if (res?.data?.DataSet?.Table != null) {
      if (res?.data?.DataSet?.Table[0].haserror === 0) {
        Swal.fire({
          title: "Success",
          text: res?.data?.DataSet?.Table[0].Message,
          icon: "success",
        })

        // props.closeAssignInvestigatorModalNewmodal();
        closeAssignInvestigatorModalNewmodal()

        // ReBindGrid();
      } else {
        Swal.fire({
          title: "Error",
          text: res?.data?.DataSet?.Table[0].Message,
          icon: "warning",
        })
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "warning",
      })
      //alert("Error");
      //
    }

    ReBindGrid()
  }

  const GetCountry = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Country, 0, "", 0)

    return data
  }

  const GetGender = async (e) => {
    var data = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0)

    return data
  }
  const GetProvince = async (CountryId = 0) => {
    //;
    if (CountryId == "0") CountryId = "-1"

    var data = await GetSetupMaster(SetupMasterIds.Province, CountryId, "", 0)
    setprovinceddl(data.data)
    return data
  }

  const GetFrequency = async () => {
    //;

    var data = await GetSetupMaster(SetupMasterIds.Frequency, 0, "", 0)

    return data
  }
  const GetCity = async (ProvinceId = 0) => {
    //;
    if (ProvinceId == "0") ProvinceId = "-1"

    var data = await GetSetupMaster(SetupMasterIds.City, ProvinceId, "", 0)
    setcityddl(data.data)
    return data
  }

  const GetDistrict = async (CityId = 0) => {
    //;
    if (CityId == "0") CityId = "-1"

    var data = await GetSetupMaster(SetupMasterIds.District, CityId, "", 0)

    return data
  }

  const GetUnion = async (DistrictId = 0) => {
    //;
    if (DistrictId == "0") DistrictId = "-1"

    var data = await GetSetupMaster(SetupMasterIds.Union, DistrictId, "", 0)

    return data
  }

  const GetArea = async (UnionId = 0) => {
    //;
    if (UnionId == "0") UnionId = "-1"

    var data = await GetSetupMaster(
      SetupMasterIds.Village_Muhalla,
      UnionId,
      "",
      0
    )

    return data
  }
  const GetNatureOfCase = async () => {
    var data = await GetSetupMaster(SetupMasterIds.NatureOfCase, 0, "", 0)

    return data
  }

  const GetCatgeory = async () => {
    var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0)

    return data
  }
  const handleSearchClick = async (e) => {
    e && e.preventDefault()
    // ReBindGrid();
    fetchApplicantId(true)
  }

  const handleCancelClick = async () => {
    setSearchValues({ ...initialValues })
  }

  const onEdit = (row) => {
    localStorage.setItem("ACIid", row.ApplicantCase_InvestigationId)
    localStorage.setItem("isEditPhysicalAudit", true)
    document.open("/admin/ApplicantDetail/" + row.ApplicantCase_InvestigationId) //, "_blank");
    localStorage.setItem("role", row.IsEdit == true ? 1 : 0)
  }

  const GetInvestigator = async () => {
    var data = await GetUser("", "", Roles.InvestigatingOfficer)

    return data
  }

  const GetCaseStatus = async () => {
    //;

    var data = await GetSetupMaster(SetupMasterIds.CaseStatus, 0, "", 0)

    return data
  }

  const ReBindGrid = async () => {
    fetchApplicantId()
  }
  const openNewmodal = () => {
    setOpenModal(true)
  }
  const closeNewmodal = () => {
    setOpenModal(false)

    resetFormelement()
    setSearchValues(initialValues)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick()
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form onSubmit={handleSearchClick}>
                  {/* <Row form>
                    <Col md={3}>
                      <Label for="InputDate">Date From</Label>

                      <DatePicker
                        dateFormat={dateFormat}
                        value={getDate(searchvalues.FromDate, "/")}
                        onChange={(e) => handleDateChange(e, "FromDate")}
                        className="form-control"
                        name="FromDate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>

                    <Col md={3}>
                      <Label for="InputDate">Date To</Label>
                      <DatePicker
                        value={getDate(searchvalues.ToDate, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => handleDateChange(e, "ToDate")}
                        className="form-control"
                        name="ToDate"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                  </Row> */}
                  <Row form>
                    <Col md={3}>
                      <FormGroupInput
                        label="Applicant Code"
                        name="ApplicantCode"
                        value={searchvalues.ApplicantCode}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroupInput
                        label="Applicant Case Code"
                        name="ApplicantCaseCode"
                        value={searchvalues.ApplicantCaseCode}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupInput
                        label="Applicant Name"
                        name="ApplicantName"
                        value={searchvalues.ApplicantName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupInput
                        label="Applicant CNIC"
                        name="Cnic"
                        value={searchvalues.Cnic}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        isNumber="true"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={3}>
                      <FormGroupSelect
                        label="Gender"
                        name="GenderID"
                        value={searchvalues.GenderID}
                        onChange={handleInputChange}
                        list={genderddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Country"
                        name="CountryId"
                        value={searchvalues.CountryId}
                        onChange={(e) => {
                          handleInputChange(e)
                          GetProvince(e.target.value)
                        }}
                        list={countryddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Province"
                        name="ProvinceId"
                        value={searchvalues.ProvinceId}
                        onChange={(e) => {
                          handleInputChange(e)
                          GetCity(e.target.value)
                        }}
                        list={provinceddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="City"
                        name="CityId"
                        value={searchvalues.CityId}
                        onChange={handleInputChange}
                        list={cityddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Category"
                        name="FundCategoryId"
                        value={searchvalues.FundCategoryId}
                        onChange={handleInputChange}
                        list={categoryddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Case Of Nature"
                        name="CaseNatureId"
                        value={searchvalues.CaseNatureId}
                        onChange={handleInputChange}
                        list={caseOfNatureddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Referral Type"
                        name="Referral_TypeId"
                        value={searchvalues.Referral_TypeId}
                        onChange={handleInputChange}
                        list={referrerTypeddld}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupInput
                        label="Referrer Name"
                        name="ReferralName"
                        value={searchvalues.ReferralName}
                        onChange={handleInputChange}
                        maxLength="50"
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Investigator"
                        name="Investigatorid"
                        value={searchvalues.Investigatorid}
                        onChange={handleInputChange}
                        list={investigatorddl}
                        fieldId="UserId"
                        fieldName="Name"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    {RoleId !== Roles.Marketing.toLocaleString() ? null : (
                      <Col md={3}>
                        {/*<FormGroupCheckbox*/}
                        {/*    label="Case Story Exist"*/}
                        {/*    name="IsCaseStory"*/}
                        {/*    value={searchvalues.IsCaseStory}*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*/>*/}

                        <FormGroupSelect
                          label="Case Status"
                          name="IsCaseStory"
                          value={searchvalues.IsCaseStory}
                          onChange={handleInputChange}
                          list={[
                            { Id: 2, Value: "All" },
                            { Id: 0, Value: "Pending" },
                            { Id: 1, Value: "Uploaded" },
                          ]}
                          fieldId="Id"
                          fieldName="Value"
                          onKeyPress={handleKeyPress}
                        />
                      </Col>
                    )}

                    <Col md={3}>
                      <FormGroupSelect
                        label="Status"
                        name="ViewFilterId"
                        value={searchvalues.ViewFilterId}
                        onChange={handleInputChange}
                        list={[
                          { Id: 2, Value: "All" },
                          { Id: 0, Value: "View" },
                          { Id: 1, Value: "In Progress" },
                        ]}
                        fieldId="Id"
                        fieldName="Value"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Case Status"
                        name="CaseStatusId"
                        value={searchvalues.CaseStatusId}
                        onChange={handleInputChange}
                        list={caseStatusddl}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        onKeyPress={handleKeyPress}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        type="submit"
                      >
                        Search
                      </Button>
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={handleCancelClick}
                      >
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
                  {RoleId !== Roles.Marketing.toLocaleString() ? (
                    <>
                      <Col lg={6} md={6} className="text-right">
                        <Button
                          color="primary2"
                          size="sm"
                          className="m-0"
                          onClick={() => openNewmodal()}
                        >
                          Register New Case
                        </Button>
                      </Col>
                    </>
                  ) : null}
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  {RoleId !== Roles.Marketing.toLocaleString() ? (
                    <>
                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={activetabNo === "Mycases" ? "active" : ""}
                          onClick={() => {
                            setactivetabNo("Mycases")
                          }}
                        >
                          My Cases
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={
                            activetabNo === "Unassigned" ? "active" : ""
                          }
                          onClick={() => {
                            setactivetabNo("Unassigned")
                          }}
                        >
                          Un Assigned
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={
                            activetabNo === "Investigation" ? "active" : ""
                          }
                          onClick={() => {
                            setactivetabNo("Investigation")
                          }}
                        >
                          Investigation
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={activetabNo === "FollowUp" ? "active" : ""}
                          onClick={() => {
                            setactivetabNo("FollowUp")
                          }}
                        >
                          Follow Up
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={activetabNo === "Closed" ? "active" : ""}
                          onClick={() => {
                            setactivetabNo("Closed")
                          }}
                        >
                          Closed
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={
                            activetabNo === "ReInvestigation" ? "active" : ""
                          }
                          onClick={() => {
                            setactivetabNo("ReInvestigation")
                          }}
                        >
                          Re Investigation
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={
                            activetabNo === "Objection" ? "active" : ""
                          }
                          onClick={() => {
                            setactivetabNo("Objection")
                          }}
                        >
                          Objection
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          disabled={loading}
                          className={activetabNo === "CaseHold" ? "active" : ""}
                          onClick={() => {
                            setactivetabNo("CaseHold")
                          }}
                        >
                          Case Freeze
                        </NavLink>
                      </NavItem>
                    </>
                  ) : null}
                  <NavItem>
                    <NavLink
                      disabled={loading}
                      className={activetabNo === "Marketing" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("Marketing")
                      }}
                    >
                      Marketing
                    </NavLink>
                  </NavItem>

                  {/* ============================= Manzoor Working */}
                  <NavItem>
                    <NavLink
                      disabled={loading}
                      className={activetabNo === "ViewAllCases" ? "active" : ""}
                      onClick={() => {
                        setactivetabNo("ViewAllCases")
                      }}
                    >
                      View All Cases
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Mycases">
                    {activetabNo === "Mycases" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.Mycases}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Investigation">
                    {activetabNo === "Investigation" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.Investigation}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Unassigned">
                    {activetabNo === "Unassigned" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.Unassigned}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="FollowUp">
                    {activetabNo === "FollowUp" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.FollowUp}
                        loading={loading}
                        onEdit={RoleId == 37 ? onEdit : null}
                        onView={onView}
                        onAssign={onAssign}
                        onFollowUp={onFollowUp}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Closed">
                    {activetabNo === "Closed" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.Closed}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="ReInvestigation">
                    {activetabNo === "ReInvestigation" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.ReInvestigation}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Marketing">
                    {activetabNo === "Marketing" && (
                      <TabGrid
                        // columns={columns}
                        columns={columnsMkt}
                        rows={applicantLists?.Marketing}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>

                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="Objection">
                    {activetabNo === "Objection" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.Objection}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="CaseHold">
                    {activetabNo === "CaseHold" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.CaseHold}
                        loading={loading}
                        onEdit={onEdit}
                        onView={onView}
                        onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>

                {/* ==================Manzoor Working======================== */}
                <TabContent activeTab={activetabNo}>
                  <TabPane tabId="ViewAllCases">
                    {activetabNo === "ViewAllCases" && (
                      <TabGrid
                        columns={columns}
                        rows={applicantLists?.ViewAllCases}
                        loading={loading}
                        //onEdit={onEdit}
                        onView={onView}
                        //onAssign={onAssign}
                        // onDelete={deleteFamilyDetail}
                      />
                    )}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openAssignModalPopUpModal && (
          //ApplicantCase_InvestigationId
          <ModalAssignInvestigator
            {...props}
            HeaderText="Assign Investigator"
            Ismodalshow={openAssignModalPopUpModal}
            closeNewmodal={closeAssignInvestigatorModalNewmodal}
            Id={assignApplicantCaseId}
            SelectedInvestigatorId={assignedInvestigatorId}
            SaveAssignInvestigator={SaveAssign}
            investigatorddl={investigatorddl.filter(
              (data) => data.UserId !== parseInt(UserId)
            )}
            onChange={handleInputChange}
            AssigneeValues={valuesAss}
          />
        )}
        {openModal && (
          <ModalBasicInfo
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
            BindData={valuesBasicInfo}
          />
        )}
        {followUpModal && (
          <FollowUpModal
            isOpen={FollowUpModal}
            toggle={toggleFollowUp}
            gridData={followUpDetail}
            // row={}
          />
        )}
      </div>
      {/* <div>
      <Pagination>
        <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    </div> */}
    </>
  )
}

export default ApplicantListing
