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
import ModalPaymentType from '../components/modal/ModalPaymentType_bkp.js'
import Swal from "sweetalert2";



const PaymentType = (props) => {

  const [paymentTypeList, setPaymentTypeList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [paymentTypeEditId, setPaymentTypeEditId] = useState(0);
  const [paymentTypevalues, setPaymentTypeValues] = useState("");

  async function GetPaymentType(PaymentTypeName, PaymentTypeId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, PaymentTypeId: PaymentTypeId, PaymentTypeName:PaymentTypeName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.PaymentType_Operation, RequestData);
     // 
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setPaymentTypeList(data.data);
        } 
        else {
          setPaymentTypeList([]);
        }
      }
      else {
        //alert("Error");
        Swal.fire({ title: 'Error', text:"Some thing went wrong", icon:'error' });
     //   
        }
    } catch (error) {
 
    }
  }
 async function DeletePaymentType(PaymentTypeId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, PaymentTypeId: PaymentTypeId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.PaymentType_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
        GetPaymentType("", 0);
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"Some thing went wrong", icon:'error' });
      }
    } catch (error) {
 
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetPaymentType("", 0);
    };
    load();
  }, []);

  const onEdit = ({ PaymentTypeId }) => {
    openNewmodal(PaymentTypeId);
  }

  const onDelete = ({ PaymentTypeId }) => {
  //  console.log(PaymentTypeId);
    DeletePaymentType(PaymentTypeId);
  }

  function handleSearchClick(e) {
    e.preventDefault();
  //  console.log(paymentTypevalues);
    GetPaymentType(paymentTypevalues, 0);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setPaymentTypeValues("");
    GetPaymentType("", 0);
  }
  const openNewmodal = (PaymentTypeId) => {
    setPaymentTypeEditId(PaymentTypeId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setPaymentTypeEditId(0);
    //GetUsers(0,"",0);
    GetPaymentType(null, 0);
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
                        <Label for="">Payment Type</Label>
                        <Input
                          type="text"
                          onChange={(e) => setPaymentTypeValues(e.target.value)}
                          name="paymentType"
                          value={paymentTypevalues}
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
                    User List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ PaymentTypeId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Payment Type</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentTypeList && paymentTypeList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.PaymentType}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ PaymentTypeId: item.PaymentTypeId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ PaymentTypeId: item.PaymentTypeId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalPaymentType {...props}
            HeaderText="Add/Edit Payment Type"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            PaymentTypeId={paymentTypeEditId}
          />

        }
      </div>

    </>
  );
}

export default PaymentType