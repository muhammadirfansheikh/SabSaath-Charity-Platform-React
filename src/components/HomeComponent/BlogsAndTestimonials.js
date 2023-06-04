import React, { useState, useEffect } from "react"
import blog1 from "../../assets/img/home/blog1.png"
import blog2 from "../../assets/img/home/blog2.png"
import quotes from "../../assets/img/home/quotes.png"
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
  CardTitle,
  CardText,
  Progress,
  Input,
  ButtonGroup,
} from "reactstrap"
import { Link } from "react-router-dom"
import {
  formatDate,
  Get_Blogs,
  TestimonialController,
} from "utils/CommonMethods"
import Swal from "sweetalert2"
import { baseImageUrl } from "utils/Api"

const BlogsAndTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const GetBlogs = async () => {
    try {
      var data = await Get_Blogs(0, 0)
      if (data != null) {
        setBlogs(data.Table)
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  const GetTestimonials = async () => {
    try {
      var data = await TestimonialController(1)
      if (data != null) {
        if (Object.keys(data).length > 0) {
          setTestimonials(data)
          return data
        } else {
          // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      //   Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
    }
  }
  useEffect(() => {
    GetBlogs()
    GetTestimonials()
  }, [])

  const itemLength =
    testimonials && testimonials.filter((item, idx) => idx < 3).length - 1
  const previousButton = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1
    setActiveIndex(nextIndex)
  }
  const nextButton = () => {
    if (animating) return
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }
  const carouselItemData =
    testimonials &&
    testimonials
      .filter((item, idx) => idx < 3)
      .map((item, key) => {
        return (
          <CarouselItem
            key={key}
            onExited={() => setAnimating(false)}
            onExiting={() => setAnimating(true)}
          >
            <div className="testimo">
              <img src={quotes} alt="" />
              {/* <div dangerouslySetInnerHTML={{__html: item.TestimonialsDesc.substring(0, 66)+ ".."}}></div> */}
              <p className="test-text">{item.TestimonialsDesc}</p>
              <h4 className="mt-2">{item.Name}</h4>
              <p>{item.caption}</p>
            </div>

            {/* <img src={item.src} alt={item.altText} /> */}
          </CarouselItem>
        )
      })
  return (
    <section className="section section-blogs pt-4 pb-4">
      <Container>
        <Row>
          <Col lg="6" md="12">
            <div className="blogs mb-4">
              <h2>Blogs Posts</h2>
              <Link to="/blogs">View all</Link>
            </div>
            {blogs &&
              blogs
                .filter((item, idx) => idx < 2)
                .map((item, key) => (
                  <Card body key={key}>
                    <Row style={{ alignItems: "center" }}>
                      <Col lg="6" md="6" sm="6" xs="12">
                        <div className="blog-img">
                          <img src={baseImageUrl + item.imageUrL} alt="" />
                        </div>
                      </Col>
                      <Col lg="6" md="6" sm="6" xs="12">
                        <div className="blog-conten ">
                          <h5>{formatDate(item.BlogsStartDate)}</h5>
                          <h4>{item.BlogsTitle.substring(0, 22)}...</h4>
                          <p>{item.BlogsDesc.substring(0, 95)}...</p>
                          <Link
                            to={{
                              pathname: "/blog-single",
                              state: item, // your data array of objects
                            }}
                          >
                            Read More
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
          </Col>
          <Col lg="6" md="12">
            <div className="blogs mb-4">
              <h2>Testimonials</h2>
              <Link to="/testimonials">View all</Link>
            </div>
            <Row>
              <Col>
                {/* {testimonials.length > 0 ? */}
                <Carousel
                  previous={previousButton}
                  next={nextButton}
                  activeIndex={activeIndex}
                >
                  <CarouselIndicators
                    items={
                      testimonials &&
                      testimonials.filter((item, idx) => idx < 3)
                    }
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                      if (animating) return
                      setActiveIndex(newIndex)
                    }}
                  />
                  {carouselItemData !== null ? carouselItemData : ""}
                  <CarouselControl
                    directionText="Prev"
                    direction="prev"
                    onClickHandler={previousButton}
                  />
                  <CarouselControl
                    directionText="Next"
                    direction="next"
                    onClickHandler={nextButton}
                  />
                </Carousel>
                {/* : ""} */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BlogsAndTestimonials
