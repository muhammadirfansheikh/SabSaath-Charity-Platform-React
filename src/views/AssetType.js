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
import ModalAssetType from '../components/modal/ModalAssetType.js'
import Swal from "sweetalert2";



const AssetType = (props) => {

    const [assetTypeList, setassetTypeList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [assetTypeEditId, setassetTypeEditId] = useState(0);
    const [assetTypevalues, setassetTypevalues] = useState("");

    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.AssetsType,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ AssetTypeId }) => {
        
        openNewmodal(AssetTypeId);
    }

    const onDelete =async ({ AssetTypeId }) => {
       
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
  
       var deleteData= await DeleteSetupDetail(AssetTypeId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
           //alert(deleteData.data[0].Message);
           Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

            Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
            //alert("Deleted Successfully");
            
        }
    }
        ReBindGrid(SetupMasterIds.AssetsType ,0,"",0);
        setassetTypevalues("");
        
       
    }



    const handleSearchClick=async(e) =>{
        e.preventDefault();
       
        ReBindGrid(SetupMasterIds.AssetType,0,assetTypevalues,0);
      
    }

    const handleCancelClick=async(e) => {
        
         e.preventDefault();
       
        ReBindGrid(SetupMasterIds.AssetType,0,"",0);
        setassetTypevalues("");
      
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
      
        setassetTypeList(data.data);

    }
    const openNewmodal = (AssetTypeId) => {
        
        setassetTypeEditId(AssetTypeId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setassetTypeEditId(0);
        ReBindGrid(SetupMasterIds.AssetsType,0,"",0);
       
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
                                                <Label for="">Asset Type Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setassetTypevalues(AllowAlphabatic(e.target.value))}
                                                    name="assettypename"
                                                    maxLength="50"
                                                    autoComplete="off"
                                                    required={ true}
                                                    value={assetTypevalues}
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
                                        Asset Type List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ AssetTypeId: 0 })}>Add New</Button>
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
                                        {assetTypeList && assetTypeList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ AssetTypeId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ AssetTypeId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalAssetType {...props}
                        HeaderText="Add/Edit Asset Type"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        AssetTypeId={assetTypeEditId}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default AssetType