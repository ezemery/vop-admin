import {Tag} from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import {Col, Row} from "react-flexbox-grid";
import SetupUsername from "../Setup/SetupUsername";
import SetupTags from "../Setup/SetupTags";
import {UserStore} from "../../Context/store";

const Settings = (props) => {
    const {user,fetchUserDataAsync} = React.useContext(UserStore);
    const [usernameSaved, setUsernameSaved] = useState(false);
    const [tagsSaved, setTagsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initialTags, setInitialTags] = useState([]);

    useEffect(() => {
        fetchUserDataAsync();
         setLoading(false);
      }, [fetchUserDataAsync]);

    useEffect(() => {
        user.tags && setInitialTags(user.tags.map(tag => {return {tag: tag, views: 0, videos: 0}}))
    }, [user]);

    console.log("initialTags", initialTags)

    const usernameComplete = () => setUsernameSaved(true);
    const tagsComplete = () => setTagsSaved(true);

    return (
        <div hidden={loading}>
            <Row>
                <Col lg={24} xs={12}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={12}>
                    <SetupUsername username={user.username} complete={usernameComplete} key={user.username}/>
                </Col>
                <Col lg={24} xs={12} hidden={!usernameSaved}>
                    <Tag color="green">Saved</Tag>
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={12}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={12}>
                    <SetupTags initialTags={initialTags} complete={tagsComplete} key={initialTags}/>
                </Col>
                <Col lg={24} xs={12} hidden={!tagsSaved}>
                    <Tag color="green">Saved</Tag>
                </Col>
            </Row>
        </div>
    );

};

export default Settings;