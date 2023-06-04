import React, { useState, Link } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  check,
  Badge,
} from "reactstrap";
import ModalApplHistory from '../../components/modal/ModalApplHistory.js'
import  {GetSetupMaster}  from 'utils/CommonMethods.js'
import { SetupMasterIds } from "utils/Constants.js";
import  {GetFillCombos}  from 'utils/CommonMethods.js'
import  {InsertData_Applicant}  from 'utils/CommonMethods.js'


const PrimaryInformation = (props) => {


  var UserId = localStorage.getItem('UserId');
  var UserIp = localStorage.getItem('UserIP');
  
  //console.log(props.primaryValues.FullName);

  function OnTextChange(e){
    setPrimaryInfo({
      ...PrimaryInfo,
  [e.target.name] : e.target.value
  });
  }
  const [PrimaryInfo , setPrimaryInfo] = useState({
    ApplicantId : 0,
    FullName : "",
    FatherName : "",
    Cnic : "",
    CountryId : 0,
    ProvinceId : 0,
    CityId : 0,
    CastegoryId : 0,
    FundsCastegoryId : 0,
    FundsCastegorySubId : 0,
    NatureofCaseId : 0,
    FundsRequired : 0,
    ReferrerCatIdON : 0,
    PermanentAddress : "",
    CompanyFamilyIdON : 0,
    ReferrerId : 0,

  });

  async function OnFormSubmit(e)
    {
   
      e.preventDefault()
     
       try
       { 
        var  data1 = {ApplicantInformation:{OperationId:2 , ApplicantId : 0, FullName:PrimaryInfo.FullName , FatherName:PrimaryInfo.FatherName , Cnic: PrimaryInfo.Cnic , CountryId: CountryIdON , ProvinceId:ProvinceIdON  , CityId : CityIdON ,    CaseNatureId : NatureofCaseIdON ,  FundsRequired  :PrimaryInfo.FundsRequired  , CategoryId : CastegoryIdON , SubCategoryId : FundsCastegoryIdON , SubSubCategoryId : FundsCastegorySubIdON , ReferalTypeId : ReferrerCatIdON , ReferedBy : ReferrerIdON , UserId : UserId , UserIP : UserIp}} ;                   //    {ApplicantInformation:{OperationId:2,FullName:value.FullName , FatherName:value.FatherName }}
                 // CastegoryId : CastegoryIdON , FundsCastegoryId : FundsCastegoryIdON , FundsRequired :PrimaryInfo.FundsRequired ,  FundsCastegorySubId : FundsCastegorySubIdON , NatureofCaseId :  ,  PermanentAddress:PrimaryInfo.PermanentAddress , ReferrerCatId : ReferrerCatIdON , CompanyFamilyId : CompanyFamilyIdON , ReferrerId : ReferrerIdON
       var data=await InsertData_Applicant(data1);
       return data;
       }
       catch(error)
       { 
       }
    }
  
  const [openModal, setOpenModal] = useState(false);
  const openNewmodal = () => {
   
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
  } 



  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
       resetFormelement();
    };
    load();
}, []);


const resetFormelement = async() =>{
  
  // ReBindGrid(SetupMasterIds.Village_Muhalla,0,"",0);

    let ddlNatureofCase =await GetNatureofCase(-1);
    setNatureofCaseddl(ddlNatureofCase.data);

    let ddlCountryData =  await GetCountry();
    setcountryddl(ddlCountryData.data);

   let ddlReferrerCategory =await GetReferrerCategory(-1);
   setRferrerCategoryddl(ddlReferrerCategory.data);

  
   let ddlProvinceData =await GetProvince(-1);
   setprovinceddl(ddlProvinceData.data);

   let ddlReferrerData =await GetReferrer(-1);
   setReferrerddl(ddlReferrerData.data);

   let ddlCityData =await GetCity(-1);
   setcityddl(ddlCityData.data);

   let ddlCatData =await GetCategory(-1);
   setCatddl(ddlCatData.data);
   
   let ddlFundCatData =await GetFundsCategory(-1);
   setFundsCatddl(ddlFundCatData.data);

   let ddlFundSubCatData =await GetFundSabCategory(-1);
   setFundsSabCatddl(ddlFundSubCatData.data);

   let ddlCompanyFamilyData =await GetCompanyFamily(-1);
   setCompanyFamilyddl(ddlCompanyFamilyData.data);
}

  const initialValues = {
      
      searchCountryValue: '0',
      searchProvinceValue: '0',
      searchCityValue: '0',
      
      searchCategoryValue: '0',
      searchFundsCatValue:'0',
      searchSabCategoryValue: '0',

      
      searchCompanyValue:'0',
      searchReferrerCategoryValue:'0',
      searchReferrerValue:'0',
      searchCompanyFamilyValue :'0',

      searchNatureofCaseValue :'0'

   };

  const handleInputChange = (e) => 
  {
    const { name, value } = e.target;
     setValues({
       ...values,
       [name]: value,
     });
   };


   const GetCountry = async(e) =>
   {
      var data=await GetSetupMaster(SetupMasterIds.Country,0,"",0);
      return data;
   }
 const GetProvince = async(CountryId = 0) =>{
 if(CountryId == "0")
     CountryId = "-1";
    
 var data=await GetSetupMaster(SetupMasterIds.Province,CountryId,"",0);
 return data;
 }
 const GetReferrerCategory = async(e) =>
 {
   
   var data =await GetSetupMaster(SetupMasterIds.ReferrerCategory,0,"",0);
   return data;
 }
 const GetReferrer = async(RefCatid = 0) =>
             {
       
              var data =await GetFillCombos(3,RefCatid,0);
               return data;
     }
 const GetCity = async(ProvinceId = 0) =>{
     
     if(ProvinceId == "0")
         ProvinceId = "-1";
        
     var data=await GetSetupMaster(SetupMasterIds.City,ProvinceId,"",0);
      return data;
     }
    const GetCategory = async(ProvinceId = 0) =>
   {
            
     var data =await GetSetupMaster(SetupMasterIds.Category,0,"",0);
     return data;
     }
     const GetFundsCategory = async(ProvinceId = 0) =>
     {
       
       var data =await GetSetupMaster(SetupMasterIds.FundCategory,0,"",0);
       return data;
     }
     const GetFundSabCategory = async(ProvinceId = 0) =>
     {
     var data =await GetSetupMaster(SetupMasterIds.FundSubCategory,0,"",0);
     return data;
     }
   const GetCompanyFamily = async(ProvinceId = 0) =>
         {
            
             var data =await GetSetupMaster(SetupMasterIds.ComapnyFamily,0,"",0);
             //var data =await GetFillCombos(0,0);
             return data;
     }
     const GetNatureofCase = async(ProvinceId = 0) =>
      {
        var data =await GetSetupMaster(SetupMasterIds.NatureOfCase,0,"",0);
        return data;
     }
  
   const [countryddl, setcountryddl] =  useState([]);
   const [cityddl, setcityddl] =  useState([]);
   const [provienceddl, setprovinceddl] =  useState([]);
   const [Catddl, setCatddl] =  useState([]);
   const [FundsCatddl, setFundsCatddl] =  useState([]);
   const [FundsSabCatddl, setFundsSabCatddl] =  useState([]);
   const [NatureofCaseddl, setNatureofCaseddl] =  useState([]);
   const [Companyddl, setCompanyddl] =  useState([]);
   const [CompanyFamilyddl, setCompanyFamilyddl] =  useState([]);
   const [RferrerCategoryddl, setRferrerCategoryddl] =  useState([]);
   const [Referrerddl, setReferrerddl] =  useState([]);
   const [values, setValues] = useState(initialValues);

   const [CountryIdON, setCountryIdON] = useState(0);
   const [ProvinceIdON ,  setProvinceIdON] = useState(0);
   const [CityIdON ,  setCityIdON] = useState(0);
   const [CastegoryIdON ,  setCastegoryIdON] = useState(0);
   const [FundsCastegoryIdON ,  setFundsCastegoryIdON] = useState(0);
   const [FundsCastegorySubIdON ,  setFundsCastegorySubIdON] = useState(0);
   const [NatureofCaseIdON ,  setNatureofCaseIdON] = useState(0);

   const [ReferrerCatIdON ,  setReferrerCatIdON] = useState(0);
   const [CompanyFamilyIdON ,  setCompanyFamilyIdON] = useState(0);

   const [ReferrerIdON ,  setReferrerIdON] = useState(0);
   
   

  const handleSearchCountryChangeEvent =async (e)=>{
     handleInputChange(e);
     setCountryIdON(e.target.value);
     let data = await GetProvince(e.target.value);
     setprovinceddl(data?.data);
   }
   const handleSearchreferrerCategoryChangeEvent =async (e)=>
   {
    handleInputChange(e);
    setReferrerCatIdON(e.target.value)
   // const { name, value } = e.target;

    if (e.target.type === "select-one")
   {
   
       if (e.target.options[e.target.selectedIndex].text == "Applicant") 
       {
          //alert(e.target.options[e.target.selectedIndex].text);
         let data = await GetReferrer(1);
         setReferrerddl(data?.data);
       }
       else
       {
         //alert(e.target.options[e.target.selectedIndex].text);
         let data = await GetReferrer(2);
         setReferrerddl(data?.data);
       }
   }
   else 
   {

        // setcountryddl({
        //     ...PrimaryInfo,
        //     CountryId : values,
        // });
   }
  }
   const handleSearchProvinceChangeEvent =async (e)=>{
     handleInputChange(e);
     setProvinceIdON(e.target.value)
    let data = await GetCity(e.target.value);
     setcityddl(data?.data);

 }
 const handleSearchCityChangeEvent =async (e)=>{
     handleInputChange(e);
     setCityIdON(e.target.value);
    // let data = await GetDistrict(e.target.value);
    // setdistrictddl(data.data);

 }
 const handleSearchReferrerChangeEvent =async (e)=>{
   handleInputChange(e);
   setReferrerIdON(e.target.value);
  // let data = await GetDistrict(e.target.value);
  // setdistrictddl(data.data);
 }
 const handleSearchCatChangeEvent =async (e)=>
 {
//   
   handleInputChange(e);
   setCastegoryIdON(e.target.value);
   let data = await GetCategory(e.target.value);
   setCatddl(data?.data);
 }
 const handleSearchFundsCatChangeEvent =async (e)=>
 {
  
   handleInputChange(e);
   setFundsCastegoryIdON(e.target.value);
   let data = await GetFundsCategory(e.target.value);
   setFundsCatddl(data?.data);
 }
 const handleSearchFundsSabCatChangeEvent =async (e)=>
 {
  
   handleInputChange(e);
   
   setFundsCastegorySubIdON(e.target.value);
   let data = await GetFundSabCategory(e.target.value);
   setFundsSabCatddl(data?.data);

 }
//  const handleSearchCompanyChangeEvent =async (e)=>
//  {
//   
//    handleInputChange(e);
//    let data = await GetCompany(e.target.value);
//    setCompanyddl(data.data);
//  }
 const handleSearchNatureofCaseChangeEvent =async (e)=>
 {
   
   handleInputChange(e);
   setNatureofCaseIdON(e.target.value)
   let data = await GetNatureofCase(e.target.value);
   setNatureofCaseddl(data?.data);
 }
 const handleSearchCompanyFamilyChangeEvent =async (e)=>
 {
   
//   
   handleInputChange(e);
   setCompanyFamilyIdON(e.target.value)
   let data = await GetCompanyFamily(e.target.value);
   setCompanyFamilyddl(data?.data);
 }


  return (
    <div>
          <Row form>
    <Col md={12} className="text-right">
      <Button color="secondary" className="btn-sm" type="submit" onClick={() => openNewmodal({ UserId: 0 })}>History</Button>
    </Col>
    </Row>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Basic Details</h6>
        </CardHeader>
        <CardBody>
          <Form>

            
            <Row form>
            <Col md={4}>
            <FormGroup>
                <Label for="">Name of Applicant*</Label>
                <Input type="text" className="form-control" name="FullName" id="FullName"  onChange={e=>OnTextChange(e)} />
                </FormGroup>
            </Col>


            <Col md={4}>
            <FormGroup>
                <Label for="">Father Name/Husband Name*</Label>
                <Input type="text" className="form-control" name="FatherName" id="FatherName"  onChange={e=>OnTextChange(e)} />
            </FormGroup>
            </Col>

            <Col md={4}>
            <FormGroup>
                <Label for="">CNIC</Label>
                <Input type="text" className="form-control" name="Cnic" id="Cnic"  onChange={e=>OnTextChange(e)} />
            </FormGroup>
            </Col>
            
             <Col md={4}>
                        <FormGroup>
                            <Label for="">Country</Label>
                           <Input
                          id="CountryId"
                          name="searchCountryValue"
                          type="select"
                          value={values.CountryId}
                          onChange={handleSearchCountryChangeEvent}
                          >
                              <option value="">
                            Select
                          </option>
                          
                          {
                            countryddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="">Province</Label>
                           <Input
                          id="ProvinceId"
                          name="searchProvinceValue"
                          type="select"
                          value={values.searchProvinceValue}
                          onChange={handleSearchProvinceChangeEvent}>
                              <option value="">
                            Select
                          </option>
                          
                          {
                            provienceddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="">City</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCityValue"
                          type="select"
                          value={values.searchCityValue}
                          onChange={handleSearchCityChangeEvent}>
                              <option value="">
                            Select
                          </option>
                          
                          {
                            cityddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="">Category*</Label>
                           <Input
                          id="exampleSelect1"
                          name="searchCategoryValue"
                          type="select"
                          value={values.searchCategoryValue}
                          onChange={handleSearchCatChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            Catddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col> 
             
                    <Col md={4}>
                        <FormGroup>
                            <Label for="">Funds Category*</Label>
                           <Input
                          id="exampleSelect1"
                          name="searchFundsCatValue"
                          type="select"
                          value={values.searchFundsCatValue}
                          onChange={handleSearchFundsCatChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            FundsCatddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col> 
    

                    <Col md={4}>
                        <FormGroup>
                            <Label for="">Funds Sab Category*</Label>
                           <Input
                          id="exampleSelectfundssubcat"
                          name="handleSearchFundsSabCatChangeEvent"
                          type="select"
                          value={values.handleSearchFundsSabCatChangeEvent}
                          onChange={handleSearchFundsSabCatChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            FundsSabCatddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col> 

                    <Col md={4}>
                        <FormGroup>
                           <Label for="">Nature Of Case</Label>
                           <Input
                          id="exampleSelect1NOCase"
                          name="searchNatureofCaseValue"
                          type="select"
                          value={values.searchNatureofCaseValue}
                          onChange={handleSearchNatureofCaseChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            NatureofCaseddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col> 
              
                    <Col md={4}>
              <FormGroup>
                  <Label for="">Funds Required*</Label>
                  <Input type="text" className="form-control" id="FundsRequired" name="FundsRequired" onChange={e=>OnTextChange(e)} />
                </FormGroup>
              </Col>

              <Col md={4}>
                        <FormGroup>
                            <Label for="">Referrer Category</Label>
                           <Input
                          id="exampleSelectRCat"
                          name="searchReferrerCategoryValue"
                          type="select"
                          value={values.searchReferrerCategoryValue}
                          onChange={handleSearchreferrerCategoryChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            RferrerCategoryddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col> 
             
            
              <Col md={4}>
                        <FormGroup>
                            <Label for="">Company Family*</Label>
                           <Input
                          id="exampleSelectcompfam"
                          name="searchCompanyFamilyValue"
                          type="select"
                          value={values.searchCompanyFamilyValue}
                          onChange={handleSearchCompanyFamilyChangeEvent}> 
                              <option value="">
                            Select
                          </option>
                          
                          {
                            CompanyFamilyddl?.map((item, key) => (
                              <option key={item.SetupDetailId} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
                   <Col md={4}>
                        <FormGroup>
                            <Label for="">Referrer*</Label>
                           {/* <Input
                          id="exampleSelectcompfam"
                          name="searchReferrerValue"
                          type="select"
                          value={values.searchReferrerValue}
                          // onChange={handleSearchReferrerChangeEvent}
                          > 
                              <option value="">
                            Select
                          </option>
                            {
                            Referrerddl.map((item, key) => (
                              <option key={item.Value} value={item.Id}>
                                {item.Value}
                              </option>
                            ))
                          }  
                            </Input> */}
                        </FormGroup>
                    </Col>

              {/* <Col md={3}>
              <FormGroup>
              <Label for="District"> District*</Label>
              <Input type="select" className="form-control" id="">
               <option selected="">KORANGHI</option>
           </Input>
            </FormGroup>
              </Col> 


            <Col md={3}>
            <FormGroup>
                <Label for="">Temperory Addresss*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col> */}

            {/* <Col md={3}>
            <FormGroup>
                <Label for="">Permanent Address*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Reference Name*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>
             
            <Col md={3}>
            <FormGroup>
                <Label for="">IsActive*</Label>
                <input type="checkbox" id="IsActive" name="IsActive" value="IsActive" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Is Joint Family*</Label>
                <input type="checkbox" id="IsJointFam" name="IsJointFam" value="IsJointFam" />
              </FormGroup>
            </Col>


            <Col md={3}>
            <FormGroup>
                <Label for="">IsBlocked*</Label>
                <input type="checkbox" id="IsBlocked" name="IsBlocked" value="IsBlocked" />
              </FormGroup>
            </Col>

            <Col md={3}>
            <FormGroup>
                <Label for="">Block Unblock Reason*</Label>
                <Input type="text" className="form-control" id="" />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
              <Label for="MuhallaId"> Muhalla*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Chandni Chowk</option>
           </Input>
            </FormGroup>
              </Col> 


              <Col md={3}>
              <FormGroup>
              <Label for="ReferalTypeId"> Referal Type*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Referal Type</option>
           </Input>
            </FormGroup>
              </Col>


                      <Col md={3}>
              <FormGroup>
              <Label for="ReferedBy"> Refered By*</Label>
              <Input type="select" className="form-control" id="">
                <option selected="">Syed Anas Ali shah Bukahri</option>
           </Input>
            </FormGroup>
              </Col>   */}

              
            </Row>
          </Form>
        </CardBody>
      </Card>

          <Row form className="text-right">
              <Col md={12}>
                  <Button color="primary" size="sm"  onClick={OnFormSubmit}>Save</Button>
        </Col>
      </Row> 

      {/* {
      openModal &&
      <ModalApplHistory {...props}
        HeaderText="Applicant History"
        Ismodalshow={openModal}
        closeNewmodal={closeNewmodal}
      />

    } */}
    </div>
  );
};

export default PrimaryInformation;
