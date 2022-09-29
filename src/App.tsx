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
} from "antd";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(products.products.length).fill(false)
  );

  const handleCheck = useCallback(
    (id: number) => {
      const updatedCheckedState = checkedState.map(
        (state, index) => (index === id ? !state : state) //convert state for checkBox.
      );
      setCheckedState(updatedCheckedState);
    },
    [checkedState]
  );

  const handleDelete = useCallback(() => {
    setCheckedState(new Array(products.products.length).fill(false));
  }, []);

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
        dataSource={products.products}
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
              description={product.description.substring(0, 100) + "..."}
            />
            <Checkbox
              className="checkbox"
              checked={checkedState[index]}
            ></Checkbox>
          </List.Item>
        )}
      />

      <Input placeholder="Enter product name or description" />
      <Button type="primary" block className="addListbtn">
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
  .addListbtn {
    border: none;
    margin-top: 20px;
    color: #ffffff;
    background-color: #777777;
  }
`;

export default App;
