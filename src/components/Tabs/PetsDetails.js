import React, { useState, Link, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import {
  FindAndGetNewArrayFromArray,
  GetSetupMaster,
} from "utils/CommonMethods.js";
import { SetupMasterIds } from "../../utils/Constants.js";
import { Insert_PetDetail } from "../../utils/CommonMethods";
import Swal from "sweetalert2";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import { fetchData } from "utils/Api.js";
import useEditRole from "hooks/useEditRole.js";

const initialValues = {
  // OperationId: 1,
  ApplicantCase_InvestigationId: 0,
  ApplicantPetDetailId: 0,
  PetId: "",
  Quantity: null,
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectLists = {
  PetsList: [],
};

const columns = [
  { field: "Pet", name: "Pet Type" },
  { field: "Quantity", name: "Quantity" },
];

const PetsDetails = (props) => {
  const [role, appId] = useEditRole();
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [petsDetailList, setPetsDetailList] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = () => {
      fetchData("Applicant", "Crud_Pet_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setPetsDetailList(result?.DataSet?.Table);
        setSelectionLists({
          ...selectionLists,
          PetsList: result?.DataSet?.Table1,
        });
      });
    };
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

    let swelmsg = formFields.ApplicantPetDetailId === 0 ? 2 : 3;

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
          formFields.ApplicantPetDetailId === 0 ? 2 : 3,
          formFields
        );
        
      }
    })
  
  };

  const onEdit = (index) => {
       setFormFields({ ...formFields, ...petsDetailList[index] });
       
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
        requestCall(4, { ...formFields, ...petsDetailList[index] });
      }
    })
   
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    fetchData("Applicant", "Crud_Pet_Detail", {
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
      setPetsDetailList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Pets Details</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
                      <Row form>
              <Col md={4}>
                <FormGroupSelect
                  label="Pet Type"
                  name="PetId"
                  value={formFields.PetId}
                  onChange={handleInputChange}
                  list={selectionLists.PetsList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={4}>
                <FormGroupInput
                  label="Quantity*"
                  name="Quantity"
                  value={formFields.Quantity}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
            </Row>

                      <Row form className="text-right">
              <Col md={12}>
              {role ? null : (
                <FormGroupButton
                  title="Add Pet Detail"
                  type="submit"
                  loading={formLoading}
                />
              )}
              </Col>
            </Row>
          </form>

                  <Row form>
            <Col md={12}>
              <h2 className="h6">Pets Details</h2>
            </Col>
          </Row>
                  <Row form>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={petsDetailList}
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

export default PetsDetails;
