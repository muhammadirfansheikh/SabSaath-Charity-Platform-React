import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'


export const ModalAssetType = (props) => {


    const [assetTypeName, setassetTypeName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.AssetTypeId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.AssetTypeId);
                if ( data.response===true && data.data != null) {
                 
                    setassetTypeName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateAssetType(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(assetTypeName != "")
            {
                
                var AssetTypeId = 0;
                AssetTypeId = props.AssetTypeId > 0 ? props.AssetTypeId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (AssetTypeId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.AssetsType, 0, assetTypeName, "", "", "", UserId, UserIp);
                }
                else if (AssetTypeId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.AssetsType, 0, AssetTypeId, assetTypeName, "", "", "", UserId, UserIp);
                } 
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        props.ReBindGrid(SetupMasterIds.AssetsType, 0, "", 0);
                      // AssetTypeId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        AssetTypeId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setassetTypeName("");
                        //toggle();
                    }
                }
                else {
                   // alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
    
                }
            }
            else{
                Swal.fire({ title: 'Error', text: "Enter Asset Type Name.", icon:'error' });
            }
            setFormLoading(false);
        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateAssetType}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Asset Type Name</Label>
                                <Input
                                    placeholder="Asset Type"
                                    type="text"
                                    name="assettypename"
                                    maxLength="50"
                                    autoComplete="off"
                                    onChange={(e) => setassetTypeName(AllowAlphabatic(e.target.value))}
                                    value={assetTypeName}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                
            </ModalBody>
            <ModalFooter>
                    <FormGroupButton
                        title='Save'
                        type='submit'
                        loading={formLoading}
                    />
                <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
                </ModalFooter>
                </form>
        </Modal>

    );
}

export default ModalAssetType;