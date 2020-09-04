import React, { useState, useEffect } from "react"
import { updateHistory } from "../APIOperations/HTTPOperations"
import { handleChange, formatDate } from "../APIOperations/Operations"
import { processHistoryData } from "../APIOperations/ProcessData"
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

const EditHistory = ({
  staffs,
  setHistory,
  currentHistory,
  setCurrentHistory
}) => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  )

  const handleSubmit = async e => {
    e.preventDefault()
    setHistory(prev =>
      prev.map(item =>
        item.history_id === currentHistory.history_id ? currentHistory : item
      )
    )
    const processedData = processHistoryData(currentHistory, staffs)
    updateHistory(processedData)
  }

  return (
    <div>
      <Button onClick={toggle}>Edit</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader close={closeBtn}>Edit History</ModalHeader>
        <Form onSubmit={handleSubmit}>
          {/* Modal with selected history data to be edited */}
          <ModalBody>
            <Label>Time</Label>
            <Input
              type='date'
              name='action_date'
              onChange={e => handleChange(setCurrentHistory, e)}
              defaultValue={formatDate(currentHistory["action_date"])}
            />
            <Label>Action</Label>
            <Input
              type='text'
              name='action'
              onChange={e => handleChange(setCurrentHistory, e)}
              defaultValue={currentHistory["action"]}
            />
            <Label>Staff</Label>
            <Input
              type='text'
              name='operator'
              onChange={e => handleChange(setCurrentHistory, e)}
              defaultValue={currentHistory["operator"]}
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
              onChange={e => handleChange(setCurrentHistory, e)}
              defaultValue={currentHistory["description"]}
            />
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

export default EditHistory
