import React from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardFooter, Col } from "reactstrap"
import { baseImageUrl, casedetail_p } from "utils/Api"
import { ConvertNumricToComaSeparate } from "utils/CommonMethods"
import { SetupMasterIds } from "utils/Constants"

const rebuildCommunity = [1561, 1562, 1563, 1564, 1565, 1566, 1567, 1569]

const CampaignCard = ({ items, key, selectedcurrencyValues }) => {
  return (
    <Col lg="4" md="12" sm="12" key={key} >
      <Card body>
        <div className="donation-box text-center">
          <div className="" style={{ minHeight: "310px" }}>
            <img src={baseImageUrl + items.Images} width="150" alt="" />
            <h3 className="text-center mt-2  mb-2 card-tile-heading">{items.SetupDetailName} </h3>
            <p className="text-center qurbari-booking mb-0">
              {items.tagline} <br></br>
            </p>
          </div>
          {
            // items.donationsubcategoryid === SetupMasterIds.Rebuil_A_Comunity
            rebuildCommunity.includes(items.donationsubcategoryid) ? (
              <CardFooter
              // style={{
              //   position: "absolute",
              //   bottom: "5px",
              //   width: "90%",
              // }}
              >
                <Link
                  to={{
                    pathname: `/case-detail/${items.ConstantValue}`,
                    state: items, // your data array of objects
                  }}
                  className="btn mt-3 btn-primary w-100"
                >
                  Donate
                </Link>
              </CardFooter>
            ) : (
              <CardFooter
              // style={{
              //   position: "absolute",
              //   bottom: "5px",
              //   width: "90%",
              // }}
              >
                <Link
                  to={{
                    pathname: `/RamazanCampaignDonate/${items.donationsubcategoryid}`,
                    state: items, // your data array of objects
                  }}
                  className="btn mt-3 btn-primary w-100"
                  onClick={() => {
                    localStorage.setItem("props", JSON.stringify(items))
                  }}
                >
                  {/* Donate PKR {items.amount} */}
                  Donate{" "}
                  {ConvertNumricToComaSeparate(
                    (
                      items.amount /
                      selectedcurrencyValues.ConversionRate.toFixed(2)
                    ).toFixed(2)
                  ) +
                    " " +
                    selectedcurrencyValues.CurrencyFromSymbol}
                </Link>
              </CardFooter>
            )
          }
        </div>
      </Card>
    </Col>
  )
}

export default CampaignCard
