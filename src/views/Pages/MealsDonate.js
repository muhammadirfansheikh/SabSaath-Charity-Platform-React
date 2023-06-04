import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Label,
  Form,
  FormGroup,
  Col,
  Row,
  Input,
} from "reactstrap";
import HomeHeader from "../../components/Header/HomeHeader.js";
import HomeFooter from "../../components/Footer/HomeFooter.js";
import { Link } from "react-router-dom";
import {
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
  objCurrrency,
} from "utils/CommonMethods.js";
import { SetupMasterIds } from "utils/Constants.js";
import Swal from "sweetalert2";
import Select from 'react-select';


const MealsDonate = (props) => {

  console.log("Meals" , props);

  var params = props.location.state != undefined ? props.location.state : "";
  var DonationSubCategoryid = params.donationsubcategoryid;
  var donationName = params.SetupDetailName;
  //var amount = params.amount.replace(/,/g, "");
  var OperationID = 1;
  var caseId = 0;
  var TagLineId = params.taglineid;
  var Quantity = 1;



  // var donationType = params.donationId;
  // var donationName = params.donationName;
  var Amount = params.amount.replace(/,/g, "");
  var AmountInPKR = params.amount.replace(/,/g, "");;//params.AmountInPKR;
  var ConversionRate = "";//selectedcurrencyValues.ConversionRate;
  var ConvertAmount = params.amount.replace(/,/g, "");;//params.AmountInPKR
  var CurrencyFromSymbol = "PKR";
  var CurrencytoSymbol = "PKR";
  var CurrentCurrencyAmount = params.currencyAmount.replace(/,/g, "");;
  var CurrentCurrencySymbol = "";
  var DonationForid = 1499;
  var ExchangeRate = 0;
  var IsAdobt = params.IsAdobt;
  var IsAdobtMonth = params.IsAdobtMonth;
  var NoofMonth = 1;
  var NoOfMonths = 1;
  var OperationID = 1;
  var currencyType = params.Currency;



  const initialValues = {
    donationName: donationName,
    donationType: 0,
    donationTypeName: "",
    currencyType: 0,
    currencyName: "",
    caseId: caseId,
    OperationID: OperationID,
    Quantity: Quantity,
    BasicAmount: Amount,
    Amount: Amount,
    TagLineId: TagLineId,
    DonationSubCategoryid: DonationSubCategoryid, 
    Amount: params.amount.replace(/,/g, ""),
    AmountInPKR: AmountInPKR,
    ConversionRate: ConversionRate,
    ConvertAmount: ConvertAmount,//params.AmountInPKR
    CurrencyFromSymbol: CurrencyFromSymbol,
    CurrencytoSymbol: CurrencytoSymbol,
    CurrentCurrencyAmount: CurrentCurrencyAmount,
    CurrentCurrencySymbol: CurrentCurrencySymbol,
    DonationForid: DonationForid,
    ExchangeRate: ExchangeRate,
    IsAdobt: IsAdobt,
    IsAdobtMonth: IsAdobtMonth,
    NoofMonth: NoofMonth,
    NoOfMonths: NoOfMonths,
    OperationID: OperationID,
    currencyType: currencyType,
    TotalVal: Quantity * CurrentCurrencyAmount,
  };

  const [selectedcurrencyValues, setselectedcurrencyValues] = useState(objCurrrency);
  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues);
  const [generalDonationddl, setGeneralDonationddl] = useState([]);
  const [currencyddl, setCurrencyddl] = useState([]);
  const [globalCurrency, setglobalCurrency] = useState(null);

  var ConvertAmount;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let values = e.target.value;
    if (name == "donationType") {
      setBasicInfoValues({
        ...BasicInfoValues,
        "donationTypeName": e.target.options[e.target.selectedIndex].text,
        "donationType": values,
      });
    } else if (name == "currencyType") {
      setBasicInfoValues({
        ...BasicInfoValues,
        "currencyName": e.target.options[e.target.selectedIndex].text,
        "currencyType": values,
      });
      var currencyRate = e.target.options[e.target.selectedIndex].text;


    } else {
      setBasicInfoValues({
        ...BasicInfoValues,
        [name]: values,
      });
    }
  };
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
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {
          setCurrencyddl(data.data);
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

  useEffect(() => {
    //GetCurrency();
    GetGeneralDonation();
    load();
  }, []);


  const load = async () => {
    await GetCurrency();
    //Display in Currency name Text Box
    let _SessionData = JSON.parse(sessionStorage.getItem('globalSelectedCurrency'));
    let _CurrencyData = await FastForex_FetchOnlyOne(_SessionData.Flex1, "PKR");
    selectedcurrencyValues.currency = _SessionData.SetupDetailId;
    if (_CurrencyData.Response) {
      let _parseData = JSON.parse(_CurrencyData.Data);
      selectedcurrencyValues.ConversionRate = _parseData.result.PKR;
      selectedcurrencyValues.CurrencyFromSymbol = _parseData.base;
      setglobalCurrency([JSON.parse(sessionStorage.getItem('globalSelectedCurrency'))]);
      setselectedcurrencyValues({ ...selectedcurrencyValues });
    }
    else {
      setglobalCurrency([JSON.parse(sessionStorage.getItem('globalSelectedCurrency'))]);
    }
  };
  const MealsDonate = () => {
    // ConvertAmount = BasicInfoValues.Amount * ExchangeRate;
    if (BasicInfoValues.donationType === 0 || BasicInfoValues.donationType === "") {
      Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      });
    } else if (BasicInfoValues.currencyType === 0 || BasicInfoValues.currencyType === "") {
      Swal.fire({
        title: "Error",
        text: "Please Select Currency",
        icon: "error",
      });
    } else if (BasicInfoValues.Quantity <= 0) {
      Swal.fire({
        title: "Error",
        text: "Quantity must be greater than 0",
        icon: "error",
      });
    }
    else {

      props.history.push({
        pathname: "/checkout",
        state: {
          ...BasicInfoValues,
          ConvertAmount: ConvertAmount,
          ConversionRate: selectedcurrencyValues.ConversionRate,
          CurrentCurrencySymbol: selectedcurrencyValues.CurrencyFromSymbol,
          ExchangeRate: selectedcurrencyValues.ConversionRate,
          CurrencyFromSymbol: "PKR",
          CurrencytoSymbol: "PKR",
          CurrentCurrencyAmount: parseFloat(BasicInfoValues.TotalVal).toFixed(2),//params.currencyAmount.replace(/,/g, ""),
          DonationForid: 1499,
          IsAdobt: params.IsAdobt,
          IsAdobtMonth: params.IsAdobtMonth,
          NoofMonth: 1,
          TotalCount: 1,
          OperationID: 1,
          currencyType: params.Currency,
          AmountInPKR: selectedcurrencyValues.ConversionRate * parseFloat(BasicInfoValues.TotalVal).toFixed(2),//params.amount.replace(/,/g, ""),
          Amount: parseFloat(BasicInfoValues.TotalVal).toFixed(2),//selectedcurrencyValues.ConversionRate * parseFloat(BasicInfoValues.TotalVal).toFixed(2),
          Quantity: BasicInfoValues.Quantity,
          TagLineId: TagLineId,
          DonationSubCategoryid: DonationSubCategoryid,
          // ExchangeRate: ExchangeRate,
        },
      });
    }
  };

  return (
    <div className="maincontent">
      {/* <HomeHeader isShow={true} /> */}
      <HomeHeader Disableds={true} />

      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">{BasicInfoValues.donationName}</h1>
            
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Row>
              <Col></Col>
              <Col md={8}>
                <Card className="cardform">
                  <CardBody>
                    <form>
                      <Row>
                        <Col md={12} className="text-center mb-3">
                          <h2>{BasicInfoValues.donationName}</h2>
                          <hr />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="">Donate</Label>
                            <Input
                              type="text"
                              name="donationName"
                              value={BasicInfoValues.donationName}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="">Donation Type</Label>
                            <Input
                              name="donationType"
                              type="select"
                              value={BasicInfoValues.donationType}
                              onChange={handleInputChange}
                              required={true}
                            >
                              <option value="">Select</option>
                              {generalDonationddl &&
                                generalDonationddl.map((item) => (
                                  <option
                                    value={item.SetupDetailId}
                                    key={item.SerialNo}
                                  >
                                    {item.SetupDetailName}
                                  </option>
                                ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        {/* <Col md={12}>
                          <FormGroup>
                            <Label for="">Currency Type</Label>
                            <Input
                              name="currencyType"
                              type="select"
                              value={BasicInfoValues.currencyType}
                              onChange={handleInputChange}
                              required={true}
                            >
                              <option value="">Select</option>
                              {currencyddl &&
                                currencyddl.map((item, key) => (
                                  <option
                                    value={item.SetupDetailId}
                                    key={item.SerialNo}
                                  >
                                    {item.SetupDetailName + " - " + item.Flex1}
                                  </option>
                                ))}
                            </Input>
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col lg="12" md="12">
                          <div className="form-group quick-donation">
                            {/* <select
                  className="form-control form-select"
                  onChange={CurrencyFunc}
                  value={currency}
                >
                  <option value="">Select Currency</option>
                  {currencyddl &&
                    currencyddl.map((item, key) => {
                      return (
                        <option
                          data={item.Flex1}
                          value={item.SetupDetailId}
                          key={item.SerialNo}
                        >
                          {item.SetupDetailName + " - " + item.Flex1}
                        </option>
                      );
                    })}
                </select> */}



                            <Label for="">Currency</Label>
                            <Select
                              height="35"
                              minHeight="35"
                              placeholder="Select Option"
                              getOptionValue={(option) => option.SetupDetailId} // changes here!!!
                              value={globalCurrency}
                              isDisabled={true}
                              options={currencyddl}
                              onChange={handleInputChange}
                              getOptionLabel={e => (
                                <div style={{ display: 'flex', alignItems: 'center', zIndex: "10", lineHeight: '5px' }}>
                                  <span class={e.Flex3}></span>
                                  <span style={{ marginLeft: 5 }}>{e.SetupDetailName}</span>
                                </div>
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={3}>
                          <FormGroup>
                            <Label for="">Quantity</Label>
                            <Input
                              id=""
                              min="1"
                              name="Quantity"
                              type="number"
                              value={BasicInfoValues.Quantity}
                              onChange={(e) => {
                                setBasicInfoValues({
                                  ...BasicInfoValues,
                                  Quantity: e.target.value,
                                  TotalVal: e.target.value * BasicInfoValues.CurrentCurrencyAmount,
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={9}>
                          <FormGroup>
                            <Label for="">Amount</Label>
                            <Input
                              id=""
                              value={parseFloat(BasicInfoValues.TotalVal).toFixed(2)}
                              name="Amount"
                              // type="number"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Button
                            style={{ width: "100%" }}
                            className="d-block"
                            onClick={MealsDonate}
                            color="primary"
                            type="button"
                          >
                            Donate
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </section>
      </div>
      <HomeFooter />
    </div>
  );
};

export default MealsDonate;
