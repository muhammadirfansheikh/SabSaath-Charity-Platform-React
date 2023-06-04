import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import {
  InsertSetupDetail,
  Insert_Blogs,
  UpdateSetupDetail,
} from "utils/CommonMethods";
import { SetupMasterIds } from "utils/Constants";

const ModalBlogList = (props) => { 
  var UserId = localStorage.getItem("UserId");
  var UserIp = localStorage.getItem("UserIP");
  const initialValues = {
    OperationID: 0,
    Blogsid: 0,
    BlogsTitle: "",
    BlogsDesc: "",
    BlogsStartDate: "",
    BlogExpiryDate: "",
    IsActive: 0,
    CreatedBy: UserId,
    UserIP: UserIp,
  };
  const [basicValue, setBasicValue] = useState(initialValues);
  const [attachment, setAttachment] = useState();

  useEffect(()=>{
      if(props?.editData){
        setBasicValue({...basicValue, ...props.editData})
      }
      
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let values = e.target.value;

    setBasicValue({
      ...basicValue,
      [name]: values,
    });
  };
  const handleImgeUpload = (e) => {
    handleInputChange(e);
    setAttachment(e.target.files[0]);
  };
  function toggle() {
    props.closeNewmodal();
  }
  async function AddUpdateBlog(e) {
    try {
      e.preventDefault();

      if (basicValue.Blogsid !== "0") {
        var blogId = 0;
          blogId = props.blogId > 0 ? props.blogId : 0;

          let RequestData;
          let data
          if (blogId === 0) {
            ///Insert Operation
            basicValue.OperationID = 2;
            data = await Insert_Blogs(basicValue, attachment);
            setBasicValue(initialValues)
            setTimeout(() => {
              props.setFetchAgain((x) => x + 1);
            }, 500);
            toggle();
            
            
          } else if (blogId !== 0 ) {
            
            basicValue.OperationID = 3;
            basicValue.Blogsid = blogId;
            data = await Insert_Blogs(basicValue, attachment);
            setTimeout(() => {
              props.setFetchAgain((x) => x + 2);
            }, 500);
            toggle();
          
        }
        setBasicValue({
          ...basicValue
        });
        
      } else {
        Swal.fire({ title: "Error", text: "Something Went Wrong", icon: "warning" });
      }
    } catch (error) {
      
    }
  }
  return (
    <Modal isOpen={props.Ismodalshow} toggle={toggle} size="lg" backdrop="static">
      <form onSubmit={AddUpdateBlog}>
      <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
        
          <Row form>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Blog</Label>
                <Input
                  placeholder="Blog Title"
                  type="text"
                  name="BlogsTitle"
                  value={basicValue.BlogsTitle}
                  onChange={handleInputChange}
                  required={true}
                  maxLength={200}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Blog Description</Label>
                <Input
                  placeholder="Blog Description"
                  type="textarea"
                  name="BlogsDesc"
                  value={basicValue.BlogsDesc}
                  onChange={handleInputChange}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  placeholder="Start Date"
                  type="date"
                  name="BlogsStartDate"
                  value={basicValue.BlogsStartDate}
                  onChange={handleInputChange}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              <FormGroup>
                <Label>End Date</Label>
                <Input
                  placeholder="End Date"
                  type="date"
                  name="BlogExpiryDate"
                  value={basicValue.BlogExpiryDate}
                  onChange={handleInputChange}
                  required={true}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              <FormGroup>
                <Label>Image Upload</Label>
                <Input
                  type="file"
                  name="file"
                  onChange={handleImgeUpload}
                  id="exampleFile"
                  // required={true}
                />
              </FormGroup>
            </Col>
          </Row>
        
      </ModalBody>
      <ModalFooter>
              <Button color="primary" type="submit" size="sm" >
          Save
        </Button>
              <Button color="secondary" size="sm" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
      </form>
    </Modal>
  );
};

export default ModalBlogList;
