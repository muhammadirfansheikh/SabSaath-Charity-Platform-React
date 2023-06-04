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
import ModalCompanyFamily from '../components/modal/ModalCompanyFamily_bkp.js'
import Swal from "sweetalert2";


const CompanyFamily = (props) => {
const initialValues = {
    searchFamily: "",
    searchCompanyValue: '0'
  };
  const [values, setValues] = useState(initialValues);
  const [companyfamilyList, setCompanyFamilyList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [companyfamilyEditId, setCompanyFamilyEditId] = useState(0);
   const [companyddl, setCompanyddl] = useState([]);

 const handleInputChange = (e) => {
 
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function GetCompanyFamily(CompanyFamilyName, CompanyId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, CompanyId: CompanyId, FamilyName:CompanyFamilyName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyFamily_Operation, RequestData);
  
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setCompanyFamilyList(data.data);
        } 
        else {
          setCompanyFamilyList([]);
        }
      }
      else {
       // alert("Error");
        Swal.fire({ title: 'Error', text:"some thing went wrong", icon:'error' });
    //    
        }
    } catch (error) {
    
    }
  }
 async function DeleteCompanyFamily(CompanyFamilyId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, CompanyFamilyId: CompanyFamilyId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.CompanyFamily_Operation, RequestData);
      if (data.response===true && data.data != null) {
        //alert("Deleted Successfully");
        Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });

        GetCompanyFamily("", 0);
      }
      else {
        //alert("Error");
        Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'Error' });
      }
    } catch (error) {
  //    
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetCompanyFamily("", 0);
    };
    const loadCompany = async () => {
     var RequestData = {OperationId:OperationTypeId.Select }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Company_Operation, RequestData);
      
       setCompanyddl(data.data);

     
    };
    load();
    loadCompany();
  }, []);

  const onEdit = ({ CompanyFamilyId }) => {
    
    openNewmodal(CompanyFamilyId);
  }

  const onDelete = ({ CompanyFamilyId }) => { 
    DeleteCompanyFamily(CompanyFamilyId);
  }

  function handleSearchClick(e) {
    e.preventDefault(); 
    GetCompanyFamily(values.searchFamily, values.searchCompanyValue);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setValues(initialValues);
    GetCompanyFamily("", 0);
  }
  const openNewmodal = (CompanyFamilyId) => {
    setCompanyFamilyEditId(CompanyFamilyId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setCompanyFamilyEditId(0);
    //GetUsers(0,"",0);
    GetCompanyFamily(null, 0);
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
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Company Family Name</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="searchFamily"
                          value={values.searchFamily}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="">Company Family</Label>
                           <Input
                          id="exampleSelect"
                          name="searchCompanyValue"
                          type="select"
                          value={values.searchCompanyValue}
                          onChange={handleInputChange}
                        >
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
                      <th>Company</th>
                       <th>Family</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyfamilyList && companyfamilyList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Company}</td>
                         <td>{item.Family}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ CompanyFamilyId: item.CompanyFamilyId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ CompanyFamilyId: item.CompanyFamilyId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalCompanyFamily {...props}
            HeaderText="Add/Edit CompanyFamily"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CompanyFamilyId={companyfamilyEditId}
            companyddl={companyddl}
          />

        }
      </div>

    </>
  );
}

export default CompanyFamily