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
  Spinner,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Link, useParams } from "react-router-dom"
import {
  AllowAlphabatic,
  ConvertNumricToComaSeparate,
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
  Get_All_Ramazan_Campaign,
} from "utils/CommonMethods.js"
import { SetupMasterIds } from "utils/Constants.js"
import Swal from "sweetalert2"
import ramazanbanner from "../../assets/img/ramzanTopBanner.jpg"

import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { x64 } from "crypto-js"
import Select from "react-select"
import { baseImageUrl } from "utils/Api.js"

const RamazanCampaignDonate = (props) => {
  //const [getProps, setProps] = useState(JSON.parse(localStorage.getItem("props")));

  const { id } = useParams()
  const [card, setCard] = useState({})
  const [loading, setLoading] = useState(true)
  const [BasicInfoValues, setBasicInfoValues] = useState({})
  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [ExchangeRate, setExchangeRate] = useState(1)
  const [currency, setCurrency] = useState({})
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    console.log("Currency Amount", currency)
  }, [currency])

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
          amount:
            id === "1560"
              ? parseFloat(amount * 10) / BasicInfoValues.ConversionRate
              : parseFloat(amount) / BasicInfoValues.ConversionRate,
        })

        setBasicInfoValues({
          ...BasicInfoValues,
          CurrencyFromSymbol: _parseData.base,
        })
      } else {
        // BasicInfoValues.ConversionRate = 1
        // BasicInfoValues.CurrencyFromSymbol = "PKR"

        setBasicInfoValues({
          ...BasicInfoValues,
          CurrencyFromSymbol: "PKR",
          ConversionRate: 1,
        })
      }
    }
    if (!loading) {
      load()
    }
  }, [BasicInfoValues, loading])

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
          CurrentCurrencySymbol : BasicInfoValues?.CurrencyFromSymbol,
          CurrencyToSymbol: "PKR",
          currentCurrencyAmount: parseFloat(currency.amount.toFixed(2)),
          currentCurrencyFromSymbol: BasicInfoValues.CurrencyFromSymbol,

          DonationForId: 725,
          DonationSubCategoryid: BasicInfoValues.DonationSubCategoryid,
          ExchangeRate: BasicInfoValues.ConversionRate,
          IsAdobt: false,
          IsAdobtMonth: false,
          NoofMonth: 1,
          TotalCount: 1,
          Quantity: BasicInfoValues.Quantity,
          TagLineId: BasicInfoValues.TagLineId,
          CurrencyFromSymbol: "PKR",
          CurrencytoSymbol: "PKR",
          donationType: BasicInfoValues.donationType,
        },
      })
    }
  }

  const GetRamazanCampaignDetails = async () => {
    setLoading(true)
    try {
      var data = await Get_All_Ramazan_Campaign(0, 0)
      if (data != null) {
        const userCard = data.Table.find((x) => x.donationsubcategoryid == id)
        var params = userCard
        var DonationSubCategoryid = userCard.donationsubcategoryid
        var donationName = params.SetupDetailName
        var initialAmount =
          userCard.amount == null ? 0 : userCard.amount.replace(/,/g, "")

        setAmount(initialAmount)
        var OperationID = 3
        var caseId = 0
        var Tagline = userCard.tagline
        var TagLineId = userCard?.taglineid
        console.log("TaglineIDTaglineID", TagLineId)
        var Quantity = id === "1560" ? 10 : 1

        const initialValues = {
          donationName: donationName,
          donationType: 0, //1052,
          donationTypeName: "",
          currencyType: 310,
          currencyName: "",
          caseId: caseId,
          OperationID: OperationID,
          Quantity: Quantity,
          BasicAmount: initialAmount,
          Amount: initialAmount,
          TagLineId: TagLineId,
          Tagline: Tagline,
          SubHeading: userCard?.SubHeading,
          Description: userCard?.Description,
          AppealImages: userCard?.AppealImages,
          DonationSubCategoryid: DonationSubCategoryid,
          Remarks: "",
          CurrencyFromSymbol: "",
          CurrencyToSymbol: "PKR",
          ConversionRate: 1,
          NoOfMonths: 1,
          AmountInPKR: initialAmount,
          TotalAmount: 0,
          IsAdobtMonth: false,
        }

        setBasicInfoValues({
          ...BasicInfoValues,
          ...initialValues,
        })

        setCurrency({
          amountInPKR: id === "1560" ? parseFloat(initialAmount * 10) : initialAmount,
          amount: initialAmount,
        })

        setLoading(false)
        return data
      } else {
        setLoading(false)
        return []
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }
  useEffect(() => {
    GetRamazanCampaignDetails()
  }, [])

  return (
    <div className="maincontent">
      <HomeHeader isShow={true} />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "60px",
          }}
        >
          <Spinner
            style={{
              width: "10rem",
              height: "10rem",
            }}
            color="danger"
          />
        </div>
      ) : (
        <div className="content">
          <section
            id="inner-banner"
            className="section"
            style={{ backgroundImage: `url(${ramazanbanner})` }}
          >
            <div className="container">
              <h1 className="mb-0 ml-4">{BasicInfoValues.donationName}</h1>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <Row>
                <Col md={7}>
                  <div className="desc mb-4">
                    <div>
                      <h4 className="ramzan-appeal-title">
                        {BasicInfoValues.Tagline}
                      </h4>
                    </div>
                    <br />
                    <div>
                      <div
                        style={{
                          textAlign: "justify",
                          fontSize: "16px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: BasicInfoValues.Description,
                        }}
                      />
                    </div>

                    {/* <img src={caseImgUrl} alt="" /> */}
                    <img
                      src={baseImageUrl + BasicInfoValues.AppealImages}
                      alt=""
                    />
                  </div>
                </Col>
                <Col md={5}>
                  <Card className="cardform">
                    <CardBody>
                      <form>
                        <Row>
                          <Col md={12} className="text-center mb-3">
                            <h4 className="sacrificial_skins">
                              {BasicInfoValues.SubHeading}
                            </h4>
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

                          <Col md={8}>
                            <FormGroup>
                              <Label for="">Total Amount</Label>

                              <Input
                                id=""
                                value={ConvertNumricToComaSeparate(
                                  parseFloat(currency?.amount).toFixed(2)
                                )}
                                name="Amount"
                                disabled
                              />
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label for="">Currency</Label>

                              <Input
                                id=""
                                value={BasicInfoValues?.CurrencyFromSymbol}
                                name="CurrencyFromSymbol"
                                disabled
                              />
                            </FormGroup>
                          </Col>

                          <Col md={4}>
                            <FormGroup>
                              <Label for="">Enter Quantity</Label>
                              <Input
                                id=""
                                min={id === "1560" ? "10" : "1"}
                                name="Quantity"
                                type="number"
                                isnumber="true"
                                maxLength="3"
                                value={BasicInfoValues?.Quantity}
                                step={id === "1560" ? "10" : "1"}
                                onChange={(e) => {
                                  setBasicInfoValues({
                                    ...BasicInfoValues,
                                    Quantity: e.target.value.replace(/\D/g, ""),
                                  })

                                  setCurrency({
                                    ...currency,
                                    amount:
                                      id === "1560"
                                        ? (+e.target.value * amount) /
                                          BasicInfoValues.ConversionRate
                                        : (+e.target.value *
                                            parseFloat(amount)) /
                                          BasicInfoValues.ConversionRate,
                                    amountInPKR:
                                      id === "1560"
                                        ? +e.target.value * amount
                                        : +e.target.value * parseFloat(amount),
                                  })
                                }}
                              />
                            </FormGroup>
                          </Col>

                          <Col md={8}>
                            <FormGroup>
                              <Label for="">Total Amount (PKR)</Label>
                              <Input
                                id=""
                                value={ConvertNumricToComaSeparate(
                                  parseFloat(currency?.amountInPKR).toFixed(2)
                                )}
                                name="Amount"
                                onChange={handleInputChange}
                                required={true}
                                type="text"
                                isnumber="true"
                                maxLength="8"
                                disabled={true}
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
                      <p className="text-primary pay-transaction">
                        *100% of your donations net of transaction charges go to
                        charity.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </section>
        </div>
      )}
      <HomeFooter />
    </div>
  )
}

export default RamazanCampaignDonate
