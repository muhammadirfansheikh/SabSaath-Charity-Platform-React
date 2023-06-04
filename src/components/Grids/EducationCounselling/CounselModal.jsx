import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import React, { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap"
import { dateFormat, dateFormatPlaceholder, getDate } from "utils/CommonMethods"

import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import * as api from "utils/Api"
import SabSathDefault from "assets/img/SabSathDefault.png"
import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import { useMemo } from "react"
import { DataTableCustomStyles } from "utils/Constants"
import moment from "moment"
import Swal from "sweetalert2"
import ReactSelect from "react-select"
import ApplicantHistoryModal from "./ApplicantHistoryModal"

const labelStyles = {
  fontSize: 13,
  marginBottom: 2,
  color: "rgb(214, 11, 17)",
  fontWeight: "500",
}

const CounselModal = ({
  openModel,
  toggleModal,
  EducationalCounsellingHistory,
  applicantHistory,
  isHistory,
  isCounselling,
  EducationalCounsellingList,
  columns,
  onView,
  handleInputChange,
  formFields,
  AllDateSet,
  handleSubmit,
  loaders,
  listOfValues,
  handleMultiInputChange,
  setFormFields,
}) => {
  const [historyModal, setHistoryModal] = useState(false)
  const [isDisabled, setIsDisabled] = useState(isHistory ? true : false)
  const [firstTimeHidden, setFirstTimeHidden] = useState(
    isHistory ? true : false
  )
  const sessionColumns = useMemo(
    () => [
      {
        name: "Session Date",
        selector: "CounsellingDate",
        cell: (row) =>
          row?.CounsellingDate ? (
            <span>{moment(row?.CounsellingDate).format("DD/MM/YYYY")}</span>
          ) : (
            <span>-</span>
          ),
        width: "230px",
        sortable: true,
      },
      {
        name: "Counsellor",
        selector: "CounsellorName",
        width: "230px",
        sortable: true,
      },
      {
        name: "Status",
        selector: "IsCompleted",
        cell: (row) => (
          <span>{row?.IsCompleted ? "Complete" : "Incomplete"}</span>
        ),
        width: "230px",
        sortable: true,
      },
      {
        name: "Details",
        selector: "StudentName",
        cell: (row) => {
          return (
            <>
              <FormGroup
                style={{
                  width: "100%",
                }}
              >
                <Button
                  block
                  color="primary"
                  outline
                  className="btn-outline-primary mr-4"
                  size="sm"
                  onClick={() => onViewClick(row)}
                >
                  View
                </Button>
              </FormGroup>

              <FormGroup
                className="ml-3"
                style={{
                  width: "100%",
                }}
              >
                <Button
                  block
                  color={row?.IsCompleted ? "secondary" : "primary"}
                  outline
                  size="sm"
                  className={
                    row?.IsCompleted
                      ? "btn-outline-secondary text-gray"
                      : "btn-outline-primary"
                  }
                  onClick={() => onEditClick(row)}
                  disabled={row?.IsCompleted}
                >
                  Edit
                </Button>
              </FormGroup>
            </>
          )
        },
        width: "340px",
        sortable: true,
      },
    ],

    []
  )

  const onViewClick = (row) => {
    setFormFields(row)
    setIsDisabled(true)
    setFirstTimeHidden(false)
  }

  const onEditClick = (row) => {
    setFormFields(row)
    setIsDisabled(false)
    setFirstTimeHidden(false)
  }

  const toggleHistoryModal = () => {
    setHistoryModal(!historyModal)
  }

  useEffect(() => {
    if (isCounselling && applicantHistory?.length) {
      const isAnyIncompletedData = applicantHistory.find(
        (data) => !data.IsCompleted && data.CounsellingDate
      )

      if (isAnyIncompletedData) {
        setTimeout(() => {
          Swal.fire({
            title: "Incomplete Previous Sessions",
            text: "Student still has incomplete previous sessions",
            icon: "warning",
          })
        }, 600)
      }
    }
  }, [])

  return (
    <Modal
      isOpen={openModel}
      //toggle={toggleModal}
      size="xl"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        {isHistory === true
          ? "Student Counselling Case Wise History"
          : "Add Student Counselling Information"}
      </ModalHeader>
      {isHistory === true ? (
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Identification</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={4}>
                <img
                  name="imgApplicant"
                  alt=""
                  src={
                    EducationalCounsellingHistory[0]?.url === null ||
                    EducationalCounsellingHistory[0]?.url === ""
                      ? SabSathDefault
                      : api.baseImageUrl + EducationalCounsellingHistory[0]?.url
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
                  {"Student Name      : "}
                </Label>
                <strong>
                  {" " + EducationalCounsellingHistory[0]?.StudentName}
                </strong>
                <br />
                <span onClick={toggleHistoryModal} className="pointer">
                  <Label
                    style={{
                      fontSize: 13,
                      marginBottom: 2,
                      color: "rgb(214, 11, 17)",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    {"Applicant Name      : "}
                  </Label>
                  <strong>
                    {" " + EducationalCounsellingHistory[0]?.ApplicantName}
                  </strong>
                </span>
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
                  {" " + EducationalCounsellingHistory[0]?.ApplicantCaseCode}
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
                  {"CNIC                : "}
                </Label>
                <strong>
                  {" " + EducationalCounsellingHistory[0]?.ApplicantCNIC}
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
                  {"Primary Contact #   : "}
                </Label>
                <strong>
                  {" " +
                    EducationalCounsellingHistory[0]
                      ?.ApplicantPrimaryContactNumber}
                </strong>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : null}
      {isHistory === true ? (
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Session List</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <DataTableExtensions
                  data={applicantHistory}
                  columns={sessionColumns}
                  exportHeaders={true}
                  fileName="EducationCounsellingList"
                >
                  <DataTable
                    dense
                    direction="auto"
                    defaultSortField="StudentName"
                    fixedHeader
                    striped
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                    expandOnRowClicked
                    progressPending={loaders.Loading}
                    fixedHeaderScrollHeight="auto"
                    subHeaderAlign="right"
                    subHeaderWrap
                    customStyles={DataTableCustomStyles}
                    expandOnRowDoubleClicked={true}
                  />
                </DataTableExtensions>

                {/* <FormGroupTable
                  rows={applicantHistory}
                  columns={columns}
                  ButtonText="View"
                  onDynamic={onView}
                /> */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : null}

      {!firstTimeHidden && (
        <>
          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Student Info</h6>
            </CardHeader>
            <CardBody>
              <Row>
                {isCounselling === true ? (
                  <Col md={4}>
                    <img
                      name="imgApplicant"
                      alt=""
                      src={
                        EducationalCounsellingHistory[0]?.url === null ||
                        EducationalCounsellingHistory[0]?.url === ""
                          ? SabSathDefault
                          : api.baseImageUrl +
                            EducationalCounsellingHistory[0]?.url
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
                ) : null}
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroupInput
                    label="Student Name"
                    name="StudentName"
                    value={EducationalCounsellingHistory[0]?.StudentName}
                    disabled
                  />
                </Col>

                <Col md={3} onClick={toggleHistoryModal} className="pointer">
                  <FormGroup>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      Applicant Name (Click to see applicant history)
                    </Label>
                    <Input
                      className="form-control"
                      name={"ApplicantName"}
                      value={EducationalCounsellingHistory[0]?.ApplicantName}
                      disabled
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroupInput
                    label="Applicant Contact Number"
                    name="ApplicantContactNumber"
                    value={
                      EducationalCounsellingHistory[0]
                        ?.ApplicantPrimaryContactNumber
                    }
                    disabled
                  />
                </Col>

                <Col md={3}>
                  <FormGroupInput
                    label="Applicant CNIC"
                    name="ApplicantCNIC"
                    value={EducationalCounsellingHistory[0]?.ApplicantCNIC}
                    disabled
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Academic Info</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <FormGroupInput
                    label="Class/Grade/Degree"
                    name="ClassGradeDegree"
                    value={
                      EducationalCounsellingHistory[0]
                        ?.Grade_Percentage_CGPA_Marks
                    }
                    disabled
                  />
                </Col>

                <Col md={8}>
                  <FormGroupInput
                    label="Remarks"
                    name="Remarks"
                    value={formFields.Remarks}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroupSelect
                    label="School/College/University Status"
                    name="SchoolStatus"
                    value={formFields.SchoolStatus}
                    onChange={handleInputChange}
                    list={listOfValues?.SchoolStatus}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={isDisabled}
                    // disabled={paymentScheduleExist || role}
                  />
                </Col>

                <Col md={8}>
                  <FormGroupInput
                    label="School/College/University Status Remarks"
                    name="SchoolStatusRemarks"
                    value={formFields.SchoolStatusRemarks}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">
                Educational Counselling Info
              </h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <Label for="InputDate">Counselling Date*</Label>
                  <ReactDatePicker
                    value={getDate(formFields.CounsellingDate, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) => AllDateSet(e, "CounsellingDate")}
                    className="form-control"
                    name="CounsellingDate"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled={isDisabled}
                  />
                </Col>

                <Col md={4}>
                  <FormGroupInput
                    label="Counsellor Name*"
                    name="CounsellorName"
                    value={formFields.CounsellorName}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    required
                  />
                </Col>

                <Col md={4}>
                  <FormGroupInput
                    label="Counsellor Contact Number"
                    name="CounsellorContactNumber"
                    value={formFields.CounsellorContactNumber}
                    isNumber="true"
                    maxLength="15"
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label style={labelStyles}>Other Counsellors Present</Label>
                  {/* {isDisabled ? null : (
                    <ReactSelect
                      name="OtherCounsellorsPresent"
                      onChange={(e) =>
                        handleMultiInputChange("OtherCounsellorsPresent", e)
                      }
                      value={formFields.OtherCounsellorsPresent.split(",").map(
                        (item) =>
                          listOfValues?.OtherCounsellorsPresent.find(
                            (i) => i.SetupDetailId == item
                          )
                      )}
                      isMulti
                      options={listOfValues?.OtherCounsellorsPresent.map(
                        (item) => ({
                          label: item.OtherCounsellorsPresent,
                          value: item.SetupDetailId,
                        })
                      )}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isSearchable
                    />
                  )} */}
                  <ReactSelect
                    name="OtherCounsellorsPresent"
                    onChange={(e) =>
                      handleMultiInputChange("OtherCounsellorsPresent", e)
                    }
                    defaultValue={
                      !formFields?.OtherCounsellorsPresent
                        ? null
                        : formFields.OtherCounsellorsPresent.split(",").map(
                            (item) => {
                              const isData =
                                listOfValues?.OtherCounsellorsPresent.find(
                                  (i) => {
                                    if (i.SetupDetailId == item) {
                                      return i
                                    }
                                  }
                                )
                              if (isData) {
                                return {
                                  value: isData.SetupDetailId,
                                  label: isData.OtherCounsellorsPresent,
                                }
                              }
                            }
                          )
                    }
                    isMulti
                    options={listOfValues?.OtherCounsellorsPresent.map(
                      (item) => ({
                        label: item.OtherCounsellorsPresent,
                        value: item.SetupDetailId,
                      })
                    )}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isSearchable
                  />
                  {/* <FormGroupSelect
                    label="Other Counsellors Present"
                    name="OtherCounsellorsPresent"
                    value={formFields.OtherCounsellorsPresent}
                    onChange={handleInputChange}
                    list={listOfValues?.OtherCounsellorsPresent}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={isDisabled}
                    //disabled={paymentScheduleExist || role}
                  /> */}
                </Col>

                <Col md={4}>
                  <FormGroupInput
                    label="Name of Attendants with Student"
                    name="AttendantWithStudent"
                    value={formFields.AttendantWithStudent}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>

                <Col md={4}>
                  <Label style={labelStyles}>Extra Curricular Activities</Label>
                  <ReactSelect
                    name="ExtraCurricularActivities"
                    onChange={(e) =>
                      handleMultiInputChange("ExtraCurricularActivities", e)
                    }
                    isMulti
                    options={listOfValues?.ExtraCurricularActivities.map(
                      (item) => ({
                        label: item.ExtraCurricularActivities,
                        value: item.SetupDetailId,
                      })
                    )}
                    defaultValue={
                      !formFields?.ExtraCurricularActivities?.length
                        ? null
                        : formFields?.ExtraCurricularActivities?.split(",").map(
                            (item) => {
                              const isData =
                                listOfValues?.ExtraCurricularActivities.find(
                                  (i) => {
                                    if (i.SetupDetailId == item) {
                                      return i
                                    }
                                  }
                                )
                              if (isData) {
                                return {
                                  value: isData.SetupDetailId,
                                  label: isData.ExtraCurricularActivities,
                                }
                              }
                            }
                          )
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isSearchable
                  />
                  {/* <FormGroupSelect
                    label="Extra Curricular Activities"
                    name="ExtraCurricularActivities"
                    value={formFields.ExtraCurricularActivities}
                    onChange={handleInputChange}
                    list={listOfValues?.ExtraCurricularActivities}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={isDisabled}
                    //disabled={paymentScheduleExist || role}
                  /> */}
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroupCheckbox
                    label="Job"
                    name="Job"
                    value={formFields.Job}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>

                {formFields.Job && (
                  <Col md={8}>
                    <FormGroupInput
                      label="Job Remarks"
                      name="JobRemarks"
                      value={formFields.JobRemarks}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </Col>
                )}
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroupCheckbox
                    label="Family Counselling"
                    name="FamilyCounseling"
                    value={formFields.FamilyCounseling}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>
                <Col md={4}>
                  <Label style={labelStyles}>Stated Career Goals</Label>
                  <ReactSelect
                    name="StatedCareerGoals"
                    onChange={(e) =>
                      handleMultiInputChange("StatedCareerGoals", e)
                    }
                    isMulti
                    options={listOfValues?.StatedCareerGoals.map((item) => ({
                      label: item.StatedCareerGoals,
                      value: item.SetupDetailId,
                    }))}
                    defaultValue={
                      !formFields?.StatedCareerGoals
                        ? null
                        : formFields.StatedCareerGoals.split(",").map(
                            (item) => {
                              const isData =
                                listOfValues?.StatedCareerGoals.find((i) => {
                                  if (i.SetupDetailId == item) {
                                    return i
                                  }
                                })
                              if (isData) {
                                return {
                                  value: isData.SetupDetailId,
                                  label: isData.StatedCareerGoals,
                                }
                              }
                            }
                          )
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isSearchable
                  />
                  {/* <FormGroupSelect
                    label="Stated Career Goals"
                    name="StatedCareerGoals"
                    value={formFields?.StatedCareerGoals}
                    onChange={handleInputChange}
                    list={listOfValues?.StatedCareerGoals}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={isDisabled}
                    // disabled={paymentScheduleExist || role}
                  /> */}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroupInput
                    label="Other Remarks"
                    name="OtherRemarks"
                    value={formFields.OtherRemarks}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <FormGroupInput
                    type="textarea"
                    label="Plans for implementation of goals"
                    name="PlansForImplementationOfSaidGoals"
                    value={formFields.PlansForImplementationOfSaidGoals}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroupCheckbox
                    label="Additional Assistance / Help"
                    name="AdditionalAssistance"
                    value={formFields.AdditionalAssistance}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>

                {formFields.AdditionalAssistance && (
                  <Col md={8}>
                    <FormGroupInput
                      label="Additional Assistance Remarks by Counseller"
                      name="AdditionalAssistanceRemarksbyCounsellor"
                      value={formFields.AdditionalAssistanceRemarksbyCounsellor}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </Col>
                )}
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroupCheckbox
                    label="Does the student have a CV"
                    name="DoesTheStudentHaveACV"
                    value={formFields.DoesTheStudentHaveACV}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Last Counselling Date</Label>
                  <ReactDatePicker
                    value={getDate(formFields.LastCounsellingSessionDate, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) =>
                      AllDateSet(e, "LastCounsellingSessionDate")
                    }
                    className="form-control"
                    name="LastCounsellingSessionDate"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled={isDisabled}
                  />
                </Col>

                <Col md={4}>
                  <Label for="InputDate">Next Counselling Date</Label>
                  <ReactDatePicker
                    value={getDate(formFields.NextCounsellingSessionDate, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) =>
                      AllDateSet(e, "NextCounsellingSessionDate")
                    }
                    className="form-control"
                    name="NextCounsellingSessionDate"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                    disabled={isDisabled}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroupCheckbox
                    label="Assigned Mentor"
                    name="AssignedMentor"
                    value={formFields.AssignedMentor}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>
              </Row>

              {formFields.AssignedMentor && (
                <Row>
                  <Col md={4}>
                    <FormGroupInput
                      label="Mentor Name"
                      name="MentorName"
                      value={formFields.MentorName}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </Col>

                  <Col md={4}>
                    <FormGroupInput
                      label="Mentor Contact Number"
                      name="MentorContactNumber"
                      value={formFields.MentorContactNumber}
                      isNumber="true"
                      maxLength="15"
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </Col>

                  <Col md={4}>
                    <FormGroupInput
                      label="Mentor Specialization"
                      name="MentorSpecialization"
                      value={formFields.MentorSpecialization}
                      onChange={handleInputChange}
                      disabled={isDisabled}
                    />
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Student Feedback</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12}>
                  <FormGroupInput
                    type="textarea"
                    label="Student Feedback"
                    name="StudentFeedback"
                    value={formFields.StudentFeedback}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                  />
                </Col>

                <Col md={4}>
                  <FormGroupSelect
                    label="Student rating of Zaman Foundation services"
                    name="StudentRatingOfZamanFoundationServices"
                    value={formFields?.StudentRatingOfZamanFoundationServices}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    list={[
                      {
                        value: 1,
                      },

                      {
                        value: 2,
                      },
                      {
                        value: 3,
                      },
                      {
                        value: 4,
                      },
                      {
                        value: 5,
                      },
                    ]}
                    fieldId="value"
                    fieldName="value"
                    required={true}
                    // disabled={paymentScheduleExist || role}
                  />
                </Col>
              </Row>
              <Row></Row>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardHeader>
              <h6 className="font-weight-bold mb-0">Counseller Check List</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroupCheckbox
                    label="Case History"
                    name="CaseHistory"
                    value={formFields.CaseHistory}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupCheckbox
                    label="Family History"
                    name="FamilyHistory"
                    value={formFields.FamilyHistory}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>

                <Col md={3}>
                  <FormGroupCheckbox
                    label="Family Counseling"
                    name="FamilyCounseling"
                    value={formFields.FamilyCounseling}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupCheckbox
                    label="Declaration"
                    name="Declaration"
                    value={formFields.Declaration}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    //disabled={role}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormGroupInput
                    label="Counsellor Remarks*"
                    name="CounsellorRemarks"
                    value={formFields.CounsellorRemarks}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    maxLength="2000"
                    required
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          {isCounselling === true && isHistory === false ? (
            <Card className="mb-3">
              <CardHeader>
                <h6 className="font-weight-bold mb-0">
                  Terms And Conditions Of Scholarships Awarded By Zaman
                  Foundation
                </h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      Scholarship will be cancelled if the following are not
                      fulfilled.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      Student must inform Zaman Foundation before changing their
                      school, college, university and/or degree.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      Students must inform Zaman Foundation of any changes in
                      the status of education (e.g. freezing a degree, starting
                      an additional degree etc.)
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      If any statement and/or documentation given to Zaman
                      Foundation from the applicant turns out to be false, ZF
                      will revoke the scholarship.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      In order to retain their scholarship student must maintain
                      at minimum a grade of B or above.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      If a student fails to maintain a grade of B or above, they
                      will be placed on academic probation.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      After being placed on academic probation, if a student
                      continues to under-perform without justifiable cause, the
                      scholarship will be terminated.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      A written application along with any and all relevant and
                      required documents must be submitted to Zaman Foundation
                      at least a month before due date for fee payment.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      Reimbursements of fees shall be entertained except in
                      exceptional circumstances.
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Label
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        color: "rgb(214, 11, 17)",
                        fontWeight: "500",
                      }}
                    >
                      Upon completing his/her degree, the student will become
                      effective members of the society
                    </Label>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ) : null}
          {!isDisabled && (
            <CardFooter>
              <FormGroup>
                <FormGroupButton
                  onClick={() => handleSubmit(true, true)}
                  className="float-right ml-3 btn-outline-primary w-120px "
                  color="primary"
                  disabled={loaders.SubmitLoading || loaders.SaveLoading}
                  loading={loaders.SubmitLoading}
                  title="Submit"
                />

                <FormGroupButton
                  onClick={() => handleSubmit(false, true)}
                  className="float-right btn-outline-primary w-120px "
                  color="primary"
                  disabled={loaders.SubmitLoading || loaders.SaveLoading}
                  loading={loaders.SaveLoading}
                  title="Save"
                />
              </FormGroup>
            </CardFooter>
          )}
        </>
      )}

      {historyModal && (
        <ApplicantHistoryModal
          ApplicantCaseId={formFields?.ApplicantCaseId}
          historyModal={historyModal}
          setHistoryModal={setHistoryModal}
        />
      )}
    </Modal>
  )
}

export default CounselModal
