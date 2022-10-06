import { Descriptions, PageHeader, Button } from "antd";
import { useState, useCallback } from "react";

import { DeleteFilled } from "@ant-design/icons";
import { Products } from "../../constants";

export const Header = (props: any) => {
  const [checkedState, setCheckedState] = useState(
    new Array(Products.length).fill(false)
  );

  const handleDelete = useCallback(() => {
    setCheckedState(new Array(Products.length).fill(false));
    props.onDeleteAll(checkedState);
  }, [checkedState, props]);

  return (
    <div>
      <>
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
              Ongun Demirag (c)
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </>
    </div>
  );
};

export default Header;
