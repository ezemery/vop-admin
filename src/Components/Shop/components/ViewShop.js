import React,{useCallback, useState, useEffect} from 'react'
import {UserStore, FrameStore} from "../../../Context/store";
import {useParams, useHistory} from 'react-router-dom';
import tw, {styled} from 'twin.macro';
import {ViewStyles} from '../styles'
import { ClipboardMinor, DeleteMinor, EditMinor, MobileVerticalDotsMajorMonotone } from '@shopify/polaris-icons';
import {TikTokCard} from '../../TikTok';
import {TikTokModal} from '../../TikTok';
import {
    EmptyState,
    Button,
    Page,
    Icon,
    Toast,
    DisplayText,
    Popover,
    ActionList
 
  } from '@shopify/polaris';
export const ViewShop = () => {
    const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore);
    const {user} = React.useContext(UserStore);
    const userId = user.id;
    const history = useHistory();
    const {shop_id, accountId } = useParams();
    const [shop, setShop] = useState({})
    const [active, setActive] = useState(false);
    const [thumbnails, setThumbnails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modal, setModal] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);

    useEffect(() => {
        setIsLoading()
        fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((json) => {
            setShop(json.shop)
            unsetIsLoading()
            
            //throw new Error('Network response was not ok');
          })
          .catch((ex) => {
          });
      }, [])

      const editShop = () => {
        history.push(`/account/id/${accountId}/shop/edit/${shop_id}`)
      }
      const deleteShop = () => {
        setIsLoading()
        fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((json) => {
            
            unsetIsLoading()
            history.push(`/account/id/${accountId}/shop/`)
          })
          .catch((ex) => {
          });
      }

      useEffect(()=>{
        setIsLoading()
        fetch(process.env.REACT_APP_API_HOST + '/embed/feed/' + shop.account_id, {
          credentials: 'include',
          method: 'GET',
      }).then(function (response) {
          return response.json()
      }).then(function (json) {
          if(json.data){
            unsetIsLoading();
            setThumbnails(json.data)
          }
      }).catch(function (ex) {
      });
      }, [shop])


      const openModal = (index) => {
        setCurrentIndex(index);
        setModal(true);
      };
    
      let feedList = thumbnails.length >  0 && thumbnails.map((item, idx) => (
        <TikTokCard
          item={item}
          currentIndex={idx}
          key={item.id}
          openModal={openModal}
          user={user}
        />
      ));

      const previewShop = (url) => {
        window.open(`https://${process.env.REACT_APP_VOPSHOP_HOST}/${url}`,"_blank");
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
      ${({image}) => image ? `background: url(${image})`:`background: url("../../../../bg.png")`};
      ${tw`bg-cover rounded-full h-24 w-24 mr-6`}
      `
      const toastMarkup = active ? (
        <Toast content="Copied successfully" onDismiss={toggleActive} />
      ) : null;

    return (
        <Page
        primaryAction={{content: 'Preview Shop', onAction: () => previewShop(shop.handle)}}
        fullWidth
        title={shop.title}
        breadcrumbs={[
          {
            content: 'All Shops',
            url: `/account/id/${accountId}/shop`,
          },
        ]}
      >
         {shop && shop.handle ? <ViewStyles >
              <div style={{display:"flex", marginBottom:"20px"}}>
              <Image/>
                <div>
                    <DisplayText size="medium">{shop.title}</DisplayText>
                    <p>{shop.description}</p>
                </div> 
              </div>
              <div style={{display:"flex"}}>
              <div className="clipboard_copy" onClick={() => copyTextToClipboard(`${process.env.REACT_APP_VOPSHOP_HOST}/${shop.handle}`)}> 
              <span className="copy">{process.env.REACT_APP_VOPSHOP_HOST}/{shop.handle}</span><Icon source={ClipboardMinor} />   
            </div>
                <div className="list-item drop">  
                    <div className="">
                        <Icon source={MobileVerticalDotsMajorMonotone} />
                    </div>
                    <div className="dropdown-content">
                        <div style={{marginBottom:"5px"}}>
                            <Button plain icon={EditMinor} onClick={()=>{editShop()}}>Edit Shop</Button>
                        </div>
                        <Button plain destructive icon={DeleteMinor} onClick={()=>{deleteShop()}}>
                            Delete Shop
                        </Button>
                        </div>
                </div>
                   
              </div>
             
        </ViewStyles>: null } 
        <div style={{display:"flex", flexWrap: "wrap"}}>{feedList}</div>
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
    )
}