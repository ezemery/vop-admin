import {Card, Icon, Avatar, Tag} from 'antd';
import React from 'react';
import { useState } from 'react';
import NumericLabel from 'react-pretty-numbers';
import { Col } from 'react-flexbox-grid';
const { Meta } = Card;


const TikTokCard = ({currentIndex, item, openModal, removeItem}) => {

  const [play, setPlay] = useState(false);

  const SetInfo = (status) => {
    removeItem(currentIndex);
    fetch(process.env.REACT_APP_API_HOST + '/api/video/update', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item.id,
        status: status
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log(json.length)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })

  };

  let params = {
    justification: 'L',
    commafy: false,
    shortFormat: true,
  };

  //id: "7_6544235338582201359"
  // cover_img: ""
  // video_url: "http://mphw-suse1.muscdn.com/reg02/2018/04/14/17/6544235338582201359_hmNLauufvd.mp4"
  // avatar_url: "https://p16.muscdn.com/img/musically-maliva-obj/1611214824929285~c5_100x100.jpeg"
  // like_count: "2338"
  // description: "Paris, you were incredible 🇫🇷 Only 4 more weeks to go until Gymshark Birmingham. #LiftBrum"
  // status: "new"
  // has_tags: "0"
  // created_at: "1523698573"
  // video_id: "6544235338582201359"

  return (
      <Col xs={12} sm={12} md={6} lg={4} xl={3} >
    <Card

      key={item.id}
      cover={<div style={{
        overflow: "hidden",
        position: "relative",
      }}><img
        alt="example"
        src={item.cover_img}
        style={{width:"100%", position:"absolute"}}
      />{
        !play ? <div /> : <video src={item.video_url} autoPlay="autoPlay" muted style={{width:"100%", position:"absolute"}} onClick={() => openModal(currentIndex)}/>
      }<div style={{content: '',
        display: "block",
        height: 0,
        width: "100%",
        /* 16:9 = 56.25% = calc(9 / 16 * 100%) */
        paddingBottom: "178%"}} /></div>}
      onMouseOver={() => { setPlay(true)}}
      onMouseLeave={() => { setPlay(false)}}
      actions={[
        ((item.status === "reject") ? <Tag color="red">Rejected</Tag> : <span onClick={() => SetInfo("reject")}><Icon type="close" /> Reject</span>),
        <span onClick={() => openModal(currentIndex)}><Icon type="tag"/> Add Links</span>,
        ((item.status === "approve") ? <Tag color="green">Approved</Tag> : <span onClick={() => SetInfo("approve")}><Icon type="check"/> Approve</span>),

      ]}
    >
      <Meta
        avatar={<Avatar src={item.avatar_url} />}
        title={<span><Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> &nbsp;<NumericLabel params={params}>{item.like_count}</NumericLabel></span>}
        description={item.description}
        style={{height: "150px", overflow: "hidden"}}
      />
    </Card>

        <br />
      </Col>
  )
};

export default TikTokCard;