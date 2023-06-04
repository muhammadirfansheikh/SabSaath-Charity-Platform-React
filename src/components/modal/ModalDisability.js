import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail , AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalDisability = (props) => {


    const [disabilityName, setdisabilityName] = useState("");
    const [formLoading, setFormLoading] = useState(false);


    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DisabilityId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.DisabilityId);
                if ( data.response===true && data.data != null) {
           //        
                    setdisabilityName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateDisability(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(disabilityName != "")
            {
                
                var DisabilityId = 0;
                DisabilityId = props.DisabilityId > 0 ? props.DisabilityId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (DisabilityId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.Disability, 0, disabilityName, "", "", "", UserId, UserIp);
                }
                else if (DisabilityId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.Disability, 0, DisabilityId, disabilityName, "", "", "", UserId, UserIp);
                }
    
    
          //      
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                       // alert(data.data[0].Message);
                       Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        props.ReBindGrid(SetupMasterIds.Disability, 0, "", 0);
    
                       // DisabilityId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        DisabilityId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                        setdisabilityName("");
                        //toggle();
                    }
                }
                else {
                   // alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Enter Disabiltiy Name.", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateDisability}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Disability Name</Label>
                                <Input
                                    placeholder="Disability Name"
                                    type="text"
                                    maxLength="50"
                                    autoComplete="off"
                                    name="disabilityname"
                                    required={true}
                                    
                                   // onChange={(e) => setdisabilityName(e.target.value)}
                                    onChange={(e) => setdisabilityName(AllowAlphabatic(e.target.value)) }
                                    value={disabilityName}
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

export default ModalDisability;