import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import useEditRole from "hooks/useEditRole.js";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantFamily_MedicalCardDetailId: 0,
  ApplicantFamilyDetailId: "",
  EligibleCardId: "",
  MedicalCardAmount: "0",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const columns = [
  { field: "FamilyMemberName", name: "Family Member Name" },
  { field: "EligibleCard", name: "Eligible" },
  { field: "MedicalCardAmount", name: "Amount" },
];

const MedicalCardDetails = (props) => {
  const [role, appId] = useEditRole();

  // const [formFields, setDataFields] = useState(initialValues);
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  // const [dataFieldsList, setDataFieldsList] = useState([]);
  const [medicalList, setMedicalList] = useState([]);
  const [selectionList, setSelectionList] = useState({
    FamilyMemberList: [],
    EligibleCardList: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    const fetchApplicantId = async () => {
      let data1 = await fetchData("Applicant", "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_MedicalCardDetailId:
          formFields.ApplicantFamily_MedicalCardDetailId,
      });
      fetchData("Applicant", "Crud_Family_Medical_Card_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_MedicalCardDetailId:
          formFields.ApplicantFamily_MedicalCardDetailId,
      }).then((result) => {
        setMedicalList(result?.DataSet?.Table);
        setSelectionList({
          ...selectionList,
          EligibleCardList: result?.DataSet?.Table1,
          FamilyMemberList: data1?.DataSet?.Table,
        });
      });
    };
    // fetchFamilyMember();
    fetchApplicantId();
  }, []);
  const handleInputChange = (event) => {
    
    if (event.target.name === "MedicalCardAmount") {
      setFormFields({
        ...formFields,
        [event.target.name]:
          event.target.value === "" ? "0" : event.target.value,
      });
    } else {
      setFormFields({
        ...formFields,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let swelmsg =  formFields.ApplicantFamily_MedicalCardDetailId === 0 ? 2 : 3;

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
          formFields.ApplicantFamily_MedicalCardDetailId === 0 ? 2 : 3,
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
      text: "Are you sure want to Delete Record?",
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
    fetchData("Applicant", "Crud_Family_Medical_Card_Detail", {
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
          <h6 className="font-weight-bold mb-0">Medical Card Details</h6>
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
                  label="Eligible*"
                  name="EligibleCardId"
                  value={formFields.EligibleCardId}
                  onChange={handleInputChange}
                  list={selectionList.EligibleCardList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Amount"
                  name="MedicalCardAmount"
                  value={
                    formFields.MedicalCardAmount === ""
                      ? "0"
                      : formFields.MedicalCardAmount
                  }
                  onChange={handleInputChange}
                  // required={true}
                  isNumber="true"
                  disabled={role}
                  maxLength="10"
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col md={12}>
                <FormGroup>
                  {role ? null : (
                    <Button color="primary" type="submit">
                      Add Medical Card
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </form>

          <Row>
            <Col md={12}>
              <h2 className="h6">Medical Card Details</h2>
            </Col>
          </Row>

          <Row>
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

export default MedicalCardDetails;
