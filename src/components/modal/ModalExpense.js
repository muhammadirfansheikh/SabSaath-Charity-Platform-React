import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail ,AllowAlphabatic} from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalExpense = (props) => {



    const [expenseName, setexpenseName] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.ExpenseId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.ExpenseId);
                if ( data.response===true && data.data != null) {
               //    
                    setexpenseName(data.data[0].SetupDetailName)
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateExpense(e) {
        try {
            e.preventDefault();
            setFormLoading(true)
            if(expenseName != "")
            {
                var ExpenseId = 0;
                ExpenseId = props.ExpenseId > 0 ? props.ExpenseId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (ExpenseId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.Expense, 0, expenseName, "", "", "", UserId, UserIp);
                }
                else if (ExpenseId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.Expense, 0, ExpenseId, expenseName, "", "", "", UserId, UserIp);
                }
    
    
            
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                       // alert(data.data[0].Message);
                       Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        
                        props.ReBindGrid(SetupMasterIds.Expense, 0, "", 0);
                        //ExpenseId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                        ExpenseId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                        //toggle();

                        setexpenseName("");
                    }
                }
                else {
                    //alert("Error");
                    Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
                }
            }
            else
            {
                Swal.fire({ title: 'Error', text: "Enter Expense Name", icon:'error' });
            }
            setFormLoading(false)
        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateExpense}>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
               
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Expense Name</Label>
                                <Input
                                    placeholder="Expense Name"
                                    type="text"
                                    name="expensename"
                                    autoComplete="off"
                                    maxLength="50"
                                    required={true }
                                    //onChange={(e) => setexpenseName(e.target.value)}
                                    onChange={(e) => setexpenseName(AllowAlphabatic(e.target.value)) }
                                    value={expenseName}
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

export default ModalExpense;