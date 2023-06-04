import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Case_Of_The_Day } from "utils/CommonMethods";
import Swal from "sweetalert2";
import { baseImageUrl } from "utils/Api";

const CaseOfTheDay = () => {
  const [caseddl, setCaseddl] = useState([]);
  const [ApplicantCaseId, setApplicantCaseId] = useState();

  const CaseOfTheDay = async () => {
    try {
      var data = await Case_Of_The_Day(0, 0);
    
      if (data != null) {
        setCaseddl(data?.Table[0]);
        setApplicantCaseId(data?.Table[0].ApplicantCaseId)
          
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  useEffect(() => {
    CaseOfTheDay();
  }, []);
  return (
    <section className="section pt-4 pb-2">
      <div className="container">
  
        <Row>
          <Col></Col>
          <Col md={8} lg={10} className="text-center">
            <div className="caseoftday-box">
              <h4 className="text-primary">
                <strong>Case Of The Day</strong>
              </h4>
              <img
                style={{ height: "200px", objectFit: "cover" }}
                src={baseImageUrl + caseddl?.DocAttachment}
                alt=""
              />
              <h3 className="mb-2">
                <strong>
                  {caseddl && caseddl?.CaseTitle
                    ? caseddl?.CaseTitle
                    : "No Data Found"}{" "}
                </strong>

                <span className="casesurgent">URGENT</span>
              </h3>
              <p>{caseddl?.ShortDesc}</p>
              {/* <p dangerouslySetInnerHTML={{__html: caseddl.CaseDescription}}></p> */}
              {caseddl && caseddl?.CaseTitle ? (
                <Link
                style={{
                  fontSize: '16px'
                }}
                  to={{
                    pathname: "/case-detail/"+ApplicantCaseId,
                    state: caseddl, // your data array of objects
                  }}
                  className="btn btn-primary mt-0 mb-0"
                >
                  Donate Now
                </Link>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </section>
  );
};

export default CaseOfTheDay;
