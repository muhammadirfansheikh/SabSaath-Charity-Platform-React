import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Label,
  FormGroup,
  Col,
  Row,
  Input,
  Spinner,
  Tooltip,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import {
  AllowAlphabatic,
  ConvertNumricToComaSeparate,
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
  Get_All_Relief,
} from "utils/CommonMethods.js"
import { QURBANI_DONATE_PATH, SetupMasterIds } from "utils/Constants.js"
import Swal from "sweetalert2"
import qurbanibanner from "../../assets/img/home/Eid-ul_azha_banner.jpg"
import { useParams } from "react-router-dom"
import { baseImageUrl } from "utils/Api.js"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx"
import CashDonationModal from "components/QurbaniCampaign/CashDonationModal.jsx"
import moment from "moment"
import BouncingDotsLoader from "components/GeneralComponent/BouncingDotsLoader.jsx"

const QurbaniDonate = (props) => {
  const { id } = useParams()
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [currencyTooltip, setCurrencyTooltip] = useState(false)
  const [ngoTooltipOpen, setNgoTooltipOpen] = useState(false)

  const initialValues = {
    donationName: "",
    donationType: SetupMasterIds.Qurbani,
    donationTypeName: "",
    currencyType: 310,
    currencyName: "",
    caseId: 0,
    OperationID: 3,
    Quantity: 1,
    BasicAmount: 0,
    Amount: 0,
    TagLineId: 35,
    Tagline: "",
    NGOId: 1,
    DonationSubCategoryid: id,
    Remarks: "",
    IsRecievedUpdates: false,
    PayByCash: false,
  }
  const [loading, setLoading] = useState(true)
  const [currencyLoading, setCurrencyLoading] = useState(true)
  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)
  const [currency, setCurrency] = useState({
    amount: 0,
    amountInPKR: 0,
  })
  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [ExchangeRate, setExchangeRate] = useState(1)
  const [qurbaniDetails, setQurbaniDetails] = useState(null)
  const [ngos, setNgos] = useState([])

  const [isShowCashDonationModal, setIsShowCashDonationModal] = useState(false)

  const toggleCashDonationModal = () => {
    setIsShowCashDonationModal(!isShowCashDonationModal)
    setBasicInfoValues({
      ...BasicInfoValues,
      PayByCash: !BasicInfoValues.PayByCash,
    })
  }

  useEffect(() => {
    if (BasicInfoValues?.PayByCash) {
      if (!BasicInfoValues.NGOId) {
        setBasicInfoValues({
          ...BasicInfoValues,
          PayByCash: false,
        })
        return Swal.fire({
          title: "Error",
          text: "Please Select NGO",
          icon: "error",
        })
      }

      if (
        parseInt(BasicInfoValues?.DonationSubCategoryid) ===
          SetupMasterIds.Cash_Donation &&
        currency.amount < 1
      ) {
        setBasicInfoValues({
          ...BasicInfoValues,
          PayByCash: false,
        })
        return Swal.fire({
          icon: "error",
          title: "Amount is required",
        })
      }
      if (
        parseInt(BasicInfoValues?.DonationSubCategoryid) ===
        SetupMasterIds.Multiple_Animals
      ) {
        if (
          !hissaQuantity?.amtCow &&
          !hissaQuantity?.amtGoat &&
          !hissaQuantity?.amtHissa
        ) {
          setBasicInfoValues({
            ...BasicInfoValues,
            PayByCash: false,
          })
          return Swal.fire({
            icon: "error",
            title: "Quantity is required",
          })
        }
      }
      console.log("QUANtity", BasicInfoValues.Quantity)
      if (!BasicInfoValues.Quantity || BasicInfoValues.Quantity <= 0) {
        setBasicInfoValues({
          ...BasicInfoValues,
          PayByCash: false,
        })
        return Swal.fire({
          icon: "error",
          title: "Quantity is required",
        })
      }

      setIsShowCashDonationModal(true)
    }
  }, [BasicInfoValues?.PayByCash])

  var ConvertAmount
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value

    if (
      e?.target?.getAttribute &&
      e.target.getAttribute("isalphabetic") === "true"
    ) {
      values = AllowAlphabatic(e.target.value)
    } else if (
      e?.target?.getAttribute &&
      e.target.getAttribute("isnumber") == "true"
    )
      values = e.target.value.replace(/\D/g, "")

    if (name == "Amount") {
      setCurrency({
        ...currency,
        amount: parseInt(values) ? parseInt(values) : 0,
        amountInPKR: parseInt(values) ? parseInt(values) * ExchangeRate : 0,
      })
      return
    }

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
  const [CatWiseAmount, setCatWiseAmount] = useState([])
  const [hissaQuantity, setHissaQuantity] = useState({
    amtGoat: 0,
    amtCow: 0,
    amtHissa: 0,
  })

  useEffect(() => {
    if (
      !loading &&
      parseInt(BasicInfoValues?.donationsubcategoryid) ===
        SetupMasterIds.Multiple_Animals &&
      BasicInfoValues?.Amount
    ) {
      let Amt = BasicInfoValues?.Amount
      setCatWiseAmount(Amt.split(":"))
    }
  }, [BasicInfoValues, loading, id])

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
        return []
      }
    } catch (error) {
      return []
    }
  }

  useEffect(() => {
    GetCurrency()
    GetGeneralDonation()

    const load = async () => {
      setCurrencyLoading(true)
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )

      if (_CurrencyData.Response && _CurrencyData.Data != "") {
        let _parseData = JSON.parse(_CurrencyData.Data)
        setCurrency({
          ...currency,
          amount: BasicInfoValues.BasicAmount
            ? parseFloat(BasicInfoValues.BasicAmount) / _parseData.result.PKR
            : 0,
          amountInPKR: BasicInfoValues.BasicAmount
            ? BasicInfoValues.BasicAmount
            : 0,
        })
        setExchangeRate(_parseData.result.PKR)
        setBasicInfoValues({
          ...BasicInfoValues,
          CurrencyFromSymbol: _parseData.base,
          ConversionRate: _parseData.result.PKR,
        })
      } else {
        setBasicInfoValues({
          ...BasicInfoValues,
          CurrencyFromSymbol: "PKR",
          ConversionRate: 1,
        })
      }
      setCurrencyLoading(false)
    }
    if (!loading) {
      load()
    }
  }, [loading])
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  const QurbaniDonate = () => {
    ConvertAmount = currency.amountInPKR
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
    } else if (!BasicInfoValues.NGOId) {
      return Swal.fire({
        title: "Error",
        text: "Please Select NGO",
        icon: "error",
      })
    } else if (
      parseInt(BasicInfoValues.DonationSubCategoryid) ===
        SetupMasterIds.Multiple_Animals &&
      !hissaQuantity?.amtCow &&
      !hissaQuantity?.amtGoat &&
      !hissaQuantity?.amtHissa
    ) {
      return Swal.fire({
        title: "Error",
        text: "Quantity is required",
        icon: "error",
      })
    } else if (currency.amount <= 0 || !currency.amount) {
      Swal.fire({
        title: "Error",
        text: "Amount must be greater than 0",
        icon: "error",
      })
    } else {
      props.history.push({
        pathname: "/checkout",
        state: {
          ...BasicInfoValues,
          fromPath: QURBANI_DONATE_PATH,
          NGOInfo: ngos.find(
            (ngo) => ngo.NGOFeatureID == BasicInfoValues.NGOId
          ),
          NoofMonth: 1,
          TotalCount: 1,
          Amount:
            parseInt(BasicInfoValues.DonationSubCategoryid) ===
            SetupMasterIds.Cash_Donation
              ? currency.amount
              : parseInt(BasicInfoValues.DonationSubCategoryid) ===
                SetupMasterIds.Multiple_Animals
              ? (hissaQuantity?.amtGoat * CatWiseAmount[0]) / ExchangeRate +
                (hissaQuantity?.amtCow * CatWiseAmount[1]) / ExchangeRate +
                (hissaQuantity?.amtHissa * CatWiseAmount[2]) / ExchangeRate
              : parseFloat(currency.amount.toFixed(2)),
          AmountInPKR:
            parseInt(BasicInfoValues.DonationSubCategoryid) ===
            SetupMasterIds.Cash_Donation
              ? currency.amountInPKR
              : parseInt(BasicInfoValues.DonationSubCategoryid) ===
                SetupMasterIds.Multiple_Animals
              ? hissaQuantity?.amtGoat * CatWiseAmount[0] +
                hissaQuantity?.amtCow * CatWiseAmount[1] +
                hissaQuantity?.amtHissa * CatWiseAmount[2]
              : currency.amountInPKR,
          ExchangeRate: ExchangeRate.toFixed(2),
          ConversionRate: ExchangeRate.toFixed(2),
          ConvertAmount: currency.amountInPKR,
          CurrentCurrencySymbol: BasicInfoValues?.CurrencyFromSymbol,
          CurrencyToSymbol: "PKR",
          currentCurrencyAmount: parseFloat(currency.amount.toFixed(2)),
          currentCurrencyFromSymbol: BasicInfoValues.CurrencyFromSymbol,
          Quantity:
            parseInt(BasicInfoValues.DonationSubCategoryid) ===
            SetupMasterIds.Multiple_Animals
              ? parseInt(hissaQuantity.amtGoat) +
                parseInt(hissaQuantity.amtCow) +
                parseInt(hissaQuantity.amtHissa)
              : BasicInfoValues.Quantity,

          DonationSubCategoryid: BasicInfoValues.DonationSubCategoryid,
          Remarks:
            parseInt(BasicInfoValues.DonationSubCategoryid) ===
            SetupMasterIds.Multiple_Animals
              ? CatWiseAmount[3] +
                "-" +
                CatWiseAmount[4] +
                "-" +
                CatWiseAmount[5] +
                "-" +
                CatWiseAmount[6]
              : "",

          currencyName:
            BasicInfoValues.currencyName === ""
              ? "Pakistani Rupee - PKR"
              : BasicInfoValues.currencyName,
        },
      })
    }
  }

  const toggleNgoTooltip = () => setNgoTooltipOpen(!ngoTooltipOpen)
  const toggleCurrencyTooltip = () => setCurrencyTooltip(!currencyTooltip)
  const GetAllFoodRelief = async () => {
    setLoading(true)
    try {
      var data = await Get_All_Relief(0, 0)
      if (data != null) {
        const qurbaniItem = data?.Table?.find(
          (item) => item.donationsubcategoryid == id
        )
        setBasicInfoValues({
          ...BasicInfoValues,
          ...qurbaniItem,
          Amount: qurbaniItem.amount.replace(/,/g, ""),
          BasicAmount: qurbaniItem.amount.replace(/,/g, ""),
          donationName: qurbaniItem.SetupDetailName,
          DonationSubCategoryid: qurbaniItem.donationsubcategoryid,
          Tagline: qurbaniItem.tagline,
        })
        setLoading(false)
        return data
      } else {
        setLoading(false)
        // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
        return []
      }
    } catch (error) {
      setLoading(false)
      // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
      return []
    }
  }

  useEffect(() => {
    GetAllFoodRelief()
  }, [id])

  const pickNGOsData = (data) => {
    if (data) {
      setNgos(data.Table2)
    }
  }

  const isCashDonation =
    parseInt(BasicInfoValues.DonationSubCategoryid) ===
    SetupMasterIds.Cash_Donation

  return (
    <div className="maincontent">
      <HomeHeader isShow pickNGOsData={pickNGOsData} />

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
          {/* <section id="inner-banner" className="section"> */}
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
                <Col md={7}>
                  <div className="desc mb-4">
                    <div>
                      <h4 className="ramzan-appeal-title">
                        {BasicInfoValues.Tagline.replace("<br/>", "")}
                      </h4>
                    </div>
                    <br />

                    {/* <img src={caseImgUrl} alt="" /> */}
                    <div className="text-center">
                      <img src={baseImageUrl + BasicInfoValues.Images} alt="" />
                    </div>
                    <div></div>

                    <div>
                      <div
                        style={{
                          textAlign: "justify",
                          fontSize: "16px",
                        }}
                        className="visible-desktop"
                        dangerouslySetInnerHTML={{
                          __html: BasicInfoValues?.description || "",
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={5}>
                  {currencyLoading ? (
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
                                <Label for="">Donation Type*</Label>
                                <Input
                                  name="donationType"
                                  type="select"
                                  value={BasicInfoValues.donationType}
                                  onChange={handleInputChange}
                                  required={true}
                                >
                                  <option
                                    id={SetupMasterIds.Qurbani}
                                    value={SetupMasterIds.Qurbani}
                                  >
                                    Qurbani
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            {parseInt(BasicInfoValues.DonationSubCategoryid) ===
                            SetupMasterIds.Cash_Donation ? (
                              <>
                                <Col md={9}>
                                  <FormGroup>
                                    <Label for="">Amount</Label>
                                    <Input
                                      id=""
                                      value={currency?.amount}
                                      name="Amount"
                                      onChange={(e) => handleInputChange(e)}
                                      required={true}
                                      type="text"
                                      isnumber="true"
                                      maxLength="8"
                                      // type="number"
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            ) : (
                              <Col md={9}>
                                <FormGroup>
                                  <Label for="">Total Amount </Label>
                                  <Input
                                    id=""
                                    value={
                                      parseInt(
                                        BasicInfoValues.DonationSubCategoryid
                                      ) === SetupMasterIds.Multiple_Animals
                                        ? ConvertNumricToComaSeparate(
                                            (
                                              (hissaQuantity?.amtGoat *
                                                CatWiseAmount[0]) /
                                                ExchangeRate +
                                              (hissaQuantity?.amtCow *
                                                CatWiseAmount[1]) /
                                                ExchangeRate +
                                              (hissaQuantity?.amtHissa *
                                                CatWiseAmount[2]) /
                                                ExchangeRate
                                            ).toFixed(2)
                                          )
                                        : ConvertNumricToComaSeparate(
                                            parseFloat(
                                              currency?.amount
                                            ).toFixed(2)
                                          )
                                    }
                                    name="Amount"
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            )}
                            <Col md={3}>
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

                            {parseInt(BasicInfoValues.DonationSubCategoryid) !==
                              SetupMasterIds.Multiple_Animals &&
                            parseInt(BasicInfoValues.DonationSubCategoryid) !==
                              SetupMasterIds.Cash_Donation ? (
                              <>
                                <Col md={5}>
                                  <FormGroup>
                                    <Label for="">Quantity</Label>
                                    <div className="d-flex align-items-center">
                                      <button
                                        className="counter-button-left"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(BasicInfoValues.Quantity) -
                                            1

                                          if (qty < 1) {
                                            return
                                          }

                                          setBasicInfoValues({
                                            ...BasicInfoValues,
                                            Quantity: qty,
                                            Amount:
                                              qty * BasicInfoValues.BasicAmount,
                                          })

                                          setCurrency({
                                            ...currency,
                                            amount:
                                              (qty *
                                                parseFloat(
                                                  BasicInfoValues.BasicAmount
                                                )) /
                                              ExchangeRate,
                                            amountInPKR:
                                              qty *
                                              parseFloat(
                                                BasicInfoValues.BasicAmount
                                              ),
                                          })
                                        }}
                                      >
                                        <i className="fa fa-minus" />
                                      </button>
                                      <Input
                                        id=""
                                        min="1"
                                        name="Quantity"
                                        type="text"
                                        className="  case-counter-input"
                                        style={{
                                          height: "42px !important",
                                        }}
                                        isnumber="true"
                                        maxLength="3"
                                        value={BasicInfoValues.Quantity}
                                        onChange={(e) => {
                                          setBasicInfoValues({
                                            ...BasicInfoValues,
                                            Quantity: e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ),
                                            Amount:
                                              e.target.value.replace(
                                                /\D/g,
                                                ""
                                              ) * BasicInfoValues.BasicAmount,
                                          })

                                          setCurrency({
                                            ...currency,
                                            amount:
                                              (+e.target.value *
                                                parseFloat(
                                                  BasicInfoValues.BasicAmount
                                                )) /
                                              BasicInfoValues.ConversionRate,
                                            amountInPKR:
                                              +e.target.value *
                                              parseFloat(
                                                BasicInfoValues.BasicAmount
                                              ),
                                          })
                                        }}
                                      />
                                      <button
                                        className="counter-button-right"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(BasicInfoValues.Quantity) +
                                            1
                                          setBasicInfoValues({
                                            ...BasicInfoValues,
                                            Quantity: qty,
                                            Amount:
                                              qty * BasicInfoValues.BasicAmount,
                                          })

                                          setCurrency({
                                            ...currency,
                                            amount:
                                              (qty *
                                                parseFloat(
                                                  BasicInfoValues.BasicAmount
                                                )) /
                                              ExchangeRate,
                                            amountInPKR:
                                              qty *
                                              parseFloat(
                                                BasicInfoValues.BasicAmount
                                              ),
                                          })
                                        }}
                                      >
                                        <i className="fa fa-plus" />
                                      </button>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col md={7}>
                                  <FormGroup>
                                    <Label for="">Total Amount (PKR)</Label>
                                    <Input
                                      id=""
                                      value={ConvertNumricToComaSeparate(
                                        parseFloat(
                                          currency?.amountInPKR
                                        ).toFixed(2)
                                      )}
                                      name="Amount"
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            ) : (
                              ""
                            )}

                            {parseInt(BasicInfoValues.DonationSubCategoryid) ===
                            SetupMasterIds.Multiple_Animals ? (
                              <>
                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="">Goat</Label>
                                    <div className="d-flex">
                                      <button
                                        className="counter-button-left"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtGoat) - 1

                                          if (qty < 1) {
                                            return
                                          }

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtGoat: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-minus" />
                                      </button>
                                      <Input
                                        id=""
                                        min="0"
                                        name="QuantityGoat"
                                        className="  case-counter-input"
                                        style={{
                                          height: "42px !important",
                                        }}
                                        type="text"
                                        isnumber="true"
                                        maxLength="3"
                                        value={hissaQuantity.amtGoat}
                                        onChange={(e) =>
                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtGoat: e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ),
                                          })
                                        }
                                      />
                                      <button
                                        className="counter-button-right"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtGoat) + 1

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtGoat: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-plus" />
                                      </button>
                                    </div>
                                  </FormGroup>
                                </Col>

                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="">Cow/Bull</Label>
                                    <div className="d-flex">
                                      <button
                                        className="counter-button-left"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtCow) - 1

                                          if (qty < 1) {
                                            return
                                          }

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtCow: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-minus" />
                                      </button>
                                      <Input
                                        id=""
                                        min="0"
                                        name="Quantitycow"
                                        className="  case-counter-input"
                                        style={{
                                          height: "42px !important",
                                        }}
                                        type="text"
                                        isnumber="true"
                                        maxLength="3"
                                        value={hissaQuantity.amtCow}
                                        onChange={(e) =>
                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtCow: e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ),
                                          })
                                        }
                                      />
                                      <button
                                        className="counter-button-right"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtCow) + 1

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtCow: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-plus" />
                                      </button>
                                    </div>
                                  </FormGroup>
                                </Col>

                                <Col md={4}>
                                  <FormGroup>
                                    <Label for="">Hissa</Label>
                                    <div className="d-flex">
                                      <button
                                        className="counter-button-left"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtHissa) - 1

                                          if (qty < 1) {
                                            return
                                          }

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtHissa: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-minus" />
                                      </button>
                                      <Input
                                        id=""
                                        min="0"
                                        name="QuantityHissa"
                                        className="  case-counter-input"
                                        style={{
                                          height: "42px !important",
                                        }}
                                        type="text"
                                        isnumber="true"
                                        maxLength="3"
                                        value={hissaQuantity.amtHissa}
                                        onChange={(e) =>
                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtHissa: e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ),
                                          })
                                        }
                                      />
                                      <button
                                        className="counter-button-right"
                                        type="button"
                                        onClick={(e) => {
                                          const qty =
                                            parseInt(hissaQuantity.amtHissa) + 1

                                          setHissaQuantity({
                                            ...hissaQuantity,
                                            amtHissa: qty,
                                          })
                                        }}
                                      >
                                        <i className="fa fa-plus" />
                                      </button>
                                    </div>
                                  </FormGroup>
                                </Col>

                                <Col md={3} style={{ display: "none" }}>
                                  <FormGroup>
                                    <Label for="">Quantity</Label>
                                    <Input
                                      id=""
                                      min="0"
                                      name="Quantity"
                                      value={
                                        hissaQuantity.amtGoat +
                                        "-" +
                                        hissaQuantity.amtCow +
                                        "-" +
                                        hissaQuantity.amtHissa
                                      }
                                    />
                                  </FormGroup>
                                </Col>

                                <Col md={9}>
                                  <FormGroup>
                                    <Label for="">Total Amount (PKR)</Label>
                                    <Input
                                      id=""
                                      value={ConvertNumricToComaSeparate(
                                        (
                                          hissaQuantity?.amtGoat *
                                            CatWiseAmount[0] +
                                          hissaQuantity?.amtCow *
                                            CatWiseAmount[1] +
                                          hissaQuantity?.amtHissa *
                                            CatWiseAmount[2]
                                        ).toFixed(2)
                                      )}
                                      name="Amount"
                                      required={true}
                                      type="text"
                                      disabled
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            ) : (
                              ""
                            )}

                            <Col md={12}>
                              <FormGroup>
                                <FormGroupSelect
                                  label="Donate To"
                                  className="appearance-auto"
                                  list={ngos}
                                  fieldId="NGOFeatureID"
                                  fieldName="Heading"
                                  required={true}
                                  onChange={handleInputChange}
                                  name="NGOId"
                                  value={BasicInfoValues.NGOId}
                                  tooltip={
                                    <i
                                      className="fa fa-info-circle ml-1"
                                      id="ngotooltip"
                                    ></i>
                                  }
                                />
                              </FormGroup>
                              <Tooltip
                                placement="top"
                                isOpen={ngoTooltipOpen}
                                target="ngotooltip"
                                toggle={toggleNgoTooltip}
                                autohide={false}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "#000",
                                  border: "1px solid #000",
                                  padding: "10px",
                                  fontSize: "14px",
                                  borderRadius: "4px",
                                  boxShadow: "0px 0px 5px #000",
                                }}
                              >
                                <p>
                                  All Qurbani operations are handled by Sab
                                  Saath’s sister concern: Naimat Naturals. All
                                  sacrificial meat and skins will be donated to
                                  the NGO you select.
                                </p>
                              </Tooltip>
                            </Col>
                            <Col
                              md={12}
                              className="d-flex justify-content-between"
                            >
                              {/* Two checkboxes with top right and left */}

                              <FormGroupCheckbox
                                label="Receive Updates"
                                onChange={handleInputChange}
                                name="IsRecievedUpdates"
                                value={BasicInfoValues.IsRecievedUpdates}
                                disabled={BasicInfoValues.PayByCash}
                                tooltip={
                                  <i
                                    className="fa fa-info-circle ml-1"
                                    id="IsRecievedUpdates"
                                  ></i>
                                }
                              />

                              <Tooltip
                                placement="top"
                                isOpen={tooltipOpen}
                                target="IsRecievedUpdates"
                                toggle={toggleTooltip}
                                autohide={false}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "#000",
                                  border: "1px solid #000",
                                  padding: "10px",
                                  fontSize: "14px",
                                  borderRadius: "4px",
                                  boxShadow: "0px 0px 5px #000",
                                }}
                              >
                                <p>
                                  Receive an update to know when your Qurbani
                                  has been performed.
                                </p>
                              </Tooltip>
                              <FormGroupCheckbox
                                label="Pay By Cash/Bank Transfer"
                                onChange={handleInputChange}
                                name="PayByCash"
                                value={BasicInfoValues.PayByCash}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={isCashDonation ? 5 : 12} sm={12}>
                              <Button
                                className={
                                  isCashDonation ? "" : "d-block w-100"
                                }
                                onClick={QurbaniDonate}
                                color="primary"
                                type="button"
                              >
                                Donate
                              </Button>
                            </Col>
                            {isCashDonation ? (
                              <Col md={7} sm={12}>
                                <div>&nbsp;</div>
                                {currency?.amountInPKR ? (
                                  <h5 className="total-pkr-amount text-lg-right">
                                    <span className="text-primary">
                                      {" "}
                                      Total PKR Amount:{" "}
                                    </span>
                                    {ConvertNumricToComaSeparate(
                                      Math.floor(currency?.amountInPKR).toFixed(
                                        2
                                      )
                                    )}
                                    {BasicInfoValues.CurrencyFromSymbol !==
                                      "PKR" && (
                                      <span className="help-icon" id="CRdaily">
                                        <Tooltip
                                          placement="top"
                                          isOpen={currencyTooltip}
                                          target="CRdaily"
                                          toggle={toggleCurrencyTooltip}
                                          autohide={false}
                                          style={{
                                            backgroundColor: "#fff",
                                            color: "#000",
                                            border: "1px solid #000",
                                            padding: "10px",
                                            fontSize: "14px",
                                            borderRadius: "4px",
                                            boxShadow: "0px 0px 5px #000",
                                          }}
                                        >
                                          Conversion Rate:{" "}
                                          {BasicInfoValues.ConversionRate.toFixed(
                                            2
                                          )}{" "}
                                          from{" "}
                                          <a
                                            href="https://www.fastforex.io/"
                                            target={"_blank"}
                                            rel="noreferrer"
                                          >
                                            FastForex.io
                                          </a>{" "}
                                          on {moment().format("DD-MMM-YYYY")}
                                        </Tooltip>
                                        <i className="fa fa-question-circle color-black ml-1"></i>
                                      </span>
                                    )}
                                  </h5>
                                ) : null}
                              </Col>
                            ) : null}
                          </Row>
                        </form>
                        <p className=" pay-transaction-qurbani">
                          If you are not a <b>Visa</b> or <b>Mastercard</b>{" "}
                          holder, scroll down for Direct Bank Transfer details.
                          Having trouble donating?{" "}
                          <a
                            href="https://wa.me/3018444959"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Chat with us
                          </a>
                        </p>
                      </CardBody>
                    </Card>
                  )}
                </Col>
                <Col></Col>
              </Row>
              <div>
                <div
                  style={{
                    textAlign: "justify",
                    fontSize: "16px",
                  }}
                  className="visible-phone p-4"
                  dangerouslySetInnerHTML={{
                    __html: BasicInfoValues?.description || "",
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {BasicInfoValues?.PayByCash && (
        <CashDonationModal
          Ismodalshow={isShowCashDonationModal}
          toggle={toggleCashDonationModal}
          qurbaniDetails={BasicInfoValues}
          currency={currency}
          hissaQuantity={hissaQuantity}
          CatWiseAmount={CatWiseAmount}
          ExchangeRate={ExchangeRate}
          ngos={ngos}
        />
      )}

      <HomeFooter />
    </div>
  )
}

export default QurbaniDonate
