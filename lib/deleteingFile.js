import { supabase } from "./supabase";

export const deleteFile = async (filePath) => {
  try {
    const urlObj = new URL(filePath);

    // Extract the pathname from the URL
    const pathname = urlObj.pathname; // '/storage/v1/object/public/only%20for%20upload//1740301096050.mp4'

    // Decode the pathname to handle URL-encoded characters
    const decodedPathname = decodeURIComponent(pathname); // '/storage/v1/object/public/only for upload//1740301096050.mp4'

    // Split the pathname into segments
    const segments = decodedPathname.split("/");

    // The last segment is the filename
    const filename = segments.pop(); // '1740301096050.mp4
    console.log(filename);
    const { error } = await supabase.storage
      .from("only for upload")
      .remove([filename]);

    if (error) {
      console.error("Error deleting file:", error.message);
    } else {
      console.log("File deleted successfully!");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
