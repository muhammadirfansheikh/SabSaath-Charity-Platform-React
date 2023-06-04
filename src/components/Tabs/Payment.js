import React, { useState, Link, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import { GetSetupMaster } from "utils/CommonMethods.js";
import { PaymentMethod, SetupMasterIds } from "utils/Constants.js";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import useEditRole from "hooks/useEditRole.js";
import { fetchData } from "utils/Api.js";
import Swal from "sweetalert2";

const initialValues = {
  // OperationId: 1,
  ApplicantCase_InvestigationId: 0,
  PaymentTypeId: 0,
  BankName: "",
  AccountTitle: "",
  AccountNo: "",
  PaymentCNICNo: "",
  PaymentGatewayId: 0,
  UserId: localStorage.getItem("UserId"),
};

const columnsSchedule = [
  {
    field: "SupportType",
    name: "Support Type",
  },
  {
    field: "FundCategory",
    name: "Fund Category",
  },
  {
    field: "FundSubCategory",
    name: "Fund Sub Category",
  },
  {
    field: "PaymentSchedule_Date",
    name: "Payment Schedule Date",
  },
  {
    field: "Amount",
    name: "Amount",
  },
  {
    field: "PaymentFrequency",
    name: "Payment Frequency",
  },
];

const columnsPayment = [
  {
    field: "VoucherNo",
    name: "Voucher No",
  },
  {
    field: "PaymentSchedule_Date",
    name: "Payment Schedule Date",
  },
  {
    field: "Amount",
    name: "Amount",
  },
  {
    field: "PaymentSchedule_Date",
    name: "Payment Schedule Date",
  },
  {
    field: "Amount",
    name: "Amount",
  },
  {
    field: "PaymentStatus",
    name: "Payment Status",
  },

  {
    field: "PaymentType",
    name: "Payment Type",
  },
  {
    field: "BankName",
    name: "Bank Name",
  },
  {
    field: "AccountTitle",
    name: "Account Title",
  },
  {
    field: "AccountNumber",
    name: "Account No",
  },
  {
    field: "PaymentCNICNo",
    name: "Payee CNIC",
  },
  {
    field: "PaymentGateway",
    name: "Payment Gateway",
  },

  {
    field: "ActionBy",
    name: "Action By",
  },
  {
    field: "ActionDatetime",
    name: "Action Date",
  },
  {
    field: "Remarks",
    name: "Remarks",
  },
];

// ac.ApplicantPrimaryContactNumber,ac.ApplicantAlternateContactNumber,pld.VoucherNo,
// pld.PaymentSchedule_Date,pld.PayableAmount as Amount,pl_status.SetupDetailName as PaymentStatus,
// pt1.SetupDetailName as PaymentType,
// pld.BankName,
// pld.AccountTitle,
// pld.AccountNumber,
// pld.PaymentCNICNo,
// pg1.SetupDetailName as PaymentGateway,
// ua.Name as ActionBy,
// pld.ActionDatetime,
// pld.Remarks

const Payment = (props) => {
  const [role, appId] = useEditRole();

  const [paymentddl, setPaymentddl] = useState();
  const [paymentGatewayddl, setPaymentGatewayddl] = useState();
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  useEffect(() => {
    const fetchApplicantId = async () => {
      fetchData("Applicant", "UpdatePaymentMethod", {
        OperationId: 1,
        ApplicantCase_InvestigationId: appId,
      }).then((result) => {
        setFormFields({
          ...formFields,
          ...result.DataSet.Table[0],
        });
      });
    };

    const fetchPaymentHistory = async () => {
      fetchData("Payment", "Payment_History_Table", {
        ApplicantCase_InvestigationId: appId,
      }).then((result) => {
        
        if (result?.Response === true) {
          if (result?.DataSet?.Table?.length > 0) {
            setPaymentHistory(result?.DataSet?.Table);
          }
          if (result?.DataSet?.Table1?.length > 0) {
            setPaymentSchedule(result?.DataSet?.Table1);
          }
        }
      });
    };

    fetchApplicantId();
    fetchPaymentHistory();
  }, []);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const handleMainSelectChange = (event) => {
    setFormFields({
      ...initialValues,
      [event.target.name]: event.target.value,
    });
  };
  const GetPaymentDetail = async () => {
    try {
      var data = await GetSetupMaster(
        SetupMasterIds.PaymentTypeDetail,
        0,
        "",
        0
      );
      if (data != null) {
        if (data.response === true && data.data != null) {
          setPaymentddl(data.data.filter((data) => data.ParentId === 0));
          return data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  const GetPaymentGetway = async () => {
    try {
      var data = await GetSetupMaster(
        SetupMasterIds.PaymentTypeDetail,
        738,
        "",
        0
      );
      if (data != null) {
        if (data.response === true && data.data != null) {
          setPaymentGatewayddl(data.data);
          return data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  useEffect(() => {
    GetPaymentDetail();
    GetPaymentGetway();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const arr = formFields;

    requestCall(2, {
      ...formFields,
      arr,
      ApplicantCase_InvestigationId: appId,
    });
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    fetchData("Applicant", "UpdatePaymentMethod", {
      OperationId: opId,
      ...payload,
    }).then((result) => {
      if (result?.Response === true) {
        if (result?.DataSet?.Table1) {
          setFormFields({
            ...formFields,
            ...result.DataSet.Table[0],
          });
          Swal.fire({
            title: "Success",
            text: result?.DataSet?.Table1[0]?.Message,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: result?.DataSet?.Table1[0]?.Message,
            icon: "error",
          });
          return;
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        });
        return;
      }
    });
  };

  return (
    <div>
      {/* <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Payment</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <FormGroupSelect
                  label="Payment Type*"
                  name="PaymentTypeId"
                  value={formFields.PaymentTypeId}
                  onChange={handleMainSelectChange}
                  list={paymentddl}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  //  disabled={role}
                />
              </Col>
            </Row>
            <hr></hr>
            {parseInt(formFields.PaymentTypeId) === PaymentMethod.BankId ? (
              <Row>
                <Col md={3}>
                  <FormGroupInput
                    label="Bank Name*"
                    name="BankName"
                    value={formFields.BankName}
                    onChange={handleInputChange}
                    required={true}
                    // disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Account Title*"
                    name="AccountTitle"
                    value={formFields.AccountTitle}
                    onChange={handleInputChange}
                    required={true}
                    // disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Account Number*"
                    name="AccountNo"
                    value={formFields.AccountNo}
                    onChange={handleInputChange}
                    required={true}
                    isNumber="true"
                    // disabled={role}
                  />
                </Col>

                <Col md={3}>
                  <FormGroupInput
                    label="CNIC*"
                    name="PaymentCNICNo"
                    value={formFields.PaymentCNICNo}
                    onChange={handleInputChange}
                    required={true}
                    isNumber="true"
                    maxLength="13"
                    // disabled={role}
                  />
                </Col>
              </Row>
            ) : null}
            {parseInt(formFields.PaymentTypeId) ===
            PaymentMethod.ElectronicId ? (
              <Row>
                <Col md={3}>
                  <FormGroupSelect
                    label="Payment Gateway*"
                    name="PaymentGatewayId"
                    value={formFields.PaymentGatewayId}
                    onChange={handleInputChange}
                    list={paymentGatewayddl}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    //  disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Name*"
                    name="AccountTitle"
                    value={formFields.AccountTitle}
                    onChange={handleInputChange}
                    required={true}
                    // disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Mobile Number/Account Number*"
                    name="AccountNo"
                    value={formFields.AccountNo}
                    onChange={handleInputChange}
                    required={true}
                    isNumber="true"
                    maxLength="11"
                    // disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="CNIC*"
                    name="PaymentCNICNo"
                    value={formFields.PaymentCNICNo}
                    onChange={handleInputChange}
                    required={true}
                    isNumber="true"
                    maxLength="13"
                    // disabled={role}
                  />
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col className="text-right" md={12}>
                <FormGroupButton title="Save Payment Method" />
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card> */}

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Payment History</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <FormGroupTable
                columns={columnsPayment}
                rows={paymentHistory}
                hideAction={true}
                onEdit={null}
                onDelete={null}
              />
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Payment Schedule</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <FormGroupTable
                columns={columnsSchedule}
                rows={paymentSchedule}
                hideAction={true}
                onEdit={null}
                onDelete={null}
              />
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Payment;
