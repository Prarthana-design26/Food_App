import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {

  const [List, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log("API Response:", response.data);

      // ✅ Check and set correct data
      if (response.data.success && Array.isArray(response.data.data.foods)) {
        setList(response.data.data.foods); // ✅ Fixed from .food to .data
      } else {
        toast.error("Data fetch error or invalid format.");
      }
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message || err);
      toast.error("Server error");
      // console.error(err);
    }
  };

  const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { _id: foodId });

    if (response.data.success) {
      toast.success(response.data.message || "Item deleted");
      await fetchList(); // move after toast
    } else {
      toast.error(response.data.message || "Failed to delete");
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error("Server error during deletion");
  }
};



  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {Array.isArray(List) && List.map((item, index) => (
          <div className="list-table-format" key={item._id || index}>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
