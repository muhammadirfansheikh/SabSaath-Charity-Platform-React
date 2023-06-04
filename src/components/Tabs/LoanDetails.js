import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import useEditRole from "hooks/useEditRole.js";
import React, { useState, Link, useEffect } from "react";
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
  Option,
  Input,
  check,
  Badge,
} from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantLoanDetailId: 0,
  LoanTypeId: 0,
  LoanAmount: null,
  MonthlyAmount: null,
  BalanceAmount: null,
  Remarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const columns = [
  // { field: "self", name: "Self" },
  { field: "LoanType", name: "Loan Type" },
  { field: "LoanAmount", name: "Loan/Committee Amount" },
  { field: "MonthlyAmount", name: "Duration In Month" },
  { field: "BalanceAmount", name: "Balance Amount" },
  { field: "Remarks", name: "Remarks" },
];
const LoanDetails = (props) => {
  const [role, appId] = useEditRole();
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [loanList, setLoanList] = useState([]);
  const [selectionList, setSelectionList] = useState({
    LoanType: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    const fetchApplicantId = async () => {
      fetchData("Applicant", "Applicant_Crud_Loan_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantLoanDetailId: formFields.ApplicantLoanDetailId,
      }).then((result) => {
        setLoanList(result?.DataSet?.Table);
        setSelectionList({
          ...selectionList,
          LoanType: result?.DataSet?.Table1,
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


    let swelmsg = formFields.ApplicantLoanDetailId === 0 ? 2 : 3;

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
        requestCall(formFields.ApplicantLoanDetailId === 0 ? 2 : 3, formFields);
        
      }
    })



    
  };

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...loanList[index] });
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
        requestCall(4, { ...formFields, ...loanList[index] });
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
    fetchData("Applicant", "Applicant_Crud_Loan_Detail", {
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
      setLoanList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Loan Details</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row form>
              <Col md={3}>
                <FormGroupSelect
                  label="Loan Type*"
                  name="LoanTypeId"
                  value={formFields?.LoanTypeId}
                  onChange={handleInputChange}
                  list={selectionList.LoanType}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Loan/Committee Amount*"
                  name="LoanAmount"
                  value={formFields.LoanAmount}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Duration In Month*"
                  name="MonthlyAmount"
                  value={formFields.MonthlyAmount}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Balance Amount"
                  name="BalanceAmount"
                  value={formFields.BalanceAmount}
                  onChange={handleInputChange}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Remarks*"
                  name="Remarks"
                  value={formFields.Remarks}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={12}>
                {role ? null : (
                  <FormGroupButton title="Add Loan Detail" type="submit" />
                )}
              </Col>
            </Row>
          </form>
          <Row form>
            <Col md={12}>
              <h2 className="h6">Loan Details</h2>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={loanList}
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

export default LoanDetails;
