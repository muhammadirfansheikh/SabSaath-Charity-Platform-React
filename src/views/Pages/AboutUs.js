import React from "react"
import { Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import about01 from "../../assets/img/home/about01.png"
import about02 from "../../assets/img/home/about02.png"
import about03 from "../../assets/img/home/about03.png"
import about04 from "../../assets/img/home/about04.png"
import about05 from "../../assets/img/home/about05.JPG"
import processimg1 from "../../assets/img/home/processimg1.jpg"
import Ourpartners from "./Ourpartners.js"

const AboutUs = (props) => {
  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">About Us</h1>
          </div>
        </section>
        <section id="how-we-started" className="section">
          <div className="container">
            <Row>
              <Col md={12}>
                <h2 className="mb-2">How We Started</h2>
                <h2>
                  {/* <span className="text-red">Sab Saath</span> was started when{" "}
                  <span className="text-red">COVID-19</span> hit Pakistan in
                  March of 2020.{" "} */}
                </h2>
                <h4 className="mb-4">
                  Sab Saath is a project of{" "}
                  <a href="http://www.zamanfoundation.pk/" target="blank">
                    <u>Zaman Foundation</u>
                  </a>
                  . It was launched in response to the pandemic by co-founders
                  Babar Rashid, Abdullah Khan and Omar Badi-uz-Zaman with
                  notable contributions by Sarfraz Niazi.
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>Most relief organizations were large... </p>

                <p>
                  Additionally, the multi-pronged nature of the response (food,
                  cash, medical and protective kits) meant that this could
                  potentially become an uncoordinated effort since no single
                  organization could handle all 4 of these efforts.
                </p>
                <p>
                  This led to the formation of{" "}
                  <strong className="text-red">Sab Saath</strong> - One single
                  platform that coordinated relief across organizations and
                  routed help to where it was most needed. More importantly, our
                  platform itself dispensed immediate and rapid assistance to
                  people much quicker than most, larger organizations.{" "}
                </p>
                <p>
                  In our fight against Covid-19, we realized that such a
                  transparent and dynamic platform - where individuals and
                  organizations could come together to become so much more than
                  the sum of their parts - is the need of the hour.{" "}
                </p>
              </Col>
              <Col md={6}>
                <img src={about01} alt="" style={{ width: "100%" }} />
              </Col>
            </Row>
          </div>
        </section>
        <section id="vision-mission" className="section bg-grey">
          <div className="container">
            <Row>
              <Col md={6}>
                <img src={about02} alt="" style={{ width: "100%" }} />
              </Col>
              <Col md={6}>
                <h2 className="mb-2">Vision</h2>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      To create and mobilize a dynamic coalition for a
                      poverty-free Pakistan.
                    </span>
                  </li>
                </ul>
                <h2 className="mb-2">Mission</h2>
                <p>
                  <strong>
                    To become 'the' Crowd-Funded 'super hub' for Charity
                  </strong>
                </p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      {" "}
                      To become a verifying and certifying body for NGOs
                      operating in Pakistan
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      {" "}
                      To ensure swift, transparent and efficient distribution of
                      funds to deserving families
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      {" "}
                      To create a digital help desk for those who want to help
                      and those who are in need
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      {" "}
                      To provide a platform for individuals (donors, volunteers,
                      social workers etc.) and organizations to use for
                      collaboration on social welfare and relief projects
                    </span>
                  </li>

                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      To build a robust and dynamic network of philanthropists
                      and philanthropic organizations across the globe
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    {" "}
                    <i className="fa fa-check fa-1x text-red"></i>
                    <span className="pl-3">
                      To provide consultancy and guidance for budding NGOs and
                      charitable organizations.
                    </span>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </section>
        <section id="our-values" className="section">
          <div className="container">
            <Row>
              <Col md={12}></Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="p-4">
                  <h2 className="mb-2">Our Values</h2>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item p-2 d-flex pl-0">
                      {" "}
                      <i className="fa fa-check fa-1x text-red"></i>
                      <span className="pl-3">
                        {" "}
                        <strong>Compassion:</strong> alleviate misery and spread
                        joy
                      </span>
                    </li>
                    <li className="list-group-item p-2 d-flex pl-0">
                      {" "}
                      <i className="fa fa-check fa-1x text-red"></i>
                      <span className="pl-3">
                        {" "}
                        <strong>Integrity:</strong> to be honest and transparent
                        in all that we do
                      </span>
                    </li>
                    <li className="list-group-item p-2 d-flex pl-0">
                      {" "}
                      <i className="fa fa-check fa-1x text-red"></i>
                      <span className="pl-3">
                        {" "}
                        <strong>Sustainability:</strong> to take the torch from
                        the older generation, carry it well and pass it on to
                        the next
                      </span>
                    </li>
                    <li className="list-group-item p-2 d-flex pl-0">
                      {" "}
                      <i className="fa fa-check fa-1x text-red"></i>
                      <span className="pl-3">
                        {" "}
                        <strong>Ingenuity:</strong> to leverage technology to
                        maximize our impact
                      </span>
                    </li>

                    <li className="list-group-item p-2 d-flex pl-0">
                      {" "}
                      <i className="fa fa-check fa-1x text-red"></i>
                      <span className="pl-3">
                        <strong>Excellence:</strong> to adopt and utilize the
                        best global practices
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <img src={about03} alt="" style={{ width: "100%" }} />
              </Col>
            </Row>
          </div>
        </section>
        <section id="what-we-do" className="section bg-lred">
          <div className="container">
            <Row>
              <Col md={6}>
                <img src={about05} alt="" style={{ width: "100%" }} />
              </Col>
              <Col md={6} className="p-5">
                <h2 className="mb-2">What We Do</h2>
                <p>
                  We are a platform that connects those who want to help with
                  those who need it. Moreover, we ensure all cases are
                  thoroughly investigated and verified by our team of
                  investigation officers. In places where we don’t have boots on
                  the ground, our certified partner organizations do the
                  verifications for us.
                </p>
              </Col>
            </Row>
          </div>
        </section>

        <section id="how-we-work" className="section">
          <div className="container">
            <Row>
              <Col md={12} className="text-center">
                <h2 className="mb-2">How We Work</h2>
              </Col>
            </Row>
            <div className="text-center">
              <img src={processimg1} alt="" />
            </div>
          </div>
        </section>

        <section id="what-makes-us-unique" className="section bg-red">
          <div className="container">
            <Row>
              <Col md={6} className="p-2">
                <h2 className="mb-2">What Makes Us Unique</h2>
                <ul className="list-group list-group-flush list-glunique">
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>100% of your donations go to charity</h4> Private
                      donors cover all administrative costs.
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>Thorough investigation policy</h4> We ensure
                      genuineness of each case.
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>
                        Omni-channel money transfer solutions across Pakistan
                      </h4>
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>Holistic approach</h4> Tailor-made solutions for every
                      individual/family.
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>We practice equality</h4> All cases are tended to on a
                      first-come-first-serve basis.
                    </span>
                  </li>
                  <li className="list-group-item p-2 d-flex pl-0">
                    <i className="fa fa-check fa-2x text-light"></i>
                    <span className="pl-3">
                      <h4>Direct engagement with institutions </h4> To guarantee
                      that payments are used as intended, we liaison with
                      institutions for direct correspondence.
                    </span>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <img src={about04} alt="" style={{ width: "100%" }} />
              </Col>
            </Row>
          </div>
        </section>

        <section id="our-partner" className="section ">
          <div className="container">
            <Row>
              <Col md={12} className="p-2">
                <Ourpartners />
              </Col>
            </Row>
          </div>
        </section>

        <section className="section bg-lred">
          <div className="container">
            <Row>
              <Col></Col>
              <Col md={8} className="text-center">
                <div className="volunteer-box">
                  <h2 className="mb-2">Become a Volunteer</h2>
                  <Link to="/volunteer" className="btn btn-secondary">
                    Join Now
                  </Link>
                </div>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default AboutUs
