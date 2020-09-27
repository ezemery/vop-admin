import {Col, Row, Card,Typography, Empty, Button} from 'antd';
import React, {useContext, useEffect} from 'react';
import { useState } from 'react';
import {Link, useParams} from "react-router-dom";
import {
    Page
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
            component: 'carousel',
            styles: {},
            body: document.body,
            debug: false,
        }
        embedPreview = <VopEmbed config={config}/>
    }



    return user ? (
        <Page fullWidth title="Embed your Vop Feed">
        <div hidden={loading}>
            <Row>
                <Col lg={24} md={24} sm={24} >&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={24}>
                    {embedPreview}
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={24} sm={24}>&nbsp;
                </Col>
            </Row>
            <Row hidden={!embedAvailable}>
                <Col lg={24} xs={24}>
                    <Card className="text-align">

                        <Title level={2}>Embed your Vop feed</Title>

                        <Text>Paste the code sample below in to your e-commerce page or system to enable Tokshop on your store.</Text><br />
                        <br/>
                        <Text code>&#x3C;div data-tokshop-id=&#x22;{user.id}&#x22;&#x3E;&#x3C;/div&#x3E;</Text><br />
                        <Text code>&lt;script src=&quot;https://cdn.tokshop.com/tokshop.v2.js&quot; async=&quot;async&quot; &gt;&lt;/script&gt;</Text><br />
                        <br/>
                        <Text>&nbsp;</Text>
                        <br/>
                        <Text>For installation instructions for Shopify please see here
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store">https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store</a>
                        </Text>
                        <br />
                        <br/>
                    </Card>
                </Col>
            </Row>
        </div>
    </Page>
    ) : <></>;

};
