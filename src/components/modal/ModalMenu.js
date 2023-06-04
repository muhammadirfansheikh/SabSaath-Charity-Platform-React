import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId } from '../../utils/Constants.js'
import { AllowAlphabatic } from '../../utils/CommonMethods'
import Swal from "sweetalert2";
export const ModalMenu = (props) => {

    const initialValues = {
        MenuName: "",
        ParentId: '0',
        MenuUrl: "",
        SortOrder: '',
        ParentMenuIcon: "",
        IsDisplayed: true
    };

    const [values, setValues] = useState(initialValues);
    const [checkList, setCheckList] = useState([]);

    const handleInputChange = (e) => { 
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        //const { name, value } = e.target;


        if (e.target.getAttribute("isalphabetic") === "true") { 
            value = AllowAlphabatic(e.target.value);
        }

        setValues({
            ...values,
            [e.target.name]: value,
        });
    };

    function toggle() {
        props.closeNewmodal();
    }
    async function GetMenu(MenuId) {
        try {
            //      
            //    console.log(MenuId);
            var RequestData = { OperationId: OperationTypeId.Select, MenuId: MenuId }
            const data = await fetchData(ControllerName.Security, ApiMethods.MenuItem_Operation, RequestData);
            if (data.response === true && data.data.length > 0) {
                initialValues.MenuName = data.data[0].Menu_Name;
                initialValues.ParentId = data.data[0].Parent_Id;
                initialValues.MenuUrl = data.data[0].Menu_URL;
                initialValues.SortOrder = data.data[0].SortOrder;
                setValues(initialValues);
            }
            else {
                //  setUserList([]);
            }
        } catch (error) {
            //    
        }
    }
    async function GetFeatures() {
        try {
            //     
            var RequestData = { OperationId: OperationTypeId.Select, MenuId: props.MenuId }
            const data = await fetchData(ControllerName.Security, ApiMethods.MenuItem_Feature_Get, RequestData);
            if (data.response === true && data.data.length > 0) {
                //      
                setCheckList(data.data);
            }
            else {
                //  setUserList([]);
            }
        } catch (error) {
            //     
        }
    }
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.MenuId > 0) {
                GetMenu(props.MenuId);
            }
        };
        load();
        GetFeatures();
    }, []);

    async function AddUpdateMenu(e) {
        try {
            e.preventDefault(); 
            var FeatureIds = "", DeletedFeatureIds = "";
            //console.log(checkList);
            checkList.map((item, key) => (
                item.IsChecked === true ? (FeatureIds += item.FeatureId + ",") : (DeletedFeatureIds += item.FeatureId + ",")
            ));
            FeatureIds = FeatureIds.substring(FeatureIds.length - 1, 0);
            DeletedFeatureIds = DeletedFeatureIds.length > 0 ? DeletedFeatureIds.substring(DeletedFeatureIds.length - 1, 0) : "";
            //console.log(FeatureIds);
            var MenuId = 0;
            MenuId = props.MenuId > 0 ? props.MenuId : 0;
            var OperationType = MenuId == 0 ? OperationTypeId.Insert : OperationTypeId.Update;
            var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
            var RequestData = { OperationId: OperationType, MenuId: MenuId, MenuName: values.MenuName, MenuURL: values.MenuUrl, ParentId: values.ParentId, IsDisplayed: values.IsDisplayed, SortOrder: values.SortOrder, FeatureIds: FeatureIds, DeletedFeatureIds: DeletedFeatureIds, CreatedBy: UserId, UserIP: UserIp }
            const data = await fetchData(ControllerName.Security, ApiMethods.MenuItem_Operation, RequestData);
            
            if (data.response === true && data.data != null) {
                if (data.data[0].HasError === 1) {
                    // alert(data.data[0].Message);
                    Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                }
                else {
                    //MenuId===0?alert("Added Successfully"):alert("Updated Successfully");;
                    MenuId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });
                    toggle();
                }
            }
            else {
                //alert("Error");
                Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });

            }
        } catch (error) {
            
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Parent Menu</Label>
                                <Input
                                    id="exampleSelect"
                                    name="ParentId"
                                    type="select"
                                    value={values.ParentId}
                                    onChange={handleInputChange}
                                >
                                    <option key={0} value={0}>
                                        Select
                                    </option>

                                    {
                                        props.parentMenuddl.map((item, key) => (
                                            <option key={item.MenuId} value={item.MenuId}>
                                                {item.Menu_Name}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>

                        </Col>
                        {/* <Col className="px-1" md="6">
                <FormGroup>
                    <Label for="">Parent Menu icon</Label>
                    <Input type="text" name="MenuName" value={values.MenuName} className="form-control" onChange={handleInputChange} />
                  </FormGroup>
                
              </Col>*/}

                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label for="">Menu</Label>
                                <Input type="text" name="MenuName" isalphabetic="true" value={values.MenuName} className="form-control" onChange={handleInputChange} />
                            </FormGroup>

                        </Col>

                    </Row>
                    <Row form>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label for="">Menu Url</Label>
                                <Input type="text" name="MenuUrl"  value={values.MenuUrl} className="form-control" onChange={handleInputChange} />
                            </FormGroup>

                        </Col>
                        <Col className="px-1" md="6">
                            <FormGroup>
                                <Label for="">Sort Order</Label>
                                <Input type="text" name="SortOrder" value={values.SortOrder} className="form-control" onChange={handleInputChange} />
                            </FormGroup>

                        </Col>
                    </Row>
                    <Row form>
                        <Col className="px-1" md="12">
                            <FormGroup check>
                                <Input type="checkbox" name="IsDisplayed" checked={values.IsDisplayed} className="form-control" onChange={handleInputChange} />
                                Display
                            </FormGroup>
                        </Col>
                    </Row>
                    <div>
                        <div className="checkbox" >
                            {checkList.map((item, key) => (

                                <label key={key}>
                                    <input
                                        // onChange={(e) => this.onChange(value, e.target.checked)} 
                                        type='checkbox'
                                        value={checkList[key].FeatureId}
                                        checked={checkList[key].IsChecked}
                                        onChange={(e) => {
                                            let checked = e.target.checked;
                                            setCheckList(checkList.map(data => {
                                                if (item.FeatureId === data.FeatureId) {
                                                    data.IsChecked = !item.IsChecked;
                                                }
                                                return data
                                            }))

                                        }}
                                    />
                                    {item.Feature}
                                </label>

                            ))}
                        </div>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={AddUpdateMenu}>Save</Button>
                <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>

    );
}

export default ModalMenu;