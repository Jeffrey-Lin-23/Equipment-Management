import React, { useContext, useState, useEffect } from "react"
import { Row, Button, Form, Label, Col } from "reactstrap"
import FormRow from "../FormGenerator/FormRow"
import { FormContext } from "../Context/FormContext"
import { getDevice, update, getStaffs } from "../APIOperations/HTTPOperations"
import { formatDate } from "../APIOperations/Operations"
import DeviceHistory from "../DeviceHistory/DeviceHistory"
import { processDataToBack } from "../APIOperations/ProcessData"
import DeleteModal from "./DeleteModal"

const EditItem = ({ match }) => {
  const {
    params: { id }
  } = match
  const rowNumber = [1, 2, 3, 4, 5, 6]
  const [form] = useContext(FormContext)
  const [formData, setFormData] = useState({})
  const [staffState, setStaffState] = useState([])

  useEffect(() => {
    getStaffs(setStaffState)
    getDevice(editData, id)
  }, [])

  const editData = data => {
    // change date formate before assign to state
    data["order_date"] = formatDate(data["order_date"])
    data["deliver_date"] = formatDate(data["deliver_date"])
    setFormData(data)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // prepare data to be send to database
    const processedData = processDataToBack(formData, staffState)
    update(processedData)
  }

  return (
    <div>
      <h1>Edit Item</h1>
      <Label>ID: {id}</Label>
      <Form onSubmit={handleSubmit}>
        {/* render input fields with data */}
        {rowNumber.map((n, index) => (
          <Row form key={index}>
            <FormRow
              form={form}
              formData={formData}
              setFormData={setFormData}
              staffs={staffState}
            />
          </Row>
        ))}
        <Row>
          <Col md={2}>
            <Button>Submit</Button>
          </Col>
          <DeleteModal formData={formData}>Delete</DeleteModal>
        </Row>
      </Form>

      <DeviceHistory id={id} staffs={staffState} />
    </div>
  )
}

export default EditItem
