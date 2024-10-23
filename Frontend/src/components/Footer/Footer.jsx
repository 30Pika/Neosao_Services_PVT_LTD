import React from "react";
import StyledText from "../StyledText";
import { FaInstagram, FaLinkedinIn, FaRegCopyright } from "react-icons/fa";
import Container from "../Container";
import { FiGithub } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";

function Footer() {
  return (
    <div className="bg-slate-800/50 py-1">
      <Container className="flex justify-around items-center">
        <div className="flex items-center gap-2">
          <FaRegCopyright className="text-xl text-purple-300" />
          <StyledText className="font-semibold text-xl">Neo-Wallet</StyledText>
        </div>
        <div className="links text-xl flex gap-6 justify-center">
          Manage your transactions & money.
        </div>
      </Container>
    </div>
  );
}

export default Footer;
