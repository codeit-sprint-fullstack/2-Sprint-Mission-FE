import React, { useState } from "react";
import Header from "../Default/Header";
import Footer from "../Default/Footer";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Header />

      <Footer />
    </div>
  );
};

export default Registration;
