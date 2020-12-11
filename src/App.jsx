import { React, useState } from 'react';
import Instructions from './components/Instructions';
import CompressedImage from './components/CompressedImage';
import CompressButton from './components/CompressButton';
import UploadImage from './components/UploadImage';
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
    isImageUploaded: false,
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
    setStatus({...status, isImageUploaded: true });
  };

  const handleCompression = e => {
    e.preventDefault();
    
    const uploadOptions = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (uploadOptions.maxSizeMB > file.originalImage.size / 1024) {
      alert('The submited file is too small.');
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

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const kilobyte = 1024;
    const hasDecimals = decimals < 0 ? 0: decimals;
    const sizes = ['Bytes', 'Kb', 'Mb'];

    const index = Math.floor(Math.log(bytes) / Math.log(kilobyte));

    return parseFloat((bytes / Math.pow(kilobyte, index)).toFixed(hasDecimals)) + ' ' + sizes[index];
  };

  return (
    <div className='m-5'>
      <Instructions />
      <div className='row mt-5'>
        <UploadImage 
          isImageUploaded={status.isImageUploaded}
          originalLink={file.originalLink}
          originalSize={file.originalSize}
          handleUpload={handleUpload}
          formatBytes={formatBytes}
        />

        <CompressButton 
          outputFilename={file.outputFilename}
          handleCompression={handleCompression}
        />

        <CompressedImage 
          clicked={status.clicked}
          compressedLink={file.compressedLink}
          compressedSize={file.compressedSize}
          originalSize={file.originalSize}
          formatBytes={formatBytes}
        />
      </div>
    </div>
  );
}

export default App;
