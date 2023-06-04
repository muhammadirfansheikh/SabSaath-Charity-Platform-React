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


import Swal from "sweetalert2";


const District = (props) => {
    const initialValues = {
        searchCompanyFamilyName: "",
        searchCompany: '0',
       
      };

    const [values, setValues] = useState(initialValues);
    const [companyFamilyList, setcompanyFamilyList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [companyFamilyEditId, setcompanyFamilyEditId] = useState(0);
    const [companyddl, setcompanyddl] =  useState([]);
    

    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        setValues({
          ...values,
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

    const onEdit = ({ CompanyFamilyId }) => {
        openNewmodal(CompanyFamilyId);
    }

    const resetFormelement = async() =>{
        
        ReBindGrid(SetupMasterIds.CompanyFamily,0,"",0);

       let ddlCompanyData =  await GetCompanies();
       

        setcompanyddl(ddlCountryData.data);
       
        
    }
    const onDelete =async ({ CompanyFamilyId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(CompanyFamilyId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

           
            //alert("Deleted Successfully");
            
            Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
    resetFormelement();

    }


    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.CompanyFamily,values.searchCompany ,values.searchCompanyFamilyName,0);
      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
        
        
        resetFormelement();
        setValues(initialValues);
     
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
     
        setcompanyFamilyList(data.data);

    }
    const openNewmodal = (CompanyFamilyId) => {
        
        setcompanyFamilyEditId(CompanyFamilyId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setcompanyFamilyEditId(0);
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
                                
                                        <Col md={4}>
                        <FormGroup>
                            <Label for="">Company</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCompany"
                          type="select"
                          value={values.searchCompany}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            companyddl.map((item, key) => (
                                <option key={item.CompanyId} value={item.CompanyId}>
                                {item.Company}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>


                    <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Company Family Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchCompanyFamilyName"
                                                    value={values.searchCompanyFamilyName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-right">
                                            <Button color="primary" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" onClick={handleCancelClick}>Cancel</Button>
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
                                        Company Family List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" className="m-0" onClick={() => openNewmodal({ CompanyFamilyId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Company</th>
                                            <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyFamilyList && companyFamilyList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
                                                
                                                <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td>
                                                <td>
                                                    <Button color="primary" outline size="sm" onClick={(e) => onEdit({ DistrictId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" outline size="sm" onClick={() => onDelete({ DistrictId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <Modal_District {...props}
            HeaderText="Add/Edit District"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            DistrictId={districtEditId}
            GetCountry={GetCountry}
            GetProvince = {GetProvince}
            GetCity = {GetCity}
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default District