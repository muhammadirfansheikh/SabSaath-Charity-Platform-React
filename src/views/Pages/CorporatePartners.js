import React from "react"
import { Col, Container, Row } from "reactstrap"
import corporate1 from "../../assets/img/home/corporate1.png"
import corporate2 from "../../assets/img/home/corporate2.png"
import corporate3 from "../../assets/img/home/corporate3.png"
import corporate4 from "../../assets/img/home/corporate4.png"
import corporate6 from "../../assets/img/home/corporate6.png"
import corporate7 from "../../assets/img/home/corporate7.png"
import corporate8 from "../../assets/img/home/corporate8.png"
import corporate9 from "../../assets/img/home/corporate9.png"
import ary from "../../assets/img/home/ary.png"
import bargain from "../../assets/img/home/bargain.png"
import black from "../../assets/img/home/black.png"
import eveready from "../../assets/img/home/eveready.png"
import maple from "../../assets/img/home/maple.png"
import mayfair from "../../assets/img/home/mayfair.png"
import nur from "../../assets/img/home/nur.png"
import qarsh from "../../assets/img/home/qarsh.png"
import qarshi from "../../assets/img/home/qarshi.png"
import relief from "../../assets/img/home/relief.png"
import sdsm from "../../assets/img/home/sdsm.png"
import Tagheer from "../../assets/img/home/Tagheer.png"
import thisthat from "../../assets/img/home/thisthat.png"
import cue from "../../assets/img/home/cue.png"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const CorporatePartners = () => {
  const logos = [
    { item: corporate1, alt: "Partner" },
    { item: corporate2, alt: "Partner" },
    { item: corporate3, alt: "Partner" },
    { item: corporate4, alt: "Partner" },
    { item: corporate6, alt: "Partner" },
    { item: corporate7, alt: "Partner" },
    { item: corporate8, alt: "Partner" },
    { item: corporate9, alt: "Partner" },
    { item: ary, alt: "Partner" },
    { item: bargain, alt: "Partner" },
    { item: black, alt: "Partner" },
    { item: eveready, alt: "Partner" },
    { item: maple, alt: "Partner" },
    { item: mayfair, alt: "Partner" },
    { item: nur, alt: "Partner" },
    { item: qarsh, alt: "Partner" },
    { item: qarshi, alt: "Partner" },
    { item: relief, alt: "Partner" },
    { item: sdsm, alt: "Partner" },
    { item: Tagheer, alt: "Partner" },
    { item: thisthat, alt: "Partner" },
    { item: cue, alt: "Partner" },
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
    <section className="section pt-5 pb-5">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4 meals-title ">
              <span className="title-bg"> Our Partners</span>
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
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px p-3"
          pauseOnHover={true}
        >
          {logos.map((item, key) => (
            <div className="corporate" key={key + 1}>
              <img src={item.item} alt={item.alt} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default CorporatePartners
