import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
  ButtonGroup,
} from "reactstrap"
import { useParams } from "react-router-dom"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import {
  GetSetupMaster,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods.js"
import { SetupMasterIds, DonationForTypes } from "utils/Constants.js"
import Swal from "sweetalert2"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import {
  AllowAlphabatic,
  AllowNumericWithDecimal,
  AllowOnlyNumeric,
} from "utils/CommonMethods.js"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import moment from "moment"
import SubscriptionDonate from "assets/img/home/subscription-donate.png"
import { useIsMount } from "hooks/useIsMount.js"

const fixedAmounts = {
  USD: [50, 100, 200],
  CAD: [50, 100, 200],
  AUD: [50, 100, 200],
  GBP: [50, 100, 200],
  EUR: [50, 100, 200],
  AED: [100, 500, 1000],
  SAR: [100, 500, 1000],
  PKR: [5000, 10000, 25000],
}

const SubscriptionQuickDonate = (props) => {
  // Get query string from url
  const urlParams = new URLSearchParams(window.location.search)
  const donationType = parseInt(urlParams.get("id"))
  let isSuggestedAmount =
    urlParams.get("isSuggestedAmount") === "true" ? true : false
  const donationName = urlParams.get("name")
  const receivedAmount = parseFloat(urlParams.get("amount"))
  let currency = urlParams.get("currency")
  const AmountInPKR = parseFloat(urlParams.get("amountinpkr"))
  const isMount = useIsMount()

  let currencyName = JSON.parse(
    sessionStorage.getItem("globalSelectedCurrency")
  )?.Flex1

  if (currency !== currencyName) {
    isSuggestedAmount = false
  }

  // if (currency !== "PKR") {
  //   currency = JSON.parse(
  //     sessionStorage.getItem("globalSelectedCurrency")
  //   ).Flex1
  // }

  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("oneTime")
  const [loading, setLoading] = useState(true)
  const [selectedcurrencyValues, setSelectedcurrencyValues] =
    useState(objCurrrency)

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  const initialValues = {
    donationType: donationType,
    donationName: donationName,
    Amount: currency === "PKR" ? AmountInPKR : receivedAmount,
    AmountInPKR: currency == currencyName ? AmountInPKR : 0,
    ConversionRate: selectedcurrencyValues.ConversionRate,
    ConvertAmount: Math.round(
      AmountInPKR / selectedcurrencyValues.ConversionRate
    ),
    CurrencyFromSymbol: selectedcurrencyValues.CurrencyFromSymbol,
    CurrencytoSymbol: "PKR",
    CurrentCurrencyAmount: Math.round(
      AmountInPKR / selectedcurrencyValues.ConversionRate
    ),
    CurrentCurrencySymbol: selectedcurrencyValues.CurrencyFromSymbol,
    DonationForid: 725,
    ExchangeRate: selectedcurrencyValues.ConversionRate,
    IsAdobt: false,
    IsAdobtMonth: false,
    NoofMonth: 1,
    NoOfMonths: "2",
    OperationID: 1,
    Quantity: 0,
    TotalCount: 1,
    currencyType: selectedcurrencyValues.currency,
    caseId: 0,
    TagLineId: 1071,
    DonationSubCategoryid: 729,
    donationTypeName: "",
    CurrencyToSymbol: "PKR",
    NoOfDays: "2",
    TotalAmount: currency === "PKR" ? AmountInPKR : receivedAmount,
    currencyName: "",
  }
  const [isFixed, setIsFixed] = useState(true)
  const [amounts, setAmounts] = useState(fixedAmounts.PKR)
  const [globalCurrency, setglobalCurrency] = useState(null)

  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [BasicInfoValues, setBasicInfoValues] = useState(null)
  const [currentCurrency, setCurrentCurrency] = useState({
    ConversionRate: 1,
    CurrencyFromSymbol: "PKR",
  })
  const [occurences, setOccurences] = useState({
    occurences: "",
    startingDate: "",
    endingDate: "",
  })

  const [rSelected, setRselected] = useState(null)

  // If User change currency on Donation Page
  useEffect(() => {
    if (isMount) return
    if (currency !== currencyName) {
      setBasicInfoValues({
        ...BasicInfoValues,
        ...initialValues,
        Amount: 0,
        AmountInPKR: 0,
        ConversionRate: selectedcurrencyValues.ConversionRate,
        ConvertAmount: 0,
        CurrencyFromSymbol: selectedcurrencyValues.CurrencyFromSymbol,
        CurrencytoSymbol: "PKR",
        CurrentCurrencyAmount: 0,
        CurrentCurrencySymbol: selectedcurrencyValues.CurrencyFromSymbol,
        DonationForid: 725,
        ExchangeRate: selectedcurrencyValues.ConversionRate,
        IsAdobt: false,
        IsAdobtMonth: false,
        NoofMonth: 1,
        NoOfMonths: "2",
        OperationID: 1,
        Quantity: 0,
        TotalCount: 1,
        currencyType: selectedcurrencyValues.currency,
        caseId: 0,
        TagLineId: 1071,
        DonationSubCategoryid: 729,
        donationTypeName: "",
        CurrencyToSymbol: "PKR",
        NoOfDays: "2",
        TotalAmount: 0,
        currencyName: "",
      })
    } else {
      setBasicInfoValues({
        ...BasicInfoValues,
        ...initialValues,
      })
    }
  }, [selectedcurrencyValues || currency || amounts || currencyName])

  useEffect(() => {
    setRselected({
      id: currency === "PKR" ? AmountInPKR : receivedAmount,
    })
  }, [])

  useEffect(() => {
    if (globalCurrency?.length) {
      if (globalCurrency[0]?.Flex1) {
        const item = Object.keys(fixedAmounts).find((key) => {
          return key === globalCurrency[0].Flex1
        })
        const isConvertable = item ? true : false
        if (isConvertable) {
          setIsFixed(true)
          setAmounts(fixedAmounts[item])
        } else {
          setIsFixed(false)
          setAmounts(fixedAmounts.PKR)
        }
      }
    }
  }, [globalCurrency])

  // 🔴 Calculate Occurences
  useEffect(() => {
    if (activeTab === "daily") {
      const startingDate = moment().startOf("day")
      const result = startingDate
        .clone()
        .add(BasicInfoValues?.NoOfDays - 1, "days")
      const numberOfDays = result.diff(startingDate, "days")

      setOccurences({
        occurences: numberOfDays + 1,
        startingDate: startingDate.format("DD-MM-YYYY"),
        endingDate: result.format("DD-MM-YYYY"),
      })
    } else if (activeTab === "monthly") {
      const startingMonth = moment()
      const result = startingMonth
        .clone()
        .add(BasicInfoValues?.NoOfMonths - 1, "months")
      const numberOfMonths = result.diff(startingMonth, "months")
      setOccurences({
        occurences: numberOfMonths + 1,
        startingDate: startingMonth.format("DD-MM-YYYY"),
        endingDate: result.format("DD-MM-YYYY"),
      })
    }
  }, [BasicInfoValues])

  // 🔴 Start handleTabChange
  const handleTabChange = (tab) => {
    if (activeTab === tab) return

    setActiveTab(tab)

    if (currency === currencyName) {
      setBasicInfoValues({
        ...initialValues,
        ConversionRate: currentCurrency.ConversionRate,
        TotalAmount:
          tab === "oneTime"
            ? currency === "PKR"
              ? AmountInPKR
              : receivedAmount
            : tab === "daily"
            ? currency === "PKR"
              ? AmountInPKR * BasicInfoValues?.NoOfDays
              : receivedAmount * BasicInfoValues?.NoOfDays
            : tab === "monthly"
            ? currency === "PKR"
              ? AmountInPKR * BasicInfoValues?.NoOfMonths
              : receivedAmount * BasicInfoValues?.NoOfMonths
            : 0,
        CurrencyFromSymbol: currentCurrency.CurrencyFromSymbol,
      })
    } else {
      setBasicInfoValues({
        ...initialValues,
        ConversionRate: currentCurrency.ConversionRate,
        TotalAmount: 0,
        Amount: 0,
        AmountInPKR: 0,
        CurrencyFromSymbol: currentCurrency.CurrencyFromSymbol,
      })
    }
  }
  // 🔵 End handleTabChange

  // 🔴 Start On Tab Change Set Active Button to Initial Amount
  useEffect(() => {
    if (rSelected?.id !== BasicInfoValues?.Amount) {
      setRselected({
        id: parseInt(BasicInfoValues?.Amount),
      })
    }
  }, [BasicInfoValues?.Amount])
  // 🔵 End On Tab Change Set Active Button to Initial Amount

  // 🔴 Start handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value
    if (e.target?.type === "checkbox") values = e.target?.checked

    if (
      !e.target?.isCustom &&
      e.target?.getAttribute("isalphabetic") === "true"
    ) {
      values = AllowAlphabatic(e.target?.value)
    } else if (
      !e.target?.isCustom &&
      e.target?.getAttribute("isDecimal") == "true"
    ) {
      values = AllowNumericWithDecimal(e.target?.value)
    } else if (
      !e.target?.isCustom &&
      e.target?.getAttribute("isNumeric") == "true"
    ) {
      values = AllowOnlyNumeric(e.target?.value)
    }

    if (name == "donationType") {
      setBasicInfoValues({
        ...BasicInfoValues,
        donationTypeName: e.target?.options[e.target?.selectedIndex].text,
        donationType: values,
      })
    } else if (name == "Amount") {
      if (values > 0) {
        let _noOfOccurences
        if (activeTab === "daily") {
          _noOfOccurences = BasicInfoValues?.NoOfDays
        }

        if (activeTab === "monthly") {
          _noOfOccurences = BasicInfoValues?.NoOfMonths
        }

        if (activeTab === "oneTime") {
          _noOfOccurences = "1"
        }
        let _amount = values ? values : 0
        let _calculatedAmount = _noOfOccurences * _amount
        let _calculatedAmountPKR =
          _calculatedAmount * selectedcurrencyValues?.ConversionRate

        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: _calculatedAmount,
          AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
          [name]: values,
        })
      } else {
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfMonths: "",
          Amount: "",
          IsAdobtMonth: false,
        })
        //   Swal.fire({
        //     title: "Error",
        //     text: "Donated amount must be greater than 1",
        //     icon: "error",
        //   })
      }
    } else if (name == "NoOfMonths") {
      if (values > 0) {
        let _noOfMonths = values ? values : 2

        let _amount = BasicInfoValues?.Amount ? BasicInfoValues?.Amount : 0

        let _calculatedAmount = _noOfMonths * _amount

        let _calculatedAmountPKR =
          _calculatedAmount * selectedcurrencyValues?.ConversionRate //(_calculatedAmount * selectedcurrencyValues?.ConversionRate.toFixed(2)).toFixed(2);
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: _calculatedAmount,
          AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
          [name]: values,
        })
      } else {
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfMonths: "",
          Amount: "",
          IsAdobtMonth: false,
        })
      }
    } else if (name == "NoOfDays") {
      if (values > 0) {
        let _noOfDays = values ? values : 2
        if (_noOfDays > 30) {
          _noOfDays = 30
        }

        if (_noOfDays < 2) {
          _noOfDays = 2
        }

        let _amount = BasicInfoValues?.Amount ? BasicInfoValues?.Amount : 0

        let _calculatedAmount = _noOfDays * _amount
        let _calculatedAmountPKR =
          _calculatedAmount * selectedcurrencyValues?.ConversionRate //(_calculatedAmount * selectedcurrencyValues?.ConversionRate.toFixed(2)).toFixed(2);
        let totalamount = _calculatedAmount
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: totalamount,
          AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
          [name]: values,
        })
      } else {
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfDays: "",
          Amount: "",
          IsAdobtMonth: false,
        })
      }
    } else {
      setBasicInfoValues({
        ...BasicInfoValues,
        [name]: values,
      })
    }
  }
  // 🔵 End handleInputChange
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
          var sortings = data.data.sort(function (a, b) {
            var keyA = a.Flex2
            var keyB = b.Flex2
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
          })
          setCurrencyddl(sortings)
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
    if (activeTab === "oneTime") {
      if (currency !== currencyName) {
        handleInputChange({
          target: {
            name: "Amount",
            value: 0,
            isCustom: true,
          },
        })
      }
    }
    if (activeTab === "daily") {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: BasicInfoValues?.NoOfDays,
          isCustom: true,
        },
      })
    }

    if (activeTab === "monthly") {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: BasicInfoValues?.NoOfMonths,
          isCustom: true,
        },
      })
    }
  }, [activeTab])

  const donateNow = (e) => {
    e.preventDefault()
    let val = 0

    if (BasicInfoValues?.NoOfMonths.includes(".")) {
      Swal.fire({
        title: "Error",
        text: "Month should be a digit from 1 to 12",
        icon: "error",
      })
      return
    }
    if (
      activeTab === "monthly" &&
      (BasicInfoValues?.NoOfMonths > 12 ||
        BasicInfoValues?.NoOfMonths < 2 ||
        !BasicInfoValues?.NoOfMonths)
    ) {
      Swal.fire({
        title: "Error",
        text: "Month should be between 1 to 12",
        icon: "error",
      })
      return
    }
    if (
      activeTab === "daily" &&
      (BasicInfoValues?.NoOfDays > 30 ||
        BasicInfoValues?.NoOfDays < 2 ||
        !BasicInfoValues?.NoOfDays)
    ) {
      Swal.fire({
        title: "Error",
        text: "Days should be between 1 to 30",
        icon: "error",
      })
      return
    }

    if (
      BasicInfoValues?.donationType === 0 ||
      BasicInfoValues?.donationType === ""
    ) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    }

    if (!BasicInfoValues?.Amount) {
      return Swal.fire({
        title: "Error",
        text: "Please enter amount",
        icon: "error",
      })
    }

    if (BasicInfoValues?.Amount <= 1) {
      Swal.fire({
        title: "Error",
        text: "Donated amount must be greater than 1.",
        icon: "error",
      })
      return
    }
    if (
      BasicInfoValues?.donationType === 0 ||
      BasicInfoValues?.donationType === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    } else if (BasicInfoValues?.Amount <= 0) {
      Swal.fire({
        title: "Error",
        text: "Donation Amount must be greater than 0",
        icon: "error",
      })
    } else {
      BasicInfoValues.currencyName =
        JSON.parse(sessionStorage.getItem("globalSelectedCurrency"))
          .SetupDetailName +
        " - " +
        JSON.parse(sessionStorage.getItem("globalSelectedCurrency")).Flex1
      props.history.push({
        pathname: "/checkout",
        state: {
          ...BasicInfoValues,
          Amount:
            BasicInfoValues?.CurrencyFromSymbol == "PKR"
              ? Math.round(parseFloat(BasicInfoValues?.Amount))
              : parseFloat(BasicInfoValues?.Amount).toFixed(2),
          ConvertAmount: BasicInfoValues?.AmountInPKR,
          ExchangeRate: selectedcurrencyValues?.ConversionRate.toFixed(2),
          CurrentCurrencyAmount: parseFloat(
            BasicInfoValues?.TotalAmount
          ).toFixed(2),
          CurrentCurrencySymbol: BasicInfoValues?.CurrencyFromSymbol,
          caseId: 0,
          NoOfMonth: BasicInfoValues?.NoOfMonths,
          IsAdobt: BasicInfoValues?.IsAdobtMonth,
          DonationForId: DonationForTypes.Case_Wise_Donation,
          donationType: BasicInfoValues?.donationType,
          TagLineId: 1071,
          DonationSubCategoryid: 729,
          currencyType: globalCurrency[0]?.SetupDetailId,
          // 🔵 Multiple Frequency params
          TotalCount:
            activeTab === "oneTime"
              ? "1"
              : activeTab === "monthly"
              ? parseInt(BasicInfoValues?.NoOfMonths)
              : parseInt(BasicInfoValues?.NoOfDays),
          frequeny:
            activeTab === "oneTime"
              ? 0
              : activeTab === "monthly"
              ? SetupMasterIds.Monthly
              : SetupMasterIds.Daily,
        },
      })
    }
  }

  function onRadioBtnClick(id) {
    setRselected({ id })
    handleInputChange({
      target: {
        name: "Amount",
        value: parseInt(id),
        isCustom: true,
      },
    })
  }

  const handleDaysCounter = (counter) => {
    if (BasicInfoValues?.NoOfDays == "30" && counter === "increment") {
      return
    }

    if (counter === "increment") {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: (Number(BasicInfoValues?.NoOfDays) + 1).toString(),
          isCustom: true,
        },
      })
    }

    if (counter === "decrement") {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: (Number(BasicInfoValues?.NoOfDays) - 1).toString(),
          isCustom: true,
        },
      })
    }
  }
  const handleMonthsCounter = (counter) => {
    if (BasicInfoValues?.NoOfMonths == "12" && counter === "increment") {
      return
    }

    if (counter === "increment") {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: (Number(BasicInfoValues?.NoOfMonths) + 1).toString(),
          isCustom: true,
        },
      })
    }

    if (counter === "decrement") {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: (Number(BasicInfoValues?.NoOfMonths) - 1).toString(),
          isCustom: true,
        },
      })
    }
  }
  const handleDaysBlur = () => {
    if (BasicInfoValues?.NoOfDays < 2) {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: "2",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues?.NoOfDays > 30) {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: "30",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues?.NoOfDays < 2) {
      setBasicInfoValues({
        ...BasicInfoValues,
        NoOfDays: "2",
      })
      Swal.fire({
        title: "Error!",
        text: "Days must be between 2 and 30",
        icon: "error",
        confirmButtonText: "Ok",
      })
    }

    if (BasicInfoValues?.NoOfDays > 30) {
      setBasicInfoValues({
        ...BasicInfoValues,
        NoOfDays: "30",
      })
      Swal.fire({
        title: "Error!",
        text: "Days must be between 2 and 30",
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }
  const handleMonthsBlur = () => {
    if (BasicInfoValues?.NoOfMonths < 2) {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: "2",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues?.NoOfMonths > 12) {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: "12",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues?.NoOfMonths < 2) {
      setBasicInfoValues({
        ...BasicInfoValues,
        NoOfMonths: "2",
      })
      Swal.fire({
        title: "Error!",
        text: "Months must be between 2 and 12",
        icon: "error",
        confirmButtonText: "Ok",
      })
    }

    if (BasicInfoValues?.NoOfMonths > 12) {
      setBasicInfoValues({
        ...BasicInfoValues,
        NoOfMonths: "12",
      })
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: "12",
          isCustom: true,
        },
      })
      Swal.fire({
        title: "Error!",
        text: "Months must be between 2 and 12",
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }
  useEffect(() => {
    GetGeneralDonation()
    GetCurrency()

    const load = async () => {
      setLoading(true)

      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )

      if (_CurrencyData.Response && _CurrencyData.Data != "") {
        let _parseData = JSON.parse(_CurrencyData.Data)
        // BasicInfoValues.ConversionRate = _parseData.result.PKR
        // BasicInfoValues.CurrencyFromSymbol = _parseData.base
        setSelectedcurrencyValues({
          ...selectedcurrencyValues,
          ConversionRate: _parseData.result.PKR,
          CurrencyFromSymbol: _parseData.base,
        })
        setCurrentCurrency({
          ConversionRate: _parseData.result.PKR,
          CurrencyFromSymbol: _parseData.base,
        })

        // setBasicInfoValues({
        //   ...BasicInfoValues,
        //   ConversionRate: _parseData.result.PKR,
        //   CurrencyFromSymbol: _parseData.base,
        // })
        setglobalCurrency([
          JSON.parse(sessionStorage.getItem("globalSelectedCurrency")),
        ])
        setLoading(false)
      } else {
        // BasicInfoValues.ConversionRate = 1
        // BasicInfoValues.CurrencyFromSymbol = "PKR"

        // setBasicInfoValues({
        //   ...BasicInfoValues,
        //   ConversionRate: 1,
        //   CurrencyFromSymbol: "PKR",
        // })
        setLoading(false)
        setglobalCurrency([
          JSON.parse(sessionStorage.getItem("globalSelectedCurrency")),
        ])
      }
    }
    load()
  }, [])

  return (
    <div className="maincontent">
      <HomeHeader isShow={true} />
      <section id="inner-banner" className="section">
        <div className="container">
          <h1 className="mb-0">Quick Donate</h1>
        </div>
      </section>
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
        <section className="section section-casedetail  mb-4">
          <Container>
            <Row>
              <Col md="7">
                <Row>
                  <Col
                    md={!isSuggestedAmount ? "8" : "12"}
                    sm="12"
                    className={isSuggestedAmount ? "d-flex justify-content-center" : ""}
                  >
                    <img
                      src={SubscriptionDonate}
                      alt=""
                      width={!isSuggestedAmount ? "100%" : "50%"}
                    />
                  </Col>
                  {!isSuggestedAmount && (
                    <Col md="4" sm="12" className="mb-2 ">
                      <section
                        className="section section-domain "
                        style={{
                          position: "unset",
                          bottom: "0",
                          width: "auto",
                          zIndex: "1",
                          borderRadius: "15px",
                          height: "100%",
                        }}
                      >
                        <div className="text-center quick-donate-select-text ">
                          Suggested Amounts
                        </div>
                        <div className="form-group">
                          <ButtonGroup
                            className="donation alert"
                            style={{
                              width: "95%",
                            }}
                            vertical
                          >
                            <Button
                              onClick={(e) =>
                                onRadioBtnClick(
                                  e.target.innerText.replace(/,/g, "")
                                )
                              }
                              active={
                                rSelected?.id ==
                                (isFixed
                                  ? amounts[0]
                                  : Math.round(
                                      amounts[0] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    ))
                              }
                            >
                              {isFixed
                                ? ConvertNumricToComaSeparate(amounts[0])
                                : ConvertNumricToComaSeparate(
                                    Math.round(
                                      amounts[0] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    )
                                  )}
                              {/*   18,900 */}
                            </Button>

                            <Button
                              onClick={(e) =>
                                onRadioBtnClick(
                                  e.target.innerText.replace(/,/g, "")
                                )
                              }
                              active={
                                rSelected?.id ==
                                (isFixed
                                  ? amounts[1]
                                  : Math.round(
                                      amounts[1] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    ))
                              }
                            >
                              {isFixed
                                ? ConvertNumricToComaSeparate(amounts[1])
                                : ConvertNumricToComaSeparate(
                                    Math.round(
                                      amounts[1] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    )
                                  )}
                              {/* 1,000   18,900 */}
                            </Button>

                            <Button
                              onClick={(e) =>
                                onRadioBtnClick(
                                  e.target.innerText.replace(/,/g, "")
                                )
                              }
                              active={
                                rSelected?.id ==
                                (isFixed
                                  ? amounts[2]
                                  : Math.round(
                                      amounts[2] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    ))
                              }
                            >
                              {isFixed
                                ? ConvertNumricToComaSeparate(amounts[2])
                                : ConvertNumricToComaSeparate(
                                    Math.round(
                                      amounts[2] /
                                        selectedcurrencyValues.ConversionRate.toFixed(
                                          2
                                        )
                                    )
                                  )}
                              {/* 3,000   18,900 */}
                            </Button>
                          </ButtonGroup>
                        </div>
                      </section>
                    </Col>
                  )}
                </Row>
              </Col>
              <Col md="5">
                <Card className="cardform">
                  <Nav
                    tabs
                    justified
                    className="nav-fill"
                    horizontal="end"
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <NavItem className="mr-none">
                      <NavLink
                        className={activeTab === "oneTime" ? "active" : ""}
                        onClick={() => {
                          handleTabChange("oneTime")
                        }}
                      >
                        <b>One Time</b>
                      </NavLink>
                    </NavItem>
                    <NavItem className="mr-none">
                      <NavLink
                        className={activeTab === "daily" ? "active" : ""}
                        onClick={() => {
                          handleTabChange("daily")
                        }}
                      >
                        <b>Daily</b>
                      </NavLink>
                    </NavItem>
                    <NavItem className="mr-none">
                      <NavLink
                        className={activeTab === "monthly" ? "active" : ""}
                        onClick={() => {
                          handleTabChange("monthly")
                        }}
                      >
                        <b>Monthly</b>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    {/* 🔴  ONETIME TAB  */}
                    <TabPane tabId="oneTime">
                      <Card className="cardform">
                        <CardBody className="pt-1">
                          <div className="donation-box">
                            <form>
                              <Row>
                                <Col>
                                  <FormGroupSelect
                                    label="Donation Type*"
                                    list={generalDonationddl}
                                    fieldId="SetupDetailId"
                                    fieldName="SetupDetailName"
                                    required={true}
                                    onChange={handleInputChange}
                                    name="donationType"
                                    value={BasicInfoValues?.donationType}
                                    className="appearance-auto"
                                  />

                                  <FormGroup>
                                    <Row>
                                      <Col md={7}>
                                        <label className="form-label">
                                          Amount*
                                        </label>
                                        <div className="case-content">
                                          <div className="form-group m-0">
                                            <div className="input-group amount-drop">
                                              <FormGroupInput
                                                name="Amount"
                                                className="input-group-addon"
                                                style={{
                                                  border: "1px solid #f7d1d2",
                                                  color: "#888",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  padding: "8px",
                                                  borderRadius:
                                                    "4px 0px 0px 4px",
                                                  borderRight: "0px",
                                                }}
                                                value={parseFloat(
                                                  BasicInfoValues?.Amount
                                                    ? parseFloat(
                                                        BasicInfoValues?.Amount
                                                      ).toFixed(2)
                                                    : 0
                                                )}
                                                isNumber="true"
                                                onChange={handleInputChange}
                                                required={true}
                                                isDecimal="true"
                                                // type="number"
                                                maxLength="7"
                                              />

                                              <Input
                                                type="text"
                                                value={
                                                  BasicInfoValues?.CurrencyFromSymbol
                                                }
                                                id="checkout"
                                                disabled
                                                className="pkr-field"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row>
                                      <Col md={12}>
                                        {BasicInfoValues?.CurrencyFromSymbol !==
                                          "PKR" && BasicInfoValues?.Amount ? (
                                          <h5 className="total-pkr-amount ">
                                            <span className="text-primary">
                                              {" "}
                                              Total Amount:{" "}
                                            </span>
                                            {ConvertNumricToComaSeparate(
                                              BasicInfoValues?.TotalAmount.toFixed(
                                                2
                                              )
                                            ) +
                                              " " +
                                              BasicInfoValues?.CurrencyFromSymbol}
                                          </h5>
                                        ) : null}
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  <Row>
                                    <Col md={5} sm={12}>
                                      <Button
                                        type="button "
                                        onClick={donateNow}
                                        color="primary"
                                        className="custom-donate-button"
                                      >
                                        Donate Now
                                      </Button>
                                    </Col>

                                    <Col md={7} sm={12}>
                                      <div>&nbsp;</div>
                                      {BasicInfoValues?.AmountInPKR ? (
                                        <h5 className="total-pkr-amount text-lg-right white-space-no-wrap">
                                          <span className="text-primary">
                                            {" "}
                                            Total PKR Amount:{" "}
                                          </span>
                                          {BasicInfoValues?.CurrencyFromSymbol ===
                                          "PKR"
                                            ? ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )
                                            : ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )}

                                          {activeTab === "oneTime" &&
                                          BasicInfoValues?.CurrencyFromSymbol !==
                                            "PKR" ? (
                                            <span
                                              className="help-icon"
                                              id="CRoneTime"
                                            >
                                              {activeTab === "oneTime" &&
                                                BasicInfoValues?.CurrencyFromSymbol !==
                                                  "PKR" && (
                                                  <Tooltip
                                                    placement="top"
                                                    isOpen={tooltipOpen}
                                                    target="CRoneTime"
                                                    toggle={toggleTooltip}
                                                    autohide={false}
                                                    style={{
                                                      backgroundColor: "#fff",
                                                      color: "#000",
                                                      border: "1px solid #000",
                                                      padding: "10px",
                                                      fontSize: "14px",
                                                      borderRadius: "4px",
                                                      boxShadow:
                                                        "0px 0px 5px #000",
                                                    }}
                                                  >
                                                    Conversion Rate:{" "}
                                                    {selectedcurrencyValues?.ConversionRate.toFixed(
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
                                                    on{" "}
                                                    {moment().format(
                                                      "DD-MMM-YYYY"
                                                    )}
                                                  </Tooltip>
                                                )}
                                              <i className="fa fa-question-circle color-black ml-1">
                                                {" "}
                                              </i>
                                            </span>
                                          ) : null}
                                        </h5>
                                      ) : null}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </form>
                            <p className="subscribed-months pt-3 text-justify">
                              You can view your donation info through your Sab
                              Saath account.{" "}
                              <a
                                href="/TermsAndConditions#donor-account-activation"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary"
                              >
                                <u>Learn more</u>
                              </a>
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    {/* 🔴 DAILY TAB */}
                    <TabPane tabId="daily">
                      <Card className="cardform">
                        <CardBody className="pt-1">
                          <div className="donation-box">
                            <form>
                              <Row>
                                <Col>
                                  <FormGroupSelect
                                    label="Donation Type*"
                                    list={generalDonationddl}
                                    fieldId="SetupDetailId"
                                    fieldName="SetupDetailName"
                                    required={true}
                                    onChange={handleInputChange}
                                    name="donationType"
                                    value={BasicInfoValues?.donationType}
                                    className="appearance-auto"
                                  />

                                  <FormGroup>
                                    <Row>
                                      <Col md={7}>
                                        <label className="form-label">
                                          Amount*
                                        </label>
                                        <div className="case-content">
                                          <div className="form-group m-0">
                                            <div className="input-group amount-drop">
                                              <FormGroupInput
                                                name="Amount"
                                                className="input-group-addon"
                                                style={{
                                                  border: "1px solid #f7d1d2",
                                                  color: "#888",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  padding: "8px",
                                                  borderRadius:
                                                    "4px 0px 0px 4px",
                                                  borderRight: "0px",
                                                }}
                                                value={
                                                  BasicInfoValues?.CurrencyFromSymbol ===
                                                  "PKR"
                                                    ? parseInt(
                                                        BasicInfoValues?.Amount
                                                          ? parseFloat(
                                                              BasicInfoValues?.Amount
                                                            ).toFixed(2)
                                                          : 0
                                                      )
                                                    : parseFloat(
                                                        BasicInfoValues?.Amount
                                                          ? parseFloat(
                                                              BasicInfoValues?.Amount
                                                            ).toFixed(2)
                                                          : 0
                                                      )
                                                }
                                                isNumber="true"
                                                onChange={handleInputChange}
                                                required={true}
                                                isDecimal="true"
                                                // type="number"
                                                maxLength="7"
                                              />

                                              <Input
                                                type="text"
                                                value={
                                                  BasicInfoValues?.CurrencyFromSymbol
                                                }
                                                id="checkout"
                                                disabled
                                                className="pkr-field"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md={5}>
                                        {/* ================ */}
                                        <FormGroup>
                                          <Label
                                            style={{
                                              fontSize: 13,
                                              marginBottom: 2,
                                              color: "rgb(214, 11, 17)",
                                              fontWeight: "500",
                                            }}
                                          >
                                            Days*
                                          </Label>

                                          <div className="d-flex align-items-center ">
                                            {/* Decrement Button with minus icon */}
                                            <button
                                              className="counter-button-left"
                                              type="button"
                                              disabled={
                                                BasicInfoValues?.NoOfDays <= 2
                                              }
                                              onClick={() => {
                                                handleDaysCounter("decrement")
                                              }}
                                            >
                                              <i className="fa fa-minus" />
                                            </button>

                                            <Input
                                              type={"number"}
                                              className="form-control case-counter-input"
                                              name="NoOfDays"
                                              value={BasicInfoValues?.NoOfDays}
                                              onChange={(e) => {
                                                setBasicInfoValues({
                                                  ...BasicInfoValues,
                                                  NoOfDays: e.target.value,
                                                })
                                                setTimeout(() => {
                                                  handleInputChange(e)
                                                }, 300)
                                              }}
                                              onBlur={handleDaysBlur}
                                              required
                                              min={2}
                                              max={30}
                                              isNumber="true"
                                            />
                                            {/* Increment Button with minus icon */}
                                            <button
                                              className="counter-button-right"
                                              type="button"
                                              disabled={
                                                BasicInfoValues?.NoOfDays >= 30
                                              }
                                              onClick={() => {
                                                handleDaysCounter("increment")
                                              }}
                                            >
                                              <i className="fa fa-plus" />
                                            </button>
                                          </div>
                                          {/* ================ */}
                                        </FormGroup>
                                        {/* ================ */}
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  {BasicInfoValues?.CurrencyFromSymbol !==
                                    "PKR" && (
                                    <FormGroup>
                                      <Row>
                                        <Col md={12}>
                                          {BasicInfoValues?.CurrencyFromSymbol !==
                                            "PKR" &&
                                          BasicInfoValues?.TotalAmount ? (
                                            <h5 className="total-pkr-amount ">
                                              <span className="text-primary">
                                                {" "}
                                                Total Amount:{" "}
                                              </span>
                                              {ConvertNumricToComaSeparate(
                                                BasicInfoValues?.TotalAmount.toFixed(
                                                  2
                                                )
                                              ) +
                                                " " +
                                                BasicInfoValues?.CurrencyFromSymbol}
                                            </h5>
                                          ) : null}
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  )}
                                  {BasicInfoValues?.CurrencyFromSymbol ===
                                    "PKR" && (
                                    <FormGroup>
                                      <Row>
                                        <Col md={12}>
                                          <h5 className="total-pkr-amount "></h5>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  )}

                                  {BasicInfoValues?.Amount ? (
                                    <FormGroup>
                                      <Row>
                                        <Col md={12}>
                                          <p className="subscribed-months text-primary">
                                            Your donation will be split into{" "}
                                            {occurences?.occurences} occurences.{" "}
                                            {ConvertNumricToComaSeparate(
                                              Math.floor(
                                                BasicInfoValues?.Amount
                                              ).toFixed(2)
                                            ) +
                                              " " +
                                              BasicInfoValues?.CurrencyFromSymbol}{" "}
                                            will be given every day till{" "}
                                            {occurences?.endingDate}.
                                          </p>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  ) : null}

                                  <Row>
                                    <Col md={5} sm={12}>
                                      <Button
                                        type="button "
                                        onClick={donateNow}
                                        color="primary"
                                        className="custom-donate-button"
                                      >
                                        Donate Now
                                      </Button>
                                    </Col>

                                    <Col md={7} sm={12}>
                                      <div>&nbsp;</div>
                                      {BasicInfoValues?.AmountInPKR ? (
                                        <h5 className="total-pkr-amount text-lg-right white-space-no-wrap">
                                          <span className="text-primary">
                                            {" "}
                                            Total PKR Amount:{" "}
                                          </span>
                                          {BasicInfoValues?.CurrencyFromSymbol ===
                                          "PKR"
                                            ? ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )
                                            : ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )}
                                          {BasicInfoValues?.CurrencyFromSymbol !==
                                            "PKR" && activeTab === "daily" ? (
                                            <span
                                              className="help-icon"
                                              id="CRdaily"
                                            >
                                              <Tooltip
                                                placement="top"
                                                isOpen={tooltipOpen}
                                                target="CRdaily"
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
                                                Conversion Rate:{" "}
                                                {selectedcurrencyValues?.ConversionRate.toFixed(
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
                                                on{" "}
                                                {moment().format("DD-MMM-YYYY")}
                                              </Tooltip>
                                              <i className="fa fa-question-circle color-black ml-1"></i>
                                            </span>
                                          ) : null}
                                        </h5>
                                      ) : null}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </form>
                            <p className="subscribed-months pt-3 text-justify">
                              You can manage your subscription through your Sab
                              Saath account, once subscribed.{" "}
                              <a
                                href="/TermsAndConditions#subscription-policy"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary"
                              >
                                <u>Learn more</u>
                              </a>
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    {/* 🔴 MONTHLY TAB */}
                    <TabPane tabId="monthly">
                      <Card className="cardform">
                        <CardBody className="pt-1">
                          <div className="donation-box">
                            <form>
                              <Row>
                                <Col>
                                  <FormGroupSelect
                                    label="Donation Type*"
                                    list={generalDonationddl}
                                    fieldId="SetupDetailId"
                                    fieldName="SetupDetailName"
                                    required={true}
                                    onChange={handleInputChange}
                                    name="donationType"
                                    value={BasicInfoValues?.donationType}
                                    className="appearance-auto"
                                  />

                                  <FormGroup>
                                    <Row>
                                      <Col md={7}>
                                        <label className="form-label">
                                          Amount*
                                        </label>
                                        <div className="case-content">
                                          <div className="form-group m-0">
                                            <div className="input-group amount-drop">
                                              <FormGroupInput
                                                name="Amount"
                                                className="input-group-addon"
                                                style={{
                                                  border: "1px solid #f7d1d2",
                                                  color: "#888",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  padding: "8px",
                                                  borderRadius:
                                                    "4px 0px 0px 4px",
                                                  borderRight: "0px",
                                                }}
                                                value={parseFloat(
                                                  BasicInfoValues?.Amount
                                                    ? parseFloat(
                                                        BasicInfoValues?.Amount
                                                      ).toFixed(2)
                                                    : 0
                                                )}
                                                isNumber="true"
                                                onChange={handleInputChange}
                                                required={true}
                                                isDecimal="true"
                                                // type="number"
                                                maxLength="7"
                                              />

                                              <Input
                                                type="text"
                                                value={
                                                  BasicInfoValues?.CurrencyFromSymbol
                                                }
                                                id="checkout"
                                                disabled
                                                className="pkr-field"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                      <>
                                        <Col md={5}>
                                          {/* ================ */}
                                          <FormGroup>
                                            <Label
                                              style={{
                                                fontSize: 13,
                                                marginBottom: 2,
                                                color: "rgb(214, 11, 17)",
                                                fontWeight: "500",
                                              }}
                                            >
                                              Months*
                                            </Label>

                                            <div className="d-flex align-items-center ">
                                              {/* Decrement Button with minus icon */}
                                              <button
                                                className="counter-button-left"
                                                type="button"
                                                disabled={
                                                  BasicInfoValues?.NoOfMonths <=
                                                  2
                                                }
                                                onClick={() => {
                                                  handleMonthsCounter(
                                                    "decrement"
                                                  )
                                                }}
                                              >
                                                <i className="fa fa-minus" />
                                              </button>

                                              <Input
                                                type={"number"}
                                                className="form-control case-counter-input"
                                                name="NoOfMonths"
                                                value={
                                                  BasicInfoValues?.NoOfMonths
                                                }
                                                onChange={(e) => {
                                                  setBasicInfoValues({
                                                    ...BasicInfoValues,
                                                    NoOfMonths: e.target.value,
                                                  })
                                                  setTimeout(() => {
                                                    handleInputChange(e)
                                                  }, 300)
                                                }}
                                                onBlur={handleMonthsBlur}
                                                required
                                                min={2}
                                                max={12}
                                                isNumber="true"
                                              />
                                              {/* Increment Button with minus icon */}
                                              <button
                                                className="counter-button-right"
                                                type="button"
                                                disabled={
                                                  BasicInfoValues?.NoOfMonths >=
                                                  12
                                                }
                                                onClick={() => {
                                                  handleMonthsCounter(
                                                    "increment"
                                                  )
                                                }}
                                              >
                                                <i className="fa fa-plus" />
                                              </button>
                                            </div>
                                            {/* ================ */}
                                          </FormGroup>
                                          {/* ================ */}
                                        </Col>
                                      </>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row>
                                      <Col md={12} sm={12}>
                                        {BasicInfoValues?.CurrencyFromSymbol !==
                                          "PKR" && BasicInfoValues?.Amount ? (
                                          <h5 className="total-pkr-amount ">
                                            <span className="text-primary">
                                              {" "}
                                              Total Amount:{" "}
                                            </span>

                                            {ConvertNumricToComaSeparate(
                                              BasicInfoValues?.TotalAmount.toFixed(
                                                2
                                              )
                                            ) +
                                              " " +
                                              BasicInfoValues?.CurrencyFromSymbol}
                                          </h5>
                                        ) : null}
                                      </Col>
                                    </Row>
                                  </FormGroup>

                                  {BasicInfoValues?.Amount ? (
                                    <FormGroup>
                                      <Row>
                                        <Col md={12}>
                                          <p className="subscribed-months text-primary">
                                            Your donation will be split into{" "}
                                            {occurences?.occurences} occurences.{" "}
                                            {ConvertNumricToComaSeparate(
                                              Math.floor(
                                                BasicInfoValues?.Amount
                                              ).toFixed(2)
                                            ) +
                                              " " +
                                              BasicInfoValues?.CurrencyFromSymbol}{" "}
                                            will be given every month till{" "}
                                            {occurences?.endingDate}.
                                          </p>
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  ) : null}

                                  <Row>
                                    <Col md={5} sm={12}>
                                      <Button
                                        type="button "
                                        onClick={donateNow}
                                        color="primary"
                                        className="custom-donate-button"
                                      >
                                        Donate Now
                                      </Button>
                                    </Col>
                                    <Col md={7} sm={12}>
                                      <div>&nbsp;</div>
                                      {BasicInfoValues?.AmountInPKR ? (
                                        <h5 className="total-pkr-amount text-lg-right white-space-no-wrap">
                                          <span className="text-primary">
                                            {" "}
                                            Total PKR Amount:{" "}
                                          </span>
                                          {BasicInfoValues?.CurrencyFromSymbol ===
                                          "PKR"
                                            ? ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )
                                            : ConvertNumricToComaSeparate(
                                                Math.floor(
                                                  BasicInfoValues?.AmountInPKR
                                                ).toFixed(2)
                                              )}
                                          {BasicInfoValues?.CurrencyFromSymbol !==
                                            "PKR" && activeTab === "monthly" ? (
                                            <span
                                              className="help-icon"
                                              id="CRmonthly"
                                            >
                                              {activeTab === "monthly" && (
                                                <Tooltip
                                                  placement="top"
                                                  isOpen={tooltipOpen}
                                                  target="CRmonthly"
                                                  toggle={toggleTooltip}
                                                  autohide={false}
                                                  style={{
                                                    backgroundColor: "#fff",
                                                    color: "#000",
                                                    border: "1px solid #000",
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    borderRadius: "4px",
                                                    boxShadow:
                                                      "0px 0px 5px #000",
                                                  }}
                                                >
                                                  Conversion Rate:{" "}
                                                  {selectedcurrencyValues?.ConversionRate.toFixed(
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
                                                  on{" "}
                                                  {moment().format(
                                                    "DD-MMM-YYYY"
                                                  )}
                                                </Tooltip>
                                              )}
                                              <i className="fa fa-question-circle color-black ml-1">
                                                {" "}
                                              </i>
                                            </span>
                                          ) : null}
                                        </h5>
                                      ) : null}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </form>
                            <p className="subscribed-months pt-3 text-justify">
                              You can manage your subscription through your Sab
                              Saath account, once subscribed.{" "}
                              <a
                                href="/TermsAndConditions#subscription-policy"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary"
                              >
                                <u>Learn more</u>
                              </a>
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <HomeFooter hideFooter={false} />
    </div>
  )
}

export default SubscriptionQuickDonate
