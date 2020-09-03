import {Tag} from 'antd';
import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import {Col, Row} from "react-flexbox-grid";
import {SetupUsername} from "../Setup";
import {SetupTags} from "../Setup";
import {
  Page
  } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../Context/store";
import {useParams} from "react-router-dom";
import {findUserInUsersById} from "../../services";

export const Settings = () => {
    const {user} = React.useContext(UserStore);
    const [usernameSaved, setUsernameSaved] = useState(false);
    const [tagsSaved, setTagsSaved] = useState(false);
    const [initialTags, setInitialTags] = useState([]);

    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

    useEffect(() => {
        if (user) {
            user.tags && setInitialTags(user.tags.map(tag => {return {tag: tag, views: 0, videos: 0}}))
        }
        unsetIsLoading();
    }, [user]);



    const usernameComplete = () => setUsernameSaved(true);
    const tagsComplete = () => setTagsSaved(true);

    return user ? (
        <Page fullWidth title="Settings">
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
        </Page>
    ) : <></>;

};
