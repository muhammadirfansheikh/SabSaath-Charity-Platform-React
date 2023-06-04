import React from "react"
import { Col, Container, Row } from "reactstrap"
import impact1 from "../../assets/img/impact/1-impact.png"
import impact2 from "../../assets/img/impact/2-impact.png"
import impact3 from "../../assets/img/impact/3-impact.png"
import impact4 from "../../assets/img/impact/4-impact.png"
import impact5 from "../../assets/img/impact/5-impact.png"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const ImpactStrip = () => {
  const logos = [
    {
      FileGeneratedName: impact1,
      alt: "Partner",
      Content_Title: "135M+",
      Content_Description: "PKR Raised",
    },
    {
      FileGeneratedName: impact2,
      alt: "Partner",
      Content_Title: "52K+",
      Content_Description: "Lives Protected",
    },
    {
      FileGeneratedName: impact3,
      alt: "Partner",
      Content_Title: "207K+",
      Content_Description: "Meals Fed",
    },
    {
      FileGeneratedName: impact4,
      alt: "Partner",
      Content_Title: "2",
      Content_Description: "Water Filteration Plants set up",
    },
    {
      FileGeneratedName: impact5,
      alt: "Partner",
      Content_Title: "3",
      Content_Description: "Communities Rehabiliated",
    },
  ]
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  }
  return (
    <section className="section pt-5 pb-5 myicons">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4 meals-title ">
              <span className="title-bg">
                {" "}
                Flood Relief Efforts: Sab Saath Mil Kar
              </span>
            </h2>
          </Col>
        </Row>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={7500}
          shouldResetAutoplay={false}
          keyBoardControl={true}
          autoPlayInterval={7500}
          interval={7500}
          transitionDuration={500}
          containerClass="carousel-container impact-strip-carousel"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px p-3 "
          pauseOnHover={true}
        >
          {logos.map((item, key) => (
            <Col className="icons impact-strip-icons d-flex justify-content-center align-items-center">
              <img src={item.FileGeneratedName} alt={item.alt} />
              <div className="ml-2">
                <h4 className="icon-title">{item.Content_Title}</h4>
                <p>{item.Content_Description}</p>
              </div>
            </Col>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default ImpactStrip
