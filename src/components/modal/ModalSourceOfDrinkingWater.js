import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic  } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalSourceOfDrinkingWater = (props) => {


    const [sourceofdrinkingName, setsourceofdrinkingName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.SourceOfDrinkingId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.SourceOfDrinkingId);
                if (data.response === true && data.data != null) {
                    //          
                    setsourceofdrinkingName(data.data[0].SetupDetailName)
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

    async function AddUpdateSourceOfDrinkingWater(e) {
        try {
            e.preventDefault();
            //       
            setFormLoading(true)
            if (sourceofdrinkingName != "") {
                var SourceOfDrinkingId = 0;
                SourceOfDrinkingId = props.SourceOfDrinkingId > 0 ? props.SourceOfDrinkingId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (SourceOfDrinkingId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.SourceOfDrinking, 0, sourceofdrinkingName, "", "", "", UserId, UserIp);
                }
                else if (SourceOfDrinkingId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.SourceOfDrinking, 0, SourceOfDrinkingId, sourceofdrinkingName, "", "", "", UserId, UserIp);
                }


                //       
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //  alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();

                       props.ReBindGrid(SetupMasterIds.SourceOfDrinking, 0, "", 0);
                        // SourceOfDrinkingId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        SourceOfDrinkingId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                        // toggle();
                        setsourceofdrinkingName("");
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });

                }
            }
            else {
                Swal.fire({ title: 'Error', text: "Enter Source Of Drinking Name.", icon: 'error' });
            }
            setFormLoading(false)
        } catch (error) {
          
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle}>
            <form onSubmit={AddUpdateSourceOfDrinkingWater}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>

                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Source Of Drinking Water Name</Label>
                                <Input
                                    placeholder="Source Of Drinking Water Name"
                                    type="text"
                                    required={ true}
                                    name="sourceofdrinkingwatername"
                                    maxLength="50"
                                    autoComplete="off"
                                    onChange={(e) => setsourceofdrinkingName(AllowAlphabatic(e.target.value))}
                                    value={sourceofdrinkingName}
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

export default ModalSourceOfDrinkingWater;