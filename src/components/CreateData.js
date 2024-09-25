import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateData = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    tPrefix: "",
    tfName: "",
    tlName: "",
    ePrefix: "",
    efName: "",
    elName: "",
    dateOfBirth: "",
    religion: "",
    address: "",
  });
  const [error, setError] = useState(null); // To handle errors
  const [dateError, setDateError] = useState(""); // To handle date errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "dateOfBirth") {
      validateDate(value);
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Basic check for YYYY-MM-DD format
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const [year, month, day] = dateString.split("-").map(Number);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const validateDate = (dateString) => {
    if (!isValidDate(dateString)) {
      setDateError("Invalid date. Please enter a valid date.");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateError) {
      setError("Please fix the errors before submitting.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/api/data", formData);
      setFormData({
        idNumber: "",
        tPrefix: "",
        tfName: "",
        tlName: "",
        ePrefix: "",
        efName: "",
        elName: "",
        dateOfBirth: "",
        religion: "",
        address: "",
      }); // Clear form on success
      navigate("/");
    } catch (error) {
      setError("Error submitting form. Please try again."); // Set error message
      console.error("Error submitting form", error);
    }
  };

  const date = new Date().toISOString().split("T")[0];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        กรอกข้อมูลบัตรประชาชน
      </h1>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
      {dateError && <p className="text-red-500">{dateError}</p>}{" "}
      {/* Display date error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="idNumber">เลขประจำตัวบัตรประชาชน</label>
          <input
            type="number"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            min={1000000000000} // Minimum 13 digits
            max={9999999999999} // Maximum 13 digits
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tPrefix">คำนำหน้า</label>
          <select
            name="tPrefix"
            id="tPrefix"
            value={formData.tPrefix}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="">โปรดเลือกคำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นางสาว">นางสาว</option>
            <option value="นาง">นาง</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tfName">ชื่อจริง</label>
          <input
            type="text"
            id="tfName"
            name="tfName"
            value={formData.tfName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tlName">นามสกุล</label>
          <input
            type="text"
            id="tlName"
            name="tlName"
            value={formData.tlName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ePrefix">Prefix</label>
          <select
            name="ePrefix"
            id="ePrefix"
            value={formData.ePrefix}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select a prefix</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="efName">First name</label>
          <input
            type="text"
            id="efName"
            name="efName"
            value={formData.efName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="elName">Last name</label>
          <input
            type="text"
            id="elName"
            name="elName"
            value={formData.elName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth">เกิดวันที่</label>
          <input
            max={date}
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="religion">ศาสนา</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address">ที่อยู่</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
            maxLength={200}
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          ยืนยัน
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white p-2 rounded ml-2"
        >
          ยกเลิก
        </button>
      </form>
    </div>
  );
};

export default CreateData;




