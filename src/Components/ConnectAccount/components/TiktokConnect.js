import React, {useCallback, useState, useContext} from 'react';
import {
  EmptyState,
  Button,
  Page,
  Modal,
  Heading,
  DisplayText,
  Form,
  FormLayout,
  TextField,
  Icon,
  Loading,
  Tag,
  TextContainer,
  Stack,
} from '@shopify/polaris';
import {
  MentionMajorMonotone,
  HashtagMajorMonotone,
} from '@shopify/polaris-icons';
import {useForm, Controller} from 'react-hook-form';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import {Container, FormField} from '../styles';
import {UserStore, FrameStore} from '../../../Context/store';

export const TiktokConnect = () => {
  const {accountId} = useParams();
  const {user} = React.useContext(UserStore);
  const userId = user.id;
  const history = useHistory();
  const [form, setForm] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {register, handleSubmit, control} = useForm();
  const [textFieldValue, setTextFieldValue] = useState('');
  const {unsetIsLoading, setIsLoading, isLoading} = useContext(FrameStore);
  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const addTags = ({tag}) => {
    const options = [...selectedOptions];
    options.push(tag);
    setSelectedOptions(options);
  };

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const titleCase = (string) =>
    string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');

  const tagsMarkup = selectedOptions.map((option) => {
    let tagLabel = '';
    tagLabel = option.replace('_', ' ');
    tagLabel = titleCase(tagLabel);
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {tagLabel}
      </Tag>
    );
  });

  const nextScreen = (value) => {
    setForm(value);
  };

  const setUsername = ({username}) => {
    setInvalidUsername(false);
    setAlreadyExists(false);
    setLoading(true);
    setIsLoading();
    if (!username) {
      setLoading(false);
      setInvalidUsername(true);
      return;
    }

    const data = {platform: 'tiktok', type: 'username', data: username};

    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        if (!response.ok) {
          unsetIsLoading();
          setLoading(false);
          if (response.status === 409) return setAlreadyExists(true);
          if (response.status === 400) return setInvalidUsername(true);
          throw new Error('Network response was not ok');
        }
        setInvalidUsername(false);
        return response.json();
      })
      .then((json) => {
        unsetIsLoading();
        setLoading(false);
        if (json.success) {
          nextScreen('connected');
        }
        setInvalidUsername(true);
      })
      .catch((ex) => {
        setLoading(false);
        setInvalidUsername(true);
      });
  };

  const setDefault = () => {
    setForm('');
    history.push(`/account/id/${accountId}/connect`);
  };

  const setTags = ({tag}) => {
    setInvalidUsername(false);
    setAlreadyExists(false);
    setLoading(true);
    setIsLoading();

    if (!tag) {
      setLoading(false);
      setInvalidUsername(true);
      return;
    }

    const data = {platform: 'tiktok', type: 'tag', data: tag};

    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        if (!response.ok) {
          unsetIsLoading();
          setLoading(false);
          if (response.status === 409) return setAlreadyExists(true);
          if (response.status === 400) return setInvalidUsername(true);
          throw new Error('Network response was not ok');
        }
        setInvalidUsername(false);
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          unsetIsLoading();
          setLoading(false);
          nextScreen('connected');
        }
        setInvalidUsername(true);
        throw new Error('Network response was not ok');
      })
      .catch((ex) => {
        setLoading(false);
        setInvalidUsername(true);
      });
  };

  const Check = useCallback(
    () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM10.0234 4.71406L6.73281 9.27656C6.68682 9.34076 6.62619 9.39306 6.55595 9.42914C6.48571 9.46523 6.40787 9.48405 6.32891 9.48405C6.24994 9.48405 6.17211 9.46523 6.10186 9.42914C6.03162 9.39306 5.97099 9.34076 5.925 9.27656L3.97656 6.57656C3.91719 6.49375 3.97656 6.37813 4.07812 6.37813H4.81094C4.97031 6.37813 5.12187 6.45469 5.21562 6.58594L6.32812 8.12969L8.78438 4.72344C8.87813 4.59375 9.02812 4.51562 9.18906 4.51562H9.92188C10.0234 4.51562 10.0828 4.63125 10.0234 4.71406Z"
          fill="#B3BCF5"
        />
      </svg>
    ),
    [],
  );

  const Logo = useCallback(
    () => (
      <svg
        width="90"
        height="39"
        viewBox="0 0 90 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M75.7587 0.104982C72.0547 0.103275 68.4956 1.48497 65.8356 3.95725C63.1755 6.42952 61.6236 9.79809 61.5088 13.3491V34.1606H61.5895C61.7509 35.2466 62.3152 36.2404 63.1791 36.9592C64.043 37.6781 65.1483 38.0738 66.292 38.0738C67.4358 38.0738 68.5409 37.6781 69.4048 36.9592C70.2687 36.2404 70.8331 35.2466 70.9945 34.1606V26.657C72.9512 27.3214 75.0358 27.5678 77.1021 27.3789C79.1687 27.1901 81.1671 26.5705 82.9578 25.5633C84.7485 24.5563 86.2881 23.1862 87.4691 21.5489C88.6501 19.9115 89.4438 18.0465 89.7949 16.0842C90.146 14.122 90.0458 12.1097 89.5013 10.1884C88.957 8.26713 87.9816 6.48309 86.6433 4.96113C85.3051 3.43915 83.6363 2.21598 81.7538 1.37717C79.8711 0.538367 77.8203 0.104182 75.7445 0.104982H75.7587ZM75.7587 18.2968C74.8193 18.2968 73.901 18.0297 73.1198 17.529C72.3387 17.0284 71.7298 16.3168 71.3703 15.4844C71.0108 14.6519 70.9167 13.7358 71.1 12.852C71.2834 11.9683 71.7357 11.1565 72.4 10.5194C73.0643 9.88221 73.9107 9.44829 74.832 9.2725C75.7534 9.09671 76.7085 9.18694 77.5765 9.53177C78.4444 9.87659 79.1863 10.4605 79.7082 11.2098C80.2301 11.959 80.5087 12.8398 80.5087 13.7409C80.5087 14.9493 80.0083 16.108 79.1175 16.9624C78.2267 17.8168 77.0185 18.2968 75.7587 18.2968Z"
          fill="black"
        />
        <path
          d="M27.4599 0.943066C25.9618 0.111515 24.1808 -0.115649 22.5082 0.311481C20.8356 0.738608 19.4082 1.78508 18.5394 3.22104L9.73777 18.0461C9.16822 18.9892 8.86545 20.0586 8.85947 21.1484C8.85348 22.2383 9.14447 23.3108 9.70363 24.2596C10.2628 25.2083 11.0707 26.0006 12.0473 26.5576C13.024 27.1148 14.1353 27.4175 15.2715 27.4358H15.623H15.7798H15.9698C16.2364 27.4138 16.5014 27.3758 16.763 27.322C17.4302 27.1882 18.0715 26.9545 18.6629 26.6294L18.7865 26.5519L18.8672 26.5018C19.0192 26.4107 19.1665 26.3151 19.3137 26.2103C20.0845 25.6522 20.7158 24.9362 21.1615 24.1145L29.8729 9.49911C30.3006 8.78545 30.5775 7.99792 30.6877 7.18157C30.798 6.36522 30.7393 5.53604 30.5152 4.74143C30.2912 3.94681 29.9059 3.20235 29.3817 2.5506C28.8575 1.89886 28.2045 1.3526 27.4599 0.943066Z"
          fill="black"
        />
        <path
          d="M12.248 3.23498C11.8281 2.50617 11.2611 1.86495 10.5799 1.34881C9.89868 0.832654 9.11704 0.451943 8.28066 0.228908C7.44428 0.00588168 6.56993 -0.0549845 5.70873 0.0498725C4.84754 0.154728 4.01678 0.423197 3.26503 0.839601C2.51327 1.25599 1.8556 1.81195 1.33048 2.47498C0.805348 3.138 0.423283 3.89478 0.206647 4.70109C-0.00999386 5.50738 -0.056877 6.34701 0.0687399 7.17088C0.194357 7.99477 0.489955 8.78636 0.938246 9.49939L7.51222 20.5611C7.51543 19.4686 7.81674 18.3958 8.38622 17.4495L14.5612 7.09385L12.248 3.23498Z"
          fill="black"
        />
        <path
          d="M45.4452 0.34668C42.627 0.34668 39.8718 1.14829 37.5284 2.65012C35.1851 4.15196 33.3587 6.28658 32.28 8.78405C31.2016 11.2815 30.9193 14.0297 31.4691 16.6809C32.019 19.3322 33.3761 21.7675 35.3691 23.6792C37.362 25.5906 39.901 26.8923 42.6653 27.4197C45.4295 27.947 48.2946 27.6764 50.8986 26.6419C53.5023 25.6074 55.7278 23.8556 57.2936 21.6079C58.8595 19.3602 59.6952 16.7177 59.6952 14.0145C59.6952 10.3896 58.1939 6.9131 55.5215 4.34989C52.8492 1.78668 49.2246 0.34668 45.4452 0.34668ZM45.4452 18.5704C44.5058 18.5704 43.5875 18.3033 42.8064 17.8026C42.0252 17.302 41.4163 16.5904 41.0568 15.758C40.6973 14.9255 40.6032 14.0094 40.7866 13.1256C40.9699 12.2419 41.4223 11.4301 42.0866 10.793C42.7509 10.1558 43.5973 9.72189 44.5187 9.5461C45.4401 9.3703 46.3951 9.46052 47.263 9.80535C48.1309 10.1502 48.8728 10.7341 49.3948 11.4834C49.9166 12.2326 50.1953 13.1134 50.1953 14.0145C50.1953 15.2227 49.6948 16.3816 48.804 17.236C47.9132 18.0904 46.705 18.5704 45.4452 18.5704Z"
          fill="black"
        />
      </svg>
    ),
    [],
  );

  const Tiktok = useCallback(
    () => (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.69883 0C23.828 0 39.9671 0 56.0962 0C56.1263 0.0300622 56.1663 0.080166 56.1964 0.080166C59.7328 0.611266 62.1171 2.60539 63.4495 5.88218C63.6999 6.49344 63.8202 7.15481 64.0005 7.79614C64.0005 7.92641 64.0005 8.0667 64.0005 8.19697C63.8402 8.32724 63.9003 8.50761 63.9003 8.65792C63.9003 24.2201 63.9003 39.7723 63.9003 55.3346C63.9003 55.4949 63.8402 55.6753 64.0005 55.7955C64.0005 55.9659 64.0005 56.1262 64.0005 56.2966C63.8602 56.3266 63.9103 56.4469 63.8903 56.5371C62.9686 60.9562 59.4523 63.9925 55.1645 63.9925C39.7166 64.0025 24.2788 64.0025 8.83088 63.9925C4.02219 63.9925 0.0149589 59.9541 0.00494076 55.1442C-0.00507732 39.7122 0.00494076 24.2803 0.00494076 8.84832C-0.00507732 5.22081 2.31912 1.91396 5.72527 0.591224C6.37644 0.340705 7.05767 0.260539 7.69883 0ZM44.0945 18.9993C44.0945 18.8991 44.0144 18.8991 43.9543 18.8891C43.8641 18.8089 43.774 18.7388 43.6938 18.6586C43.6538 18.5785 43.6237 18.4682 43.4935 18.4983H43.5035C43.5035 18.4682 43.5235 18.4282 43.5035 18.4081C42.0909 16.6044 41.2294 14.5902 41.2795 12.2554C41.2795 12.0449 41.1693 12.0049 40.999 12.0149C40.4379 12.0249 39.8669 12.0349 39.3059 12.0449L39.2658 12.0149C39.2758 12.0049 39.2859 11.9848 39.2758 11.9748C39.2658 11.9447 39.2558 11.9247 39.2458 11.8946C39.2258 11.5138 39.1656 11.133 39.1857 10.7523C39.2057 10.3715 39.0855 10.2813 38.7148 10.2813C36.6511 10.3013 34.5874 10.3113 32.5237 10.2813C32.0528 10.2713 31.9626 10.4216 31.9626 10.8625C31.9727 20.0114 31.9727 29.1504 31.9727 38.2993C31.9727 38.7502 31.9526 39.2012 31.9025 39.6421C31.582 42.6182 28.5966 45.0232 25.6212 44.7727C24.8899 44.7126 24.1986 44.4821 23.4974 44.3218C23.4873 44.2316 23.4172 44.2216 23.3471 44.2316C23.277 44.1614 23.2068 44.1013 23.1467 44.0312C23.0766 43.9209 23.0165 43.8007 22.9464 43.6905C21.4637 41.3055 21.8143 38.1891 23.838 36.235C25.4208 34.7018 27.3343 34.2008 29.4782 34.6918C29.8088 34.772 29.919 34.7018 29.8989 34.3511C29.8689 33.8902 29.8889 33.4192 29.8889 32.9582C29.8889 31.2647 29.8889 29.5612 29.8889 27.8677C29.8889 27.6873 29.969 27.4468 29.6384 27.4268C29.0273 27.3967 28.4162 27.2665 27.7951 27.3566L27.7651 27.3266C27.7751 26.9959 27.745 26.6552 27.7951 26.3345C27.8853 25.7834 27.6148 25.6631 27.1439 25.6431C24.8498 25.5128 22.6358 25.8134 20.542 26.7754C12.798 30.3228 10.3436 39.9527 15.4628 46.7869C16.2342 47.809 17.0958 48.7509 18.2078 49.4223H18.1978C18.2178 49.5326 18.308 49.5526 18.3981 49.5827C18.5284 49.6829 18.6586 49.7931 18.7889 49.8933C18.889 50.0436 18.9792 50.214 19.1996 50.224C19.1796 50.3242 19.2597 50.3643 19.3198 50.4144C22.2551 52.9496 25.6412 54.0419 29.5082 53.6411C32.4736 53.3304 35.0382 52.1279 37.1821 50.0636C39.937 47.4182 41.2694 44.1414 41.2795 40.3235C41.2895 35.7741 41.2795 31.2246 41.2795 26.6752C41.2795 26.5049 41.2294 26.3145 41.3296 26.1241C41.9807 26.4949 42.6119 26.8857 43.263 27.2364C45.5872 28.489 48.0918 29.0702 50.7165 29.1904C50.9269 29.2005 51.1974 29.3007 51.1974 28.8998C51.1874 26.6953 51.1874 24.5007 51.1874 22.2962C51.1874 22.1659 51.2074 22.0156 50.997 22.0256C50.3659 22.0456 49.7447 21.8653 49.1136 21.8352L49.0735 21.8051C49.0836 21.4444 49.0735 21.0736 49.1036 20.7129C49.1336 20.3722 49.0134 20.2419 48.6728 20.2419C47.6409 20.2419 46.6391 20.0215 45.6774 19.6607C45.1464 19.4603 44.6255 19.2198 44.0945 18.9993Z"
          fill="#010101"
        />
      </svg>
    ),
    [],
  );

  const Shape = useCallback(
    () => (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.2006 14.6001C25.0854 14.6001 25.8006 15.3169 25.8006 16.2001C25.8006 18.8465 23.647 21.0001 21.0006 21.0001H5.66299L7.73179 23.0689C8.3574 23.6945 8.3574 24.7057 7.73179 25.3313C7.4198 25.6433 7.01019 25.8001 6.60059 25.8001C6.19099 25.8001 5.78139 25.6433 5.4694 25.3313L0.669395 20.5313C0.0437953 19.9057 0.0437953 18.8945 0.669395 18.2689L5.4694 13.4689C6.095 12.8433 7.10619 12.8433 7.73179 13.4689C8.3574 14.0945 8.3574 15.1057 7.73179 15.7313L5.66299 17.8001H21.0006C21.8838 17.8001 22.6006 17.0817 22.6006 16.2001C22.6006 15.3169 23.3158 14.6001 24.2006 14.6001ZM1.80059 11.4001C0.915792 11.4001 0.200592 10.6833 0.200592 9.80011C0.200592 7.15371 2.35419 5.00011 5.00059 5.00011H20.3382L18.2694 2.93131C17.6438 2.30571 17.6438 1.29451 18.2694 0.668907C18.895 0.043307 19.9062 0.043307 20.5318 0.668907L25.3318 5.46891C25.9574 6.09451 25.9574 7.10571 25.3318 7.73131L20.5318 12.5313C20.2198 12.8433 19.8102 13.0001 19.4006 13.0001C18.991 13.0001 18.5814 12.8433 18.2694 12.5313C17.6438 11.9057 17.6438 10.8945 18.2694 10.2689L20.3382 8.20011H5.00059C4.11739 8.20011 3.40059 8.91851 3.40059 9.80011C3.40059 10.6833 2.68539 11.4001 1.80059 11.4001Z"
          fill="#637381"
        />
      </svg>
    ),
    [],
  );

  const Selection = () => (
    <FormField>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Shape />
        <Tiktok />
      </div>
      <Heading>Here are a few things this integration will do</Heading>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          margin: '10px',
          alignItems: 'center',
        }}
      >
        <Check />
        <p style={{marginLeft: '10px'}}> Connect your Tiktok username</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          margin: '10px',
          alignItems: 'center',
        }}
      >
        <Check />
        <p style={{marginLeft: '10px'}}> Connect your Tiktok tags</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          alignItems: 'center',
        }}
      >
        <Button primary onClick={() => nextScreen('tags')}>
          {' '}
          Add Tag
        </Button>
        <Button primary onClick={() => nextScreen('username')}>
          Add Username
        </Button>
      </div>
    </FormField>
  );

  const Connected = () => (
    <FormField>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Shape />
        <Tiktok />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <DisplayText size="medium">Your account has been connected</DisplayText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          alignItems: 'center',
        }}
      >
        <Button primary onClick={setDefault}>
          {' '}
          Finish
        </Button>
      </div>
    </FormField>
  );

  const Username = () => (
    <FormField>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <Tiktok />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <DisplayText size="medium">Setup Tiktok Username</DisplayText>
      </div>
      <Form onSubmit={handleSubmit(setUsername)}>
        <FormLayout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              alignItems: 'center',
            }}
          >
            <Controller
              as={TextField}
              control={control}
              prefix={<Icon source={MentionMajorMonotone} />}
              error={
                invalidUsername
                  ? 'Username is invalid'
                  : alreadyExists
                  ? 'Username already exists'
                  : null
              }
              label="Username"
              placeholder="Tiktok Username"
              labelHidden
              type="text"
              name="username"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              alignItems: 'center',
            }}
          >
            <Button onClick={setDefault}> Cancel</Button>
            <Button primary submit loading={loading}>
              {' '}
              Continue{' '}
            </Button>
          </div>
        </FormLayout>
      </Form>
    </FormField>
  );

  const Tags = () => (
    <FormField>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <Tiktok />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px',
          alignItems: 'center',
        }}
      >
        <DisplayText size="medium">Setup Video Tags</DisplayText>
      </div>
      <Form onSubmit={handleSubmit(setTags)}>
        <FormLayout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
              alignItems: 'center',
            }}
          >
            <Controller
              as={TextField}
              control={control}
              prefix={<Icon source={HashtagMajorMonotone} />}
              error={
                invalidUsername
                  ? 'Tag is invalid'
                  : alreadyExists
                  ? 'Tag already exists'
                  : null
              }
              placeholder="Tiktok Tag"
              labelHidden
              type="text"
              name="tag"
              label="Tags"
              // connectedRight={<Button submit>Add</Button>}
            />
          </div>
          <TextContainer>
            <Stack>{tagsMarkup}</Stack>
          </TextContainer>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              alignItems: 'center',
            }}
          >
            <Button onClick={setDefault}> Cancel</Button>
            <Button primary submit loading={loading}>
              {' '}
              Continue{' '}
            </Button>
          </div>
        </FormLayout>
      </Form>
    </FormField>
  );

  const View = () => {
    switch (form) {
      case 'username':
        return <Username />;
      case 'tags':
        return <Tags />;
      case 'connected':
        return <Connected />;
      default:
        return <Selection />;
    }
  };

  return (
    <Page
      fullWidth
      title="Connect Tiktok"
      breadcrumbs={[
        {
          content: 'Connected Accounts',
          url: `/account/id/${accountId}/connect`,
        },
      ]}
    >
      <Container>
        <View />
      </Container>
    </Page>
  );
};
