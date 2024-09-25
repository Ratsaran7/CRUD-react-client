import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/api/data"); // ดึงข้อมูลจาก backend
    setData(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:3001/api/data/${id}`); // ส่งคำขอไปยัง backend เพื่อลบข้อมูล
        fetchData(); // รีเฟรชข้อมูลหลังจากลบ
      } catch (error) {
        console.error("Error deleting data", error);
      }
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.idNumber.includes(searchTerm) ||
      item.tfName.includes(searchTerm) ||
      item.tlName.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">ข้อมูลบัตรประชาชน</h1>
      <div className="flex justify-between mb-4">
        <Link to="/create" className="bg-blue-500 text-white p-2 rounded">สร้าง</Link>
        <p>{`จำนวนรายการข้อมูล: ${filteredData.length}`}</p>
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300 mx-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">ลำดับ</th>
            <th className="border px-4 py-2">เลขประจำตัวบัตรประชาชน</th>
            <th className="border px-4 py-2">คำนำหน้า</th>
            <th className="border px-4 py-2">ชื่อจริง</th>
            <th className="border px-4 py-2">นามสกุล</th>
            <th className="border px-4 py-2">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.idNumber}</td>
              <td className="border px-4 py-2">{item.tPrefix}</td>
              <td className="border px-4 py-2">{item.tfName}</td>
              <td className="border px-4 py-2">{item.tlName}</td>
              <td className="border px-4 py-2 text-center">
                <Link to={`/view/${item.id}`} className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center mr-2">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to={`/edit/${item.id}`} className="bg-yellow-500 text-white py-2 px-4 rounded inline-flex items-center mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded inline-flex items-center"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;

