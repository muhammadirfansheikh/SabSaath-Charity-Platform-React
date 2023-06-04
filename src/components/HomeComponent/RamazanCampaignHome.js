import React, { useState, useEffect } from "react"
import {
  Col,
  Container,
  Row,
  Card,
  Button,

  CardFooter,
} from "reactstrap"
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel"
import {
  Get_All_Relief,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
  Get_All_Ramazan_Campaign,
} from "utils/CommonMethods"
// import Swal from 'sweetalert2';
// import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl, casedetail_p } from "utils/Api"
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js"
import HomeHeader from "../Header/HomeHeader.js"
import HomeFooter from "../Footer/HomeFooter.js"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import qurbanibanner from "../../assets/img/home/PakFloodRelef2022.jpg"
import qurbanibotombanner from "../../assets/img/home/PakFloodRelef2022_bottom.jpg"
import CampaignCard from "./CampaignCard.js"
import "react-multi-carousel/lib/styles.css"



const rebuildCommunity = [1561, 1562, 1563, 1564, 1565, 1566, 1567, 1569]

const RamazanCampaignHome = (props) => {
  const [allCards, setAllCards] = useState([])
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
  const GetRamazanCampaignDetails = async () => {
    try {
      var data = await Get_All_Ramazan_Campaign(0, 0)
      if (data != null) {
        setAllCards(data.Table)
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  useEffect(() => {
    GetRamazanCampaignDetails()

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
            <Link to={"/ramazancampaign"}>
            <h2 className="meals-title mb-4">
              <span className="title-bg">Zaman Foundation’s Zakat Appeal 2023</span>
            </h2>
            </Link>
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
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            pauseOnHover={true}
          >
         {allCards &&
              allCards.length > 0 &&
              // Loop on first 6 cards

              allCards
                // .slice(0, 6)
                .filter((x) => x.ParentId === SetupMasterIds.RamazanCampaign)
                .map((items, i) => (
                  <Card body key = {i}>
                    <div className="donation-box text-center">
                      <div className="" style={{ minHeight: "310px" }}>
                        <img
                          src={baseImageUrl + items.Images}
                          width="150"
                          alt=""
                        />
                        <h3 className="text-center mt-2  mb-2 card-tile-heading">
                          {items.SetupDetailName}{" "}
                        </h3>
                        <p className="text-center qurbari-booking mb-0">
                          {items.tagline} <br></br>
                        </p>
                      </div>
                      {
                        // items.donationsubcategoryid === SetupMasterIds.Rebuil_A_Comunity
                        rebuildCommunity.includes(
                          items.donationsubcategoryid
                        ) ? (
                          <CardFooter
                          // style={{
                          //   position: "absolute",
                          //   bottom: "5px",
                          //   width: "90%",
                          // }}
                          >
                            <Link
                              to={{
                                pathname: `/case-detail/${items.ConstantValue}`,
                                state: items, // your data array of objects
                              }}
                              className="btn mt-3 btn-primary w-100"
                            >
                              Donate
                            </Link>
                          </CardFooter>
                        ) : (
                          <CardFooter
                          // style={{
                          //   position: "absolute",
                          //   bottom: "5px",
                          //   width: "90%",
                          // }}
                          >
                            <Link
                              to={{
                                pathname: `/RamazanCampaignDonate/${items.donationsubcategoryid}`,
                                state: items, // your data array of objects
                              }}
                              className="btn mt-3 btn-primary w-100"
                              onClick={() => {
                                localStorage.setItem(
                                  "props",
                                  JSON.stringify(items)
                                )
                              }}
                            >
                              {/* Donate PKR {items.amount} */}
                              Donate{" "}
                              {ConvertNumricToComaSeparate(
                                (
                                  items.amount /
                                  selectedcurrencyValues.ConversionRate.toFixed(
                                    2
                                  )
                                ).toFixed(2)
                              ) +
                                " " +
                                selectedcurrencyValues.CurrencyFromSymbol}
                            </Link>
                          </CardFooter>
                        )
                      }
                    </div>
                  </Card>
                ))}
          </Carousel>
        </div>
      </Container>
    </section>
  )
}

export default RamazanCampaignHome
