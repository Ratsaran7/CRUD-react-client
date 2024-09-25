import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
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

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/data/${id}`);
      // Ensure the date format is yyyy-mm-dd for input type="date"
      const formattedDate = new Date(response.data.dateOfBirth).toISOString().split('T')[0];
      setData({
        ...response.data,
        dateOfBirth: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to save these changes?");
    if (confirmed) {
      try {
        // Create a copy of data excluding idNumber
        const { idNumber, ...dataToUpdate } = data;
        await axios.put(`http://localhost:3001/api/data/${id}`, dataToUpdate);
        navigate("/");  // Redirect to HomePage after successful update
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="container max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">แก้ไขข้อมูล</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">เลขที่บัตรประชาชน</label>
            <p className="border rounded p-2 w-full bg-gray-100">{data.idNumber}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">คำนำหน้า</label>
            <select
              name="tPrefix"
              value={data.tPrefix}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="" disabled>Select Prefix</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">ชื่อจริง</label>
            <input
              type="text"
              name="tfName"
              value={data.tfName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">นามสกุล</label>
            <input
              type="text"
              name="tlName"
              value={data.tlName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Prefix (English)</label>
            <select
              name="ePrefix"
              value={data.ePrefix}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="" disabled>Select Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="efName"
              value={data.efName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="elName"
              value={data.elName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">เกิดวันที่</label>
            <input
              type="date"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">ศาสนา</label>
            <input
              type="text"
              name="religion"
              value={data.religion}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">ที่อยู่</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">บันทึก</button>
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded">ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditData;


