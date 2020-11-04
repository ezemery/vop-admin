import React,{useState, useCallback, useEffect} from 'react'
import {ShopContent, ProductImage, ThumbnailContent} from '../styles'
import {DisplayText,Icon, Thumbnail, Toast} from '@shopify/polaris';
import { useHistory} from 'react-router-dom';
import { ClipboardMinor } from '@shopify/polaris-icons';
import {FrameStore} from "../../../Context/store";
import tw, {styled} from 'twin.macro';

export default function ShopList({handle,title,description, account_id, id}) {
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore);
    const [thumbnails, setThumbnails] = useState();
    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const history = useHistory();

      useEffect(()=>{
        setIsLoading()
        fetch(process.env.REACT_APP_API_HOST + '/embed/feed/' + account_id, {
          credentials: 'include',
          method: 'GET',
      }).then(function (response) {
          return response.json()
      }).then(function (json) {
          setThumbnails(json.data)
          unsetIsLoading();
      }).catch(function (ex) {
      });
      }, [])
    

    const showMore = (id)  =>  {
      history.push(`/account/id/${account_id}/shop/${id}`)
    }

    const fallbackCopyTextToClipboard = (text) =>  {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      
        document.body.removeChild(textArea);
      }

      const copyTextToClipboard = (text) => {
        if (!navigator.clipboard) {
          fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text).then(function() {
            toggleActive();
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }

    const Image = styled.div`
    ${({image}) => image ? `background: url(${image})`:`background: url("../../../bg.png")`};
    ${tw`bg-cover rounded-full h-24 w-24 mr-6`}
    `
    const toastMarkup = active ? (
        <Toast content="Copied successfully" onDismiss={toggleActive} />
      ) : null;
      
    return (
        <ShopContent>
             <div>
                 <div style={{display:"flex", marginBottom:"20px", cursor:"pointer"}} onClick={()=>showMore(id)}>
                    <Image/>
                    <div>
                    <DisplayText size="medium" >{title}</DisplayText>
                    <p>{description}</p>
                    </div>
                   
                 </div>
                <div className="clipboard_copy" onClick={() => copyTextToClipboard(`vop.shop/${handle}`)}> 
                    <span className="copy">vop.shop/{handle}</span><Icon source={ClipboardMinor} />
                </div>
             </div>
             {toastMarkup}
            <ThumbnailContent onClick={()=>showMore(id)}>{thumbnails && thumbnails.map((item, indx)=> <ProductImage key={indx} src={item.cover_img}></ProductImage>)}</ThumbnailContent>
        </ShopContent>
    )
}
