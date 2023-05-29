import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const BtnTooltip = (info) => {
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {info.info}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      overlay={renderTooltip}
    >
      <span>
        {info.cont}
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
      </span>
    </OverlayTrigger>
  )
}

export default BtnTooltip
