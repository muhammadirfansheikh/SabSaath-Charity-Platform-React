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
  Progress,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
  Badge,
} from "reactstrap"
import { useParams } from "react-router-dom"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import {
  GetSetupMaster,
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  NGOController,
} from "utils/CommonMethods.js"
import {
  SetupMasterIds,
  DonationForTypes,
  DefaultImgPath,
  CaseDetailDefaultImgPath,
} from "utils/Constants.js"
import Swal from "sweetalert2"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import {
  AllowAlphabatic,
  AllowNumericWithDecimal,
  AllowOnlyNumeric,
} from "utils/CommonMethods.js"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import parse from "html-react-parser"
import { baseImageUrl } from "utils/Api"
import moment from "moment"
import CenteredLoader from "components/GeneralComponent/CenteredLoader.jsx"
import { Img } from "react-image"

const CaseDetail = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [roundOffooltipOpen, setRoundOffTooltipOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("oneTime")
  const [loading, setLoading] = useState(true)
  const [upForAdoption, setUpforAdoption] = useState(false)
  const [roundOffAdjustment, setRoundOffAdjustment] = useState(0)
  const [eligibleForSubs, seteligibleForSubs] = useState(false)
  const [ApiValues, setApiValues] = useState({})
  const [isNGOCase, setIsNGOCase] = useState(false)
  const [caseSource, setcaseSource] = useState(null)
  const [descCaseCode1, setdescCaseCode1] = useState()
  const [globalCurrency, setglobalCurrency] = useState(null)
  const [isAllAdobt, setisAllAdobt] = useState(false)
  const [casecode, setcasecode] = useState()
  const [ApplicantName, setApplicantName] = useState()
  const [ngoDetails, setngoDetails] = useState(null)
  const { id } = useParams()
  const GetFeaturedNGOsDetails = async () => {
    setLoading(true)
    try {
      var data = await NGOController(
        0,
        4,
        null,
        0,
        null,
        null,
        null,
        caseSource
      )
      if (data && data.length > 0) {
        setngoDetails(data[0])
      } else {
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }

  useEffect(() => {
    if (caseSource && !ngoDetails) {
      GetFeaturedNGOsDetails()
    }
  }, [caseSource])

  const GetApplicantCaseWise = async () => {
    setLoading(true)
    try {
      var data = await Get_All_Cases(id)
      if (data != null) {
        if (Object.keys(data).length > 0) {
          const remaining = data.Table[0].Remainingamount
          const raised = data.Table[0].raised
          const pledge = data.Table[0].pledge
          const totalAmount = data.Table[0].TotalAmount

          const remainingPercentage = (parseInt(remaining) / totalAmount) * 100
          const raisedPercentage = (parseInt(raised) / totalAmount) * 100
          const pledgePercentage = (parseInt(pledge) / totalAmount) * 100

          setApiValues(
            data?.Table1
              ? {
                  ...data.Table[0],
                  ...data?.Table1[0],
                  TotalAmount:
                    parseInt(data?.Table[0].Remaining) +
                    parseInt(data?.Table[0].raised),
                  remainingPercentage: remainingPercentage,
                  raisedPercentage: raisedPercentage,
                  pledgePercentage: pledgePercentage,
                }
              : {
                  ...data?.Table[0],
                  TotalAmount:
                    parseInt(data?.Table[0].Remaining) +
                    parseInt(data?.Table[0].raised),
                  remainingPercentage: remainingPercentage,
                  raisedPercentage: raisedPercentage,
                  pledgePercentage: pledgePercentage,
                }
          )
          data?.Table1 ? setIsNGOCase(true) : setIsNGOCase(false)
          setdescCaseCode1(data.Table[0].CaseDescription)
          setcasecode("Case Code: " + data.Table[0]?.ShortApplicantCaseCode)
          setApplicantName(ApiValues.Name)
          setUpforAdoption(data.Table[0]?.Adopt ? true : false)
          setcaseSource(data.Table[0]?.Source)
          seteligibleForSubs(
            data.Table[0]?.Source === SetupMasterIds.ZamanFoundation ||
              data.Table[0]?.Source === SetupMasterIds.ZamanFoundationNGO
              ? true
              : false
          )
          setLoading(false)
        } else {
          setLoading(false)
        }
      } else {
        setLoading(false)

        //  return [];
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)
  const toggleRoundOffTooltip = () =>
    setRoundOffTooltipOpen(!roundOffooltipOpen)

  const handleCurrencyInputChange = (event) => {
    setglobalCurrency(event)
  }

  const initialValues = {
    donationName: ApiValues.CaseTitle,
    donationType: 0,
    donationTypeName: "",
    currencyType: 0,
    CurrencyFromSymbol: "",
    CurrencyToSymbol: "PKR",
    ConversionRate: 1,
    NoOfMonths: "2",
    NoOfDays: "2",
    AmountInPKR: 0,
    TotalAmount: 0,

    IsAdobtMonth: false,
    currencyName: "",
    Amount: 0,
    caseId: ApiValues.ApplicantCaseId,
    OperationID: 1,
    Quantity: 0,
    TagLineId: 0,
    DonationSubCategoryid: 0,
  }
  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)
  const [currentCurrency, setCurrentCurrency] = useState({
    ConversionRate: 1,
    CurrencyFromSymbol: "PKR",
  })
  const [occurences, setOccurences] = useState({
    occurences: "",
    startingDate: "",
    endingDate: "",
  })

  useEffect(() => {
    if (!BasicInfoValues?.NoOfMonths && isNGOCase) {
      setBasicInfoValues({
        ...BasicInfoValues,
        NoOfMonths: "1",
      })
    }
  }, [BasicInfoValues])

  // 🔴 Checking RoundOffAdjustment
  useEffect(() => {
    if (activeTab === "oneTime" && BasicInfoValues.IsAdobtMonth == true) {
      const pkrSubsAmount = Math.floor(ApiValues.Remainingamount)
      const remainderInPkr = Math.round(
        ApiValues.Remainingamount - pkrSubsAmount * 1
      )

      if (remainderInPkr) {
        setRoundOffAdjustment(remainderInPkr)
      } else {
        setRoundOffAdjustment(0)
      }
    }

    if (activeTab === "daily" && BasicInfoValues.IsAdobtMonth == true) {
      const pkrSubsAmount = Math.floor(
        ApiValues.Remainingamount / BasicInfoValues.NoOfDays
      )
      const remainderInPkr = Math.round(
        ApiValues.Remainingamount - pkrSubsAmount * BasicInfoValues.NoOfDays
      )
      if (remainderInPkr) {
        setRoundOffAdjustment(remainderInPkr)
      } else {
        setRoundOffAdjustment(0)
      }
    }

    if (activeTab === "monthly" && BasicInfoValues.IsAdobtMonth == true) {
      const pkrSubsAmount = Math.floor(
        ApiValues.Remainingamount / BasicInfoValues.NoOfMonths
      )
      const remainderInPkr = Math.round(
        ApiValues.Remainingamount - pkrSubsAmount * BasicInfoValues.NoOfMonths
      )
      if (remainderInPkr) {
        setRoundOffAdjustment(remainderInPkr)
      } else {
        setRoundOffAdjustment(0)
      }
    }
  }, [
    BasicInfoValues,
    BasicInfoValues || BasicInfoValues?.IsAdobtMonth,
    BasicInfoValues?.TotalAmount,
  ])

  // 🔴 Calculate Occurences
  useEffect(() => {
    if (activeTab === "daily") {
      const startingDate = moment().startOf("day")
      const result = startingDate
        .clone()
        .add(BasicInfoValues.NoOfDays - 1, "days")
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
        .add(BasicInfoValues.NoOfMonths - 1, "months")
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
    setBasicInfoValues({
      ...initialValues,
      ConversionRate: currentCurrency.ConversionRate,
      CurrencyFromSymbol: currentCurrency.CurrencyFromSymbol,
    })
    setisAllAdobt(false)
    setRoundOffAdjustment(0)
  }
  // 🔵 End handleTabChange

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
          _noOfOccurences = BasicInfoValues.NoOfDays
        }

        if (activeTab === "monthly") {
          _noOfOccurences = BasicInfoValues.NoOfMonths
        }

        if (activeTab === "oneTime") {
          _noOfOccurences = "1"
        }
        let _amount =
          values !== undefined || values !== null || values != "" ? values : 0
        let _calculatedAmount = _noOfOccurences * _amount
        console.log(
          "🚀 ~ file: index.js ~ line 220 ~ _calculatedAmount",
          _calculatedAmount
        )
        let _calculatedAmountPKR =
          _calculatedAmount * BasicInfoValues.ConversionRate

        if (ApiValues.Remainingamount / _noOfOccurences < 1) {
          Swal.fire({
            title: "Error",
            text: "Not Enough Amount.",
            icon: "error",
          })
        }
        if (
          _calculatedAmount <=
          ApiValues.Remainingamount / BasicInfoValues.ConversionRate
        ) {
          setBasicInfoValues({
            ...BasicInfoValues,
            TotalAmount: _calculatedAmount,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            [name]: values,
          })
        } else {
          setisAllAdobt(false)

          setBasicInfoValues({
            ...BasicInfoValues,
            TotalAmount: "",
            AmountInPKR: "",
            NoOfMonths: "",
            Amount: "",
            IsAdobtMonth: false,
          })
          Swal.fire({
            title: "Error",
            text: "Donated amount must be less than or equal to remaining amount.",
            icon: "error",
          })
        }
      } else {
        setisAllAdobt(false)
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfMonths: "",
          Amount: "",
          IsAdobtMonth: false,
        })
        Swal.fire({
          title: "Error",
          text: "Donated amount must be greater than 1",
          icon: "error",
        })
      }
    } else if (name == "NoOfMonths") {
      if (values > 0) {
        if (BasicInfoValues.IsAdobtMonth && value > 1) {
          let _noOfMonths = values ? values : 2
          if (_noOfMonths > 12) {
            _noOfMonths = 12
          }
          if (_noOfMonths < 2) {
            _noOfMonths = 2
          }
          let _calculatedAmount =
            BasicInfoValues.CurrencyFromSymbol === "PKR"
              ? Math.floor(
                  ApiValues.Remainingamount /
                    BasicInfoValues.ConversionRate /
                    _noOfMonths
                )
              : ApiValues.Remainingamount /
                BasicInfoValues.ConversionRate /
                _noOfMonths

          let _calculatedTotalAmount = _calculatedAmount * _noOfMonths

          let _calculatedAmountPKR =
            _calculatedTotalAmount * BasicInfoValues.ConversionRate
          console.log("🚀 ", _calculatedAmount)

          if (ApiValues.Remainingamount / _noOfMonths < 1) {
            Swal.fire({
              title: "Error",
              text: "Not Enough Amount.",
              icon: "error",
            })
          }
          if (
            _calculatedTotalAmount <=
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          ) {
            setBasicInfoValues({
              ...BasicInfoValues,
              Amount: _calculatedAmount, //Math.floor(_calculatedAmount),
              TotalAmount: _calculatedTotalAmount, //Math.floor(_calculatedTotalAmount),
              AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
              [name]: values,
            })
          } else {
            setisAllAdobt(false)
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: "",
              NoOfMonths: "1",
              AmountInPKR: "",
              Amount: "",
              IsAdobtMonth: false,
            })
            Swal.fire({
              title: "Error",
              text: "Donated amount must be less than or equal to remaining amount.",
              icon: "error",
            })
          }
        } else if (BasicInfoValues.IsAdobtMonth && value == 1) {
          let _remainingAmount =
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          let _calculatedAmountPKR =
            _remainingAmount * BasicInfoValues.ConversionRate
          console.log("🚀 ", _remainingAmount)
          setisAllAdobt(values)
          setBasicInfoValues({
            ...BasicInfoValues,
            TotalAmount: _remainingAmount,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            NoOfMonths: "",
            Amount: _remainingAmount,
          })
        } else {
          let _noOfMonths = values ? values : 2

          let _amount =
            BasicInfoValues.Amount !== undefined ||
            BasicInfoValues.Amount !== null ||
            BasicInfoValues.Amount != ""
              ? BasicInfoValues.Amount
              : 0

          let _calculatedAmount = _noOfMonths * _amount

          let _calculatedAmountPKR =
            _calculatedAmount * BasicInfoValues.ConversionRate //(_calculatedAmount * BasicInfoValues.ConversionRate.toFixed(2)).toFixed(2);
          console.log("🚀 ", _calculatedAmount)
          if (
            _calculatedAmount <=
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          ) {
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: _calculatedAmount,
              AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
              [name]: values,
            })
          } else {
            setisAllAdobt(false)
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: "",
              NoOfMonths: "",
              AmountInPKR: "",
              Amount: "",
              IsAdobtMonth: false,
            })
            Swal.fire({
              title: "Error",
              text: "Donated amount must be less than or equal to remaining amount.",
              icon: "error",
            })
          }
        }
      } else {
        setisAllAdobt(false)
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
        if (BasicInfoValues.IsAdobtMonth && value >= 2) {
          let _noOfDays = values ? values : 2
          if (_noOfDays > 30) {
            _noOfDays = 30
          }
          if (_noOfDays < 2) {
            _noOfDays = 2
          }
          let _calculatedAmount =
            BasicInfoValues.CurrencyFromSymbol === "PKR"
              ? Math.floor(
                  ApiValues.Remainingamount /
                    BasicInfoValues.ConversionRate /
                    _noOfDays
                )
              : ApiValues.Remainingamount /
                BasicInfoValues.ConversionRate /
                _noOfDays

          let _calculatedTotalAmount = _calculatedAmount * _noOfDays
          let _calculatedAmountPKR =
            _calculatedTotalAmount * BasicInfoValues.ConversionRate
          console.log("🚀 ", _calculatedAmount)

          if (ApiValues.Remainingamount / _noOfDays < 1) {
            Swal.fire({
              title: "Error",
              text: "Not Enough Amount.",
              icon: "error",
            })
          }
          if (
            _calculatedTotalAmount <=
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          ) {
            setBasicInfoValues({
              ...BasicInfoValues,
              Amount: _calculatedAmount, //Math.floor(_calculatedAmount),
              TotalAmount: _calculatedTotalAmount, //Math.floor(_calculatedTotalAmount),
              AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
              [name]: values,
            })
          } else {
            setisAllAdobt(false)
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: "",
              NoOfDays: "2",
              AmountInPKR: "",
              Amount: "",
              IsAdobtMonth: false,
            })
            Swal.fire({
              title: "Error",
              text: "Donated amount must be less than or equal to remaining amount.",
              icon: "error",
            })
          }
        } else if (BasicInfoValues.IsAdobtMonth && value == 1) {
          let _remainingAmount =
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          let _calculatedAmountPKR =
            _remainingAmount * BasicInfoValues.ConversionRate
          setisAllAdobt(values)
          setBasicInfoValues({
            ...BasicInfoValues,
            TotalAmount: _remainingAmount,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            NoOfDays: "",
            Amount: _remainingAmount,
          })
        } else {
          let _noOfDays = values ? values : 2
          if (_noOfDays > 30) {
            _noOfDays = 30
          }

          if (_noOfDays < 2) {
            _noOfDays = 2
          }

          let _amount =
            BasicInfoValues.Amount !== undefined ||
            BasicInfoValues.Amount !== null ||
            BasicInfoValues.Amount != ""
              ? BasicInfoValues.Amount
              : 0

          let _calculatedAmount = _noOfDays * _amount
          let _calculatedAmountPKR =
            _calculatedAmount * BasicInfoValues.ConversionRate //(_calculatedAmount * BasicInfoValues.ConversionRate.toFixed(2)).toFixed(2);

          if (
            _calculatedAmount <=
            ApiValues.Remainingamount / BasicInfoValues.ConversionRate
          ) {
            let totalamount = _calculatedAmount
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: totalamount,
              AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
              [name]: values,
            })
          } else {
            setisAllAdobt(false)
            setBasicInfoValues({
              ...BasicInfoValues,
              TotalAmount: "",
              NoOfDays: "",
              AmountInPKR: "",
              Amount: "",
              IsAdobtMonth: false,
            })
            Swal.fire({
              title: "Error",
              text: "Donated amount must be less than or equal to remaining amount.",
              icon: "error",
            })
          }
        }
      } else {
        setisAllAdobt(false)
        setBasicInfoValues({
          ...BasicInfoValues,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfDays: "",
          Amount: "",
          IsAdobtMonth: false,
        })
      }
    } else if (e.target?.type == "checkbox") {
      if (values === true) {
        const mulitplyVal = activeTab === "oneTime" ? 1 : 2
        let _calculatedAmount =
          BasicInfoValues.CurrencyFromSymbol === "PKR"
            ? Math.floor(
                ApiValues.Remainingamount /
                  BasicInfoValues.ConversionRate /
                  mulitplyVal
              )
            : ApiValues.Remainingamount /
              BasicInfoValues.ConversionRate /
              mulitplyVal
        let _calculatedTotalAmount = _calculatedAmount * mulitplyVal

        let _remainingAmount =
          ApiValues.Remainingamount / BasicInfoValues.ConversionRate
        // let _calculatedAmountPKR =
        // _calculatedTotalAmount * BasicInfoValues.ConversionRate
        let _calculatedAmountPKR =
          _calculatedTotalAmount * BasicInfoValues.ConversionRate
        setisAllAdobt(values)
        if (activeTab === "oneTime") {
          setBasicInfoValues({
            ...BasicInfoValues,
            IsAdobtMonth: values,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            Amount: _calculatedAmount, //Math.floor(_calculatedAmount),
            TotalAmount: _calculatedTotalAmount, //Math.floor(_calculatedTotalAmount),
          })
        }

        if (activeTab === "daily") {
          setBasicInfoValues({
            ...BasicInfoValues,
            IsAdobtMonth: values,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            NoOfDays: "2",
            Amount: _calculatedAmount, //Math.floor(_calculatedAmount),
            TotalAmount: _calculatedTotalAmount, //Math.floor(_calculatedTotalAmount),
          })
        }
        if (activeTab === "monthly") {
          setBasicInfoValues({
            ...BasicInfoValues,
            IsAdobtMonth: values,
            AmountInPKR: _calculatedAmountPKR, //Math.floor(_calculatedAmountPKR),
            NoOfMonths: "2",
            Amount: _calculatedAmount, //Math.floor(_calculatedAmount),
            TotalAmount: _calculatedTotalAmount, //Math.floor(_calculatedTotalAmount),
          })
        }
      } else {
        setisAllAdobt(values)
        setBasicInfoValues({
          ...BasicInfoValues,
          IsAdobtMonth: values,
          TotalAmount: "",
          AmountInPKR: "",
          NoOfMonths: "2",
          Amount: "",
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

  const donateNow = (e) => {
    e.preventDefault()
    let val = 0

    if (BasicInfoValues.NoOfMonths.includes(".")) {
      Swal.fire({
        title: "Error",
        text: "Month should be a digit from 1 to 12",
        icon: "error",
      })
      return
    }
    if (
      activeTab === "monthly" &&
      (BasicInfoValues.NoOfMonths > 12 ||
        BasicInfoValues.NoOfMonths < 2 ||
        !BasicInfoValues.NoOfMonths)
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
      (BasicInfoValues.NoOfDays > 30 ||
        BasicInfoValues.NoOfDays < 2 ||
        !BasicInfoValues.NoOfDays)
    ) {
      Swal.fire({
        title: "Error",
        text: "Days should be between 1 to 30",
        icon: "error",
      })
      return
    }

    if (
      BasicInfoValues.donationType === 0 ||
      BasicInfoValues.donationType === ""
    ) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    }

    if (!BasicInfoValues.Amount) {
      return Swal.fire({
        title: "Error",
        text: "Please enter amount",
        icon: "error",
      })
    }

    if (BasicInfoValues.Amount <= 1) {
      Swal.fire({
        title: "Error",
        text: "Donated amount must be greater than 1.",
        icon: "error",
      })
      return
    }
    if (
      BasicInfoValues.donationType === 0 ||
      BasicInfoValues.donationType === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    } else if (BasicInfoValues.Amount <= 0) {
      Swal.fire({
        title: "Error",
        text: "Donation Amount must be greater than 0",
        icon: "error",
      })
    } else if (
      parseFloat(BasicInfoValues.AmountInPKR) >
      (
        (ApiValues.Remainingamount /
          BasicInfoValues.ConversionRate.toFixed(2)) *
        BasicInfoValues.ConversionRate.toFixed(2)
      ).toFixed(2)
    ) {
      Swal.fire({
        title: "Error",
        text: "Amount in PKR must be less than or equal to remaining amount after conversion.",
        icon: "error",
      })
    } else if (
      BasicInfoValues.IsAdobtMonth &&
      Math.floor(
        BasicInfoValues.IsAdobtMonth && BasicInfoValues.TotalAmount
      ) !==
        Math.floor(
          ApiValues.Remainingamount / BasicInfoValues.ConversionRate.toFixed(2)
        )
    ) {
      if (BasicInfoValues.CurrencyFromSymbol == "PKR") {
        val = ApiValues.Remainingamount - BasicInfoValues.TotalAmount
      } else {
        val =
          ApiValues.Remainingamount / BasicInfoValues.ConversionRate -
          BasicInfoValues.TotalAmount
      }
      BasicInfoValues.currencyName =
        JSON.parse(sessionStorage.getItem("globalSelectedCurrency"))
          .SetupDetailName +
        " - " +
        JSON.parse(sessionStorage.getItem("globalSelectedCurrency")).Flex1
      props.history.push({
        pathname: "/checkout",
        state: {
          ...BasicInfoValues,
          NGOInfo: {
            ...ngoDetails,
            CaseName: ApiValues.Name,
            caseSource,
            isZF: ngoDetails ? false : true,
          },
          fromPath: "caseDetail",
          Amount:
            BasicInfoValues.CurrencyFromSymbol == "PKR"
              ? Math.round(parseFloat(BasicInfoValues.Amount))
              : parseFloat(BasicInfoValues.Amount).toFixed(2),
          Remainder: roundOffAdjustment,
          ConvertAmount: BasicInfoValues.AmountInPKR,
          ExchangeRate: BasicInfoValues.ConversionRate.toFixed(2),
          CurrentCurrencyAmount: parseFloat(
            BasicInfoValues.TotalAmount
          ).toFixed(2),
          CurrentCurrencySymbol: BasicInfoValues.CurrencyFromSymbol,
          caseId: ApiValues.ApplicantCaseId,
          NoOfMonth: BasicInfoValues.NoOfMonths,

          IsAdobt: BasicInfoValues.IsAdobtMonth,
          DonationForId: DonationForTypes.Case_Wise_Donation,
          donationType: BasicInfoValues.donationType,
          TagLineId: ApiValues?.taglineid ? ApiValues?.taglineid : 0,
          DonationSubCategoryid: ApiValues?.donationsubcategoryid
            ? ApiValues?.donationsubcategoryid
            : 0,

          // 🔵 Multiple Frequency params
          TotalCount:
            activeTab === "oneTime"
              ? "1"
              : activeTab === "monthly"
              ? BasicInfoValues.NoOfMonths
              : BasicInfoValues.NoOfDays,
          frequeny:
            activeTab === "oneTime"
              ? 0
              : activeTab === "monthly"
              ? SetupMasterIds.Monthly
              : SetupMasterIds.Daily,
        },
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
          NGOInfo: {
            ...ngoDetails,
            CaseName: ApiValues.Name,
            Heading: ngoDetails?.Heading
              ? ngoDetails?.Heading
              : "Zaman Foundation",
            caseSource,
            isZF: ngoDetails ? false : true,
          },
          fromPath: "caseDetail",
          Amount:
            BasicInfoValues.CurrencyFromSymbol == "PKR"
              ? Math.round(parseFloat(BasicInfoValues.Amount))
              : parseFloat(BasicInfoValues.Amount).toFixed(2),
          Remainder: roundOffAdjustment,
          ConvertAmount: BasicInfoValues.AmountInPKR,
          ExchangeRate: BasicInfoValues.ConversionRate.toFixed(2),
          CurrentCurrencyAmount: parseFloat(
            BasicInfoValues.TotalAmount
          ).toFixed(2),
          CurrentCurrencySymbol: BasicInfoValues.CurrencyFromSymbol,
          caseId: ApiValues.ApplicantCaseId,
          NoOfMonth: BasicInfoValues.NoOfMonths,
          IsAdobt: BasicInfoValues.IsAdobtMonth,
          DonationForId: DonationForTypes.Case_Wise_Donation,
          donationType: BasicInfoValues.donationType,
          TagLineId: ApiValues?.taglineid ? ApiValues?.taglineid : 0,
          DonationSubCategoryid: ApiValues?.donationsubcategoryid
            ? ApiValues?.donationsubcategoryid
            : 0,

          // 🔵 Multiple Frequency params
          TotalCount:
            activeTab === "oneTime"
              ? "1"
              : activeTab === "monthly"
              ? BasicInfoValues.NoOfMonths
              : BasicInfoValues.NoOfDays,
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

  const handleDaysCounter = (counter) => {
    if (BasicInfoValues.NoOfDays == "30" && counter === "increment") {
      return
    }

    if (counter === "increment") {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: (Number(BasicInfoValues.NoOfDays) + 1).toString(),
          isCustom: true,
        },
      })
    }

    if (counter === "decrement") {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: (Number(BasicInfoValues.NoOfDays) - 1).toString(),
          isCustom: true,
        },
      })
    }
  }
  const handleMonthsCounter = (counter) => {
    if (BasicInfoValues.NoOfMonths == "12" && counter === "increment") {
      return
    }

    if (counter === "increment") {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: (Number(BasicInfoValues.NoOfMonths) + 1).toString(),
          isCustom: true,
        },
      })
    }

    if (counter === "decrement") {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: (Number(BasicInfoValues.NoOfMonths) - 1).toString(),
          isCustom: true,
        },
      })
    }
  }
  const handleDaysBlur = () => {
    if (BasicInfoValues.NoOfDays < 2) {
      handleInputChange({
        target: {
          name: "NoOfDays",
          value: "2",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues.NoOfDays > 30) {
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
    if (BasicInfoValues.NoOfMonths < 2) {
      handleInputChange({
        target: {
          name: "NoOfMonths",
          value: "2",
          isCustom: true,
        },
      })
    }
    if (BasicInfoValues.NoOfMonths > 12) {
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
    GetApplicantCaseWise()
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
        BasicInfoValues.ConversionRate = _parseData.result.PKR
        BasicInfoValues.CurrencyFromSymbol = _parseData.base
        setCurrentCurrency({
          ConversionRate: _parseData.result.PKR,
          CurrencyFromSymbol: _parseData.base,
        })
        setBasicInfoValues({ ...BasicInfoValues })
        setLoading(false)
      } else {
        BasicInfoValues.ConversionRate = 1
        BasicInfoValues.CurrencyFromSymbol = "PKR"

        setBasicInfoValues({ ...BasicInfoValues })
        setLoading(false)
      }
    }
    load()
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
          <section id="inner-banner" className="section">
            <div className="container">
              <h1 className="mb-0">
                {/* {title !== undefined ? title : "No Title Found"} */}
                {ApiValues.CaseTitle !== undefined
                  ? ApiValues.CaseTitle
                  : "No Title Found"}
              </h1>
              <h6 className="text-capitalize">
                {ngoDetails?.Heading || "Zaman Foundation"}
              </h6>
            </div>
          </section>
          <section className="section section-casedetail  mb-4">
            <Container>
              <Row>
                <Col md="7">
                  {ApiValues?.ShortDesc && (
                    <h4 className="ramzan-appeal-title pt-0">
                      {ApiValues?.ShortDesc}
                    </h4>
                  )}
                  <div className="desc mb-4">
                    <div>
                      {descCaseCode1 !== undefined
                        ? parse(descCaseCode1)
                        : "No Description Found"}
                    </div>
                    <div>
                      <h5 className="success-title">
                        {ApiValues?.CauseLabel
                          ? parse(ApiValues?.CauseLabel)
                          : "No Applicant Cause"}
                      </h5>
                    </div>

                    <div className="d-flex justify-content-between">
                      <b>
                        {" "}
                        {casecode !== undefined
                          ? parse(casecode)
                          : "No CaseCode Found"}
                      </b>
                      <a
                        className="nav-link"
                        style={{
                          marginTop: "-20px",
                          color: "black",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                        href="#"
                      >
                        Category: {ApiValues.FundType}{" "}
                      </a>
                    </div>
                    <Img
                      src={[
                        baseImageUrl + ApiValues.DocAttachment,
                        CaseDetailDefaultImgPath,
                      ]}
                      loader={<CenteredLoader />}
                      alt={ApiValues.CaseTitle}
                    />
                  </div>
                </Col>
                <Col md="5">
                  {isNGOCase ? (
                    <Card className="cardform">
                      <CardBody className="pt-1">
                        <div className="donation-box">
                          <Row>
                            <Col md={12}>
                              <Progress
                                value={ApiValues.ProgressBar}
                                color="primary"
                                className="mb-2"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div>
                                <ul style={{ marginBottom: "10px" }}>
                                  <li>
                                    <h5 className="success-title text-center mb-3 d-flex align-items-center">
                                      <span>Remaining:</span>{" "}
                                      {/* {remaining !== undefined ? remaining : "0"} */}
                                      {ApiValues.Remainingamount !== undefined
                                        ? ConvertNumricToComaSeparate(
                                            (
                                              ApiValues.Remainingamount /
                                              BasicInfoValues.ConversionRate.toFixed(
                                                2
                                              )
                                            ).toFixed(2)
                                          ) +
                                          " " +
                                          BasicInfoValues.CurrencyFromSymbol
                                        : "0" +
                                          " " +
                                          BasicInfoValues.CurrencyFromSymbol}
                                    </h5>
                                  </li>
                                  <li>
                                    <h5 className="success-title text-center mb-3 d-flex align-items-center">
                                      <span>Raised: </span>
                                      {ApiValues.raised !== undefined
                                        ? ConvertNumricToComaSeparate(
                                            Math.floor(
                                              (
                                                ApiValues.raised /
                                                BasicInfoValues.ConversionRate.toFixed(
                                                  2
                                                )
                                              ).toFixed(2)
                                            )
                                          ) +
                                          " " +
                                          BasicInfoValues.CurrencyFromSymbol
                                        : "0" +
                                          " " +
                                          BasicInfoValues.CurrencyFromSymbol}
                                    </h5>
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                          <form>
                            {upForAdoption && (
                              <Row>
                                <Col md={12}>
                                  <FormGroup>
                                    <div className="form-check-inline mt-2 mb-2">
                                      <Label className="form-check-Label case-details-donation d-flex align-items-center">
                                        <Input
                                          name="IsAdobtMonth"
                                          value={BasicInfoValues.IsAdobtMonth}
                                          checked={BasicInfoValues.IsAdobtMonth}
                                          onChange={handleInputChange}
                                          type="checkbox"
                                          className="form-check-Input custom-input"
                                        />

                                        {BasicInfoValues.IsAdobtMonth === false
                                          ? "Adopt " +
                                            (ApiValues.Name !== undefined
                                              ? parse(ApiValues.Name)
                                              : " No Applicant Name")
                                          : "Adopt " +
                                            (ApiValues.Name !== undefined
                                              ? parse(ApiValues.Name)
                                              : " No Applicant Name ")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            )}
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
                                  value={BasicInfoValues.donationType}
                                  className="appearance-auto"
                                />

                                <FormGroup>
                                  <Row>
                                    <Col md={eligibleForSubs ? 8 : 12}>
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
                                                borderRadius: "4px 0px 0px 4px",
                                                borderRight: "0px",
                                              }}
                                              value={parseFloat(
                                                BasicInfoValues.Amount
                                                  ? parseInt(
                                                      BasicInfoValues.Amount
                                                    ).toFixed(2)
                                                  : 0
                                              )}
                                              isNumber="true"
                                              onChange={handleInputChange}
                                              required={true}
                                              disabled={isAllAdobt}
                                              isDecimal="true"
                                              // type="number"
                                              maxLength="7"
                                            />

                                            <Input
                                              type="text"
                                              value={
                                                BasicInfoValues.CurrencyFromSymbol
                                              }
                                              id="checkout"
                                              disabled
                                              className="pkr-field"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                    {eligibleForSubs && (
                                      <Col md={4}>
                                        <FormGroupInput
                                          label="Months*"
                                          name="NoOfMonths"
                                          value={BasicInfoValues.NoOfMonths}
                                          onChange={handleInputChange}
                                          required={true}
                                          // disabled={isAllAdobt}
                                          isNumeric="true"
                                          maxLength="2"
                                          type="number"
                                        />
                                      </Col>
                                    )}
                                  </Row>
                                  {
                                    // eligibleForSubs &&
                                    !isNGOCase && (
                                      <Row>
                                        <Col md={12}>
                                          <label className="form-label">
                                            Total Amount
                                          </label>
                                          <div className="case-content">
                                            <div className="form-group m-0">
                                              <div className="input-group amount-drop">
                                                <FormGroupInput
                                                  name="TotalAmount"
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
                                                  value={Math.floor(
                                                    BasicInfoValues.TotalAmount
                                                  )}
                                                  disabled={true}
                                                />

                                                <Input
                                                  type="text"
                                                  value={
                                                    BasicInfoValues.CurrencyFromSymbol
                                                  }
                                                  id="checkout"
                                                  disabled
                                                  style={{ width: "20%" }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  }
                                  <Row>
                                    <Col
                                      md={6}
                                      style={{
                                        display:
                                          BasicInfoValues.CurrencyFromSymbol ===
                                          "PKR"
                                            ? "none"
                                            : "block",
                                      }}
                                    >
                                      <FormGroupInput
                                        label="Amount In PKR"
                                        name="AmountInPKR"
                                        value={BasicInfoValues.AmountInPKR}
                                        disabled
                                      />
                                    </Col>
                                    <Col
                                      md={6}
                                      style={{
                                        display:
                                          BasicInfoValues.CurrencyFromSymbol ===
                                          "PKR"
                                            ? "none"
                                            : "block",
                                      }}
                                    >
                                      <FormGroupInput
                                        label="Conversion Rate"
                                        name="ConversionRate"
                                        value={BasicInfoValues.ConversionRate.toFixed(
                                          2
                                        )}
                                        disabled
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>

                                <Button
                                  type="button"
                                  onClick={donateNow}
                                  color="primary"
                                  disabled={ApiValues.buttondisable}
                                >
                                  Donate Now
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </CardBody>
                    </Card>
                  ) : (
                    <Card className="cardform">
                      {eligibleForSubs && (
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
                              className={
                                activeTab === "oneTime" ? "active" : ""
                              }
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
                              className={
                                activeTab === "monthly" ? "active" : ""
                              }
                              onClick={() => {
                                handleTabChange("monthly")
                              }}
                            >
                              <b>Monthly</b>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      )}
                      <TabContent activeTab={activeTab}>
                        {/* 🔴  ONETIME TAB  */}
                        <TabPane tabId="oneTime">
                          <Card className="cardform">
                            <CardBody className="pt-1">
                              <div className="donation-box">
                                <Row>
                                  <Col md={12}>
                                    <Progress className="my-2" multi>
                                      <Progress
                                        color="success"
                                        bar
                                        value={ApiValues.raisedPercentage}
                                      />
                                      <Progress
                                        bar
                                        color="info"
                                        value={
                                          ApiValues.pledge
                                            ? ApiValues.pledgePercentage
                                            : 0
                                        }
                                      />
                                      <Progress
                                        color="light"
                                        value={ApiValues.remainingPercentage}
                                        bar
                                      />
                                    </Progress>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div>
                                      <ul
                                        className="d-flex justify-content-between row"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <div className="d-flex flex-column align-items-start">
                                          <li>
                                            {/* Rounded circle */}

                                            <h5 className="success-title text-center d-flex align-items-center ">
                                              <Badge
                                                color="success"
                                                className="progress-badge mr-1"
                                              >
                                                &nbsp; &nbsp;
                                              </Badge>
                                              <b>Raised: &nbsp;</b>{" "}
                                              <span>
                                                <b>
                                                  {ApiValues.raised !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        Math.floor(
                                                          (
                                                            ApiValues.raised /
                                                            BasicInfoValues.ConversionRate.toFixed(
                                                              2
                                                            )
                                                          ).toFixed(2)
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </b>
                                              </span>
                                            </h5>
                                          </li>
                                          {ApiValues.pledge ? (
                                            <li>
                                              <h5 className="success-title text-center d-flex align-items-center ">
                                                <Badge
                                                  color="info"
                                                  className="progress-badge mr-1"
                                                >
                                                  &nbsp; &nbsp;
                                                </Badge>
                                                <b>Pledged: &nbsp;</b>{" "}
                                                <span>
                                                  {ApiValues.pledge !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        (
                                                          ApiValues.pledge /
                                                          BasicInfoValues.ConversionRate.toFixed(
                                                            2
                                                          )
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </span>
                                              </h5>
                                            </li>
                                          ) : null}
                                        </div>
                                        <li>
                                          <h5 className="success-title text-center mb-3 d-flex align-items-center">
                                            <Badge
                                              color="light"
                                              className="progress-badge mr-1"
                                            >
                                              &nbsp;
                                            </Badge>
                                            <b>Remaining: &nbsp; </b>
                                            {/* {remaining !== undefined ? remaining : "0"} */}
                                            <span>
                                              {ApiValues.Remainingamount !==
                                              undefined
                                                ? ConvertNumricToComaSeparate(
                                                    (
                                                      ApiValues.Remainingamount /
                                                      BasicInfoValues.ConversionRate.toFixed(
                                                        2
                                                      )
                                                    ).toFixed(2)
                                                  ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol
                                                : "0" +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}
                                            </span>
                                          </h5>
                                        </li>
                                      </ul>
                                    </div>
                                  </Col>
                                </Row>

                                <form>
                                  {upForAdoption && (
                                    <Row>
                                      <Col md={12}>
                                        <FormGroup>
                                          <div className="form-check-inline mt-2 mb-2">
                                            <Label className="form-check-Label case-details-donation d-flex align-items-center">
                                              <Input
                                                name="IsAdobtMonth"
                                                value={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                checked={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                onChange={handleInputChange}
                                                type="checkbox"
                                                className="form-check-Input custom-input"
                                              />

                                              {BasicInfoValues.IsAdobtMonth ===
                                              false
                                                ? "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name")
                                                : "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name ")}
                                            </Label>
                                            {/* Information Icon */}
                                            {activeTab === "oneTime" &&
                                            roundOffAdjustment &&
                                            BasicInfoValues.IsAdobtMonth ? (
                                              <>
                                                <i
                                                  className="fa fa-info-circle color-black ml-2"
                                                  id="dailyRoundOffTooltip"
                                                />
                                                <Tooltip
                                                  placement="top"
                                                  isOpen={roundOffooltipOpen}
                                                  target="dailyRoundOffTooltip"
                                                  toggle={toggleRoundOffTooltip}
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
                                                  {roundOffAdjustment &&
                                                  BasicInfoValues.IsAdobtMonth ? (
                                                    <small className="subscribed-months text-primary ml-1">
                                                      Zaman foundation will
                                                      cover the remaining{" "}
                                                      {roundOffAdjustment.toFixed(
                                                        2
                                                      )}{" "}
                                                      PKR
                                                    </small>
                                                  ) : null}
                                                </Tooltip>
                                              </>
                                            ) : null}
                                          </div>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )}
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
                                        value={BasicInfoValues.donationType}
                                        className="appearance-auto"
                                      />

                                      <FormGroup>
                                        <Row>
                                          <Col md={eligibleForSubs ? 7 : 12}>
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
                                                      border:
                                                        "1px solid #f7d1d2",
                                                      color: "#888",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      padding: "8px",
                                                      borderRadius:
                                                        "4px 0px 0px 4px",
                                                      borderRight: "0px",
                                                    }}
                                                    value={parseFloat(
                                                      BasicInfoValues.Amount
                                                        ? parseFloat(
                                                            BasicInfoValues.Amount
                                                          ).toFixed(2)
                                                        : 0
                                                    )}
                                                    isNumber="true"
                                                    onChange={handleInputChange}
                                                    required={true}
                                                    disabled={isAllAdobt}
                                                    isDecimal="true"
                                                    // type="number"
                                                    maxLength="7"
                                                  />

                                                  <Input
                                                    type="text"
                                                    value={
                                                      BasicInfoValues.CurrencyFromSymbol
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
                                            {BasicInfoValues.CurrencyFromSymbol !==
                                              "PKR" &&
                                            BasicInfoValues.Amount ? (
                                              <h5 className="total-pkr-amount ">
                                                <span className="text-primary">
                                                  {" "}
                                                  Total Amount:{" "}
                                                </span>
                                                {ConvertNumricToComaSeparate(
                                                  BasicInfoValues.TotalAmount.toFixed(
                                                    2
                                                  )
                                                ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}
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
                                            disabled={ApiValues.buttondisable}
                                          >
                                            Donate Now
                                          </Button>
                                        </Col>

                                        <Col md={7} sm={12}>
                                          <div>&nbsp;</div>
                                          {BasicInfoValues.AmountInPKR ? (
                                            <h5 className="total-pkr-amount text-lg-right">
                                              <span className="text-primary">
                                                {" "}
                                                Total PKR Amount:{" "}
                                              </span>
                                              {BasicInfoValues.CurrencyFromSymbol ===
                                              "PKR"
                                                ? ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR
                                                    ).toFixed(2)
                                                  )
                                                : ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR -
                                                        roundOffAdjustment
                                                    ).toFixed(2)
                                                  )}

                                              {activeTab === "oneTime" &&
                                              BasicInfoValues.CurrencyFromSymbol !==
                                                "PKR" ? (
                                                <span
                                                  className="help-icon"
                                                  id="CRoneTime"
                                                >
                                                  {activeTab === "oneTime" &&
                                                    BasicInfoValues.CurrencyFromSymbol !==
                                                      "PKR" && (
                                                      <Tooltip
                                                        placement="top"
                                                        isOpen={tooltipOpen}
                                                        target="CRoneTime"
                                                        toggle={toggleTooltip}
                                                        autohide={false}
                                                        style={{
                                                          backgroundColor:
                                                            "#fff",
                                                          color: "#000",
                                                          border:
                                                            "1px solid #000",
                                                          padding: "10px",
                                                          fontSize: "14px",
                                                          borderRadius: "4px",
                                                          boxShadow:
                                                            "0px 0px 5px #000",
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
                                <Row>
                                  <Col md={12}>
                                    <Progress className="my-2" multi>
                                      <Progress
                                        color="success"
                                        bar
                                        value={ApiValues.raisedPercentage}
                                      />
                                      <Progress
                                        bar
                                        color="info"
                                        value={
                                          ApiValues.pledge
                                            ? ApiValues.pledgePercentage
                                            : 0
                                        }
                                      />
                                      <Progress
                                        color="light"
                                        value={ApiValues.remainingPercentage}
                                        bar
                                      />
                                    </Progress>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div>
                                      <ul
                                        className="d-flex justify-content-between row"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <div className="d-flex flex-column align-items-start">
                                          <li>
                                            {/* Rounded circle */}

                                            <h5 className="success-title text-center d-flex align-items-center ">
                                              <Badge
                                                color="success"
                                                className="progress-badge mr-1"
                                              >
                                                &nbsp; &nbsp;
                                              </Badge>
                                              <b>Raised: &nbsp;</b>{" "}
                                              <span>
                                                <b>
                                                  {" "}
                                                  {ApiValues.raised !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        Math.floor(
                                                          (
                                                            ApiValues.raised /
                                                            BasicInfoValues.ConversionRate.toFixed(
                                                              2
                                                            )
                                                          ).toFixed(2)
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </b>
                                              </span>
                                            </h5>
                                          </li>
                                          {ApiValues.pledge ? (
                                            <li>
                                              <h5 className="success-title text-center d-flex align-items-center ">
                                                <Badge
                                                  color="info"
                                                  className="progress-badge mr-1"
                                                >
                                                  &nbsp; &nbsp;
                                                </Badge>
                                                <b>Pledged: &nbsp;</b>{" "}
                                                <span>
                                                  {ApiValues.pledge !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        (
                                                          ApiValues.pledge /
                                                          BasicInfoValues.ConversionRate.toFixed(
                                                            2
                                                          )
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </span>
                                              </h5>
                                            </li>
                                          ) : null}
                                        </div>
                                        <li>
                                          <h5 className="success-title text-center mb-3 d-flex align-items-center">
                                            <Badge
                                              color="light"
                                              className="progress-badge mr-1"
                                            >
                                              &nbsp;
                                            </Badge>
                                            <b>Remaining: &nbsp; </b>

                                            <span>
                                              {ApiValues.Remainingamount !==
                                              undefined
                                                ? ConvertNumricToComaSeparate(
                                                    (
                                                      ApiValues.Remainingamount /
                                                      BasicInfoValues.ConversionRate.toFixed(
                                                        2
                                                      )
                                                    ).toFixed(2)
                                                  ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol
                                                : "0" +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}
                                            </span>
                                          </h5>
                                        </li>
                                      </ul>
                                    </div>
                                  </Col>
                                </Row>

                                <form>
                                  {upForAdoption && (
                                    <Row>
                                      <Col md={12}>
                                        <FormGroup>
                                          <div className="form-check-inline mt-2 mb-2">
                                            <Label className="form-check-Label case-details-donation d-flex align-items-center">
                                              <Input
                                                name="IsAdobtMonth"
                                                value={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                checked={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                onChange={handleInputChange}
                                                type="checkbox"
                                                className="form-check-Input custom-input"
                                              />

                                              {BasicInfoValues.IsAdobtMonth ===
                                              false
                                                ? "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name")
                                                : "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name ")}
                                            </Label>
                                            {/* Information Icon */}
                                            {activeTab === "daily" &&
                                            roundOffAdjustment &&
                                            BasicInfoValues.IsAdobtMonth ? (
                                              <>
                                                <i
                                                  className="fa fa-info-circle color-black ml-2"
                                                  id="dailyRoundOffTooltip"
                                                />
                                                <Tooltip
                                                  placement="top"
                                                  isOpen={roundOffooltipOpen}
                                                  target="dailyRoundOffTooltip"
                                                  toggle={toggleRoundOffTooltip}
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
                                                  {roundOffAdjustment &&
                                                  BasicInfoValues.IsAdobtMonth ? (
                                                    <small className="subscribed-months text-primary ml-1">
                                                      Zaman foundation will
                                                      cover the remaining{" "}
                                                      {roundOffAdjustment.toFixed(
                                                        2
                                                      )}{" "}
                                                      PKR
                                                    </small>
                                                  ) : null}
                                                </Tooltip>
                                              </>
                                            ) : null}
                                          </div>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )}
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
                                        value={BasicInfoValues.donationType}
                                        className="appearance-auto"
                                      />

                                      <FormGroup>
                                        <Row>
                                          <Col md={eligibleForSubs ? 7 : 12}>
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
                                                      border:
                                                        "1px solid #f7d1d2",
                                                      color: "#888",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      padding: "8px",
                                                      borderRadius:
                                                        "4px 0px 0px 4px",
                                                      borderRight: "0px",
                                                    }}
                                                    value={
                                                      BasicInfoValues.CurrencyFromSymbol ===
                                                      "PKR"
                                                        ? parseInt(
                                                            BasicInfoValues.Amount
                                                              ? parseFloat(
                                                                  BasicInfoValues.Amount
                                                                ).toFixed(2)
                                                              : 0
                                                          )
                                                        : parseFloat(
                                                            BasicInfoValues.Amount
                                                              ? parseFloat(
                                                                  BasicInfoValues.Amount
                                                                ).toFixed(2)
                                                              : 0
                                                          )
                                                    }
                                                    isNumber="true"
                                                    onChange={handleInputChange}
                                                    required={true}
                                                    disabled={isAllAdobt}
                                                    isDecimal="true"
                                                    // type="number"
                                                    maxLength="7"
                                                  />

                                                  <Input
                                                    type="text"
                                                    value={
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    }
                                                    id="checkout"
                                                    disabled
                                                    className="pkr-field"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </Col>
                                          {eligibleForSubs && (
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
                                                      BasicInfoValues.NoOfDays <=
                                                      2
                                                    }
                                                    onClick={() => {
                                                      handleDaysCounter(
                                                        "decrement"
                                                      )
                                                    }}
                                                  >
                                                    <i className="fa fa-minus" />
                                                  </button>

                                                  <Input
                                                    type={"number"}
                                                    className="form-control case-counter-input"
                                                    name="NoOfDays"
                                                    value={
                                                      BasicInfoValues.NoOfDays
                                                    }
                                                    onChange={(e) => {
                                                      setBasicInfoValues({
                                                        ...BasicInfoValues,
                                                        NoOfDays:
                                                          e.target.value,
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
                                                      BasicInfoValues.NoOfDays >=
                                                      30
                                                    }
                                                    onClick={() => {
                                                      handleDaysCounter(
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
                                          )}
                                        </Row>
                                      </FormGroup>

                                      {BasicInfoValues?.CurrencyFromSymbol !==
                                        "PKR" && (
                                        <FormGroup>
                                          <Row>
                                            <Col md={12}>
                                              {BasicInfoValues.CurrencyFromSymbol !==
                                                "PKR" &&
                                              BasicInfoValues.TotalAmount ? (
                                                <h5 className="total-pkr-amount ">
                                                  <span className="text-primary">
                                                    {" "}
                                                    Total Amount:{" "}
                                                  </span>
                                                  {ConvertNumricToComaSeparate(
                                                    BasicInfoValues.TotalAmount.toFixed(
                                                      2
                                                    )
                                                  ) +
                                                    " " +
                                                    BasicInfoValues.CurrencyFromSymbol}
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

                                      {BasicInfoValues.Amount ? (
                                        <FormGroup>
                                          <Row>
                                            <Col md={12}>
                                              <p className="subscribed-months text-primary">
                                                Your donation will be split into{" "}
                                                {occurences?.occurences}{" "}
                                                occurences.{" "}
                                                {ConvertNumricToComaSeparate(
                                                  Math.floor(
                                                    BasicInfoValues.Amount
                                                  ).toFixed(2)
                                                ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}{" "}
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
                                            disabled={ApiValues.buttondisable}
                                          >
                                            Donate Now
                                          </Button>
                                        </Col>

                                        <Col md={7} sm={12}>
                                          <div>&nbsp;</div>
                                          {BasicInfoValues.AmountInPKR ? (
                                            <h5 className="total-pkr-amount text-lg-right">
                                              <span className="text-primary">
                                                {" "}
                                                Total PKR Amount:{" "}
                                              </span>
                                              {BasicInfoValues.CurrencyFromSymbol ===
                                              "PKR"
                                                ? ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR
                                                    ).toFixed(2)
                                                  )
                                                : ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR -
                                                        roundOffAdjustment
                                                    ).toFixed(2)
                                                  )}
                                              {BasicInfoValues.CurrencyFromSymbol !==
                                                "PKR" &&
                                              activeTab === "daily" ? (
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
                                                      boxShadow:
                                                        "0px 0px 5px #000",
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
                                                    on{" "}
                                                    {moment().format(
                                                      "DD-MMM-YYYY"
                                                    )}
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
                                  You can manage your subscription through your
                                  Sab Saath account, once subscribed.{" "}
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
                                <Row>
                                  <Col md={12}>
                                    <Progress className="my-2" multi>
                                      <Progress
                                        color="success"
                                        bar
                                        value={ApiValues.raisedPercentage}
                                      />
                                      <Progress
                                        bar
                                        color="info"
                                        value={
                                          ApiValues.pledge
                                            ? ApiValues.pledgePercentage
                                            : 0
                                        }
                                      />
                                      <Progress
                                        color="light"
                                        value={ApiValues.remainingPercentage}
                                        bar
                                      />
                                    </Progress>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div>
                                      <ul
                                        className="d-flex justify-content-between row"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <div className="d-flex flex-column align-items-start">
                                          <li>
                                            {/* Rounded circle */}

                                            <h5 className="success-title text-center d-flex align-items-center ">
                                              <Badge
                                                color="success"
                                                className="progress-badge mr-1"
                                              >
                                                &nbsp; &nbsp;
                                              </Badge>
                                              <b>Raised: &nbsp;</b>{" "}
                                              <span>
                                                <b>
                                                  {ApiValues.raised !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        Math.floor(
                                                          (
                                                            ApiValues.raised /
                                                            BasicInfoValues.ConversionRate.toFixed(
                                                              2
                                                            )
                                                          ).toFixed(2)
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </b>
                                              </span>
                                            </h5>
                                          </li>
                                          {ApiValues.pledge ? (
                                            <li>
                                              <h5 className="success-title text-center d-flex align-items-center ">
                                                <Badge
                                                  color="info"
                                                  className="progress-badge mr-1"
                                                >
                                                  &nbsp; &nbsp;
                                                </Badge>
                                                <b>Pledged: &nbsp;</b>{" "}
                                                <span>
                                                  {ApiValues.pledge !==
                                                  undefined
                                                    ? ConvertNumricToComaSeparate(
                                                        (
                                                          ApiValues.pledge /
                                                          BasicInfoValues.ConversionRate.toFixed(
                                                            2
                                                          )
                                                        ).toFixed(2)
                                                      ) +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    : "0" +
                                                      " " +
                                                      BasicInfoValues.CurrencyFromSymbol}
                                                </span>
                                              </h5>
                                            </li>
                                          ) : null}
                                        </div>
                                        <li>
                                          <h5 className="success-title text-center mb-3 d-flex align-items-center">
                                            <Badge
                                              color="light"
                                              className="progress-badge mr-1"
                                            >
                                              &nbsp;
                                            </Badge>
                                            <b>Remaining: &nbsp; </b>
                                            {/* {remaining !== undefined ? remaining : "0"} */}
                                            <span>
                                              {ApiValues.Remainingamount !==
                                              undefined
                                                ? ConvertNumricToComaSeparate(
                                                    (
                                                      ApiValues.Remainingamount /
                                                      BasicInfoValues.ConversionRate.toFixed(
                                                        2
                                                      )
                                                    ).toFixed(2)
                                                  ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol
                                                : "0" +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}
                                            </span>
                                          </h5>
                                        </li>
                                      </ul>
                                    </div>
                                  </Col>
                                </Row>

                                <form>
                                  {upForAdoption && (
                                    <Row>
                                      <Col md={12}>
                                        <FormGroup>
                                          <div className="form-check-inline mt-2 mb-2">
                                            <Label className="form-check-Label case-details-donation d-flex align-items-center">
                                              <Input
                                                name="IsAdobtMonth"
                                                value={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                checked={
                                                  BasicInfoValues.IsAdobtMonth
                                                }
                                                onChange={handleInputChange}
                                                type="checkbox"
                                                className="form-check-Input custom-input"
                                              />

                                              {BasicInfoValues.IsAdobtMonth ===
                                              false
                                                ? "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name")
                                                : "Adopt " +
                                                  (ApiValues.Name !== undefined
                                                    ? parse(ApiValues.Name)
                                                    : " No Applicant Name ")}
                                            </Label>
                                            {/* Information Icon */}
                                            {activeTab === "monthly" &&
                                            roundOffAdjustment &&
                                            BasicInfoValues.IsAdobtMonth ? (
                                              <>
                                                <i
                                                  className="fa fa-info-circle color-black ml-2"
                                                  id="monthlyRoundOffTooltip"
                                                />
                                                <Tooltip
                                                  placement="top"
                                                  isOpen={roundOffooltipOpen}
                                                  target="monthlyRoundOffTooltip"
                                                  toggle={toggleRoundOffTooltip}
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
                                                  {roundOffAdjustment &&
                                                  BasicInfoValues.IsAdobtMonth ? (
                                                    <small className="subscribed-months text-primary ml-1">
                                                      Zaman foundation will
                                                      cover the remaining{" "}
                                                      {roundOffAdjustment.toFixed(
                                                        2
                                                      )}{" "}
                                                      PKR
                                                    </small>
                                                  ) : null}
                                                </Tooltip>
                                              </>
                                            ) : null}
                                          </div>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )}
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
                                        value={BasicInfoValues.donationType}
                                        className="appearance-auto"
                                      />

                                      <FormGroup>
                                        <Row>
                                          <Col md={eligibleForSubs ? 7 : 12}>
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
                                                      border:
                                                        "1px solid #f7d1d2",
                                                      color: "#888",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      padding: "8px",
                                                      borderRadius:
                                                        "4px 0px 0px 4px",
                                                      borderRight: "0px",
                                                    }}
                                                    value={parseFloat(
                                                      BasicInfoValues.Amount
                                                        ? parseFloat(
                                                            BasicInfoValues.Amount
                                                          ).toFixed(2)
                                                        : 0
                                                    )}
                                                    isNumber="true"
                                                    onChange={handleInputChange}
                                                    required={true}
                                                    disabled={isAllAdobt}
                                                    isDecimal="true"
                                                    // type="number"
                                                    maxLength="7"
                                                  />

                                                  <Input
                                                    type="text"
                                                    value={
                                                      BasicInfoValues.CurrencyFromSymbol
                                                    }
                                                    id="checkout"
                                                    disabled
                                                    className="pkr-field"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </Col>
                                          {eligibleForSubs && (
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
                                                        BasicInfoValues.NoOfMonths <=
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
                                                        BasicInfoValues.NoOfMonths
                                                      }
                                                      onChange={(e) => {
                                                        setBasicInfoValues({
                                                          ...BasicInfoValues,
                                                          NoOfMonths:
                                                            e.target.value,
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
                                                        BasicInfoValues.NoOfMonths >=
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
                                          )}
                                        </Row>
                                      </FormGroup>
                                      <FormGroup>
                                        <Row>
                                          <Col md={12} sm={12}>
                                            {BasicInfoValues.CurrencyFromSymbol !==
                                              "PKR" &&
                                            BasicInfoValues.Amount ? (
                                              <h5 className="total-pkr-amount ">
                                                <span className="text-primary">
                                                  {" "}
                                                  Total Amount:{" "}
                                                </span>

                                                {ConvertNumricToComaSeparate(
                                                  BasicInfoValues.TotalAmount.toFixed(
                                                    2
                                                  )
                                                ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}
                                              </h5>
                                            ) : null}
                                          </Col>
                                        </Row>
                                      </FormGroup>

                                      {BasicInfoValues.Amount ? (
                                        <FormGroup>
                                          <Row>
                                            <Col md={12}>
                                              <p className="subscribed-months text-primary">
                                                Your donation will be split into{" "}
                                                {occurences?.occurences}{" "}
                                                occurences.{" "}
                                                {ConvertNumricToComaSeparate(
                                                  Math.floor(
                                                    BasicInfoValues.Amount
                                                  ).toFixed(2)
                                                ) +
                                                  " " +
                                                  BasicInfoValues.CurrencyFromSymbol}{" "}
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
                                            disabled={ApiValues.buttondisable}
                                          >
                                            Donate Now
                                          </Button>
                                        </Col>
                                        <Col md={7} sm={12}>
                                          <div>&nbsp;</div>
                                          {BasicInfoValues.AmountInPKR ? (
                                            <h5 className="total-pkr-amount text-lg-right">
                                              <span className="text-primary">
                                                {" "}
                                                Total PKR Amount:{" "}
                                              </span>
                                              {BasicInfoValues.CurrencyFromSymbol ===
                                              "PKR"
                                                ? ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR
                                                    ).toFixed(2)
                                                  )
                                                : ConvertNumricToComaSeparate(
                                                    Math.floor(
                                                      BasicInfoValues.AmountInPKR -
                                                        roundOffAdjustment
                                                    ).toFixed(2)
                                                  )}
                                              {BasicInfoValues.CurrencyFromSymbol !==
                                                "PKR" &&
                                              activeTab === "monthly" ? (
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
                                                        border:
                                                          "1px solid #000",
                                                        padding: "10px",
                                                        fontSize: "14px",
                                                        borderRadius: "4px",
                                                        boxShadow:
                                                          "0px 0px 5px #000",
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
                                  You can manage your subscription through your
                                  Sab Saath account, once subscribed.{" "}
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
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      )}

      <HomeFooter
        hideFooter={
          caseSource === SetupMasterIds.ZamanFoundation ||
          caseSource === SetupMasterIds.ZamanFoundationNGO
            ? false
            : true
        }
        bankContent={
          ngoDetails?.BankName &&
          caseSource !== SetupMasterIds.ZamanFoundation &&
          caseSource !== SetupMasterIds.ZamanFoundationNGO
            ? ngoDetails?.BankName
            : null
        }
      />
    </div>
  )
}

export default CaseDetail
