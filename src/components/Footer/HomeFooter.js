import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Button, Col, Container, Input, Row } from "reactstrap"

//import {footer} from "reactstrap";
//import {fetchData} from '../utils/Api.js'
//import {ApiMethods} from '../utils/Constants.js'
import googleplay from "../../assets/img/home/googleplay.png"
import wahtsappImage from "../../assets/img/whatsapp.png"
import payment01 from "../../assets/img/home/payment01.png"
import { Email_SubScribe, validateEmail } from "utils/CommonMethods.js"
import meezan from "../../assets/img/home/meezan.png"
import alhabib from "../../assets/img/home/AL-Habib.png"

import Swal from "sweetalert2"
import { CardFrame } from "frames-react"
const HomeFooter = (props) => {
  const [Email, SetEmail] = useState("")

  function OnTextChange(e) {
    SetEmail(e.target.value)
  }
  const onSubmit = async () => {
    let checkEmail = validateEmail(Email)
    if (checkEmail === null) {
      Swal.fire({ title: "Error", text: "Invalid Email format", icon: "error" })
      return
    }

    try {
      var data = await Email_SubScribe(Email)
      if (data?.data.DataSet?.Table[0].haserror === 0) {
        Swal.fire({
          title: "Success",
          text: data?.data?.DataSet?.Table[0].MESSAGE,
          icon: "success",
        })
        Email = ""
        return data
      } else {
        Swal.fire({
          title: "Error",
          text: data?.data?.DataSet?.Table[0].MESSAGE,
          icon: "error",
        })
        return
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
    }
  }
  return (
    <>
      <footer className="hfooter">
        <section
          className={`section pt-4 pb-4 bank-information ${
            !props?.hideFooter && !props?.bankContent ? "d-none" : ""
          }  `}
        >
          <Container>
            <Row>
              {props?.bankContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: props?.bankContent }}
                  className="col-sm-12 col-md-6 col-lg-6"
                ></div>
              ) : null}
            </Row>
          </Container>
        </section>
        <section
          className={`section pt-4 pb-4 bank-information ${
            props?.hideFooter ? "d-none" : ""
          }  `}
        >
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12">
                <h4 className="mb-2">
                  For Sadaqa, Qurbani and General Donations
                </h4>
                <div class="case-img">
                  <img width={450} src={alhabib} alt="" />
                  <p
                    className="mt-3"
                    style={{ fontSize: "16px", marginBottom: "0px" }}
                  >
                    <strong>
                      Please send your proof of payment via WhatsApp on
                      +923018444959 with your full name.
                    </strong>
                  </p>

                  <ul class="list-unstyled list-py-1 pt-0 pb-2">
                    <li>
                      <div class="">
                        {" "}
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Bank: </b>Bank AL Habib Limited
                        </p>{" "}
                      </div>{" "}
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>A/C Title:</b> Zaman Foundation
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>A/C No: </b>00650081011444013
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>IBAN:</b> PK26BAHL0065008101144401
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b> Bank Swift Code:</b> BAHLPKKAXXX
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Branch Name:</b> Bank Al Habib
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Branch Address: </b>Plot#120 shadman colony No 1
                          Lahore
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg="6" md="6" sm="12">
                <h4 className="mb-2">For Zakat</h4>
                <div class="case-img">
                  <img width={350} src={meezan} alt="" />
                  <p
                    className="mt-3"
                    style={{ fontSize: "16px", marginBottom: "0px" }}
                  >
                    <strong>
                      For Western Union, Xoom and International Bank Fund
                      Transfer (IBFT)
                    </strong>
                  </p>

                  <ul class="list-unstyled list-py-1 pt-0 pb-2">
                    <li>
                      <div class="">
                        {" "}
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Bank: </b>Meezan Bank Limited
                        </p>{" "}
                      </div>{" "}
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>A/C Title:</b> Zaman Foundation
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>A/C No: </b>1135 0105155173
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>IBAN:</b> PK43 MEZN 0011 3501 0515 5173
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b> Bank Swift Code:</b> MEZNPKKAXXX
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Branch Name:</b> Meezan Bank Limited
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="">
                        <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                          <b>Branch Address: </b>Property No. 158, Shah Jamal
                          Scheme, Main Shah Jamal Road, Lahore
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col
                lg="4"
                md="6"
                sm="12"
                className="d-flex align-items-center d-none"
              >
                <h6 style={{ textTransform: "unset" }}>
                  {/* <strong>Please send your proof of payment via WhatsApp on +923018444959 with your full name.</strong> */}
                </h6>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section footer-subscribe">
          <Container>
            <div
              class="avs"
              title="Message Us"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "110px",
                height: "100px",
              }}
            >
              <label
                className="badge"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Chat with us
              </label>
              <a
                href="https://wa.me/3018444959"
                title="Message Us"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={wahtsappImage}
                  width="60"
                  height="60"
                  alt=""
                  title="Message Us"
                  class="img-small"
                />
              </a>
            </div>
            {/* <Row>
                        <Col sm="1" lg="3" md="1">
                        </Col>
                        <Col sm="1" lg="3" md="1">
                        </Col>
                    </Row> */}
          </Container>
        </section>
        <section className="section main-footer">
          <Container>
            <Row>
              <Col lg="3" md="6" sm="12">
                <div className="aboutus">
                  <h4 className="footer-title">About Us</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="/about-us#how-we-started"> How We Started</a>
                    </li>
                    <li>
                      <a href="/about-us#vision-mission"> Vision and Mission</a>
                    </li>
                    <li>
                      <a href="/about-us#our-values"> Our Values</a>
                    </li>
                    <li>
                      <a href="/about-us#what-we-do"> What We Do</a>
                    </li>
                    <li>
                      <a href="/about-us#how-we-work"> How We Work</a>
                    </li>
                    <li>
                      <a href="/about-us#what-makes-us-unique">
                        {" "}
                        What Makes us Unique
                      </a>
                    </li>
                    <li>
                      <a href="/about-us#our-partner"> Our Partners</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg="3" md="6" sm="12">
                <div className="basics">
                  <h4 className="footer-title">Basics</h4>
                  <ul className="footer-list">
                    <li>
                      <Link to="/volunteer">Volunteer</Link>
                    </li>
                    <li>
                      <Link to="/impact">Impact</Link>
                    </li>
                    <li>
                      <Link to="/register"> Register</Link>
                    </li>
                    <li>
                      <Link to="/testimonials">Testimonials</Link>
                    </li>
                    <li>
                      <Link to="/cases-list">Cases List</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/cases-list">Donate</Link>
                    </li>
                    {/* <li>
                                        <Link to='/blogs'>Blog</Link>
                                    </li> */}
                  </ul>
                </div>
              </Col>
              <Col lg="3" md="6" sm="12">
                <div className="events">
                  <h4 className="footer-title">Contact Information</h4>
                  <div className="followus">
                    <ul className="footer-list">
                      <li>
                        <span>21 Waris Road, Lahore</span>
                      </li>
                      <li>Tel: 042-111-222-500</li>
                      <li>
                        <a href="mailto:info@sabsaath.org">info@sabsaath.org</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col lg="3" md="6" sm="12">
                <h4 className="footer-title">Follow Us</h4>
                <ul className="social-icons-footer">
                  <li>
                    <a
                      href="https://www.facebook.com/SabSaath.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/sabsaathpk?utm_medium=copy_link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/zamanfoundation/ "
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>

                  {/* <li><a href="https://www.facebook.com/Zaman-Foundation-102213031342658" target="_blank"><i className='fa fa-facebook'></i></a></li>
                                             <li><a href="#"><i className='fa fa-twitter'></i></a></li>
                                        <li><a href="#"><i className='fa fa-youtube'></i></a></li>
                                            <li><a href="https://instagram.com/sabsaathpk?utm_medium=copy_link" target="_blank"><i className='fa fa-instagram'></i></a></li>
                                            {/* <li><a href="#"><i className='fa fa-rss'></i></a></li>  */}
                </ul>
                <div className="questions mb-2">
                  <a
                    href="https://wa.me/3018444959"
                    target="_blank"
                    className="waBtn btn btn-primary text-light ml-0"
                    rel="noreferrer"
                  >
                    Chat with us
                  </a>
                  <span className="d-block">
                    Monday to Saturday 09:00 am - 06:00 pm PST
                  </span>
                </div>

                <div className="payment">
                  <img src={payment01} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section footer-copyright">
          <Container>
            <Row>
              <Col>
                <div className="copyright text-center">
                  <p className="copyright-text">
                    Copyright © 2023 Sab Saath. All Rights Reserved.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </footer>
    </>
  )
}
export default HomeFooter
