import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (file: File) => void;
};
const FileUploader = ({ fieldChange }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setFileUrl(url);
      fieldChange(acceptedFiles[0]);
    },
    [fileUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex flex-col justify-center items-center gap-4 rounded-md">
          <div className="h-72 lg:h-[380px] border-2 rounded-md">
            <img
              className="w-full h-full object-contain object-center"
              src={fileUrl}
              alt="Photo preview"
            />
          </div>
          <p className="text-xs">Click or drag photo to replace</p>
        </div>
      ) : (
        <div className="h-72 lg:h-[380px] bg-slate-800 p-4 rounded-md flex flex-col justify-center items-center">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="mb-2 mt-6">Drag photo here</h3>
          <p className="text-slate-500 text-xs mb-6">SVG, PNG, JPG</p>

          <p className="bg-slate-500 p-2 rounded-md hover:cursor-pointer">
            Select from computer
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
