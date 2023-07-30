function LabVideoStreaming({url}) {

  return (
    // <>
    //   <iframe
    //     src={`${url}`}
    //     width='100%'
    //     height='100%'
    //     padding-top='10em'
    //     border='2px solid #000'
    //   />
    // </>
    // <>
    //   {url.lenght <= 27 ? (
    //     <img
    //       src={`${url}`}
    //       width='100%'
    //       // border='2px solid #000'
    //     />
    //   ) : (
    //     <img
    //       alt=""
    //       src="https://us.123rf.com/450wm/mixov/mixov1401/mixov140100050/25513004-vector-eps10-icono-del-reproductor-de-v%C3%ADdeo-dise%C3%B1o-plano.jpg?ver=6"
    //       className="img-thumbnail border"
    //     />
    //   )}
    // </>
    <>
      <img
        src={`${url}`}
        width='100%'
        // border='2px solid #000'
      />
    </>
  )
}

export default LabVideoStreaming
