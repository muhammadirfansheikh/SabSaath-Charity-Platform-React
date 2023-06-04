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
import ModalDocumentSubType from '../components/modal/ModalDocumentSubType.js'
import Swal from "sweetalert2";

const DocumentSubType = (props) => {
    const initialValues = {
        searchDocumentSubType: "",
        searchDocumentTypeValue: '0'
      };
      const [values, setValues] = useState(initialValues);
    const [documentSubTypeList, setDocumentSubTypeList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [documentSubTypeEditId, setdocumentSubTypeEditId] = useState(0);
    const [documentddl, setDocumentddl] =  useState([]);

    const handleInputChange = (e) => {
      
    
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
     //     
            _values = AllowAlphabatic(e.target.value);
        }






        setValues({
            ...values,
            [name]: _values,
        });
      };
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.DocumentSubTypes,0,"",0);

            let setDocumentddlData =await GetDocumentType();

            setDocumentddl(setDocumentddlData.data);
        };
        load();
    }, []);

    const onEdit = ({ DocumentSubTypeId }) => {
        openNewmodal(DocumentSubTypeId);
    }

    const onDelete =async ({ DocumentSubTypeId }) => {
       

        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(DocumentSubTypeId,UserId,UserIp);
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
        ReBindGrid(SetupMasterIds.DocumentSubTypes,0,"",0);

        //setacademicLevelvalues("");
        
       
    }
const GetDocumentType = async(e) =>{

    var data=await GetSetupMaster(SetupMasterIds.DocumentParentTypes,0,"",0);
    return data;

}
    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.DocumentSubTypes,values.searchDocumentTypeValue,values.searchDocumentSubType,0);
      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
        
        
        ReBindGrid(SetupMasterIds.DocumentSubTypes,0,"",0);
        setValues(initialValues);
        
      
     //   GetSetupMaster("", 0,"");
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
     
        setDocumentSubTypeList(data.data);

    }
    const openNewmodal = (DocumentSubTypeId) => {
     
        setdocumentSubTypeEditId(DocumentSubTypeId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setdocumentSubTypeEditId(0);
        ReBindGrid(SetupMasterIds.DocumentSubTypes,0,"",0);
        setValues(initialValues);
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
                            <Label for="">Document Type</Label>
                           <Input
                          id="exampleSelect"
                          name="searchDocumentTypeValue"
                          type="select"
                          value={values.searchDocumentTypeValue}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            documentddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Document Sub Type Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchDocumentSubType"
                                                    value={values.searchDocumentSubType}
                                                    maxLength="50"
                                                    autoComplete="off"
                                                    isalphabetic="true"
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
                                        Document Sub Type List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ DocumentSubTypeId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Document Type</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documentSubTypeList && documentSubTypeList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.ParentName}</td>
{/*                                                 
                                                <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ DocumentSubTypeId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ DocumentSubTypeId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalDocumentSubType {...props}
                        HeaderText="Add/Edit Document Sub Type"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        DocumentSubTypeId={documentSubTypeEditId}
                        DocumentTypddl={documentddl}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default DocumentSubType