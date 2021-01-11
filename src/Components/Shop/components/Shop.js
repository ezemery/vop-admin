import React, {useState, useCallback, useEffect} from 'react';
import {EmptyState, Button, Page, Modal, Heading} from '@shopify/polaris';
import {Switch, Route, useHistory, useParams} from 'react-router-dom';
import {UserStore, FrameStore} from "../../../Context/store";
import ShopList from './ShopList'

export const Shop = () => {
  const {accountId} = useParams();
  const history = useHistory();
  const {user} = React.useContext(UserStore);
  const userId = user.id;
  const [shops, setShops]  = useState([])
 
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore)

  const addShop = () => {
      history.push(`/account/id/${accountId}/shop/create`)
  }

  useEffect(() => {
    setIsLoading()
    fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/`, {
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
        setShops(json.shops)
        unsetIsLoading()
        //throw new Error('Network response was not ok');
      })
      .catch((ex) => {
      });
  }, [])

  return (
    <Page fullWidth title="All Shops">
        {shops && shops.length  > 0 ? shops.map((item) => <ShopList {...item} key={item.id}/>): <EmptyState
        heading="Create and customise your vop shops"
        image="../../../../illustration.png"
      >
        <Button
                primary
                url={`/account/id/${accountId}/shop/create`}
              >
                {' '}
                Create new shop
              </Button>
      </EmptyState>}
     
    </Page>
  );
};
