const CompressButton = (props) => {
  const { outputFilename, handleCompression } = props;

  const compressButtonTemplate = (
    <button
      type="button"
      className=" btn btn-dark"
      onClick={e => handleCompression(e)}
    >
      Compress
    </button>
  );
  const noContentTemplate = <></>

  return (
    <div className='col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline'>
      <br />
      {outputFilename ? compressButtonTemplate: noContentTemplate}
    </div>
  );
};

export default CompressButton;
