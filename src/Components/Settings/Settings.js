import {Tag} from 'antd';
import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import {Col, Row} from "react-flexbox-grid";
import {SetupUsername} from "../Setup";
import {SetupTags} from "../Setup";
import {
  Page
  } from '@shopify/polaris';
import {AccountStore, FrameStore} from "../../Context/store";

export const Settings = () => {
    const {account} = React.useContext(AccountStore);
    const [usernameSaved, setUsernameSaved] = useState(false);
    const [tagsSaved, setTagsSaved] = useState(false);
    const [initialTags, setInitialTags] = useState([]);
    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

    useEffect(() => {
        if (account) {
            account.tags && setInitialTags(account.tags.map((tag,indx) => {return {tag: tag, views: 0, posts: 0, key:"indx-"+indx, id:indx}}))
        }
        unsetIsLoading();
    }, [account]);

    const usernameComplete = () => setUsernameSaved(true);
    const tagsComplete = () => setTagsSaved(true);

    return account ? (
        <Page fullWidth title="Settings">
            <Row>
                <Col lg={24} xs={12}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={12}>
                    <SetupUsername username={account.username} complete={usernameComplete} key={account.username}/>
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
