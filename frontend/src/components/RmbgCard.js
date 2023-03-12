import React from "react";
import "../css/RmbgCard.css";

function RmbgCard(props) {
  function downloadImage(imageData, imageName) {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      const pngURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngURL;
      downloadLink.download = imageName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = imageData;
  }

  return (
    <div className="rmbg-card">
      <div className="image-sections-container">
        <div className="image-section">
          <div className="image-title">Orginal</div>
          <div className="image-container">
            <img src={`data:image/png;base64,${props.item.orginal}`} />
          </div>
          <div
            className="download-btn"
            onClick={() =>
              downloadImage(
                `data:image/png;base64,${props.item.orginal}`,
                "orginal.png"
              )
            }
          >
            Download as PNG
          </div>
        </div>
        <div className="image-section">
          <div className="image-title">Removed Background</div>
          <div className="image-container">
            <img src={`data:image/png;base64,${props.item.rmbg}`} />
          </div>
          <div
            className="download-btn"
            onClick={() =>
              downloadImage(
                `data:image/png;base64,${props.item.rmbg}`,
                "rmbg.png"
              )
            }
          >
            Download as PNG
          </div>
        </div>
        <div className="image-section">
          <div className="image-title">Mask</div>
          <div className="image-container">
            <img src={`data:image/png;base64,${props.item.mask}`} />
          </div>
          <div
            className="download-btn"
            onClick={() =>
              downloadImage(
                `data:image/png;base64,${props.item.mask}`,
                "mask.png"
              )
            }
          >
            Download as PNG
          </div>
        </div>
      </div>
      <div className="delete-btn-wrapper">
        {" "}
        <div className="delte-btn">✖️</div>
      </div>
    </div>
  );
}

export default RmbgCard;
