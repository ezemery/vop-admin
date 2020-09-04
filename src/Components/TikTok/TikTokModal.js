import {Modal, Input, List, Avatar, Button, AutoComplete, Icon } from "antd";
import {Col, Row, Grid} from "react-flexbox-grid";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {UserStore} from "../../Context/store";

export const TikTokModal = ({setModal, modal, data, currentIndex, removeItem}) => {

    const { accountId } = useParams();
    const {user} = React.useContext(UserStore);
    const userId = user.id

    const currentItem = data[currentIndex];
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState((currentItem && currentItem.products) || []);

    const [customUrl, setCustomUrl] = useState("");
    const [customTitle, setCustomTitle] = useState("");
    const [customImage, setCustomImage] = useState("");

    if (currentItem === null || currentItem === undefined) {
        return ""
    }

    const removeProduct = index => {
        return () => {
            setSelectedProducts(oldArray => {
                oldArray.splice(index, 1);
                return [...oldArray]
            });
        };
    };

    const searchProducts = (query) => {
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/product/search`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: "*"+query+"*",
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            setProducts(json.data.products.edges);
        }).catch(function(ex) {

        })

    };

    const SetInfo = (status) => {
        removeItem(currentIndex);
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/content/id/${currentItem.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status,
                products: selectedProducts
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
        }).catch(function(ex) {

        });
        setSelectedProducts([]);
    };

    const selectProduct = (id) => {
        const found = products.find(element => element.node.id === id);
        const newItem = {
            name: found.node.title,
            image_url: (found.node.featuredImage) ? found.node.featuredImage.originalSrc : "",
            url: found.node.product_url,
        };
        setSelectedProducts(oldArray => [...oldArray, newItem]);
    };

    const customProduct = () => {
        const newItem = {
            name: customTitle,
            image_url: customImage,
            url: customUrl,
        };
        setSelectedProducts(oldArray => [...oldArray, newItem]);
    };

    const productMeta = () => {
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/product/meta`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: customUrl
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            setCustomImage(json.image);
            setCustomTitle(json.title);
        }).catch(function(ex) {

        })

    };

    const options = products
        .map(option => (
            {
                value: option.node.id,
                text: <span>
                    <Avatar src={(option.node.featuredImage) ? option.node.featuredImage.originalSrc : ""} />
                    {option.node.title}
                </span>
            }
        ));

    if(modal === false) {
        return <div />;
    }

    return (<Modal
        title="Add product links"
        visible={modal}
        onCancel={() => setModal(false)}
        footer={(
            <div>
                <Button onClick={() => setModal(false)}>Close</Button>
                <Button onClick={() => SetInfo("reject")}><Icon type="close" />  Reject</Button>
                <Button type="primary" onClick={() => SetInfo("approve")}><Icon type="check"/> Approve</Button>
            </div>
        )}
        style={{
            width: "800px",
            minWidth: "800px",
            maxWidth: "800px"
        }}
        bodyStyle={{
            padding: "0 8px"
        }}
    >
        <Row>
            <Col xs={5}>
                <video src={currentItem.video_url} controls autoPlay="autoPlay" style={{width: "300px"}}/>
            </Col>
            <Col xs={7}>
                <div style={{width: "300px"}}>&nbsp;</div>
                {(user.type === "shopify") ? (
                <AutoComplete
                    dataSource={options}
                    onSelect={selectProduct}
                    onSearch={searchProducts}
                    size="large"
                    style={{ width: '100%' }}
                    optionLabelProp="text"
                    placeholder="Search for products to tag"
                >
                <Input suffix={<Icon type="search" className="certain-category-icon" />}/>
                </AutoComplete>) : (
                    <Grid fluid>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={4}>Link URL</Col>
                            <Col xs={8}><Input  value={customUrl}
                                                onChange={event => setCustomUrl(event.target.value)}/></Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={4}></Col>
                            <Col xs={8}><Button onClick={productMeta}><Icon type="download"/> Load Data from URL</Button></Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={4}>Link Title</Col>
                            <Col xs={8}><Input  value={customTitle}
                                                onChange={event => setCustomTitle(event.target.value)}/></Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={4}>Link Image</Col>
                            <Col xs={8}><Input  value={customImage}
                                                onChange={event => setCustomImage(event.target.value)}/></Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={4} />
                            <Col xs={8}><Button type="primary" onClick={customProduct}><Icon type="plus"/> Add Link</Button></Col>
                        </Row>
                        <Row style={{paddingBottom: "5px"}}>
                            <Col xs={12}><hr /></Col>
                        </Row>
                    </Grid>
                )}
                <List
                    itemLayout="horizontal"
                    dataSource={selectedProducts}
                    renderItem={(item, idx) => (
                        <List.Item
                            actions={[
                                <Button type="primary" size="small" onClick={removeProduct(idx)}>Remove</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.image_url} />}
                                title={item.name}
                                description="Product"
                            />
                        </List.Item>
                    )}

                />

            </Col>
        </Row>
    </Modal>);
};

