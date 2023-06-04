import React from 'react';
import ImageUploading from 'react-images-uploading';
import Icon from 'awesome-react-icons';
import "bootstrap/dist/css/bootstrap.css";


import { Container, Row, Col} from "reactstrap";


const MultiPicture = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 11;

  const onChange = (imageList, addUpdateIndex,e) => {
    // data for submit
    e.preventDefault(); 
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
         
          <div className="upload__image-wrapper">
          <Container fluid>
            <button 
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
            Attach Image 
            </button>
            &nbsp;
         

         
            <Row form>
            {imageList.map((image, index) => (
              
                <Col xs={1} key={index}>
                 <div className="image-item text-center">
                    
                <img src={image['data_url']} alt="" width="70" />
                <div className="image-item__btn-wrapper text-center">
               
                  <Icon onClick={() => onImageRemove(index)} name="trash" size={10} />
                  
                </div>

                </div>
              </Col>
            ))}
            
            </Row>
            </Container>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
export default MultiPicture