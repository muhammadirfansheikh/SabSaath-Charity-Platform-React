import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'

export const ModalDegree = (props) => {


    const [degreeName, setdegreeName] = useState("");
    const [formLoading, setFormLoading] = useState(false);


    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.DegreeId > 0) {

                var data = await GetSetupMaster(0, 0, "", props.DegreeId);
                if (data.response === true && data.data != null) {
                    // 
                    setdegreeName(data.data[0].SetupDetailName)
                }
                else {
                    //  setUserList([]);
                }
            }
        };

        load();


    }, []);

    async function AddUpdateDegree(e) {
            e.preventDefault();
        try { 
            setFormLoading(true)
            if (degreeName != "") {


                var DegreeId = 0;
                DegreeId = props.DegreeId > 0 ? props.DegreeId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;



                if (DegreeId === 0) ///Insert Operation
                {
                    data = await InsertSetupDetail(SetupMasterIds.Degree, 0, degreeName, "", "", "", UserId, UserIp);
                }
                else if (DegreeId !== 0) {
                    data = await UpdateSetupDetail(SetupMasterIds.Degree, 0, DegreeId, degreeName, "", "", "", UserId, UserIp);
                }


                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                    }
                    else {

                        e.preventDefault();

                        props.ReBindGrid(SetupMasterIds.Degree, 0, "", 0);
                        // DegreeId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        DegreeId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                        setdegreeName("");
                        //toggle();
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });

                }
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
            <form onSubmit={AddUpdateDegree}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Degree Name</Label>
                                <Input
                                    placeholder="Degree Name"
                                    type="text"
                                    name="degreename"
                                    maxLength="50"
                                    autoComplete="off"
                                    onChange={(e) => setdegreeName(AllowAlphabatic(e.target.value))}
                                    value={degreeName}
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

export default ModalDegree;