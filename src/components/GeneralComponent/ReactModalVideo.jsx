import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ReactPlayer from "react-player"
import { baseImageUrl } from "utils/Api"
const ReactModalVideo = ({ showModal, setShowModal, itemContent }) => {
  return (
    <Modal
      className="video-modal2 ad-modal-video"
      isOpen={showModal}
      toggle={() => {
        setShowModal(false)
      }}
      style={{
        // maxWidth: "90%",
        height: "60vh",
      }}
      size="lg"
    >
      {/* <ModalHeader toggle={() => setShowModal(false)}></ModalHeader> */}
      <span className="close-modal-ad" onClick={() => setShowModal(false)}>
        x
      </span>
      {itemContent && (
        <ModalBody className="p-0">
          <ReactPlayer
            url={
              baseImageUrl +
              itemContent?.DocAttachmentPath +
              "/" +
              itemContent?.VideoURL
            }
            width="100%"
            // height="calc(70vh - 30px)"

            height={"100%"}
            controls={true}
            playing={true}
          />
          <div className="p-3">
            <h4 className="mt-0 mb-1">{itemContent?.Content_Title}</h4>
            <p className="mb-0">{
              <div dangerouslySetInnerHTML={{ __html: itemContent?.Content_Description }} />
            }</p>
          </div>
        </ModalBody>
      )}
    </Modal>
  )
}

export default ReactModalVideo
