import React, { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Label,
  Form,
  FormGroup,
  Col,
  Row,
  Input,
  Container,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import { Link } from "react-router-dom"
import {
  AllowAlphabatic,
  FastForex_FetchOnlyOne,
  GetCurrency_ExchangeRate,
  GetSetupMaster,
} from "utils/CommonMethods.js"
import { SetupMasterIds } from "utils/Constants.js"
import Swal from "sweetalert2"
import qurbanibanner from "../../assets/img/home/PakFloodRelef2022.jpg"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { x64 } from "crypto-js"
import Select from "react-select"
import img from "../../assets/demo.png"
const RamzanDemo = (props) => {
  return (
    <div className="maincontent">
      <div className="content">
        <section
          id="inner-banner"
          className="section"
          style={{ backgroundImage: `url(${qurbanibanner})` }}
        >
          <div className="container">
            <h1 className="mb-0">{"BasicInfoValues.donationName"}</h1>
            
          </div>
        </section>
      </div>
      <Container className="mt-3">
        <Row>
          <Col lg="7">
            <div className="desc mb-4">
              <h2 className="mt-2 mb-2">Lorem ipsum dolor sit amet .</h2>

              {/* <img src={caseImgUrl} alt="" /> */}
              <img
                src={img}
                className="text-center"
                alt=""
                width={400}
                height={400}
              />
              <p
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  marginBottom: "10px",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like).
              </p>
              {/* manzoor commit <ul style={{ marginBottom: "10px" }}>
                    <li>
                      <span>Raised: </span>
                      {ApiValues.raised !== undefined ? ApiValues.raised : "0"}

                    </li>
                    <li>
                      <span>Remaining:</span>{" "}
                      {ApiValues.Remaining !== undefined ? ApiValues.Remaining : "0"}
                    </li>
                  </ul> */}
              {/* <p>{desc !== undefined ? desc : "No Description Found"}</p> manzoor commit*/}
            </div>
          </Col>
          <Col lg="5" className="mt-4">
            <Card className="cardform">
              <CardBody>
                <form>
                  <Row>
                    <Col md={12} className="text-center mb-3">
                      <h2 className="mt-3">
                        {
                          // <h2 className="mt-3">I'm Feeding a Family </h2>
                          <h2 className="mt-3">{"BasicInfoValues.Tagline"} </h2>
                        }
                      </h2>

                      <h4 className="sacrificial_skins">
                        You are saving lives. Thank you for standing with your
                        fellow humans.
                      </h4>
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        {/* <FormGroupSelect
                              label="Donation Type*"
                              list={"generalDonationddl"}
                              fieldId="SetupDetailId"
                              fieldName="SetupDetailName"
                              required={true}
                              onChange={handleInputChange}
                              name="donationType"
                              value={BasicInfoValues.donationType}
                            /> */}
                      </FormGroup>
                    </Col>

                    <Col md={12}>
                      <FormGroup>
                        <Label for="">Currency Type</Label>

                        <Input
                          id=""
                          value={"BasicInfoValues.CurrencyFromSymbol"}
                          name="CurrencyFromSymbol"
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Quantity</Label>
                        <Input
                          id=""
                          min="1"
                          name="Quantity"
                          type="number"
                          isnumber="true"
                          maxLength="3"
                          value={"BasicInfoValues.Quantity"}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={9}>
                      <FormGroup>
                        <Label for="">Amount</Label>

                        <Input
                          id=""
                          value={"parseFloat(currency.amount).toFixed(2)"}
                          name="Amount"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    {/* </>
                         ) : (
                           ""
                         )} */}

                    <Col md={9}>
                      <FormGroup>
                        <Label for="">Amount (PKR)</Label>
                        <Input
                          id=""
                          //value={BasicInfoValues.Amount}
                          name="Amount"
                          required={true}
                          type="text"
                          isnumber="true"
                          maxLength="8"
                          disabled={true}
                          // type="number"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={12}></Col>

                    <Col md={12}>
                      <Button
                        style={{ width: "100%" }}
                        className="d-block"
                        color="primary"
                        type="button"
                      >
                        Donate
                      </Button>
                    </Col>
                  </Row>
                </form>
                <h5 className="text-primary">
                  *100% of your payments net of transaction charges will go
                  towards helping flood-affected families across Pakistan
                </h5>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <HomeFooter />
    </div>
  )
}

export default RamzanDemo
