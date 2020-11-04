import {Col, Row, Card,Typography, Empty} from 'antd';
import React, {useContext, useEffect, useCallback} from 'react';
import { useState } from 'react';
import {Link, useParams} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import {
    Page,
    Stack,
    RadioButton,
    Button,
    TextField,
    Form,
    FormLayout,
    DisplayText
    } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../Context/store"
import {EmbedContainer} from "./styles"
import VopEmbed from '@vop/embed';
import {findUserInUsersById} from "../../services";

const { Text } = Typography;

export const Embed = () => {
    const [loading, setLoading] = useState(true);
    const [embedAvailable, setEmbedAvailable] = useState(false);
    const {user} = React.useContext(UserStore);
    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);
    const {handleSubmit, control} = useForm();
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
        <Link to="/" ><Button primary>Approve Videos</Button></Link>
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
                    <div style={{paddingTop:"15px", paddingBottom:"15px"}}>
                    <DisplayText size="large">How would you like to embed?</DisplayText>
                    </div>
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
                        <div style={{paddingTop:"15px", paddingBottom:"15px"}}>
                        <DisplayText size="large">Choose your template</DisplayText>
                        </div>
                        
                        <Stack horizontal distribution="fillEvenly">
                            <div>
                            <RadioButton
                                label="Template one design"
                                helpText="Choose template one design"
                                checked={template === 'one'}
                                id="one"
                                name="embed-template"
                                onChange={handleTemplateChange}
                            />
                            <img style={{width:"300px", height:"auto"}} src="../../../../template-one.png"/>
                            </div>
                            <div>
                            <RadioButton
                                label="Template two design"
                                helpText="Choose template two design"
                                id="two"
                                name="embed-template"
                                checked={template === 'two'}
                                onChange={handleTemplateChange}
                            />
                            <img style={{width:"300px", height:"auto"}} src="../../../../template-two.png"/>
                            </div>
                            

                        </Stack>
                        <div style={{paddingTop:"30px", paddingBottom:"15px"}}>
                            <DisplayText size="large">Add social media handles</DisplayText>
                        </div>
                        
                       <Form>
                            <FormLayout>
                                <TextField type="text" name="tw" label="Twitter" labelHidden placeholder="Enter a twitter handle"  value={twitter} onChange={twitterChange} connectedLeft={<Button disabled>https://twitter.com/</Button>} />
                                <TextField type="text"  label="Facebook" labelHidden placeholder="Enter facebook handle"  value={facebook} onChange={facebookChange}  connectedLeft={<Button disabled>https://www.facebook.com/</Button>} />
                                <TextField type="text" label="Pinterest" labelHidden placeholder="Enter pinterest handle" value={pinterest} onChange={pinterestChange} connectedLeft={<Button disabled>https://www.pinterest.com/</Button>}/>
                            </FormLayout>
                        </Form>
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
                    <DisplayText size="large">Your embed code snippet</DisplayText>
                        <br/>
                        <TextField
                            label="Paste the code sample below in to your e-commerce page or system to enable Vop on your store."
                            readOnly={true}
                            value={`<div data-tokshop${(embedType === 'carousel') ? '' : '-page'}-id="${user.id}" data-tokshop-template="${(template)=== "one" ? 1 : 2}" ${twitter?`data-tokshop-twitter="https://twitter.com/${twitter}"`:""} ${facebook?`data-tokshop-facebook="https://facebook.com/${facebook}"`:""} ${pinterest?`data-tokshop-pinterest="https://pinterest.com/${pinterest}"`:""}></div>
<script src="https://cdn.tokshop.com/tokshop.v3.js" async="async" ></script>`}
                            multiline={3}
                        />
                        <br/>
                        <br/>
                        <Text>For installation instructions for Shopify please <Button plain
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://help.getvop.com/en/articles/3889177-how-to-embed-vop-into-your-shopify-store">read this article</Button></Text>
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
                    <div style={{paddingTop:"15px", paddingBottom:"15px"}}>
                        <DisplayText size="large">Preview</DisplayText>
                    </div>
                    {embedPreview}
                    </Card>
                </Col>
            </Row>
        </div>
    </Page>
    ) : <></>;

};
