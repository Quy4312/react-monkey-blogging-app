import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useFireBaseImage(
  setValue,
  getValues,
  imageName = null,
  callback = null
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!setValue || !getValues) return;
  const HandleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing at all");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    HandleUploadImage(file);
  };
  const handleResetUpload = () => {
    setProgress(0);
    setImage("");
  };
  const handleDeleteImage = () => {
    const storage = getStorage();

    const imageRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );

    deleteObject(imageRef)
      .then(() => {
        console.log("remove image success");
        setImage("");
        setProgress(0);
        callback && callback();
      })
      .catch((error) => {
        console.log("🚀 ~ handleDeleteImage ~ error:", error);
        console.log("can not delete image");
        setImage("");
      });
  };
  return {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  };
}
