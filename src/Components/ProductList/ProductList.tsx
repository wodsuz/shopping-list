import React from "react";
import Header from "../Header";

const ProductList = (props: any) => {
  console.log("p: " + props.checkedState);
  return (
    <div>
      <p>{props.checkedState}</p>
    </div>
  );
};

export default ProductList;
