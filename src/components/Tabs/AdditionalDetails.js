import React, { useState, Link, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
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
} from "reactstrap";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import { GetSetupMaster, updateDataGeneric } from "utils/CommonMethods.js";
import { ApiMethods, ControllerName, SetupMasterIds } from "utils/Constants.js";
import { fetchData } from "utils/Api.js";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import Swal from "sweetalert2";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import useEditRole from "hooks/useEditRole.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantGuardianDetailId: 0,
  GuardianName: "",
  GuardianCnic: "",
  GuardianContactNo: "",
  Occupation: "",
  Relation: "",
  CompanyName: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectLists = {
  RelationList: [],
};

const AdditionalDetails = (props) => {
  const [role, appId] = useEditRole();
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = () => {
      fetchData("Applicant", "Crud_Guardian_Detail", {
        OperationId: 1,
        ...formFields,
      }).then((result) => {
        if (result?.ResponseMessage !== "Success") {
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
          });
          return;
        }
        setFormFields({ ...formFields, ...result.DataSet.Table[0] });
      });
    };
    const fetchDropDownList = async () => {
      let relationList = await GetSetupMaster(
        SetupMasterIds.Relation,
        0,
        "",
        0
      );
      setSelectionLists({
        ...setSelectionLists,
        RelationList: relationList.data,
      });
    };
    fetchDropDownList();
    fetchApplicantId();
  }, []);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    fetchData("Applicant", "Crud_Guardian_Detail", {
      OperationId: 2,
      ...formFields,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.hasError > 0) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
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
      setFormLoading(false);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Guardian Details</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              <Col md={3}>
                <FormGroupInput
                  label="Guardian CNIC*"
                  name="GuardianCnic"
                  value={formFields.GuardianCnic}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  maxLength="13"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Guardian Name*"
                  name="GuardianName"
                  value={formFields.GuardianName}
                  onChange={handleInputChange}
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Contact Number*"
                  name="GuardianContactNo"
                  value={formFields.GuardianContactNo}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  maxLength="11"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Occupation"
                  name="Occupation"
                  value={formFields.Occupation}
                  onChange={handleInputChange}
                  //required={true}
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupSelect
                  label="Relation*"
                  name="Relation"
                  value={formFields?.Relation}
                  onChange={handleInputChange}
                  list={selectionLists.RelationList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Company"
                  name="CompanyName"
                  value={formFields.CompanyName}
                  onChange={handleInputChange}
                  //required={true}
                  disabled={role}
                />
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                {role ? null : (
                  <FormGroupButton
                    title="Save Guardian"
                    type="submit"
                    loading={formLoading}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>
    </div>
  );
};

export default AdditionalDetails;
