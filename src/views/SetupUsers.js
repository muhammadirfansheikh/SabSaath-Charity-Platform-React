import React, { useState } from "react"
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
  Input,
} from "reactstrap"
import { fetchData } from "../utils/Api.js"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
} from "../utils/Constants.js"
import ModalSetupUser from "../components/modal/ModalSetupUser.js"
import Swal from "sweetalert2"

const SetupUsers = (props) => {
  const [userList, setUserList] = useState([])
  const [roleddl, setRoleddl] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [userEditId, setuserEditId] = useState(0)

  const [searchIsActive, setsearchIsActive] = useState(2)

  const initialValues = {
    userName: "",
    searchRoleValue: "0",
  }

  const [values, setValues] = useState(initialValues)

  async function GetUsers(RoleId, UserName, UserId) {
    try {
      var RequestData = {
        OperationTypeId: OperationTypeId.Select,
        RoleId: RoleId,
        Name: UserName,
        UserId: UserId,
      }
      const data = await fetchData(
        ControllerName.User,
        ApiMethods.CrudUser,
        RequestData
      )

      if (data.response === true && data.data != null) {
        setUserList(data.data)
      } else {
        setUserList([])
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      GetUsers(0, "", 0)
    }
    const loadRole = async () => {
      var LoginRoleId = localStorage.getItem("RoleId")
      var RequestData = {
        OperationId: OperationTypeId.Select,
        RoleId: 0,
        RoleName: "",
        LoginRoleId: LoginRoleId,
      }
      const data = await fetchData(
        ControllerName.Security,
        ApiMethods.UserRole_Operation,
        RequestData
      )

      setRoleddl(data.data)
    }
    load()
    loadRole() //calling
  }, [])

  const onEdit = ({ UserId }) => {
    openNewmodal(UserId)
  }

  const onDelete = async ({ UserId }) => {
    try {
      var UserIds = localStorage.getItem("UserId")
      var UserIp = localStorage.getItem("UserIP")
      var RequestData = {
        OperationTypeId: OperationTypeId.Delete,
        UserId: UserId,
        CreatedBy: UserIds,
        UserIP: UserIp,
      }
      const data = await fetchData(
        ControllerName.User,
        ApiMethods.CrudUser,
        RequestData
      )
      if (data.response === true && data.data != null) {
        resetelements()
        Swal.fire({
          title: "success",
          text: data.responseMessage,
          icon: "success",
        })
      } else {
        // alert("Error");
        Swal.fire({ title: "Error", text: data.responseMessage, icon: "error" })
      }
    } catch (error) {
      //
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  function handleSearchClick(e) {
    e.preventDefault()
    //  console.log(values.searchRoleValue);
    GetUsers(values.searchRoleValue, values.userName, 0)
  }

  function resetelements() {
    setValues(initialValues)

    setsearchIsActive(2)

    GetUsers(0, "", 0)
  }
  function handleCancelClick(e) {
    e.preventDefault()
    //  console.log(initialValues);
    // setValues({searchRoleValue:0})
    resetelements()
  }
  const openNewmodal = (UserId) => {
    setuserEditId(UserId)
    setOpenModal(true)
  }
  const closeNewmodal = () => {
    setOpenModal(false)
    setuserEditId(0)
    GetUsers(0, "", 0)
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
                        <Label for="">User Name</Label>
                        <Input
                          placeholder="User Name"
                          type="text"
                          onChange={handleInputChange}
                          name="userName"
                          value={values.userName}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label>Roles</Label>
                        <Input
                          id="exampleSelect"
                          name="searchRoleValue"
                          type="select"
                          value={values.searchRoleValue}
                          onChange={handleInputChange}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>

                          {roleddl.map((item, key) => (
                            <option key={item.RoleId} value={item.RoleId}>
                              {item.RoleName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        className="mr-2"
                        onClick={handleSearchClick}
                      >
                        Search
                      </Button>
                      <Button color="secondary" onClick={handleCancelClick}>
                        Cancel
                      </Button>
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
                    <Button
                      color="primary2"
                      className="m-0"
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => openNewmodal({ UserId: 0 })}
                    >
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Role</th>
                      <th>User Name</th>

                      <th>Email Address</th>

                      {/* <th>Active</th>
                      <th>CreatedBy</th>
                      <th>Last Modified By</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList &&
                      userList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.Role}</td>
                          <td>{item.Name}</td>
                          <td>{item.EmailAddress}</td>

                          {/* <td>{item.Active}</td>
                        <td>{(item.CreatedBy == null ? 'Not Provided': item.CreatedBy) + ' on ' + item.CreatedDate}</td>
                        <td>{(item.ModifiedBy == null ? 'Not Provided': item.ModifiedBy) + ' on ' + item.CreatedDate}</td> */}
                          <td>
                            <Button
                              color="primary"
                              outline
                              size="sm"
                              onClick={() => onEdit({ UserId: item.UserId })}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            <Button
                              color="danger"
                              outline
                              size="sm"
                              onClick={() => onDelete({ UserId: item.UserId })}
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openModal && (
          <ModalSetupUser
            {...props}
            HeaderText="Add/Edit Users"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            UserId={userEditId}
            roleddl={roleddl}
            resetElementList={resetelements}
          />
        )}
      </div>
    </>
  )
}

export default SetupUsers
