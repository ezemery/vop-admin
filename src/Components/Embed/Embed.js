import {Col, Row, Card,Typography, Empty, Button} from 'antd';
import React, {useContext, useEffect, useCallback} from 'react';
import { useState } from 'react';
import {Link, useParams} from "react-router-dom";
import {
    Page,
    Stack,
    RadioButton,
    TextField
    } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../Context/store"
import {EmbedContainer} from "./styles"
import VopEmbed from '@vop/embed'
import {findUserInUsersById} from "../../services";

const { Text, Title } = Typography;

export const Embed = () => {
    const [loading, setLoading] = useState(true);
    const [embedAvailable, setEmbedAvailable] = useState(false);
    const {user} = React.useContext(UserStore);

    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

    const [embedType, setEmbedType] = useState('carousel');

    const handleEmbedTypeChange = useCallback(
        (_checked, newValue) => setEmbedType(newValue),
        [],
    );

    useEffect(() => {
        if(user) {
            fetch(process.env.REACT_APP_API_HOST + '/embed/feed/' + user.id, {
                credentials: 'include',
                method: 'GET',
            }).then(function (response) {
                return response.json()
            }).then(function (json) {
                if (json.data.length > 0) {
                    setEmbedAvailable(true)
                }
            }).catch(function (ex) {
            });
            setLoading(false);
            unsetIsLoading();
        }
    },[user]);

    let embedPreview = (<Empty
        image="/tiktok.png"
        imageStyle={{
            height: 60,
        }}
        description={
            <span><br />
        <b level={2}>You need to approve videos.</b> You need to approve a few videos in your Approval screen before you can embed.
      </span>
        }
    >
        <Link to="/" ><Button type="primary">Approve Videos</Button></Link>
    </Empty>);



    if(embedAvailable === true) {
        const config = {
            appId: user.id,
            baseUrl: process.env.REACT_APP_API_HOST,
            component: embedType,
            styles: {},
            body: document.body,
            debug: false,
        }
        embedPreview = <VopEmbed config={config}/>
    }



    return user ? (
        <Page fullWidth title="Embed your Vop Feed">
        <div hidden={loading}>
            <Row hidden={!embedAvailable}>
                <Col lg={24} xs={24}>
                    <Card className="text-align">

                        <Title level={3}>How would you like to embed?</Title>

                        <Stack vertical>
                            <RadioButton
                                label="Carousel Layout"
                                helpText="This layout is a single horizontal scroll, best used on your homepage."
                                checked={embedType === 'carousel'}
                                id="carousel"
                                name="embed-type"
                                onChange={handleEmbedTypeChange}
                            />
                            <RadioButton
                                label="Page Layout"
                                helpText="This is a multi-row layout with infinite scroll, best used on a dedicated page"
                                id="page"
                                name="embed-type"
                                checked={embedType === 'page'}
                                onChange={handleEmbedTypeChange}
                            />
                        </Stack>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24}>&nbsp;
                </Col>
            </Row>
            <Row hidden={!embedAvailable}>
                <Col lg={24} xs={24}>
                    <Card className="text-align">

                        <Title level={3}>Your embed code snippet</Title>
                        <br/>
                        <TextField
                            label="Paste the code sample below in to your e-commerce page or system to enable Vop on your store."
                            readOnly={true}
                            value={`<div data-tokshop${(embedType === 'carousel') ? '' : '-page'}-id="${user.id}"></div>
<script src="https://cdn.tokshop.com/tokshop.v2.js" async="async" ></script>`}
                            multiline={4}
                        />
                        <br/>
                        <Text>&nbsp;</Text>
                        <br/>
                        <Text>For installation instructions for Shopify please <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store">read this article</a></Text>
                        <br />
                        <br/>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={24}>
                    <Card className="text-align">

                        <Title level={3}>Preview</Title>

                    {embedPreview}
                    </Card>
                </Col>
            </Row>
        </div>
    </Page>
    ) : <></>;

};
