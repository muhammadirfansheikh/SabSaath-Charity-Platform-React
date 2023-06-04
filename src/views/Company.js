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
import { GetSetupMaster, DeleteSetupDetail, GetCompanies, AllowAlphabatic } from '../utils/CommonMethods.js'
import Modal_Company from "components/modal/Modal_Company.js";
import Swal from "sweetalert2";


const Company = (props) => {
    const initialValues = {
        searchCompanyName: "",
       
        
        
       
        serachParentCompanyFamily : '0',
   

      };

    const [searchValues, seatSearchVlues] = useState(initialValues);
    const [companyList, setcompanyList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [companyEditId, setcompanyEditId] = useState(0);
    
    const [parentCompanyFamilyddl, setparentCompanyFamilyddl] =  useState([]);


    const handleInputChange = (e) => {



      
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
        
            _values = AllowAlphabatic(e.target.value);
        }
        else if (e.target.getAttribute("isnumber") == "true")
            _values = e.target.value.replace(/\D/g, "");






        seatSearchVlues({
          ...searchValues,
            [name]: _values,
        });

        //const { name, value } = e.target;
        
        //seatSearchVlues({
        //  ...searchValues,
        //  [name]: value,
        //});
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
        
        seatSearchVlues(initialValues);
       
       let ddlCompanyFamily =await GetCompanyFamily();


       
        setparentCompanyFamilyddl(ddlCompanyFamily.data);


        

        ReBindGrid(0, "", "0", "");

        
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

const DeleteCompany = async(CompanyId) =>{

    try {
      
        var UserId=localStorage.getItem('UserId');
         var UserIp=localStorage.getItem('UserIP');
         var RequestData = [{OperationId:OperationTypeId.Delete, CompanyId: CompanyId, CreatedBy:UserId,UserIP:UserIp }]
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


    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(0,searchValues.searchCompanyName,searchValues.serachParentCompanyFamily);

      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
        
        
        resetFormelement();
        
     
    }
    
 


    const ReBindGrid =async (CompanyId = 0,CompanyName = "",ParentCompanyFamilyId = 0,PhoneNo= "") =>{
     
        var data=await GetCompanies(CompanyId,CompanyName,ParentCompanyFamilyId,PhoneNo);
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
                                                    isalphabetic="true"
                                                    autoComplete="off"
                                                    value={searchValues.searchCompanyName}
                                                />
                                            </FormGroup>
                                        </Col>

                                   
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Phone Number</Label>
                                                <Input
                                                    type="text"
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXX"
                                                    onChange={handleInputChange}
                                                    name="searchPhoneNumber"
                                                    maxLength="11"
                                                    value={searchValues.searchPhoneNumber}
                                                />
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
                                            <th>Company Name</th>
                                            <th>Parent Company</th>
                                            <th>Company Family</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            
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
                                                <td>{item.parentcompanyname}</td>
                                                <td>{item.familyname}</td>
                                                <td>{item.PhoneNo}</td>
                                                <td>{item.Address}</td>
                                               
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
            
            GetCompanyFamily = {GetCompanyFamily}
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default Company