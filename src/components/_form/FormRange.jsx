import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormTooltip from './FormTooltip'

function FormRange({ name, description, minValue, maxValue, step, unit, state, setState, helpText }) {
  return (
    <Row className='my-3'>
      <Form.Group className='border border-secondary rounded' controlId={`form${name}Range`}>
        <Row className='m-2'>
          <Col>
            <Form.Range
              min={minValue}
              max={maxValue}
              step={step}
              name={`form-${name}-range`}
              value={state}
              onChange={(changeEvent) => setState(changeEvent.target.value)}
            />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col sm={9} md={8} lg={8}>
            <span className='input-group-text' htmlFor={`form-${name}-range`}>
              <FormTooltip helpText={helpText} />
              {`${description} [ ${unit} ]`}
            </span>
          </Col>

          <Col sm={3} md={4} lg={4}>
            {/* <Form.Control disabled type="text" value={`${state} [${unit}]`} /> */}
            <Form.Control disabled type='text' value={state} />
          </Col>
        </Row>
      </Form.Group>
    </Row>
  )
}

export default FormRange
