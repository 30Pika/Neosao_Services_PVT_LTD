import React from "react";
import { StyledText, Title } from "../components";
import AddTransactionForm from "../components/AddTransactionForm";

function AddTransaction() {
  return (
    <div className="pb-14">
      <Title>
        Add{" "}
        <StyledText className="text-5xl tracking-wide sm:text-3xl">
          Transaction
        </StyledText>
      </Title>
      <AddTransactionForm />
    </div>
  );
}

export default AddTransaction;
