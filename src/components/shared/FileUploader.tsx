import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (file: File) => void;
};
const FileUploader = ({ fieldChange }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setFileUrl(url);
      console.log(url);
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
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src={fileUrl}
            alt="Photo Preview"
            className="h-72 lg:h-[380px] w-full rounded-md object-cover object-top"
          />
          <p className="text-xs">Click or drag photo to replace</p>
        </div>
      ) : (
        <div className="bg-slate-800 p-4 rounded-md flex flex-col justify-center items-center">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="mb-2 mt-6">Drag photo here</h3>
          <p className="text-slate-500 text-xs mb-6">SVG, PNG, JPG</p>

          <Button variant="outline" className="bg-slate-500">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
