import { saveAs } from "file-saver";

export const SaveFile = (fileUrl, fileName) => {
  
    saveAs(fileUrl, fileName)
}