import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    linkedinID: "",
    photoURL: "",
    contactNo: "",
  });
  const [showQR, setShowQR] = useState(false);
  const cardRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleGenerate = () => {
    setShowQR(true);
  };

  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
  });

  const handleDownloadPDF = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("business_card.pdf");
    });
  };

  const userDataString = JSON.stringify(userInfo);

  return (
    <div className="App">
      <h1>QR Code Contact Info</h1>
      <div className="form-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userInfo.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedinID"
          placeholder="LinkedIn ID"
          value={userInfo.linkedinID}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          value={userInfo.photoURL}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={userInfo.contactNo}
          onChange={handleChange}
        />
        <button onClick={handleGenerate}>Generate QR Code</button>
      </div>
      {showQR && (
        <div>
          <div className="card-container" ref={cardRef}>
            <div className="qr-code-container">
              <QRCode value={userDataString} />
            </div>
            <div className="user-info">
              {userInfo.photoURL && <img src={userInfo.photoURL} alt="User" />}
              <h2>{userInfo.username}</h2>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </p>
              <p>
                <strong>LinkedIn ID:</strong>{" "}
                <a
                  href={`https://www.linkedin.com/in/${userInfo.linkedinID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userInfo.linkedinID}
                </a>
              </p>
              <p>
                <strong>Contact Number:</strong> {userInfo.contactNo}
              </p>
            </div>
          </div>
          <button onClick={handlePrint}>Print Business Card</button>
          {/* <button onClick={handleDownloadPDF}>Download as PDF</button> */}
        </div>
      )}
    </div>
  );
}

export default App;
