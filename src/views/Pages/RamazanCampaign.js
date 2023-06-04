import React, { useState, useEffect } from "react"
import { Col, Container, Row, Card, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
// import Swal from 'sweetalert2';
// import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl, casedetail_p } from "utils/Api"
//import qurbani from     "../assets/img/home/Qurbani.png";
import { DefaultImgPath, SetupMasterIds } from "../../utils/Constants.js"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import ramazanbanner from "../../assets/img/ramzanTopBanner.jpg"
import ramazanbottombanner from "../../assets/img/ramzanBottomBanner.jpg"
import {
  Get_All_Relief,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
  Get_All_Ramazan_Campaign,
} from "utils/CommonMethods"
import CampaignCard from "components/HomeComponent/CampaignCard.js"
import QuickDonation from "components/HomeComponent/QuickDonation.js"
import { Img } from "react-image"
import CenteredLoader from "components/GeneralComponent/CenteredLoader.jsx"

const RamazanCampaign = (props) => {
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
  const [ngo, setNgo] = useState(null)
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)

  // Lifting state from HomeHeader.
  const pickNGOsData = (data) => {
    if (data) {
      const ZamanFoundationNGO = data.Table.find(
        (item) => item.NGOFeatureID === SetupMasterIds.ZamanFoundationNGO
      )
      const Certifications = ZamanFoundationNGO?.RACEInfo
        ? ZamanFoundationNGO.RACEInfo.split(",").map(Number)
        : []
      let zfCertifications
      if (Certifications.length > 0) {
        //  Find certications from the array
        const allCertifications = data.Table1
        const filteredCertifications = allCertifications.filter((item) =>
          Certifications.includes(item.SetupDetailId)
        )
        zfCertifications = filteredCertifications
      } else {
        zfCertifications = null
      }
      setNgo({
        details: ZamanFoundationNGO,
        certifications: zfCertifications,
      })
    }
  }

  const GetRamazanCampaignDetails = async () => {
    setLoading(true)
    try {
      var data = await Get_All_Ramazan_Campaign(0, 0)
      if (data != null) {
        setAllCards(data.Table)
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
      <HomeHeader isShow={false} pickNGOsData={pickNGOsData} />
      <section
        id="inner-banner"
        className="section"
        style={{ backgroundImage: `url(${ramazanbanner})` }}
      >
        <div className="container ">
          <h2 className="mb-0  ml-lg-5">Zakat Appeal 2023</h2>
          <p className="mb-0  ml-lg-5 font-weight-bold">Zaman Foundation</p>
        </div>
      </section>
      {show && (
        <QuickDonation
          proplink={props}
          controls={basicInfo}
          btnClose={btnClose}
        />
      )}
      <section className="section section-meals pt-0 pb-4">
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
            {ngo?.details && !loading && (
              <>
                <section>
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Card
                      body
                      className="h-100 justify-content-center align-items-center bg-none p-0 m-0"
                    >
                      <div className="donation-box">
                        <div className="dimg-box">
                          <Img
                            src={[ngo?.details?.ImageURL, DefaultImgPath]}
                            loader={<CenteredLoader />}
                            alt=""
                            className="object-fit-contain h-auto ngo-detail-logo"
                            style={{
                              maxHeight: "210px",
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </Col>
                </section>
                <Row>
                  <Container>
                    <Row>
                      <Col lg="8" md="8" sm="12" xs="12" className="h-auto">
                        <Card className="justify-content-center bg-none p-0 m-0 ">
                          <div className="donation-box">
                            <h4 className="mb-3">Description</h4>
                            <p className="ngo-details-race-description">
                              {ngo?.details?.Description}
                            </p>
                          </div>
                        </Card>
                      </Col>
                      {ngo?.certifications?.length && (
                        <Col lg="4" md="4" sm="12" xs="12" className="h-auto">
                          <Card className="justify-content-center bg-none p-0">
                            <div className="donation-box">
                              <h4 className="mb-3">
                                Registrations and Certifications
                              </h4>
                              <Row className="m-lg-0">
                                {ngo?.certifications &&
                                  ngo?.certifications?.length &&
                                  ngo?.certifications?.map((item) => (
                                    <Col
                                      lg="6"
                                      md="6"
                                      sm="12"
                                      xs="12"
                                      className="race-logos d-flex justify-content-start align-items-center p-lg-0 py-2"
                                      key={item.SetupDetailId}
                                    >
                                      <div
                                        style={{
                                          width: "20%",
                                        }}
                                      >
                                        <img
                                          src={baseImageUrl + item.Logo}
                                          alt={item.SetupDetailName}
                                        />
                                      </div>
                                      <div
                                        className="ml-2"
                                        style={{
                                          width: "80%",
                                        }}
                                      >
                                        <h4 className="race-logos-title">
                                          {item.SetupDetailName}
                                        </h4>
                                      </div>
                                    </Col>
                                  ))}
                              </Row>
                            </div>
                          </Card>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </Row>
              </>
            )}
            <Row>
              {allCards &&
                allCards
                  .filter((x) => x.ParentId === SetupMasterIds.RamazanCampaign)
                  .map((items, key) => (
                    <CampaignCard
                      items={items}
                      key={key}
                      selectedcurrencyValues={selectedcurrencyValues}
                    />
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
                  <img
                    src={ramazanbottombanner}
                    width={"100%"}
                    alt="SabSaath"
                  />
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

export default RamazanCampaign
