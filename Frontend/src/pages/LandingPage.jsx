import React from "react";
import { StyledText } from "../components/";
import img from "../assets/bg.gif";
import { Link } from "react-router-dom";
import { FaRightLong } from "react-icons/fa6";

function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(45deg, #110022cc, #0005), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-screen flex items-center px-40 sm:px-10 justify-center  backdrop-blur-xl ">
        <div className="flex sm:flex-col items-center justify-center gap-x-10 gap-y-20 sm:gap-20 flex-wrap">
          <div className="left">
            <h1 className="text-9xl sm:text-7xl">
              <StyledText>Neo-Wallet</StyledText>
            </h1>
            <h3 className="text-4xl sm:text-3xl font-bold mt-12 sm:mt-5">
              Manage your{" "}
              <StyledText className="text-5xl sm:text-4xl">
                transactions
              </StyledText>{" "}
              & money.
            </h3>
          </div>
          <div className="right">
            <Link
              to="/app/login"
              className="text-2xl font-bold bg-slate-800/50 py-3 px-12 rounded-2xl border transition-all duration-500 hover:bg-purple-400/40"
            >
              Get Started <FaRightLong className="inline text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
