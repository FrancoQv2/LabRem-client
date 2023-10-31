import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormTooltip from './FormTooltip'

/**
 *
 * @param {String} name Nombre del campo (por ej Velocidad)
 * @param {Array} values Arreglo con los valores que puede tener el campo
 * @param {*} defaultValue Valor por defecto de campo
 * @param {Function} setState Función Set del Hook del campo que se utiliza
 * @returns
 */
function FormSelect({ name, values, defaultValue, setState, helpText }) {
  return (
    <Row className='my-3'>
      <Form.Group
        className='border border-secondary rounded'
        controlId={`form${name}`}
        onChange={(changeEvent) => setState(changeEvent.target.value)}
      >
        <Row className='my-3'>
          <Col sm={6} md={8} lg={6}>
            <span className='input-group-text' htmlFor={name.toString().toLowerCase().replace(/ /g, '-')}>
              <FormTooltip helpText={helpText} />
              {name}
            </span>
          </Col>

          <Col sm={6} md={4} lg={6}>
            <Form.Select aria-label={name.toString().toLowerCase().replace(/ /g, '-')} defaultValue={defaultValue}>
              {values &&
                values.map((value, index) => (
                  <option key={`${name}-${index}`} value={value}>
                    {value}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    </Row>
  )
}

export default FormSelect
