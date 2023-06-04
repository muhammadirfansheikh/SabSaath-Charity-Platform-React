import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail ,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalHomeApplaince = (props) => {


    const [homeApplainceName, sethomeApplainceName] = useState("");
    const [homeApplainceDescription, sethomeApplainceDescription] = useState("");
    const [formLoading, setFormLoading] = useState(false);



    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.HomeApplainceId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.HomeApplainceId);
                if ( data.response===true && data.data != null) {
           //        
                    sethomeApplainceName(data.data[0].SetupDetailName);
                    sethomeApplainceDescription(data.data[0].Flex1);
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateHomeApplaince(e) {
        try {
         
            e.preventDefault();
       //     
            setFormLoading(true)

       if(homeApplainceName != "")
       {
        var HomeApplainceId = 0;
        HomeApplainceId = props.HomeApplainceId > 0 ? props.HomeApplainceId : 0;
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        let RequestData;
        let data;

         

        if (HomeApplainceId === 0) ///Insert Operation
        {
            data=await InsertSetupDetail(SetupMasterIds.HomeApplaince, 0, homeApplainceName,homeApplainceDescription, "", "", UserId, UserIp);
        }
        else if (HomeApplainceId !== 0) {
           data=await UpdateSetupDetail(SetupMasterIds.HomeApplaince, 0, HomeApplainceId, homeApplainceName, homeApplainceDescription, "", "", UserId, UserIp);
        }


//        
        if (data.response === true && data.data != null) {
            if (data.data[0].HasError === 1) {
               // alert(data.data[0].Message);
               Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });

            }
            else {

                e.preventDefault();
                
                props.ReBindGrid(SetupMasterIds.HomeApplaince, 0, "", 0);
               // HomeApplainceId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                HomeApplainceId === 0 ? Swal.fire({ title: 'Success', text: data.data[0].Message, icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                sethomeApplainceName("");
                sethomeApplainceDescription("");
               //toggle();
            }
        }
        else {
            //alert("Error");
            Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
        }
       }
       else
       {
        Swal.fire({ title: 'Error', text: "Enter Home Appliance Name.", icon:'error' });
       }
            setFormLoading(false)
        } catch (error) {
   
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateHomeApplaince }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Home Appliance Name</Label>
                                <Input
                                    placeholder="Home Appliance Name"
                                    type="text"
                                    maxLength="50"
                                    autoComplete="off"
                                    name="homeapplaincename"
                                    required={true}
                                    //onChange={(e) => sethomeApplainceName(e.target.value)}
                                    onChange={(e) => sethomeApplainceName(AllowAlphabatic(e.target.value)) }
                                    value={homeApplainceName}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Home Appliance Description</Label>
                                <Input
                                    placeholder="Home Appliance Description"
                                    type="text"
                                    maxLength="100"
                                    autoComplete="off"
                                    name="homeapplaincedescription"
                                    onChange={(e) => sethomeApplainceDescription(e.target.value)}
                                    value={homeApplainceDescription}
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

export default ModalHomeApplaince;