import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ViewData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/data/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/data/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="container max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">แสดงข้อมูล</h1>
        {data ? (
          <div>
            <p className="mb-2">เลขที่บัตรประชาชน: {data.idNumber}</p>
            <p className="mb-2">คำนำหน้า: {data.tPrefix}</p>
            <p className="mb-2">ชื่อจริง: {data.tfName}</p>
            <p className="mb-2">นามสกุล: {data.tlName}</p>
            <p className="mb-2">Prefix: {data.ePrefix}</p>
            <p className="mb-2">First name: {data.efName}</p>
            <p className="mb-2">Last name: {data.elName}</p>
            <p className="mb-2">เกิดวันที่ (วัน/เดือน/ปี): {formatDate(data.dateOfBirth)}</p>
            <p className="mb-2">ศาสนา: {data.religion}</p>
            <p className="mb-2">ที่อยู่: {data.address}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4 flex justify-center space-x-2">
          <Link to={`/edit/${id}`} className="bg-yellow-500 text-white p-2 rounded">
            แก้ไข
          </Link>
          <button className="bg-gray-500 text-white p-2 rounded" onClick={handleCancel}>
            ย้อนกลับ
          </button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={handleDelete}>
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewData;





