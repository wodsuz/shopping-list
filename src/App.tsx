import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

import products from "./data/products.json";
import { DeleteFilled } from "@ant-design/icons";
import { Avatar, List, Descriptions, PageHeader, Button, Checkbox } from "antd";

function App() {
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
        renderItem={(product) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={64}
                  src={product.base64Image}
                  style={{ backgroundColor: "#87d068" }}
                />
              }
              title={product.title}
              description={product.description.substring(0, 50) + "..."}
            />
            <Checkbox className="checkbox"></Checkbox>
          </List.Item>
        )}
      />
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
`;

export default App;
