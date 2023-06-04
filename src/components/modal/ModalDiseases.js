import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail ,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalDiseases = (props) => {


    const [diseasesName, setdiseasesName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DiseasesId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.DiseasesId);
                if ( data.response===true && data.data != null) {
     //              
                    setdiseasesName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateDiseases(e) {
        try {
            e.preventDefault();
            
            setFormLoading(true)
            if(diseasesName != "")
            {

                var DiseasesId = 0;
                DiseasesId = props.DiseasesId > 0 ? props.DiseasesId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (DiseasesId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.Diseases, 0, diseasesName, "", "", "", UserId, UserIp);
                }
                else if (DiseasesId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.Diseases, 0, DiseasesId, diseasesName, "", "", "", UserId, UserIp);
                }
    
    
         //       
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
                        
                        e.preventDefault();
                        
                        props.ReBindGrid(SetupMasterIds.Diseases, 0, "", 0);
                       // DiseasesId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        DiseasesId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setdiseasesName("");
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
                Swal.fire({ title: 'Error', text: "Enter Disease Name.", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateDiseases }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
              
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Disease Name</Label>
                                <Input
                                    placeholder="Disease Name"
                                    type="text"
                                    name="diseasesname"
                                    maxLength="50"
                                    autoComplete="off"
                                    required={ true}
                                   // onChange={(e) => setdiseasesName(e.target.value)}
                                    onChange={(e) => setdiseasesName(AllowAlphabatic(e.target.value)) }
                                    value={diseasesName}
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

export default ModalDiseases;