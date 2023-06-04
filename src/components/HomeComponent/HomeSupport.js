import React from "react"
import { Col, Container, Row, Card } from "reactstrap"
import policy from "../../assets/img/home/policy01.png"

const HomeSupport = () => {
  return (
    <section className="section section-support pt-0 pb-0">
      <Container>
        <Row className="no-gutters" > 
          <Col md={1} />
          <Col lg="10" md="12" sm="12" xs="12">
            <Card body>
              <Row>
                <Col lg="10" md="12" sm="12" xs="12" className="p-0">
                  <h4 className="pt-3 home-support-text">
                    <strong> 100%</strong> of your donations go to charity.
                    Private donors cover our administrative costs.
                  </h4>
                </Col>
                <Col lg="2" md="12" sm="12" xs="12">
                  <div className="policy-image">
                    <img src={policy} alt="" width={"50%"} />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={1} />
        </Row>
      </Container>
    </section>
  )
}

export default HomeSupport
