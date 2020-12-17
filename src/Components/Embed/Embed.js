import {Col, Row,Typography} from 'antd';
import React, {useState,useContext, useEffect, useCallback, useMemo} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import {
    Page,
    Stack,
    RadioButton,
    Button,
    TextField,
    Form,
    FormLayout,
    DisplayText,
    Layout,
    Card,
    CalloutCard
    } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../Context/store"
import VopEmbed from '@vop/embed';

const { Text } = Typography;

export const Embed = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [embedAvailable, setEmbedAvailable] = useState(null);
    const {user} = React.useContext(UserStore);
    const {accountId} = useParams();
    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);
    const [embedType, setEmbedType] = useState('carousel');
    const [template, setTemplate] = useState('one');
    const [twitter, setTwitter] = useState(null);
    const [facebook, setFacebook] = useState(null);
    const [pinterest, setPinterest] = useState(null);


    const twitterChange = useCallback(
        (value) => setTwitter(value),
        [],
      );

      const facebookChange = useCallback(
        (value) => setFacebook(value),
        [],
      );

      const pinterestChange = useCallback(
        (value) => setPinterest(value),
        [],
      );

    const handleEmbedTypeChange = useCallback(
        (_checked, newValue) => setEmbedType(newValue),
        [],
    );

    const handleTemplateChange = useCallback(
        (_checked, newValue) => setTemplate(newValue),
        [],
    );

    const switchPage = () => {
        history.push(`/account/id/${accountId}/embed/customize`)
    }

    useEffect(() => {
        setIsLoading();
        setLoading(true);
        if(user) {
            fetch(process.env.REACT_APP_API_HOST + '/embed/feed/' + user.id, {
                credentials: 'include',
                method: 'GET',
            }).then(function (response) {
                return response.json()
            }).then(function (json) {
                if (json.data.length > 0) {
                    setEmbedAvailable(json.data.length)
                }
            }).catch(function (ex) {
            });
            setLoading(false);
            unsetIsLoading();

            return ()=>{
                setEmbedAvailable(0)
            }
        }
    },[]);

    let embedEmpty = (
        <CalloutCard
        title="You need to approve a few videos in your Approval screen before you can embed"
        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
        primaryAction={{
          content: 'Approve Videos',
          url: '/',
        }}
      >
      </CalloutCard>
   );

   const config = {
    appId: user.id,
    baseUrl: process.env.REACT_APP_API_HOST,
    component: embedType,
    template:2,
    styles: {},
    body: document.body,
    debug: false,
    embedKey:embedAvailable,
} 
  
const  embedPreview = useMemo(()=>{return<VopEmbed config={config} />},[embedAvailable, loading])
    const embedlink = process.env.REACT_APP_EMBED_HOST;

    return user ? (
        <Page 
        fullWidth 
        title="Embed your vop feed"
        primaryAction={ embedAvailable ? {content: 'Customize Embed', onAction: switchPage}: ""}
        >
        <div hidden={loading}>

            <Row>
                <Col lg={24} md={24} sm={24}>&nbsp;
                </Col>
            </Row>
            <Row hidden={!embedAvailable}>
                <Col lg={24} xs={24}>
                    <Card className="text-align">
                        <div style={{padding:"15px"}}>
                            <DisplayText size="large">Your embed code snippet</DisplayText>
                        </div>
                        <div style={{padding:"15px"}}>
                        <TextField
                            label="Paste the code sample below in to your e-commerce page or system to enable Vop on your store."
                            readOnly={true}
                            value={`<div data-tokshop${(embedType === 'carousel') ? '' : '-page'}-id="${user.id}" data-tokshop-template="${(template)=== "one" ? 1 : 2}" ${twitter?`data-tokshop-twitter="https://twitter.com/${twitter}"`:""} ${facebook?`data-tokshop-facebook="https://facebook.com/${facebook}"`:""} ${pinterest?`data-tokshop-pinterest="https://pinterest.com/${pinterest}"`:""}></div>
<script src="${embedlink}" async="async" ></script>`}
                            multiline={3}
                        />

                        <br/>
                        <Text>For installation instructions for Shopify please <Button plain
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store">read this article</Button></Text>
                        <br />
                        </div>

                        
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
                    <div style={{padding:"15px"}}>
                        <DisplayText size="large">Preview</DisplayText>
                    </div>
                    <div style={{padding:"15px"}}>
                     {typeof embedAvailable === "number"? embedPreview : embedEmpty}
                    </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </Page>
    ) : <></>;

};
