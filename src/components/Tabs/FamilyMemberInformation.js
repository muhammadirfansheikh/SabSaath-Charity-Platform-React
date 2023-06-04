import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox"
import FormGroupDatePicker from "components/GeneralComponent/FormGroupDatePicker"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import ModalApplHistory from "components/modal/ModalApplHistory"
import useEditRole from "hooks/useEditRole"
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
  Row,
} from "reactstrap"
import Swal from "sweetalert2"
import { baseImageUrl, baseUrl, fetchData } from "utils/Api"
import { ControllerName } from "utils/Constants"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { dateFormat, dateFormatPlaceholder, getDate } from "utils/CommonMethods"
import axios from "axios"
import moment from "moment"

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantFamilyDetailId: 0,
  Name: "",
  Cnic: "",
  Mother_Father_HusbandName: "",
  DateOfBirth: "",
  IsDeceased: false,
  DateOfDeath: "",
  RelationId: "",
  ReligionId: "0",
  GenderId: "",
  MaritalStatusId: "",
  IsPartOfBannedOrg: false,
  IsInvolveInCriminalActivity: false,
  HasMedicalHistory: false,
  ContactTypeId: null,
  ContactNumber: null,
  Remarks: "",
  CanRead: false,
  CanWrite: false,
  IsEmployeed: false,
  IsJobList: false,
  JobRemarks: "",
  LastWorkExperience: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  Orphan: false,
  FamilyMemberPicture: "",
}

const initialSelectLists = {
  GenderList: [],
  ContactTypeList: [],
  ReligionList: [],
  CountryList: [],
  ProvinceList: [],
  RelationList: [],
  MaritalStatusList: [],
}

const columns = [
  {
    field: "Name",
    name: "Name",
  },
  {
    // field: "RelationId",
    field: "Relation",
    name: "Relation",
  },
  {
    field: "Cnic",
    name: "CNIC",
  },
  {
    field: "DateOfBirth",
    name: "Date Of Birth",
  },
  {
    field: "MaritalStatus",
    name: "Marital Status",
  },
  {
    field: "Remarks",
    name: "Remarks",
  },
]

const FamilyMemberInformation = (props) => {
  const [role, appId] = useEditRole()
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  })
  const [selectionLists, setSelectionLists] = useState(initialSelectLists)
  const [formLoading, setFormLoading] = useState(false)
  const [familyMemberList, setFamilyMemberList] = useState([])
  const [paymentScheduleExist, setpaymentScheduleExist] = useState(false)
  const [selectfamilymemberImage, setselectfamilymemberImage] = useState()
  useEffect(() => {
    const fetchApplicantId = () => {
      fetchData(ControllerName.Applicant, "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamilyDetailId: formFields.ApplicantFamilyDetailId,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          })
          return
        }

        setFamilyMemberList(result?.DataSet?.Table)
        if (result?.DataSet?.Table[0]?.PaymentSchedule_Count > 0) {
          setpaymentScheduleExist(true)
        }
        setSelectionLists({
          ...selectionLists,
          GenderList: result?.DataSet?.Table3,
          ReligionList: result?.DataSet?.Table2,
          MaritalStatusList: result?.DataSet?.Table4,
          RelationList: result?.DataSet?.Table1,
          ContactTypeList: result?.DataSet?.Table5,
        })
      })
    }
    fetchApplicantId()
  }, [])

  const onChangeHandler = (event) => {
    setselectfamilymemberImage(event.target.files[0])
  }

  const handleFamilyMemberChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    })
  }

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...familyMemberList[index] })
  }

  const onDelete = (index) => {
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to delete the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        requestCall(4, { ...formFields, ...familyMemberList[index] })
      }
    })
  }

  console.log("CHECKING RELIGION ID From Form Fields", formFields.ReligionId)

  const onDownload = (index, data) => {
    console.log(baseImageUrl + data.url)
    if (data.url !== null) {
      window.open(baseImageUrl + data.url)
    } else {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Please Upload Image",
        icon: "error",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formFields.RelationId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Relation",
        icon: "error",
      })
    }
    if (!formFields.Name) {
      return Swal.fire({
        title: "Error",
        text: "Please Enter Name",
        icon: "error",
      })
    }
    if (!formFields.Cnic) {
      return Swal.fire({
        title: "Error",
        text: "Please Enter CNIC",
        icon: "error",
      })
    }
    if (!formFields.Mother_Father_HusbandName) {
      return Swal.fire({
        title: "Error",
        text: "Please Enter Father/Husband Name",
        icon: "error",
      })
    }
    if (!formFields.ReligionId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Religion",
        icon: "error",
      })
    }
    if (!formFields.GenderId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Gender",
        icon: "error",
      })
    }
    if (!formFields.MaritalStatusId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Marital Status",
        icon: "error",
      })
    }
    if (!formFields.ContactTypeId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Contact Type",
        icon: "error",
      })
    }

    let opids = formFields.ApplicantFamilyDetailId === 0 ? 2 : 3

    // console.log(opids);
    let msg = ""
    if (opids === parseInt(3)) {
      msg = "Are you sure to edit the record?"
    } else {
      msg = "Are you sure to add the record?"
    }

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: msg,
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        requestCall(
          formFields.ApplicantFamilyDetailId === 0 ? 2 : 3,
          formFields,
          selectfamilymemberImage
        )
      }
    })
  }

  const Insert_FamilyMemberInformation = async (
    opId,
    payload,
    selectfamilymemberImage
  ) => {
    const formData = new FormData()
    formData.append("OperationId", opId)
    formData.append(
      "ApplicantCase_InvestigationId",
      payload.ApplicantCase_InvestigationId
    )
    formData.append("ApplicantFamilyDetailId", payload.ApplicantFamilyDetailId)
    formData.append("Name", payload.Name)
    formData.append("Cnic", payload.Cnic)
    formData.append(
      "Mother_Father_HusbandName",
      payload.Mother_Father_HusbandName
    )
    formData.append(
      "DateOfBirth",
      payload.DateOfBirth
        ? moment(payload.DateOfBirth).format("YYYY-MM-DD")
        : null
    )
    formData.append("IsDeceased", payload.IsDeceased)
    formData.append(
      "DateOfDeath",
      payload.DateOfDeath
        ? moment(payload.DateOfDeath).format("YYYY-MM-DD")
        : null
    )
    formData.append("RelationId", payload.RelationId ? payload.RelationId : 171)
    formData.append("ReligionId", payload.ReligionId ? payload.ReligionId : "0")
    console.log("CHECKING RELIGION ID", payload.ReligionId)
    formData.append("GenderId", payload.GenderId)
    formData.append(
      "ContactTypeId",
      payload.ContactTypeId ? payload.ContactTypeId : "0"
    )
    formData.append(
      "MaritalStatusId",
      payload.MaritalStatusId ? payload.MaritalStatusId : "0"
    )
    formData.append("IsPartOfBannedOrg", payload.IsPartOfBannedOrg)
    formData.append(
      "IsInvolveInCriminalActivity",
      payload.IsInvolveInCriminalActivity
    )
    formData.append("HasMedicalHistory", payload.HasMedicalHistory)
    formData.append("Remarks", payload.Remarks)
    formData.append("ContactNumber", payload.ContactNumber)
    formData.append("UserId", payload.UserId)
    formData.append("UserIP", payload.UserIP)
    formData.append("CanRead", payload.CanRead)
    formData.append("CanWrite", payload.CanWrite)
    formData.append("IsEmployeed", payload.IsEmployeed)
    formData.append("IsJobList", payload.IsJobList)
    formData.append("JobRemarks", payload.JobRemarks)
    formData.append("LastWorkExperience", payload.LastWorkExperience)
    formData.append("Orphan", payload.Orphan)
    formData.append("FamilyMemberPicture", selectfamilymemberImage)

    var baseurl =
      baseUrl +
      "/" +
      ControllerName.Applicant +
      "/" +
      "Crud_Family_Detail_Image"
    axios
      .post(baseurl, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (!response.data.DataSet) {
          return Swal.fire({
            title: "Error",
            icon: "error",
            // text: response.data?.ResponseMessage
            //   ? response.data?.ResponseMessage
            //   : "Something went wrong",
          })
        }
        if (response.data.DataSet.Table[0].haserror > 0) {
          Swal.fire({
            title: "Error",
            text: response.data.DataSet.Table[0].Message,
            icon: "error",
          })
          return
        } else {
          Swal.fire({
            title: "Success",
            text: response.data.DataSet.Table[0].Message,
            icon: "success",
          }).then((result) => {
            setFamilyMemberList(response.data.DataSet.Table1)
            setFormFields({
              ...initialValues,
              ApplicantCase_InvestigationId: appId,
            })
            if (result.isConfirmed) {
              // history.push("/admin/ApplicantListing");
            }
          })
        }
      })
      .catch((error) => {
        //   const errorMsg = error.message;
        //console.log(errorMsg);
      })
  }

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload, selectfamilymemberImage) => {
    var data = Insert_FamilyMemberInformation(
      opId,
      payload,
      selectfamilymemberImage
    )
    //
    // if(payload.Orphan === null)
    //  {
    //   payload.Orphan = false;
    //  }
    // setFormLoading(true);
    // fetchData("Applicant", "Crud_Family_Detail", {
    //   OperationId: opId,
    //   ...payload,
    // }).then((result) => {
    //   if (result?.DataSet?.Table[0]?.hasError > 0) {
    //     Swal.fire({
    //       title: "Error",
    //       text: result?.DataSet?.Table[0]?.Message,
    //       icon: "error",
    //     });
    //     setFormLoading(false);
    //     return;
    //   }
    //   Swal.fire({
    //     title: "Success",
    //     text: result?.DataSet?.Table[0]?.Message,
    //     icon: "success",
    //   });
    //   setFamilyMemberList(result?.DataSet?.Table1);
    //   setFormFields({
    //     ...initialValues,
    //     ApplicantCase_InvestigationId: appId,
    //   });
    //   setFormLoading(false);
    // });
  }
  const AllDateSet = (event, type) => {
    if (type === "DateOfBirth") {
      setFormFields({
        ...formFields,
        DateOfBirth: getDate(event, "/"),
      })
    } else if (type === "DateOfDeath") {
      setFormFields({
        ...formFields,
        DateOfDeath: getDate(event, "/"),
      })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Family Member Information</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              <Col md={3}>
                <FormGroupSelect
                  label="Relation*"
                  name="RelationId"
                  value={formFields.RelationId}
                  onChange={handleFamilyMemberChange}
                  list={selectionLists.RelationList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Name*"
                  name="Name"
                  value={formFields.Name}
                  onChange={handleFamilyMemberChange}
                  required={true}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="CNIC / B-Form Number*"
                  name="Cnic"
                  placeholder="xxxxxxxxxxxxx"
                  value={formFields.Cnic}
                  onChange={handleFamilyMemberChange}
                  required={true}
                  maxLength="13"
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Father / Husband Name*"
                  name="Mother_Father_HusbandName"
                  value={formFields.Mother_Father_HusbandName}
                  onChange={handleFamilyMemberChange}
                  required={true}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              {/* <Col md={3}>
                <FormGroupDatePicker
                  label="Date of Birth"
                  name="DateOfBirth"
                  value={formFields.DateOfBirth}
                  onChange={handleFamilyMemberChange}
                  required={formFields.DateOfBirth}
                  disabled={paymentScheduleExist || role}
                
                />
              </Col> */}
              <Col md={3}>
                <Label for="InputDate">Date of Birth</Label>
                <DatePicker
                  //label="Date of Birth"
                  value={formFields.DateOfBirth}
                  //value={getDate(formFields.DateOfDeath, "/")}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "DateOfBirth")}
                  className="form-control"
                  name="DateOfBirth"
                  placeholderText={dateFormatPlaceholder}
                  disabled={paymentScheduleExist || role}
                  required={formFields.DateOfBirth}
                  showYearDropdown
                />
              </Col>

              <Col md={3}>
                <Label for="InputDate">Date of Death</Label>
                <DatePicker
                  //label="Date of Death"
                  value={formFields.DateOfDeath}
                  //  value={getDate(formFields.DateOfDeath, "/")}
                  // selected={personalInformation.DateOfBirth}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "DateOfDeath")}
                  className="form-control"
                  name="DateOfDeath"
                  placeholderText={dateFormatPlaceholder}
                  disabled={!formFields.IsDeceased || role}
                  required={formFields.DateOfDeath}
                  showYearDropdown
                />
              </Col>

              {/* <Col md={3}>
                <FormGroupDatePicker
                  label="Date of Death*"
                  name="DateOfDeath"
                  value={formFields.DateOfDeath}
                  onChange={handleFamilyMemberChange}
                  required={formFields.IsDeceased}
                  disabled={!formFields.IsDeceased || role}
                />
              </Col> */}
              <Col md={3}>
                <FormGroupCheckbox
                  label="Deceased"
                  name="IsDeceased"
                  value={formFields.IsDeceased}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Religion*"
                  name="ReligionId"
                  value={formFields.ReligionId}
                  onChange={handleFamilyMemberChange}
                  list={selectionLists.ReligionList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={paymentScheduleExist || role}
                  //required={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Gender*"
                  name="GenderId"
                  value={formFields.GenderId}
                  onChange={handleFamilyMemberChange}
                  list={selectionLists.GenderList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={paymentScheduleExist || role}
                  required={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Marital Status*"
                  name="MaritalStatusId"
                  value={formFields.MaritalStatusId}
                  onChange={handleFamilyMemberChange}
                  list={selectionLists.MaritalStatusList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={paymentScheduleExist || role}
                  required={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Contact Type*"
                  name="ContactTypeId"
                  value={formFields.ContactTypeId}
                  onChange={handleFamilyMemberChange}
                  list={selectionLists.ContactTypeList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={paymentScheduleExist || role}
                  //required={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Contact Number"
                  name="ContactNumber"
                  placeholder="xxxxxxxxxxx"
                  value={formFields.ContactNumber}
                  onChange={handleFamilyMemberChange}
                  isNumber="true"
                  maxLength="11"
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={6}>
                <FormGroupInput
                  label="Remarks"
                  name="Remarks"
                  value={formFields.Remarks}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Can Read"
                  name="CanRead"
                  value={formFields.CanRead}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Can Write"
                  name="CanWrite"
                  value={formFields.CanWrite}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Orphan"
                  name="Orphan"
                  value={formFields.Orphan}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Employed"
                  name="IsEmployeed"
                  value={formFields.IsEmployeed}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Transfer to Job List"
                  name="IsJobList"
                  value={formFields.IsJobList}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Job Remarks"
                  name="JobRemarks"
                  value={formFields.JobRemarks}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Last Work Experience"
                  name="LastWorkExperience"
                  value={formFields.LastWorkExperience}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="">Upload Member Picture</Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="FamilyMemberPicture"
                    name="FamilyMemberPicture"
                    onChange={onChangeHandler}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Additional Details</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Is Part Of Banned Org"
                  name="IsPartOfBannedOrg"
                  value={formFields.IsPartOfBannedOrg}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Is Involved in Criminal Activity"
                  name="IsInvolveInCriminalActivity"
                  value={formFields.IsInvolveInCriminalActivity}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Has Medical History"
                  name="HasMedicalHistory"
                  value={formFields.HasMedicalHistory}
                  onChange={handleFamilyMemberChange}
                  disabled={paymentScheduleExist || role}
                />
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  {role ? null : (
                    <FormGroupButton
                      title="Add Family Member"
                      className="btn-sm"
                      type="submit"
                      loading={formLoading}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={12}>
                <h2 className="h6">Family Information</h2>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroupTable
                  columns={columns}
                  rows={familyMemberList}
                  onEdit={onEdit}
                  hideAction={role}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  customDownloadIcon={<i className="nc-icon nc-album-2"></i>}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>
    </div>
  )
}

export default FamilyMemberInformation
