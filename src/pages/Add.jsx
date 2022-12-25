import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://books.up.railway.app/books", book);
      navigate("/");
      console.log("Added successfully");
      Swal.fire({
        title: "Book added successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#11294e",
        color: "#feebc8",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={addBook}
        className="flex flex-col justify-center items-center gap-3 "
      >
        <h1
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="font-bold text-3xl my-3 border-b-2 border-orange-500 shadow-lg shadow-black"
        >
          Add a new book
        </h1>
        <input
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="200"
          required
          name="title"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="text"
          placeholder="Title"
        />
        <input
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
          required
          name="author"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="text"
          placeholder="Author"
        />
        <textarea
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="400"
          required
          name="description"
          onChange={handleChange}
          className="w-[250px] py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black "
          type="text"
          placeholder="Description"
          rows={3}
        />

        <input
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="500"
          required
          name="price"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="number"
          placeholder="Price"
        />
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <button className="my-2 text-lg bg-transparent text-white px-5 py-1 hover:bg-orange-500 border-orange-500 border-2 duration-300 shadow-lg shadow-black">
            Add it!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
