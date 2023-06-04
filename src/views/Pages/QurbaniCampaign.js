import React, { useState, useEffect } from "react"
import { Col, Container, Row, Card } from "reactstrap"
import { Link } from "react-router-dom"
import { Get_All_Relief } from "utils/CommonMethods"
import Swal from "sweetalert2"
import QurbaniComp from "../../assets/img/home/goat-img.png"
import { baseImageUrl } from "utils/Api"
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import qurbanibanner from "../../assets/img/home/Eid-ul_azha_banner.jpg"
import qurbanibotombanner from "../../assets/img/home/Ediulazha_bottom_banner.jpg"

const QurbaniCampaign = (props) => {
  const [allRelief, setAllRelief] = useState([])

  const GetAllFoodRelief = async () => {
    try {
      var data = await Get_All_Relief(0, 0)
      if (data != null) {
        setAllRelief(data.Table)
        return data
      } else {
        // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
        return []
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
      return []
    }
  }
  useEffect(() => {
    GetAllFoodRelief()
  }, [])
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <section
        id="inner-banner"
        className="section"
        style={{ backgroundImage: `url(${qurbanibanner})` }}
      >
        <div className="container">
          <h1 className="mb-0">Qurbani 2023</h1>
        </div>
      </section>
      <section className="section section-meals pt-5 pb-4">
        <Container>
          {/* <Row className="text-primary">
                <Col>
                    <h3 id={props?.mealId} className='meals-title mb-2 pt-3'>100% of your qurbani donations will feed povertstricken families of Lahore. You can provide a family in need with meat to celebrate this Eid!</h3>
                </Col>
            </Row> */}

          <Row>
            <Col>
              <h2 className="meals-title mb-5">
                <center>Qurbani Bookings</center>
              </h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 className="meals-title mb-2">
                100% of your Qurbani donations will feed the most disadvantaged
                among us. Make this Eid one to remember for families in need!
              </h3>
              <h3 className="text-primary mb-5">
                Let’s celebrate Eid!
                <strong>
                  <i> #SabSaathMilKar</i>
                </strong>
              </h3>
            </Col>
          </Row>

          {/* <Row>
                <Col>
                <h3 className="text-primary"><strong><i>#BaanteinBarhiKhushiyan</i></strong></h3>
                </Col>
            </Row> */}

          <Row>
            {/* Last 3 line */}
            {allRelief &&
              allRelief
                .filter(
                  (x) => x.ConstantValue === SetupMasterIds.QurbaniConstant
                )
                .map((items, key) => (
                  <Col lg="4" md="4" sm="12" key={key}>
                    <Card body>
                      <div className="donation-box text-center">
                        <div className="">
                          <img
                            src={baseImageUrl + items.Images}
                            width="100"
                            alt=""
                          />
                          <h3 className="text-center mt-2  mb-2">
                            {items.SetupDetailName}{" "}
                          </h3>

                          <div className="qurbani-description-section">
                            <p className="text-center qurbari-booking mb-0">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: items.tagline,
                                }}
                              />

                              <br />
                            </p>
                            {items.donationsubcategoryid ===
                              SetupMasterIds.Multiple_Animals ||
                            items.donationsubcategoryid ===
                              SetupMasterIds.Cash_Donation ? (
                              ""
                            ) : (
                              <p className="text-center qurbari-booking">
                                <strong>PKR {items.amount}/-</strong>
                              </p>
                            )}
                          </div>
                        </div>

                        <Link
                          to={{
                            pathname: `/QurbaniDonate/${items.donationsubcategoryid}`,
                            state: items, // your data array of objects
                          }}
                          className="btn mt-3 btn-primary"
                        >
                          Donate Now
                        </Link>
                      </div>
                    </Card>
                  </Col>
                ))}
          </Row>
          <Row>
            <Col>
              <div className="bottom-banner mt-4 mb-4">
                <img src={qurbanibotombanner} alt="SabSaath" />
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
                  100% of your donations go to charity. Private donors cover our
                  administrative costs.
                </h3>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <Container>
            <Row>
                <Col>
                    <h2 className='meals-title mb-4'>Food</h2>
                </Col>
            </Row>
            <Row>
            {allRelief && allRelief.filter(x=> x.donationsubcategoryid === 336 || x.donationsubcategoryid === 337 || x.donationsubcategoryid === 361).map((items, key)=>(
         
                    <Col lg="4" md="4" sm="12" key={key}>
                    <Card body>
                        <div className='donation-box text-center'>
                            <div className=''>
                                <h3 className='text-center mt-2  mb-2'>{items.SetupDetailName} </h3>
                                <p className='text-center'>
                                {items.tagline} <br></br><strong>PKR {items.amount}/-</strong>
                                </p>
                            </div>
                            <Link
                            to={{
                                pathname: "/meals-donate",
                                state: items // your data array of objects
                              }}
                            className='btn mt-3 btn-primary'
                            >
                                Donate Now
                            </Link>
                        </div>
                    </Card>
                </Col>
                ))}
                
                
            </Row>

        </Container> */}
      </section>
      <HomeFooter />
    </div>
  )
}

export default QurbaniCampaign
