import React, { useState, useEffect } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { DisasterreliefURL, RamazanCamapignURL } from "utils/Api.js"

import {
  CarouselControl,
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
  Get_All_Cases,
  FastForex_FetchOnlyOne,
  ConvertNumricToComaSeparate,
  objCurrrency,
} from "utils/CommonMethods"
import { baseImageUrl } from "utils/Api"
import HomeCarousel from "./HomeCarousel"
const MainHome = ({ caseCountData }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const [activeTab, setActiveTab] = useState(0)
  const [allCasesddl, setAllCasesddl] = useState([])
  const [selectedcurrencyValues, setselectedcurrencyValues] =
    useState(objCurrrency)
  let i

  useEffect(() => {
    GetAllCases()
    i = 0
    // setInterval(() => {
    //   setActiveTab(i);
    //   i++;
    //   if (i == 4) {
    //     i = 0;
    //   }
    // }, 10000);

    const load = async () => {
      let _SessionData = JSON.parse(
        sessionStorage.getItem("globalSelectedCurrency")
      )
      let _CurrencyData = await FastForex_FetchOnlyOne(
        _SessionData.Flex1,
        "PKR"
      )

      if (_CurrencyData.Response) {
        let _parseData = JSON.parse(_CurrencyData.Data)
        selectedcurrencyValues.ConversionRate = _parseData.result.PKR
        selectedcurrencyValues.CurrencyFromSymbol = _parseData.base

        setselectedcurrencyValues({ ...selectedcurrencyValues })
      } else {
      }
    }
    load()
  }, [])

  const GetAllCases = async () => {
    try {
      setAllCasesddl([])
      var data = await Get_All_Cases(0, 0)
      if (data != null) {
        if (Object.keys(data).length > 0) {
          setAllCasesddl(data.Table)

          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  return (
    <>
      <HomeCarousel />
    </>
  )
}

export default MainHome
