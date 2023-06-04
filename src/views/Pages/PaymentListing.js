import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import * as api from "utils/Api";
import { GetSetupMaster } from "utils/CommonMethods";
import { SetupMasterIds } from "utils/Constants";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
} from "utils/CommonMethods";

const PaymentListing = () => {
  const { id } = useParams();

  const [statusList, setStatusList] = useState([]);
  const [paymentListSummary, setPaymentListSummary] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  const [categoryDDL, setCategoryDDL] = useState([]);
  const [FundSubCatDDL, setFundSubCatDDL] = useState([]);
  
  
  const [paymentDDL, setPaymentDDL] = useState([]);
  const history = useHistory();
  // const [isTransExist, setIsTransExist] = useState(false);

  const initialValues = {
    OperationId: 0,
    CreatedDateFrom: "",
    CreatedDateTo: "",
    PaymentListStatusId: 0,
    PaymentListMasterId: id,
    Remarks: "",
    UserId: localStorage.getItem("UserId"),
    UserIP: localStorage.getItem("UserIP"),
    ArrayPaymentList: [],
    ApplicantCaseCode: "",
    ApplicantCNIC: "",
    PrimaryFundCategoryId: 0,
    PaymentType: 0,
    ReceiverName: "",
    ReceiverCNIC: "",
    ReceiverContactNumber: "",
    UploadReceipt: "",
    FundSubCategoryId:0,
  };

  const [formFields, setFormFields] = useState(initialValues);

  const columnsHistory = [
    {
      name: "Status",
      field: "Status",
    },
    {
      name: "Remarks",
      field: "Remarks",
    },
    {
      name: "Created Date",
      field: "CreatedDate",
    },
    {
      name: "Action By",
      field: "ActionBy",
    },
  ];

  const columnsSummary = [
    {
      name: "Payment Type",
      field: "PaymentType",
    },
    {
      name: "Total Payable Amount",
      field: "Current_TotalPayableAmount",
    },
  ];
  const columns = [
    {
      name: "Sr.",
    },
    {
      name: "Applicant Case Code",
    },
    {
      name: "Name",
    },
    {
      name: "CNIC No",
    },
    {
      name: "City",
    },
    {
      name: "Fund Category",
    },

    {
      name: "Fund Sub Category",
    },


    {
      name: "Case Status",
    },
    {
      name: "Total Approved Amount",
    },
    {
      name: "Balance Amount",
    },
    {
      name: "Installment Amount",
    },

    {
      name: "Repetition",
    },

    {
      name: "Frequency",
    },

    {
      name: "Payment Type",
    },
    {
      name: "Bank",
    },
    {
      name: "Account Title",
    },
    {
      name: "Account No",
    },
    {
      name: "Receiver CNIC No",
    },
    {
      name: "Electronic Payment",
    },
    // {
    //   name: "PaymentScheduleId",
    // },
    {
      name: "View Case",
    },
   
    {
      name: "Action",
    },
  ];

  const GetCategory = async (e) => {
    var catValues = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);
    setCategoryDDL(catValues.data);
  };

  const GetFundSubCategory = async (CategoryId) => {
  
   var fundsubcat = await GetSetupMaster(SetupMasterIds.FundCategory, CategoryId == "0" ? "-1" : CategoryId, "", 0);
   console.log(fundsubcat.data)
   setFundSubCatDDL(fundsubcat.data);
   //return data;
}

  const GetPayment = async (e) => {
    try {
      var data = await GetSetupMaster(
        SetupMasterIds.PaymentTypeDetail,
        0,
        "",
        0
      );
      if (data != null) {
        if (data.response === true && data.data != null) {
          setPaymentDDL(data.data.filter((data1) => data1.ParentId === 0));
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

  const generatePayment = async (e, opId) => {
    try {
      //
      var isValidate = false;

      if (e !== null) {
        e.preventDefault();

        var date1 =
          formFields.CreatedDateFrom !== ""
            ? new Date(formFields.CreatedDateFrom)
            : "";
        var date2 =
          formFields.CreatedDateTo !== ""
            ? new Date(formFields.CreatedDateTo)
            : "";

        if (
          formFields.CreatedDateFrom !== "" &&
          formFields.CreatedDateTo !== ""
        ) {
          if (date1 <= date2) {
            isValidate = true;
          } else {
            Swal.fire({
              title: "Error",
              text: "Please Select Proper Dates",
              icon: "error",
            });
            return;
          }
        } else {
          Swal.fire({
            title: "Error",
            text: "Please Select Date From & Date To",
            icon: "error",
          });
          return;
        }
      } else {
        isValidate = true;
      }

      if (isValidate) {
     
        var obj = {
          ...formFields,
          PaymentType : formFields.PaymentType == "" ? 0 : formFields.PaymentType,
          PrimaryFundCategoryId : formFields.PrimaryFundCategoryId == "" ? 0 : formFields.PrimaryFundCategoryId,
          FundSubCategoryId : formFields.FundSubCategoryId == "" ? 0 : formFields.FundSubCategoryId,
          OperationId: opId,
        };

        var data = await api.postRecord(`Payment`, `Payment_List_Table`, obj);
    //  
        if (data?.data?.Response === true) 
        {
          if (data?.data?.DataSet?.Table?.length > 0) 
          {
            setPaymentListSummary(data?.data?.DataSet?.Table);
            setPaymentList(data?.data?.DataSet?.Table1);
            setStatusList(data?.data?.DataSet?.Table3);
            //console.log(setPaymentList);
            if (opId === 6) {
              var obj1 = {
                ...formFields,
                CreatedDateFrom: data?.data?.DataSet?.Table1[0].FromDate,
                CreatedDateTo: data?.data?.DataSet?.Table1[0].ToDate,
              };
              setFormFields({
                ...formFields,
                ...obj1,
              });
              setPaymentHistory(data?.data?.DataSet?.Table2);
            }
          }
          else{
            setPaymentListSummary([])
            setPaymentList([])
            setStatusList([])
            setPaymentHistory([])
            Swal.fire({
              title: "Error",
              text: "No Data Found",
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Error",
            text: data?.data?.ResponseMessage,
            icon: "error",
          });
          return;
        }
      }
    } catch (error) {
      return [];
    }
  };

  const submitPayment = async (e) => {
    e.preventDefault();
 

     if (formFields.PaymentListStatusId > 0) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Are you sure to submit the record?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#2f4050",
        confirmButtonText: `Confirm`,
        confirmButtonColor: "#bf1e2e",
      }).then((result) => {
        if (result.isConfirmed) {
            SaveGetStatus_().then((data) => 
            {
              if (data?.data?.Response === true) {
                if (data?.data?.DataSet?.Table?.length > 0) {
                  if (data?.data?.DataSet?.Table[0]?.HasError > 0) {
                    Swal.fire({
                      title: "Error",
                      text: data?.data?.DataSet?.Table[0]?.Error_Message,
                      icon: "error",
                    });
                    return;
                  } else {
                    Swal.fire({
                      title: "Success",
                      text: data?.data?.DataSet?.Table[0]?.Message,
                      icon: "success",
                    });
                      history.push("/admin/PaymentMaster");
                  }
                }
              }
          });
        }
      });
         } else {
           Swal.fire({
             title: "Error",
             text: "Please Select Payment List Status",
             icon: "error",
           });
         }
  }

  const SaveGetStatus_ = async () => 
  {
   
//;
    try {
      var arr = [];
      paymentList.forEach(function (obj) {
        console.log(obj.PaymentTypeId)
        if (obj.IsChecked) {
          arr.push({
            ApplicantCaseId: obj.ApplicantCaseId,
            PaymentSchedule_Date: obj.PaymentSchedule_Date,
            PayableAmount: obj.Case_Current_InstallmentAmount,
            Remarks: "",
            FundCategoryId : obj.FundCategoryId,
            FundSubCategoryId : obj.FundSubCategoryId,
            PaymentTypeid : obj.PaymentTypeId,
            PaymentScheduleId : obj.PaymentScheduleId,
            BalanceAmount : obj.CaseTotalAmountBalance,

          });
        }
      });

      if (arr.length > 0) {
        // 0 2
        // <0 3
        // if (formFields.PaymentListStatusId > 0) {
       

          return await api.postRecord(`Payment`, `Payment_List_Table`, {
            ...formFields,
            OperationId: id == 0 ? 2 : 3,
            ArrayPaymentList: arr,
          });

         
        // } else {
        //   Swal.fire({
        //     title: "Error",
        //     text: "Please Select Payment List Status",
        //     icon: "error",
        //   });
        // }
      } else {
        Swal.fire({
          title: "Error",
          text: "No Payment Found",
          icon: "error",
        });
      }
    } catch (error) {
      return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let _values = e.target.value;
    setFormFields({
      ...formFields,
      [name]: _values,
    });
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleInputChange_Fundcat = (e) => {
   
    let { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  
   GetFundSubCategory(e.target.value);
    
  };

  

  const PaymentStatus = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.PaymentList, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {
          setStatusList(data.data);
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
    GetCategory();
    GetPayment();
    if (id > 0) {
      generatePayment(null, 6);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitPayment(e);
  };

  const handleCheckedValue = (e, index) => {
    paymentList[index][e.target.name] = e.target.value;

    setPaymentList([...paymentList]);
  };
  const AllDateSet = (event, type) => {
    if (type === "CreatedDateFrom") {
      setFormFields({
        ...formFields,
        CreatedDateFrom: event, 
      });
      
    }
    else if (type === "CreatedDateTo") {
      setFormFields({
        ...formFields,
        CreatedDateTo: event, 
      });
      
    }
    
  };
  return (
    // @ApplicantCaseCode  	as  nvarchar(max)	= '',

    // @Cnic                   as  nvarchar(max)	= '',
    // @FundCategoryId			as int  = 0,

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
                    <label>Date From</label>
                    {/* <Input
                      type="date"
                      name="CreatedDateFrom"
                      required={true}
                      value={formFields.CreatedDateFrom}
                      onChange={handleInputChange}
                      disabled={id == 0 ? false : true}
                    /> */}

                  <DatePicker
                  value={getDate(formFields.CreatedDateFrom, "/")}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "CreatedDateFrom")}
                  className="form-control"
                  name="CreatedDateFrom"
                  placeholderText={dateFormatPlaceholder}
                  disabled={id == 0 ? false : true}
                  required={true}
                  showYearDropdown
                  />
                  </Col>

                  <Col md={3}>
                    <label>Date To</label>
                  <DatePicker
                  value={getDate(formFields.CreatedDateTo, "/")}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "CreatedDateTo")}
                  className="form-control"
                  name="CreatedDateTo"
                  placeholderText={dateFormatPlaceholder}
                  disabled={id == 0 ? false : true}
                  required={true}
                  showYearDropdown
                  />
                    {/* <Input
                      name="CreatedDateTo"
                      required={true}
                      type="date"
                      value={formFields.CreatedDateTo}
                      onChange={handleInputChange}
                      disabled={id == 0 ? false : true}
                    /> */}
                  </Col>
                  {id == 0 ? (
                    <>
                      <Col md={3}>
                        <label>Applicant Case Code</label>
                        <Input
                          name="ApplicantCaseCode"
                          value={formFields.ApplicantCaseCode}
                          onChange={handleInputChange}
                          disabled={id == 0 ? false : true}
                        />
                      </Col>
                      <Col md={3}>
                        <label>Applicant CNIC</label>
                        <Input
                          name="ApplicantCNIC"
                          value={formFields.ApplicantCNIC}
                          onChange={handleInputChange}
                          disabled={id == 0 ? false : true}
                        />
                      </Col>
                      <Col md={3}>
                        <FormGroupSelect
                          label="Fund Category"
                          name="PrimaryFundCategoryId"
                          value={formFields.PrimaryFundCategoryId}
                          onChange={handleInputChange_Fundcat}
                          list={categoryDDL}
                          fieldId="SetupDetailId"
                          fieldName="SetupDetailName"
                          disabled={id == 0 ? false : true}
                        />
                      </Col>
                      <Col md={3}>
                        <FormGroupSelect
                          label="Fund Sub Category"
                          name="FundSubCategoryId"
                          value={formFields.FundSubCategoryId}
                          onChange={handleInputChange}
                          list={FundSubCatDDL}
                          fieldId="SetupDetailId"
                          fieldName="SetupDetailName"
                          disabled={id == 0 ? false : true}
                        />
                      </Col>
                      <Col md={3}>
                        <FormGroupSelect
                          label="Payment Type"
                          name="PaymentType"
                          value={formFields.PaymentType}
                          onChange={handleInputChange}
                          list={paymentDDL}
                          fieldId="SetupDetailId"
                          fieldName="SetupDetailName"
                          disabled={id == 0 ? false : true}
                        />
                      </Col>
                    </>
                  ) : null}
                  {id == 0 ? (
                    <Col md={3} className="text-left">
                      <FormGroupButton
                        title="Generate"
                        onClick={(e) => generatePayment(e, 5)}
                        type="button"
                      />
                    </Col>

                    
                  ) : null}
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
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <FormGroupTable
                  columns={columnsSummary}
                  rows={paymentListSummary}
                  hideAction={true}
                />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12}>
          <Card>
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Payment List
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          {columns.map((item, key) => (
                            <th key={key}>{item.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paymentList &&
                          paymentList.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.ApplicantCaseCode}</td>
                              <td>{item.ApplicantName}</td>
                              <td>{item.CnicNo}</td>
                              <td>{item.City}</td>

                              <td>{item.FundCategory}</td>
                              <td>{item.FundSubCategory}</td>
                              <td>{item.CaseStatus}</td>

                              <td>{item.CaseTotalAmountApproved}</td>
                              <td>{item.CaseTotalAmountBalance}</td>
                              <td>{item.Case_Current_InstallmentAmount}</td>

                              <td>{item.Repitation}</td>
                              <td>{item.Frequency}</td>

                              <td>{item.PaymentType}</td>
                              <td>{item.BankName}</td>
                              <td>{item.AccountTitle}</td>
                              <td>{item.AccountNumber}</td>
                              <td>{item.PaymentCNICNo}</td>
                              <td>{item.PaymentGateway}</td>
                              {/* <td>{item.PaymentScheduleId}</td> */}
                              <td>
                                <Button
                                  color="danger"
                                  outline
                                  size="sm"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "ACIid",
                                      item.ApplicantCase_InvestigationId
                                    );

                                    localStorage.setItem("role", 0);

                                    window.open(
                                      "/admin/ApplicantDetail/" +
                                        item.ApplicantCase_InvestigationId,
                                      "_blank"
                                    );
                                  }}
                                >
                                  View
                                </Button>
                              </td>
                              {id == 0 ? (
                                <td>
                                  <input
                                    type="checkbox"
                                    name="IsChecked"
                                    checked={item.IsChecked}
                                    // disabled={role}
                                    onChange={(e) =>
                                      handleCheckedValue(
                                        {
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        },
                                        index
                                      )
                                    }
                                  />
                                </td>
                              ) : null}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12}>
          <Card>
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Payment History
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {id > 0 ? (
                <Row>
                  <FormGroupTable
                    columns={columnsHistory}
                    rows={paymentHistory}
                    hideAction={true}
                  />
                </Row>
              ) : null}

              {statusList.length > 0 ? ( 
                <>
                  <Row>
                    <Col md="2">
                      <FormGroupSelect
                        label="Payment List Status"
                        required={true}
                        list={statusList}
                        value={formFields.PaymentListStatusId}
                        name="PaymentListStatusId"
                        onChange={handleChange}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                      />
                    </Col>
                    <Col md="10">
                      <label>Remarks</label>
                      <Input
                        name="Remarks"
                        onChange={(e) =>
                          handleChange({
                            target: {
                              name: e.target.name,
                              value: e.target.value,
                            },
                          })
                        }
                        label="Remarks"
                        required={true}
                        value={formFields.Remarks}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-right">
                      <FormGroupButton
                        onClick={handleSubmit}
                        color="primary2"
                        title="Submit"
                      />
                    </Col>
                  </Row>{" "}
                </>
               ) : null} 
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentListing;
