import React, { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { baseImageUrl } from "utils/Api.js"
import quotes from "../../assets/img/home/quotes.png"
import { TestimonialController } from "utils/CommonMethods.js"
import ReactPlayer from "react-player"
import video from "../../assets/img/how-it-work-video.mp4"
import bgvideo from "../../assets/img/home/icon2/bg-video.png"
const Testinomial = (props) => {
  const [testimonials, setTestimonials] = useState([])
  const GetTestimonials = async () => {
    //
    try {
      var data = await TestimonialController(1)
      if (data != null) {
        setTestimonials(data)
        return data
      } else {
        // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
        return []
      }
    } catch (error) {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
    }
  }
  useEffect(() => {
    GetTestimonials()
  }, [])

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />

      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Testimonials</h1>
          </div>
        </section>
        <section className="section-success mt-5 mb-4">
          <Container>
            <Row className="mb-5">
              {testimonials &&
                testimonials.map((item, key) =>
                  !item.TestimonialType ? (
                    <Col md={6} key="key">
                      <Card body>
                        <div className="quotesss p-4">
                          <img src={quotes} alt="" />
                          <p className="testimonialText">{item.TestimonialsDesc}</p>
                          <h4 className="testimonee-name">{item.Name}</h4>
                        </div>
                      </Card>
                    </Col>
                  ) : (
                    <Col lg="6" md="12" sm="12" xs="12">
                    <Card
                      body
                      style={{
                        padding: "0px",
                      }}
                    >
                      <div className="quotesss">
                        <div className="videoss">
                          <ReactPlayer
                            url={video}
                            playing={true}
                            controls={true}
                            loop={true}
                            muted={true}
                            playsinline={false}
                            width={"100%"}
                            height={230}
                            light={bgvideo}
                            className="rebuilding-video"
                          />
                        </div>
                      </div>
                    </Card>
                  </Col>
                  )
                )}
            </Row>
          </Container>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default Testinomial
