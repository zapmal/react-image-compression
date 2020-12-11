import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const CompressedImage = (props) => {
  const { 
    clicked,
    compressedLink,
    compressedSize,
    originalSize, 
  } = props;

  const compressedImageTemplate = (
    <Card>
      <Image variant="top" src={compressedLink} />

      <Card body className="text-center">
        <a
          href={compressedLink}
          download
          className="btn btn-dark w-75 mt-2"
        >
          Download
        </a>
        <p className="mt-2">
          Compressed file size:{" "}
          {compressedSize >= 1000
            ? compressedSize + "Mb"
            : compressedSize + "Kb"}
        </p>
        <p className="mt-1">
          Original file size:{" "}
          {originalSize >= 1000
            ? originalSize + "Mb"
            : originalSize + "Kb"}
        </p>
      </Card>
    </Card>
  );
  const noContentTemplate = <></>;

  return (
    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
      {clicked ? compressedImageTemplate : noContentTemplate}
    </div>
  );
};

export default CompressedImage;
