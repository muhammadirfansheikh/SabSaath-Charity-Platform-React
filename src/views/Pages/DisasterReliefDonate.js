import React, { useState, useEffect } from "react"
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
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Link } from "react-router-dom"
import {
  AllowAlphabatic,
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
} from "utils/CommonMethods.js"
import { SetupMasterIds } from "utils/Constants.js"
import Swal from "sweetalert2"
import qurbanibanner from "../../assets/img/home/PakFloodRelef2022.jpg"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { x64 } from "crypto-js"
import Select from "react-select"

const DisasterReliefDonate = (props) => {
  //const [getProps, setProps] = useState(JSON.parse(localStorage.getItem("props")));
  const [getProps, setProps] = useState(props)
  var params = props?.location.state != undefined ? props?.location.state : ""
  var DonationSubCategoryid = props?.location.state.donationsubcategoryid
  var donationName = params.SetupDetailName
  var amount =
    props?.location.state.amount == null
      ? 0
      : props?.location.state.amount.replace(/,/g, "") // params.amount.replace(/,/g, "");
  var OperationID = 3
  var caseId = 0
  var Tagline = props?.location.state.tagline
  var TagLineId = props?.location.state.taglineid
  var Quantity = 1
  console.log("DonationSubCategoryid", DonationSubCategoryid)
  console.log("TagLineId", TagLineId)
  console.log("getProps", getProps)

  const initialValues = {
    donationName: donationName,
    donationType: 0, //1052,
    donationTypeName: "",
    currencyType: 310,
    currencyName: "",
    caseId: caseId,
    OperationID: OperationID,
    Quantity: Quantity,
    BasicAmount: amount,
    Amount: amount,
    TagLineId: TagLineId,
    Tagline: Tagline,
    DonationSubCategoryid: DonationSubCategoryid,
    Remarks: "",

    CurrencyFromSymbol: "",
    CurrencyToSymbol: "PKR",
    ConversionRate: 1,
    NoOfMonths: 1,
    AmountInPKR: amount,
    TotalAmount: 0,

    IsAdobtMonth: false,
  }

  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)
  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [ExchangeRate, setExchangeRate] = useState(1)
  const [currency, setCurrency] = useState({
    amountInPKR: amount,
    amount: amount,
    // amount: props?.location?.state?.amount.replace(/,/g, ""),
    // amountInPKR: props?.location?.state?.amount.replace(/,/g, ""),
  })

  const [globalCurrency, setglobalCurrency] = useState(null)

  const [unitAmount, setUnitAmount] = useState(0)

  var ConvertAmount
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value

    if (e.target.getAttribute("isalphabetic") === "true") {
      values = AllowAlphabatic(e.target.value)
    } else if (e.target.getAttribute("isnumber") == "true")
      values = e.target.value.replace(/\D/g, "")

    if (name == "donationType") {
      setBasicInfoValues({
        ...BasicInfoValues,
        donationTypeName: e.target.options[e.target.selectedIndex].text,
        donationType: values,
      })
    } else if (name == "currencyType") {
      setBasicInfoValues({
        ...BasicInfoValues,
        currencyName: e.target.options[e.target.selectedIndex].text,
        currencyType: values,
      })
      var currencyRate = e.target.options[e.target.selectedIndex].text
      const GetCurrency_ExchangeRateValue = async () => {
        try {
          if (currencyRate !== "Select") {
            var data = await GetCurrency_ExchangeRate(
              e.target.options[e.target.selectedIndex].text
            )
            if (data?.Response === true) {
              setExchangeRate(data.Data)
              return data
            } else {
              Swal.fire({
                title: "Error",
                text: data?.Data,
                icon: "error",
              })
              setBasicInfoValues({
                ...BasicInfoValues,
                currencyType: 0,
              })
              return []
            }
          } else {
          }
        } catch (error) {
          return []
        }
      }
      GetCurrency_ExchangeRateValue()
    } else {
      setBasicInfoValues({
        ...BasicInfoValues,
        [name]: values,
      })
    }
  }
  let CatWiseAmount
  const [hissaQuantity, setHissaQuantity] = useState({
    amtGoat: 0,
    amtCow: 0,
    amtHissa: 0,
  })
  if (
    parseInt(BasicInfoValues.DonationSubCategoryid) ===
    SetupMasterIds.Multiple_Animals
  ) {
    let Amt = BasicInfoValues.Amount
    CatWiseAmount = Amt.split(":")
  }

  const GetGeneralDonation = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          setGeneralDonationddl(data.data)
          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          setCurrencyddl(data.data)
          return data
        } else {
          return []
        }
      } else {
        // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
        return []
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
    }
  }
  useEffect(() => {
    GetGeneralDonation()
    GetCurrency()

    const load = async () => {
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )

      if (_CurrencyData.Response && _CurrencyData.Data != "") {
        let _parseData = JSON.parse(_CurrencyData.Data)
        BasicInfoValues.ConversionRate = _parseData.result.PKR
        BasicInfoValues.Amount =
          +BasicInfoValues.Amount.replace(/,/g, "") /
          BasicInfoValues.ConversionRate
        setCurrency({
          ...currency,
          amount: parseFloat(amount) / BasicInfoValues.ConversionRate,
        })
        BasicInfoValues.CurrencyFromSymbol = _parseData.base

        setBasicInfoValues({ ...BasicInfoValues })
      } else {
        BasicInfoValues.ConversionRate = 1
        BasicInfoValues.CurrencyFromSymbol = "PKR"

        setBasicInfoValues({ ...BasicInfoValues })
      }
    }
    load()
  }, [JSON.stringify(props)])

  const DisasterReliefDonate = () => {
    ConvertAmount = BasicInfoValues.Amount * ExchangeRate
    if (
      BasicInfoValues.donationType === 0 ||
      BasicInfoValues.donationType === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    } else if (
      BasicInfoValues.currencyType === 0 ||
      BasicInfoValues.currencyType === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Please Select Currency",
        icon: "error",
      })
    } else if (BasicInfoValues.Quantity <= 0) {
      Swal.fire({
        title: "Error",
        text: "Quantity must be greater than 0",
        icon: "error",
      })
    } else if (
      BasicInfoValues.Amount <= 0 ||
      BasicInfoValues.Amount === "0.00"
    ) {
      Swal.fire({
        title: "Error",
        text: "Amount must be greater than 0",
        icon: "error",
      })
    } else {
      props.history.push({
        pathname: "/checkout",
        state: {
          Amount: parseFloat(currency.amount.toFixed(2)), //ok
          AmountInPKR: currency.amountInPKR,
          ConversionRate: BasicInfoValues.ConversionRate,
          OperationID: 1,
          ConvertAmount: currency.amountInPKR,
          CurrencyToSymbol: "PKR",
          currentCurrencyAmount: parseFloat(currency.amount.toFixed(2)),
          currentCurrencyFromSymbol: BasicInfoValues.CurrencyFromSymbol,
          DonationForId: 725,
          DonationSubCategoryid: DonationSubCategoryid,
          ExchangeRate: BasicInfoValues.ConversionRate,
          IsAdobt: false,
          IsAdobtMonth: false,
          NoofMonth: 1,
          TotalCount: 1,
          OperationID: 1,
          Quantity: BasicInfoValues.Quantity,
          TagLineId: TagLineId,
          CurrencyFromSymbol: "PKR",
          CurrencytoSymbol: "PKR",
          donationType: BasicInfoValues.donationType,
        },
      })
    }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const numberWithCommas_UnitAmount = (x) => {
    let a =
      (BasicInfoValues.Amount / ExchangeRate).toFixed(2) == "Infinity"
        ? "0.00"
        : (BasicInfoValues.Amount / ExchangeRate).toFixed(2)
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="maincontent">
      <HomeHeader isShow={true} />

      <div className="content">
        <section
          id="inner-banner"
          className="section"
          style={{ backgroundImage: `url(${qurbanibanner})` }}
        >
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
                          <h2 className="mt-3">
                            {
                              // parseInt(BasicInfoValues.DonationSubCategoryid) === SetupMasterIds.Disaster_FeedFamily ?
                              //   (
                              // <h2 className="mt-3">I'm Feeding a Family </h2>
                              <h2 className="mt-3">
                                {BasicInfoValues.Tagline}{" "}
                              </h2>
                              // ) :
                              // parseInt(BasicInfoValues.DonationSubCategoryid) === SetupMasterIds.Disaster_MedicalCamp ?
                              //   (
                              //     // <h2 className="mt-3">I'm offering Life-saving Medicines{" "}</h2>
                              //     <h2 className="mt-3">{BasicInfoValues.Tagline} </h2>
                              //   ) :
                              //   parseInt(BasicInfoValues.DonationSubCategoryid) === SetupMasterIds.Disaster_RebuildHome ?
                              //     (
                              //       // <h2 className="mt-3">I’m Rebuilding a Home{" "}</h2>
                              //       <h2 className="mt-3">{BasicInfoValues.Tagline} </h2>
                              //     ) :
                              //     parseInt(BasicInfoValues.DonationSubCategoryid) === SetupMasterIds.Disaster_Livelihood ?
                              //       (
                              //         // <h2 className="mt-3">I’m Helping People Help Themselves{" "}</h2>
                              //         <h2 className="mt-3">{BasicInfoValues.Tagline} </h2>
                              //       ) :
                              //       (
                              //         // <h2 className="mt-3">I’m Gifting Warmth and1 Dignity{" "}</h2>
                              //         <h2 className="mt-3">{BasicInfoValues.Tagline} </h2>
                              //       )
                            }
                          </h2>

                          <h4 className="sacrificial_skins">
                            You are saving lives. Thank you for standing with
                            your fellow humans.
                          </h4>
                          <hr />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <FormGroupSelect
                              label="Donation Type*"
                              list={generalDonationddl}
                              fieldId="SetupDetailId"
                              fieldName="SetupDetailName"
                              required={true}
                              onChange={handleInputChange}
                              name="donationType"
                              value={BasicInfoValues.donationType}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={12}>
                          <FormGroup>
                            <Label for="">Currency Type</Label>

                            <Input
                              id=""
                              value={BasicInfoValues.CurrencyFromSymbol}
                              name="CurrencyFromSymbol"
                              disabled
                            />
                          </FormGroup>
                          {/* <div className="form-group quick-donation">
                            <div style={{ width: "260px", zIndex: 10 }}>
                              <Select
                                height="35"
                                minHeight="35"
                                placeholder="Select Option"
                                getOptionValue={(option) =>
                                  option.SetupDetailId
                                } // changes here!!!
                                value={globalCurrency}
                                isDisabled={true}
                                options={currencyddl}
                                onChange={handleInputChange}
                                getOptionLabel={(e) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      zIndex: "10",
                                      lineHeight: "5px",
                                    }}
                                  >
                                    <span class={e.Flex3}></span>
                                    <span style={{ marginLeft: 5 }}>
                                      {e.SetupDetailName}
                                    </span>
                                  </div>
                                )}
                              />
                            </div>
                          </div> */}
                        </Col>
                        {/* <Col md={12}>
                          <FormGroup>
                            <Label for="">Currency Type</Label>
                            <Input
                              name="currencyType"
                              type="select"
                              defaultValue={BasicInfoValues.currencyType}
                              value={BasicInfoValues.currencyType}
                              onChange={handleInputChange}
                              required={true}
                            >
                             
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

                        <Col md={3}>
                          <FormGroup>
                            <Label for="">Quantity</Label>
                            <Input
                              id=""
                              min="1"
                              name="Quantity"
                              type="number"
                              isnumber="true"
                              maxLength="3"
                              value={BasicInfoValues.Quantity}
                              onChange={(e) => {
                                // console.log(
                                //   e.target.value,
                                //   typeof e.target.value,
                                //   BasicInfoValues.Quantity
                                // );
                                setBasicInfoValues({
                                  ...BasicInfoValues,
                                  Quantity: e.target.value.replace(/\D/g, ""),
                                  // Amount:
                                  //   parseInt(
                                  //     e.target.value.replace(/\D/g, "")
                                  //   ) * BasicInfoValues.Amount,
                                  // AmountInPKR:
                                  //   parseInt(
                                  //     e.target.value.replace(/\D/g, "")
                                  //   ) * BasicInfoValues.AmountInPKR,
                                })

                                setCurrency({
                                  ...currency,
                                  amount:
                                    (+e.target.value * parseFloat(amount)) /
                                    BasicInfoValues.ConversionRate,
                                  amountInPKR:
                                    +e.target.value * parseFloat(amount),
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={9}>
                          <FormGroup>
                            <Label for="">Amount</Label>

                            <Input
                              id=""
                              // value={numberWithCommas_UnitAmount(currency)}
                              // value={parseFloat(BasicInfoValues.Amount).toFixed(
                              //   2
                              // )}
                              value={parseFloat(currency.amount).toFixed(2)}
                              // value={(BasicInfoValues.Amount / ExchangeRate).toFixed(2) == "Infinity"? "0.00": (BasicInfoValues.Amount / ExchangeRate).toFixed(2)}
                              //setUnitAmount={(BasicInfoValues.Amount / ExchangeRate).toFixed(2) == "Infinity"? "0.00": (BasicInfoValues.Amount / ExchangeRate).toFixed(2)}
                              name="Amount"
                              // type="number"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        {/* </>
                         ) : (
                           ""
                         )} */}

                        <Col md={9}>
                          <FormGroup>
                            <Label for="">Amount (PKR)</Label>
                            <Input
                              id=""
                              value={currency.amountInPKR}
                              //value={BasicInfoValues.Amount}
                              name="Amount"
                              onChange={handleInputChange}
                              required={true}
                              type="text"
                              isnumber="true"
                              maxLength="8"
                              disabled={true}
                              // type="number"
                            />
                          </FormGroup>
                        </Col>

                        <Col md={12}>
                          <FormGroup>
                            <Label for="">Remarks</Label>
                            <Input
                              type="text"
                              name="Remarks"
                              onChange={handleInputChange}
                              value={BasicInfoValues.Remarks}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={12}>
                          <Button
                            style={{ width: "100%" }}
                            className="d-block"
                            onClick={DisasterReliefDonate}
                            color="primary"
                            type="button"
                          >
                            Donate
                          </Button>
                        </Col>
                      </Row>
                    </form>
                    <h5 className="text-primary">
                      *100% of your payments net of transaction charges will go
                      towards helping flood-affected families across Pakistan
                    </h5>
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
  )
}

export default DisasterReliefDonate
