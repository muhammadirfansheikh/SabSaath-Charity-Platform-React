import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId } from '../../utils/Constants.js'
import { AllowAlphabatic } from '../../utils/CommonMethods'

import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalSetupUser = (props) => {

    const initialValues = {
        userName: "",
        rolevalues: '0',
        emailAddress: ""

    };
    const [values, setValues] = useState(initialValues);
    const [userName, setUserName] = useState("");
    const [rolevalues, setRolevalues] = useState('0');
    const [emailAddress, setEmailAddress] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const [chkIsActive, setChkIsActive] = useState(false);


    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setValues({
    //     ...values,
    //     [name]: value,
    //   });
    // };

    function toggle() {

        props.closeNewmodal();
    }
    async function GetUsers(RoleId, UserName, UserId) {
        try {

            var RequestData = { OperationTypeId: OperationTypeId.Select, RoleId: RoleId, Name: UserName, UserId: UserId }
            const data = await fetchData(ControllerName.User, ApiMethods.CrudUser, RequestData);
            if (data.response === true && data.data.length > 0) {
                //    
                // initialValues.rolevalues = data.data[0].RoleId;
                // initialValues.userName = data.data[0].Name;
                // initialValues.emailAddress = data.data[0].EmailAddress;
                //  setValues(initialValues);
                
                setRolevalues(data.data[0].RoleId);
                setUserName(data.data[0].Name);
                setEmailAddress(data.data[0].EmailAddress);

                // console.log(initialValues); 
            }

        } catch (error) {
            //     
        }
    }
    React.useEffect(() => {
        // need to define the function and call it separately
        const load = async () => {
            if (props.UserId > 0) {
                GetUsers(0, "", props.UserId);
            }
        };
        load();
    }, []);

    async function AddUpdateUser(e) {
        try {
            e.preventDefault();
            setFormLoading(true);
            var UserId = 0;
            UserId = props.UserId > 0 ? props.UserId : 0;
            var OperationType = UserId === 0 ? OperationTypeId.Insert : OperationTypeId.Update;
            var LoginUserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
            var RequestData = { OperationTypeId: OperationType, Name: userName, RoleId: rolevalues, EmailAddress: emailAddress, UserId: UserId, CreatedBy: LoginUserId, UserIP: UserIp }
            const data = await fetchData(ControllerName.User, ApiMethods.CrudUser, RequestData);

            if (data.response === true) {
                if (data.responseCodes == "00") {
                    Swal.fire({ title: 'Success', text: data.responseMessage, icon: 'success' });

                    props.resetElementList();
                }
                else {
                    Swal.fire({ title: 'Error', text: data.responseMessage, icon: 'error' });
                }

                toggle();
            }
            else {
                // alert("Error");
                Swal.fire({ title: 'Error', text: data.responseMessage, icon: 'error' });
            }

            setFormLoading(false);
        } catch (error) {
            //    
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateUser}>
                <ModalHeader
                    toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>
                    <Row form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>User Name</Label>
                                    <Input
                                        placeholder="User Name"
                                        type="text"
                                        name="userName"
                                        value={userName}
                                        autoComplete="off"
                                        required={true}
                                        onChange={(e) => setUserName(AllowAlphabatic(e.target.value))}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Email Address</Label>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="off"
                                        name="emailAddress"
                                        required={true}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        value={emailAddress}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Roles</Label>
                                    <Input
                                        name="rolevalues"
                                        type="select"
                                        value={rolevalues}
                                        onChange={(e) => setRolevalues(e.target.value)}
                                    >
                                        <option key={0} value={0}>
                                            Select
                                        </option>
                                        {

                                            props.roleddl.map((item, key) => (
                                                <option key={item.RoleId} value={item.RoleId}>
                                                    {item.RoleName}
                                                </option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

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

export default ModalSetupUser;