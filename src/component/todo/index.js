import React from "react";
import axios from "axios";
import "../../index.css";
import moment from "moment";
import {
  Layout,
  Col,
  Table,
  Button,
  Space,
  Card,
  Row,
  Modal,
  Input,
  Form,
  Select
} from "antd";
import "antd/dist/antd.css";

const { Content } = Layout;
const { Column } = Table;

class listtodo extends React.Component {
  state = {
    data: [],
    nowDate: "",
    modal: false,
    title: "",
    description: "",
    status: 0
  };

  componentDidMount = async () => {
    let date = moment().format("YYYY-MM-DD");
    this.setState({ nowDate: date });
    let res = await axios
      .get(`http://localhost:3000/todo/${encodeURIComponent(date)}`)
      .then(function(response) {
        //let setData = response.data
        return response.data;
      })
      .catch(function(error) {
        return error.response;
      });

    if (res !== undefined) {
      res.map((value, index) => {
        res[index]["No"] = index + 1;
        if (value.status === 0) {
          res[index]["status"] = "Panning";
        } else {
          res[index]["status"] = "Done";
        }
      });
      this.setState({ data: res });
    } else {
      this.setState({ data: [] });
    }
    //console.log(res);
  };

  updateTodo = async e => {
    console.log("updateTodo", e.target.value);
    let res = await axios
      .put(
        `http://localhost:3000/todo/update/${encodeURIComponent(
          e.target.value
        )}`
      )
      .then(async function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response;
      });

    if (res.status !== 500) {
      window.location.reload();
    }
  };

  deleteTodo = async e => {
    console.log("deleteTodo", e.target.value);
    let res = await axios
      .delete(
        `http://localhost:3000/todo/delete/${encodeURIComponent(
          e.target.value
        )}`
      )
      .then(async function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response;
      });
    console.log(res);
    if (res.status !== 500) {
      window.location.reload();
    }
  };

  createTodo = () => {
    this.setState({ modal: true });
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handledescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  handleStatusChange = e => {
    this.setState({ status: e });
  };
  saveTodo = async () => {
    let res = await axios
      .post(`http://localhost:3000/todo/create`, {
        title: this.state.title,
        des: this.state.description,
        status: this.state.status,
        group: moment().format("YYYY-MM-DD")
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error.response;
      });

    if (res) {
      window.location.reload();
      console.log(res);
    }
  };
  backmenu = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <Col span={24}>
        {/* Start Body content */}
        <Content style={{ margin: "10px 0px 0px 0px" }}>
          <Card
            title={"Todo  :" + this.state.nowDate}
            style={{ width: "100%" }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 24, height: "100%" }}
            >
              <Row gutter={[48, 8]}>
                <Col span={6}>
                  <Button
                    //href="/create"
                    type="default"
                    style={{
                      padding: 5,
                      fontWeight: 500,
                      backgroundColor: "#f4b440",
                      borderRadius: "2px"
                    }}
                    onClick={this.createTodo}
                  >
                    Create New Todo
                  </Button>
                </Col>
              </Row>

              <br />
              <Table
                size="middle"
                scroll={{ x: 240 }}
                dataSource={this.state.data}
                bordered={true}
                className="index-table"
              >
                <Column title="No" dataIndex="No" key="No" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Des" dataIndex="des" key="des" />
                <Column title="Status" dataIndex="status" key="status" />

                <Column
                  title="Action"
                  key="Action"
                  render={(text, record) => (
                    <Space size="middle">
                      <Col span={8}>
                        <Form.Item>
                          {console.log(text._id)}
                          <Button
                            className="submit-button"
                            type="default"
                            htmlType="submit"
                            onClick={this.updateTodo}
                            style={{
                              backgroundColor: "#00ff00"
                            }}
                            value={text._id}
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item>
                          <Button
                            className="cancel-button"
                            type="default"
                            htmlType="submit"
                            onClick={this.deleteTodo}
                            style={{
                              backgroundColor: "#ff7875"
                            }}
                            value={text._id}
                          >
                            Delete
                          </Button>
                        </Form.Item>
                      </Col>
                    </Space>
                  )}
                />
              </Table>

              <Space>
                <Modal
                  visible={this.state.modal}
                  footer=""
                  closable={false}
                  cancelText="Back"
                  //className="modal-confirm"
                >
                  <h3 className="content-header">Create Todo List</h3>
                  <Form layout="vertical">
                    <Form.Item
                      label="Title"
                      name="Title"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Message Title!"
                        }
                      ]}
                    >
                      <Input
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Message Description!"
                        }
                      ]}
                    >
                      <Input
                        value={this.state.description}
                        onChange={this.handledescriptionChange}
                      />
                    </Form.Item>
                    <Form.Item label="status" name="status">
                      <Select
                        style={{ marginTop: 5, textAlign: "center" }}
                        onChange={this.handleStatusChange}
                        placeholder="Select Progress Status"
                      >
                        <Select.Option value="0">Todo</Select.Option>
                        <Select.Option value="10">Done</Select.Option>
                      </Select>
                    </Form.Item>

                    <Row gutter={[4, 4]}>
                      <Col span={12}>
                        <Form.Item>
                          <Button
                            className="submit-button"
                            type="default"
                            htmlType="submit"
                            onClick={this.saveTodo}
                            style={{
                              backgroundColor: "#00ff00"
                            }}
                          >
                            Save
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item>
                          <Button
                            className="cancel-button"
                            type="default"
                            onClick={this.backmenu}
                            style={{
                              backgroundColor: "#ff7875"
                            }}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
              </Space>
            </div>
          </Card>
        </Content>
        {/* End Body content */}
      </Col>
    );
  }
}
export default listtodo;
