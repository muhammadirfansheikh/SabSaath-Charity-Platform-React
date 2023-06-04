import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Get_All_Relief, FastForex_FetchOnlyOne, ConvertNumricToComaSeparate, objCurrrency } from "utils/CommonMethods";
// import Swal from 'sweetalert2';
// import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl, casedetail_p } from "utils/Api";
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js";
import HomeHeader from "../../components/Header/HomeHeader.js";
import HomeFooter from "../../components/Footer/HomeFooter.js";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import qurbanibanner from "../../assets/img/home/PakFloodRelef2022.jpg";
import qurbanibotombanner from "../../assets/img/home/PakFloodRelef2022_bottom.jpg";

const FloodRelief = (props) => {
  const [allRelief, setAllRelief] = useState([]);

  const GetAllFoodRelief = async () => {
    try {
      var data = await Get_All_Relief(0, 0);
      if (data != null) {
        setAllRelief(data.Table);
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const [selectedcurrencyValues, setselectedcurrencyValues] = useState(objCurrrency);
  useEffect(() => {
    GetAllFoodRelief();

    const load = async () => {
      let _SessionData = JSON.parse(sessionStorage.getItem('globalSelectedCurrency'));
      let _CurrencyData = await FastForex_FetchOnlyOne(_SessionData.Flex1, "PKR");

      if (_CurrencyData.Response) {
        let _parseData = JSON.parse(_CurrencyData.Data);
        selectedcurrencyValues.ConversionRate = _parseData.result.PKR;
        selectedcurrencyValues.CurrencyFromSymbol = _parseData.base;

        setselectedcurrencyValues({ ...selectedcurrencyValues });
      }
      else { }
    };
    load();

  }, []);
  return (
    <section className="section section-meals pt-4 pb-4">
      <Container>
        {/* <Row>
                <Col>
                    <h2 className='meals-title mb-5'><center>Qurbani Bookings</center></h2>
                </Col>
            </Row> */}

        {/* <Row>
                <Col>
                    <h3 className='meals-title mb-2'>100% of your Qurbani donations will feed the most disadvantaged among us. Make this Eid one to remember for families in need!</h3>
                    <h3 className="text-primary mb-5"><strong><i>#BaanteinBarhiKhushiyan</i></strong></h3>
                </Col>
            </Row> */}

        <Row>
          <Col>
            <h2 className="meals-title mb-4"><span className="title-bg"> Pakistan Flood Relief 2022</span></h2>
          </Col>
        </Row>

        <Row>
          {allRelief &&
            allRelief
              .filter((x) => x.ConstantValue === SetupMasterIds.DisasterRelif)
              .map((items, key) => (
                <Col lg="4" md="4" sm="12" key={key}>
                  <Card body className="relief-card">
                    <div className="donation-box text-center">
                      <div className="">
                        <img
                          src={baseImageUrl + items.Images}
                          width="150"
                          alt=""
                        />
                        <h3 className="text-center mt-2  mb-2">
                          {items.SetupDetailName}{" "}
                        </h3>
                        <p className="text-center qurbari-booking mb-0">
                          {items.tagline} <br></br>
                        </p>
                      </div>
                      {items.donationsubcategoryid ===
                        SetupMasterIds.Rebuil_A_Comunity ? (
                        //  <a href={casedetail_p} target="_self" style={{ color: 'white' }} className='btn mt-3 btn-primary'>Donate PKR {items.amount}</a>
                        // <Link
                        //     to={{
                        //       pathname: "/quick-donate",
                        //       state: items, // your data array of objects

                        //     }}
                        //     onClick={() =>
                        //       localStorage.setItem(
                        //         "props",
                        //         JSON.stringify(items) 
                        //       )
                        //     }
                        //     className="btn mt-3 btn-primary"
                        //   >
                        //     {/* Donate PKR {items.amount}  */}
                        //     Donate 
                        //     {/* {ConvertNumricToComaSeparate(((items.amount) / selectedcurrencyValues.ConversionRate.toFixed(2)).toFixed(2)) + " " + selectedcurrencyValues.CurrencyFromSymbol} */}
                        //   </Link>
                        <Link
                          to={{
                            pathname: casedetail_p,
                            state: items // your data array of objects
                          }}
                          className='btn mt-3 btn-primary'
                        >
                          Donate
                        </Link>
                      ) : (
                        <Link
                          to={{
                            pathname: "/DisasterReliefDonate",
                            state: items, // your data array of objects
                          }}
                          onClick={() =>{
                            
                            localStorage.setItem(
                              "props",
                              JSON.stringify(items)
                            )}
                          }
                          className="btn mt-3 btn-primary"
                        >
                          {/* Donate PKR {items.amount} */}
                          Donate {ConvertNumricToComaSeparate(((items.amount) / selectedcurrencyValues.ConversionRate.toFixed(2)).toFixed(2)) + " " + selectedcurrencyValues.CurrencyFromSymbol}

                        </Link>
                      )}
                    </div>
                  </Card>
                </Col>
              )
              )}
        </Row>

      </Container>
    </section>

  );
};

export default FloodRelief;
