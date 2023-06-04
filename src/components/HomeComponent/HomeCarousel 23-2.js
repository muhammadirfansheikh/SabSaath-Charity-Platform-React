import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col,
} from "reactstrap"
import { RamazanCamapignURL } from "utils/Api"
import ramzanBanner from "../../assets/img/home/ramzan-main-banner.jpg"
import homebanner from "../../assets/img/home/main-banner.jpg"
import featuredNgo from "../../assets/img/home/featured-ngo-banner.jpg"
const items = [
  {
    // img/home/ramzan-main-banner.jpg
    src: ramzanBanner,
    mainText: "ZAKAT APPEAL",
    link: RamazanCamapignURL,
    buttonName: "Donate Now",
    key: 1,
  },
  {
    src: homebanner,
    mainText: "Pakistan Flood Relief",
    link: "/case-detail/4188",
    buttonName: "Donate Now",
    key: 2,
  },
  // {
  //   src: featuredNgo,
  //   mainText: "Featured NGOs",
  //   link: "/FeaturedNGOs",
  //   buttonName: "Donate Now",
  //   key: 3,
  // },
]

function HomeCarousel(args) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item?.key}
        responsive={true}
      >
        <section
          className="section jumbotron jumbotron-fluid"
          style={{
            backgroundImage: `url(${item.src})`,
          }}
        >
          <div class="background-overlay"></div>
          <Container>
            <Row>
              <Col lg="12" md="12" sm="12" xs="12" className="text-right">
                <div className="banner">
                  <h3 className="banner-title mb-0">
                    {item.mainText === "Featured NGOs" ? (
                      <span>
                        Featured NGO<small className="ngo-s">s</small>
                      </span>
                    ) : (
                      item.mainText
                    )}
                  </h3>
                  <p>
                    <Link
                      to={item.link}
                      className="btn btn-primary main-banner-button mt-3"
                    >
                      {item.buttonName}
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CarouselItem>
    )
  })

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      ride="carousel"
      previous={previous}
      responsive={true}
      autoPlay={true}
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
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
        className="carousel-control-prev-home"
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
        className="carousel-control-next-home"
        cssModule={{
          "carousel-control-next-icon": "carousel-control-next-icon",
        }}
      />
    </Carousel>
  )
}

export default HomeCarousel
