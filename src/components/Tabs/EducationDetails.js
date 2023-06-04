import React, { useEffect, useState } from "react"
import {
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
} from "reactstrap"
import ModalApplHistory from "../../components/modal/ModalApplHistory.js"
import { fetchData } from "utils/Api.js"
import Swal from "sweetalert2"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx"
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx"
import { getFamilyDetail } from "services/FamilyDetailService.js"
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import useEditRole from "hooks/useEditRole.js"
import FormGroupTableEduDetail from "components/FormGroupTableEduDetail.jsx"

const initialValues = {
  // OperationId: 1,
  ApplicantCase_InvestigationId: 0,
  ApplicantFamily_EducationDetailId: 0,
  ApplicantFamilyDetailId: "",
  AcademicId: "",
  NameOfInstitute: "",
  Counselling: false,
  ProgramName: "",
  Grade_Percentage_CGPA_Marks: "",
  Location: "",
  Educational_ContactNo: null,
  DegreeId: 0,
  Class_SemesterId: 0,
  YearOfCompletion: null,
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  RoleId: localStorage.getItem("RoleId"),
}

const EducationDetails = (props) => {
  const [role, appId] = useEditRole()
  const columns = [
    {
      field: "FamilyMemberName",
      name: "Name / Relation",
    },
    {
      field: "Academic",
      name: "Academic Level",
    },
    {
      field: "NameOfInstitute",
      name: "School/College/Institute/University/Tuition",
    },
    {
      field: "ProgramName",
      name: "Programme",
    },
    {
      field: "Degree",
      name: "Degree",
    },
    {
      field: "ClassYearSemester",
      name: "	Class/Year/Semester",
    },
    {
      field: "Grade_Percentage_CGPA_Marks",
      name: "Grade/CGPA/Marks/Percentage",
    },
    {
      field: "Location",
      name: "	Location",
    },
    {
      field: "Educational_ContactNo",
      name: "Contact",
    },
    {
      field: "Counselling",
      name: "Educational Counselling",
    },
  ]

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  })
  const [educationList, setEducationList] = useState([])
  const [selectionList, setSelectionList] = useState({
    FamilyMemberList: [],
    AcademicList: [],
    DegreeList: [],
    ClassList: [],
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    const fetchApplicantId = async () => {
      let data1 = await fetchData("Applicant", "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_EducationDetailId:
          formFields.ApplicantFamily_EducationDetailId,
      })
      fetchData("Applicant", "Crud_Family_Education_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_EducationDetailId:
          formFields.ApplicantFamily_EducationDetailId,
      }).then((result) => {
        setEducationList(result?.DataSet?.Table)
        setSelectionList({
          ...selectionList,
          AcademicList: result?.DataSet?.Table1,
          DegreeList: result?.DataSet?.Table2,
          ClassList: result?.DataSet?.Table3,
          FamilyMemberList: data1?.DataSet?.Table,
        })
      })
    }
    // fetchFamilyMember();
    fetchApplicantId()
  }, [])

  const handleInputChange = (event) => {
    let { name, value } = event.target
    //   if(name === "Counselling"){
    //     console.log("Counselling", name, value)
    //     setFormFields({
    //       ...formFields,
    //       [name]: value ? "Yes" : "No" ,
    //     });
    //   } else {
    //   setFormFields({
    //     ...formFields,
    //     [name]: value,
    //   });
    // }
    setFormFields({
      ...formFields,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let swelmsg = formFields.ApplicantFamily_EducationDetailId === 0 ? 2 : 3

    if (swelmsg === parseInt(3)) {
      swelmsg = "Are you sure to edit the record?"
    } else {
      swelmsg = "Are you sure to add the record?"
    }

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: swelmsg,
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        requestCall(
          formFields.ApplicantFamily_EducationDetailId === 0 ? 2 : 3,
          formFields
        )
      }
    })
  }

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...educationList[index] })
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
        requestCall(4, { ...formFields, ...educationList[index] })
      }
    })
  }

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    payload.DegreeId = payload.DegreeId == 0 ? null : payload.DegreeId
    payload.Class_SemesterId =
      payload.Class_SemesterId == 0 ? null : payload.Class_SemesterId

    setFormLoading(true)
    fetchData("Applicant", "Crud_Family_Education_Detail", {
      OperationId: opId,
      ...payload,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.hasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0]?.Message,
          icon: "error",
        })
        setFormLoading(false)
        return
      }
      Swal.fire({
        title: "Success",
        text: result?.DataSet?.Table[0]?.Message,
        icon: "success",
      })
      setEducationList(result?.DataSet?.Table1)
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId })
      setFormLoading(false)
    })
  }
  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Education</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <FormGroupSelect
                  label="Applicant Family Detail*"
                  name="ApplicantFamilyDetailId"
                  value={formFields.ApplicantFamilyDetailId}
                  onChange={handleInputChange}
                  list={selectionList.FamilyMemberList}
                  fieldId="ApplicantFamilyDetailId"
                  fieldName="Name"
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Academic*"
                  name="AcademicId"
                  value={formFields.AcademicId}
                  onChange={handleInputChange}
                  list={selectionList.AcademicList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Program Name"
                  name="ProgramName"
                  value={formFields.ProgramName}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Degree"
                  name="DegreeId"
                  value={formFields.DegreeId}
                  onChange={handleInputChange}
                  list={selectionList.DegreeList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Class Year Semester"
                  name="Class_SemesterId"
                  value={formFields.Class_SemesterId}
                  onChange={handleInputChange}
                  list={selectionList.ClassList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Grade/CGP/Marks/Percentage"
                  name="Grade_Percentage_CGPA_Marks"
                  value={formFields.Grade_Percentage_CGPA_Marks}
                  onChange={handleInputChange}
                  disabled={role}
                  maxLength="4"
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Year of Completion"
                  name="YearOfCompletion"
                  value={formFields.YearOfCompletion}
                  onChange={handleInputChange}
                  isNumber="true"
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Location"
                  name="Location"
                  value={formFields.Location}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Institute Contact Number"
                  name="Educational_ContactNo"
                  value={formFields.Educational_ContactNo}
                  onChange={handleInputChange}
                  isNumber="true"
                  maxLength="11"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Name Of Institute"
                  name="NameOfInstitute"
                  value={formFields.NameOfInstitute}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              {formFields.RoleId == 11 || formFields.RoleId == 12 ? (
                <Col md={3}>
                  <FormGroupCheckbox
                    label="Educational Counselling"
                    name="Counselling"
                    value={formFields.Counselling ? true : false}
                    // value={(formFields.Counselling || (formFields.Counselling != "No" && formFields.Counselling == "Yes")) ? true : false}
                    onChange={handleInputChange}
                    disabled={role}
                  />
                </Col>
              ) : (
                ""
              )}
            </Row>

            <Row className="text-right">
              <Col md={12}>
                {role ? null : (
                  <FormGroupButton type="submit" title="Add Education Detail" />
                )}
              </Col>
            </Row>
          </form>

          <Row>
            <Col md={12}>
              <h2 className="h6">Education Details</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroupTableEduDetail
                columns={columns}
                rows={educationList}
                onEdit={onEdit}
                onDelete={onDelete}
                hideAction={role}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default EducationDetails
