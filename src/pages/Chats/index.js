import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { Layout, Menu, Avatar, Form, Input, Button } from "antd";
import "./index.css";

const { Sider, Content } = Layout;

let socket;
let CONNECTION_PORT = process.env.REACT_APP_BASE_URL;

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const [roomMessages, setRoomMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [chatIndex, setChatIndex] = useState(-1);

  const { user, userId, token } = useSelector((state) => state.account);

  let anotherUser;
  const { state } = useLocation();
  if (state) anotherUser = state.anotherUser;

  const getUserChats = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/chats/user/${userId}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setChats(result.data);

          if (anotherUser) {
            const targetUser = result.data.find((element) => {
              if (element.user1._id === userId)
                return element.user2._id === anotherUser;
              else return element.user1._id === anotherUser;
            });

            setChatIndex(result.data.indexOf(targetUser));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const connectRoom = (roomId) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/chats/${roomId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setRoomMessages(result.data);
        setMessages(result.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.emit("join_room", { userName: user, room: roomId });
  };

  const sendMessage = (e, room) => {
    const messageContent = {
      room,
      sender: userId,
      content: e.message,
    };

    console.log("messageContent :", messageContent);

    socket.emit("send_message", messageContent);
    e.message = "";
  };

  useEffect(() => {
    getUserChats();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    // eslint-disable-next-line
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages(data);
    });
  }, [roomMessages]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu theme="dark" mode="inline">
          {chats.map((chat, i) => (
            <Menu.Item
              key={chat._id}
              onClick={() => {
                setChatIndex(i);
                connectRoom(chat._id);
              }}
              icon={
                <Avatar
                  src={
                    chat.user1._id === userId
                      ? chat.user2.avatar
                      : chat.user1.avatar
                  }
                />
              }
            >
              {chat.user1._id === userId ? chat.user2.name : chat.user1.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content className="content_chat">
        {chats[chatIndex] ? (
          <div className="chatBorder">
            <div className="contentHeader">
              <Avatar
                className="avatar"
                src={
                  chats[chatIndex].user1._id === userId
                    ? chats[chatIndex].user2.avatar
                    : chats[chatIndex].user1.avatar
                }
              />
              <h1>
                {chats[chatIndex].user1._id === userId
                  ? chats[chatIndex].user2.name
                  : chats[chatIndex].user1.name}
              </h1>
            </div>
            <div className="roomContainer">
              {messages.map((message) => (
                <div key={message._id}>
                  <div
                    className={
                      message.sender === userId
                        ? "messageBoxRight"
                        : "messageBoxLeft"
                    }
                  >
                    {message.sender !== userId && (
                      <Avatar
                        className="avatar"
                        src={
                          chats[chatIndex].user1._id === userId
                            ? chats[chatIndex].user2.avatar
                            : chats[chatIndex].user1.avatar
                        }
                      />
                    )}

                    <p
                      className={
                        message.sender === userId ? "textRight" : "textLeft"
                      }
                      key={message._id}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="formContainer">
              <Form
                className="form"
                onFinish={(e) => sendMessage(e, chats[chatIndex]._id)}
              >
                <Form.Item
                  name="message"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input a message",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Button>send</Button>
              </Form>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </Content>
    </Layout>
  );
};
