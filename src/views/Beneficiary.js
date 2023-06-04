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
import ModalBeneficiary from '../components/modal/ModalBeneficiary.js'
import Swal from "sweetalert2";
 

const Beneficiary = (props) => {

  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [beneficiaryEditId, setBeneficiaryEditId] = useState(0);
  const [beneficiaryvalues, setBeneficiaryvalues] = useState("");

  async function GetBeneficiary(BeneficiaryName, BeneficiaryId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, BeneficiaryId: BeneficiaryId, BeneficiaryName:BeneficiaryName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.Beneficiary_Operation, RequestData);
  
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setBeneficiaryList(data.data);
        } 
        else {
          setBeneficiaryList([]);
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
 async function DeleteBeneficiary(BeneficiaryId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, BeneficiaryId:BeneficiaryId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Beneficiary_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
        GetBeneficiary("", 0);
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'error' });
      }
    } catch (error) {
  //    
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetBeneficiary("", 0);
    };
    load();
  }, []);

  const onEdit = ({ BeneficiaryId }) => {
    openNewmodal(BeneficiaryId);
  }

  const onDelete = ({ BeneficiaryId }) => { 
    DeleteBeneficiary(BeneficiaryId);
  }

  function handleSearchClick(e) {
    e.preventDefault(); 
//     beneficiaryList.filter()
//     var newArray = homes.filter(function (el) {
//   return el.price <= 1000 &&
//          el.sqft >= 500 &&
//          el.num_of_beds >=2 &&
//          el.num_of_baths >= 2.5;
// });
    GetBeneficiary(beneficiaryvalues, 0);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setBeneficiaryvalues("");
    GetBeneficiary("", 0);
  }
  const openNewmodal = (BeneficiaryId) => {
    setBeneficiaryEditId(BeneficiaryId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setBeneficiaryEditId(0);
    //GetUsers(0,"",0);
    GetBeneficiary(null, 0);
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
                        <Label for="">Beneficiary Name</Label>
                        <Input
                          type="text"
                          onChange={(e) => setBeneficiaryvalues(e.target.value)}
                          name="beneficiaryName"
                          value={beneficiaryvalues}
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
                    Beneficiary List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ BeneficiaryId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Beneficiary</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaryList && beneficiaryList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Beneficiary}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ BeneficiaryId: item.BeneficiaryId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ BeneficiaryId: item.BeneficiaryId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalBeneficiary {...props}
            HeaderText="Add/Edit Beneficiary"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            BeneficiaryId={beneficiaryEditId}
          />

        }
      </div>

    </>
  );
}

export default Beneficiary