import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import UploadButton from "./UploadButton";

const UploadImage = props => {
  const { 
    isImageUploaded, 
    originalLink, 
    originalSize,
    handleUpload, 
    formatBytes,
  } = props;

  console.log(originalLink, isImageUploaded);

  const uploadedImageTemplate = (
    <Card>
      <Image className="ht" variant="top" src={originalLink} />
      <Card body className="text-center">
        Original size: {formatBytes(originalSize)}
      </Card>
    </Card>
  );

  const defaultImageTemplate = (
    <Card>
      <Image
        className="ht"
        variant="top"
        src={window.location.origin + "/placeholder.png"}
      />
      <UploadButton handleUpload={handleUpload}/>
    </Card>
  );

  return (
    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
      {isImageUploaded ? uploadedImageTemplate : defaultImageTemplate}
    </div>
  );
};

export default UploadImage;