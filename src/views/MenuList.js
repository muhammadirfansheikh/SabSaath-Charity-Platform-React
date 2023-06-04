import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Label,
    Input
} from "reactstrap";
import { fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId } from '../utils/Constants.js'
import { AllowAlphabatic } from '../utils/CommonMethods'
import ModalMenu from '../components/modal/ModalMenu.js'
import Swal from "sweetalert2";
const MenuList = (props) => {

    const [menuList, setMenuList] = useState([]);
    const [parentMenuddl, setParentMenuddl] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [menuEditId, setMenuEditId] = useState(0);
    const initialValues = {
        MenuName: "",
        ParentId: '0'
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
  

        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
    
            _values = AllowAlphabatic(e.target.value);
        }






        setValues({
            ...values,
            [name]: _values,
        });

        //const { name, value } = e.target;
        //setValues({
        //  ...values,
        //  [name]: value,
        //});
    };

    async function GetMenus(MenuName, ParentId) {
        try {
       
            //var LoginRoleId=localStorage.getItem('RoleId');
            var RequestData = { OperationId: OperationTypeId.Select, MenuName: MenuName, ParentId: ParentId }
            const data = await fetchData(ControllerName.Security, ApiMethods.MenuItem_Operation, RequestData);
            if (data.data != null && data.data.length > 0) {
                setMenuList(data.data);
                return data.data;
            }
            else {
                setMenuList([]);
                Swal.fire({ title: 'Error', text: "No Data Found", icon: 'error' });
                //alert("No Data Found");
            }
        } catch (error) {
            // 
        }
        return null;
    }
    async function DeleteMenu(MenuId) {
        try {
            var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
            var RequestData = { OperationId: OperationTypeId.Delete, MenuId: MenuId, CreatedBy: UserId, UserIP: UserIp }
            const data = await fetchData(ControllerName.Security, ApiMethods.MenuItem_Operation, RequestData);
       
            if (data.data != null) {
                // alert("Deleted Successfully");
                if (data.data[0].HasError === 0) {
                    Swal.fire({ title: 'success', text: data.data[0].Message, icon: 'success' });
                    GetMenus("", 0);
                }
                else {
                    Swal.fire({ title: 'Error', text: data.data[0].Message, icon: 'error' });
                }
               
            }
            else {
                //alert("Error");
                Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon: 'error' });
            }
        } catch (error) {
            
        }
    }
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            var Result = await GetMenus("", 0);
            if (Result != null) {
                var newArray = Result.filter(function (el) {
                    return el.Parent_Id === null || el.Parent_Id === "null";
                });
                setParentMenuddl(newArray);
            }
        };
        load();
    }, []);

    const onEdit = ({ MenuId }) => {
        openNewmodal(MenuId);
    }

    const onDelete = ({ MenuId }) => {
        // console.log(MenuId);
        DeleteMenu(MenuId);
    }

    function handleSearchClick(e) {
        e.preventDefault();
        // console.log(values.ParentId);
        GetMenus(values.MenuName, values.ParentId);
    }

    function handleCancelClick(e) {
        e.preventDefault();
        setValues(initialValues);
        GetMenus("", 0);
    }
    const openNewmodal = (MenuId) => {
        setMenuEditId(MenuId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setMenuEditId(0);
        //GetUsers(0,"",0);
        GetMenus("", 0);
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                Search
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row form>
                                        <Col md={3}>
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
                                                        parentMenuddl.map((item, key) => (
                                                            <option key={item.MenuId} value={item.MenuId}>
                                                                {item.Menu_Name}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Menu</Label>
                                                <Input type="text" name="MenuName" isalphabetic="true" value={values.MenuName} className="form-control" onChange={handleInputChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-right">
                                            <Button color="primary" size="sm" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col lg={6} md={6}>
                                        User
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ MenuId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped responsive>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Parent Menu</th>
                                            <th>Sort Order</th>
                                            <th>Menu</th>
                                            <th>Is Displayed In Menu</th>
                                            <th>Features</th>
                                            <th>Created By</th>
                                            <th>Modified By</th>
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuList && menuList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.Parent}</td>
                                                <td>{item.SortOrder}</td>
                                                <td>{item.Menu_Name}</td>
                                                <td>{item.Is_Displayed_In_Menu ? "Yes" : "No"}</td>
                                                <td>{item.Features}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy == null ? "" : item.ModifiedBy + " " + (item.ModifiedDate == null ? "" : "on " + item.ModifiedDate)}</td>
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ MenuId: item.MenuId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ MenuId: item.MenuId })}><i className="nc-icon nc-simple-remove"></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    openModal &&
                    <ModalMenu {...props}
                        HeaderText="Add/Edit Menu"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        MenuId={menuEditId}
                        parentMenuddl={parentMenuddl}
                    />

                }
            </div>
        </>
    );
}

export default MenuList