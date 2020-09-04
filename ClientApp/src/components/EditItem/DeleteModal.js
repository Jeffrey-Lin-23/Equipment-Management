import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { deleteDevice } from "../APIOperations/HTTPOperations"

const DeleteModal = ({ formData }) => {
  const history = useHistory()
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const handleDelete = e => {
    // delete the device and redirect to TotalItems
    deleteDevice(formData)
    toggle()
    history.push("/TotalItems")
  }

  return (
    <>
      <Button onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Attention</ModalHeader>
        <ModalBody>
          <h5>Deleting current device...</h5>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleDelete}>
            Confirm
          </Button>{" "}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteModal
