import React, { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  FormGroup,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import Swal from "sweetalert2"

import { Link, useHistory } from "react-router-dom"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import { ContactUsController } from "utils/CommonMethods.js"
const Contact = (props) => {
  const history = useHistory()
  const initialValues = {
    OperationID: 1,
    CustomerQueriesID: null,
    FirstName: "",
    LastName: "",
    Phoneno: "",
    Emailaddress: "",
    QueryMessage: "",
    QueryStatus: 1577,
    QuerySource: 328,
    IsEmail: 1,
    TicketTypeID: null,
    TicketArea: null,
    ContactUS_Comments: null,
  }
  const [values, setValues] = useState(initialValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const resetFormelement = () => {
    setValues(initialValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = await ContactUsController(
      values.OperationID,
      values.CustomerQueriesID,
      values.FirstName,
      values.LastName,
      values.Phoneno,
      values.Emailaddress,
      values.QueryMessage,
      values.QueryStatus,
      values.QuerySource,
      values.IsEmail,
      values.TicketTypeID,
      values.TicketArea,
      values.ContactUS_Comments
    )
    if (data.Response === true) {
      if (data.DataSet.Table[0].haserror === 1) {
        Swal.fire({
          title: "Error",
          text: data.DataSet?.Table[0]?.MESSAGE,
          icon: "error",
        })
      } else {
        e.preventDefault()
        resetFormelement()
        Swal.fire({
          title: "Success",
          text: data.DataSet?.Table[0]?.MESSAGE,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/home")
          }
        })
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Some Thing Went Wrong",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/home")
        }
      })
    }
  }

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Contact</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Row>
              <Col md={6}>
                <h2 className="mb-3"> Contact us</h2>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Card className="cardform">
                  <CardBody>
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label className="form-label" for="">
                              First Name*
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                              name="FirstName"
                              max="100"
                              onChange={handleInputChange}
                              value={values.FirstName}
                              required={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label className="form-label" for="">
                              Last Name*
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="LastName"
                              max="100"
                              onChange={handleInputChange}
                              value={values.LastName}
                              required={true}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <label
                              className="form-label"
                              for="contactsFormFirstName"
                            >
                              Email*
                            </label>
                            <Input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="Emailaddress"
                              max="150"
                              onChange={handleInputChange}
                              value={values.Emailaddress}
                              required={true}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroupInput
                            label="Phone*"
                            name="Phoneno"
                            value={values.Phoneno}
                            onChange={handleInputChange}
                            required={true}
                            maxLength="15"
                            isNumber="true"
                            placeholder="Phone"
                          />
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <label className="form-label">Message*</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              name="QueryMessage"
                              max="1000"
                              onChange={handleInputChange}
                              value={values.QueryMessage}
                              required={true}
                            ></textarea>
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <Button
                            type="submit"
                            size="md"
                            block
                            className="btn-primary pt-3"
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <CardHeader>Contact us by phone or location</CardHeader>
                  <CardBody>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-2 pl-0">
                        <h6>Follow Us</h6>
                        <a
                          className="btn btn-primary btn-facebook"
                          href="https://www.facebook.com/SabSaath.org/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook mr-2"></i>Facebook
                        </a>{" "}
                      </li>
                      <li className="list-group-item p-2 d-flex pl-0">
                        <i className="fa fa-envelope fa-2x text-primary"></i>
                        <span className="pl-3">
                          <h6>Email</h6>{" "}
                          <a href="mailto:info@sabsaath.org">
                            info@sabsaath.org
                          </a>
                        </span>
                      </li>
                      <li className="list-group-item p-2 d-flex pl-0">
                        <i className="fa fa-phone fa-2x text-primary"></i>
                        <span className="pl-3">
                          <h6>Contact</h6>
                          <a style={{ color: "#d92227" }}>042-111-222-500</a>
                        </span>
                      </li>
                      <li className="list-group-item p-2 d-flex pl-0">
                        <i className="fa fa-globe fa-2x text-primary"></i>
                        <span className="pl-3">
                          <h6>Website</h6>{" "}
                          <a href="https://www.sabsaath.org">
                            www.sabsaath.org
                          </a>
                        </span>
                      </li>
                      <li className="list-group-item p-2 d-flex pl-0">
                        <i className="fa fa-map-marker fa-2x text-primary"></i>
                        <span className="pl-3">
                          <h6>Location</h6> <span>21 Waris Road,Lahore </span>
                        </span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        <section className="pt-0 pb-5">
          <div className="container">
            <Row>
              <Col lg={12} md={12} sm={12}>
                <div className="addressmap">
                  <iframe
                    style={{ width: "100%", height: "400px" }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d850.0185867823795!2d74.3193838294565!3d31.54957417412025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904af653cb657%3A0x7b3ed452f46f6e98!2s21%20Waris%20Rd%2C%20Jubilee%20Town%2C%20Lahore%2C%20Punjab%2054099%2C%20Pakistan!5e0!3m2!1sen!2s!4v1648130496223!5m2!1sen!2s"
                    title="Map"
                    loading="lazy"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default Contact
