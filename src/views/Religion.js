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
import { GetSetupMaster, DeleteSetupDetail, AllowAlphabatic } from '../utils/CommonMethods.js'
import Modal_Religion from'../components/modal/Modal_Religion'
import Swal from "sweetalert2";

const Religion = (props) => {
    const initialValues = {
        searchReligionName: "",
       
      };

    const [values, setValues] = useState(initialValues);
    const [religionList, setreligionList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [religionEditId, setreligionEditId] = useState(0);
  

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

    const onEdit = ({ ReligionId }) => {
        openNewmodal(ReligionId);
    }

    const resetFormelement = async() =>{
     
        ReBindGrid(SetupMasterIds.Religion,0,"",0);

      
    }
    const onDelete =async ({ ReligionId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(ReligionId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           // alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {
         
          //  alert("Deleted Successfully");
          Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
    resetFormelement();

    }

    const handleSearchClick=async(e) =>{
        e.preventDefault();
       
        ReBindGrid(SetupMasterIds.Religion,"0",values.searchReligionName,0);
      
    }

    const handleCancelClick=async(e) => {
     
         e.preventDefault();
        
        
        resetFormelement();
        setValues(initialValues);
     
    }
    
   
    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
     
        setreligionList(data.data);

    }
    const openNewmodal = (ReligionId) => {
     
        setreligionEditId(ReligionId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setreligionEditId(0);
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
                                                <Label for="">Religion Name</Label>
                                                <Input
                                                    type="text"
                                                    maxLength="50"
                                                    autoComplete="off"
                                                    onChange={handleInputChange}
                                                    name="searchReligionName"
                                                    isalphabetic="true"
                                                    value={values.searchReligionName}
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
                                        Religion List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ ReligionId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            
                                            {/*<th>Active</th>*/}
                                            {/*<th>CreatedBy</th>*/}
                                            {/*<th>Last Modified By</th>*/}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {religionList && religionList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                               
                                                {/*<td>{item.IsActive ? "Yes" : "No"}</td>*/}
                                                {/*<td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>*/}
                                                {/*<td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td>*/}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ ReligionId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ ReligionId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <Modal_Religion {...props}
            HeaderText="Add/Edit Religion"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            ReligionId={religionEditId}
            
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default Religion