import React, { useEffect, useState } from "react";
import { Button, Loading } from "../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import TransactionPieChart from "./PieChart";

function Transactions() {
  const [allPosts, setAllPosts] = useState([]);
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    try {
      axios.get('http://localhost:5000/Task/api/get/transaction', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((res) => {
        if (res.data.status) {
          setAllPosts(res?.data?.data);
        }
      }).catch((error) => {
        toast.error(error.response?.data?.message || "Fetch data failed", {
          position: "top-right",
        });
      })
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-2/3 lg:w-3/4">
        <div className="flex justify-center">
          <Link to="/app/add-transaction">
            <Button className="my-3 px-5">
              Add Transaction
            </Button>
          </Link>
        </div>
        {allPosts.length > 0 ? (
          <div className="all-blogs flex flex-wrap justify-center gap-8 items-center mt-10">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full table-auto border">
                <thead className="bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {allPosts.map((item, index) => (
                    <tr className="border" key={index}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2">{item?.type}</td>
                      <td className={`px-4 py-2 ${item?.type === "income" ? "text-green-400" : "text-red-400"}`}>{item?.amount}</td>
                      <td className="px-4 py-2">{item?.description}</td>
                      <td className="px-4 py-2">{item?.category}</td>
                      <td className="px-4 py-2">{item?.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </div>
      <div className="md:w-1/3 lg:w-1/4 my-0 md:my-24">
        <TransactionPieChart data={allPosts} />
      </div>
    </div>
  );
}

export default Transactions;
