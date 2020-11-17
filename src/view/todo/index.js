import React from "react";
import { Layout, Col, Card } from "antd";

import View from "../../component/todo";
const { Content } = Layout;
class Index extends React.Component {
  state = {
    collapsed: false
  };
  componentDidMount() {
    //auto load after app render Success
  }

  render() {
    return (
      <React.Fragment>
        <Layout>
          <Layout className="site-layout">
            <Col span={24}>
              {/* Start Body content */}
              <Content className="site-layout-content">
                <Card style={{ width: "100%" }} className="card">
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <View></View>
                  </div>
                </Card>
              </Content>
              {/* End Body content */}
            </Col>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }
}
export default Index;
