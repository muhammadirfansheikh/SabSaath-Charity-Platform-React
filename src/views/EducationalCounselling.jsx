import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import FormGroupTable from "components/GeneralComponent/FormGroupTable"
import React, { useEffect, useState } from "react"
import { DataTableCustomStyles, Roles } from "utils/Constants"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap"
import { fetchData } from "utils/Api"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { dateFormat, dateFormatPlaceholder, getDate } from "utils/CommonMethods"
import CounselModal from "components/Grids/EducationCounselling/CounselModal"

import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { useMemo } from "react"
import Swal from "sweetalert2"
import moment from "moment/moment"

const fourMonthLater = new Date()
fourMonthLater.setMonth(fourMonthLater.getMonth() + 4)
fourMonthLater.setDate(fourMonthLater.getDate() + 1)

const initialValues = {
  // for Searching Student Counselling
  ApplicantName: "",
  ApplicantCNIC: "",
  StudentName: "",
  LastCounsellingSession: null,
  NextCounsellingSession: null,
  NextSessionDateAfter: null,
  CreatedDateFrom: null,
  CreatedDateTo: null,

  // End

  // Add Student Counselling Information
  //ACADEMIC INFO
  ApplicantCaseId: null,
  ClassGradeDegree: "",
  Remarks: "",
  SchoolStatus: 0,
  SchoolStatusRemarks: "",
  // End ACADEMIC INFO

  //EDUCATIONAL COUNSELLOR INFO
  CounsellingDate: new Date(),
  CounsellorName: localStorage.getItem("Name"),
  CounsellorContactNumber: "",
  OtherCounsellorsPresent: "",
  AttendantWithStudent: "",
  ExtraCurricularActivities: "",
  Job: false,
  AssignedMentor: false,
  MentorName: "",
  MentorContactNumber: "",
  MentorSpecialization: "",
  CounsellorRemarks: "",
  StudentFeedback: "",
  IsCompleted: false,
  //End EDUCATIONAL COUNSELLOR INFO
  // End
  UserId: parseInt(localStorage.getItem("UserId")),
  UserIP: localStorage.getItem("UserIP"),

  Educational_Counselling_ID: null,
  ApplicantFamily_EducationDetailId: null,
  LastCounsellingSessionDate: new Date(),
  NextCounsellingSessionDate: fourMonthLater,
  OtherRemarks: "",
  CreatedDate: new Date(),
  Createdby: parseInt(localStorage.getItem("UserId")),
  JobRemarks: "",
  FamilyCounselling: false,
  StatedCareerGoals: "",
  AdditionalAssistance: null,
  AdditionalAssistanceRemarksbyCounsellor: "",
  CaseHistory: false,
  FamilyHistory: false,
  FamilyCounseling: false,
  Declaration: false,
  PlansForImplementationOfSaidGoals: "",
  DoesTheStudentHaveACV: false,
  StudentRatingOfZamanFoundationServices: 0,
}

const EducationalCounselling = (props) => {
  const RoleId = localStorage.getItem("RoleId")
  const [formFields, setFormFields] = useState({
    ...initialValues,
    CounsellorName: localStorage.getItem("Name"),
  })
  const [listOfValues, setListOfValues] = useState({
    SchoolStatus: [],
    OtherCounsellorsPresent: [],
    ExtraCurricularActivities: [],
    StatedCareerGoals: [],
  })
  const [EducationalCounsellingList, setEducationalCounsellingList] = useState(
    []
  )
  const [loaders, setLoaders] = useState({
    SubmitLoading: false,
    SaveLoading: false,
    ListLoading: true,
    Loading: true,
  })
  const [EducationalCounsellingHistory, setEducationalCounsellingHistory] =
    useState([])
  const [applicantHistory, setApplicantHistory] = useState([])
  const [openModel, setopenModel] = useState(false)
  const [openViewHistory, setopenViewHistory] = useState(false)
  const [openViewCounselling, setopenViewCounselling] = useState(false)

  const columns = useMemo(() => {
    return [
      {
        name: "Student Name",
        selector: "StudentName",
        width: "140px",
        sortable: true,
      },
      {
        name: "Academic Level",
        selector: "AcademicLevel",
        width: "140px",
        sortable: true,
      },
      {
        name: "Result",
        selector: "Result",
        width: "140px",
        sortable: true,
      },
      {
        name: "Applicant Name",
        selector: "ApplicantName",
        width: "140px",
        sortable: true,
      },
      {
        name: "Applicant CNIC",
        selector: "ApplicantCNIC",
        width: "140px",
        sortable: true,
      },
      {
        name: "Fund Sub Category",
        selector: "FundSubCategory",
        width: "140px",
        sortable: true,
      },
      {
        name: "Last Counselling Session",
        selector: "LastCounsellingSessionDate",
        width: "140px",
        cell: (row) =>
          row?.LastCounsellingSessionDate
            ? moment(row?.LastCounsellingSessionDate).format("DD/MM/YYYY")
            : null,
        sortable: true,
      },
      {
        name: "Next Counselling Session",
        selector: "NextCounsellingSession",
        cell: (row) =>
          row?.NextCounsellingSessionDate
            ? moment(row?.NextCounsellingSessionDate).format("DD/MM/YYYY")
            : null,
        width: "140px",
        sortable: true,
      },
      {
        name: "Action",
        selector: "StudentName",
        width: "250px",
        cell: (row) => {
          return (
            <div className="d-flex align-items-center ">
              {row?.CounsellingButton ? (
                <FormGroup>
                  <Button
                    block
                    color="primary"
                    outline
                    size="sm"
                    onClick={() => onCounselClick(row)}
                  >
                    Counsel
                  </Button>
                </FormGroup>
              ) : null}

              {row?.HistoryButton == 0 ? (
                <FormGroup>
                  <Button
                    block
                    color="primary"
                    className="ml-2"
                    outline
                    size="sm"
                    onClick={() => onHistoryClick(row)}
                  >
                    History
                  </Button>
                </FormGroup>
              ) : null}
            </div>
          )
        },
      },
    ]
  }, [])

  useEffect(() => {
    fetchEducationalCounselling_ListData(1, formFields)
    GetLOVs()
    //searchListData();
  }, [])

  const GetLOVs = async () => {
    try {
      const { DataSet } = await fetchData(
        "Applicant",
        "EducationalCounselling_List_Table",
        {
          OperationID: 4,
        }
      )
      setListOfValues({
        SchoolStatus: DataSet.Table,
        OtherCounsellorsPresent: DataSet.Table1,
        ExtraCurricularActivities: DataSet.Table2,
        StatedCareerGoals: DataSet.Table3,
      })
    } catch (error) {}
  }

  const fetchEducationalCounselling_ListData = async (
    operationid,
    formData = formFields,
    isCompleted,
    closeModal
  ) => {
    if (operationid == 1) {
      setLoaders({
        ...loaders,
        ListLoading: true,
      })
    } else {
      if (isCompleted) {
        setLoaders({
          ...loaders,
          ListLoading: false,
          SubmitLoading: true,
          SaveLoading: false,
        })
      } else {
        setLoaders({
          ...loaders,
          ListLoading: false,
          SubmitLoading: false,
          SaveLoading: true,
        })
      }
    }

    const payload =
      operationid == 1
        ? {
            OperationID: operationid,
            ApplicantName: formData?.ApplicantName,
            ApplicantCNIC: formData.ApplicantCNIC,
            StudentName: formData?.StudentName,
            NextCounsellingSession: formData.NextCounsellingSession
              ? moment(formData.NextCounsellingSession).format("YYYY-MM-DD")
              : null,
            LastCounsellingSession: formData.LastCounsellingSession
              ? moment(formData.LastCounsellingSession).format("YYYY-MM-DD")
              : null,
            NextSessionDateAfter: formData.NextSessionDateAfter
              ? moment(formData.NextSessionDateAfter).format("YYYY-MM-DD")
              : null,
          }
        : operationid == 2
        ? {
            OperationID: operationid,
            ApplicantCaseId: formData?.ApplicantCaseId,
            ApplicantFamily_EducationDetailId:
              formData.ApplicantFamily_EducationDetailId,
          }
        : {
            ...formFields,
            OperationID: parseInt(operationid),
            ApplicantCaseId: parseInt(formData?.ApplicantCaseId),
            UserId: parseInt(localStorage.getItem("UserId")),
            ApplicantFamily_EducationDetailId: parseInt(
              formFields.ApplicantFamily_EducationDetailId
            ),
            Createdby: parseInt(localStorage.getItem("UserId")),
            SchoolStatus: parseInt(formFields.SchoolStatus),
            StudentRatingOfZamanFoundationServices: parseInt(
              formFields.StudentRatingOfZamanFoundationServices
            ),

            // Add 1 day in Counselling Date
            CounsellingDate: moment(formFields.CounsellingDate).format(
              "YYYY-MM-DD"
            ),

            LastCounsellingSessionDate: moment(
              formFields.LastCounsellingSessionDate
            ).format("YYYY-MM-DD"),
            NextCounsellingSessionDate: moment(
              formFields.NextCounsellingSessionDate
            ).format("YYYY-MM-DD"),
            IsCompleted: isCompleted ? 1 : 0,
          }
    fetchData("Applicant", "EducationalCounselling_List_Table", payload)
      .then((result) => {
        console.log("operationid 2 result", operationid, result?.DataSet?.Table)

        if (operationid == 1) {
          setEducationalCounsellingList(result?.DataSet?.Table)
        }
        if (operationid == 2) {
          setEducationalCounsellingHistory(result?.DataSet?.Table)
          setApplicantHistory(result?.DataSet?.Table1)
        }

        if (operationid == 3) {
          if (result?.ResponseMessage === "Success") {
            const message = isCompleted
              ? "Record Submitted Successfully."
              : "Record Saved Successfully."
            Swal.fire({
              title: "Success",
              text: message,
              icon: "success",
            })
            setEducationalCounsellingList(result?.DataSet?.Table)
            setopenModel(false)
          }
          setFormFields({
            ...formFields,
            ...initialValues,
          })
        }

        setLoaders({
          ...loaders,
          ListLoading: false,
          SubmitLoading: false,
          SaveLoading: false,
          Loading: false,
        })
      })
      .catch((error) => {
        setLoaders({
          ...loaders,
          ListLoading: false,
          SubmitLoading: false,
          SaveLoading: false,
          Loading: false,
        })
        return Swal.fire({
          title: "Error",
          text: "Something Went Wrong. Please try again.",
          icon: "error",
        })
      })
  }

  const handleSubmit = (isCompleted, closeModal) => {
    if (!formFields.CounsellorRemarks) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Counsellor Remarks",
        icon: "error",
      })
      return
    }
    if (!formFields.CounsellorName) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Counsellor Name",
        icon: "error",
      })
      return
    }

    if (!formFields.CounsellingDate) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Counselling Date",
        icon: "error",
      })
      return
    }

    fetchEducationalCounselling_ListData(3, formFields, isCompleted, closeModal)
  }

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    })
  }

  const handleMultiInputChange = (name, value) => {
    if (value?.length) {
      const values = value.map((item) => item.value).join(",")
      setFormFields({
        ...formFields,
        [name]: values,
      })
    } else {
      setFormFields({
        ...formFields,
        [name]: "",
      })
    }
  }

  console.log("FORM FIELDS FORM EDU COUN", formFields)

  const searchListData = async () => {
    // if (formFields.CreatedDateTo) {
    //   if (!formFields.CreatedDateFrom) {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Please Enter Last Session Date",
    //       icon: "error",
    //     })
    //     return
    //   }
    // }

    // if (formFields.CreatedDateFrom) {
    //   if (!formFields.CreatedDateTo) {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Please Enter Next Session Date",
    //       icon: "error",
    //     })
    //     return
    //   }
    // }
    const nextSessionDateAfter =
      formFields.CreatedDateFrom || formFields.CreatedDateTo
        ? null
        : formFields.NextSessionDateAfter

    fetchEducationalCounselling_ListData(1, {
      ...formFields,

      LastCounsellingSession: formFields.CreatedDateFrom,
      NextCounsellingSession: formFields.CreatedDateTo,
      NextSessionDateAfter: nextSessionDateAfter,
    })
  }
  const cancelListData = async () => {
    setFormFields({
      ...initialValues,
    })
    fetchEducationalCounselling_ListData(1, initialValues)
    // fetchPaymentData();
  }
  const handleClick = () => {
    // props.history.push("/admin/paymentListing/0");
  }

  const onHistoryClick = (data) => {
    setopenModel(true)
    setopenViewHistory(true)
    setopenViewCounselling(false)
    setFormFields({
      ...formFields,
      ApplicantCaseId: data.ApplicantCaseId,
      ApplicantFamily_EducationDetailId:
        data?.ApplicantFamily_EducationDetailId,
    })
    fetchEducationalCounselling_ListData(2, data)
  }

  const onCounselClick = (data) => {
    console.log(
      "data.ApplicantFamily_EducationDetailId",
      data.ApplicantFamily_EducationDetailId
    )
    setopenModel(true)
    setopenViewHistory(false)
    setopenViewCounselling(true)
    setFormFields({
      ...formFields,
      ApplicantCaseId: data.ApplicantCaseId,
      HistoryButton: data.HistoryButton,
      Educational_Counselling_ID:
        data.HistoryButton != 0 ? data.HistoryButton : null,
      ApplicantFamily_EducationDetailId: data.ApplicantFamily_EducationDetailId,
    })
    fetchEducationalCounselling_ListData(2, data)
    console.log(formFields)
    console.log(data)
    console.log(data.ApplicantCaseId)
  }

  const onView = (index, data) => {
    setopenViewHistory(true)
  }

  console.log("CEHCKING LOADINGSSS", loaders)

  const AllDateSet = (event, type) => {
    if (type === "CreatedDateFrom") {
      setFormFields({
        ...formFields,
        CreatedDateFrom: event,
      })
    } else if (type === "NextSessionDateAfter") {
      setFormFields({
        ...formFields,
        NextSessionDateAfter: event,
      })
    } else if (type === "CreatedDateTo") {
      setFormFields({
        ...formFields,
        CreatedDateTo: event,
      })
    } else if (type === "CounsellingDate") {
      // Set NextCounsellingSessionDate to 4 months after CounsellingDate
      const date = new Date(event)
      date.setMonth(date.getMonth() + 4)
      date.setDate(date.getDate() + 1)

      setFormFields({
        ...formFields,
        CounsellingDate: event,
        NextCounsellingSessionDate: date,
      })
    } else if (type === "LastCounsellingSessionDate") {
      setFormFields({
        ...formFields,
        LastCounsellingSessionDate: event,
      })
    } else if (type === "NextCounsellingSessionDate") {
      setFormFields({
        ...formFields,
        NextCounsellingSessionDate: event,
      })
    }
  }

  const toggleModal = () => {
    setopenModel(!openModel)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Student Counselling
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <form>
                  <Row>
                    <Col md={4}>
                      <FormGroupInput
                        label="Student Name"
                        name="StudentName"
                        value={formFields.StudentName}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={4}>
                      <FormGroupInput
                        label="Applicant Name"
                        name="ApplicantName"
                        value={formFields.ApplicantName}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupInput
                        label="Applicant CNIC"
                        name="ApplicantCNIC"
                        value={formFields.ApplicantCNIC}
                        onChange={handleInputChange}
                      />
                    </Col>

                    <Col md={4}>
                      <Label for="InputDate">Last Session Date</Label>
                      <DatePicker
                        value={getDate(formFields.CreatedDateFrom, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => AllDateSet(e, "CreatedDateFrom")}
                        className="form-control"
                        name="CreatedDateFrom"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>

                    <Col md={4}>
                      <Label for="InputDate">Next Session Date</Label>
                      <DatePicker
                        value={getDate(formFields.CreatedDateTo, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => AllDateSet(e, "CreatedDateTo")}
                        className="form-control"
                        name="CreatedDateTo"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={4}>
                      <Label for="InputDate">Next Session Date After</Label>
                      <DatePicker
                        value={getDate(formFields.NextSessionDateAfter, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => AllDateSet(e, "NextSessionDateAfter")}
                        className="form-control"
                        name="NextSessionDateAfter"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
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
                    Student Counselling List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <DataTableExtensions
                      data={EducationalCounsellingList}
                      columns={columns}
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
                        progressPending={loaders?.ListLoading}
                        fixedHeaderScrollHeight="auto"
                        subHeaderAlign="right"
                        subHeaderWrap
                        customStyles={DataTableCustomStyles}
                        expandOnRowDoubleClicked={true}
                      />
                    </DataTableExtensions>
                    {/* <FormGroupTable
                      columns={columns}
                      rows={EducationalCounsellingList}
                      ButtonText="Counsel"
                      ButtonText1="History"
                      onDynamic={onCounselClick}
                      onDynamic1={onHistoryClick}
                      // hideAction={role}
                      // onDelete={onDelete}
                    /> */}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {openModel && (
        <CounselModal
          openModel={openModel}
          toggleModal={toggleModal}
          EducationalCounsellingHistory={EducationalCounsellingHistory}
          applicantHistory={applicantHistory}
          isHistory={openViewHistory}
          isCounselling={openViewCounselling}
          EducationalCounsellingList={EducationalCounsellingList}
          columns={columns}
          onView={onView}
          handleInputChange={handleInputChange}
          handleMultiInputChange={handleMultiInputChange}
          formFields={formFields}
          AllDateSet={AllDateSet}
          handleSubmit={handleSubmit}
          loaders={loaders}
          listOfValues={listOfValues}
          setFormFields={setFormFields}
        />
      )}
    </>
  )
}

export default EducationalCounselling
