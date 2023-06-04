import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalReferrer = (props) => {


    const [referrerName, setreferrerName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.ReferrerId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.ReferrerId);
                if ( data.response===true && data.data != null) {
           //        
                    setreferrerName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateReferrer(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(referrerName != "")
            {
                
                var ReferrerId = 0;
                ReferrerId = props.ReferrerId > 0 ? props.ReferrerId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (ReferrerId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.Referrer, 0, referrerName, "", "", "", UserId, UserIp);
                }
                else if (ReferrerId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.Referrer, 0, ReferrerId, referrerName, "", "", "", UserId, UserIp);
                }
    
    
            
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                       // alert(data.data[0].Message);
                       Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        props.ReBindGrid(SetupMasterIds.Referrer, 0, "", 0);
    
                        //ReferrerId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        ReferrerId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                        //toggle();

                        setreferrerName("");
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Enter Referrer Name.", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) {
   
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateReferrer}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Referrer Name</Label>
                                <Input
                                    placeholder="Referrer Name"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="50"
                                    required={ true}
                                    name="referrername"
                                    onChange={(e) => setreferrerName(AllowAlphabatic(e.target.value))}
                                    value={referrerName}
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

export default ModalReferrer;