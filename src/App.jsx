import { React, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from'react-bootstrap/Image';
import imageCompression from 'browser-image-compression';

function App() {
  const [file, setFile] = useState({
    originalImage: '',
    originalLink: '',
    originalSize: 0,
    compressedLink: '',
    compressedSize: 0,
    outputFileName: '',
  });

  const [status, setStatus] = useState({
    clicked: false,
    uploadImage: false,
  });

  const handleUpload = e => {
    const uploadedFile = e.target.files[0];
    setFile({
      ...file,
      originalLink: URL.createObjectURL(uploadedFile),
      originalImage: uploadedFile,
      outputFileName: uploadedFile.name,
      originalSize: Math.floor(uploadedFile.size / 1024)
    });
    setStatus({...status, uploadImage: true });
  };

  const handleCompress = e => {
    e.preventDefault();
    
    const uploadOptions = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (uploadOptions.maxSizeMB > file.originalImage.size / 1024) {
      alert('My man, upload something better.');
      return 0;
    }

    imageCompression(file.originalImage, uploadOptions)
      .then(compressedImage => {
          const downloadLink = URL.createObjectURL(compressedImage);

          setFile({
            ...file,
            compressedLink: downloadLink,
            compressedSize: Math.floor(compressedImage.size / 1024) 
          });
      });
    
    setStatus({ clicked: true });
    return 1;
  };

  return (
    <div className='m-5'>
      {/* Instructions Component (no props)*/}
      <div className='text-light text-center'>
        <h1>Image Compressor</h1>
        <div>
          <h4>- Upload Image</h4>
          <h4>- Click on Compress</h4>
          <h4>- Download Compressed Image</h4>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
          {/* Default Image Component */}
          {status.uploadImage ? (
            <Card>
              <Image
                className='ht'
                variant='top'
                src={file.originalLink}
              />
              <Card body className='text-center'>
                Estimated file size: {file.originalSize >= 1000 ? file.originalSize + 'Mb' : file.originalSize + 'Kb'}
              </Card>
            </Card>
          ) : (
            <Card>
              <Image
                className='ht'
                variant='top'
                src={window.location.origin + '/placeholder.png'} 
              />

              <Card body className='text-center'>
                <input
                  type='file'
                  accept='image/*'
                  className='mt-2 btn btn-dark w-75'
                  onChange={(e) => handleUpload(e)}
                />
              </Card>
            </Card>
          )}
        </div>

        {/* Compression button component  */}
        <div className='col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline'>
          <br />
          {file.outputFileName ? (
            <button
              type='button'
              className=' btn btn-dark'
              onClick={(e) => handleCompress(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        {/* CompressedImage Component  */}
        <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
          {status.clicked ? (
            <Card>
              <Image variant='top' src={file.compressedLink}/>

              <Card body className='text-center'>
                <a 
                  href={file.compressedLink} 
                  download
                  className='btn btn-dark w-75 mt-2'
                >
                  Download
                </a>
                <p className='mt-2'> 
                  Compressed file size: {file.compressedSize >= 1000 ? file.compressedSize + 'Mb' : file.compressedSize + 'Kb'}
                </p>
                <p className="mt-1">
                  Original file size: {file.originalSize >= 1000 ? file.originalSize + 'Mb' : file.originalSize + 'Kb'}
                </p>
              </Card>
            </Card>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
