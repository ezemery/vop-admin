import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  ActionList,
  Card,
  Frame,
  Layout,
  Loading,
  Navigation,
  TopBar,
  FooterHelp,
} from '@shopify/polaris';
import {HomeMajorMonotone, OrdersMajorTwotone} from '@shopify/polaris-icons';
import Intercom from 'react-intercom';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {UserStore} from '../../Context/store';

export default function AppFrame(props) {
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  });
  const skipToContentRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);

  const toggleUserMenuActive = useCallback(
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
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );

  const {user, fetchUserDataAsync} = React.useContext(UserStore);
  const appID = 'rlquh92b';
  const IntercommUser = {
    user_id: user.id,
    email: user.email,
    name: user.username,
  };
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchUserDataAsync();
  }, [fetchUserDataAsync]);

  const handleLogout = () => {
    fetch(process.env.REACT_APP_API_HOST + '/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        history.push('/login');
      })
      .catch(function (ex) {
        console.log('parsing failed', ex);
      });
  };

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

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
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        separator
        items={[
          {
            label: 'Awaiting Approval',
            icon: HomeMajorMonotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Manage Content',
            icon: OrdersMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Embed',
            icon: OrdersMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Settings',
            icon: OrdersMajorTwotone,
            onClick: toggleIsLoading,
          },
          {
            label: 'Logout',
            icon: OrdersMajorTwotone,
            onClick: handleLogout,
          },
        ]}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

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
        {React.cloneElement(props.children, {user: user})}
        <FooterHelp>
          Vop ©2020. Made with{' '}
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
