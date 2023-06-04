import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  CardHeader,
  Table,
  Button,
  InputGroup,
} from "reactstrap";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
  Container,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Progress,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";

import partner1 from "../../assets/img/home/partner1.png";
import partner2 from "../../assets/img/home/partner2.png";
import partner3 from "../../assets/img/home/partner3.png";
import partner4 from "../../assets/img/home/partner4.png";
import partner5 from "../../assets/img/home/partner5.png";
import partner7 from "../../assets/img/home/partner7.png";
import partner8 from "../../assets/img/home/partner8.png";
import partner9 from "../../assets/img/home/partner9.png";
import partner10 from "../../assets/img/home/partner10.png";
import partner11 from "../../assets/img/home/partner11.png";
import partner12 from "../../assets/img/home/partner12.png";
import partner13 from "../../assets/img/home/partner13.png";
import partner14 from "../../assets/img/home/partner14.png";
import partner15 from "../../assets/img/home/partner15.png";

const Ourpartners = (props) => {
  const logos = [
    { item: partner1, alt: "Partner" },
    { item: partner2, alt: "Partner" },
    { item: partner3, alt: "Partner" },
    { item: partner4, alt: "Partner" },
    { item: partner5, alt: "Partner" },
    { item: partner7, alt: "Partner" },
    // { item: partner8, alt: "Partner" },
    { item: partner9, alt: "Partner" },
    { item: partner10, alt: "Partner" },
    { item: partner11, alt: "Partner" },
    { item: partner12, alt: "Partner" },
    { item: partner13, alt: "Partner" },
    { item: partner14, alt: "Partner" },
    { item: partner15, alt: "Partner" },
  ];
  const responsive = {
    // superLargeDesktop: {
    //   // the naming can be any, depends on you.
    //   breakpoint: { max: 4000, min: 3000 },
    //   items: 5,
    // },
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
      items: 1,
    },
  };

  return (
    <div className="maincontent">
      <section className=" pt-4 pb-4">
        <Container>
          <Row>
            <Col md={12}>
              <div>
                <h2 className="pb-3">Our Partners</h2>
                <div className="IndicatorCarousel">
                  <Carousel
                    arrows={true}
                    swipeable={false}
                    draggable={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    showDots={false}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                  >
                    {logos.map((item, key) => (
                      <div className="donation-box" key={key + 1}>
                        <img src={item.item} alt={item.alt} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Ourpartners;
