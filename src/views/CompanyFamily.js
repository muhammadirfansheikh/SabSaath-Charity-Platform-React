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
import Modal_CompanyFamily from "components/modal/ModalCompanyFamily.js";
import Swal from "sweetalert2";


const CompanyFamily = (props) => {
    const initialValues = {
        searchCompanyFamilyName: "",
        searchParentCompanyFamily: '0',
       
      };

    const [searchvalues, setsearchvalues] = useState(initialValues);
    const [companyFamilyList, setcompanyFamilyList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [companyFamilyEditId, setcompanyFamilyEditId] = useState(0);
    const [parentCompanyFamilyddl, setparentCompanyFamilyddl] =  useState([]);
    



    const handleInputChange = (e) => {
        
   
        const { name, value } = e.target;
        let values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
    
            values = AllowAlphabatic(e.target.value);
        }






        setsearchvalues({
            ...searchvalues,
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

    const onEdit = ({ CompanyFamilyId }) => {
        openNewmodal(CompanyFamilyId);
    }

    const resetFormelement = async() =>{
        
        ReBindGrid(SetupMasterIds.CompanyFamily,0,"",0);

       let ddlParentCompanyFamilyData =  await GetParentCompanyFamily();
      



        setparentCompanyFamilyddl(ddlParentCompanyFamilyData.data);
        
        
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

            Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
           // alert("Deleted Successfully");
            
        }
    }
    resetFormelement();

    }
const GetParentCompanyFamily = async(e) =>{

    var data=await GetSetupMaster(SetupMasterIds.CompanyFamily,0,"",0);
    
    return data;
}



    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.CompanyFamily,searchvalues.searchParentCompanyFamily ,searchvalues.searchCompanyFamilyName,0);
      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
        
        
        resetFormelement();
        setsearchvalues(initialValues);
     
    }
    
  

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
    //   
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
        setsearchvalues(initialValues);
      
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
                            <Label for="">Parent Company Family</Label>
                           <Input
                          id="exampleSelect"
                          name="searchParentCompanyFamily"
                          type="select"
                          value={searchvalues.searchParentCompanyFamily}
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
                                                <Label for="">Company Family Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchCompanyFamilyName"
                                                    isalphabetic="true"
                                                    value={searchvalues.searchCompanyFamilyName}
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
                                        Company Family List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ CompanyFamilyId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Parent Company Family</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyFamilyList && companyFamilyList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ CompanyFamilyId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ CompanyFamilyId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <Modal_CompanyFamily {...props}
            HeaderText="Add/Edit Company Family"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CompanyFamilyId={companyFamilyEditId}
            GetParentCompanyFamily={GetParentCompanyFamily}
           
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default CompanyFamily