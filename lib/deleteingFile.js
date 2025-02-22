import { supabase } from "./supabase";

export const deleteFile = async (url) => {
  try {
    // Extract file path from URL
    const urlParts = url.split("/storage/v1/object/public/");
    if (urlParts.length < 2) {
      console.error("Invalid video URL:", url);
      return;
    }
    const filePath = urlParts[1]; // Extract only the relative path

    console.log("Deleting video:", filePath);

    // Delete video from Supabase Storage
    const { error } = await supabase.storage.from("videos").remove([filePath]);

    if (error) {
      console.error("Error deleting video:", error);
    } else {
      console.log("Video deleted successfully!");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
