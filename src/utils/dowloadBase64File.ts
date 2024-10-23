export const downloadBase64File = (base64Data: string, fileName: string) => {
  const decodedData = atob(base64Data);
  const blob = new Blob([decodedData], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
