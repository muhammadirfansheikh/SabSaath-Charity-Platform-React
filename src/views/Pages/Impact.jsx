import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  FormGroup,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import impact1 from "../../assets/img/home/impact1.png"
import impact2 from "../../assets/img/home/impact2.png"
import impact3 from "../../assets/img/home/impact3.png"
import impact4 from "../../assets/img/home/impact4.png"
import impact5 from "../../assets/img/home/impact5.png"
import impact6 from "../../assets/img/home/impact6.png"
import impact7 from "../../assets/img/home/impact7.png"
// import report from "../../assets/img/home/SabSaathReport.pdf"

import { Link } from "react-router-dom"
const Impact = () => {
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
                  Our <span className="text-red">Covid-19</span> Blitz:
                </h2>
                <h4>
                  Our Emergency Response to The First Wave of{" "}
                  <span className="text-red">Covid-19</span> (March 2020 – July
                  2020)
                </h4>
              </Col>
              <Col md={3} className="text-right">
                {/* <Button color="primary" block href={report} download>
                  Download pdf
                </Button> */}
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact1} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact2} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact3} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact4} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact5} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact6} alt="" style={{ height: "900px" }} />
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <img src={impact7} alt="" style={{ height: "900px" }} />
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

export default Impact
