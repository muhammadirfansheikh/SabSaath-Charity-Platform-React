import React, { useState, useEffect } from "react"
import {
  Col,
  Container,
  Nav,
  Row,
  Card,
  Progress,
  Spinner,
  CardFooter,
} from "reactstrap"
import { Link } from "react-router-dom"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import {
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
  Get_All_FeaturedNGOs,
  Case_Of_The_Day,
} from "utils/CommonMethods"
import { baseImageUrl } from "utils/Api"
import CenteredLoader from "components/GeneralComponent/CenteredLoader"
import { DefaultImgPath, SetupMasterIds } from "utils/Constants"
import FeaturedNGOsCard from "components/FeaturedNGOsCard"
import { Img } from "react-image"

const SpecialAppeals = (props) => {
  const [loading, setLoading] = useState(false)
  const [caseddl, setCaseddl] = useState([])

  const CaseOfTheDay = async () => {
    try {
      const data = await Case_Of_The_Day(0, 0)
      const donationIDs = data?.Table2[0]?.DonationIDs.split(",").map(Number)
      const case1 =
        data?.Table && data?.Table.length > 0 ? data?.Table[0] : null
      const case2 = data?.Table1.filter((item) => {
        return donationIDs.includes(item.donationsubcategoryid)
      })

      if (data != null) {
        setCaseddl([case1, ...case2])

        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  useEffect(() => {
    CaseOfTheDay()
  }, [])

  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
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
      breakpoint: { max: 1024, min: 501 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  }

  useEffect(() => {
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
    <section className="section section-meals section-cases pt-4 pb-4">
      <Container>
        <Row>
          <Col>
            <h2 className="meals-title mb-4">
              <span className="title-bg"> Special Appeals </span>
            </h2>
          </Col>
        </Row>
        <div className="IndicatorCarousel">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={7500}
            shouldResetAutoplay={false}
            keyBoardControl={true}
            autoPlayInterval={7500}
            interval={7500}
            transitionDuration={500}
            containerClass="carousel-container"
            //  containerClass="carousel-container justify-content-center"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            pauseOnHover={true}
          >
            {caseddl && caseddl.length > 0 ? (
              caseddl.map((items, i) => {
                return items ? (
                  <Card body key = {i} >
                    <div className="donation-box text-center">
                      <div className="" style={{ minHeight: "280px" }}>
                        <div className="dimg-box">
                          <Img
                            src={[
                              items?.DocAttachment
                                ? baseImageUrl + items?.DocAttachment
                                : baseImageUrl + items?.AppealImages,
                              DefaultImgPath,
                            ]}
                            loader={<CenteredLoader />}
                            alt=""
                          />
                        </div>

                        <h3 className="text-center mt-2  mb-2 card-tile-heading one-line-heading ">
                          {items?.CaseTitle
                            ? items?.CaseTitle
                            : items?.SetupDetailName}{" "}
                        </h3>
                        <p className="text-center qurbari-booking mb-0 two-lines-paragraph">
                          {items?.ShortDesc ? items?.ShortDesc : items?.tagline}

                          <br />
                          {/* {data?.ShortDesc.substring(0, 66) + ".."} */}
                        </p>
                      </div>
                      <CardFooter>
                        <Link
                          to={
                            items?.taglineid && items?.taglineid === 34
                              ? items?.ConstantValue
                                ? `/case-detail/${items.ConstantValue}`
                                : `/RamazanCampaignDonate/${items?.donationsubcategoryid}`
                              : `/case-detail/${items.ApplicantCaseId}`
                          }
                          className="btn mt-3 btn-primary w-100"
                          rel="noreferrer"
                        >
                          Donate Now
                        </Link>
                      </CardFooter>
                    </div>
                  </Card>
                ) : null
              })
            ) : (
              <CenteredLoader />
            )}
          </Carousel>
        </div>
      </Container>
    </section>
  )
}

export default SpecialAppeals
