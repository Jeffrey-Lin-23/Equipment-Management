import React from "react"
import { Row, Col, FormGroup, Label } from "reactstrap"
import InputGenerator from "./InputGenerator"

let count = -1

const FormRow = ({ form, formData, setFormData, staffs }) => {
  const colNumber = [1, 2, 3]

  return (
    <>
      {colNumber.map((n, index) => (
        <Col md={4} key={index}>
          <Row style={{ marginBottom: "1.5rem" }}>
            <Col md={5}>
              {/* Count || reset which input to render */}
              <div style={{ display: "none" }}>
                {count === 17 ? (count = 0) : count++}
              </div>
              <Label>{form[count].label}</Label>
            </Col>
            <Col md={7}>
              <InputGenerator
                currentField={form[count]}
                formData={formData}
                setFormData={setFormData}
                staffs={staffs}
              />
            </Col>
          </Row>
        </Col>
      ))}
    </>
  )
}

export default FormRow
