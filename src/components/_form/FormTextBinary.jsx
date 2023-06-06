import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FormTooltip from "./FormTooltip"

function FormTextBinary({ name, limit, state, setState, disabled = false, helpText }) {
  const handleTextChange = (changeEvent) => {
    const value = changeEvent.target.value
    const binaryValue = value.replace(/[^01]/g, "") // Filtrar solo caracteres binarios

    if (binaryValue.length <= limit) {
      setState(binaryValue)
    } else {
      setState(binaryValue.substring(0, limit))
    }
  }

  return (
    <Row className="my-3">
      <Form.Group
        className="border border-secondary rounded"
        controlId={`form-${name.toString().toLowerCase().replace(/ /g, "-")}`}
      >
        <Row className="my-3">
          <Col sm={4} lg={6}>
            <span
              className="input-group-text"
              htmlFor={name.toString().toLowerCase().replace(/ /g, "-")}
            >
              <FormTooltip
                helpText={helpText}
              ></FormTooltip>
              {name}
              {/* {` - (${state.length} / ${limit})`} */}
            </span>
          </Col>
          <Col sm={4} lg={6}>
            <Form.Control
              type="text"
              aria-describedby="text-state"
              value={state}
              onChange={handleTextChange}
              disabled={disabled}
            />
            <Form.Text id="text-state"></Form.Text>
          </Col>
        </Row>
      </Form.Group>
    </Row>
  )
}

export default FormTextBinary