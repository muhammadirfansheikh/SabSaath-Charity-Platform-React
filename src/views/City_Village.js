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
import ModalCity_Village from "components/modal/ModalCity_Village"
import Swal from "sweetalert2";
 


const City = (props) => {
    const initialValues = {
        searchCityName: "",
        searchCountryValue: '0',
        searchProvinceValue: '0',
      };

    const [values, setValues] = useState(initialValues);
    const [cityList, setcityList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [cityEditId, setcityEditId] = useState(0);
    const [countryddl, setcountryddl] =  useState([]);
    const [provinceddl, setprovinceddl] =  useState([]);

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

    const onEdit = ({ CityId }) => {
        openNewmodal(CityId);
    }

    const resetFormelement = async() =>{
        ReBindGrid(SetupMasterIds.City,0,"",0);

       let ddlCountryData =  await GetCountry();
       let ddlProvinceData =await GetProvince(-1);

        setcountryddl(ddlCountryData.data);
        setprovinceddl(ddlProvinceData.data);
        
    }
    const onDelete =async ({ CityId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(CityId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           // alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

            Swal.fire({ title: 'Success', text: "Deleted Successfully", icon:'success' });
           // alert("Deleted Successfully");
            
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
    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.City,values.searchProvinceValue ,values.searchCityName,0);
      
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

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
    //   
        setcityList(data.data);

    }
    const openNewmodal = (CityId) => {
      
        setcityEditId(CityId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setcityEditId(0);
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
                          onChange={handleInputChange}>
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
                                                <Label for="">City Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchCityName"
                                                    isalphabetic="true"
                                                    value={values.searchCityName}
                                                    autoComplete="off"
                                                    maxLength="50"
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
                                        City List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ CityId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Cities</th>
                                            <th>Province</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cityList && cityList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ CityId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ CityId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalCity_Village {...props}
            HeaderText="Add/Edit City"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CityId={cityEditId}
            GetCountry={GetCountry}
            GetProvince = {GetProvince}
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default City