import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  ActionList,
  Card,
  Frame,
  Loading,
  Navigation,
  TopBar,
  FooterHelp,
  Icon,
  Button
} from '@shopify/polaris';
import {MenuBar, UserMenu, AccountMenu, MenuIcon, UserProfile, DropdownMenu, Spacing} from "./styles"
import {HomeMajorMonotone, OrdersMajorTwotone, AppsMajorMonotone, AnalyticsMajorMonotone, CircleTickMajorMonotone, FeaturedContentMajorMonotone, LogOutMinor, MobileHamburgerMajorMonotone, StoreMajorMonotone} from '@shopify/polaris-icons';
import Intercom from 'react-intercom';
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {FrameStore, UserStore, AccountStore} from '../../Context/store';
import {findUserInUsersById, logo} from "../../services";
import {useFrameContext} from "../../Hooks/frame.hook";

export const AppFrame = (props) => {
  const { accountId } = useParams();
  const {user, fetchUserDataAsync } = React.useContext(UserStore);
  const {account, fetchAccountDataAsync } = React.useContext(AccountStore);
  const frameContext = useFrameContext();
  
  const userId = user.id
  

  const UsernameInitials = () => {
    return user.name.toUpperCase().slice(0,1);
  }
  const UsernameCapitalize = () => {
    return user.name.charAt(0).toUpperCase() + user.name.slice(1);
  }
  const appID = 'rlquh92b';
  const IntercommUser = {
    user_id: user.id,
    email: user.email,
    name: user.name,
  };

  let location = useLocation();
  const history = useHistory();

  const skipToContentRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);

  const toggleDropdown = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await fetchUserDataAsync();
      // history.push("/login");
    } catch(ex) {
      console.log('parsing failed', ex);
    }
  };

  const searchResultsMarkup = (
    <Card>
      <ActionList items={[{content: 'help center'}]} />
    </Card>
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <MenuBar showNavigationToggle >
      <AccountMenu>
        <MenuIcon >
          <img src={logo("#fff")}/>
            <div onClick={toggleMobileNavigationActive}>
            <Icon source={MobileHamburgerMajorMonotone}  />
            </div>
          </MenuIcon>
        </AccountMenu>
        <UserMenu>
          <UserProfile onClick={toggleDropdown}>
            <div className="initials">{UsernameInitials()}</div>
            <div className="username">{UsernameCapitalize()}</div>
          </UserProfile>
       
        <div className="dropdown">
            <Spacing className="initials">{UsernameInitials()}</Spacing>
              <Spacing>{UsernameCapitalize()}</Spacing>
              <Spacing>{user.email}</Spacing>
            <Spacing><Button url={`/account/id/${accountId}/settings`} outline>Manage Your Account</Button></Spacing>
            <Spacing><Button onClick={handleLogout} plain icon={LogOutMinor}>Logout</Button></Spacing> 
          </div>
        </UserMenu>
      </MenuBar>
  );

  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        separator
        items={[
          {
            label: 'Awaiting Approval',
            url: `/account/id/${accountId}/awaiting`,
            icon: HomeMajorMonotone,
            onClick: frameContext.setIsLoading,
          },
          {
            label: 'Manage Content',
            url: `/account/id/${accountId}/manage`,
            icon: AppsMajorMonotone,
            onClick: frameContext.setIsLoading,
          },
          {
            label: 'Embed',
            url: `/account/id/${accountId}/embed`,
            icon: FeaturedContentMajorMonotone,
            onClick: frameContext.setIsLoading,
          },
          // {
          //   label: 'Connected Account',
          //   url:`/account/id/${accountId}/connect`,
          //   icon: CircleTickMajorMonotone,
          //   // onClick: toggleIsLoading,
          // },
          {
            label: 'Shop',
            url: `/account/id/${accountId}/shop`,
            icon: StoreMajorMonotone,
            onClick: frameContext.setIsLoading,
          },
          {
            label: 'Settings',
            url: `/account/id/${accountId}/settings`,
            icon: OrdersMajorTwotone,
            onClick: frameContext.setIsLoading,
          },
          
          // {
          //   label: 'Logout',
          //   icon: LogOutMinor,
          //   onClick: handleLogout,
          // },
        ]}
      />
    </Navigation>
  );

  const loadingMarkup = frameContext.isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );

  return (
    <div style={{height: '100vh'}}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef.current}
      >

        {loadingMarkup}
        <FrameStore.Provider value={frameContext}>
          {React.cloneElement(props.children, {user: user, account: account})}
        </FrameStore.Provider>
        <FooterHelp>
        Copyright © 2020 Dream Big Labs, Inc. Made with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          in SF
        </FooterHelp>
        <Intercom appID={appID} {...IntercommUser} />
      </Frame>
    </div>
  );
}
