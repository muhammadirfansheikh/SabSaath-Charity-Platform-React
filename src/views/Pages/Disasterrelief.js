import React, { useState, useEffect } from "react"
import { Col, Container, Row, Card } from "reactstrap"
import { Link } from "react-router-dom"
// import Swal from 'sweetalert2';
// import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl, casedetail_p } from "utils/Api"
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import qurbanibanner from "../../assets/img/home/PakFloodRelef2022.jpg"
import qurbanibotombanner from "../../assets/img/home/PakFloodRelef2022_bottom.jpg"
import {
  Get_All_Relief,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"

const Disasterrelief = (props) => {
  const [allRelief, setAllRelief] = useState([])
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)

  const GetAllFoodRelief = async () => {
    try {
      var data = await Get_All_Relief(0, 0)
      console.log(data, "Get_All_Relief")
      if (data != null) {
        setAllRelief(data.Table)
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  useEffect(() => {
    GetAllFoodRelief()
    const load = async () => {
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )

      if (_CurrencyData.Response) {
        let _parseData = JSON.parse(_CurrencyData.Data)
        selectedcurrencyValues.ConversionRate = _parseData.result.PKR
        selectedcurrencyValues.CurrencyFromSymbol = _parseData.base

        setselectedcurrencyValues({ ...selectedcurrencyValues })
      } else {
      }
    }
    load()
  }, [])
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <section
        id="inner-banner"
        className="section"
        style={{ backgroundImage: `url(${qurbanibanner})` }}
      >
        <div className="container">
          <h4 className="mb-0">Pakistan Flood Relief 2022</h4>
          
        </div>
      </section>
      <section className="section section-meals pt-5 pb-4">
        <Container>
          <Row>
            {allRelief &&
              allRelief
                .filter((x) => x.ConstantValue === SetupMasterIds.DisasterRelif)
                .map((items, key) => (
                  <Col lg="4" md="4" sm="12" key={key}>
                    <Card body>
                      <div className="donation-box text-center">
                        <div className="" style={{ minHeight: "271px" }}>
                          <img
                            src={baseImageUrl + items.Images}
                            width="150"
                            alt=""
                          />
                          <h3 className="text-center mt-2  mb-2">
                            {items.SetupDetailName}{" "}
                          </h3>
                          <p className="text-center qurbari-booking mb-0">
                            {items.tagline} <br></br>
                          </p>
                        </div>
                        {items.donationsubcategoryid ===
                        SetupMasterIds.Rebuil_A_Comunity ? (
                          <Link
                            to={{
                              pathname: casedetail_p,
                              state: items, // your data array of objects
                            }}
                            className="btn mt-3 btn-primary"
                          >
                            Donate
                          </Link>
                        ) : (
                          <Link
                            to={{
                              pathname: "/DisasterReliefDonate",
                              state: items, // your data array of objects
                            }}
                            className="btn mt-3 btn-primary"
                            onClick={() => {
                              localStorage.setItem(
                                "props",
                                JSON.stringify(items)
                              )
                            }}
                          >
                            {/* Donate PKR {items.amount} */}
                            Donate PKR{" "}
                            {ConvertNumricToComaSeparate(
                              (
                                items.amount /
                                selectedcurrencyValues.ConversionRate.toFixed(2)
                              ).toFixed(2)
                            ) +
                              " " +
                              selectedcurrencyValues.CurrencyFromSymbol}
                          </Link>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))}
          </Row>
          <Row>
            <Col>
              <ul>
                <li>
                  <h6 className="meals-title mb-2 text">
                    *Average number of members per househould is 8
                  </h6>
                </li>
                <li>
                  <h6 className="meals-title mb-2 text">
                    Money for food rations will be disbursed to verified
                    families via instant electronic payments
                  </h6>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="bottom-banner mt-4 mb-4">
                <img src={qurbanibotombanner} alt="SabSaath" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <div
                className="mb-5"
                style={{
                  backgroundColor: "#d60b11",
                  display: "inline-block",
                  padding: "4px 20px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h3>
                  100% of your donations go to charity. Private donors cover our
                  administrative costs.
                </h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <HomeFooter />
    </div>
  )
}

export default Disasterrelief
