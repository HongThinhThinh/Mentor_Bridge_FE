export const downloadBase64File = (base64Data: string, fileName: string) => {
  try {
    // Ensure the correct MIME type for DOCX files
    const mimeType = fileName.endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/octet-stream";

    // Remove any "data:" prefix if present
    const base64 = base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data;

    // Decode base64 string to binary data
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Create a blob with the specified MIME type
    const blob = new Blob([byteArray], { type: mimeType });

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append, click, and remove the link element
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the object URL after download
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};
