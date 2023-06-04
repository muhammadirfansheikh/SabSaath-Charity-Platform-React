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
import { ApiMethods,ControllerName,OperationTypeId } from '../utils/Constants.js'
import ModalCategory from '../components/modal/ModalCategory_bkp.js'
import Swal from "sweetalert2";
 

const Category = (props) => {

  const [categoryList, setCategoryList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState(0);
  const [categoryvalues, setCategoryvalues] = useState("");

  async function GetCategory(CategoryName, CategoryId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, CategoryId: CategoryId, CategoryName:CategoryName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.Category_Operation, RequestData);
  
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setCategoryList(data.data);
        } 
        else {
          setCategoryList([]);
        }
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"same thing went wrong", icon:'error' });
  //      
        }
    } catch (error) {
  //    
    }
  }
 async function DeleteCategory(CategoryId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, CategoryId: CategoryId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Category_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
        GetCategory("", 0);
      }
      else {
        //alert("Error");
        Swal.fire({ title: 'Error', text:"same thing went wrong", icon:'error' });
      }
    } catch (error) {
 //     
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetCategory("", 0);
    };
    load();
  }, []);

  const onEdit = ({ CategoryId }) => {
    openNewmodal(CategoryId);
  }

  const onDelete = ({ CategoryId }) => {
  //  console.log(CategoryId);
    DeleteCategory(CategoryId);
  }

  function handleSearchClick(e) {
    e.preventDefault(); 
    GetCategory(categoryvalues, 0);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setCategoryvalues("");
    GetCategory("", 0);
  }
  const openNewmodal = (CategoryId) => {
    setCategoryEditId(CategoryId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setCategoryEditId(0);
    //GetUsers(0,"",0);
    GetCategory(null, 0);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="">Category Name</Label>
                        <Input
                          type="text"
                          onChange={(e) => setCategoryvalues(e.target.value)}
                          name="categoryName"
                          value={categoryvalues}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12} className="text-right">
                      <Button color="primary" className="mr-2" onClick={handleSearchClick}>Search</Button>
                      <Button color="secondary" onClick={handleCancelClick}>Cancel</Button>
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
                    User List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ CategoryId: 0 })}>Add New</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Category</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList && categoryList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Category}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ CategoryId: item.CategoryId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ CategoryId: item.CategoryId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalCategory {...props}
            HeaderText="Add/Edit Category"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            CategoryId={categoryEditId}
          />

        }
      </div>

    </>
  );
}

export default Category