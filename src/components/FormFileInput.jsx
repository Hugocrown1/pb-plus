import { IconUpload } from "@tabler/icons-react";
import Image from "next/image";

const FormFileInput = ({ url, alt, id, name, onChange, inputColor }) => {
  return (
    <>
      {url && (
        <Image
          priority
          alt={alt}
          src={url}
          fill={true}
          className={`object-cover object-center`}
        />
      )}

      <div className="w-full h-full flex justify-center items-center">
        <label
          htmlFor={id}
          className={`absolute flex flex-col items-center m-1 justify-center w-32 h-32 bg-[${inputColor}] rounded-md text-gray-500 hover:bg-gray-300 transition-colors text-lg cursor-pointer`}
        >
          <IconUpload size={22} />
          Upload
          <input
            id={id}
            name={name}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={onChange}
          />
        </label>
      </div>
    </>
  );
};

export default FormFileInput;
