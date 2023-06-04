import React, { useState, useEffect } from "react"
import {
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  NavLink,
  Card,
  Progress,
} from "reactstrap"
import { Link } from "react-router-dom"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import {
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"
import { baseImageUrl } from "utils/Api"
import Swal from "sweetalert2"

const AllCases = (props) => {
  const [caseTab, setCaseTab] = useState(0)
  const [allCasesddl, setAllCasesddl] = useState([])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const GetAllCases = async () => {
    try {
      var data = await Get_All_Cases(0, 0)
      if (data != null) {
        if (Object.keys(data).length > 0) {
          setAllCasesddl(data.Table)
          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "All Cases Data Not Found", icon: "error" });
      return []
    }
  }
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  useEffect(() => {
    GetAllCases()

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
    <section className="section section-cases pt-5 pb-5 bg-gray">
      <Container>
        <Row>
          <Col>
            <h2 className="meals-title mb-4">
              <span className="title-bg"> Adopt a Family </span>
            </h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="casess">
              <Nav pills className="mb-4">
                <li>
                  <h2>Cases</h2>
                </li>
                <NavItem>
                  <NavLink
                    className={caseTab == 0 ? "active" : ""}
                    onClick={() => setCaseTab(0)}
                  >
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={caseTab == 1 ? "active" : ""}
                    onClick={() => setCaseTab(1)}
                  >
                    Health Care
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={caseTab == 2 ? "active" : ""}
                    onClick={() => setCaseTab(2)}
                  >
                    Education
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={caseTab == 3 ? "active" : ""}
                    onClick={() => setCaseTab(3)}
                  >
                    Relief
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="tab-content-inner" activeTab={caseTab}>
                <TabPane tabId={0}>
                  <div className="IndicatorCarousel">
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={false}
                      responsive={responsive}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      shouldResetAutoplay={false}
                      keyBoardControl={true}
                      transitionDuration={0.1}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      pauseOnHover={true}
                    >
                      {allCasesddl &&
                        allCasesddl?.map((data, key) => (
                          <Card body key={key}>
                            <div className="donation-box">
                              <div className="dimg-box">
                                <img
                                  src={baseImageUrl + data.DocAttachment}
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
                                <h4 className="text-center mt-2  mb-2">
                                  {data.CaseTitle.substring(0, 60)}..
                                </h4>

                                <p className="text-center">
                                  {data?.ShortDesc.substring(0, 66) + ".."}
                                </p>
                                <p className="text-center mb-2">
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
                                </p>
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
                            </div>
                            <Link
                            disabled={data.buttondisable}
                              color="primary"
                              style={{ fontSize: "16px" }}
                              className="btn btn-primary"
                              to={{
                                pathname:
                                  "/case-detail/" + data.ApplicantCaseId,
                                state: data,
                              }}
                            >
                              Donate Now
                            </Link>
                          </Card>
                        ))}
                    </Carousel>
                  </div>
                </TabPane>
                <TabPane tabId={1}>
                  <div className="IndicatorCarousel">
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={false}
                      responsive={responsive}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      shouldResetAutoplay={false}
                      keyBoardControl={true}
                      transitionDuration={0.1}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      pauseOnHover={true}
                    >
                      {allCasesddl.filter((data) => data.FundType === "Medical")
                        .length === 0 && (
                        <h2
                          style={{ height: 397 }}
                          className="text-center pt-3 pb-3"
                        >
                          No Data Found
                        </h2>
                      )}
                      {allCasesddl &&
                        allCasesddl
                          .filter((data) => data.FundType === "Medical")
                          .map((data, key) => (
                            <Card body key={key}>
                            <div className="donation-box">
                              <div className="dimg-box">
                                <img
                                  src={baseImageUrl + data.DocAttachment}
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
                                <h4 className="text-center mt-2  mb-2">
                                  {data.CaseTitle.substring(0, 60)}..
                                </h4>

                                <p className="text-center">
                                  {data?.ShortDesc.substring(0, 66) + ".."}
                                </p>
                                <p className="text-center mb-2">
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
                                </p>
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
                            </div>
                            <Link
                            disabled={data.buttondisable}
                              color="primary"
                              style={{ fontSize: "16px" }}
                              className="btn btn-primary"
                              to={{
                                pathname:
                                  "/case-detail/" + data.ApplicantCaseId,
                                state: data,
                              }}
                            >
                              Donate Now
                            </Link>
                          </Card>
                          ))}
                    </Carousel>
                  </div>
                </TabPane>
                <TabPane tabId={2}>
                  <div className="IndicatorCarousel">
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={false}
                      responsive={responsive}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      shouldResetAutoplay={false}
                      keyBoardControl={true}
                      transitionDuration={0.1}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      pauseOnHover={true}
                    >
                      {allCasesddl.filter(
                        (data) => data.FundType === "Education"
                      ).length === 0 && (
                        <h2
                          style={{ height: 397 }}
                          className="text-center pt-3 pb-3"
                        >
                          No Data Found
                        </h2>
                      )}
                      {allCasesddl &&
                        allCasesddl
                          .filter((data) => data.FundType === "Education")
                          .map((data, key) => (
                            <Card body key={key}>
                            <div className="donation-box">
                              <div className="dimg-box">
                                <img
                                  src={baseImageUrl + data.DocAttachment}
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
                                <h4 className="text-center mt-2  mb-2">
                                  {data.CaseTitle.substring(0, 60)}..
                                </h4>

                                <p className="text-center">
                                  {data?.ShortDesc.substring(0, 66) + ".."}
                                </p>
                                <p className="text-center mb-2">
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
                                </p>
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
                            </div>
                            <Link
                            disabled={data.buttondisable}
                              color="primary"
                              style={{ fontSize: "16px" }}
                              className="btn btn-primary"
                              to={{
                                pathname:
                                  "/case-detail/" + data.ApplicantCaseId,
                                state: data,
                              }}
                            >
                              Donate Now
                            </Link>
                          </Card>
                          ))}
                    </Carousel>
                  </div>
                </TabPane>
                <TabPane tabId={3}>
                  <div className="IndicatorCarousel">
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={false}
                      responsive={responsive}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      shouldResetAutoplay={false}
                      keyBoardControl={true}
                      transitionDuration={0.1}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      pauseOnHover={true}
                    >
                      {allCasesddl.filter((data) => data.FundType === "Relief")
                        .length === 0 && (
                        <h2
                          style={{ height: 397 }}
                          className="text-center pt-3 pb-3"
                        >
                          No Data Found
                        </h2>
                      )}
                      {allCasesddl &&
                        allCasesddl
                          .filter((data) => data.FundType === "Relief")
                          .map((data, key) => (
                            <Card body key={key}>
                            <div className="donation-box">
                              <div className="dimg-box">
                                <img
                                  src={baseImageUrl + data.DocAttachment}
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
                                <h4 className="text-center mt-2  mb-2">
                                  {data.CaseTitle.substring(0, 60)}..
                                </h4>

                                <p className="text-center">
                                  {data?.ShortDesc.substring(0, 66) + ".."}
                                </p>
                                <p className="text-center mb-2">
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
                                </p>
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
                            </div>
                            <Link
                            disabled={data.buttondisable}
                              color="primary"
                              style={{ fontSize: "16px" }}
                              className="btn btn-primary"
                              to={{
                                pathname:
                                  "/case-detail/" + data.ApplicantCaseId,
                                state: data,
                              }}
                            >
                              Donate Now
                            </Link>
                          </Card>
                          ))}
                    </Carousel>
                  </div>
                </TabPane>
              </TabContent>
              <div className="text-center mt-4">
                <Link to="/cases-list" className="btn custom-btn btn-primary">
                  View All Cases
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllCases
