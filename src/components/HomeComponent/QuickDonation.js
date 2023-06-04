import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import React, { useState, useEffect } from "react"
import Select from "react-select"
import { Link } from "react-router-dom"
import { Button, ButtonGroup, Col, Container, Input, Row } from "reactstrap"
import Swal from "sweetalert2"
import {
  GetCurrency_ExchangeRate,
  GetSetupMaster,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"
import { SetupMasterIds } from "utils/Constants"
import HomeHeader from "components/Header/HomeHeader"
import cancelbutton from "../../assets/img/home/icon2/cross-sign.png"

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

const QuickDonation = (proplink) => {
  const controls = proplink?.controls
  const btnClose = proplink?.btnClose
  const passingData = proplink.proplink
  const [rSelected, setRselected] = useState([])
  const [loading, setLoading] = useState(true)
  const [generalDonationddl, setGeneralDonationddl] = useState([])
  const [currencyddl, setCurrencyddl] = useState([])
  const [generalDonation, setGeneralDonation] = useState(0)
  const [generalDonationName, setGeneralDonationName] = useState()
  const [currency, setCurrency] = useState(0)
  const [currencyName, setCurrencyName] = useState("")
  const [globalCurrency, setglobalCurrency] = useState(null)
  const [amount, setAmount] = useState(0)
  const [ExchangeRate, setExchangeRate] = useState(0)
  const [sectionShow, setSectionShow] = useState(true)
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  const [amounts, setAmounts] = useState(fixedAmounts.PKR)
  const [isFixed, setIsFixed] = useState(true)

  function onRadioBtnClick(id) {
    setRselected({ id })
  }

  let paramater = {
    Amount: rSelected.id !== null ? rSelected.id : amount,
    AmountInPKR: amount * selectedcurrencyValues.ConversionRate,
    ConversionRate: selectedcurrencyValues.ConversionRate,
    ConvertAmount: amount * selectedcurrencyValues.ConversionRate,
    CurrencyFromSymbol: "PKR",
    CurrencytoSymbol: "PKR",
    CurrentCurrencyAmount: amount,
    CurrentCurrencySymbol: selectedcurrencyValues.CurrencyFromSymbol,
    DonationForid: 725,
    ExchangeRate: selectedcurrencyValues.ConversionRate,
    IsAdobt: false,
    IsAdobtMonth: false,
    NoofMonth: 1,
    NoOfMonths: 1,
    OperationID: 1,
    Quantity: 0,
    donationId: generalDonation,
    donationName: generalDonationName,
    Currency: selectedcurrencyValues.currency, //currency id,
  }
  const handleInputChange = (event) => {
    setglobalCurrency(event)

    sessionStorage.setItem("globalSelectedCurrency", JSON.stringify(event))
    global.sessionUpdate = !global.sessionUpdate

    window.location.reload()
  }
  const GetGeneralDonation = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.GeneralDonation, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          setGeneralDonationddl(data.data)
          setGeneralDonation(data.data[0].SetupDetailId) //For Apply Pres select value
          setGeneralDonationName(data.data[0].SetupDetailName)
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

          // if(sessionStorage.getItem('globalSelectedCurrency') === undefined || sessionStorage.getItem('globalSelectedCurrency') === null)
          // {
          //   global.sessionUpdate = true;

          //     let selectedCurrencyAccordingRegionIp= sortings.filter(x => x.Flex1 == sessionStorage.getItem('geoLocationcurrencyCode'));
          //     if(selectedCurrencyAccordingRegionIp.length > 0)
          //     {
          //       sessionStorage.setItem('globalSelectedCurrency',JSON.stringify(selectedCurrencyAccordingRegionIp[0]) );
          //       setglobalCurrency(JSON.parse( sessionStorage.getItem('globalSelectedCurrency')));

          //     }

          // }
          // else
          // {
          //   setglobalCurrency(JSON.parse(sessionStorage.getItem('globalSelectedCurrency')));
          // }

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
  const DonationFunc = (e) => {
    setGeneralDonation(e.target.value)
    setGeneralDonationName(e.target.options[e.target.selectedIndex].text)
  }
  const CurrencyFunc = (e) => {
    setCurrency(e.target.value)
    setCurrencyName(e.target.options[e.target.selectedIndex].text)
    var currencyRate = e.target.options[e.target.selectedIndex].text
    const GetCurrency_ExchangeRateValue = async () => {
      try {
        if (currencyRate !== "Select") {
          var data = await GetCurrency_ExchangeRate(currencyRate)
          if (data?.Response === true) {
            setExchangeRate(data.Data)
            return data
          } else {
            Swal.fire({
              title: "Error",
              text: data?.Data,
              icon: "error",
            })
            setCurrency("")
            return []
          }
        } else {
        }
      } catch (error) {
        return []
      }
    }
    GetCurrency_ExchangeRateValue()
  }
  const QuickDonate = () => {
    var selectedAmount = paramater.Amount === undefined ? 0 : paramater.Amount
    if (generalDonation === "" || generalDonation === 0) {
      Swal.fire({
        title: "Error",
        text: "Please Select Donation Type",
        icon: "error",
      })
    } else if (selectedAmount <= 0 || parseInt(paramater.Amount) <= 1) {
      Swal.fire({
        title: "Error",
        text: "Donation Amount must be greater than 1",
        icon: "error",
      })
    } else {
      paramater.Amount = paramater.Amount
      paramater.AmountInPKR = paramater.Amount * paramater.ConversionRate
      paramater.CurrencyFromSymbol = paramater.CurrentCurrencySymbol
      const amountinpkr = paramater.AmountInPKR
      const amount = paramater.Amount
      const donationId = generalDonation
      const donationName = generalDonationName
      const currency = selectedcurrencyValues.CurrencyFromSymbol
      const isSuggestedAmount =
        amount == amounts[0] || amount == amounts[1] || amount == amounts[2]
          ? "true"
          : "false"
      //paramater.currencyName =  JSON.parse(sessionStorage.getItem('globalSelectedCurrency')).SetupDetailName+" - " +JSON.parse(sessionStorage.getItem('globalSelectedCurrency')).Flex1;
      passingData.history.push({
        pathname: "/subscription-quick-donate",
        state: paramater, // your data array of object
        search: `?currency=${currency}&amount=${amount}&amountinpkr=${amountinpkr}&id=${donationId}&name=${donationName}&isSuggestedAmount=${isSuggestedAmount}`,
      })
    }
  }
  useEffect(() => {
    GetGeneralDonation()
    const load = async () => {
      await GetCurrency()
      //Display in Currency name Text Box
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )
      selectedcurrencyValues.currency = _SessionData.SetupDetailId
      if (_CurrencyData.Response) {
        let _parseData = JSON.parse(_CurrencyData.Data)
        selectedcurrencyValues.ConversionRate = _parseData.result.PKR
        selectedcurrencyValues.CurrencyFromSymbol = _parseData.base

        setglobalCurrency([
          JSON.parse(sessionStorage.getItem("globalSelectedCurrency")),
        ])
        setselectedcurrencyValues({ ...selectedcurrencyValues })
      } else {
        setglobalCurrency([
          JSON.parse(sessionStorage.getItem("globalSelectedCurrency")),
        ])
      }
      setLoading(false)
    }

    load()
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

  const btnClickClose = () => {
    setSectionShow(false)
  }
  return (
    <>
      {/* {sectionShow === true ? */}
      <section
        className="section section-domain"
        style={{
          position: sectionShow === false ? "unset" : controls.position,
          bottom: controls.bottom,
          width: controls.width,
          zIndex: controls.zIndex,
        }}
      >
        <Container>
          <Row>
            <Col md={11} sm={11} xs={10}>
              <h4
                className="enter-domain-title mb-2 font-weight-bold"
                style={{ color: "white" }}
              >
                Quick Donation
              </h4>
            </Col>
            {btnClose && btnClose === true ? (
              sectionShow === true ? (
                <Col md={1} sm={1} xs={2}>
                  <Button onClick={btnClickClose} className="text-right" close>
                    {/*  <i className="fa fa-close"></i>  */}
                    <img src={cancelbutton} alt="" />
                  </Button>
                </Col>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Row>
          <Row>
            <Col lg="2" md="6">
              <div className="form-group">
                <select
                  className="form-control form-select"
                  value={generalDonation}
                  onChange={DonationFunc}
                  style={{
                    appearance: "auto",
                  }}
                >
                  {/* <option value="">Select Donation Type</option> */}
                  {generalDonationddl &&
                    generalDonationddl.map((item) => (
                      <option value={item.SetupDetailId} key={item.SerialNo}>
                        {item.SetupDetailName}
                      </option>
                    ))}
                </select>
              </div>
            </Col>
            <Col lg="1" md="6" className="col">
              <div
                className="form-group quick-donation pl-md-3 pl-sm-0"
                style={{
                  width: "150px",
                }}
              >
                <div style={{ width: "100%", zIndex: 10 }}>
                  <Select
                    placeholder="Currency"
                    closeMenuOnSelect
                    id="currency-select"
                    getOptionValue={(option) => option.SetupDetailId} // changes here!!!
                    value={globalCurrency}
                    options={currencyddl}
                    onChange={handleInputChange}
                    menuPlacement="top"
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 10,
                      }),
                      control: (provided) => ({
                        ...provided,
                        zIndex: 10,
                      }),
                      option: (provided) => ({
                        ...provided,
                        zIndex: 10,
                      }),
                      input: (provided) => ({
                        ...provided,
                        height: 30,
                        zIndex: 10,
                      }),
                    }}
                    getOptionLabel={(e) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          zIndex: 10,
                        }}
                      >
                        <span class={e.Flex3}></span>
                        <span style={{ marginLeft: 5 }}>{e.Flex1}</span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </Col>

            <Col lg="3" md="6" className="ml-lg-5">
              <div className="form-group">
                <ButtonGroup className="donation">
                  <Button
                    onClick={(e) =>
                      onRadioBtnClick(e.target.innerText.replace(/,/g, ""))
                    }
                    active={rSelected === 1}
                    disabled={loading}
                  >
                    {loading
                      ? "..."
                      : isFixed
                      ? ConvertNumricToComaSeparate(amounts[0])
                      : ConvertNumricToComaSeparate(
                          Math.round(
                            amounts[0] /
                              selectedcurrencyValues.ConversionRate.toFixed(2)
                          )
                        )}

                    {/*   18,900 */}
                  </Button>

                  <Button
                    onClick={(e) =>
                      onRadioBtnClick(e.target.innerText.replace(/,/g, ""))
                    }
                    active={rSelected === 1}
                    disabled={loading}
                  >
                    {loading
                      ? "..."
                      : isFixed
                      ? ConvertNumricToComaSeparate(amounts[1])
                      : ConvertNumricToComaSeparate(
                          Math.round(
                            amounts[1] /
                              selectedcurrencyValues.ConversionRate.toFixed(2)
                          )
                        )}

                    {/* 1,000   18,900 */}
                  </Button>

                  <Button
                    onClick={(e) =>
                      onRadioBtnClick(e.target.innerText.replace(/,/g, ""))
                    }
                    disabled={loading}
                    active={rSelected === 1}
                  >
                    {loading
                      ? "..."
                      : isFixed
                      ? ConvertNumricToComaSeparate(amounts[2])
                      : ConvertNumricToComaSeparate(
                          Math.round(
                            amounts[2] /
                              selectedcurrencyValues.ConversionRate.toFixed(2)
                          )
                        )}

                    {/* 3,000   18,900 */}
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
            <Col lg="2" md="6">
              <div className="form-group">
                <FormGroupInput
                  className="form-control"
                  placeholder="Other"
                  isNumber="true"
                  value={rSelected?.id}
                  maxLength="8"
                  onChange={(e) => {
                    setRselected({ ...rSelected, id: e.target.value })
                  }}
                  // key={rSelected.id}
                />
              </div>
            </Col>
            <Col lg="2" md="12">
              <div className="form-group">
                <Button
                  onClick={QuickDonate}
                  color="btn btn-primary btn-quickdonate m-0"
                >
                  Donate Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* : "" } */}
    </>
  )
}

export default QuickDonation
