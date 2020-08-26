import {Card, Input, Select, Empty} from 'antd';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {TikTokCard} from "./TikTokCard";
import { Row, Col } from 'react-flexbox-grid';
import InfiniteScroll from 'react-infinite-scroller';
import {TikTokModal} from "./TikTokModal";
import {EmptyState, Button, Page} from '@shopify/polaris';
import {useHistory, useParams} from "react-router-dom";
import {VideoStore} from "../../Context/store";
import {UserStore} from "../../Context/store";
import {findUserInUsersById} from "../../services";

const InputGroup = Input.Group;
const { Option } = Select;

export const TikTokList = ({defaultStatus, hideSearch, approvalScreen, user}) => {
  const {videos, error, fetchVideoDataAsync} = React.useContext(VideoStore);
  console.log("videos", videos , "users",user)

  const history = useHistory();

  const { userId, accountId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const [query, setQuery] = useState("");
  const [hasTags, setHasTags] = useState("All");
  const [data, updateData] = useState([]);
  const [lastVideo, setLastVideo] = useState("0");
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const removeItem = index => {
    updateData(oldArray => {
      oldArray.splice(index, 1)
      return [...oldArray]
    });
  };

    useEffect(() => {
        setStatus(defaultStatus)
    }, [defaultStatus]);


    const loadFunc = useCallback(
        () => {
            if (lastVideo === "0") {
                setLoading(true);
            }
            fetchVideoDataAsync(lastVideo, status, hasTags, query, userId, accountId)
        },
        [hasTags, lastVideo, query, status, userId, accountId],
    );

  useEffect(() => {
    if(!error){
      setMore(videos.length === 50)
      if (videos.length > 0) {
        setLastVideo(videos.slice(-1)[0].video_id)
        videos.forEach(video => {
          updateData(oldArray => {
            if (oldArray.find(vid => vid.id === video.id)) {
              return oldArray
            } else {
              return [...oldArray, video]

            }
          })
        });
      }
      setLoading(false);
    }else{
      history.push('/login');
      setLoading(false);
    }
  },[videos, error, history])

    useEffect(() => {
        updateData([]);
        fetchVideoDataAsync("0", status, hasTags, query, userId, accountId);
    }, [status, hasTags, query,userId, accountId]);


  const openModal = (index) => {
    setCurrentIndex(index);
    setModal(true);
  };

  let feedList = data.map((item, idx) => 
  <TikTokCard item={item} removeItem={removeItem} currentIndex={idx} key={item.id} openModal={openModal} user={user}/>);

  if (feedList.length === 0) {
    if(approvalScreen === true) {
        feedList = ( <EmptyState
                heading="You are all done"
                image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
              >
                <p>New videos from TikTok will be imported when they are available.</p><br/>
                <Button primary loading={loading} onClick={loadFunc}>
                Check for Videos
              </Button>
              </EmptyState>
              )
    } else {
        feedList = <EmptyState
        heading="No Videos"
        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
      >
        <p>Use the filters above to find more videos.</p>
      </EmptyState>
      
    }
  } else {
    feedList = 
    <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={more}
        loader={<div className="loader" key={0}>Loading ...</div>}
    ><Row gutter={[32]} type="flex">{feedList}</Row> </InfiniteScroll>
  }

  if (loading === true) {
      feedList = <Empty
          image="/tiktok.png"
          imageStyle={{
              height: 60,
          }}
          description={
              <span><br />
        <b>Loading ...</b>
      </span>
          }
      >
      </Empty>
  }

  return (
    <Page fullWidth title={approvalScreen?"Awaiting Approval": "Manage Content"}>
      <Row>
        <Col span={24}>&nbsp;
        </Col>
      </Row>
      <Row hidden={hideSearch}>
        <Col xs={12}>
          <Card>
            <InputGroup size="large" compact >
              <Input
                placeholder="Search description"
                style={{ width: '55%' }}
                size="large"
                defaultValue={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Select
                size="large"
                onChange={setStatus}
                defaultValue={status}
                style={{ width: '15%' }}
                placeholder="Approval Status">
                <Option value="new">Awaiting</Option>
                <Option value="approve">Approved</Option>
                <Option value="reject">Rejected</Option>
              </Select>
              <Select
                size="large"
                style={{ width: '15%' }}
                onChange={setHasTags}
                defaultValue={hasTags}
                placeholder="Product Tag Status">
                <Option value="All">All</Option>
                <Option value="yes">No Tags</Option>
                <Option value="no">Products with Tags</Option>
              </Select>
              <Select
                size="large"
                style={{ width: '15%' }}
                defaultValue="Newest"
                placeholder="Sort By">
                <Option value="Newest">Newest</Option>
              </Select>
            </InputGroup>
          </Card>
        </Col>
      </Row>
        <Row hidden={hideSearch}>
            <Col span={24}>&nbsp;
            </Col>
        </Row>
      <br />
          { feedList }
      {(data.length > 0) ? <TikTokModal user={user} setModal={setModal} data={data} currentIndex={currentIndex} modal={modal} key={currentIndex} removeItem={removeItem}/> : ""}
      </Page>
  )
};

