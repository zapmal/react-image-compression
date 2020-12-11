import Card from "react-bootstrap/Card";

const UploadButton = props => {
  const { handleUpload } = props;

  return (
    <Card body className="text-center">
      <input
        type="file"
        accept="image/*"
        className="mt-2 btn btn-dark w-75"
        onChange={e => handleUpload(e)}
      />
    </Card>
  );
};

export default UploadButton;
