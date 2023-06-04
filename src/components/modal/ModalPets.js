import React, { useState } from "react";
import {
    Row,
    Col,
    Form,
    Label,
    Input,
    FormGroup,
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { fetchData } from "../../utils/Api.js";
import {
    GetSetupMaster,
    InsertSetupDetail,
    UpdateSetupDetail,
    AllowAlphabatic
} from "../../utils/CommonMethods.js";
import {
    ApiMethods,
    ControllerName,
    OperationTypeId,
    SetupMasterIds,
} from "../../utils/Constants.js";
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalPets = (props) => {
    const [petsName, setpetsName] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    function toggle() {
        props.closeNewmodal();
    }

    React.useEffect(() => {
        // need to define the function and call it separately
        const load = async () => {
            if (props.PetsId > 0) {
                var data = await GetSetupMaster(0, 0, "", props.PetsId);
                if (data.response === true && data.data != null) {
                    //       
                    setpetsName(data.data[0].SetupDetailName);
                } else {
                    //  setUserList([]);
                }
            }
        };

        load();
    }, []);

    async function AddUpdatePets(e) {
        try {
            e.preventDefault();

            if (petsName != "") {
                var PetsId = 0;
                PetsId = props.PetsId > 0 ? props.PetsId : 0;
                var UserId = localStorage.getItem("UserId");
                var UserIp = localStorage.getItem("UserIP");
                let RequestData;
                let data;

                if (PetsId === 0) {
                    ///Insert Operation
                    data = await InsertSetupDetail(
                        SetupMasterIds.Pets,
                        0,
                        petsName,
                        "",
                        "",
                        "",
                        UserId,
                        UserIp
                    );
                } else if (PetsId !== 0) {
                    data = await UpdateSetupDetail(
                        SetupMasterIds.Pets,
                        0,
                        PetsId,
                        petsName,
                        "",
                        "",
                        "",
                        UserId,
                        UserIp
                    );
                }

               
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                        //alert(data.data[0].Message);
                        Swal.fire({
                            title: "Error",
                            text: data.data[0].Message,
                            icon: "error",
                        });
                    } else {
                        e.preventDefault();
                       props.ReBindGrid(SetupMasterIds.Pets, 0, "", 0);
                        //PetsId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        PetsId === 0
                            ? Swal.fire({
                                title: "Success",
                                text: data.data[0].Message,
                                icon: "success",
                            })
                            : Swal.fire({
                                title: "Success",
                                text: "Updated Successfully",
                                icon: "success",
                            });
                        //toggle();

                        setpetsName("");
                    }
                } else {
                    //  alert("Error");
                    Swal.fire({
                        title: "Error",
                        text: "Some Thing Went Wrong",
                        icon: "error",
                    });
                }
            } else {
                Swal.fire({ title: "Error", text: "Enter Pet Name.", icon: "error" });
            }
        } catch (error) {
            //      
        }
    }
    return (
        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdatePets}>
                <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
                <ModalBody>

                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Pet Name</Label>
                                <Input
                                    placeholder="Pet Name"
                                    type="text"
                                    required={true }
                                    name="petsname"
                                    autoComplete="off"
                                    maxLength="50"
                                    onChange={(e) => setpetsName(AllowAlphabatic(e.target.value))}
                                    value={petsName}
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
                    <Button color="secondary" size="sm" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default ModalPets;
