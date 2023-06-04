import React, { useState, useEffect } from "react"
import { Card, Col, Container, Progress, Row, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import "react-multi-carousel/lib/styles.css"
import {
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Img } from "react-image"
import { baseImageUrl } from "utils/Api.js"
import { DefaultImgPath } from "utils/Constants.js"
import CenteredLoader from "components/GeneralComponent/CenteredLoader.jsx"

const CaseList = (props) => {
  const [allCasesddl, setAllCasesddl] = useState([])
  const [loading, setLoading] = useState(true)

  const GetAllCases = async () => {
    setLoading(true)

    try {
      var data = await Get_All_Cases(0, 0)
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
    <div className="maincontent">
      <HomeHeader isShow={true} />

      <div className="content content-cases">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Zaman Foundation - Cases List</h1>
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
                              <h4 className="text-center mt-2  mb-2">
                                {data.CaseTitle.substring(0, 60)}..
                              </h4>
                              {data?.ShortDesc && (
                                <p className="text-center">
                                  {data?.ShortDesc.substring(0, 66) + ".."}
                                </p>
                              )}
                              {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
                              {data?.ShortDesc && !data.buttondisable && (
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
                              pathname:
                                "/case-detail/" + data.ApplicantCaseId,
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
          // <>
          //   <section id="health" className="section section-cases">
          //     <Container>
          //       <Row>
          //         <Col>
          //           <h2 className="mb-4 border-bottom border-danger">Health</h2>
          //         </Col>
          //       </Row>
          //       <Row>
          //         {allCasesddl.filter((data) => data.FundType === "Medical")
          //           .length === 0 && (
          //           <p
          //             style={{ height: 100, width: "100%" }}
          //             className="noActiveText text-center pt-3 pb-3"
          //           >
          //             There are no active cases currently
          //           </p>
          //         )}
          //         {allCasesddl &&
          //           allCasesddl
          //             .filter((data) => data.FundType === "Medical")
          //             .map((data, key) => (
          //               <Col lg="4" md="4" sm="6" xs="12" key={key}>
          //                 <Card body>
          //                   <div className="donation-box">
          //                     <div className="dimg-box">
          //                       <Img
          //                         src={[
          //                           baseImageUrl + data.DocAttachment,
          //                           DefaultImgPath,
          //                         ]}
          //                         loader={<CenteredLoader />}
          //                         alt=""
          //                       />

          //                       <div className="eligible">
          //                         {data?.ZakatEligible ? (
          //                           <span>{data?.ZakatEligible}</span>
          //                         ) : (
          //                           ""
          //                         )}
          //                       </div>
          //                     </div>
          //                     <div className="cases-dona ">
          //                       <h4 className="text-center mt-2  mb-2">
          //                         {data.CaseTitle.substring(0, 60)}..
          //                       </h4>
          //                       {data?.ShortDesc && (
          //                         <p className="text-center">
          //                           {data?.ShortDesc.substring(0, 66) + ".."}
          //                         </p>
          //                       )}
          //                       {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
          //                       {data?.ShortDesc && !data.buttondisable && (
          //                         <Link
          //                           disabled={data.buttondisable}
          //                           to={{
          //                             pathname:
          //                               "/case-detail/" + data.ApplicantCaseId,
          //                             state: data, // your data array of objects
          //                           }}
          //                         >
          //                           Read More
          //                         </Link>
          //                       )}
          //                     </div>
          //                     <div className="">
          //                       <Row>
          //                         <Col md={6} sm={6} xs={6}>
          //                           <strong>
          //                             {" "}
          //                             {data.raised !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.raised /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">Raised</span>
          //                         </Col>

          //                         <Col
          //                           md={6}
          //                           sm={6}
          //                           xs={6}
          //                           className="text-right"
          //                         >
          //                           <strong>
          //                             {data.Remainingamount !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.Remainingamount /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">
          //                             {" "}
          //                             Remaining
          //                           </span>
          //                         </Col>
          //                       </Row>
          //                     </div>
          //                     <Progress className="my-2" multi>
          //                       <Progress
          //                         color="success"
          //                         bar
          //                         value={
          //                           (parseInt(data.raised) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         bar
          //                         color="info"
          //                         value={
          //                           (parseInt(data.pledge) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         value={
          //                           (parseInt(data.Remainingamount) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                         color="light"
          //                         bar
          //                       />
          //                     </Progress>

          //                     {data.pledge ? (
          //                       <div className="">
          //                         <Row>
          //                           <Col md={12} sm={12} xs={12}>
          //                             <strong>
          //                               {" "}
          //                               {data.pledge !== undefined
          //                                 ? ConvertNumricToComaSeparate(
          //                                     (
          //                                       data.pledge /
          //                                       selectedcurrencyValues.ConversionRate.toFixed(
          //                                         2
          //                                       )
          //                                     ).toFixed(2)
          //                                   ) +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol
          //                                 : "0" +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol}
          //                             </strong>
          //                             <br />

          //                             <span className="text-primary">
          //                               Pledged
          //                             </span>
          //                           </Col>
          //                         </Row>
          //                       </div>
          //                     ) : (
          //                       <Row>
          //                         <Col md={12} sm={12} xs={12}>
          //                           <br />
          //                         </Col>
          //                       </Row>
          //                     )}
          //                   </div>
          //                   <Link
          //                     disabled={data.buttondisable}
          //                     color="primary"
          //                     style={{ fontSize: "14px" }}
          //                     className="btn btn-primary"
          //                     to={{
          //                       pathname:
          //                         "/case-detail/" + data.ApplicantCaseId,
          //                       state: data, // your data array of objects
          //                     }}
          //                   >
          //                     Donate Now
          //                   </Link>
          //                 </Card>
          //               </Col>
          //             ))}
          //       </Row>
          //     </Container>
          //   </section>
          //   <section id="education" className="section section-cases pt-0">
          //     <Container>
          //       <Row>
          //         <Col>
          //           <h2 className="mb-4 border-bottom border-danger">
          //             Education
          //           </h2>
          //         </Col>
          //       </Row>
          //       <Row>
          //         {allCasesddl.filter((data) => data.FundType === "Education")
          //           .length === 0 && (
          //           <p
          //             style={{ height: 100, width: "100%" }}
          //             className="noActiveText text-center pt-3 pb-3"
          //           >
          //             There are no active cases currently
          //           </p>
          //         )}
          //         {allCasesddl &&
          //           allCasesddl
          //             .filter((data) => data.FundType === "Education")
          //             .map((data, key) => (
          //               <Col lg="4" md="4" sm="6" xs="12" key={key}>
          //                 <Card body>
          //                   <div className="donation-box">
          //                     <div className="dimg-box">
          //                       <Img
          //                         src={[
          //                           baseImageUrl + data.DocAttachment,
          //                           DefaultImgPath,
          //                         ]}
          //                         loader={<CenteredLoader />}
          //                         alt=""
          //                       />

          //                       <div className="eligible">
          //                         {data?.ZakatEligible ? (
          //                           <span>{data?.ZakatEligible}</span>
          //                         ) : (
          //                           ""
          //                         )}
          //                       </div>
          //                     </div>
          //                     <div className="cases-dona ">
          //                       <h4 className="text-center mt-2  mb-2">
          //                         {data.CaseTitle.substring(0, 60)}..
          //                       </h4>
          //                       {data?.ShortDesc && (
          //                         <p className="text-center">
          //                           {data?.ShortDesc.substring(0, 66) + ".."}
          //                         </p>
          //                       )}
          //                       {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
          //                       {data?.ShortDesc && !data.buttondisable && (
          //                         <Link
          //                           disabled={data.buttondisable}
          //                           to={{
          //                             pathname:
          //                               "/case-detail/" + data.ApplicantCaseId,
          //                             state: data, // your data array of objects
          //                           }}
          //                         >
          //                           Read More
          //                         </Link>
          //                       )}
          //                     </div>
          //                     <div className="">
          //                       <Row>
          //                         <Col md={6} sm={6} xs={6}>
          //                           <strong>
          //                             {" "}
          //                             {data.raised !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.raised /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">Raised</span>
          //                         </Col>

          //                         <Col
          //                           md={6}
          //                           sm={6}
          //                           xs={6}
          //                           className="text-right"
          //                         >
          //                           <strong>
          //                             {data.Remainingamount !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.Remainingamount /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">
          //                             {" "}
          //                             Remaining
          //                           </span>
          //                         </Col>
          //                       </Row>
          //                     </div>
          //                     <Progress className="my-2" multi>
          //                       <Progress
          //                         color="success"
          //                         bar
          //                         value={
          //                           (parseInt(data.raised) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         bar
          //                         color="info"
          //                         value={
          //                           (parseInt(data.pledge) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         value={
          //                           (parseInt(data.Remainingamount) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                         color="light"
          //                         bar
          //                       />
          //                     </Progress>

          //                     {data.pledge ? (
          //                       <div className="">
          //                         <Row>
          //                           <Col md={12} sm={12} xs={12}>
          //                             <strong>
          //                               {" "}
          //                               {data.pledge !== undefined
          //                                 ? ConvertNumricToComaSeparate(
          //                                     (
          //                                       data.pledge /
          //                                       selectedcurrencyValues.ConversionRate.toFixed(
          //                                         2
          //                                       )
          //                                     ).toFixed(2)
          //                                   ) +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol
          //                                 : "0" +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol}
          //                             </strong>
          //                             <br />

          //                             <span className="text-primary">
          //                               Pledged
          //                             </span>
          //                           </Col>
          //                         </Row>
          //                       </div>
          //                     ) : (
          //                       <Row>
          //                         <Col md={12} sm={12} xs={12}>
          //                           <br />
          //                         </Col>
          //                       </Row>
          //                     )}
          //                   </div>
          //                   <Link
          //                     disabled={data.buttondisable}
          //                     color="primary"
          //                     style={{ fontSize: "14px" }}
          //                     className="btn btn-primary"
          //                     to={{
          //                       pathname:
          //                         "/case-detail/" + data.ApplicantCaseId,
          //                       state: data, // your data array of objects
          //                     }}
          //                   >
          //                     Donate Now
          //                   </Link>
          //                 </Card>
          //               </Col>
          //             ))}
          //       </Row>
          //     </Container>
          //   </section>
          //   <section id="relief" className="section section-cases pt-0">
          //     <Container>
          //       <Row>
          //         <Col>
          //           <h2 className="mb-4 border-bottom border-danger">Relief</h2>
          //         </Col>
          //       </Row>
          //       <Row>
          //         {allCasesddl.filter((data) => data.FundType === "Relief")
          //           .length === 0 && (
          //           <p
          //             style={{ height: 100, width: "100%" }}
          //             className="noActiveText text-center pt-3 pb-3"
          //           >
          //             There are no active cases currently
          //           </p>
          //         )}
          //         {allCasesddl &&
          //           allCasesddl
          //             .filter((data) => data.FundType === "Relief")
          //             .map((data, key) => (
          //               <Col lg="4" md="4" sm="6" xs="12" key={key}>
          //                 <Card body>
          //                   <div className="donation-box">
          //                     <div className="dimg-box">
          //                       <Img
          //                         src={[
          //                           baseImageUrl + data.DocAttachment,
          //                           DefaultImgPath,
          //                         ]}
          //                         loader={<CenteredLoader />}
          //                         alt=""
          //                       />

          //                       <div className="eligible">
          //                         {data?.ZakatEligible ? (
          //                           <span>{data?.ZakatEligible}</span>
          //                         ) : (
          //                           ""
          //                         )}
          //                       </div>
          //                     </div>
          //                     <div className="cases-dona ">
          //                       <h4 className="text-center mt-2  mb-2">
          //                         {data.CaseTitle.substring(0, 60)}..
          //                       </h4>
          //                       {data?.ShortDesc && (
          //                         <p className="text-center">
          //                           {data?.ShortDesc.substring(0, 66) + ".."}
          //                         </p>
          //                       )}
          //                       {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
          //                       {data?.ShortDesc && !data.buttondisable && (
          //                         <Link
          //                           disabled={data.buttondisable}
          //                           to={{
          //                             pathname:
          //                               "/case-detail/" + data.ApplicantCaseId,
          //                             state: data, // your data array of objects
          //                           }}
          //                         >
          //                           Read More
          //                         </Link>
          //                       )}
          //                     </div>
          //                     <div className="">
          //                       <Row>
          //                         <Col md={6} sm={6} xs={6}>
          //                           <strong>
          //                             {" "}
          //                             {data.raised !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.raised /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">Raised</span>
          //                         </Col>

          //                         <Col
          //                           md={6}
          //                           sm={6}
          //                           xs={6}
          //                           className="text-right"
          //                         >
          //                           <strong>
          //                             {data.Remainingamount !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.Remainingamount /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">
          //                             {" "}
          //                             Remaining
          //                           </span>
          //                         </Col>
          //                       </Row>
          //                     </div>
          //                     <Progress className="my-2" multi>
          //                       <Progress
          //                         color="success"
          //                         bar
          //                         value={
          //                           (parseInt(data.raised) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         bar
          //                         color="info"
          //                         value={
          //                           (parseInt(data.pledge) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         value={
          //                           (parseInt(data.Remainingamount) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                         color="light"
          //                         bar
          //                       />
          //                     </Progress>

          //                     {data.pledge ? (
          //                       <div className="">
          //                         <Row>
          //                           <Col md={12} sm={12} xs={12}>
          //                             <strong>
          //                               {" "}
          //                               {data.pledge !== undefined
          //                                 ? ConvertNumricToComaSeparate(
          //                                     (
          //                                       data.pledge /
          //                                       selectedcurrencyValues.ConversionRate.toFixed(
          //                                         2
          //                                       )
          //                                     ).toFixed(2)
          //                                   ) +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol
          //                                 : "0" +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol}
          //                             </strong>
          //                             <br />

          //                             <span className="text-primary">
          //                               Pledged
          //                             </span>
          //                           </Col>
          //                         </Row>
          //                       </div>
          //                     ) : (
          //                       <Row>
          //                         <Col md={12} sm={12} xs={12}>
          //                           <br />
          //                         </Col>
          //                       </Row>
          //                     )}
          //                   </div>
          //                   <Link
          //                     disabled={data.buttondisable}
          //                     color="primary"
          //                     style={{ fontSize: "14px" }}
          //                     className="btn btn-primary"
          //                     to={{
          //                       pathname:
          //                         "/case-detail/" + data.ApplicantCaseId,
          //                       state: data, // your data array of objects
          //                     }}
          //                   >
          //                     Donate Now
          //                   </Link>
          //                 </Card>
          //               </Col>
          //             ))}
          //       </Row>
          //     </Container>
          //   </section>
          //   <section id="meal" className="section section-cases pt-0">
          //     <Container>
          //       <Row>
          //         <Col>
          //           <h2 className="mb-4 border-bottom border-danger">Meal</h2>
          //         </Col>
          //       </Row>
          //       <Row>
          //         {allCasesddl.filter((data) => data.FundType === "Meal")
          //           .length === 0 && (
          //           <p
          //             style={{ height: 100, width: "100%" }}
          //             className="noActiveText text-center pt-3 pb-3"
          //           >
          //             There are no active cases currently
          //           </p>
          //         )}
          //         {allCasesddl &&
          //           allCasesddl
          //             .filter((data) => data.FundType === "Meal")
          //             .map((data, key) => (
          //               <Col lg="4" md="4" sm="6" xs="12" key={key}>
          //                 <Card body>
          //                   <div className="donation-box">
          //                     <div className="dimg-box">
          //                       <Img
          //                         src={[
          //                           baseImageUrl + data.DocAttachment,
          //                           DefaultImgPath,
          //                         ]}
          //                         loader={<CenteredLoader />}
          //                         alt=""
          //                       />

          //                       <div className="eligible">
          //                         {data?.ZakatEligible ? (
          //                           <span>{data?.ZakatEligible}</span>
          //                         ) : (
          //                           ""
          //                         )}
          //                       </div>
          //                     </div>
          //                     <div className="cases-dona ">
          //                       <h4 className="text-center mt-2  mb-2">
          //                         {data.CaseTitle.substring(0, 60)}..
          //                       </h4>
          //                       {data?.ShortDesc && (
          //                         <p className="text-center">
          //                           {data?.ShortDesc.substring(0, 66) + ".."}
          //                         </p>
          //                       )}
          //                       {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription.substring(0, 66)+ ".."}}></div> */}
          //                       {data?.ShortDesc && !data.buttondisable && (
          //                         <Link
          //                           disabled={data.buttondisable}
          //                           to={{
          //                             pathname:
          //                               "/case-detail/" + data.ApplicantCaseId,
          //                             state: data, // your data array of objects
          //                           }}
          //                         >
          //                           Read More
          //                         </Link>
          //                       )}
          //                     </div>
          //                     <div className="">
          //                       <Row>
          //                         <Col md={6} sm={6} xs={6}>
          //                           <strong>
          //                             {" "}
          //                             {data.raised !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.raised /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">Raised</span>
          //                         </Col>

          //                         <Col
          //                           md={6}
          //                           sm={6}
          //                           xs={6}
          //                           className="text-right"
          //                         >
          //                           <strong>
          //                             {data.Remainingamount !== undefined
          //                               ? ConvertNumricToComaSeparate(
          //                                   (
          //                                     data.Remainingamount /
          //                                     selectedcurrencyValues.ConversionRate.toFixed(
          //                                       2
          //                                     )
          //                                   ).toFixed(2)
          //                                 ) +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol
          //                               : "0" +
          //                                 " " +
          //                                 selectedcurrencyValues.CurrencyFromSymbol}
          //                           </strong>
          //                           <br />

          //                           <span className="text-primary">
          //                             {" "}
          //                             Remaining
          //                           </span>
          //                         </Col>
          //                       </Row>
          //                     </div>
          //                     <Progress className="my-2" multi>
          //                       <Progress
          //                         color="success"
          //                         bar
          //                         value={
          //                           (parseInt(data.raised) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         bar
          //                         color="info"
          //                         value={
          //                           (parseInt(data.pledge) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                       />
          //                       <Progress
          //                         value={
          //                           (parseInt(data.Remainingamount) /
          //                             parseInt(data.TotalAmount)) *
          //                           100
          //                         }
          //                         color="light"
          //                         bar
          //                       />
          //                     </Progress>

          //                     {data.pledge ? (
          //                       <div className="">
          //                         <Row>
          //                           <Col md={12} sm={12} xs={12}>
          //                             <strong>
          //                               {" "}
          //                               {data.pledge !== undefined
          //                                 ? ConvertNumricToComaSeparate(
          //                                     (
          //                                       data.pledge /
          //                                       selectedcurrencyValues.ConversionRate.toFixed(
          //                                         2
          //                                       )
          //                                     ).toFixed(2)
          //                                   ) +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol
          //                                 : "0" +
          //                                   " " +
          //                                   selectedcurrencyValues.CurrencyFromSymbol}
          //                             </strong>
          //                             <br />

          //                             <span className="text-primary">
          //                               Pledged
          //                             </span>
          //                           </Col>
          //                         </Row>
          //                       </div>
          //                     ) : (
          //                       <Row>
          //                         <Col md={12} sm={12} xs={12}>
          //                           <br />
          //                         </Col>
          //                       </Row>
          //                     )}
          //                   </div>
          //                   <Link
          //                     disabled={data.buttondisable}
          //                     color="primary"
          //                     style={{ fontSize: "14px" }}
          //                     className="btn btn-primary"
          //                     to={{
          //                       pathname:
          //                         "/case-detail/" + data.ApplicantCaseId,
          //                       state: data, // your data array of objects
          //                     }}
          //                   >
          //                     Donate Now
          //                   </Link>
          //                 </Card>
          //               </Col>
          //             ))}
          //       </Row>
          //     </Container>
          //   </section>
          // </>
        )}
      </div>

      <HomeFooter />
    </div>
  )
}

export default CaseList
