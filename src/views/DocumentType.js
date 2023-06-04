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
import ModalDocumentType from '../components/modal/ModalDocumentType.js'
import Swal from "sweetalert2";


const DocumentType = (props) => {

    const [documentTypeList, setDocumentTypeList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [documentTypeEditId, setdocumentTypeEditId] = useState(0);
    const [documentTypeValues, setdocumentTypeValues] = useState("");

    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.DocumentParentTypes,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ DocumentTypeId }) => {
        openNewmodal(DocumentTypeId);
    }

    const onDelete =async ({ DocumentTypeId }) => {
      
      //  console.log(DocumentTypeId);

        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(DocumentTypeId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           // alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

           
           // alert("Deleted Successfully");
           Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
        ReBindGrid(SetupMasterIds.DocumentParentTypes,0,"",0);
        setdocumentTypeValues("");
        
       
    }

    const handleSearchClick=async(e) =>{
        e.preventDefault(); 
        ReBindGrid(SetupMasterIds.DocumentParentTypes,0,documentTypeValues,0);
      
    }

    const handleCancelClick=async(e) => {
      
         e.preventDefault(); 
        
        ReBindGrid(SetupMasterIds.DocumentParentTypes,0,"",0);
        setdocumentTypeValues(""); 
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
      // 
        setDocumentTypeList(data.data);

    }
    const openNewmodal = (DocumentTypeId) => {
      
        setdocumentTypeEditId(DocumentTypeId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setdocumentTypeEditId(0);
        ReBindGrid(SetupMasterIds.DocumentParentTypes,0,"",0);
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
                                                <Label for="">Document Type Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setdocumentTypeValues(AllowAlphabatic(e.target.value))}
                                                    name="documenttypename"
                                                    value={documentTypeValues}
                                                    autoComplete="off"
                                                    maxLength="50"
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
                                        Document Type List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ DocumentTypeId: 0 })}>Add New</Button>
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
                                        {documentTypeList && documentTypeList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ DocumentTypeId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ DocumentTypeId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalDocumentType {...props}
                        HeaderText="Add/Edit Document Type"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        ReBindGrid={ReBindGrid}
                        DocumentTypeId={documentTypeEditId}
                    />

                }
            </div>

        </>
    );
}

export default DocumentType