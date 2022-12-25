import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://books.up.railway.app/books");
        let result = res.data.find((item) => item.id == bookId);
        setBook(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://books.up.railway.app/books/" + bookId, book);
      navigate("/");
      console.log("Updateed successfully");
      Swal.fire({
        title: "Book updated successfully!",
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
    <div className="p-4 flex flex-col justify-center items-center h-screen ">
      <form
        onSubmit={updateBook}
        className="flex flex-col justify-center items-center gap-3"
      >
        <h1
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="font-bold text-3xl my-3 border-b-2 border-orange-500 shadow-lg shadow-black"
        >
          Update the book
        </h1>
        <input
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="200"
          name="title"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="text"
          placeholder="Title"
          value={book.title}
        />
        <input
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
          name="author"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="text"
          placeholder="Author"
          value={book.author}
        />
        <textarea
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="400"
          name="description"
          onChange={handleChange}
          className="w-[250px] py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black "
          type="text"
          placeholder="Description"
          rows={4}
          value={book.description}
        />

        <input
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="500"
          name="price"
          onChange={handleChange}
          className="py-1 px-2 bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 outline-none focus:border-b-2 focus:border-orange-500 shadow-lg shadow-black w-[250px] h-[40px]"
          type="number"
          placeholder="Price"
          value={book.price}
        />
        <button
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="600"
          className="my-2 text-lg bg-transparent text-white px-5 py-1 hover:bg-orange-500 border-orange-500 border-2 duration-300 shadow-lg shadow-black"
        >
          Update it!
        </button>
      </form>
    </div>
  );
};

export default Update;
