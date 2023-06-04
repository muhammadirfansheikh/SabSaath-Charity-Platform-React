import React,{useState, useEffect} from 'react'
import ModalBlogList from 'components/modal/ModalBlogList';
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
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import { Blogs_List, Delete_Blog } from 'utils/CommonMethods';
import Swal from 'sweetalert2';

const BlogList = (props) => {
    const initialValues = {
        BlogTitle: "",
        BlogDesc: "",
        OperationID: 1
    };
    const [searchValues, setSearchValues] = useState(initialValues);
    const [blogEditId, setEditBlogId] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [editBlog, setEditBlog] = useState([]);
    const[fetchAgain,setFetchAgain] = useState(0)

    const handleInputChange = (e) => {
       
        const { name, value } = e.target;
        setSearchValues({
          ...searchValues,
          [name]: value,
        });
      };
    const handleSearchClick=async(e) =>{
        e.preventDefault();
        try {
            var data =  await Blogs_List(searchValues);
            if(data != null){
                if(data.status === 200 && data.data != null > 0){
                setBlogs(data.data.Table)
                return data;}
                else{
                    return [];
                }
              
            }
            
            else{
                return [];
            }
        } catch (error) {
          return [];
        }
    }
    const handleCancelClick=async(e) => {
        
        e.preventDefault();
       setSearchValues(initialValues);
       BlogsList()
    
   }
    const openNewmodal = (blogId) => {
        setEditBlogId(blogId);
        setOpenModal(true);
    }
    const onEdit = ({ data }) => {
        var blogId = data.Blogsid
        setEditBlog(data)
        openNewmodal(blogId);
    }
    const onDelete =async ({ blogId }) => {
       var OperationID = 4
       var deleteData= await Delete_Blog(OperationID, blogId);
       Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' }).then((result) => { 
        if(result.isDismissed){
            setTimeout(() => {
                BlogsList();
            }, 500);
        }
        else if(result.isConfirmed){
            setTimeout(() => {
                BlogsList();
            }, 500);
        }
    })
       
    }
    
    const closeNewmodal = () => {
        setEditBlogId(0);
        setOpenModal(false);
       
    }
    useEffect(() => {
        BlogsList()
    }, [fetchAgain])
    const BlogsList = async () => {
        try {
            var data =  await Blogs_List(searchValues);
            if(data != null){
                if(data.status === 200 && data.data != null){
                setBlogs(data.data.Table)
                return data;
            }
                else{
                    return [];
                }
              
            }
            else{
                return [];
            }
        } catch (error) {
          return [];
        }
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
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Blog Title</Label>
                                                <Input
                                                    type="text"
                                                    name='BlogTitle'
                                                    onChange={handleInputChange}
                                                    value={searchValues.BlogTitle}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Blog Description</Label>
                                                <Input
                                                    type="text"
                                                    name='BlogDesc'
                                                    onChange={handleInputChange}
                                                    value={searchValues.BlogDesc}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-right">
                                          <Button color="primary" size="sm" className="mr-2" 
                                            onClick={handleSearchClick}
                                            >Search</Button>
                                          <Button color="secondary" size="sm"
                                            onClick={handleCancelClick}
                                            >Cancel</Button>
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
                                        Blog List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                      <Button color="primary2" size="sm" className="m-0" 
                                        // onClick={() => openNewmodal({ blogId: 0 })}
                                        onClick={(e) => onEdit({ data: {} })}
                                        >Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                          <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs && blogs.map((item,key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.BlogsTitle}</td>
                                                <td>{item.BlogsDesc}</td>
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" 
                                                    onClick={(e) => onEdit({ data: item })}
                                                    ><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" 
                                                    onClick={() => onDelete({ blogId: item.Blogsid })}
                                                    ><i className="nc-icon nc-simple-remove"></i></Button>
                                                </td>
                                            </tr>
                                        )
                                        
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    openModal &&
                    <ModalBlogList {...props}
                        HeaderText="Add/Edit Blog"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        blogId={blogEditId}
                        setFetchAgain={setFetchAgain}
                        editData= {editBlog}
                    />

                }
                
            </div>

        </>
  )
}

export default BlogList