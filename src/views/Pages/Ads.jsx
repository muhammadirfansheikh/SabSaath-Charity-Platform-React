import React, { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { MarketingContentController } from "utils/CommonMethods.js"
import ReactModalVideo from "components/GeneralComponent/ReactModalVideo.jsx"
import useApiCallOnMount from "hooks/useApiCallOnMount.js"
import ApiStateHandler from "components/GeneralComponent/ApiStatusHandler.jsx"
import { baseImageUrl } from "utils/Api.js"
import { MarketingContentModules } from "utils/Constants.js"

const AdsDetailID = MarketingContentModules.AdsModule
const GetAds = async () => {
  try {
    var { data } = await MarketingContentController(2, 0, AdsDetailID)
    if (data?.DataSet?.Table) {
      return data.DataSet.Table.filter((item) => item.Content_Display)
    } else {
      return []
    }
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const Ads = () => {
  const [activeAd, setActiveAd] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, data, error] = useApiCallOnMount(GetAds)
  const dataExists = data && data.length > 0
  // Get query string parameter
  const queryStrings = new URLSearchParams(window.location.search)
  const id = queryStrings.get("id")
  const handleClick = (ad) => {
    setActiveAd(ad)
    setShowModal(true)
  }

  useEffect(() => {
    if (!loading && !error && data.length > 0 && id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }, [loading])

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />

      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Ads</h1>
          </div>
        </section>
        <section className="section-success mt-5 mb-4">
          <Container>
            <ApiStateHandler loading={loading} error={error}>
              {dataExists && (
                <Row className="mb-5">
                  {data &&
                    data.map((item, key) =>
                      item.Content_Description ? (
                        <Col
                          lg="12"
                          md="12"
                          sm="12"
                          xs="12"
                          key={key}
                          id={item.Content_ID}
                        >
                          <Card
                            style={{
                              width: "100%",
                              padding: "0px",
                            }}
                            className="bg-greyish"
                          >
                            <CardBody className="pt-2">
                              <CardTitle tag="h4" className="one-line-heading">
                                {item.Content_Title}
                              </CardTitle>
                              <CardText className="ads-content-description-page">
                               
                                <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.Content_Description,
                                }}
                              />
                              </CardText>
                              {/* <CardText className="ads-content-description-page">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. In eleifend gravida ex ut
                                aliquam. Sed at orci sapien. Sed euismod
                                faucibus nisi, congue efficitur erat eleifend
                                et. Fusce dictum suscipit ipsum, ut auctor enim
                                varius sit amet. Suspendisse efficitur lorem
                                vitae enim dapibus, sed fermentum arcu semper.
                                Mauris vitae sem ac diam tempor consequat non
                                nec lectus. Integer nec lorem dapibus, pretium
                                ligula eu, gravida tellus. Mauris molestie,
                                libero a faucibus tincidunt, ex tortor aliquam
                                odio, at interdum orci mi in arcu. Cras lectus
                                elit Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. In eleifend gravida ex ut
                                aliquam. Sed at orci sapien. Sed euismod
                                faucibus nisi, congue efficitur erat eleifend
                                et. Fusce dictum suscipit ipsum, ut auctor enim
                                varius sit amet. Suspendisse efficitur lorem
                                vitae enim dapibus, sed fermentum arcu semper.
                                Mauris vitae sem ac diam tempor consequat non
                                nec lectus. Integer nec lorem dapibus, pretium
                                ligula eu, gravida tellus. Mauris molestie,
                                libero a faucibus tincidunt, ex tortor aliquam
                                odio, at interdum orci mi in arcu. Cras lectus
                                elit
                              </CardText> */}
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <Col
                          lg="6"
                          md="12"
                          sm="12"
                          xs="12"
                          key={key}
                          id={item.Content_ID}
                        >
                          <Card
                            style={{
                              width: "100%",
                              padding: "0px",
                            }}
                            onClick={() =>
                              item.VideoURL ? handleClick(item) : ""
                            }
                            className={
                              item.VideoURL
                                ? "ad-video-card bg-none pointer"
                                : "ad-video-card bg-none"
                            }
                          >
                            <CardTitle tag="h4" className="one-line-heading">
                              {item.Content_Title}
                            </CardTitle>
                            <div class="video-box">
                              <img
                                src={
                                  baseImageUrl +
                                  item.DocAttachmentPath +
                                  "/" +
                                  item.FileGeneratedName
                                }
                                width="100%"
                                alt=""
                                className={item.VideoURL ? "pointer" : ""}
                                onClick={() =>
                                  item.VideoURL ? handleClick(item) : ""
                                }
                              />
                              {item.VideoURL && (
                                <div className="video-box-overlay">
                                  <div className="video-box-overlay-play">
                                    {" "}
                                    <i className="fa fa-play"></i>
                                  </div>
                                </div>
                              )}
                            </div>

                            <CardBody className="pt-2">
                              {item.Content_Description && (
                                <CardText>
                                  <p className="two-lines-paragraph">
                                    {
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.Content_Description,
                                        }}
                                      />
                                    }
                                  </p>
                                </CardText>
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      )
                    )}
                </Row>
              )}
              {data?.length === 0 && (
                <Col lg="6" md="12" sm="12" xs="12">
                  <Card
                    style={{
                      width: "100%",
                      padding: "0px",
                    }}
                  >
                    <div>Work in Progress</div>
                  </Card>
                </Col>
              )}
            </ApiStateHandler>
          </Container>
        </section>
      </div>
      <ReactModalVideo
        showModal={showModal}
        setShowModal={setShowModal}
        itemContent={activeAd}
      />

      <HomeFooter />
    </div>
  )
}

export default Ads
