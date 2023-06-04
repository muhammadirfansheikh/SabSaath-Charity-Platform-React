import React, { useState } from "react"

import {
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  CardBody,
  CardText,
} from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { MarketingContentController } from "utils/CommonMethods"
import ReactModalVideo from "components/GeneralComponent/ReactModalVideo"
import useApiCallOnMount from "hooks/useApiCallOnMount"
import { baseImageUrl } from "utils/Api"
import ApiStateHandler from "components/GeneralComponent/ApiStatusHandler"
import { MarketingContentModules } from "utils/Constants"
import HomeSupport from "./HomeSupport"

const AdsDetailID = MarketingContentModules.AdsModule
const GetAds = async () => {
  try {
    var { data } = await MarketingContentController(2, 0, AdsDetailID)
    if (data.DataSet.Table) {
      return data.DataSet.Table.filter((item) => item.Content_Display)
    } else {
      return []
    }
  } catch (error) {
    if (error.message) {
      throw new Error(error.message)
    } else {
      throw new Error("Something went wrong")
    }
  }
}

const LEFT_MAX_WORDS = 100
const MAX_WORDS = 20

const AdsSection = () => {
  const [activeAd, setActiveAd] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, data, error, errorText] = useApiCallOnMount(GetAds)
  const history = useHistory()
  const dataExists = data && data.length > 0

  const item1 =
    dataExists &&
    data.find((item) => item.Content_Position === 1 && item.Content_Display)
  const item2 =
    dataExists &&
    data.find((item) => item.Content_Position === 2 && item.Content_Display)
  const item3 =
    dataExists &&
    data.find((item) => item.Content_Position === 3 && item.Content_Display)

  const handleClick = (ad) => {
    setActiveAd(ad)
    setShowModal(true)
  }

  return (
    <section className="section  pt-4 pb-0">
      <Container>
        <h2 className="works-title-top mb-4">
          <span className="title-bg"> About Sab Saath</span>
        </h2>

        <ApiStateHandler
          loading={loading}
          error={error}
          errorText={errorText}
          dataExists={dataExists}
        >
          {dataExists ? (
            <Row className="no-gutters">
              <Col md={1} />
              <Col md={10}>
                <Row className="no-gutters">
                  {dataExists &&
                    item1 &&
                    // item1.Content_Description
                    (item1.Content_Description ? (
                      <Col lg="8" md="12" sm="12" xs="12">
                        <CardTitle tag="h4" className="one-line-heading">
                          {item1.Content_Title}
                        </CardTitle>
                        <Card
                          style={{
                            width: "100%",
                            padding: "0px",
                            height: "93%",
                          }}
                          className="bg-greyish ad-video-card"
                        >
                          <CardBody className="pt-2">
                            <CardText className="ads-content-description-page p-2">
                              {item1?.Content_Description.split(" ").length >
                              LEFT_MAX_WORDS ? (
                                <>
                                  <div
                                    className="description-div"
                                    dangerouslySetInnerHTML={{
                                      __html: item1?.Content_Description.split(
                                        " "
                                      )
                                        .slice(0, LEFT_MAX_WORDS)
                                        .join(" "),
                                    }}
                                  />

                                  <span
                                    className="read-more-text"
                                    onClick={(e) => {
                                      // Make it high priority
                                      e.preventDefault()
                                      e.stopPropagation()

                                      history.push(
                                        `/ads?id=${item1.Content_ID}`
                                      )
                                    }}
                                  >
                                    {" "}
                                    read more...
                                  </span>
                                </>
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item1?.Content_Description,
                                  }}
                                />
                              )}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : (
                      <Col lg="8" md="12" sm="12" xs="12">
                        <div
                          onClick={() => item1?.VideoURL && handleClick(item1)}
                          className={
                            item1?.VideoURL
                              ? "pointer adds-left-image-card"
                              : "adds-left-image"
                          }
                        >
                          <CardTitle tag="h4" className="one-line-heading">
                            {item1?.Content_Title}
                          </CardTitle>
                          <div class="video-box">
                            <img
                              src={
                                baseImageUrl +
                                item1?.DocAttachmentPath +
                                "/" +
                                item1?.FileGeneratedName
                              }
                              width="100%"
                              alt=""
                              className={
                                item1?.VideoURL
                                  ? " pointer adds-left-image"
                                  : " "
                              }
                              onClick={() =>
                                item1?.VideoURL && handleClick(item1)
                              }
                            />
                            {item1.VideoURL && (
                              <div className="video-box-overlay">
                                <div className="video-box-overlay-play">
                                  <i className="fa fa-play"></i>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    ))}

                  {dataExists && (
                    <Col
                      lg="4"
                      md="12"
                      sm="12"
                      xs="12"
                      className="pl-lg-2 pl-md-2 pl-sm-0"
                    >
                      <Row>
                        {item2 && (
                          <Col lg="12" md="12" sm="12" xs="12">
                            <div
                              className={
                                item2?.VideoURL && !item2?.Content_Description
                                  ? " pointer  adds-right-image-card"
                                  : " adds-right-image-card"
                              }
                              style={{
                                width: "100%",
                                padding: "0px",
                              }}
                              onClick={() =>
                                item2.VideoURL && handleClick(item2)
                              }
                            >
                              {item2?.Content_Description ? (
                                <>
                                  <CardTitle
                                    tag="h4"
                                    className="one-line-heading"
                                  >
                                    {item2?.Content_Title}
                                  </CardTitle>
                                  <div className="ads-content-description">
                                    {item2?.Content_Description.split(" ")
                                      .length > MAX_WORDS ? (
                                      <>
                                        <div
                                        className="description-div"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item2?.Content_Description.split(
                                                " "
                                              )
                                                .slice(0, MAX_WORDS)
                                                .join(" "),
                                          }}
                                        />

                                        <span
                                          className="read-more-text"
                                          onClick={(e) => {
                                            // Make it high priority
                                            e.preventDefault()
                                            e.stopPropagation()

                                            history.push(
                                              `/ads?id=${item2.Content_ID}`
                                            )
                                          }}
                                        >
                                          {" "}
                                          read more...
                                        </span>
                                      </>
                                    ) : (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item2?.Content_Description,
                                        }}
                                      />
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div class="video-box thumbnail-ads-section ">
                                  <CardTitle
                                    tag="h4"
                                    className="one-line-heading"
                                  >
                                    {item2?.Content_Title}
                                  </CardTitle>
                                  <img
                                    src={
                                      baseImageUrl +
                                      item2?.DocAttachmentPath +
                                      "/" +
                                      item2?.FileGeneratedName
                                    }
                                    width="100%"
                                    alt=""
                                  />
                                  {item2?.VideoURL && (
                                    <div className="video-box-overlay video-box-overlay2">
                                      <div className="video-box-overlay-play">
                                        {" "}
                                        <i className="fa fa-play"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </Col>
                        )}
                        {item3 && (
                          <Col lg="12" md="12" sm="12" xs="12">
                            {item3?.Content_Description ? (
                              <>
                                <CardTitle
                                  tag="h4"
                                  className="one-line-heading"
                                >
                                  {item3?.Content_Title}
                                </CardTitle>
                                <div className="ads-content-description">
                                  {item3?.Content_Description.split(" ")
                                    .length > MAX_WORDS ? (
                                    <>
                                      <div
                                      className="description-div"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item3?.Content_Description.split(
                                              " "
                                            )
                                              .slice(0, MAX_WORDS)
                                              .join(" "),
                                        }}
                                      />

                                      <span
                                        className="read-more-text"
                                        onClick={(e) => {
                                          // Make it high priority
                                          e.preventDefault()
                                          e.stopPropagation()

                                          history.push(
                                            `/ads?id=${item3.Content_ID}`
                                          )
                                        }}
                                      >
                                        {" "}
                                        read more...
                                      </span>
                                    </>
                                  ) : (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item3?.Content_Description,
                                      }}
                                    />
                                  )}
                                </div>
                              </>
                            ) : (
                              <div
                                className={`  video-box thumbnail-ads-section adds-right-image-card ${
                                  item3.VideoURL ? "pointer" : ""
                                } `}
                                style={{
                                  width: "100%",
                                  padding: "0px",
                                }}
                                onClick={() =>
                                  item3?.VideoURL && handleClick(item3)
                                }
                              >
                                <CardTitle
                                  tag="h4"
                                  className="one-line-heading"
                                >
                                  {item3?.Content_Title}
                                </CardTitle>
                                <img
                                  src={
                                    baseImageUrl +
                                    item3?.DocAttachmentPath +
                                    "/" +
                                    item3?.FileGeneratedName
                                  }
                                  width="100%"
                                  alt=""
                                />
                                {item3?.VideoURL && (
                                  <div className="video-box-overlay video-box-overlay2">
                                    <div className="video-box-overlay-play">
                                      {" "}
                                      <i className="fa fa-play"></i>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </Col>
                        )}
                      </Row>
                    </Col>
                  )}
                </Row>
                {dataExists && data.length > 3 && (
                  <Row>
                    <Col
                      lg="12"
                      md="12"
                      sm="12"
                      xs="12"
                      className="text-center"
                    >
                      <Link to="/ads" className="p-sm-0 btn-see-more-ads">
                        See more Ads
                      </Link>
                    </Col>
                  </Row>
                )}
              </Col>

              <Col md={1} />
            </Row>
          ) : (
            !item1 && !item2 && !item3 && <div>Work in Progress</div>
          )}
        </ApiStateHandler>
        <HomeSupport />
      </Container>
      <ReactModalVideo
        showModal={showModal}
        setShowModal={setShowModal}
        itemContent={activeAd}
      />
    </section>
  )
}

export default AdsSection
