import {Card, Input, Select, Empty} from 'antd';
import React, {useState, useEffect, useCallback, useContext, useReducer} from 'react';

import {Row, Col} from 'react-flexbox-grid';
import InfiniteScroll from 'react-infinite-scroller';
import {EmptyState, Button, Page} from '@shopify/polaris';
import {useHistory, useParams} from 'react-router-dom';
import {TikTokModal} from './TikTokModal';
import {TikTokCard} from './TikTokCard';
import {FrameStore, UserStore, VideoStore} from '../../Context/store';
import {useVideoFetch} from "../../Hooks/video.hook";

const InputGroup = Input.Group;
const {Option} = Select;

const videoInitial = [];

function videoReducer(state, action) {
  switch (action.type) {
    case 'append':
      const filtered = action.videos.filter((video) => !state.find((vid) => vid.id === video.id));
      return [...state, ...filtered];
    case 'remove':
      state.splice(action.index, 1);
      return [...state];
    case 'reset':
      return [];
    default:
      throw new Error();
  }
}

export const TikTokList = ({
  defaultStatus,
  hideSearch,
  approvalScreen,
  user,
}) => {
  const history = useHistory();

  const videoFetch = useVideoFetch();

  const {userId, accountId} = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const [query, setQuery] = useState('');
  const [hasTags, setHasTags] = useState('');
  const [lastVideo, setLastVideo] = useState('');
  const [more, setMore] = useState(false);

  const [data, updateData] = useReducer(videoReducer, videoInitial);

  const removeItem = (index) => {
    updateData({type: 'remove', index: index})
  };

  const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

  const loadFunc = useCallback(async () => {
    setIsLoading()
    await videoFetch.fetchVideoDataAsync(lastVideo, status, hasTags, query, userId, accountId);
  }, [hasTags, lastVideo, query, status, userId, accountId]);

  useEffect(() => {
      setMore(videoFetch.videos.has_more);
      if (videoFetch.videos.data) {
        if (videoFetch.videos.data.length > 0) {
          setLastVideo(videoFetch.videos.data.slice(-1)[0].id);
          updateData({type: 'append', videos: videoFetch.videos.data});
        }
        unsetIsLoading();
      }

  }, [videoFetch.videos]);

  useEffect( () => {
    async function fetchData() {
      updateData({type: 'reset'})
      setIsLoading()
      await videoFetch.fetchVideoDataAsync('', status, hasTags, query, userId, accountId);
    }
    fetchData();
  }, [status, hasTags, query, userId, accountId]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModal(true);
  };

  let feedList = data.map((item, idx) => (
    <TikTokCard
      item={item}
      removeItem={removeItem}
      currentIndex={idx}
      key={item.id}
      openModal={openModal}
      user={user}
    />
  ));

  if (feedList.length === 0) {
    if (approvalScreen === true) {
      feedList = (
        <EmptyState
          heading="You are all done"
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>
            New videos from TikTok will be imported when they are available.
          </p>
          <br />
          <Button primary onClick={loadFunc}>
            Check for Videos
          </Button>
        </EmptyState>
      );
    } else {
      feedList = (
        <EmptyState
          heading="No Videos"
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Use the filters above to find more videos.</p>
        </EmptyState>
      );
    }
  } else {
    feedList = (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={more}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Row gutter={[32]} type="flex">
          <VideoStore.Provider value={videoFetch}>
            {feedList}
          </VideoStore.Provider>
        </Row>{' '}
      </InfiniteScroll>
    );
  }

  if (isLoading === true) {
    feedList = (
        <EmptyState
            heading="Loading"
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Loading your content.</p>
        </EmptyState>
    );
  }


  return (
    <Page
      fullWidth
      title={approvalScreen ? 'Awaiting Approval' : 'Manage Content'}
    >
      <Row>
        <Col span={24}>&nbsp;</Col>
      </Row>
      <Row hidden={hideSearch}>
        <Col xs={12}>
          <Card>
            <InputGroup size="large" compact>
              <Input
                placeholder="Search description"
                style={{width: '55%'}}
                size="large"
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Select
                size="large"
                onChange={setStatus}
                defaultValue={status}
                style={{width: '15%'}}
                placeholder="Approval Status"
              >
                <Option value="new">Awaiting</Option>
                <Option value="approve">Approved</Option>
                <Option value="reject">Rejected</Option>
              </Select>
              <Select
                size="large"
                style={{width: '15%'}}
                onChange={setHasTags}
                defaultValue={hasTags}
                placeholder="Product Tag Status"
              >
                <Option value="">All</Option>
                <Option value="false">No Tags</Option>
                <Option value="true">Products with Tags</Option>
              </Select>
              <Select
                size="large"
                style={{width: '15%'}}
                defaultValue="Newest"
                placeholder="Sort By"
              >
                <Option value="Newest">Newest</Option>
              </Select>
            </InputGroup>
          </Card>
        </Col>
      </Row>
      <Row hidden={hideSearch}>
        <Col span={24}>&nbsp;</Col>
      </Row>
      <br />
      {feedList}
      {data.length > 0 ? (
        <TikTokModal
          user={user}
          setModal={setModal}
          data={data}
          currentIndex={currentIndex}
          modal={modal}
          key={currentIndex}
          removeItem={removeItem}
        />
      ) : (
        ''
      )}
    </Page>
  );
};
