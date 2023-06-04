import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Label,
    Input
} from "reactstrap";
import { fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../utils/Constants.js'
import { GetSetupMaster,DeleteSetupDetail, GetCompanies } from '../utils/CommonMethods.js'
import Modal_Company from "components/modal/Modal_Company.js";
import Swal from "sweetalert2";


const Company = (props) => {
    const initialValues = {
        searchCompanyName: "",
        searchPocContactNo :"",
        searchPOCName : "",
        searchPhoneNumber:"",
        searchCountryValue: '0',
        searchProvinceValue: '0',
  
        searchCityValue: '0',
        searchDistrictValue: '0',
        searchUnionValue: '0',
        serachParentCompanyFamily : '0',
        searchIsSuperCompnay:2,
        searchIsTrusted:2,
        searchIsBlock :2

      };

    const [searchValues, seatSearchVlues] = useState(initialValues);
    const [companyList, setcompanyList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [companyEditId, setcompanyEditId] = useState(0);
    const [countryddl, setcountryddl] =  useState([]);
    const [provinceddl, setprovinceddl] =  useState([]);
    const [cityddl, setcityddl] =  useState([]);
    const [districtddl, setdistrictddl] =  useState([]);
    const [unionddl, setunionddl] =  useState([]);
    const [parentCompanyFamilyddl, setparentCompanyFamilyddl] =  useState([]);


    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        
        seatSearchVlues({
          ...searchValues,
          [name]: value,
        });
      };
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
           resetFormelement();
        };
        load();
    }, []);

    const onEdit = ({ CompanyId }) => 
    {
    
        openNewmodal(CompanyId);
    }

    const resetFormelement = async() =>{
        
        ReBindGrid(0,searchValues.searchCompanyName,searchValues.searchCountryValue,searchValues.searchProvinceValue,searchValues.searchCityValue,searchValues.UnionId,searchValues.searchDistrictValue,searchValues.serachParentCompanyFamily,searchValues.searchPocContactNo,searchValues.searchPOCName,seatSearchVlues.searchPhoneNumber,searchValues.searchIsSuperCompnay,searchValues.searchIsTrusted,searchValues.searchIsBlock);

       let ddlCountryData =  await GetCountry();
       let ddlProvinceData =await GetProvince(-1);
       let ddlCityData =await GetCity(-1);
       let ddlDistrict =await GetDistrict(-1);
       let ddlUnion =await GetUnion(-1);
       let ddlCompanyFamily =await GetCompanyFamily();


        setcountryddl(ddlCountryData.data);
        setprovinceddl(ddlProvinceData.data);
        setcityddl(ddlCityData.data);
        setdistrictddl(ddlDistrict.data);
        setunionddl(ddlUnion.data);
        setparentCompanyFamilyddl(ddlCompanyFamily.data);
        
    }
    const onDelete =async ({ CompanyId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteCompany(CompanyId);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

            Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
           // alert("Deleted Successfully");
            
        }
    }
    resetFormelement();

    }

const DeleteCompany = async({CompanyId}) =>{

    try {
      
        var UserId=localStorage.getItem('UserId');
         var UserIp=localStorage.getItem('UserIP');
         var RequestData = {OperationId:OperationTypeId.Delete, CompanyId: CompanyId, CreatedBy:UserId,UserIP:UserIp }
         const data = await fetchData(ControllerName.Company,ApiMethods.Company_Operation, RequestData);
         if (data.response===true && data.data != null) {
          
          Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
          resetFormelement();
         }
         else {
          // alert("Error");
          Swal.fire({ title: 'Error', text:"same thing went wrong", icon:'error' });
         }
       } catch (error) {
    //     
       }
}


const GetCompanyFamily = async(e) =>{

    var data=await GetSetupMaster(SetupMasterIds.CompanyFamily,0,"",0);
    
    return data;
}
const GetCountry = async(e) =>{

    var data=await GetSetupMaster(SetupMasterIds.Country,0,"",0);
    
    return data;
}


const GetProvince = async(CountryId = 0) =>{

if(CountryId == "0")
    CountryId = "-1";
    
var data=await GetSetupMaster(SetupMasterIds.Province,CountryId,"",0);

 return data;

}


const GetCity = async(ProvinceId = 0) =>{
    
    if(ProvinceId == "0")
        ProvinceId = "-1";
        
    var data=await GetSetupMaster(SetupMasterIds.City,ProvinceId,"",0);
    
     return data;
    
    }


    
const GetDistrict   = async(CityId = 0) =>{
    
    if(CityId == "0")
        CityId = "-1";
        
    var data=await GetSetupMaster(SetupMasterIds.District,CityId,"",0);
    
     return data;
    
    }


    const GetUnion   = async(DistrictId = 0) =>{
        
        if(DistrictId == "0")
             DistrictId = "-1";
            
        var data=await GetSetupMaster(SetupMasterIds.Union,DistrictId,"",0);
        
         return data;
        
        }

    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(0,searchValues.searchCompanyName,searchValues.searchCountryValue,searchValues.searchProvinceValue,searchValues.searchCityValue,searchValues.searchUnionValue,searchValues.searchDistrictValue,searchValues.serachParentCompanyFamily,searchValues.searchPocContactNo,searchValues.searchPOCName,searchValues.searchPhoneNumber,searchValues.searchIsSuperCompnay,searchValues.searchIsTrusted,searchValues.searchIsBlock);

      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
        
        
        resetFormelement();
        seatSearchVlues(initialValues);
     
    }
    
    const handleSearchCountryChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await GetProvince(e.target.value);
        setprovinceddl(data.data);

    }


    const handleSearchProvinceChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await GetCity(e.target.value);
        setcityddl(data.data);

    }


    const handleSearchCityChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await GetDistrict(e.target.value);
        setdistrictddl(data.data);

    }


    const handleSearchDistrictChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await GetUnion(e.target.value);
        setunionddl(data.data);

    }


    const ReBindGrid =async (CompanyId = 0,CompanyName = "",CountryId = 0,ProvinceId = 0,City_VillageId = 0,UnionId = 0,DistrictId = 0,ParentCompanyFamilyId = 0,POC_ContactNo = "",POC_Name ="",PhoneNo= "",IsSuperCompany= 2,IsTrusted =2,IsBlock = 2 , IsActive = 2) =>{
      
        var data=await GetCompanies(1,CompanyId,CompanyName,CountryId,ProvinceId,City_VillageId,UnionId,DistrictId,ParentCompanyFamilyId,POC_ContactNo,POC_Name,PhoneNo,IsSuperCompany,IsTrusted,IsBlock , IsActive);
    //   
        setcompanyList(data.data);

    }
    const openNewmodal = (ComapnyId) => {
        
        setcompanyEditId(ComapnyId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setcompanyEditId(0);
        resetFormelement();
        seatSearchVlues(initialValues);
      
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col lg={12} md={12}>
                        <Card className="card-user">
                            <CardBody>
                                <Form>
                                    <Row form>
                                    <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Company Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchCompanyName"
                                                    value={searchValues.searchCompanyName}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">POC Contact No</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchPocContactNo"
                                                    value={searchValues.searchPocContactNo}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">POC Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchPOCName"
                                                    value={searchValues.searchPOCName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Phone Number</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchPhoneNumber"
                                                    value={searchValues.searchPhoneNumber}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                        <FormGroup>
                            <Label for="">Country</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCountryValue"
                          type="select"
                          value={searchValues.searchCountryValue}
                          onChange={handleSearchCountryChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            countryddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>



                
                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Province</Label>
                           <Input
                          id="exampleSelect"
                          name="searchProvinceValue"
                          type="select"
                          value={searchValues.searchProvinceValue}
                          onChange={handleSearchProvinceChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            provinceddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>



                    
                    <Col md={3}>
                        <FormGroup>
                            <Label for="">City</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCityValue"
                          type="select"
                          value={searchValues.searchCityValue}
                          onChange={handleSearchCityChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            cityddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>


                    <Col md={3}>
                        <FormGroup>
                            <Label for="">District</Label>
                           <Input
                          id="exampleSelect"
                          name="searchDistrictValue"
                          type="select"
                          value={searchValues.searchDistrictValue}
                          onChange={handleSearchDistrictChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            districtddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Union</Label>
                           <Input
                          id="exampleSelect"
                          name="searchUnionValue"
                          type="select"
                          value={searchValues.searchUnionValue}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            unionddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Company Family</Label>
                           <Input
                          id="exampleSelect"
                          name="serachParentCompanyFamily"
                          type="select"
                          value={searchValues.serachParentCompanyFamily}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            parentCompanyFamilyddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Is Super Company</Label>
                           <Input
                          id="exampleSelect"
                          name="searchIsSuperCompnay"
                          type="select"
                          value={searchValues.searchIsSuperCompnay}
                          onChange={handleInputChange}>
                              <option key={2} value={2}>
                            All
                          </option>
                          
                          <option key={1} value={1}>
                            Yes
                          </option>

                          <option key={0} value={0}>
                            No
                          </option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Is Trusted ?</Label>
                           <Input
                          id="exampleSelect"
                          name="searchIsTrusted"
                          type="select"
                          value={searchValues.searchIsTrusted}
                          onChange={handleInputChange}>
                              <option key={2} value={2}>
                            All
                          </option>
                          
                          <option key={1} value={1}>
                            Trusted
                          </option>

                          <option key={0} value={0}>
                            Not Trusted
                          </option>
                            </Input>
                        </FormGroup>
                    </Col>


                    <Col md={3}>
                        <FormGroup>
                            <Label for="">Is Blocked ?</Label>
                           <Input
                          id="exampleSelect"
                          name="searchIsBlock"
                          type="select"
                          value={searchValues.searchIsBlock}
                          onChange={handleInputChange}>
                              <option key={2} value={2}>
                            All
                          </option>
                          
                          <option key={1} value={1}>
                            Blocked
                          </option>

                          <option key={0} value={0}>
                            Not Block
                          </option>
                            </Input>
                        </FormGroup>
                    </Col>

                
                                    
                                        <Col md={12} className="text-right">
                                            <Button color="primary" size="sm" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col lg={6} md={6}>
                                        Company List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ CompanyId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Country</th>
                                           
                                            <th>Province</th>
                                            <th>City/Village</th>
                                            <th>Union</th>
                                            <th>District</th>
                                            <th>Super Company</th>
                                            <th>Trusted Company</th>
                                            <th>Block</th>
                                            {/* <th>Is Active</th>
                                            <th>Created By</th>
                                            <th>Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyList && companyList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.Company}</td>
                                                <td>{item.countryname}</td>
                                                <td>{item.provincename}</td>
                                                <td>{item.cityname}</td>
                                                <td>{item.unionname}</td>
                                                <td>{item.districtname}</td>
                                                <td>{item.IsSuperCompany ? "Yes" : "No"}</td>
                                                <td>{item.IsTrusted ? "Yes" : "No"}</td>
                                                <td>{item.IsBlock ? "Yes" : "No"}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ CompanyId: item.CompanyId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ CompanyId: item.CompanyId })}><i className="nc-icon nc-simple-remove"></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
          openModal &&
          <Modal_Company {...props}
            HeaderText="Add/Edit Compoany"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CompanyId={companyEditId}
            GetCountry={GetCountry}
            GetProvince = {GetProvince}
            GetCity = {GetCity}
            GetDistrict = {GetDistrict}
            GetUnion = {GetUnion}
            GetCompanyFamily = {GetCompanyFamily}
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default Company