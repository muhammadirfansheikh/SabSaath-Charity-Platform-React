import React,{useState, useEffect} from 'react'
import {Col, Container, Row, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Get_All_Relief,FastForex_FetchOnlyOne,
    ConvertNumricToComaSeparate,objCurrrency } from 'utils/CommonMethods';
import Swal from 'sweetalert2';
import QurbaniComp from "../../assets/img/home/goat-img.png";
import { baseImageUrl } from 'utils/Api';
//import qurbani from     "../assets/img/home/Qurbani.png";
import { SetupMasterIds } from "../../utils/Constants.js";



const Meals = (props) => { 
    const [allRelief, setAllRelief] = useState([]);


    const GetAllFoodRelief = async () => {
        try {
            var data =  await Get_All_Relief(0, 0); 
            if(data != null){
                setAllRelief(data.Table)
                    return data;
                
            }
            else{
                // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
                return [];
            }
            
        } catch (error) {
            // Swal.fire({ title: "Error", text: "Meals Data not found", icon: "error" });
            return [];
        }
    }

    const [selectedcurrencyValues, setselectedcurrencyValues] = useState(objCurrrency);
    useEffect(() => {
        GetAllFoodRelief();
        const load = async () => {
            let _SessionData =JSON.parse(sessionStorage.getItem('globalSelectedCurrency'));
            let _CurrencyData = await FastForex_FetchOnlyOne(_SessionData.Flex1,"PKR");
      if(_CurrencyData.Response)
      {
            let _parseData = JSON.parse(_CurrencyData.Data);
            selectedcurrencyValues.ConversionRate = _parseData.result.PKR;
            selectedcurrencyValues.CurrencyFromSymbol = _parseData.base;
            
            setselectedcurrencyValues({...selectedcurrencyValues});
      }
      else
      {}
      
            
         };
         load();
    }, [])
  return (
    <section className='section section-meals meals pt-5 pb-5'>
        <Container>
              {/* <Row>
                <Col>
                    <h3 id={props?.mealId} className='meals-title mb-4'>100% of your Qurbani donations will feed families in need. All administrative costs are covered by private donors.</h3>
                </Col>
            </Row> */}
            {/* <Row>
                <Col>
                    <h2 className='meals-title mb-4'>Qurbani Bookings</h2>
                </Col>
            </Row> */}
            <Row>
                {/* Last 3 line */}
                {allRelief && allRelief.filter(x=> x.donationsubcategoryid === SetupMasterIds.Goat || x.donationsubcategoryid === SetupMasterIds.Bull_Cow || x.donationsubcategoryid === SetupMasterIds.Hissa || x.donationsubcategoryid === SetupMasterIds.Multiple_Animals || x.donationsubcategoryid === SetupMasterIds.Cash_Donation).map((items, key)=>(
                    <Col lg="4" md="4" sm="12" key={key}>
                    <Card body>
                        <div className='donation-box text-center'>
                            <div className=''>
                            
                               <img src={baseImageUrl + items.Images} width="100" alt=''/>
                                <h3 className='text-center mt-2  mb-2'>{items.SetupDetailName} </h3>
                                <p className='text-center qurbari-booking mb-0'>
                                {items.tagline} <br></br>
                                </p>
                                {items.donationsubcategoryid === SetupMasterIds.Multiple_Animals || items.donationsubcategoryid === SetupMasterIds.Cash_Donation ? "" :

                                <p className='text-center qurbari-booking'>
                                <strong>
                               {selectedcurrencyValues.CurrencyFromSymbol+" "} { items.amount !== undefined ?ConvertNumricToComaSeparate( ( ( items.amount)/selectedcurrencyValues.ConversionRate.toFixed(2)).toFixed(2)) +" /-"  : "0 /-" }
                            
                                    {/* PKR {items.amount} /- */}
                                    </strong> 
                                </p>
                                
}
                            </div>

                            <Link
                            to={{
                                pathname: "/QurbaniDonate",
                                state: items // your data array of objects
                              }}
                            className='btn mt-3 btn-primary'
                            >
                                Donate Now
                            </Link>
                        </div>
                    </Card>
                </Col>
                ))}
                
                
            </Row>

        </Container> 
        <Container>
            <Row>
                <Col>
                    <h2 className='meals-title mb-4'><span className='title-bg'> Meals where most needed</span> </h2>
                </Col>
            </Row>
            <Row>
            {allRelief && allRelief.filter(x=> x.donationsubcategoryid === 336 || x.donationsubcategoryid === 337 || x.donationsubcategoryid === 361).map((items, key)=>(
         
                    <Col lg="4" md="4" sm="12" key={key}>
                    <Card body>
                        <div className='donation-box text-center'>
                            <div className=''>
                                <h3 className='text-center mt-2  mb-2'>{items.SetupDetailName} </h3>
                                <p className='text-center'>
                                {items.tagline} <br></br><strong>
                                {selectedcurrencyValues.CurrencyFromSymbol+" "} { items.amount !== undefined ? ConvertNumricToComaSeparate( ( ( items.amount) / selectedcurrencyValues.ConversionRate.toFixed(2)).toFixed(2)) + " /-"  : "0 /-"}
                                
                                
                                    {/* PKR {items.amount}/- */}
                                    </strong>
                                </p>
                            </div>
                            <Link
                            to={{
                                pathname: "/meals-donate",
                                state: {...items, // your data array of objects
                                currencyAmount: ConvertNumricToComaSeparate((( items.amount) / selectedcurrencyValues.ConversionRate.toFixed(2)).toFixed(2))
                            }
                                 
                              }}
                            className='btn mt-3 btn-primary'
                            >
                                Donate Now
                            </Link>
                        </div>
                    </Card>
                </Col>
                ))}
                
                
            </Row>

        </Container>
    </section>
  )
}

export default Meals