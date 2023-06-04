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
import { GetSetupMaster,DeleteSetupDetail ,AllowAlphabatic} from '../utils/CommonMethods.js'
import ModalAcceptanceOfCharity from '../components/modal/ModalAcceptanceOfCharity.js'
import Swal from "sweetalert2";

const AcceptanceOfCharity = (props) => {

    const [acceptanceOfCharityList, setAcceptanceOfCharityList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [acceptanceOfCharityEditId, setAcceptanceOfCharityEditId] = useState(0);
    const [acceptanceOfCharityvalues, setacceptanceOfCharityvalues] = useState("");

    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.AcceptanceOfCharity,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ AcceptanceOfCharityId }) => {
        openNewmodal(AcceptanceOfCharityId);
    }

    const onDelete =async ({ AcceptanceOfCharityId }) => {
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
 


       var deleteData= await DeleteSetupDetail(AcceptanceOfCharityId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           // alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

            Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
            //alert("Deleted Successfully");
            
        }
    }
        ReBindGrid(SetupMasterIds.AcceptanceOfCharity,0,"",0);
        setacceptanceOfCharityvalues("");
        
       
    }

    const handleSearchClick=async(e) =>{
        e.preventDefault();
       
        ReBindGrid(SetupMasterIds.AcceptanceOfCharity,0,acceptanceOfCharityvalues,0);
      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
   //     console.log(acceptanceOfCharityvalues);
        
        ReBindGrid(SetupMasterIds.AcceptanceOfCharity,0,"",0);
        setacceptanceOfCharityvalues("");
        
      
     //   GetSetupMaster("", 0,"");
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
   //    
        setAcceptanceOfCharityList(data.data);

    }
    const openNewmodal = (AcceptanceOfCharityId) => {
       
        setAcceptanceOfCharityEditId(AcceptanceOfCharityId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setAcceptanceOfCharityEditId(0);
        ReBindGrid(SetupMasterIds.AcceptanceOfCharity,0,"",0);
        //GetUsers(0,"",0);
       // GetSetupMaster(0, 0,"");
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
                                                <Label for="">Acceptance Of Charity</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setacceptanceOfCharityvalues(AllowAlphabatic(e.target.value))}
                                                    name="acceptanceofcharityname"
                                                    value={acceptanceOfCharityvalues}
                                                    maxLength="50"
                                                    autoComplete="off"
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
                                        Acceptance Of Charity List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ AcceptanceOfCharityId: 0 })}>Add New</Button>
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
                                        {acceptanceOfCharityList && acceptanceOfCharityList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ AcceptanceOfCharityId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ AcceptanceOfCharityId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalAcceptanceOfCharity {...props}
                        HeaderText="Add/Edit Acceptance Of Charity"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        AcceptanceOfCharityId={acceptanceOfCharityEditId}
                        ReBindGrid={ReBindGrid }
                    />

                }
            </div>

        </>
    );
}

export default AcceptanceOfCharity