import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import floodImpact from "../../assets/img/impact/flood-impact.jpg"
const FloodImpact = () => {
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />

      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Impact</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Row>
              <Col md={9} className="text-left">
                <h2>
                  {" "}
                  <span className="text-red">Pakistan Floods Relief</span>
                </h2>
                
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img
                        src={floodImpact}
                        alt=""
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default FloodImpact
