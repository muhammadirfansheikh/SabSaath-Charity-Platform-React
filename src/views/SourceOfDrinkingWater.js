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
import ModalSourceOfDrinkingWater from '../components/modal/ModalSourceOfDrinkingWater.js'
import Swal from "sweetalert2";
 

const SourceOfDrinkingWater = (props) => {

    const [sourceofdrinkingList, setsourceofdrinkingList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [sourceofdrinkingEditId, setsourceofdrinkingEditId] = useState(0);
    const [sourceofdrinkingvalues, setsourceofdrinkingvalues] = useState("");

    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.SourceOfDrinking,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ SourceOfDrinkingId }) => {
      
        openNewmodal(SourceOfDrinkingId);
    }

    const onDelete =async ({ SourceOfDrinkingId }) => {
       
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
  
       var deleteData= await DeleteSetupDetail(SourceOfDrinkingId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           // alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

           
            //alert("Deleted Successfully");
            Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
        ReBindGrid(SetupMasterIds.SourceOfDrinking ,0,"",0);
        setsourceofdrinkingvalues("");
        
       
    }



    const handleSearchClick=async(e) =>{
        e.preventDefault();
       
        ReBindGrid(SetupMasterIds.SourceOfDrinking,0,sourceofdrinkingvalues,0);
      
    }

    const handleCancelClick=async(e) => {
      
         e.preventDefault();
       
        ReBindGrid(SetupMasterIds.SourceOfDrinking,0,"",0);
        setsourceofdrinkingvalues("");
      
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
      
        setsourceofdrinkingList(data.data);

    }
    const openNewmodal = (SourceOfDrinkingId) => {
        
        setsourceofdrinkingEditId(SourceOfDrinkingId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setsourceofdrinkingEditId(0);
        ReBindGrid(SetupMasterIds.SourceOfDrinking,0,"",0);
       
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
                                                <Label for="">Source Of Drinking Water Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setsourceofdrinkingvalues(AllowAlphabatic(e.target.value))}
                                                    name="sourceofdrinkingwater"
                                                    maxLength="50"
                                                    autoComplete="off"
                                                    value={sourceofdrinkingvalues}
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
                                        Source Of Drinking Water List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ SourceOfDrinkingId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sourceofdrinkingList && sourceofdrinkingList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ SourceOfDrinkingId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ SourceOfDrinkingId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalSourceOfDrinkingWater {...props}
                        HeaderText="Add/Edit Source Of Drinking Water"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        SourceOfDrinkingId={sourceofdrinkingEditId}
                        ReBindGrid={ReBindGrid }
                    />

                }
            </div>

        </>
    );
}

export default SourceOfDrinkingWater