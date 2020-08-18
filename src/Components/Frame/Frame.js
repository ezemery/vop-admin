import { Layout, Menu, Icon } from 'antd';
import React, {useState} from 'react';
import Intercom from 'react-intercom';
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {FrameContainer} from './styles'
import {UserStore} from "../../Context/store"

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {findUserInUsersById} from "../../services";

const { Header, Content, Footer, Sider } = Layout;

const Frame = (props) => {
  const { userId, accountId } = useParams();
  const {users} = React.useContext(UserStore);
  const user = findUserInUsersById(users, userId)
  const [toggle, setToggle] = useState(false)
  const appID = "rlquh92b";

  console.log(users, user, userId)

  const toggleClick = () => {
    setToggle(!toggle);
  }
  let location = useLocation();
  const history = useHistory();



  const logout = () => {
    fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      history.push('/login');
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  };

  return (
  <FrameContainer>
    <Layout className="min-height">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onBreakpoint={broken => {
          if(broken){
            toggleClick();
          }
        }}

        collapsible
        collapsed={toggle}
        className="slider"
        >

        <div className="logo">
          <img src="/vop-black-300.png" alt="Vop Logo"/>
        </div>

        <Menu selectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/">
            <Icon type="check" />
            <span>Awaiting Approval</span>
            <Link to={`/user/id/${userId}/account/id/${accountId}/`} />
          </Menu.Item>
          <Menu.Item key="/manage">
            <Icon type="edit" />
            <span>Manage Content</span>
            <Link to={`/user/id/${userId}/account/id/${accountId}/manage`} />
          </Menu.Item>
          <Menu.Item key="/embed">
            <Icon type="export" />
            <span>Embed</span>
            <Link to={`/user/id/${userId}/account/id/${accountId}/embed`} />
          </Menu.Item>
          <Menu.Item key="/settings">
            <Icon type="setting" />
            <span>Settings</span>
            <Link to={`/user/id/${userId}/account/id/${accountId}/settings`} />
          </Menu.Item>
          <Menu.Item key="5" onClick={logout}>
            <Icon type="user" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header  style={{ padding: 0,  background: '#fff' }}>
              {React.createElement(toggle ? MenuUnfoldOutlined : MenuFoldOutlined, {
                style: { fontSize: "18px", lineHeight: "64px", padding: "0 24px", cursor: "pointer", transition: "color 0.3s"},
                onClick: toggleClick,
              })}
          </Header>
          <Content className="content">
            {React.cloneElement(props.children, { user: user })}
          </Content>
        <Footer className="text-align">Vop ©2020. Made with <span role="img" aria-label="love">❤️</span> in SF</Footer>
      </Layout>
      { user ? <Intercom appID={appID} {...{
        user_id: user.id,
        email: user.email,
        name: user.username
      }}/> : <></> }

    </Layout>
    </FrameContainer>
  );

};

export default Frame;


