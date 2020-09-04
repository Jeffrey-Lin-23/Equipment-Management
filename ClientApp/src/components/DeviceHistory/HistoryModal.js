import React, { useState } from "react"
import { postHistory, getHistory } from "../APIOperations/HTTPOperations"
import { handleChange } from "../APIOperations/Operations"
import { processHistoryData } from "../APIOperations/ProcessData"
import { Link } from "react-router-dom"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form
} from "reactstrap"

const HistoryModal = ({ id, setHistory, staffs }) => {
  const [modal, setModal] = useState(false)
  const [historyInput, sethistoryInput] = useState({
    device_id: parseInt(id)
  })

  const toggle = () => setModal(!modal)

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  )

  const handleSubmit = async e => {
    e.preventDefault()
    const processedData = processHistoryData(historyInput, staffs)
    await postHistory(processedData)
    // reload the state after new entry's been added
    await getHistory(setHistory, id)
    // clear state
    sethistoryInput({
      device_id: parseInt(id)
    })
  }

  return (
    <div>
      <Link to='#' onClick={toggle}>
        Add history +
      </Link>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader close={closeBtn}>Add History</ModalHeader>
        <Form onSubmit={handleSubmit}>
          {/* Modal which is for adding history */}
          <ModalBody>
            <Label>Time</Label>
            <Input
              type='date'
              name='action_date'
              onChange={e => handleChange(sethistoryInput, e)}></Input>
            <Label>Action</Label>
            <Input
              type='text'
              name='action'
              onChange={e => handleChange(sethistoryInput, e)}></Input>
            <Label>Staff</Label>
            <Input
              type='text'
              name='operator'
              onChange={e => handleChange(sethistoryInput, e)}
              list='staff_list'
            />
            <datalist id='staff_list'>
              {staffs.map((staff, i) => (
                <option key={i} value={staff.first_name} />
              ))}
            </datalist>
            <Label>Description</Label>
            <Input
              type='textarea'
              name='description'
              onChange={e => handleChange(sethistoryInput, e)}></Input>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit' onClick={toggle}>
              Save
            </Button>{" "}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default HistoryModal
