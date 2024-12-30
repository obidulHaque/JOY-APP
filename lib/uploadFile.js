import { supabase } from "./supabase";

import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export const uploadFile = async (fileUri) => {
  try {
    const fileExt = fileUri.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    console.log(fileName);
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { data, error } = await supabase.storage
      .from("only for upload")
      .upload(fileName, Buffer.from(fileContent, "base64"), {
        contentType: `image/${fileExt}`,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const publicUrl = supabase.storage
      .from("only for upload")
      .getPublicUrl(fileName);

    return publicUrl.data.publicUrl;
  } catch (err) {
    console.error("Error uploading file:", err);
    return null;
  }
};
