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
import { ApiMethods,ControllerName,OperationTypeId } from '../utils/Constants.js'
import { GetCompanies,GetRoles } from "utils/CommonMethods.js";

import ModalRoles from '../components/modal/ModalRoles.js'
import Swal from "sweetalert2";


const Roles = (props) => {
  const initialValues = {
    searchRoleName: "",
    searchCompanyValue: '0'
  };
  const [roleList, setRoleList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [roleEditId, setroleEditId] = useState(0);
  const [rolevalues, setrolevalues] = useState(initialValues);
  const [ddlCompany, setrddlCompany] = useState([]);



  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
    setrolevalues({
      ...rolevalues,
      [name]: value,
    });
  };

  async function GetCompanyData(CompanyId= 0,CompanyName = '') {
    try {
    
      
      const data =await GetCompanies(CompanyId,CompanyName);
      
      if (data.response===true && data.data != null) {
        setrddlCompany(data.data);
      } 
      else {
        setrddlCompany([]);
      }
    } catch (error) {
  //    
    }
  }

  async function GetRolesData(RoleName, RoleId,ComapnyId = 0) {
    try {
   
      const data = await GetRoles(RoleName,RoleId,ComapnyId);
      
      if (data.response===true && data.data != null) {
        setRoleList(data.data);
      } 
      else {
        setRoleList([]);
      }
    } catch (error) {
 
    }
  }
 async function DeleteRole(RoleId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, RoleId: RoleId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Security,ApiMethods.UserRole_Operation, RequestData);
      if (data.response===true && data.data != null) {
      //  alert("Deleted Successfully");
      Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
        GetRolesData("", 0,0);
        GetCompanyData(0,'');
      }
      else {
       // alert("Error");
        Swal.fire({ title: 'Error', text:"Error", icon:'error' });
      }
    } catch (error) {
  //    
    }
  }
  React.useEffect(() => {

    // need to define the function and call it separately
    const load = async () => {
      GetRolesData("", 0,0);
      GetCompanyData(0,'');
    };
    load();
  }, []);

  const onEdit = ({ RoleId }) => {
    openNewmodal(RoleId);
  }

  const onDelete = ({ RoleId }) => {
  //  console.log(RoleId);
    DeleteRole(RoleId);
  }

  function handleSearchClick(e) {
  
    e.preventDefault();
  //  console.log(rolevalues);
    GetRolesData(rolevalues.searchRoleName, 0,rolevalues.searchCompanyValue);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setrolevalues(initialValues);
    GetRolesData("", 0,0);
    GetCompanyData(0,'');
  }
  const openNewmodal = (RoleId) => {
    setroleEditId(RoleId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setroleEditId(0);
    //GetUsers(0,"",0);
    GetRolesData(null, 0);
    GetCompanyData(0,'');
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
                            <Label for="">Company</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCompanyValue"
                          type="select"
                          value={rolevalues.searchCompanyValue}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            ddlCompany.map((item, key) => (
                              <option key={item.CompanyId} value={item.CompanyId}>
                                {item.Company}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Role</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="searchRoleName"
                          value={rolevalues.searchRoleName}
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
                    Role List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                                      <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ RoleId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Role</th>
                      <th>Company</th>
                      {/* <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th> */}
                      <th className="text-center" style={{ width: 150 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleList && roleList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.RoleName}</td>
                        <td>{item.Company}</td>
                        {/* <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td> */}
                            <td className="text-center">
                                <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ RoleId: item.RoleId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ RoleId: item.RoleId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalRoles {...props}
            HeaderText="Add/Edit Roles"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            
            RoleId={roleEditId}
          />

        }
      </div>

    </>
  );
}

export default Roles