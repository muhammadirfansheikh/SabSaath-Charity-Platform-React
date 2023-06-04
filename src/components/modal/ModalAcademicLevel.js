import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const ModalAcademicLevel = (props) => {


    const [academicLevelName, setacademicLevelName] = useState("");
    const [formLoading, setFormLoading] = useState(false);


    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.AcademicLevelId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.AcademicLevelId);
                if (data.response === true && data.data != null) {
                   
                    setacademicLevelName(data.data[0].SetupDetailName)
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

     function AddUpdateAcademicLevel(e) {
            e.preventDefault();
        try {
            
            setFormLoading(true)
            if (academicLevelName != "") {


                var AcademicLevelId = 0;
                AcademicLevelId = props.AcademicLevelId > 0 ? props.AcademicLevelId : 0;
                
                let msg;
                if (AcademicLevelId === 0)
                {
                    msg = "Are you sure to add the record?";
                }
                else
                {
                    msg = "Are you sure to edit the record?";
                }
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;

                Swal.fire({
                    customClass: {
                      container: "my-swal",
                    },
                    text: msg,
                    icon: "success",
                    showCancelButton: true,
                    cancelButtonText: `Cancel`,
                    cancelButtonColor: "#2f4050",
                    confirmButtonText: `Confirm`,
                    confirmButtonColor: "#bf1e2e",
                  }).then(async (result)  =>  {
                    if (result.isConfirmed)
                    {
                        if (AcademicLevelId === 0) ///Insert Operation
                        {
                            data = await  InsertSetupDetail(SetupMasterIds.AcademicLevel, 0, academicLevelName, "", "", "", UserId, UserIp)
              
                        }
                        else if (AcademicLevelId !== 0) {
                            data = await  UpdateSetupDetail(SetupMasterIds.AcademicLevel, 0, AcademicLevelId, academicLevelName, "", "", "", UserId, UserIp);
                            setacademicLevelName("");
                        } 
                 if (data.response == true && data.data != null) 
                 {
                    if (data.data[0].HasError === 1) 
                    {
                         //alert(data.data[0].Message);
                         Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                     }
                     else {

                         e.preventDefault();

                         props.ReBindGrid(SetupMasterIds.AcademicLevel, 0, "", 0);
                         // AcademicLevelId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                         AcademicLevelId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                         setacademicLevelName("");
                         //toggle();
                     }
                 }
                 else {
                     //alert("Error");
                     Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
                }
                    }
                  })
            }
            else {

                Swal.fire({ title: 'Error', text: "Enter Academic Level Name.", icon: 'error' });
            }
            setFormLoading(false);

        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateAcademicLevel}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Academic Level Name</Label>
                                <Input
                                    placeholder="Academic Level Name"
                                    type="text"
                                    name="academiclevelname"
                                    maxLength="50"
                                    autoComplete="off"
                                    onChange={(e) => setacademicLevelName(AllowAlphabatic(e.target.value))}
                                    value={academicLevelName}
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

export default ModalAcademicLevel;