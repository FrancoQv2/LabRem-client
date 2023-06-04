import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import ToggleButton from "react-bootstrap/ToggleButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import BtnTooltip from "./BtnTooltip"

function FormBtnGroup({ name, state, setState,ayuda }) {
  const handleButtonClick = (index) => {
    const updatedState = [...state]
    updatedState[index] = updatedState[index] === 1 ? 0 : 1
    setState(updatedState)
  }

  return (
    <Row className="my-3">
      <Form.Group
        className="border border-secondary rounded"
        controlId={`form${name}`}
      >
        <Row className="my-3">
          <Col sm={4} lg={6}>
            <span
              className="input-group-text"
              htmlFor={name.toString().toLowerCase()}
            >
              <BtnTooltip
                description={ayuda}
                name={name}>
              </BtnTooltip>
              
            </span>
          </Col>

          <Col sm={4} lg={6}>
            <ToggleButtonGroup type="checkbox" className="w-100">
              <ToggleButton
                value={1}
                variant={state[0] === 1 ? 'danger' : 'secondary'}
                onClick={() => handleButtonClick(0)}
              >
                1
              </ToggleButton>
              <ToggleButton
                value={2}
                variant={state[1] === 1 ? 'danger' : 'secondary'}
                onClick={() => handleButtonClick(1)}
              >
                2
              </ToggleButton>
              <ToggleButton
                value={3}
                variant={state[2] === 1 ? 'danger' : 'secondary'}
                onClick={() => handleButtonClick(2)}
              >
                3
              </ToggleButton>
              <ToggleButton
                value={4}
                variant={state[3] === 1 ? 'danger' : 'secondary'}
                onClick={() => handleButtonClick(3)}
              >
                4
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Form.Group>
    </Row>
  )
}

export default FormBtnGroup
