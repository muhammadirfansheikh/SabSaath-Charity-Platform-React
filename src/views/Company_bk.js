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
import ModalCompany from '../components/modal/ModalCompany_bkp.js'
import Swal from "sweetalert2";


const Company = (props) => {

  const [companyList, setCompanyList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [companyEditId, setCompanyEditId] = useState(0);
  const [companyvalues, setCompanyvalues] = useState("");

  async function GetCompany(CompanyName, CompanyId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, CompanyId: CompanyId, CompanyName:CompanyName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.Company_Operation, RequestData);
      
  
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setCompanyList(data.data);
        } 
        else {
          setCompanyList([]);
        }
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"Error", icon:'Error' });
       
 //       
        }
    } catch (error) {
//      
    }
  }
 async function DeleteCompany(CompanyId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, CompanyId: CompanyId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Company_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
        GetCompany("", 0);
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"same thing went wrong", icon:'error' });
      }
    } catch (error) {
 //     
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetCompany("", 0);
    };
    load();
  }, []);

  const onEdit = ({ CompanyId }) => {
    openNewmodal(CompanyId);
  }

  const onDelete = ({ CompanyId }) => { 
    DeleteCompany(CompanyId);
  }

  function handleSearchClick(e) {
    e.preventDefault(); 
    GetCompany(companyvalues, 0);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setCompanyvalues("");
    GetCompany("", 0);
  }
  const openNewmodal = (CompanyId) => {
    setCompanyEditId(CompanyId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setCompanyEditId(0);
    //GetUsers(0,"",0);
    GetCompany(null, 0);
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
                        <Label for="">Company Name</Label>
                        <Input
                          type="text"
                          onChange={(e) => setCompanyvalues(e.target.value)}
                          name="companyName"
                          value={companyvalues}
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
                    Company List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ CompanyId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Company</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyList && companyList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Company}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ CompanyId: item.CompanyId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ CompanyId: item.CompanyId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalCompany {...props}
            HeaderText="Add/Edit Company"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CompanyId={companyEditId}
          />

        }
      </div>

    </>
  );
}

export default Company