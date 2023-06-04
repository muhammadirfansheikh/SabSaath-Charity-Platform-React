import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import useEditRole from "hooks/useEditRole";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantContactDetailId: 0,
  PhoneTypeId: "",
  PhoneNo: null,
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectLists = {
  ContactTypeList: [],
  ContactList: [],
};

const columns = [
  { field: "PhoneType", name: "Contact Type" },
  { field: "PhoneNo", name: "Contact Number" },
];

const ContactDetails = (props) => {
  const [role, appId] = useEditRole();

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = () => {
      fetchData("Applicant", "Crud_Personal_Information_Contact_Detail", {
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
        setSelectionLists({
          ...selectionLists,
          ContactList: result?.DataSet?.Table,
          ContactTypeList: result?.DataSet?.Table1,
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
    
    if( formFields.ApplicantMonthlyExpenseDetailId === 0 ? 2 : 3 === 3)
    {
    //Update record
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to edit the record?",
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
          formFields.ApplicantMonthlyExpenseDetailId === 0 ? 2 : 3,
          formFields
        );
      }
    })

    }
    else
    {
  //Save Record
    requestCall(
      formFields.ApplicantMonthlyExpenseDetailId === 0 ? 2 : 3,
      formFields
    );
    }
  };

  const onEdit = (index) => {

    setFormFields({ ...formFields, ...selectionLists.ContactList[index] });
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
        requestCall(4, { ...formFields, ...selectionLists.ContactList[index] });
      }
    })
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    fetchData("Applicant", "Crud_Personal_Information_Contact_Detail", {
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
      setSelectionLists({
        ...selectionLists,
        ContactList: result?.DataSet?.Table1,
      });
      setFormFields({
        ...initialValues,
        ApplicantCase_InvestigationId: appId,
      });
      setFormLoading(false);
    });
  };

  return (
    <Card className="mb-3">
      <CardHeader>
        <h6 className="font-weight-bold mb-0">Contact Information</h6>
      </CardHeader>
      <CardBody>
        <form>
           <Row form>
            <Col md={3}>
              <FormGroupSelect
                label="Contact Type"
                name="PhoneTypeId"
                value={formFields.PhoneTypeId}
                onChange={handleInputChange}
                list={selectionLists.ContactTypeList}
                fieldId="SetupDetailId"
                fieldName="SetupDetailName"
                required={true}
                disabled={role}
              />
            </Col>

            <Col md={3}>
              <FormGroupInput
                label="Contact Number"
                name="PhoneNo"
                value={formFields.PhoneNo}
                onChange={handleInputChange}
                isNumber="true"
                required={true}
                maxLength="11"
                disabled={role}
              />
            </Col>
          </Row>

                  <Row form className="text-right">
            <Col md={12}>
            {role ? null : (
              <FormGroupButton
                type="submit"
                className="btn-sm"
                title="Add Contact"
                loading={formLoading}
                onClick={handleSubmit}
              />
              )}
            </Col>
          </Row>
        </form>
        <Row form>
          <Col md={12}>
            <h2 className="h6 pt-3">Contact Details</h2>
          </Col>
          <Col md={12}>
            <FormGroupTable
              columns={columns}
              rows={selectionLists.ContactList}
              onEdit={onEdit}
              onDelete={onDelete}
              hideAction={role}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ContactDetails;
