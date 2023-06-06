import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const BtnTooltip = ({description, name }) => {  
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {description}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      overlay={renderTooltip}
    >
      <span>
        {name}
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
      </span>
    </OverlayTrigger>
  )
}

export default BtnTooltip
