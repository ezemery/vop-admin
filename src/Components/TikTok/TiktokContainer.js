import React,{useState} from 'react'
import {TikTokCard} from './TikTokCard';
import {TikTokModal} from './TikTokModal';
import {Row, Col} from 'react-flexbox-grid';
export const TiktokContainer = ({item,removeItem,currentIndex,openModal,user,modal,setModal}) => {
    const feedlist = item.map((itm,idx) =>{ return <TikTokCard
    item={itm}
    removeItem={removeItem}
    currentIndex={idx}
    key={itm.id}
    openModal={openModal}
    user={user}
    />})
    return (
       <Row type="flex">
        {feedlist}
        {item.length > 0 ? (
        <TikTokModal
          user={user}
          setModal={setModal}
          data={item}
          currentIndex={currentIndex}
          modal={modal}
          key={currentIndex}
          removeItem={removeItem}
        />
      ) : (
        ''
      )}
       </Row>
        
    )
}
