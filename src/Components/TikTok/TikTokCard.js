import React, {useState} from 'react';
import NumericLabel from 'react-pretty-numbers';
import { Col } from 'react-flexbox-grid';
import {useParams} from "react-router-dom";
import {VideoCard} from "../Cards"


export const TikTokCard = ({currentIndex, item, openModal, removeItem, user}) => {

  const [play, setPlay] = useState(false);

  const { userId, accountId } = useParams();

  const SetInfo = (status) => {
    fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/content/id/${item.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      removeItem(currentIndex);
    }).catch(function(ex) {
      
    })

  };

  let params = {
    justification: 'L',
    commafy: false,
    shortFormat: true,
  };

  return (
      <Col xs={12} sm={12} md={6} lg={4} xl={3} >
         <VideoCard key={item.id} item={item} currentIndex={currentIndex} openModal={openModal} SetInfo={SetInfo} user={user}/>
      <br />
      </Col>
  )
};
