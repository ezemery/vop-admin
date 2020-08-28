import {Card, Input, Select, Empty, Button} from 'antd';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import TikTokCard from "./TikTokCard";
import { Row, Col } from 'react-flexbox-grid';
import InfiniteScroll from 'react-infinite-scroller';
import TikTokModal from "./TikTokModal";
import {useHistory, useParams} from "react-router-dom";
import {VideoStore} from "../../Context/store";

const InputGroup = Input.Group;
const { Option } = Select;

const TikTokList = ({item, defaultStatus, hideSearch, approvalScreen, user}) => {
  const {videos, error, fetchVideoDataAsync} = React.useContext(VideoStore);

  const history = useHistory();

  const { userId, accountId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const [query, setQuery] = useState("");
  const [hasTags, setHasTags] = useState("");
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
        [fetchVideoDataAsync, hasTags, lastVideo, query, status, userId, accountId],
    );

  useEffect(() => {
    if(!error){
      setMore(videos.has_more)
      if (videos.data && videos.data.length > 0) {
        setLastVideo(videos.data.slice(-1)[0].id)
        videos.data.forEach(video => {
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
      setLoading(false);
    }
  },[videos, error, history])

    useEffect(() => {
        updateData([]);
        fetchVideoDataAsync("", status, hasTags, query, userId, accountId);
    }, [fetchVideoDataAsync, status, hasTags, query, userId, accountId]);


  const openModal = (index) => {
    setCurrentIndex(index);
    setModal(true);
  };

  let feedList = data.map((item, idx) => <TikTokCard item={item} removeItem={removeItem} currentIndex={idx} key={item.id} openModal={openModal}/>);

  if (feedList.length === 0) {
    if(approvalScreen === true) {
        feedList = <Empty
            image="/tiktok.png"
            imageStyle={{
                height: 60,
            }}
            description={
                <span><br />
        <b>You are all done!</b> New videos from TikTok will be imported when they are available.
      </span>
            }
        >
            <Button type="primary" onClick={loadFunc}>Check for Videos</Button>
        </Empty>
    } else {
        feedList = <Empty
            image="/tiktok.png"
            imageStyle={{
                height: 60,
            }}
            description={
                <span><br />
        <b >No Videos.</b> Use the filters above to find more videos.
      </span>
            }
        >
        </Empty>
    }

  } else {
    feedList =       <InfiniteScroll
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
    <div>
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
                <Option value="">All</Option>
                <Option value="false">No Tags</Option>
                <Option value="true">Products with Tags</Option>
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

    </div>
  )
};

export default TikTokList;
