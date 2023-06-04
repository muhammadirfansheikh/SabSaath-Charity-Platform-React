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
import ModalFrequency from '../components/modal/ModalFrequency_bkp.js'
import Swal from "sweetalert2";
 

const Frequency = (props) => {

  const [frequencyList, setFrequencyList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [frequencyEditId, setFrequencyEditId] = useState(0);
  const [frequencyvalues, setFrequencyvalues] = useState("");

  async function GetFrequency(FrequencyName, FrequencyId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, FrequencyId: FrequencyId, FrequencyName:FrequencyName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.Frequency_Operation, RequestData);
    
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setFrequencyList(data.data);
        } 
        else {
          setFrequencyList([]);
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
 async function DeleteFrequency(FrequencyId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, FrequencyId: FrequencyId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Frequency_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
      
        GetFrequency("", 0);
      }
      else {
        //alert("Error");
        Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'error' });
      }
    } catch (error) {
  //    
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetFrequency("", 0);
    };
    load();
  }, []);

  const onEdit = ({ FrequencyId }) => {
    openNewmodal(FrequencyId);
  }

  const onDelete = ({ FrequencyId }) => { 
    DeleteFrequency(FrequencyId);
  }

  function handleSearchClick(e) {
    e.preventDefault(); 
    GetFrequency(frequencyvalues, 0);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setFrequencyvalues("");
    GetFrequency("", 0);
  }
  const openNewmodal = (FrequencyId) => {
    setFrequencyEditId(FrequencyId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setFrequencyEditId(0);
    //GetUsers(0,"",0);
    GetFrequency(null, 0);
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
                        <Label for="">Frequency Name</Label>
                        <Input
                          type="text"
                          onChange={(e) => setFrequencyvalues(e.target.value)}
                          name="frequencyName"
                          value={frequencyvalues}
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
                    Frequency List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ FrequencyId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Frequency</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequencyList && frequencyList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Frequency}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ FrequencyId: item.FrequencyId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ FrequencyId: item.FrequencyId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalFrequency {...props}
            HeaderText="Add/Edit Frequency"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            FrequencyId={frequencyEditId}
          />

        }
      </div>

    </>
  );
}

export default Frequency