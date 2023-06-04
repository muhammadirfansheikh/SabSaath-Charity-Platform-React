import React, { useState, useEffect } from "react"
import { Col, Container, Row, Card, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
// import Swal from 'sweetalert2';
// import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl, casedetail_p } from "utils/Api"
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import ramazanbanner from "../../assets/img/ramzanTopBanner.jpg"
import ramazanbottombanner from "../../assets/img/ramzanBottomBanner.jpg"
import {
  FastForex_FetchOnlyOne,
  objCurrrency,
  Get_All_FeaturedNGOs,
  NGOController,
} from "utils/CommonMethods"
import CampaignCard from "components/HomeComponent/CampaignCard.js"
import QuickDonation from "components/HomeComponent/QuickDonation.js"
import FeaturedNGOsCard from "components/FeaturedNGOsCard.js"

const FeaturedNGOs = (props) => {
  const initialValues = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: "999",
    display: "block",
  }
  const [allCards, setAllCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [basicInfo, setBasicInfo] = useState(initialValues)
  const [btnClose, setBtnClose] = useState(true)
  const [show, setShow] = useState(false)

  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)

  const GetFeaturedNGOsDetails = async () => {
    setLoading(true)
    try {
      var data = await NGOController(0, 4)
      if (data != null) {
        setAllCards(data?.Table)
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
    GetFeaturedNGOsDetails()
    const load = async () => {
      setLoading(true)
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
        setLoading(false)
        setselectedcurrencyValues({ ...selectedcurrencyValues })
      } else {
      }
    }
    load()
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShow(true)
        setBtnClose(true)
        setBasicInfo({
          ...basicInfo,
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "999",
          display: "block",
        })
      } else {
        setShow(false)
        setBtnClose(false)
        setBasicInfo({
          ...basicInfo,
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "999",
          display: "none",
        })
      }
    })
  }, [])
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <section id="inner-banner" className="section">
        <div className="container ">
          <h2 className="mb-0  ml-lg-5">Featured NGOs</h2>
        </div>
      </section>
      {show && (
        <QuickDonation
          proplink={props}
          controls={basicInfo}
          btnClose={btnClose}
        />
      )}
      <section className="section section-meals pt-5 pb-4">
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
          <Container>
            <Row>
              {allCards &&
                allCards.map((items, key) => {
                  return (
                    <FeaturedNGOsCard
                      items={items}
                      key={key}
                      selectedcurrencyValues={selectedcurrencyValues}
                    />
                  )
                })}
            </Row>

            <Row>
              <Col className="text-center">
                <div
                  className="mb-5 mt-5"
                  style={{
                    backgroundColor: "#d60b11",
                    display: "inline-block",
                    padding: "4px 20px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <h3>
                    100% of your donations go to charity. Private donors cover
                    our administrative costs.
                  </h3>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
      <HomeFooter />
    </div>
  )
}

export default FeaturedNGOs
