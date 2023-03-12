import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "../css/Rmbg.css";
import RmbgCard from "../components/RmbgCard";
import { nanoid } from "nanoid";

function Rmbg() {
  const [rmbgData, setRmbgData] = useState([]);
  const [completeRmbg, setCompleteRmbg] = useState(false);

  useEffect(() => {
    console.log(rmbgData);
    console.log(completeRmbg);
  }, [rmbgData, completeRmbg]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("myfile", file);
    });
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setRmbgData(data["rmbg_data"]);
      setCompleteRmbg(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const results = rmbgData.map((item) => {
    return <RmbgCard key={nanoid()} item={item} />;
  });

  // 渲染组件
  return (
    <div className="rmbg">
      <div className="input-box" {...getRootProps()}>
        <input {...getInputProps()} />

        {isDragActive ? (
          <div className="input-box-text">Drop Image Here</div>
        ) : (
          <div className="input-box-text">
            <div>Drag Image Here</div>
            <div>-- or --</div>
            <div>Click to Upload</div>
          </div>
        )}
      </div>
      {setCompleteRmbg && <div className="results">{results}</div>}
    </div>
  );
}

export default Rmbg;
