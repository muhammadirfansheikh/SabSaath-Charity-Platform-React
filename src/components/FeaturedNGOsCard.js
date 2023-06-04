import React from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardFooter, Col } from "reactstrap"
import { baseImageUrl, casedetail_p } from "utils/Api"
import { ConvertNumricToComaSeparate } from "utils/CommonMethods"
import { SetupMasterIds } from "utils/Constants"

const NGO = [1574]

const FeaturedNGOsCard = ({ items, key, selectedcurrencyValues }) => {
  return (
    <Col lg="4" md="12" sm="12" key={key} className="mt-3 ">
      <Card body>
        <div className="donation-box text-center">
          <div className="" style={{ minHeight: "310px" }}>
            <img
              src={
                "https://www.zamanfoundation.pk/wp-content/uploads/2020/02/logo.png"
              }
              width="150"
              alt=""
            />
            <h3 className="text-center mt-2  mb-2">{items.Heading} </h3>
            <p className="text-center qurbari-booking mb-0">
              {items.Description} <br></br>
            </p>
          </div>
          <CardFooter>
            {/* <Link
                to={{
                  pathname: `/case-detail/${items.ConstantValue}`,
                  state: items, // your data array of objects
                }}
                className="btn mt-3 btn-primary"
              >
                Donate
              </Link> */}
            <Link
              to={`/cases-list/${items.NGOFeatureID}`}
              className="btn mt-3 btn-primary w-100"
            >
              Donate
            </Link>
          </CardFooter>
        </div>
      </Card>
    </Col>
  )
}

export default FeaturedNGOsCard
