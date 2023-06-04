import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap"
import homebanner1 from "../../assets/img/home/slider/newbanner-subsaath01.jpg"
import homebanner2 from "../../assets/img/home/slider/newbanner-subsaath02.jpg"
import homebanner4 from "../../assets/img/home/slider/Sab-Saath-x-Taskeen-Banner.jpg"
import homebanner3 from "../../assets/img/home/slider/newbanner-subsaath03.jpg"
import homebanner5 from "../../assets/img/home/slider/QurbaniBanner2023.png"

import mhomebanner1 from "../../assets/img/home/slider/newbanner-subsaathm01.jpg"
import mhomebanner2 from "../../assets/img/home/slider/newbanner-subsaathm02.jpg"
import mhomebanner3 from "../../assets/img/home/slider/newbanner-subsaathm03.jpg"
import mhomebanner4 from "../../assets/img/home/slider/Sab-Saath-Taskeen-MobileBanner.jpeg"
import mhomebanner5 from "../../assets/img/home/slider/qurbaniBannerMobile2023.jpeg"

const items = [
  {
    src: homebanner5,
    mobilesrc: mhomebanner5,
    link: "/QurbaniCampaign",
    key: 5,
  },
  {
    src: homebanner1,
    mobilesrc: mhomebanner1,
    link: "/about-us#how-we-started",
    key: 1,
  },
  // {
  //   src: homebanner2,
  //   mobilesrc: mhomebanner2,
  //   link: "/ramazancampaign",
  //   key: 2,
  // },
  // {
  //   src: homebanner4,
  //   mobilesrc: mhomebanner4,
  //   link: "/cases-list/3",
  //   key: 3,
  // },
  {
    src: homebanner3,
    mobilesrc: mhomebanner3,
    link: "/case-detail/4188",
    key: 4,
  },
]

const extrClass = [6]

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
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Link to={item.link}>
            <img className="simg-dasktop" alt="" src={item.src} />
            <img className="simg-mobile" alt="" src={item.mobilesrc} />
          </Link>
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
