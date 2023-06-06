import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const FormTooltip = ({ helpName, helpText }) => {
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {helpText}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement="top"
      trigger={['hover', 'focus']}
      delay={{ show: 150, hide: 200 }}
      overlay={renderTooltip}
    >
      <span>
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon mx-2" />
      </span>
    </OverlayTrigger>
  )
}

export default FormTooltip
