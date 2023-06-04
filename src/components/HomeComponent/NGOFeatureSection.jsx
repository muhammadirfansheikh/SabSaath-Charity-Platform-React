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
  NGOController,
} from "utils/CommonMethods"
import { baseImageUrl } from "utils/Api"
import CenteredLoader from "components/GeneralComponent/CenteredLoader"
import { SetupMasterIds } from "utils/Constants"
import FeaturedNGOsCard from "components/FeaturedNGOsCard"

const NGOFeaturedSection = (props) => {
  const [loading, setLoading] = useState(false)
  const [allCasesddl, setAllCasesddl] = useState([])
  const [allCards, setAllCards] = useState([])
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
    <section className="section section-meals pt-4 pb-4">
      <Container>
        <Row>
          <Col>
            <h2 className="meals-title mb-4">
              <span className="title-bg">Trusted NGOs</span>
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
            containerClass="carousel-container row"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px  "
            pauseOnHover={true}
          >
            {allCards &&
              allCards.map((items, i) => {
                return (
                  <Card body className="pb-0 ml-3" key={i}>
                    <div className="donation-box text-center">
                      <div>
                        <img src={items?.ImageURL} height="100" alt="" />
                      </div>
                      <div className="" style={{ minHeight: "80px" }}>
                        <h3 className="text-center mt-2  mb-2 card-tile-heading ">
                          {items?.Heading ? items?.Heading : null}{" "}
                        </h3>
                      </div>
                      <CardFooter>
                        <Link
                          to={
                            items?.NGOFeatureID ===
                              SetupMasterIds.ZamanFoundation ||
                            items?.NGOFeatureID ===
                              SetupMasterIds.ZamanFoundationNGO
                              ? "ramazancampaign"
                              : `/cases-list/${items.NGOFeatureID}`
                          }
                          className="btn btn-primary w-100"
                          rel="noreferrer"
                        >
                          Donate
                        </Link>
                      </CardFooter>
                    </div>
                  </Card>
                )
              })}
          </Carousel>
        </div>
      </Container>
    </section>
  )
}

export default NGOFeaturedSection
