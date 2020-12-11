import { React, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from'react-bootstrap/Image';
import Instructions from './components/Instructions';
import CompressedImage from './components/CompressedImage';
import CompressButton from './components/CompressButton';
import imageCompression from 'browser-image-compression';

function App() {
  const [file, setFile] = useState({
    originalImage: '',
    originalLink: '',
    originalSize: 0,
    compressedLink: '',
    compressedSize: 0,
    outputFilename: '',
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
      outputFilename: uploadedFile.name,
      originalSize: Math.floor(uploadedFile.size / 1024)
    });
    setStatus({...status, uploadImage: true });
  };

  const handleCompression = e => {
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
      <Instructions />

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

        <CompressButton 
          outputFilename={file.outputFilename}
          handleCompression={handleCompression}
        />

        <CompressedImage 
          clicked={status.clicked}
          compressedLink={file.compressedLink}
          compressedSize={file.compressedSize}
          originalSize={file.originalSize}
        />
      </div>
    </div>
  );
}

export default App;
