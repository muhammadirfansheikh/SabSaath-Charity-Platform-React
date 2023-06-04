import React, { useState, useEffect } from "react"

import {
  CarouselControl,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  NavLink,
  Card,
} from "reactstrap"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import video from "../../assets/img/how-it-work-video.mp4"
import bgvideo from "../../assets/img/home/icon2/bg-video.png"
import { TestimonialController } from "utils/CommonMethods"
import { SetupMasterIds } from "../../utils/Constants.js"
import quotes from "../../assets/img/home/quotes.png"

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(null)
  const GetTestimonials = async () => {
    //
    try {
      var data = await TestimonialController(1)
      if (data) {
        const promotedTestimonials = data?.filter(
          (item) => item.IsPromoted === 1 || item.IsPromoted === true
        )

        // Just keep one video and one text testimonial
        let videoTestimonials = promotedTestimonials.find((item) => {
          return item.TestimonialType
        })

        let textTestimonials = promotedTestimonials.find((item) => {
          return !item.TestimonialType
        })

        setTestimonials([textTestimonials, videoTestimonials])
        // setTestimonials(promotedTestimonials)
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  useEffect(() => {
    GetTestimonials()
  }, [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const next = () => {
    if (animating) return
    const nextIndex =
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  return (
    <section className="section section-work section-success pt-4 pb-5">
      <Container>
        <h2 className="works-title-top mb-4">
          <span className="title-bg"> Testimonials</span>
        </h2>
        <Row style={{ alignItems: "center" }}>
          {/* {testimonials?.length > 0 ? (
            <Carousel
              activeIndex={activeIndex}
              next={next}
              ride="carousel"
              previous={previous}
              responsive={true}
              autoPlay={false}
              autoPlaySpeed={7500}
              infinite={true}
              swipeable={false}
              draggable={false}
              showDots={false}
              ssr={true} // means to render carousel on server-side.
              // Time difference between auto play transitions in seconds.
              autoPlayInterval={7500}
              interval={7500}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px p-3"
              pauseOnHover={true}
            >
              {testimonials && testimonials.length > 0 ? (
                testimonials.map((item) => {
                  return (
                    <CarouselItem
                      onExiting={() => setAnimating(true)}
                      onExited={() => setAnimating(false)}
                      key={item?.key}
                      responsive={true}
                    >
                      {item.TestimonialType === 0 ? (
                        <Col lg="5" md="12" sm="12" xs="12">
                          <Card
                            body
                            style={{
                              height: "265px",
                              padding: "0px",
                            }}
                          >
                            <div className="quotesss p-4">
                              <img src={quotes} alt="" />
                              <p>{item.TestimonialsDesc}</p>
                              <h4>{item.Name}</h4>
                            </div>
                          </Card>
                        </Col>
                      ) : (
                        <Col lg="5" md="12" sm="12" xs="12">
                          <div className="videoss">
                            <ReactPlayer
                              url={video}
                              playing={true}
                              controls={true}
                              loop={true}
                              muted={true}
                              playsinline={false}
                              width={"100%"}
                              height={275}
                              light={bgvideo}
                              className="rebuilding-video"
                            />
                          </div>
                        </Col>
                      )}
                    </CarouselItem>
                  )
                })
              ) : (
                <CarouselItem
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={1}
                  responsive={true}
                >
                  <div></div>
                </CarouselItem>
              )}
            </Carousel>
          ) : null} */}

          {testimonials && testimonials.length > 0
            ? testimonials.map((item, i) =>
                !item ? null : !item.TestimonialType ? (
                  <Col lg="5" md="12" sm="12" xs="12" key = {i}>
                    <Card
                      body
                      style={{
                        padding: "0px",
                      }}
                      
                    >
                      <div className="quotesss p-4">
                        <img src={quotes} alt="" />
                        <p className="testimonialText">
                          {item.TestimonialsDesc}
                        </p>
                        <h4 className="testimonee-name">{item.Name}</h4>
                      </div>
                    </Card>
                  </Col>
                ) : (
                  <Col lg="5" md="12" sm="12" xs="12" key = {i}>
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
              )
            : null}

          <Col lg="2" md="12" sm="12" xs="12">
            <Link to="/testimonials" className=" mt-2 text-decoration-none">
              Read more
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TestimonialsSection
