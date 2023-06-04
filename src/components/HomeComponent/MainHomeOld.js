import React, { useState, useEffect } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { DisasterreliefURL } from "utils/Api.js"

import {
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Progress,
  Input,
  ButtonGroup,
} from "reactstrap"
import { Link } from "react-router-dom"
import {
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"
import { baseImageUrl } from "utils/Api"
const MainHome = ({ caseCountData }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  const [activeTab, setActiveTab] = useState(0)
  const [allCasesddl, setAllCasesddl] = useState([])
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  let i

  useEffect(() => {
    GetAllCases()
    i = 0
    // setInterval(() => {
    //   setActiveTab(i);
    //   i++;
    //   if (i == 4) {
    //     i = 0;
    //   }
    // }, 10000);

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

  const GetAllCases = async () => {
    try {
      setAllCasesddl([])
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
      return []
    }
  }

  return (
    <>
      <section className="section jumbotron jumbotron-fluid">
        <div class="background-overlay"></div>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" xs="12">
              <div className="banner">
                <h1 className="banner-title mb-0">Pakistan flood Relief</h1>
                <p>
                  <a
                    href={DisasterreliefURL}
                    className="btn btn-primary main-banner-button mt-3"
                    target="_self"
                  >
                    Donate Now
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section jumbotron jumbotron-fluid section-banner d-none">
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" xs="12">
              <div className="banner">
                <h1 className="banner-title mb-0">The super-hub for Charity</h1>
                <h3 className="mb-2">We help you help others.</h3>
                <p className="banner-text">
                  We are a platform that connects those who want to help with
                  those who need help. All cases are investigated and verified
                  by our team of investigation officers and/or certified partner
                  organizations. We ensure that 100% of your donations go
                  exactly where you want them.
                </p>
                <a href="/about-us#what-we-do" className="btn btn-primary">
                  read more
                </a>
              </div>
              <div className="cases">
                <Row>
                  <Col>
                    <div className="active-cases text-center">
                      <p className="cases-text mb-1">Active Cases</p>
                      <h2 className="mb-0 cases-title text-light">
                        {caseCountData?.UNRESOLVEDCASES
                          ? caseCountData?.UNRESOLVEDCASES
                          : "0"}
                      </h2>
                    </div>
                  </Col>
                  <Col>
                    <div className="relese-cases text-center">
                      <p className="cases-text mb-1">Cases Resolved</p>
                      <h2 className="mb-0 cases-title text-light">
                        {caseCountData?.RESOLVEDCASES
                          ? caseCountData?.RESOLVEDCASES
                          : "0"}
                      </h2>
                    </div>
                  </Col>
                  {/* <Col sm="1"></Col> */}
                </Row>
                <div className="donate">
                  <Link to="/cases-list">
                    <Button
                      className="case-btn"
                      color="primary"
                      size="lg"
                      block
                    >
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg="6" md="12" sm="12" xs="12">
              <div className="case-study" id="case-of-the-study">
                <h4 className="case-donation-title mb-1">
                  Donation Categories
                </h4>
                <Nav pills className="mb-2">
                  <NavItem>
                    <NavLink
                      className={activeTab == 0 ? "active" : ""}
                      onClick={() => setActiveTab(0)}
                    >
                      All
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab == 1 ? "active" : ""}
                      onClick={() => setActiveTab(1)}
                    >
                      Health Care
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab == 2 ? "active" : ""}
                      onClick={() => setActiveTab(2)}
                    >
                      Education
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab == 3 ? "active" : ""}
                      onClick={() => setActiveTab(3)}
                    >
                      Relief
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="tab-content-inner" activeTab={activeTab}>
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
                                <div className="case-box">
                                  <h5 className="mt-3 mb-1">
                                    {data.CaseTitle.substring(0, 60)}..
                                  </h5>
                                  <p>{data.ShortDesc.substring(0, 66)}..</p>
                                  <Link
                                    to={{
                                      pathname:
                                        "/case-detail/" + data.ApplicantCaseId,
                                      state: data,
                                    }}
                                  >
                                    Read More
                                  </Link>
                                </div>
                                <Progress
                                  value={data.ProgressBar}
                                  color="primary"
                                  className="mb-2"
                                />
                                <div className="">
                                  <Row>
                                    <Col md={6} sm={6} xs={6}>
                                      <strong>
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

                                        {/* {data.raised} */}
                                      </strong>
                                      <br />
                                      <span className="text-primary">
                                        Raised
                                      </span>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={6}
                                      xs={6}
                                      className="text-right"
                                    >
                                      <strong>
                                        {/* {data.Remaining} */}
                                        {data.Remaining !== undefined
                                          ? ConvertNumricToComaSeparate(
                                              (
                                                data.Remaining /
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
                                        Remaining
                                      </span>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                              <Link
                                to={{
                                  pathname:
                                    "/case-detail/" + data.ApplicantCaseId,
                                  state: data,
                                }}
                                color="primary"
                                className="btn custom-btn btn-primary"
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
                        {allCasesddl.filter(
                          (data) => data.FundType === "Medical"
                        ).length === 0 && (
                          <h2
                            style={{ height: 312 }}
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
                                  <div className="case-box">
                                    <h5 className="mt-3 mb-1">
                                      {data.CaseTitle.substring(0, 60)}..
                                    </h5>
                                    <p>{data.ShortDesc.substring(0, 66)}..</p>
                                    <Link
                                      to={{
                                        pathname:
                                          "/case-detail/" +
                                          data.ApplicantCaseId,
                                        state: data,
                                      }}
                                    >
                                      Read More
                                    </Link>
                                  </div>
                                  <Progress
                                    value={data.ProgressBar}
                                    color="primary"
                                    className="mb-2"
                                  />
                                  <div className="">
                                    <Row>
                                      <Col md={6} sm={6} xs={6}>
                                        <strong>
                                          {/* {data.raised} */}
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
                                        <span className="text-primary">
                                          Raised
                                        </span>
                                      </Col>
                                      <Col
                                        md={6}
                                        sm={6}
                                        xs={6}
                                        className="text-right"
                                      >
                                        <strong>
                                          {/* {data.Remaining} */}
                                          {data.Remaining !== undefined
                                            ? ConvertNumricToComaSeparate(
                                                (
                                                  data.Remaining /
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
                                          Remaining
                                        </span>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                <Link
                                  to={{
                                    pathname:
                                      "/case-detail/" + data.ApplicantCaseId,
                                    state: data,
                                  }}
                                  color="primary"
                                  className="btn custom-btn btn-primary"
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
                            style={{ height: 312 }}
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
                                  <div className="case-box">
                                    <h5 className="mt-3 mb-1">
                                      {data.CaseTitle.substring(0, 60)}..
                                    </h5>
                                    <p>{data.ShortDesc.substring(0, 66)}..</p>
                                    <Link
                                      to={{
                                        pathname: "/case-detail/",
                                        state: data,
                                      }}
                                    >
                                      Read More
                                    </Link>
                                  </div>
                                  <Progress
                                    value={data.ProgressBar}
                                    color="primary"
                                    className="mb-2"
                                  />
                                  <div className="">
                                    <Row>
                                      <Col md={6} sm={6} xs={6}>
                                        <strong>
                                          {/* {data.raised} */}
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
                                        <span className="text-primary">
                                          Raised
                                        </span>
                                      </Col>
                                      <Col
                                        md={6}
                                        sm={6}
                                        xs={6}
                                        className="text-right"
                                      >
                                        <strong>
                                          {/* {data.Remaining} */}

                                          {data.Remaining !== undefined
                                            ? ConvertNumricToComaSeparate(
                                                (
                                                  data.Remaining /
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
                                          Remaining
                                        </span>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                <Link
                                  to={{
                                    pathname:
                                      "/case-detail/" + data.ApplicantCaseId,
                                    state: data,
                                  }}
                                  color="primary"
                                  className="btn custom-btn btn-primary"
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
                        {allCasesddl.filter(
                          (data) => data.FundType === "Relief"
                        ).length === 0 && (
                          <h2
                            style={{ height: 312 }}
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
                                  <div className="case-box">
                                    <h5 className="mt-3 mb-1">
                                      {data.CaseTitle.substring(0, 60)}..
                                    </h5>
                                    <p>{data.ShortDesc.substring(0, 66)}..</p>
                                    <Link
                                      to={{
                                        pathname:
                                          "/case-detail/" +
                                          data.ApplicantCaseId,
                                        state: data,
                                      }}
                                    >
                                      Read More
                                    </Link>
                                  </div>
                                  <Progress
                                    value={data.ProgressBar}
                                    color="primary"
                                    className="mb-2"
                                  />
                                  <div className="">
                                    <Row>
                                      <Col md={6} sm={6} xs={6}>
                                        <strong>
                                          {/* {data.raised} */}
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
                                        <span className="text-primary">
                                          Raised
                                        </span>
                                      </Col>
                                      <Col
                                        md={6}
                                        sm={6}
                                        xs={6}
                                        className="text-right"
                                      >
                                        <strong>
                                          {/* {data.Remaining} */}
                                          {data.Remaining !== undefined
                                            ? ConvertNumricToComaSeparate(
                                                (
                                                  data.Remaining /
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
                                          Remaining
                                        </span>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                                <Link
                                  to={{
                                    pathname:
                                      "/case-detail/" + data.ApplicantCaseId,
                                    state: data,
                                  }}
                                  color="primary"
                                  className="btn custom-btn btn-primary"
                                >
                                  Donate Now
                                </Link>
                              </Card>
                            ))}
                      </Carousel>
                    </div>
                  </TabPane>
                </TabContent>
                <div className="moreCases text-center">
                  <Link to="/cases-list">
                    <Button color="primary">View More Cases</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default MainHome
