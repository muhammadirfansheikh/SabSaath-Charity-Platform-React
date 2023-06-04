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
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
  objCurrrency,
} from "utils/CommonMethods.js"
import Swal from "sweetalert2"
import { SetupMasterIds } from "utils/Constants.js"
import CenteredLoader from "components/GeneralComponent/CenteredLoader.jsx"

const QuickDonate = (props) => {
  // Get query string from url
  const urlParams = new URLSearchParams(window.location.search)
  const donationType = parseInt(urlParams.get("id"))
  const donationName = urlParams.get("name")
  const amount = parseFloat(urlParams.get("amount"))
  const currency = parseFloat(urlParams.get("currency"))
  const AmountInPKR = parseFloat(urlParams.get("amountinpkr"))
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  const [stateObj, setStateObj] = useState({})
  const [loading, setLoading] = useState(true)

  const GetCurrency = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.Currency, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
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
    const load = async () => {
      await GetCurrency()
      //Display in Currency name Text Box
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData?.Flex1,
        "PKR"
      )
      selectedcurrencyValues.currency = _SessionData.SetupDetailId
      if (_CurrencyData.Response) {
        let _parseData = JSON.parse(_CurrencyData.Data)
        selectedcurrencyValues.ConversionRate = _parseData.result.PKR
        selectedcurrencyValues.CurrencyFromSymbol = _parseData.base
        setselectedcurrencyValues({ ...selectedcurrencyValues })
        setLoading(false)
      }
    }
    load()
  }, [])
  console.log( selectedcurrencyValues)

  useEffect(() => {
    setStateObj({
      ...stateObj,
      donationType: donationType,
      donationName: donationName,
      Amount: Math.round(AmountInPKR / selectedcurrencyValues.ConversionRate),
      AmountInPKR: AmountInPKR,
      ConversionRate: selectedcurrencyValues.ConversionRate,
      ConvertAmount: Math.round(AmountInPKR / selectedcurrencyValues.ConversionRate),
      CurrencyFromSymbol: selectedcurrencyValues.CurrencyFromSymbol,
      CurrencytoSymbol: "PKR",
      CurrentCurrencyAmount:
      Math.round(AmountInPKR / selectedcurrencyValues.ConversionRate),
      CurrentCurrencySymbol: selectedcurrencyValues.CurrencyFromSymbol,
      DonationForid: 725,
      ExchangeRate: selectedcurrencyValues.ConversionRate,
      IsAdobt: false,
      IsAdobtMonth: false,
      NoofMonth: 1,
      NoOfMonths: 1,
      OperationID: 1,
      Quantity: 0,
      TotalCount: 1,
      currencyType: selectedcurrencyValues.currency,
      caseId: 0,
      TagLineId: 1071,
      DonationSubCategoryid: 729,
    })
  }, [selectedcurrencyValues, AmountInPKR, donationType, donationName])

  const DonateNow = () => {
    props.history.push({
      pathname: "/checkout",
      state: stateObj, // your data array of objects
    })
  }

  return (
    <div className="maincontent">
      <HomeHeader isShow={true}  />

      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Quick Donate</h1>
          </div>
        </section>
        {loading ? (
          <CenteredLoader />
        ) : ( 
          <section className="section">
            <div className="container">
              <Row>
                <Col></Col>
                <Col md={8}>
                  <Card className="cardform">
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md={12} className="text-center mb-3">
                            <h2>Quick Donate</h2>
                            <hr />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={12}>
                            <FormGroup>
                              <Label for="">Donation Type</Label>
                              <Input
                                name="select"
                                type="text"
                                value={
                                  donationName !== undefined ? donationName : ""
                                }
                                disabled
                              ></Input>
                            </FormGroup>
                          </Col>

                          <Col md={12}>
                            <FormGroup>
                              <Label for="">Currency Type</Label>
                              <Input
                                name="text"
                                type="text"
                                value={
                                  stateObj.CurrentCurrencySymbol
                                    ? stateObj.CurrentCurrencySymbol
                                    : ""
                                  //currencyName !== undefined ? currencyName : ""
                                }
                                disabled
                              />
                            </FormGroup>
                          </Col>

                          <Col md={12}>
                            <FormGroup>
                              <Label for="">Amount</Label>
                              <Input
                                id=""
                                type="text"
                                //value={amount !== undefined ? amount : ""}
                                value={stateObj.Amount ? Math.round(stateObj.Amount) : ""}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <Button
                              style={{ width: "100%" }}
                              color="primary"
                              onClick={DonateNow}
                              type="button"
                            >
                              Donate
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </div>
          </section>
        )}
      </div>
      <HomeFooter />
    </div>
  )
}

export default QuickDonate
