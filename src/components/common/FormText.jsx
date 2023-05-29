import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

function FormText({ name, limit, showLimit=true, state, setState }) {

    const handleTextChange = (changeEvent) => {
      const state = changeEvent.target.value
      if (state.length <= limit) {
        setState(state)
      } else {
        setState(state.substring(0, limit))
      }
    }
  
    return (
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId={`form-${name.toString().toLowerCase().replace(/ /g, "-")}`}
        >
          <Row className="my-3">
            <Col sm={4} md={6} lg={6}>
              <span className="input-group-text" htmlFor={name.toString().toLowerCase().replace(/ /g, "-")}>
                {name}
                {(showLimit) ? ` - (${state.length} / ${limit})` : null}
              </span>
            </Col>
            <Col sm={4} md={6} lg={6}>
              <Form.Control
                type="text"
                aria-describedby="text-state"
                value={state}
                onChange={handleTextChange}
              />
              <Form.Text id="text-state"></Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Row>
    )
}

export default FormText
