import React, {useState, useCallback, useEffect} from 'react';
import {DisplayText, Icon, Thumbnail, Toast} from '@shopify/polaris';

import {useHistory} from 'react-router-dom';
import {DuplicateMinor, PlayCircleMajorMonotone} from '@shopify/polaris-icons';
import tw, {styled} from 'twin.macro';
import {FrameStore} from '../../../Context/store';
import {ShopContent, ProductImage, ThumbnailContent, Text} from '../styles';

export default function ShopList({
  handle,
  title,
  description,
  total_accepted_contents,
  account_id,
  id,
  shop_image: image,
}) {
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore);
  const [thumbnails, setThumbnails] = useState([]);
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const history = useHistory();

  useEffect(() => {
    setIsLoading();
    fetch(
      `${process.env.REACT_APP_API_HOST}/embed/feed/${account_id}?limit=6`,
      {
        credentials: 'include',
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((json) => {
        setThumbnails(json.data);
        unsetIsLoading();
      })
      .catch((ex) => {});
  }, []);

  const previewShop = (url) => {
    window.open(`${process.env.REACT_APP_VOPSHOP_HOST}/${url}`, '_blank');
  };

  const showMore = (id) => {
    history.push(`/account/id/${account_id}/shop/${id}`);
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
        : 'background: url("../../../bg.png")'};
    ${tw`bg-cover rounded-full h-32 w-32 mr-6`}
  `;
  const toastMarkup = active ? (
    <Toast content="Copied successfully" onDismiss={toggleActive} />
  ) : null;

  return (
    <ShopContent>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", marginBottom:"16px"}}>
        <div
          style={{display: 'flex', marginBottom: '20px', cursor: 'pointer', alignItems:"center"}}
          onClick={() => showMore(id)}
        >
          <Image {...{image}} />
          <div>
            <Text>{title !== "undefined"  ? title:null}</Text>
            <p
              style={{
                maxWidth: '20rem',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                marginTop:"10px"
              }}
            >
              <Icon source={PlayCircleMajorMonotone} /> &nbsp;&nbsp;{' '}
              {total_accepted_contents || 0} Videos
            </p>
          </div>
        </div>
        <div className="copy">
          <span className="clipboard_copy" onClick={() => previewShop(handle)}>
            {process.env.REACT_APP_VOPSHOP_HOST}/{handle}
          </span>
          <span
            className="icon"
            onClick={() =>
              copyTextToClipboard(
                `${process.env.REACT_APP_VOPSHOP_HOST}/${handle}`,
              )
            }
          >
            {' '}
            <Icon source={DuplicateMinor} />
          </span>
        </div>
      </div>
      {toastMarkup}
      <ThumbnailContent onClick={() => showMore(id)}>
        {thumbnails &&
          thumbnails.map((item, indx) => (
            <ProductImage key={indx} src={item.cover_img} />
          ))}
      </ThumbnailContent>
    </ShopContent>
  );
}
