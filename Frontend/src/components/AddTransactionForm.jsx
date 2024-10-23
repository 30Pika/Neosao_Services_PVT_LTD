import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

function AddTransactionForm() {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const [btnLoad, setBtnLoad] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
    date: "",
  });

  const categoryNames = [
    "Salary",
    "Investments",
    "Business",
    "Savings",
    "Rent",
    "Utilities",
    "Groceries",
    "Entertainment",
    "Travel",
    "Healthcare"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = async () => {
    setBtnLoad(true);
    const currentTime = new Date().toISOString();

    const uploadData = {
      ...formData,
      time: currentTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/Task/api/transaction",
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.data.status) {
        toast.success("Transaction added!", { position: "top-right" });
        navigate("/app/transactions/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add transaction", {
        position: "top-right",
      });
    } finally {
      setBtnLoad(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md mx-auto sm:mt-2"
      onSubmit={handleSubmit(submit)}
    >
      <Input
        label="Transaction Amount:"
        type="number"
        className="mb-2"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Transaction Type:"
        options={["Income", "Expense"]}
        className="mb-2"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Category:"
        options={categoryNames}
        className="mb-2"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      />
      {/* <Input
        label="Category:"
        className="mb-2"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      /> */}
      <Input
        label="Description:"
        className="mb-2"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Transaction Date:"
        type="date"
        className="mb-2"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" className="w-full mt-5" isLoading={btnLoad}>
        {"Add Transaction"}
      </Button>
    </form>
  );
}

export default AddTransactionForm;
