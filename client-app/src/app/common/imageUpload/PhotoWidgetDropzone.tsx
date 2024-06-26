import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface Props {
  setFiles: (files: { preview: string; }[]) => void;
}

const PhotoWidgetDropzone: React.FC<Props> = ({ setFiles }) => {
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as const,
    height: 200,
  };

  const dzActive = {
    borderColor: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop zone here" />
    </div>
  );
}

export default PhotoWidgetDropzone;
