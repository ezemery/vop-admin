import React, {useCallback, useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import tw, {styled} from 'twin.macro';
import {
  ClipboardMinor,
  DuplicateMinor,
  DeleteMinor,
  EditMinor,
  MobileVerticalDotsMajorMonotone,
  PlayCircleMajorMonotone,
} from '@shopify/polaris-icons';
import {
  EmptyState,
  Button,
  Page,
  Icon,
  Toast,
  DisplayText,
  Popover,
  ActionList,
} from '@shopify/polaris';
import {ViewStyles} from '../styles';
import {TikTokCard, TikTokModal} from '../../TikTok';
import {UserStore, FrameStore} from '../../../Context/store';

export const ViewShop = () => {
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore);
  const {user} = React.useContext(UserStore);
  const userId = user.id;
  const history = useHistory();
  const {shop_id, accountId} = useParams();
  const [shop, setShop] = useState({});
  const [active, setActive] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  useEffect(() => {
    setIsLoading();
    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setShop(json.shop);
        unsetIsLoading();

        // throw new Error('Network response was not ok');
      })
      .catch((ex) => {});
  }, []);

  const editShop = () => {
    history.push(`/account/id/${accountId}/shop/edit/${shop_id}`);
  };
  const deleteShop = () => {
    setIsLoading();
    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        unsetIsLoading();
        history.push(`/account/id/${accountId}/shop/`);
      })
      .catch((ex) => {});
  };

  useEffect(() => {
    if (shop.account_id) {
      setIsLoading();
      fetch(`${process.env.REACT_APP_API_HOST}/embed/feed/${shop.account_id}`, {
        credentials: 'include',
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.data) {
            unsetIsLoading();
            setThumbnails(json.data);
          }
        })
        .catch((ex) => {});
    }
  }, [shop]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModal(true);
  };

  const feedList =
    thumbnails.length > 0 &&
    thumbnails.map((item, idx) => (
      <TikTokCard
        item={item}
        currentIndex={idx}
        key={item.id}
        openModal={openModal}
        user={user}
      />
    ));

  const previewShop = (url) => {
    window.open(`${process.env.REACT_APP_VOPSHOP_HOST}/${url}`, '_blank');
  };
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom

    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log(`Fallback: Copying text command was ${msg}`);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        toggleActive();
      },
      (err) => {
        console.error('Async: Could not copy text: ', err);
      },
    );
  };

  const Image = styled.div`
    ${({image}) =>
      image
        ? `background: url(${image})`
        : 'background: url("../../../../bg.png")'};
    ${tw`bg-cover rounded-full h-24 w-24 mr-6`}
  `;
  const toastMarkup = active ? (
    <Toast content="Copied successfully" onDismiss={toggleActive} />
  ) : null;

  return (
    <Page
      primaryAction={{
        content: 'Preview Shop',
        onAction: () => previewShop(shop.handle),
      }}
      fullWidth
      title={shop.title}
      breadcrumbs={[
        {
          content: 'All Shops',
          url: `/account/id/${accountId}/shop`,
        },
      ]}
    >
      {shop && shop.handle ? (
        <ViewStyles>
          <div style={{display: 'flex', marginBottom: '20px'}}>
            <Image image={shop.shop_image} />
            <div>
              <DisplayText size="medium">{shop.title}</DisplayText>
              <p
                style={{
                  maxWidth: '20rem',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Icon source={PlayCircleMajorMonotone} /> &nbsp;&nbsp;{' '}
                {thumbnails.length} Videos
              </p>
              <div style={{display: 'flex'}}>
                <p style={{maxWidth: '48rem'}}>{shop.description}</p>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="copy">
              <span
                className="clipboard_copy"
                onClick={() => previewShop(shop.handle)}
              >
                {process.env.REACT_APP_VOPSHOP_HOST}/{shop.handle}
              </span>
              <span
                className="icon"
                onClick={() =>
                  copyTextToClipboard(
                    `${process.env.REACT_APP_VOPSHOP_HOST}/${shop.handle}`,
                  )
                }
              >
                {' '}
                <Icon source={DuplicateMinor} />
              </span>
            </div>
            <div className="list-item drop">
              <div className="">
                <Icon source={MobileVerticalDotsMajorMonotone} />
              </div>
              <div className="dropdown-content">
                <div style={{marginBottom: '5px'}}>
                  <Button
                    plain
                    icon={EditMinor}
                    onClick={() => {
                      editShop();
                    }}
                  >
                    Edit Shop
                  </Button>
                </div>
                <Button
                  plain
                  destructive
                  icon={DeleteMinor}
                  onClick={() => {
                    deleteShop();
                  }}
                >
                  Delete Shop
                </Button>
              </div>
            </div>
          </div>
        </ViewStyles>
      ) : null}
      <div style={{display: 'flex', flexWrap: 'wrap'}}>{feedList}</div>
      {toastMarkup}
      {thumbnails.length > 0 ? (
        <TikTokModal
          user={user}
          setModal={setModal}
          data={thumbnails}
          currentIndex={currentIndex}
          modal={modal}
          key={currentIndex}
        />
      ) : (
        ''
      )}
    </Page>
  );
};
