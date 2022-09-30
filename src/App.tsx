import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

import { useState, useCallback } from "react";
import products from "./data/products.json";
import { DeleteFilled } from "@ant-design/icons";
import {
  Image,
  List,
  Descriptions,
  PageHeader,
  Button,
  Checkbox,
  Input,
  notification,
  Tooltip,
} from "antd";
import { IProducts } from "./types";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(products.products.length).fill(false)
  );
  const [items, setItems] = useState<IProducts[]>([]);

  const [listBtnLoading, setListBtnLoading] = useState(false);
  const [enableListBtn, setEnableListBtn] = useState(false);

  const allProducts: IProducts[] = products.products;
  let searchedProducts: IProducts[] = [];

  const handleCheck = useCallback(
    (id: number) => {
      const updatedCheckedState = checkedState.map(
        (state, index) => (index === id ? !state : state) //convert state for checkBox.
      );
      if (updatedCheckedState.includes(true)) {
        setEnableListBtn(true);
      } else {
        setEnableListBtn(false);
      }
      setCheckedState(updatedCheckedState);
    },
    [checkedState]
  );

  const handleDelete = useCallback(() => {
    setCheckedState(new Array(products.products.length).fill(false));
  }, []);

  const handleAddtoList = useCallback(() => {
    setListBtnLoading(true);
    let displayText = "";
    let counter = 0;

    checkedState.map((state: boolean, index) => {
      if (state) {
        displayText = displayText + products.products[index].title + " , ";
        counter++;
      }
      return counter;
    });

    notification.success({
      message: <>{counter} Item(s) added to your list</>,
      description: (
        <>
          <b> {displayText} </b>
          <br /> has been added to your list.
        </>
      ),
    });
    setListBtnLoading(false);
  }, [checkedState, setListBtnLoading]);

  const handleSearchProduct = (keyword: string) => {
    searchedProducts = [];

    allProducts.map((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
        ? searchedProducts.push(product)
        : ""
    );

    setItems(searchedProducts);
  };

  return (
    <Container>
      <div>
        <PageHeader
          avatar={{ src: "fallback.png" }}
          ghost={false}
          onBack={() => window.history.back()}
          title="Shopping List"
          className="header"
          extra={[
            <Button
              key="3"
              className="delete"
              icon={<DeleteFilled style={{ fontSize: "150%" }} />}
              size="large"
              onClick={() => handleDelete()}
            ></Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Created by">
              Ongun Demirag
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(product, index) => (
          <List.Item onClick={() => handleCheck(index)}>
            <List.Item.Meta
              avatar={
                <Image
                  width={64}
                  src={product.base64Image}
                  fallback="fallback.png"
                  preview={false}
                />
              }
              title={product.title}
              description={
                <>
                  <Tooltip
                    title={product.description}
                    color={"#444444"}
                    key={index}
                    mouseLeaveDelay={0}
                  >
                    {product.description.substring(0, 100) + "..."}
                  </Tooltip>
                </>
              }
            />

            <Checkbox
              className="checkbox"
              checked={checkedState[index]}
            ></Checkbox>
          </List.Item>
        )}
      />

      <Input
        placeholder="Enter product name or description"
        onChange={(e: any) => handleSearchProduct(e.target.value)}
      />
      <Button
        type="primary"
        block
        className="addListbtn"
        onClick={handleAddtoList}
        loading={listBtnLoading}
        disabled={!enableListBtn}
      >
        Add to List
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;

  .header {
    border: 1px solid rgb(235, 237, 240);
    background-color: #777777;
  }
  .ant-page-header-heading-title,
  .ant-descriptions-item-label,
  .ant-descriptions-item-content {
    color: #ffffff;
  }
  .delete {
    color: #ffffff;
    background-color: #777777;
    border: none;
  }
  .ant-page-header-back-button {
    color: #ffffff;
  }
  .ant-list-item-meta-avatar {
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #444444;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #444444 !important;
    border: none;
  }
  .ant-checkbox {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.5); /* IE */
    -moz-transform: scale(1.5); /* FF */
    -webkit-transform: scale(1.5); /* Safari and Chrome */
    -o-transform: scale(1.5); /* Opera */
    transform: scale(1.5);
    padding: 10px;
  }
  .addListbtn,
  .addListbtn:hover,
  .addListbtn:focus {
    border: none;
    margin-top: 20px;
    color: #ffffff;
    background-color: #777777;
  }
`;

export default App;
