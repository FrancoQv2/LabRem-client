import Ratio from 'react-bootstrap/Ratio';


function LabVideoStreaming({ streamUrl }) {
  const containerStyles = {
    // width: "640px",
    height: "auto",
  }

  const iframeStyles = {
    border: "2px solid #000",
    borderRadius: '10px'
  }

  return (
    // <div style={containerStyles}>
    //   <Ratio aspectRatio="4x3">
    //     <iframe 
    //       src={`${streamUrl}`} 
    //       style={iframeStyles} 
    //       title="Camera Stream"
    //     />
    //   </Ratio>
    // </div>
    <>
      <img
        src={`${streamUrl}`}
        width='100%'
        // border='2px solid #000'
      />
    </>
  )
}

export default LabVideoStreaming
