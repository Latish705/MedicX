import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (image: string) => {
  try {
    const result = await cloudinary.uploader.upload(image).then((res) => {
      return res;
    });
  } catch (error) {
    console.error("Upload Error:", error);
  }
};

export default uploadImage;
