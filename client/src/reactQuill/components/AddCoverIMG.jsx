import React, { useRef, useState } from "react";

const AddCoverIMG = () => {
  const maxWidth = 700;
  const minHeight = 200;
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const handleChangeFile = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      const uploadedImage = e.target.files[0];
      const imageReader = new FileReader();

      imageReader.onload = (loadEvent) => {
        const uploadedImageSrc = loadEvent.target.result;
        const img = new Image();
        img.src = uploadedImageSrc;
        img.onload = () => {
          const imageAspectRatio = img.naturalWidth / img.naturalHeight;
          if (img.naturalWidth > maxWidth || img.naturalHeight > minHeight) {
            console.warn(
              "original img",
              imageAspectRatio,
              img.width / img.height
            );
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = maxWidth;
            canvas.height = minHeight;
            if (img.naturalWidth > maxWidth) {
              ctx.drawImage(
                img,
                (img.width - maxWidth) / 2,
                0,
                img.width,
                img.height,
                0,
                0,
                maxWidth,
                minHeight
              );
            } else if (img.naturalHeight > minHeight) {
              ctx.drawImage(
                img,
                0,
                (img.height - minHeight) / 2,
                img.width,
                img.height,
                0,
                0,
                maxWidth,
                minHeight
              );
            } else if (
              img.naturalWidth > maxWidth &&
              img.naturalHeight > minHeight
            ) {
              ctx.drawImage(
                img,
                (img.width - maxWidth) / 2,
                (img.height - minHeight) / 2,
                img.width,
                img.height,
                0,
                0,
                maxWidth,
                minHeight
              );
            }

            setPreviewImage(canvas.toDataURL());
          } else {
            setPreviewImage(uploadedImageSrc);
          }
        };
        // setImage(uploadedImageSrc);
      };

      imageReader.readAsDataURL(uploadedImage);
    } else {
      setPreviewImage("");
      setImage("");
    }
  };
  return (
    <>
      <div
        className='container-lg mb-4 rounded d-flex justify-content-center align-items-center'
        style={{ height: "200px", backgroundColor: "rgb(173 173 173)" }}
        onClick={() => inputRef.current.click()}>
        {!image && !previewImage && <span class='fs-16 fw-500'>Add Image</span>}
        <input
          type='file'
          onChange={handleChangeFile}
          className='d-none'
          ref={inputRef}
        />
        {image && previewImage && (
          <img
            src={
              typeof previewImage == "object"
                ? URL.createObjectURL(previewImage)
                : previewImage
            }
            class='object-fit-cover w-100 h-100'
            onLoad={(e) => {
              console.warn(
                "image diemenssion",
                e.target.width,
                e.target.height
              );
            }}
          />
        )}
      </div>
    </>
  );
};

export default AddCoverIMG;
