import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  CardHeader,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  Get_CompanyBankDetails,
  InsertSetupDetail,
  Insert_Donor,
  UpdateSetupDetail,
  GetUniqueStringValue,
  CountryWithCode,
  validateEmail,
  Insert_ManualDonation,
  Donarss,
  dateFormatPlaceholder,
  dateFormat,
  getDate,
} from "utils/CommonMethods";
import { SetupMasterIds } from "utils/Constants";
import { GetSetupMaster } from "utils/CommonMethods";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import * as api from "../../utils/Api.js";
import useEditRole from "hooks/useEditRole.js";
import ReactSelect from "react-select";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import getBase64 from "components/useBase64";
import DatePicker from "react-datepicker";
import ModalCNIC_Wise from "./ModalCNIC_Wise.js";
import ModalDegree from "./ModalDegree.js";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import { LoadingSpinner } from "video-react";


const ModalDonor = (props) => {

  var UserId = localStorage.getItem("UserId");
  var UserIp = localStorage.getItem("UserIP");

  const initialValues = {
    ApplicantCaseName: "",
    ApplicantCase: "0",
    generalDonationName: "",
    generalDonation: SetupMasterIds.GeneralDonationid,
    PaymentTypeName: "",
    PaymentType: SetupMasterIds.CASH,
    Bank: "0",
    BankId: "0",
    OperationID: 0,
    Donorid: 0,
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    ContactNo: "",
    Address: "",
    CountryID: "0",
    Amount: 0,
    DonationTypeid: 0,
    ApplicantCaseID: "0",
    CurrencyName: "",
    Currency: SetupMasterIds.PKR,
    SubCategoryID: 0,
    qty: 0,
    DonationCat: "0",
    DonationCatName: "0", 
    CashBReceiptNo: "",
    CashBReceiptDate: "",
    BandDepReceiptNo: "",
    BankDepReceiptDate: "",
    ChequeNo: "",
  };

  const [CashBookReceiptUpload, setCashBookReceiptUpload] = useState("");
  const [BankDepositReceiptUpload, setBankDepositReceiptUpload] = useState();
  const [values, setValues] = useState(initialValues);
  const [Bankddl, setBankddl] = useState([]);
  const [countryddl, setCountryddl] = useState([]);
  const [currencyddl, setCurrencyddl] = useState([]);
  const [Donorddl, setDonorddl] = useState([]);
  const [ApplicantCasesidddl, setApplicantCasesidddl] = useState([]);
  const [generalDonationddl, setGeneralDonationddl] = useState([]);
  const [PaymentTypeddl, setPaymentTypeddl] = useState([]);
  const [Donationcatddl, setDonationCatddl] = useState();
  const [Categoryddl, setCategoryddl] = useState([]);
  const [SubCategoryddl, setSubCategoryddl] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editBlog, setEditBlog] = useState([]);
  const [donaridg, setDonarIdg] = useState();
  const [getApplicantCaseID, setgetApplicantCaseID] = useState("");
  const [GetNicAgainstValues, setGetNicAgainstValues] = useState("");
  const [loading, setLoading] = useState(false);


  const handleGetValue = (v) => {
    if (v !== undefined) {
      // alert(v);
      setgetApplicantCaseID(v.split(',')[0]);
      let ApplicantName = v.split(',')[1];
      let AppCasecode = v.split(',')[2];
      let pirmfundcat = v.split(',')[3];
      setGetNicAgainstValues(ApplicantName + ', ' + AppCasecode + ', ' + pirmfundcat);
    }
    else {
      setGetNicAgainstValues(v);
    }



  };

  useEffect(() => {
    GetGeneralDonation();
    GetCurrency();
    GetCountry();
    GetDontationCategory();
    GetPaymentType();
    GetCompany_BankDetails();
    Get_ApplicantCase();

  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "select-one") {
      setValues({
        ...values,
        [name]: value,
        [name + "Name"]: e.target.options[e.target.selectedIndex].text,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const closeNewmodal = () => {
    setOpenModal(false);
  };

  const CNIC_ModalOpen = (e) => {
    if (parseInt(e.length) !== 13 && e == "") {
      Swal.fire({
        title: "Error",
        text: "NIC No Must Equal To 13 Character Or Not Be Empty.",
        icon: "error",
      });
      setOpenModal(false);
      return;
    }
    else {
      api
        .fetchData("WebSite", "DonationSubmit_CRM", {
          OperationID: 4,
          CnicNo: values.CNIC,
        })
        .then((result) => {
          if (result?.DataSet?.Table.length === 0) {
            Swal.fire({
              title: "Error",
              text: "NIC no does not exist",
              icon: "error",
            });
            setOpenModal(false);
            setGetNicAgainstValues("");
            return;
          }
          else {
            setOpenModal(true);
          }
        });
    }
  };
  const handleInputChangeSelect = (ev) => {
    setValues({
      ...values,
      Donorid: ev?.DonorId,

    });

    if (ev.DonorId == undefined || ev.DonorId === 0) {
      setDonarIdg(0);
      setValues({
        ...initialValues,
        Donorid: ev?.DonorId
      })
    }
    else {
      setDonarIdg(ev?.DonorId)
      searchInfo(ev?.DonorId);
    }
  };
  function toggle() {
    props.closeNewmodal();
  }

  const GetGeneralDonation = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {
          setGeneralDonationddl(data.data);

          return data;
        } else {
          return [];
        }
      } else {
        // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
        return [];
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return [];
    }
  };
  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {
          var sortings = data.data.sort(function (a, b) {
            var keyA = a.Flex2;
            var keyB = b.Flex2;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });
          setCurrencyddl(sortings);

          return data;
        } else {
          return [];
        }
      } else {
        // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
        return [];
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return [];
    }
  };

  const GetCountry = async () => {
    try {
      var data = await CountryWithCode(1);
      if (data?.Response === true) {
        // setCountryddl(data?.DataSet?.Table);
        setCountryddl(data?.DataSet?.Table?.map((item, ind) => ({
          ...item,
          Country: item.Country.split('_')[0]
        })));
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  const GetDontationCategory = async () => {
    try {
      var data = await GetSetupMaster(
        SetupMasterIds.DontationCategory,
        0,
        "",
        0
      );
      if (data != null) {
        if (data.response === true && data.data != null) {
          setDonationCatddl(data.data);
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

  const GetCategory = async (e) => {
    var catValues = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);
    setCategoryddl(catValues.data);
  };
  const GetSubCategory = async (e) => {
    var subCatValues = await GetSetupMaster(
      SetupMasterIds.FundCategory,
      parseInt(e),
      "",
      0
    );

    setSubCategoryddl(subCatValues.data);
  };
  const GetPaymentType = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.PaymentType, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {

          setPaymentTypeddl(data.data);
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
  const GetCompany_BankDetails = async () => {
    try {
      var CompBankData = await Get_CompanyBankDetails();
      if (CompBankData != null) {
        setBankddl(CompBankData.Table);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  const CashBookRecpUpload_changeHandler = async (event) => {
    setCashBookReceiptUpload(event.target.files[0]);
  };

  const BankDeoRecpUpload_changeHandler = async (event) => {
    setBankDepositReceiptUpload(event.target.files[0]);
  };
  const Get_ApplicantCase = async () => {
    let supportArr = [];
    await api
      .postRecord(`WebSite`, `DonationSubmit_CRM`, {
        OperationID: 5,
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        ContactNo: "",
        Address: "",
        Countryid: "0",
        Currencyid: "0",
        Bankid: "0",
        CreatedByid: UserId,
        userip: UserIp,
        Donar_CheckOutDetail: supportArr,
      })
      .then((result) => { 
        if (result.data.Response === true) {

          // setDonorddl(
          //   result?.data?.DataSet.Table.map((item, ind) => ({
          //     ...item,
          //     label: item.DonorRegName,
          //     value: item.DonorId,


          //   }))
          // );

          var arr = [];
          arr.push({ label: "Select", value: 0 })
          result?.data?.DataSet.Table.forEach((item) => {
            arr.push({ ...item, label: item.DonorRegName, value: item.DonorId, })
          })
          setDonorddl([...arr])

        }
      });
  };
  const searchInfo = async (id) => {
    await api
      .fetchData("WebSite", "DonationSubmit_CRM", {
        OperationID: 6,
        Donorid: id,
      })
      .then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setValues({ ...values, ...result?.DataSet?.Table[0] });

      });
  };

  const SaveSupport = async () => {
    
    if (values.DonationCatName === "0") {
      Swal.fire({
        title: "Error",
        text: "Please Select donation for",
        icon: "error",
      });
      return;
    } else if (values.DonationCatName.trim() === "Case Wise Donation") {
      if (GetNicAgainstValues == "undefined" || GetNicAgainstValues == "") {
        Swal.fire({
          title: "Error",
          text: "Please search Nic No",
          icon: "error",
        });
        return;
      }
    } else if (values.DonationCatName.trim() === "Category Wise Donation") {
      if (values.Category === "0") {
        Swal.fire({
          title: "Error",
          text: "Please Select Fund Category",
          icon: "error",
        });
        return;
      } else if (values.SubCategoryID === "0") {
        Swal.fire({
          title: "Error",
          text: "Please Select Fund Sub Category",
          icon: "error",
        });
        return;
      }
    }

    else if (values.FirstName.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Please Enter First Name",
        icon: "error",
      });
      return;
    }
    else if (values.LastName.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Please Enter Last Name",
        icon: "error",
      });
      return;
    }
    else if (values.Amount == "" || values.Amount == "0" || parseInt(values.Amount) <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Donation Amount",
        icon: "error",
      });
      return;
    }
    else if (values.PaymentType === "0") {
      Swal.fire({
        title: "Error",
        text: "Please Enter Payment Type",
        icon: "error",
      });
      return;
    }

    else if (values.ContactNo.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Please Enter Contact No",
        icon: "error",
      });
      return;
    }
    else if (CashBookReceiptUpload === "undefined" || CashBookReceiptUpload === null || CashBookReceiptUpload === "" || CashBookReceiptUpload === '') {
      Swal.fire({
        title: "Error",
        text: "Please Upload Cash Book Receipt",
        icon: "error",
      });
      return;
    } else if (values.PaymentType === "736") {
      if (values.ChequeNo == "") {
        Swal.fire({
          title: "Error",
          text: "Please Enter cheque No",
          icon: "error",
        });
        return;
      }
    } else if (values.Register === true) {

      if ((values.ContactNo.trim() === "") & (values.EmailAddress === "")) {
        Swal.fire({
          title: "Error",
          text: "Email or Contact number is mandatory for registration",
          icon: "error",
        });
        return;
      }
    }
    if (values.EmailAddress === "" || values.EmailAddress == null) {

    }
    else {
      let checkEmail = validateEmail(values.EmailAddress)
      if (checkEmail === null) {
        Swal.fire({ title: 'Error', text: "Invalid Email format", icon: 'error' });
        return;
      }
    }
    if (values.ContactNo != "") {
      if (values.ContactNo.length < 7 || values.ContactNo.length > 16) {
        Swal.fire({
          title: "Error",
          text: "Phone number length must be from 7 to 15 digits",
          icon: "error",
        });
        return
      }
    }
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure you want to add this donation?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        var payload = {
          OperationID: 2,
          FirstName: values.FirstName,
          LastName: values.LastName,
          EmailAddress: values.EmailAddress,
          ContactNo: values.ContactNo,
          Address: values.Address,
          CreatedByid: UserId,
          ApplicantCaseID: values.ApplicantCaseID.toString(),
          Currencyid: values.Currency === null ? "0" : values.Currency,
          DonationTypeId: values.generalDonation,
          Amount: values.Amount,
          PaymentTypeId: values.PaymentType,
          Countryid: values.CountryID == "0" ? null : values.CountryID,
          ChequePayOrderNumber: values.ChequeNo,
          Bankid: values.Bank == "" ? "0" : values.Bank,
          userip: UserIp,
          CashBReceiptDate: values.CashBReceiptDate = getDate(values.CashBReceiptDate, "-", "yyyy/mm/dd"),
          Register: values.Register,
          CategoryID: values.Category,
          SubCategoryID: values.SubCategoryID,
          ApplicantCaseID: getApplicantCaseID.toString(),
          Donorid: donaridg,
          DonationForId: values.DonationCat,
        };
        var data = Insert_ManualDonation(payload, CashBookReceiptUpload).then(
          (response) => {
            if (response.data.Response === true) {
              if (response.data.DataSet.Table[0].haserror === 0) {
                Swal.fire({
                  title: "Success",
                  text: response.data.DataSet.Table[0].Message,
                  icon: "success",
                });
                setLoading(false);
                toggle();
                return response;
              } else {
                Swal.fire({
                  title: "Error",
                  text: response.data.DataSet.Table[0].Message,
                  icon: "error",
                });
                setLoading(false);
                return;
              }
            } else if (response?.data === "Invalid image File") {
              Swal.fire({
                title: "Error",
                text: "Invalid image File Please select valid Image file e.g (gif , png , jpeg)",
                icon: "error",
              });
              return;
            } else {
              Swal.fire({
                title: "Error",
                text: "Something Went Wrong",
                icon: "error",
              });
              setLoading(false);
              return;
            }
          }
        );
      }
    });
  };
  const AllDateSet = (event, type) => {
    if (type === "CashBookReceiptDate") {
      setValues({
        ...values,
        CashBReceiptDate: event,
      });
    } else if (type === "BankDepositReceiptDate") {
      setValues({
        ...values,
        BankDepReceiptDate: event,
      });
    }
  };



  return (
    <>

      <Modal
        isOpen={props.Ismodalshow}
        toggle={toggle}
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
        <ModalBody>

          <Row>
            <Col md={6}>
              <FormGroupSelect
                label="Donation For*"
                name="DonationCat"
                value={values.DonationCat}
                onChange={handleInputChange}
                list={Donationcatddl}
                fieldId="SetupDetailId"
                fieldName="SetupDetailName"
                required={true}
              />
            </Col>
          </Row>


          <Row>
            <Col md={12}>
              {values.DonationCat == SetupMasterIds.DonationCat_Donor ? (
                <>

                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label>CNIC Number</Label>
                        <Input
                          label="CNIC Number"
                          placeholder="xxxxxxxxxxxxx"
                          type="text"
                          name="CNIC"
                          autoComplete="off"
                          value={values.CNIC}
                          onChange={handleInputChange}
                          maxLength="13"
                          isNumber="true"
                          required={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button
                        color="primary"
                        type="submit"
                        size="sm"
                        className="mt-3 btn-block"
                        onClick={() => CNIC_ModalOpen(values.CNIC)}
                      >
                        Search
                      </Button>
                    </Col>


                    <Col md={7}>
                      <FormGroup>
                        <Label>Case Info</Label>
                        <Input
                          placeholder=""
                          type="text"
                          name="GetValuesNiCAgainst"
                          onChange={handleInputChange}
                          value={GetNicAgainstValues ? GetNicAgainstValues : ""}
                          maxLength="800"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
              {values.DonationCat == SetupMasterIds.CategoryWise_Donations ? (
                <>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="InputState">Fund Category*</Label>
                        <Input
                          id="ddlCategory"
                          name="Category"
                          type="select"
                          onChange={handleInputChange}
                          value={values.Category}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          {Categoryddl.map((item, key) => (
                            <option
                              key={item.SetupDetailName}
                              value={item.SetupDetailId}
                            >
                              {item.SetupDetailName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="InputState">Fund Sub Category*</Label>
                        <Input
                          id="ddlFundCategory"
                          name="SubCategoryID"
                          type="select"
                          onChange={handleInputChange}
                          value={values.SubCategoryID}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          {SubCategoryddl.map((item, key) => (
                            <option
                              key={item.SetupDetailName}
                              value={item.SetupDetailId}
                            >
                              {item.SetupDetailName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}

            </Col>
          </Row>
          <hr />
          <Row Form>
            <Col md={6}>
              <Label>Search Registered Donor</Label>
              <ReactSelect
                options={Donorddl}
                onChange={handleInputChangeSelect}
                name="DonorRegName"
              />
            </Col>

            {/* onClick={SaveSupport} */}
            {/* <Button color="primary" type="submit" size="sm" > 
          Search
        </Button> */}

            <Col md={6}>
              <FormGroupCheckbox
                label="Register Account"
                name="Register"
                value={values.Register}
                onChange={handleInputChange}
              //disabled={role}
              />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="">First Name*</Label>
                <Input
                  placeholder="First Name"
                  type="text"
                  onChange={handleInputChange}
                  name="FirstName"
                  value={values.FirstName}
                  required={true}
                  maxLength="60"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>Last Name*</Label>
                <Input
                  placeholder="Last Name"
                  type="text"
                  name="LastName"
                  value={values.LastName}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="60"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  placeholder="Email Address"
                  type="email"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="60"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroupInput
                label="Contact No"
                placeholder="Contact No"
                name="ContactNo"
                value={values.ContactNo}
                onChange={handleInputChange}
                maxLength="16"
                isNumber="true"
              />
              {/* <FormGroup>
                <Label>Contact No</Label>
                <Input
                  placeholder="ContactNo"
                  type="text"
                  name="ContactNo"
                  value={values.ContactNo}
                  onChange={handleInputChange}
                  isNumber={true}
                  maxLength="15"
                />
              </FormGroup> */}
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  placeholder="Address"
                  type="text"
                  name="Address"
                  value={values.Address}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="100"
                />
              </FormGroup>
            </Col>


            <Col md={6}>
              <FormGroupSelect
                label="Country"
                name="CountryID"
                value={values.CountryID}
                onChange={handleInputChange}
                list={countryddl}
                fieldId="Countryid"
                fieldName="Country"
                required={true}

              />
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="InputState">Donation Type*</Label>
                <Input
                  id="generalDonationName"
                  name="generalDonation"
                  type="select"
                  value={values.generalDonation}
                  onChange={handleInputChange}
                // disabled={role}
                >
                  {/* <option key={0} value={0}>
                  Select
                </option> */}
                  {generalDonationddl.map((item, key) => (
                    <option
                      key={item.SetupDetailName}
                      value={item.SetupDetailId}
                    >
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="InputState">Payment Type*</Label>
                <Input
                  id="PaymentTypeName"
                  name="PaymentType"
                  type="select"
                  value={values.PaymentType}
                  onChange={handleInputChange}
                // disabled={role}
                >
                  {/* <option key={0} value={0}>
                  Select
                </option> */}
                  {PaymentTypeddl.map((item, key) => (
                    <option key={item.SetupDetailName} value={item.SetupDetailId}>
                      {item.SetupDetailName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>


            <Col md={6}>
              <FormGroup>
                <Label for="InputState">Currency*</Label>
                <Input
                  id="CurrencyName"
                  name="Currency"
                  type="select"
                  value={values.selectCurrency}
                  onChange={handleInputChange}
                >
                  {/* <option key={0} value={0}>
                  Select
                </option> */}
                  {currencyddl.map(
                    (item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    )

                    //) : null
                  )}
                </Input>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroupInput
                label="Amount"
                placeholder="Amount"
                name="Amount"
                value={values.Amount}
                onChange={handleInputChange}
                required={true}
                maxLength="9"
                isNumber="true"
              />
            </Col>
            {values.PaymentType == SetupMasterIds.PaymentType_Cheque ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="">Cheque No*</Label>
                  <Input
                    type="text"
                    onChange={handleInputChange}
                    name="ChequeNo"
                    value={values.ChequeNo}
                  />
                </FormGroup>
              </Col>
            ) : (
              ""
            )}
            {values.PaymentType == SetupMasterIds.PaymentType_Cheque ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="InputState">Bank Name</Label>
                  <Input
                    id="BankID"
                    name="Bank"
                    type="select"
                    value={values.Bank}
                    onChange={handleInputChange}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {Bankddl.map((item, key) => (
                      <option key={item.BankName} value={item.BankID}>
                        {item.BankName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            ) : (
              ""
            )}
            <Col md={6}>
              <Label for="InputDate">CashBook Receipt Date*</Label>
              <DatePicker
                value={getDate(values.CashBReceiptDate, "/")}
                dateFormat={dateFormat}
                onChange={(e) => AllDateSet(e, "CashBookReceiptDate")}
                className="form-control"
                name="CashBookReceiptDate"
                placeholderText={dateFormatPlaceholder}
                maxDate={Date.now()}
                showYearDropdown
              />
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="">CashBook Receipt Upload*</Label>
                <input
                  type="file"
                  className="form-control"
                  id="CashBookRecUpload"
                  onChange={CashBookRecpUpload_changeHandler}
                  accept="image/png, image/gif, image/jpeg"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div>

            {/* <Button color="primary" type="submit" size="sm" onClick={SaveSupport}>
            Save
          </Button> */}

            {!loading && (
              <Button color="primary" type="submit" size="sm" onClick={SaveSupport}>
                Save
              </Button>
            )}

            {loading && (

              <Button color="primary" type="submit" size="sm" disabled>
                <i className="fas fa-spinner fa-spin"></i> Saving Process...
              </Button>
            )}
          </div>
          <Button color="secondary" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
        {/* </form> */}
      </Modal>
      {openModal && (
        <ModalCNIC_Wise
          {...props}
          HeaderText="Case Wise"
          Ismodalshow={openModal}
          closeNewmodal={closeNewmodal}
          logId={values.CNIC}
          editData={editBlog}
          handleGetValue={handleGetValue}
        />
      )}
    </>
  );
};

export default ModalDonor;
