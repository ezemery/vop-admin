import React, {useCallback, useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import tw, {styled} from 'twin.macro';
import instagram from '../../Icons/instagram.png';
import NumericLabel from 'react-pretty-numbers';
import {
  ClipboardMinor,
  DuplicateMinor,
  DeleteMinor,
  EditMinor,
  MobileVerticalDotsMajorMonotone,
  PlayCircleMajorMonotone,
  HeartMajorMonotone
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
import {ViewStyles, Text} from '../styles';
import {TikTokCard, TikTokModal} from '../../TikTok';
import {UserStore, FrameStore} from '../../../Context/store';

export const ViewShop = () => {
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore);
  const {user} = React.useContext(UserStore);
  const userId = user.id;
  const history = useHistory();
  const {shop_id, accountId} = useParams();
  const [shop, setShop] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [active, setActive] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        if(json.shop.title !== "undefined"){
          setTitle(json.shop.title)
        }
        if(json.shop.description !== "undefined"){
          setDesc(json.shop.description)
        }
        unsetIsLoading();

        // throw new Error('Network response was not ok');
      })
      .catch((ex) => {});
  }, []);
  const Tiktok = useCallback(
    () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.92459 0C5.95687 0 9.99165 0 14.0239 0C14.0314 0.00751556 14.0415 0.0200415 14.049 0.0200415C14.9331 0.152816 15.5292 0.651349 15.8623 1.47054C15.9249 1.62336 15.9549 1.7887 16 1.94904C16 1.9816 16 2.01668 16 2.04924C15.9599 2.08181 15.975 2.1269 15.975 2.16448C15.975 6.05504 15.975 9.94309 15.975 13.8336C15.975 13.8737 15.9599 13.9188 16 13.9489C16 13.9915 16 14.0315 16 14.0741C15.9649 14.0817 15.9775 14.1117 15.9725 14.1343C15.742 15.239 14.8629 15.9981 13.791 15.9981C9.92904 16.0006 6.06957 16.0006 2.2076 15.9981C1.00543 15.9981 0.00361764 14.9885 0.00111312 13.786C-0.0013914 9.92805 0.00111312 6.07007 0.00111312 2.21208C-0.0013914 1.3052 0.579658 0.478491 1.4312 0.147806C1.59399 0.0851763 1.7643 0.0651348 1.92459 0ZM11.0235 4.74983C11.0235 4.72478 11.0035 4.72478 10.9885 4.72228C10.9659 4.70224 10.9434 4.6847 10.9233 4.66466C10.9133 4.64462 10.9058 4.61706 10.8732 4.62457H10.8757C10.8757 4.61706 10.8808 4.60704 10.8757 4.60203C10.5226 4.15109 10.3072 3.64755 10.3197 3.06384C10.3197 3.01123 10.2922 3.00121 10.2496 3.00372C10.1094 3.00622 9.96661 3.00873 9.82635 3.01123L9.81633 3.00372C9.81884 3.00121 9.82134 2.9962 9.81884 2.9937C9.81634 2.98618 9.81383 2.98117 9.81133 2.97366C9.80632 2.87846 9.79129 2.78326 9.7963 2.68807C9.80131 2.59287 9.77125 2.57032 9.67859 2.57032C9.16265 2.57533 8.64672 2.57784 8.13079 2.57032C8.01308 2.56782 7.99054 2.60539 7.99054 2.71562C7.99304 5.00286 7.99304 7.28759 7.99304 9.57482C7.99304 9.68756 7.98803 9.80029 7.97551 9.91052C7.89537 10.6546 7.14902 11.2558 6.40518 11.1932C6.22235 11.1781 6.04953 11.1205 5.87422 11.0804C5.87171 11.0579 5.85418 11.0554 5.83665 11.0579C5.81912 11.0404 5.80159 11.0253 5.78656 11.0078C5.76903 10.9802 5.754 10.9502 5.73647 10.9226C5.3658 10.3264 5.45346 9.54727 5.95937 9.05875C6.35509 8.67546 6.83345 8.5502 7.36942 8.67296C7.45207 8.693 7.47962 8.67546 7.47461 8.58778C7.46709 8.47254 7.4721 8.3548 7.4721 8.23956C7.4721 7.81618 7.4721 7.3903 7.4721 6.96692C7.4721 6.92183 7.49214 6.86171 7.40949 6.8567C7.25671 6.84918 7.10394 6.81661 6.94866 6.83916L6.94114 6.83164C6.94365 6.74897 6.93613 6.6638 6.94866 6.58363C6.9712 6.44584 6.90358 6.41578 6.78586 6.41077C6.21233 6.3782 5.65883 6.45336 5.13538 6.69386C3.19939 7.58069 2.58578 9.98818 3.86559 11.6967C4.05844 11.9522 4.27383 12.1877 4.55183 12.3556H4.54932C4.55433 12.3831 4.57687 12.3881 4.59942 12.3957C4.63197 12.4207 4.66453 12.4483 4.69709 12.4733C4.72214 12.5109 4.74468 12.5535 4.79978 12.556C4.79477 12.581 4.8148 12.5911 4.82983 12.6036C5.56366 13.2374 6.41019 13.5105 7.37693 13.4103C8.11827 13.3326 8.75943 13.032 9.29539 12.5159C9.98414 11.8545 10.3172 11.0353 10.3197 10.0809C10.3222 8.94352 10.3197 7.80616 10.3197 6.66881C10.3197 6.62622 10.3072 6.57862 10.3323 6.53102C10.4951 6.62371 10.6528 6.72142 10.8156 6.8091C11.3967 7.12225 12.0228 7.26755 12.679 7.29761C12.7316 7.30011 12.7992 7.32517 12.7992 7.22496C12.7967 6.67382 12.7967 6.12518 12.7967 5.57404C12.7967 5.54147 12.8017 5.50389 12.7491 5.5064C12.5913 5.51141 12.4361 5.46632 12.2783 5.4588L12.2683 5.45129C12.2708 5.3611 12.2683 5.26841 12.2758 5.17822C12.2833 5.09304 12.2532 5.06048 12.1681 5.06048C11.9101 5.06048 11.6597 5.00536 11.4192 4.91518C11.2865 4.86507 11.1563 4.80495 11.0235 4.74983Z" fill="#010101"/>
      <path d="M15.9975 13.9538C15.9574 13.9213 15.9724 13.8762 15.9724 13.8386C15.9724 9.94804 15.9724 6.05999 15.9724 2.16944C15.9724 2.12935 15.9574 2.08426 15.9975 2.0542C15.9975 6.0174 15.9975 9.98562 15.9975 13.9538Z" fill="#121212"/>
      <path d="M4.69964 12.4683C4.66708 12.4432 4.63452 12.4156 4.60197 12.3906C4.59696 12.363 4.58443 12.3455 4.55187 12.3505H4.55438C4.5644 12.3029 4.52182 12.2854 4.49928 12.2603C3.89319 11.5188 3.63021 10.672 3.75043 9.71756C3.87064 8.77812 4.32647 8.02907 5.08283 7.4654C5.63383 7.05705 6.26246 6.86916 6.94119 6.82908L6.9487 6.8366C6.9487 7.30757 6.9487 7.77604 6.9487 8.25203C6.82348 8.23199 6.71077 8.20192 6.59556 8.19441C5.47604 8.12426 4.6771 9.21903 5.09536 10.2587C5.2306 10.5919 5.44849 10.8574 5.7841 11.0077C5.80163 11.0253 5.81916 11.0403 5.83419 11.0578C5.8417 11.0729 5.84671 11.0929 5.87176 11.0804C5.85924 11.133 5.90432 11.153 5.93187 11.1806C6.35263 11.6165 7.00881 11.7543 7.57734 11.5263C8.14085 11.3008 8.51904 10.7422 8.51904 10.1334C8.51904 7.81362 8.51904 5.49382 8.51904 3.17401C8.51904 3.1189 8.52154 3.06629 8.52405 3.01118C8.95482 3.00867 9.3831 3.00617 9.81387 3.00366L9.82389 3.01118C9.86897 3.32182 9.98168 3.60992 10.147 3.87547C10.3348 4.17859 10.5627 4.44164 10.8733 4.62702H10.8708C10.8783 4.65458 10.9008 4.65709 10.9209 4.66711C10.9434 4.68715 10.966 4.70468 10.986 4.72473C10.991 4.74226 10.9985 4.75479 11.0211 4.75228C11.0286 4.79738 11.0686 4.81742 11.0987 4.84497C11.4343 5.15311 11.8225 5.35603 12.2683 5.45123L12.2783 5.45874C12.2758 5.89214 12.2733 6.32554 12.2758 6.75894C12.2758 6.83159 12.2633 6.86415 12.1806 6.85664C12.0529 6.84411 11.9252 6.85413 11.7975 6.8366C11.3266 6.77647 10.8783 6.65372 10.45 6.4533C10.2246 6.34809 10.0142 6.22032 9.79384 6.07252C9.79384 6.13514 9.79384 6.18024 9.79384 6.22283C9.79384 7.38022 9.79384 8.53762 9.79384 9.69752C9.79384 9.90295 9.7738 10.1059 9.73874 10.3063C9.35805 12.348 7.19665 13.5355 5.26817 12.7664C5.10788 12.7037 4.96763 12.601 4.79982 12.5584C4.7898 12.4933 4.7322 12.4958 4.69964 12.4683Z" fill="#FEFDFD"/>
      <path d="M4.79967 12.551C4.96748 12.5936 5.11023 12.6963 5.26802 12.7589C7.194 13.528 9.3554 12.3431 9.73859 10.2988C9.77616 10.0984 9.79619 9.8955 9.79369 9.69007C9.79119 8.53267 9.79369 7.37528 9.79369 6.21538C9.79369 6.17028 9.79369 6.12769 9.79369 6.06506C10.0141 6.21538 10.227 6.34063 10.4499 6.44585C10.8781 6.64627 11.3265 6.76902 11.7973 6.82915C11.9275 6.84668 12.0553 6.83666 12.1805 6.84919C12.2631 6.8567 12.2757 6.82414 12.2757 6.75149C12.2732 6.31809 12.2782 5.88469 12.2782 5.45129C12.436 5.4563 12.5887 5.5039 12.749 5.49889C12.7991 5.49639 12.7966 5.53396 12.7966 5.56653C12.7966 6.11767 12.7941 6.66631 12.7991 7.21745C12.7991 7.32016 12.7315 7.29261 12.6789 7.2901C12.0227 7.26004 11.3966 7.11474 10.8155 6.80159C10.6527 6.71391 10.495 6.61621 10.3322 6.52351C10.3071 6.57111 10.3196 6.61621 10.3196 6.6613C10.3196 7.79865 10.3196 8.93601 10.3196 10.0734C10.3171 11.0278 9.98403 11.8445 9.29529 12.5084C8.75932 13.022 8.12067 13.3251 7.37683 13.4028C6.41008 13.503 5.56355 13.2299 4.82973 12.5961C4.8147 12.5861 4.79466 12.576 4.79967 12.551Z" fill="#FC014C"/>
      <path d="M8.52651 3.00866C8.524 3.06377 8.5215 3.11638 8.5215 3.17149C8.5215 5.4913 8.5215 7.8111 8.5215 10.1309C8.5215 10.7422 8.14332 11.2983 7.5798 11.5238C7.01127 11.7518 6.35509 11.614 5.93433 11.1781C5.90678 11.1505 5.8617 11.1305 5.87422 11.0779C6.04954 11.1179 6.22235 11.1731 6.40518 11.1906C7.14902 11.2532 7.89537 10.652 7.97551 9.90794C7.98804 9.79771 7.99305 9.68498 7.99305 9.57225C7.99305 7.28501 7.99555 5.00028 7.99054 2.71304C7.99054 2.60282 8.01058 2.56524 8.1308 2.56774C8.64673 2.57526 9.16266 2.57275 9.67859 2.56774C9.77126 2.56774 9.80382 2.58778 9.7963 2.68549C9.79129 2.78068 9.80382 2.87588 9.81133 2.97108C9.42814 2.97108 9.04244 2.97358 8.65925 2.97609C8.61417 2.97609 8.55907 2.95354 8.52651 3.00866Z" fill="#3DCBD1"/>
      <path d="M6.94364 6.82677C6.26491 6.86434 5.63377 7.05223 5.08528 7.46308C4.32641 8.02675 3.87059 8.7758 3.75288 9.71525C3.63266 10.6697 3.89564 11.5165 4.50173 12.258C4.52427 12.2856 4.56685 12.3031 4.55683 12.3482C4.27883 12.1803 4.06094 11.9449 3.87059 11.6893C2.59078 9.9833 3.20439 7.57331 5.14038 6.68648C5.66633 6.44598 6.21733 6.36832 6.79086 6.40339C6.90858 6.41091 6.9762 6.44097 6.95366 6.57625C6.93863 6.65892 6.94364 6.7441 6.94364 6.82677Z" fill="#3BCAD0"/>
      <path d="M5.78651 11.0053C5.4509 10.8524 5.23301 10.5869 5.09777 10.2562C4.67701 9.21906 5.47845 8.12429 6.59797 8.19193C6.71569 8.19945 6.82588 8.22951 6.95111 8.24955C6.95111 7.77357 6.95111 7.30259 6.95111 6.83412C7.10639 6.81158 7.25666 6.84164 7.41194 6.85166C7.49459 6.85667 7.47456 6.91429 7.47456 6.96189C7.47456 7.38526 7.47456 7.81115 7.47456 8.23452C7.47456 8.35227 7.46955 8.4675 7.47706 8.58274C7.48207 8.67042 7.45452 8.68546 7.37187 8.66792C6.8334 8.54516 6.35754 8.67042 5.96182 9.05372C5.45591 9.54473 5.36825 10.3238 5.73892 10.9176C5.75395 10.9476 5.76898 10.9777 5.78651 11.0053Z" fill="#FC014C"/>
      <path d="M10.8757 4.62446C10.5652 4.43908 10.3373 4.17603 10.1494 3.8729C9.98414 3.60735 9.87144 3.31926 9.82635 3.00861C9.96661 3.00611 10.1094 3.0036 10.2496 3.0011C10.2922 3.0011 10.3223 3.01112 10.3197 3.06122C10.3072 3.64493 10.5226 4.14597 10.8757 4.59941C10.8808 4.60692 10.8757 4.61694 10.8757 4.62446Z" fill="#FC014C"/>
      <path d="M12.2707 5.44882C11.8249 5.35613 11.4367 5.15071 11.1011 4.84257C11.0711 4.81501 11.031 4.79497 11.0235 4.74988C11.1562 4.80499 11.2865 4.86512 11.4192 4.91522C11.6596 5.00541 11.9101 5.06052 12.1681 5.06052C12.2557 5.06052 12.2833 5.09058 12.2758 5.17826C12.2707 5.26595 12.2733 5.35613 12.2707 5.44882Z" fill="#3BCAD0"/>
      <path d="M8.52655 3.00876C8.56161 2.95366 8.61671 2.9762 8.66179 2.9762C9.04499 2.9737 9.43068 2.9737 9.81387 2.97119C9.81638 2.97871 9.81888 2.98371 9.82139 2.99123C9.82139 2.99373 9.81888 2.99874 9.81888 3.00125C9.3856 3.00375 8.95482 3.00626 8.52655 3.00876Z" fill="#3BCAD0"/>
      <path d="M4.69958 12.4683C4.73465 12.4958 4.79225 12.4958 4.80227 12.5509C4.74717 12.5484 4.72463 12.5058 4.69958 12.4683Z" fill="#FC014C"/>
      <path d="M10.9233 4.66472C10.9033 4.65471 10.8782 4.6522 10.8732 4.62465C10.9058 4.61714 10.9133 4.64218 10.9233 4.66472Z" fill="#FC014C"/>
      <path d="M4.55182 12.348C4.58438 12.343 4.5969 12.3605 4.60191 12.3881C4.57937 12.3831 4.55683 12.3756 4.55182 12.348Z" fill="#3BCAD0"/>
      <path d="M11.0235 4.74972C11.001 4.75222 10.9935 4.7372 10.9885 4.72217C11.006 4.72467 11.026 4.72467 11.0235 4.74972Z" fill="#3BCAD0"/>
      <path d="M5.87418 11.078C5.84913 11.0905 5.84412 11.0704 5.83661 11.0554C5.85414 11.0554 5.87167 11.0554 5.87418 11.078Z" fill="#3DCBD1"/>
      </svg>
    ),[])

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

  let params = {
    justification: 'L',
    commafy: false,
    shortFormat: true,
  };

  //style={{borderTop:"1px solid #DFE3E8"}}

  const Container = styled.div`
    ${tw`mx-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-7 gap-2`}
  `;

  const Content = styled.div`
    ${tw`relative rounded-md`}
    height: 410px;
    
    img{
        ${tw`h-full w-full object-cover overflow-hidden`} 
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0.024247198879551846) 46%, rgba(0,212,255,0) 100%);
    }

    &:hover .bio{
      ${tw`flex`} 
      background: rgb(0,0,0);
      background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(9,9,121,0.024247198879551846) 46%, rgba(0,212,255,0) 100%);
    }

    .bio{
        ${tw`hidden text-white justify-between text-sm absolute bottom-0 p-5 left-0 right-0 object-cover w-full m-auto`} 
        
     p{
        ${tw`font-semibold`}  
     }
     .Polaris-Icon__Svg, .Polaris-Icon__Img{
       fill:white;
       width:20px;
     }
     .Polaris-Icon {
       width:1rem;
       height:1rem;
     }
    }
`

  const feedList =
    thumbnails.length > 0 &&
    thumbnails.map((item, idx) => (
      <Content  key={item.id}>
        <img src={item.cover_img}/>
        <div className="overlay"></div>
        <div className="bio">
                <div>{item.platform ==="instagram"? <img src={instagram} style={{height:"15px"}}/>:<Tiktok/>}</div>
                <p>@{item.author_handle}</p>
                <div style={{display:"flex"}}><Icon source={HeartMajorMonotone} /> &nbsp; <NumericLabel params={params}>{item.like_count}</NumericLabel></div>
        </div>
      </Content>
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
    ${tw`bg-cover rounded-full h-32 w-32 mr-6`}
  `;
  
  const toastMarkup = active ? (
    <Toast content="Copied successfully" onDismiss={toggleActive} />
  ) : null;

  return (
    <Page
      primaryAction={
        <div>
           <Button
            primary
            onClick={() => previewShop(shop.handle)}
            connectedDisclosure={{
              accessibilityLabel: 'Other save actions',
              actions: [{
                content: 'Edit Shop',
                onAction:() => {
                  editShop()
                }
            },
            {
              content: 'Delete Shop',
              onAction:() => {
                deleteShop()
              }
          }],
            }}
          >
            Preview Shop
          </Button>
        </div>
       
      }
      fullWidth
      title={title}
      breadcrumbs={[
        {
          content: 'All Shops',
          url: `/account/id/${accountId}/shop`,
        },
      ]}
    >
      {shop && shop.handle ? (
        <ViewStyles>
          <div>
          <div style={{display: 'flex', marginBottom: '20px', alignItems:"center"}}>
            <Image image={shop.shop_image} />
            <div>
            <Text>{title !== "undefined"  ? title:null}</Text>
              <p
                style={{
                  maxWidth: '20rem',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginTop: '8px',
                  marginBottom: '15px',
                }}
              >
                <Icon source={PlayCircleMajorMonotone} /> &nbsp;&nbsp;{' '}
                {shop.total_accepted_contents} Videos
              </p>
            </div>
          </div>

          <div style={{display: 'flex'}}>
                <p style={{maxWidth: '48rem', color: "#637381"}}>{description}</p>
              </div>
          </div>
       
          <div className="copy_container">
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
          </div>
        </ViewStyles>
      ) : null}
      <Container >{feedList}</Container>
      {toastMarkup}
    </Page>
  );
};
