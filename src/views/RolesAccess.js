import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Label,
    Input, Table
} from "reactstrap";
import React, { useState } from 'react';
//import CheckboxTree from 'react-checkbox-tree';
import 'font-awesome/css/font-awesome.min.css';
//import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId } from '../utils/Constants.js'
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import ReactDOM from 'react-dom'
import Swal from "sweetalert2";
import '../assets/css/newdropdown-tree-select.css';


const RolesAccess = () => {
    const initialValues = {
        RoleName: '0'
    };
    const [menuList, setMenuList] = useState([]);
    const [UserRoleList, setUserRoleList] = useState([]);
    const [UserRoleID, setUserRoleID] = useState([]);
    const [values, setValues] = useState(initialValues);

    const [getRoleid, setreoleid] = useState([]);

    var UserId = localStorage.getItem('UserId');
    var UserIp = localStorage.getItem('UserIP');


    var checkedNodes = [];
    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        setreoleid(value);
        GetNodes(value);

    };



    const onChange = (currentNode) => {
        const state = {

            menuItemFeatureId: currentNode.menuItemFeatureId,
            roleId: getRoleid,
            menuItemId: currentNode.menuItemId,
            featureId: currentNode.featureId,
            createdBy: UserId,
            // modifiedBy: storedNames.modifiedBy,
            checked: currentNode.checked,
            userIp: UserIp
        }

      //  console.log(currentNode);
        if (currentNode.checked === true) {
            checkedNodes.push(state);
        }
        else {
            checkedNodes.push(state);
        }
    }

    async function GetNodes(value) {
        try {
        
            var RequestData = { OperationId: 1, RoleId: value }
            const GetNodes = await fetchData(ControllerName.Security, "GetMenuItemByRoleIdDataDapper", RequestData);
            // , {
            //     headers: {
            //         'access-control-allow-origin': '*',
            //     }
            // });
            if (GetNodes.data != null) {
                //console.log(GetNodes.data);
                setMenuList(GetNodes.data);
            }
            else {
                setMenuList([]);
            }
            //.then(response => 
            // {
            //   setMenuList(response.data.data); 
            // })
            //.catch(error =>{
            // const errorMsg = error.message

            //})
        }
        catch (error) {
       
        }
        return GetNodes.data;
    }



    async function GetUserRoles(MenuName, ParentId) {
        try {
            
            var RequestData = { OperationId: OperationTypeId.Select, MenuName: MenuName, ParentId: ParentId }
            const data = await fetchData(ControllerName.Security, "User_Roles_Get", RequestData);
            if (data.data != null && data.data.length > 0) {
                setUserRoleList(data.data);
                return data.data;
            }
            else {
                setUserRoleList([]);
                 Swal.fire({ title: 'No Data Found', text: data.responseMessage, icon:'No Data Found' });
            }
        }
        catch (error) {
        //    
        }
        return null;
    }


    async function Submit_Role_Menues(RoleId) {
        try {
          
            const data = await fetchData(ControllerName.Security, "CreateRoleMenuItemService", checkedNodes);
            if (data == "") {
                setUserRoleList([]);
                Swal.fire({ title: 'No Data Found', text: "", icon:'No Data Found' });
                
                //return data.data;
            }
            else {
               // setUserRoleList(data.data);
                GetNodes(getRoleid);
                Swal.fire({ title: 'Record Successfully Save', text: data.responseMessage, icon:'success' });

                
            }

        }
        catch (error) {
        
        }
        return null;
    }


    React.useEffect(() => {
        // need to define the function and call it separately
        const load = async () => {
            var Result = await GetUserRoles("", 0);
            if (Result != null) {
                setUserRoleID(Result);
            }
        };
        load();
    }, []);

    return (
        <div className="content">
            <Row>
                <Col lg={12} md={12}>
                    <Card className="card-user">
                        <CardBody>
                            <Form>
                                <Row form>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="">Role</Label>
                                            <Input
                                                id="exampleSelect"
                                                name="RoleName"
                                                type="select"
                                                value={values.RoleId}
                                                onChange={handleInputChange}
                                            >
                                                <option key={0} value={0}>
                                                    Select
                                                </option>
                                                {
                                                    UserRoleID.map((item, key) => (
                                                        <option key={item.RoleId} value={item.RoleId}>
                                                            {item.RoleName}
                                                        </option>
                                                    ))
                                                }
                                            </Input>

                                        </FormGroup>
                                      
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                         
                            <DropdownTreeSelect
                                data={menuList}
                                onChange={onChange}
                                ShowDropdownState='initial'
                                
                                
                            />
                            </Col>
                            </Row>
                            <Row form className="text-right">
                                    <Col md={12}>
                                        <Button size="sm" onClick={e => Submit_Role_Menues(e)}>Save</Button>
</Col>
</Row>
</Form>
                            {
                                // <Table bordered striped>
                                //       <thead>
                                //         <tr>
                                //           {menuFeatures && menuFeatures.map((item,key)=>(
                                //               <th>{item.Feature}</th>
                                //             ))
                                //           }
                                //         </tr>
                                //       </thead>
                                //       <tbody>
                                //         {menuFeatures && menuFeatures.map((item,key)=>(
                                //               <tr>
                                //               <td>{item.Feature}</td>
                                //               </tr>
                                //             ))
                                //           }
                                //       </tbody>
                                //     </Table>
                            }              </CardBody>
                    </Card>
                </Col>
            </Row>



        </div>
    )
}

export default RolesAccess












