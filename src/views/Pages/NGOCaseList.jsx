import React, { useState, useEffect } from "react"
import { Card, Col, Container, Progress, Row, Spinner } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import "react-multi-carousel/lib/styles.css"
import {
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
  NGOController,
} from "utils/CommonMethods"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Img } from "react-image"

import { baseImageUrl } from "utils/Api.js"
import { DefaultImgPath, SetupMasterIds } from "utils/Constants.js"
import CenteredLoader from "components/GeneralComponent/CenteredLoader.jsx"

import impact1 from "../../assets/img/impact/1-impact.png"
import impact2 from "../../assets/img/impact/2-impact.png"
import impact3 from "../../assets/img/impact/3-impact.png"
import impact4 from "../../assets/img/impact/4-impact.png"
import impact5 from "../../assets/img/impact/5-impact.png"

const logos = [
  {
    FileGeneratedName: impact1,
    alt: "Partner",
    Content_Title: "Certified by EAD",
  },
  {
    FileGeneratedName: impact2,
    alt: "Partner",
    Content_Title: "Certified by Punjab Charity Commission",
  },
  {
    FileGeneratedName: impact3,
    alt: "Partner",
    Content_Title: "Tax Exempted",
  },
  {
    FileGeneratedName: impact4,
    alt: "Partner",
    Content_Title: "Audited by Grant Thornton",
  },
]

const NGOCaseList = (props) => {
  const { id } = useParams()
  const [allCasesddl, setAllCasesddl] = useState([])
  const [loading, setLoading] = useState(true)
  const [ngoName, setNGOName] = useState("")
  const [ngoDetails, setNgoDetails] = useState([])
  const [certifications, setCertifications] = useState(null)
  const GetAllCases = async () => {
    setLoading(true)
    try {
      var data = await Get_All_Cases(Number(id))
      if (data != null) {
        if (Object.keys(data).length > 0) {
          setAllCasesddl(data.Table)
          setLoading(false)

          return data
        } else {
          setLoading(false)
          return []
        }
      } else {
        setLoading(false)
        return []
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)

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
        id,
        null,
        true
      )
      if (data) {
        const Certifications = data.Table[0]?.RACEInfo
          ? data.Table[0].RACEInfo.split(",").map(Number)
          : []

        setNGOName(data.Table[0].Heading)
        setNgoDetails(data.Table[0])
        if (Certifications.length > 0) {
          //  Find certications from the array
          const allCertifications = data.Table1
          const filteredCertifications = allCertifications.filter((item) =>
            Certifications.includes(item.SetupDetailId)
          )
          setCertifications(filteredCertifications)
        } else {
          setCertifications(null)
        }
      } else {
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }

  useEffect(() => {
    GetAllCases()
    GetFeaturedNGOsDetails()
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
  }, [id])

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
        <div className="content content-cases">
          <section id="inner-banner" className="section">
            <div className="container">
              <h1 className="mb-0"> {ngoName} - Cases List</h1>
            </div>
          </section>
          {ngoDetails && !loading && (
            <>
              <section>
                <Container>
                  <Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                      <Card
                        body
                        className="p-0 m-0 mt-2 h-100 justify-content-center align-items-center bg-none"
                      >
                        <div className="donation-box">
                          <div className="dimg-box">
                            <Img
                              src={[ngoDetails?.ImageURL, DefaultImgPath]}
                              loader={<CenteredLoader />}
                              alt=""
                              className="object-fit-contain h-auto ngo-detail-logo"
                            />
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section>
                <Container>
                  <Row>
                    <Col lg="8" md="8" sm="12" xs="12" className="h-auto">
                      <Card className="justify-content-center bg-none m-0">
                        <div className="donation-box">
                          <h4 className="mb-3">Description</h4>
                          <p className="ngo-details-race-description">
                            {ngoDetails?.Description}
                          </p>
                        </div>
                      </Card>
                    </Col>
                    {certifications?.length && (
                      <Col lg="4" md="4" sm="12" xs="12" className="h-auto">
                        <Card className="justify-content-center bg-none p-lg-0">
                          <div className="donation-box">
                            <h4 className="mb-3">
                              Registrations and Certifications
                            </h4>
                            <Row className="m-lg-0">
                              {certifications &&
                                certifications.length &&
                                certifications.map((item) => (
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
              </section>
            </>
          )}
          <>
            <section id="health" className="section section-cases">
              <Container>
                <Row>
                  {allCasesddl.length === 0 && (
                    <p
                      style={{ height: 100, width: "100%" }}
                      className="noActiveText text-center pt-3 pb-3"
                    >
                      There are no active cases currently
                    </p>
                  )}
                  {allCasesddl &&
                    allCasesddl.map((data, key) => (
                      <Col lg="4" md="4" sm="6" xs="12" key={key}>
                        <Card body>
                          <div className="donation-box">
                            <div className="dimg-box">
                              <Img
                                src={[
                                  baseImageUrl + data.DocAttachment,
                                  DefaultImgPath,
                                ]}
                                loader={<CenteredLoader />}
                                alt=""
                              />
                              <div className="eligible">
                                {data?.ZakatEligible ? (
                                  <span>{data?.ZakatEligible}</span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="cases-dona ">
                              <h4 className="text-center   mt-2  mb-2">
                                {data.CaseTitle.substring(0, 60)}..
                              </h4>
                              <p className="text-center qurbari-booking">
                                {data?.ShortDesc.substring(0, 66) + ".."}
                              </p>
                              {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
                              {!data.buttondisable && (
                                <Link
                                  disabled={data.buttondisable}
                                  to={{
                                    pathname:
                                      "/case-detail/" + data.ApplicantCaseId,
                                    state: data, // your data array of objects
                                  }}
                                >
                                  Read More
                                </Link>
                              )}
                            </div>
                            <div className="">
                              <Row>
                                <Col md={6} sm={6} xs={6}>
                                  <strong>
                                    {" "}
                                    {data.raised !== undefined
                                      ? ConvertNumricToComaSeparate(
                                          (
                                            data.raised /
                                            selectedcurrencyValues.ConversionRate.toFixed(
                                              2
                                            )
                                          ).toFixed(2)
                                        ) +
                                        " " +
                                        selectedcurrencyValues.CurrencyFromSymbol
                                      : "0" +
                                        " " +
                                        selectedcurrencyValues.CurrencyFromSymbol}
                                  </strong>
                                  <br />

                                  <span className="text-primary">Raised</span>
                                </Col>

                                <Col
                                  md={6}
                                  sm={6}
                                  xs={6}
                                  className="text-right"
                                >
                                  <strong>
                                    {data.Remainingamount !== undefined
                                      ? ConvertNumricToComaSeparate(
                                          (
                                            data.Remainingamount /
                                            selectedcurrencyValues.ConversionRate.toFixed(
                                              2
                                            )
                                          ).toFixed(2)
                                        ) +
                                        " " +
                                        selectedcurrencyValues.CurrencyFromSymbol
                                      : "0" +
                                        " " +
                                        selectedcurrencyValues.CurrencyFromSymbol}
                                  </strong>
                                  <br />

                                  <span className="text-primary">
                                    {" "}
                                    Remaining
                                  </span>
                                </Col>
                              </Row>
                            </div>
                            <Progress className="my-2" multi>
                              <Progress
                                color="success"
                                bar
                                value={
                                  (parseInt(data.raised) /
                                    parseInt(data.TotalAmount)) *
                                  100
                                }
                              />
                              <Progress
                                bar
                                color="info"
                                value={
                                  (parseInt(data.pledge) /
                                    parseInt(data.TotalAmount)) *
                                  100
                                }
                              />
                              <Progress
                                value={
                                  (parseInt(data.Remainingamount) /
                                    parseInt(data.TotalAmount)) *
                                  100
                                }
                                color="light"
                                bar
                              />
                            </Progress>

                            {data.pledge ? (
                              <div className="">
                                <Row>
                                  <Col md={12} sm={12} xs={12}>
                                    <strong>
                                      {" "}
                                      {data.pledge !== undefined
                                        ? ConvertNumricToComaSeparate(
                                            (
                                              data.pledge /
                                              selectedcurrencyValues.ConversionRate.toFixed(
                                                2
                                              )
                                            ).toFixed(2)
                                          ) +
                                          " " +
                                          selectedcurrencyValues.CurrencyFromSymbol
                                        : "0" +
                                          " " +
                                          selectedcurrencyValues.CurrencyFromSymbol}
                                    </strong>
                                    <br />

                                    <span className="text-primary">
                                      Pledged
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                            ) : (
                              <Row>
                                <Col md={12} sm={12} xs={12}>
                                  <br />
                                </Col>
                              </Row>
                            )}
                          </div>
                          <Link
                            disabled={data.buttondisable}
                            color="primary"
                            style={{ fontSize: "14px" }}
                            className="btn btn-primary"
                            to={{
                              pathname: "/case-detail/" + data.ApplicantCaseId,
                              state: data, // your data array of objects
                            }}
                          >
                            Donate Now
                          </Link>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Container>
            </section>
          </>
        </div>
      )}

      <HomeFooter
        hideFooter={
          ngoDetails?.NGOFeatureID != SetupMasterIds.ZamanFoundationNGO
        }
        bankContent={ngoDetails?.BankName ? ngoDetails?.BankName : null}
      />
    </div>
  )
}

export default NGOCaseList
