import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import useEditRole from "hooks/useEditRole";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";

const initialValues = {
  // OperationId: 1,
  ApplicantCase_InvestigationId: 0,
  ApplicantFamily_MedicalDisablityDetailId: 0,
  ApplicantFamilyDetailId: "",
  DisabilityId: "",
  HospitalName: "",
  HospitalContactNo: "",
  HospitalAddress: "",
  DoctorName: "",
  DoctorContactNo: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const columns = [
  // { field: "self", name: "Self" },
  { field: "FamilyMemberName", name: "Family Member Name" },
  { field: "Disability", name: "Disability Detail" },
  { field: "HospitalName", name: "Hospital Name" },
  { field: "HospitalContactNo", name: "Hospital Contact" },
  { field: "HospitalAddress", name: "Hospital Address" },
  { field: "DoctorName", name: "Doctor Name" },
  { field: "DoctorContactNo", name: "Doctor's Contact" },
];

const MedicalDisabilityDetails = (props) => {
  const [role, appId] = useEditRole();

  const [historyModal, setHistoryModal] = useState(false);
  // const [formFields, setDataFields] = useState(initialValues);
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  // const [dataFieldsList, setDataFieldsList] = useState([]);
  const [medicalList, setMedicalList] = useState([]);
  const [selectionList, setSelectionList] = useState({
    FamilyMemberList: [],
    DisabilityList: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    const fetchApplicantId = async () => {
      let data1 = await fetchData("Applicant", "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_MedicalDisablityDetailId:
          formFields.ApplicantFamily_MedicalDisablityDetailId,
      });
      fetchData("Applicant", "Crud_Family_Medical_Disability_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_MedicalDisablityDetailId:
          formFields.ApplicantFamily_MedicalDisablityDetailId,
      }).then((result) => {
        setMedicalList(result?.DataSet?.Table);
        setSelectionList({
          ...selectionList,
          DisabilityList: result?.DataSet?.Table1,
          FamilyMemberList: data1?.DataSet?.Table,
        });
      });
    };
    // fetchFamilyMember();
    fetchApplicantId();
  }, []);
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  // const toggleHistoryModal = () => {
  //   setHistoryModal(!historyModal);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let swelmsg = formFields.ApplicantFamily_MedicalDisablityDetailId === 0 ? 2 : 3;

    if(swelmsg === parseInt(3))
    {
      swelmsg = "Are you sure to edit the record?";
    }
    else
    {
      swelmsg = "Are you sure to add the record?";
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
      if (result.isConfirmed)
      {
        requestCall(
          formFields.ApplicantFamily_MedicalDisablityDetailId === 0 ? 2 : 3,
          formFields
        );
        
      }
    })
  };

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...medicalList[index] });
  };

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
      if (result.isConfirmed)
      {
        requestCall(4, { ...formFields, ...medicalList[index] });
      }
    })
    
  };
  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    setFormLoading(true);
    fetchData("Applicant", "Crud_Family_Medical_Disability_Detail", {
      OperationId: opId,
      ...payload,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.hasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0]?.Message,
          icon: "error",
        });
        setFormLoading(false);
        return;
      }
      Swal.fire({
        title: "Success",
        text: result?.DataSet?.Table[0]?.Message,
        icon: "success",
      });
      setMedicalList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Medical Disability Details</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row form>
              <Col md={3}>
                <FormGroupSelect
                  label="Family Member Name*"
                  name="ApplicantFamilyDetailId"
                  value={formFields?.ApplicantFamilyDetailId}
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
                  label="Disability*"
                  name="DisabilityId"
                  value={formFields.DisabilityId}
                  onChange={handleInputChange}
                  list={selectionList.DisabilityList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Hospital Name"
                  name="HospitalName"
                  value={formFields.HospitalName}
                  onChange={handleInputChange}
                  // required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Hospital Contact"
                  name="HospitalContactNo"
                  value={formFields.HospitalContactNo}
                  onChange={handleInputChange}
                  // required={true}
                  isNumber="true"
                  disabled={role}
                  maxLength="11"
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Hospital Address"
                  name="HospitalAddress"
                  value={formFields.HospitalAddress}
                  onChange={handleInputChange}
                  // required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Doctor Name"
                  name="DoctorName"
                  value={formFields.DoctorName}
                  onChange={handleInputChange}
                  // required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Doctor Contact"
                  name="DoctorContactNo"
                  value={formFields.DoctorContactNo}
                  onChange={handleInputChange}
                  // required={true}
                  isNumber="true"
                  disabled={role}
                  maxLength="11"
                />
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  {role ? null : (
                    <Button color="primary" type="submit">
                      Add Disability
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </form>

          <Row form>
            <Col md={12}>
              <h2 className="h6">Medical Disability Details</h2>
            </Col>
          </Row>

          <Row form>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={medicalList}
                onEdit={onEdit}
                onDelete={onDelete}
                hideAction={role}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default MedicalDisabilityDetails;
