import Resizer from "react-image-file-resizer"; // Import the library
import { resizeImageFile } from "./resizeFileImage";


export async function myFetchImgUrlencoded<T>(url: string, img: File) {
  const resizedImage = await resizeImageFile(img);
  const base64Image = await encodeFileToBase64(resizedImage);
  const body = {}
  return await myFetch(
    url,
    "POST",
    {},
    {
      img: `${base64Image}`,
    },
    "urlencoded",
    "json"
  );

}

export default async function myFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  query: Record<string, any>,
  body: Record<string, any> | string,
  reqType: "json" | "text" | "urlencoded",
  resType: "json" | "text" | "blob",
) {
  try {
    const url_data = `${url}?${new URLSearchParams(query).toString()}`;

    let content_type = "";
    switch (reqType) {
      case "json":
        content_type = "application/json";
        break;
      case "text":
        content_type = "text/plain";
        break;
      case "urlencoded":
        content_type = "application/x-www-form-urlencoded";
        break;
    }

    const headers = {
      "Content-Type": content_type,
    };

    let body_data: string | undefined = undefined;

    if (method !== "GET") {
      switch (reqType) {
        case "json":
          body_data = JSON.stringify(body);
          break;
        case "text":
          body_data = body.toString();
          break;
        case "urlencoded":
          body_data = new URLSearchParams(body).toString();
          break;
      }
    }

    const res = await fetch(url_data, {
      method,
      headers,
      body: body_data,
    });

    switch (resType) {
      case "json":
        return await res.json() as T;
      case "text":
        return await res.text() as T;
      case "blob":
        return await res.blob() as T;
    }

  }
  catch (error) {
    console.log(`Error fetching ${url} with error ${error}`);
    return null;
  }

}


// Resize function


const encodeFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // This reads the file as a Data URL (base64 encoded)

    reader.onload = () => {
      if (reader.result) {
        // Apply encodeURIComponent to the base64 data
        const encoded = encodeURIComponent(reader.result.toString());
        resolve(encoded);
      } else {
        reject("File could not be read");
      }
    };

    reader.onerror = (error) => reject(error);
  });
};