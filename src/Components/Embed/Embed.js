import {Col, Row, Card,Typography, Empty, Button} from 'antd';
import React, {useEffect} from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {UserStore} from "../../Context/store"
import {EmbedContainer} from "./styles"

const { Text, Title } = Typography;

const Embed = (props) => {
    const [loading, setLoading] = useState(true);
    const [embedAvailable, setEmbedAvailable] = useState(false);
    const {user,fetchUserDataAsync} = React.useContext(UserStore);

    useEffect(() => {
        fetchUserDataAsync();
      }, [fetchUserDataAsync]);


    useEffect(() => {
            fetch(process.env.REACT_APP_API_HOST + '/feed-preview?app_id='+user.id, {
                credentials: 'include',
                method: 'GET',
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                if (json.data.length > 0) {
                    setEmbedAvailable(true)
                }

            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
            setLoading(false);


    },[user]);

    let embedPreview = (<Empty
        image="tiktok.png"
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
        embedPreview = <Card>
            <div data-tokshop-id={user.id}/>
        </Card>
    }



    return (
        <EmbedContainer>
        <div hidden={loading}>
            <Row>
                <Col lg={24} md={12} sm={12} >&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={12} sm={12}>&nbsp;
                </Col>
            </Row>
            <Row>
                <Col lg={24} xs={12}>
                    {embedPreview}
                </Col>
            </Row>
            <Row>
                <Col lg={24} md={12} sm={12}>&nbsp;
                </Col>
            </Row>
            <Row hidden={!embedAvailable}>
                <Col lg={24} xs={12}>
                    <Card className="text-align">

                        <Title level={2}>Embed your TokShop feed</Title>

                        <Text>Paste the code sample below in to your e-commerce page or system to enable Tokshop on your store.</Text><br />
                        <br/>
                        <Text code>&#x3C;div data-tokshop-id=&#x22;{user.id}&#x22;&#x3E;&#x3C;/div&#x3E;</Text><br />
                        <Text code>&lt;script src=&quot;https://cdn.tokshop.com/tokshop.v2.js&quot; async=&quot;async&quot; &gt;&lt;/script&gt;</Text><br />

                        <br/>
                        <Text>&nbsp;</Text>
                        <br/>
                        <Text>For installation instructions for Shopify please see here <a target="_blank" rel="noopener noreferrer" href="https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store">https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store</a></Text><br />
                        <br/>
                    </Card>
                </Col>
            </Row>
        </div>
    </EmbedContainer>
    );

};

export default Embed;