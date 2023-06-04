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
import { GetSetupMaster,DeleteSetupDetail,AllowAlphabatic } from '../utils/CommonMethods.js'
import Modal_Union from 'components/modal/Modal_Union'
import Swal from "sweetalert2";
 


const Union = (props) => {
    const initialValues = {
        searchUnionName: "",
        searchCountryValue: '0',
        searchProvinceValue: '0',
  
        searchCityValue: '0',
        searchDistrictValue: '0',
      };

    const [values, setValues] = useState(initialValues);
    const [unionList, setunionList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [unionEditId, setunionEditId] = useState(0);
    const [countryddl, setcountryddl] =  useState([]);
    const [provinceddl, setprovinceddl] =  useState([]);
    const [cityddl, setcityddl] =  useState([]);
    const [districtddl, setdistrictddl] =  useState([]);

    const handleInputChange = (e) => {
      
  
        const { name, value } = e.target;
        let values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
     //     
            values = AllowAlphabatic(e.target.value);
        }






        setValues({
            ...values,
            [name]: values,
        });
      };
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
           resetFormelement();
        };
        load();
    }, []);

    const onEdit = ({ UnionId }) => {
        openNewmodal(UnionId);
    }

    const resetFormelement = async() =>{
      
        ReBindGrid(SetupMasterIds.Union,0,"",0);

       let ddlCountryData =  await GetCountry();
       let ddlProvinceData =await GetProvince(-1);
       let ddlCityData =await GetCity(-1);
       let ddlDistrict =await GetDistrict(-1);

        setcountryddl(ddlCountryData.data);
        setprovinceddl(ddlProvinceData.data);
        setcityddl(ddlCityData.data);
        setdistrictddl(ddlDistrict.data);
        
    }
    const onDelete =async ({ UnionId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(UnionId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {
         
            //alert("Deleted Successfully");
            Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
    resetFormelement();

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


    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.Union,values.searchDistrictValue ,values.searchUnionName,0);
      
    }

    const handleCancelClick=async(e) => {
       
         e.preventDefault();
        
        
        resetFormelement();
        setValues(initialValues);
     
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

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
     
        setunionList(data.data);

    }
    const openNewmodal = (UnionId) => {
      
        setunionEditId(UnionId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setunionEditId(0);
        resetFormelement();
        setValues(initialValues);
      
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
                            <Label for="">Country</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCountryValue"
                          type="select"
                          value={values.searchCountryValue}
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
                          value={values.searchProvinceValue}
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
                          value={values.searchCityValue}
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
                          value={values.searchDistrictValue}
                          onChange={handleInputChange}>
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
                                                <Label for="">Union Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchUnionName"
                                                    value={values.searchUnionName}
                                                    maxLength="50"
                                                    isalphabetic="true"
                                                    autoComplete="false"
                                                />
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
                                        Union List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ UnionId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>District</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unionList && unionList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ UnionId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ UnionId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <Modal_Union {...props}
            HeaderText="Add/Edit Union"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            UnionId={unionEditId}
            GetCountry={GetCountry}
            GetProvince = {GetProvince}
            GetCity = {GetCity}
            GetDistrict = {GetDistrict}
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default Union