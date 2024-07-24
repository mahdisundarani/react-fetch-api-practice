import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

const TableContainer = () => {
  const API = "https://dummyjson.com/products";

  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    rating: "",
  });

  const fetchApi = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.products.length > 0) {
        setDataSource(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dataSource);
  
  useEffect(() => {
    fetchApi(API);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const showModal = (mode,record) => {
    setModalMode(mode);
    if(mode === 'edit'){
      setEditingProductId(record.id);
      setFormData(record);
    }else{
      setFormData({
        // If adding mode, clear the form fields
        title: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
      });
    }

    setIsModalVisible(true);
  };
  
  const handleSubmit = (mode,record) =>{
    console.log(mode)
    // setModalMode(mode);
    if (modalMode === 'add') {
      const newProduct = {
       id: Math.floor(Math.random() * 100),
       ...formData
     }    
     setDataSource([...dataSource,newProduct]);
    }else if(modalMode === 'edit'){
      const updatedDataSource = dataSource.map((item)=> item.id===editingProductId ? {...item,...formData} : item)
      setDataSource(updatedDataSource);
    } 
    setIsModalVisible(false)
  }

  const onDeleteProduct = (record) => {
    const updatedDataSource = dataSource.filter(
      (item) => item.id !== record.id
    );
    setDataSource(updatedDataSource);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <DeleteOutlined onClick={() => {onDeleteProduct(record)}} />
            <EditOutlined onClick={() => {showModal("edit", record)}} />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="pb-2 pt-5 text-lg font-bold">Table Container</div>
      <div className="ml-auto mr-3 w-fit">
        <Button
          className="primary"
          onClick={() => {
            showModal("add");
          }}
        >
          Add Product
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
      />

      <Modal
        title={modalMode === "add" ? "Add Product" : "Edit Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            type="text"
            name="title"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="brand"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="price"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="rating"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <Button
          key="cancel"
          onClick={handleCancel}
          className="mx-2"
        >
          Cancel
        </Button>

        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default TableContainer;
