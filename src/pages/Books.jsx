import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://books.up.railway.app/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#11294e",
      color: "#feebc8",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#11294e",
          color: "#feebc8",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        try {
          axios.delete("https://books.up.railway.app/books/" + id);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-2">
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay=""
          className="font-bold text-3xl my-6 mx-3 border-b-4 border-b-orange-500 p-1 text-center"
        >
          Books info
        </h1>
        <div className="flex flex-wrap items-start justify-center mb-12 ">
          {books.map((book, key) => (
            // ! <------ CARD ------>
            <div
              data-aos="fade-up"
              data-aos-duration="1300"
              data-aos-delay="100"
            >
              <div
                key={key}
                className="flex flex-col w-[250px] text-center mb-3 justify-between items-center text-lg bg-[var(--colorBlue)] hover:bg-[var(--colorLightBlue)] duration-300 rounded mx-1 p-2 shadow-lg shadow-black"
              >
                <h2 className="font-bold text-xl pt-3">" {book.title} "</h2>
                <h2 className=" text-sm pt-3">Author: {book.author}</h2>
                <div className="flex flex-col w-full p-3">
                  <span className="text-sm border-b-2 border-orange-500 w-full text-left">
                    Synopsis:
                  </span>
                  <p className="text-xs text-justify my-3">
                    {book.description}
                  </p>
                  <span className="border-t-2 border-orange-500"></span>
                </div>
                {book.id === 1 && (
                  <a
                    href="https://portfolio-agustincruz.vercel.app/"
                    target="_blank"
                    className="text-sm px-2 text-white border-2 border-orange-500 shadow-md shadow-black hover:bg-orange-500 duration-300 "
                  >
                    Portfolio
                  </a>
                )}
                {/*//! <---- CARD FOOTER ---->  */}
                <div className="my-2 flex flex-col">
                  <span className="font-bold text-orange-200">
                    ${book.price.toFixed(2)}
                  </span>
                  {/*//! <---- Buttons ----> */}
                  <div className="flex gap-2">
                    <button
                      className={
                        book.id === 1 || book.id === 14
                          ? "hidden"
                          : "border-2 px-2 my-1 text-sm text-white bg-transparent border-orange-500 hover:bg-orange-500  shadow-md shadow-black duration-300"
                      }
                    >
                      <Link to={`/update/${book.id}`}>Update</Link>
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className={
                        book.id === 1 || book.id === 14
                          ? "hidden"
                          : "border-2 px-2 my-1 text-sm text-white bg-transparent border-red-500 hover:bg-red-500 shadow-md shadow-black duration-300"
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            //!------------------------->
          ))}
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay=""
          data-aos-offset="0"
          className="flex fixed bottom-0 bg-[var(--colorDarkBlue)] w-full flex-col justify-center items-center"
        >
          <button className=" border-orange-500 border-2 px-4 my-2 bg-transparent text-white hover:bg-orange-500  text-lg shadow-md shadow-black duration-300">
            <Link to="/add">Add new book</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
