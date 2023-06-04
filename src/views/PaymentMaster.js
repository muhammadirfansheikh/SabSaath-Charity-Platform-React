import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import React, { useEffect, useState } from "react";
import { Roles } from "utils/Constants";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { fetchData } from "utils/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
} from "utils/CommonMethods";

const initialValues = {
  CreatedDateFrom: Date.now(),
  CreatedDateTo: Date.now(),
  PaymentListStatusId: 0,
  PaymentListMasterId: 0,
  PaymentListStatus: 0,
  Remarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const PaymentMaster = (props) => {
  const RoleId = localStorage.getItem("RoleId");
  const [formFields, setFormFields] = useState(initialValues);
  const [paymentListSummary, setPaymentListSummary] = useState([]);
  const [selectionList, setSelectionList] = useState({
    PaymentListStatus: [],
  });
  const fetchPaymentData = async () => {
  
    fetchData("Payment", "Payment_List_Table", {
      OperationId: 1,
     // CreatedDateFrom: formFields.CreatedDateFrom,
     // CreatedDateTo: formFields.CreatedDateTo,
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table);
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table1,
      });
    });
  };
  useEffect(() => {
    fetchPaymentData();
    searchListData();
  }, []);

  const columns = [
    {
      name: "Payment List Status",
      field: "PaymentListStatus",
    },
    {
      name: "For Period",
      field: "ForThePeriodOf",
    },
    {
      name: "Remarks",
      field: "Remarks",
    },
    {
      name: "Create Date",
      field: "CreatedDate",
    },
    {
      name: "Created By",
      field: "CreatedBy",
    },
  ];

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const searchListData = async () => {
 
     formFields.CreatedDateFrom = getDate(formFields.CreatedDateFrom, "-","yyyy/mm/dd")
     formFields.CreatedDateTo = getDate(formFields.CreatedDateTo, "-","yyyy/mm/dd")
    fetchData("Payment", "Payment_List_Table", {
      OperationId: 1,
   
     // CreatedDateFrom: formFields.CreatedDateFrom,
      //CreatedDateTo: formFields.CreatedDateTo,
      ...formFields,
      UserId: localStorage.getItem("UserId"),
      PaymentListStatusId : formFields.PaymentListStatusId == "" ? 0 : formFields.PaymentListStatusId
     
    }).then((result) => {
      setPaymentListSummary(result?.DataSet?.Table);
      setSelectionList({
        ...selectionList,
        PaymentListStatus: result?.DataSet?.Table1,
      });
    });
  };
  const cancelListData = async () => {
    setFormFields({
      ...initialValues,
    });
    fetchPaymentData();
  };
  const handleClick = () => {
    props.history.push("/admin/paymentListing/0");
  };

  const onView = (index, data) => {
    props.history.push(`/admin/paymentListing/${data.PaymentListMasterId}`);
    // props.history.push("/admin/paymentListing")
  };


 

  const AllDateSet = (event, type) => {
    if (type === "CreatedDateFrom")
     {
      setFormFields({
        ...formFields,
       CreatedDateFrom: event,
       
      });
      
    }
    else if(type === "PaymentListDateto")
    {
      setFormFields({
        ...formFields,
       CreatedDateTo: event,
       
      });
    }
  };
  return (
    <div className="content">
      <Row>
        <Col lg={12} md={12}>
          <Card className="card-user">
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Payment
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col md={3}>
                  <Label for="InputDate">Date From</Label>
                    <DatePicker
                      value={getDate(formFields.CreatedDateFrom, "/")}
                      dateFormat={dateFormat}
                      onChange={(e) => AllDateSet(e, "CreatedDateFrom")}
                      className="form-control"
                      name="CreatedDateFrom"
                      placeholderText={dateFormatPlaceholder}
                      showYearDropdown
                />
                      {/* <FormGroupInput
                      label="Date From"
                      name="CreatedDateFrom"
                      type="date"
                      value={formFields.CreatedDateFrom}
                      onChange={handleInputChange}
                    /> */}
                  </Col>

                  <Col md={3}>
                    
                    {/* <FormGroupInput
                      label="Date To"
                      name="CreatedDateTo"
                      type="date"
                      value={formFields.CreatedDateTo}
                      onChange={handleInputChange}
                    /> */}
                     <Label for="InputDate">Date To</Label>
                    <DatePicker
                      value={getDate(formFields.CreatedDateTo, "/")}
                      dateFormat={dateFormat}
                      onChange={(e) => AllDateSet(e, "PaymentListDateto")}
                      className="form-control"
                      name="PaymentListDateto"
                      placeholderText={dateFormatPlaceholder}
                      showYearDropdown
                     
                />
                  </Col>
                  <Col md={3}>
                    <FormGroupSelect
                      label="Payment List Status"
                      name="PaymentListStatusId"
                      list={selectionList.PaymentListStatus}
                      value={formFields.PaymentListStatusId}
                      onChange={handleInputChange}
                      fieldId="SetupDetailId"
                      fieldName="SetupDetailName"
                    />
                  </Col>
                </Row>
                <Row>
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
                  Payment Summary
                </Col>
                {parseInt(RoleId) === parseInt(Roles.Accounts) ? (
                  <Col lg={6} md={6} className="text-right">
                    <FormGroupButton
                      onClick={handleClick}
                      color="primary2"
                      title="Add New Payment"
                    />
                  </Col>
                ) : null}
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12}>
                  <FormGroupTable
                    columns={columns}
                    rows={paymentListSummary}
                    ButtonText="Create Voucher"
                    onView={onView}
                    // hideAction={role}
                    // onDelete={onDelete}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentMaster;
