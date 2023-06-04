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
import ModalFundCategory from '../components/modal/ModalFundCategory_bkp.js'
import Swal from "sweetalert2";
 

const FundCategory = (props) => {
const initialValues = {
    categoryId: '0',
    fundCategory: ""
  };
  const [values, setValues] = useState(initialValues);
  const [fundCategoryList, setFundCategoryList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fundCategoryEditId, setFundCategoryEditId] = useState(0);
   const [categoryddl, setCategoryddl] = useState([]);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function GetFundCategory(FundCategoryName, CategoryId) {
    try {
    
      var RequestData = {OperationId:OperationTypeId.Select, CategoryId: CategoryId, FundCategoryName:FundCategoryName}
      const data = await fetchData(ControllerName.Setup,ApiMethods.FundCategory_Operation, RequestData);
      
      if(data!=null)
      {
        if (data.response===true && data.data != null) {
          setFundCategoryList(data.data);
        } 
        else {
          setFundCategoryList([]);
        }
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"Error", icon:'Error' });
        
        }
    } catch (error) {
      
    }
  }
 
 async function DeleteFundCategory(FundCategoryId) {
    try {
      
     var UserId=localStorage.getItem('UserId');
      var UserIp=localStorage.getItem('UserIP');
      var RequestData = {OperationId:OperationTypeId.Delete, FundCategoryId: FundCategoryId, CreatedBy:UserId,UserIP:UserIp }
      const data = await fetchData(ControllerName.Setup,ApiMethods.FundCategory_Operation, RequestData);
      if (data.response===true && data.data != null) {
       // alert("Deleted Successfully");
       Swal.fire({ title: 'Success', text:"Deleted Successfully", icon:'success' });
        GetFundCategory("", 0);
      }
      else {
       // alert("Error");
       Swal.fire({ title: 'Error', text:"Some thing went wrong", icon:'error' });
      }
    } catch (error) {
      
    }
  }
  React.useEffect(() => {
  
    // need to define the function and call it separately
    const load = async () => {
      GetFundCategory("", 0);
    };
    const loadCategory = async () => {
     var RequestData = {OperationId:OperationTypeId.Select }
      const data = await fetchData(ControllerName.Setup,ApiMethods.Category_Operation, RequestData);
      
       setCategoryddl(data.data);

     
    };
    load();
    loadCategory();
  }, []);

  const onEdit = ({ FundCategoryId }) => {
    
    openNewmodal(FundCategoryId);
  }

  const onDelete = ({ FundCategoryId }) => {
    console.log(FundCategoryId);
    DeleteFundCategory(FundCategoryId);
  }

  function handleSearchClick(e) {
    e.preventDefault();
    GetFundCategory(values.fundCategory, values.categoryId);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setValues(initialValues);
    GetFundCategory("", 0);
  }
  const openNewmodal = (FundCategoryId) => {
    setFundCategoryEditId(FundCategoryId);
    setOpenModal(true);
  }
  const closeNewmodal = () => {
    setOpenModal(false);
    setFundCategoryEditId(0);
    //GetUsers(0,"",0);
    GetFundCategory("", 0);
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
                        <Label for="">Fund Category Name</Label>
                        <Input
                          type="text"
                          onChange={handleInputChange}
                          name="fundCategory"
                          value={values.fundCategory}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="">Category</Label>
                           <Input
                          id="exampleSelect"
                          name="categoryId"
                          type="select"
                          value={values.categoryId}
                          onChange={handleInputChange}>
                         <option key={0} value={0}>Select</option>
                          {
                            categoryddl.map((item, key) => (
                              <option key={item.CategoryId} value={item.CategoryId}>
                                {item.Category}
                              </option>
                            ))
                          }  
                            </Input>
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
                   Company Family List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" onClick={() => openNewmodal({ FundCategoryId: 0 })}>Add New</Button>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Category</th>
                       <th>Fund Category</th>
                      <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundCategoryList && fundCategoryList.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.Category}</td>
                         <td>{item.FundCategory}</td>
                        <td>{item.IsActive?"Yes":"No"}</td>
                        <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                        <td>{item.ModifiedBy +" " + (item.ModifiedDate==null?"":"on "+item.ModifiedDate)}</td>
                        <td>
                          <Button color="primary" outline size="sm" onClick={(e) => onEdit({ FundCategoryId: item.FundCategoryId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                          <Button color="danger" outline size="sm" onClick={() => onDelete({ FundCategoryId: item.FundCategoryId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <ModalFundCategory {...props}
            HeaderText="Add/Edit Fund Category"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            FundCategoryId={fundCategoryEditId}
            categoryddl={categoryddl}
          />

        }
      </div>

    </>
  );
}

export default FundCategory