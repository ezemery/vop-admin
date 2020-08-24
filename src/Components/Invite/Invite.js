import React, {useState, useCallback} from 'react';
// import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';
import {
  FormLayout,
  TextField,
  Icon,
  Button,
  Checkbox,
  Form,
} from '@shopify/polaris';
import {
  EmailMajorMonotone,
  LockMajorMonotone,
  CustomersMajorMonotone,
  MobileBackArrowMajorMonotone,
} from '@shopify/polaris-icons';
import {Link, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Icons} from '../Icons';
import {
  LoginContainer,
  LoginForm,
  Logo,
  FormInvite,
  Text,
  AnimateText,
  SmallText,
  Box,
  SVGIcon,
  Background,
  LeftSide,
  RightSide,
  InviteForm,
  CompanyDesc,
} from '../styles';

export const Invite = (props) => {
  const history = useHistory();

  const {handleSubmit, control} = useForm();
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState('');

  const setLogin = () => {
    setForm('login');
  };

  const setDefault = () => {
    setForm('');
  };

  const setCreate = () => {
    setForm('create');
  };

  const LogoSVG = () => (
    <Logo viewBox="0 0 105 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M87.5501 0.121584C83.2697 0.119611 79.1565 1.71636 76.0825 4.57345C73.0084 7.43052 71.215 11.3234 71.0823 15.4271V39.4778H71.1755C71.3621 40.7329 72.0143 41.8813 73.0126 42.712C74.0109 43.5428 75.2882 44.0002 76.61 44.0002C77.9318 44.0002 79.2089 43.5428 80.2073 42.712C81.2056 41.8813 81.8579 40.7329 82.0445 39.4778V30.8063C84.3057 31.5741 86.7147 31.8589 89.1027 31.6406C91.4908 31.4224 93.8003 30.7063 95.8697 29.5424C97.9391 28.3787 99.7184 26.7953 101.083 24.9032C102.448 23.0109 103.365 20.8556 103.771 18.5879C104.177 16.3203 104.061 13.9948 103.432 11.7745C102.803 9.55413 101.675 7.49242 100.129 5.73357C98.5824 3.9747 96.6538 2.56115 94.4783 1.59179C92.3026 0.622424 89.9326 0.120659 87.5337 0.121584H87.5501ZM87.5501 21.1449C86.4645 21.1449 85.4032 20.8362 84.5005 20.2575C83.5978 19.679 82.8941 18.8568 82.4787 17.8947C82.0632 16.9327 81.9545 15.874 82.1663 14.8527C82.3782 13.8314 82.901 12.8933 83.6687 12.1569C84.4364 11.4206 85.4145 10.9191 86.4792 10.716C87.544 10.5128 88.6478 10.6171 89.6508 11.0156C90.6538 11.4141 91.5112 12.0889 92.1144 12.9548C92.7175 13.8206 93.0395 14.8386 93.0395 15.8799C93.0395 17.2763 92.4611 18.6155 91.4317 19.6028C90.4022 20.5902 89.006 21.1449 87.5501 21.1449Z"
        fill="black"
      />
      <path
        d="M31.7341 1.09031C30.0029 0.129329 27.9447 -0.133192 26.0118 0.360419C24.0788 0.854027 22.4292 2.06338 21.4253 3.72284L11.2536 20.8553C10.5954 21.9452 10.2455 23.1811 10.2386 24.4405C10.2317 25.7 10.568 26.9395 11.2142 28.0359C11.8604 29.1324 12.794 30.0479 13.9227 30.6917C15.0513 31.3356 16.3357 31.6854 17.6487 31.7066H18.0549H18.2361H18.4556C18.7637 31.6811 19.07 31.6372 19.3723 31.575C20.1434 31.4204 20.8845 31.1503 21.568 30.7746L21.7108 30.6851L21.8041 30.6272C21.9797 30.5219 22.1499 30.4114 22.32 30.2903C23.2108 29.6453 23.9403 28.8178 24.4554 27.8683L34.5227 10.9781C35.017 10.1533 35.337 9.24323 35.4644 8.29981C35.5918 7.35639 35.524 6.39816 35.265 5.47987C35.0061 4.56157 34.5609 3.70124 33.955 2.94805C33.3493 2.19487 32.5946 1.56359 31.7341 1.09031Z"
        fill="black"
      />
      <path
        d="M14.1543 3.73849C13.6692 2.89625 13.0138 2.15522 12.2266 1.55875C11.4394 0.962254 10.5361 0.522287 9.56951 0.264537C8.60295 0.00679714 7.59252 -0.0635426 6.59727 0.057635C5.60205 0.178811 4.64198 0.489067 3.77322 0.970281C2.90446 1.45148 2.14441 2.09398 1.53756 2.8602C0.930698 3.62642 0.489166 4.50099 0.238811 5.4328C-0.0115494 6.36459 -0.0657297 7.3349 0.079439 8.287C0.224608 9.23912 0.566215 10.1539 1.08428 10.9779L8.68147 23.7614C8.68518 22.4988 9.03339 21.259 9.6915 20.1654L16.8276 8.19798L14.1543 3.73849Z"
        fill="black"
      />
      <path
        d="M52.5181 0.400146C49.2612 0.400146 46.0772 1.32652 43.3691 3.06211C40.6611 4.79771 38.5504 7.26457 37.3039 10.1508C36.0575 13.0369 35.7313 16.2129 36.3667 19.2767C37.0022 22.3407 38.5705 25.1551 40.8737 27.3642C43.1768 29.5732 46.111 31.0775 49.3055 31.6869C52.5 32.2964 55.8111 31.9836 58.8203 30.7881C61.8293 29.5926 64.4012 27.5681 66.2107 24.9706C68.0204 22.3731 68.9861 19.3193 68.9861 16.1954C68.9861 12.0062 67.2511 7.98861 64.1627 5.02645C61.0745 2.06428 56.8857 0.400146 52.5181 0.400146ZM52.5181 21.4604C51.4325 21.4604 50.3713 21.1516 49.4686 20.573C48.5658 19.9945 47.8622 19.1722 47.4467 18.2102C47.0313 17.2481 46.9225 16.1894 47.1344 15.1681C47.3463 14.1468 47.8691 13.2087 48.6367 12.4724C49.4044 11.736 50.3825 11.2346 51.4474 11.0314C52.5122 10.8283 53.6158 10.9325 54.6189 11.331C55.6219 11.7295 56.4792 12.4044 57.0824 13.2702C57.6855 14.136 58.0075 15.154 58.0075 16.1954C58.0075 17.5916 57.4292 18.9309 56.3997 19.9183C55.3703 20.9056 53.974 21.4604 52.5181 21.4604Z"
        fill="black"
      />
    </Logo>
  );

  const Confetti = () => (
    <SVGIcon
      width="157"
      height="157"
      viewBox="0 0 157 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M106.056 86.4269C111.928 83.7064 117.776 81.7218 123.52 80.5063C125.177 80.1558 126.235 78.5285 125.885 76.8717C125.534 75.2149 123.909 74.1558 122.25 74.5066C115.601 75.9134 108.849 78.2663 102.095 81.5179C98.3225 77.0186 94.0038 72.3141 89.3444 67.6547C84.3931 62.7037 79.3902 58.1341 74.6376 54.1999C78.7503 48.9996 82.1071 43.1771 84.6467 36.8048C88.6063 26.8693 90.6142 15.5181 90.6142 3.06543C90.6142 1.37185 89.2411 -0.000976562 87.5478 -0.000976562C85.8545 -0.000976562 84.4814 1.37185 84.4814 3.06543C84.4814 22.2525 79.5616 38.1322 69.846 50.3862C68.0126 48.9876 66.235 47.7022 64.5375 46.5575C55.4496 40.4281 50.0367 38.9914 47.0114 41.9082C46.99 41.9281 46.9676 41.9478 46.9467 41.9683C46.9436 41.9714 46.9406 41.9741 46.9375 41.9769C46.9357 41.9787 46.9341 41.9809 46.9323 41.9824C46.1574 42.7591 45.6791 43.6984 45.4978 44.8191L0.238601 152.747C-0.242825 153.895 0.0178193 155.221 0.898185 156.101C1.48509 156.688 2.26948 156.999 3.06736 156.999C3.46661 156.999 3.86953 156.921 4.25253 156.761C4.26111 156.757 4.25253 156.761 4.26111 156.757L112.181 111.501C113.204 111.335 114.073 110.917 114.808 110.255C114.861 110.211 114.911 110.164 114.961 110.116C114.981 110.097 115.002 110.081 115.022 110.062C115.025 110.058 115.027 110.055 115.03 110.052C115.051 110.031 115.071 110.009 115.091 109.987C118.007 106.961 116.571 101.549 110.441 92.4616C109.146 90.5408 107.674 88.5188 106.056 86.4269ZM24.3212 135.154C23.6813 139.144 22.2582 141.767 21.5734 142.847L8.79295 148.206L21.7727 117.254C24.3123 123.621 25.1927 129.719 24.3212 135.154ZM43.1907 124.778C41.9543 131.826 38.6751 135.224 37.7426 136.066L29.6623 139.455C31.4586 133.06 31.9308 122.909 24.9888 109.585L34.1782 87.6728C43.7126 105.749 44.428 117.727 43.1907 124.778ZM54.1288 129.194L47.5195 131.966C48.1494 130.375 48.7047 128.563 49.107 126.509C51.5613 113.982 47.5548 98.4929 37.2047 80.4557L40.5226 72.5441C43.1487 75.704 46.1409 80.1763 47.3527 82.9962C47.8516 84.1575 48.9828 84.8529 50.1713 84.8529C50.5752 84.8529 50.9861 84.7723 51.3807 84.603C52.9366 83.9342 53.6557 82.1312 52.9872 80.575C51.1891 76.3912 46.6296 69.8812 43.1419 66.2981L48.2116 54.2088C49.0996 55.8371 50.1996 57.6211 51.5187 59.5768C52.427 60.9236 53.422 62.3197 54.4922 63.7548C64.9815 79.6713 64.7441 95.9628 62.6936 106.833C60.5131 118.395 55.8439 126.86 54.1288 129.194ZM77.7564 119.286L63.199 125.391C65.301 120.78 67.4453 114.727 68.7197 107.97C70.1432 100.422 70.769 90.4969 68.1353 79.7789C69.5878 81.3134 71.0821 82.8512 72.615 84.3841C77.2017 88.9705 81.8314 93.2264 86.2666 96.9563C85.8269 111.434 79.1866 118.031 77.7564 119.286ZM88.3263 114.854C89.9678 111.458 91.4173 107.081 92.0637 101.615C93.9146 103.028 95.7093 104.326 97.4222 105.481C99.3789 106.801 101.163 107.9 102.791 108.788L88.3263 114.854ZM99.1115 99.193C92.4451 94.4698 84.5752 87.6703 76.9518 80.0469C69.3287 72.4239 62.529 64.5539 57.8061 57.8876C53.2387 51.4411 52.0078 48.1493 51.6837 46.7234C53.1096 47.0478 56.4014 48.2787 62.8479 52.8458C63.804 53.5231 64.7865 54.2471 65.7873 55.0061C65.5724 55.2274 65.3602 55.451 65.1415 55.6696C63.9441 56.8671 63.9441 58.8087 65.1415 60.0064C65.7404 60.605 66.5251 60.9046 67.3098 60.9046C68.0945 60.9046 68.8795 60.605 69.4781 60.0064C69.8632 59.6213 70.2425 59.231 70.6175 58.8369C75.269 62.6819 80.1872 67.1711 85.0079 71.9918C89.1533 76.1373 93.051 80.3542 96.5081 84.412C95.9543 84.7195 95.4008 85.0323 94.8474 85.3518C93.3807 86.1988 92.8781 88.0742 93.7251 89.5405C94.293 90.5242 95.3236 91.0743 96.3836 91.0743C96.9037 91.0743 97.4311 90.9416 97.9138 90.6628C98.765 90.171 99.6168 89.6991 100.468 89.2382C101.801 90.9302 103.037 92.5754 104.154 94.1515C108.721 100.598 109.952 103.89 110.276 105.316C108.849 104.991 105.558 103.76 99.1115 99.193Z"
          fill="#B3BCF5"
        />
        <path
          d="M55.4664 88.4758C54.7712 86.9312 52.9562 86.2425 51.4117 86.9377C49.9153 87.6111 49.2223 89.3362 49.8128 90.8476C50.2771 92.0629 51.4377 92.8193 52.6769 92.8193C53.0129 92.8193 53.3545 92.7635 53.69 92.6464C55.2882 92.0871 56.1309 90.3377 55.5712 88.7392C55.5421 88.6561 55.5026 88.5561 55.4664 88.4758Z"
          fill="#B3BCF5"
        />
        <path
          d="M114.51 47.4346C115.109 48.0332 115.893 48.3328 116.678 48.3328C117.463 48.3328 118.248 48.0332 118.846 47.4346C125.698 40.5834 136.798 37.4434 144.902 36.7893C146.59 36.6532 147.848 35.1739 147.712 33.4862C147.575 31.7981 146.099 30.5452 144.409 30.6764C135.218 31.4182 122.537 35.0709 114.51 43.0981C113.312 44.2956 113.312 46.2372 114.51 47.4346Z"
          fill="#B3BCF5"
        />
        <path
          d="M154.728 31.2659C154.641 31.2426 154.553 31.2196 154.463 31.1972C152.82 30.7875 151.156 31.7887 150.747 33.432C150.338 35.0753 151.338 36.7394 152.982 37.1485L153.138 37.189C153.404 37.2604 153.672 37.2947 153.935 37.2947C155.288 37.2947 156.527 36.3917 156.895 35.0222C157.333 33.3866 156.364 31.705 154.728 31.2659Z"
          fill="#B3BCF5"
        />
        <path
          d="M22.5395 25.6416H25.606V28.708C25.606 30.4013 26.9788 31.7744 28.6724 31.7744C30.3659 31.7744 31.7388 30.4013 31.7388 28.708V25.6416H34.8052C36.4988 25.6416 37.8716 24.2685 37.8716 22.5752C37.8716 20.8819 36.4988 19.5088 34.8052 19.5088H31.7388V16.4424C31.7388 14.7491 30.3659 13.376 28.6724 13.376C26.9788 13.376 25.606 14.7491 25.606 16.4424V19.5088H22.5395C20.846 19.5088 19.4731 20.8819 19.4731 22.5752C19.4731 24.2688 20.846 25.6416 22.5395 25.6416Z"
          fill="#B3BCF5"
        />
        <path
          d="M94.2927 55.3853H97.3594V58.4514C97.3594 60.145 98.7326 61.5178 100.426 61.5178C102.119 61.5178 103.492 60.145 103.492 58.4514V55.3853H106.558C108.252 55.3853 109.625 54.0122 109.625 52.3189C109.625 50.6256 108.252 49.2525 106.558 49.2525H103.492V46.1858C103.492 44.4925 102.119 43.1194 100.426 43.1194C98.7326 43.1194 97.3594 44.4925 97.3594 46.1858V49.2525H94.2927C92.5995 49.2525 91.2263 50.6256 91.2263 52.3189C91.2263 54.0125 92.5995 55.3853 94.2927 55.3853Z"
          fill="#B3BCF5"
        />
        <path
          d="M136.916 128.059H133.849V124.992C133.849 123.299 132.476 121.926 130.783 121.926C129.089 121.926 127.716 123.299 127.716 124.992V128.059H124.65C122.957 128.059 121.583 129.432 121.583 131.125C121.583 132.818 122.957 134.191 124.65 134.191H127.716V137.258C127.716 138.951 129.089 140.324 130.783 140.324C132.476 140.324 133.849 138.951 133.849 137.258V134.191H136.916C138.609 134.191 139.982 132.818 139.982 131.125C139.982 129.432 138.609 128.059 136.916 128.059Z"
          fill="#5C6AC4"
        />
        <path
          d="M119.58 18.3987C124.653 18.3987 128.78 14.2719 128.78 9.19946C128.78 4.12701 124.653 0.000244141 119.58 0.000244141C114.508 0.000244141 110.381 4.12701 110.381 9.19946C110.381 14.2719 114.508 18.3987 119.58 18.3987ZM119.58 6.13306C121.271 6.13306 122.647 7.50865 122.647 9.19946C122.647 10.8903 121.271 12.2659 119.58 12.2659C117.89 12.2659 116.514 10.8903 116.514 9.19946C116.514 7.50865 117.89 6.13306 119.58 6.13306Z"
          fill="#B3BCF5"
        />
        <path
          d="M138.755 53.2385C133.683 53.2385 129.556 57.3653 129.556 62.4377C129.556 67.5102 133.683 71.637 138.755 71.637C143.828 71.637 147.955 67.5102 147.955 62.4377C147.955 57.3653 143.828 53.2385 138.755 53.2385ZM138.755 65.5042C137.065 65.5042 135.689 64.1286 135.689 62.4377C135.689 60.7469 137.065 59.3713 138.755 59.3713C140.446 59.3713 141.822 60.7469 141.822 62.4377C141.822 64.1286 140.446 65.5042 138.755 65.5042Z"
          fill="#5C6AC4"
        />
        <path
          d="M60.8691 29.3211C65.9416 29.3211 70.0684 25.1943 70.0684 20.1218C70.0684 15.0494 65.9416 10.9226 60.8691 10.9226C55.7967 10.9226 51.6699 15.0494 51.6699 20.1218C51.6699 25.1943 55.7967 29.3211 60.8691 29.3211ZM60.8691 17.0554C62.56 17.0554 63.9355 18.431 63.9355 20.1218C63.9355 21.8126 62.56 23.1882 60.8691 23.1882C59.1783 23.1882 57.8027 21.8126 57.8027 20.1218C57.8027 18.4313 59.1783 17.0554 60.8691 17.0554Z"
          fill="#5C6AC4"
        />
        <path
          d="M137.74 90.1702C137.74 88.4812 136.363 87.1038 134.674 87.1038C132.985 87.1038 131.607 88.4812 131.607 90.1702C131.607 91.8591 132.985 93.2366 134.674 93.2366C136.363 93.2366 137.74 91.8588 137.74 90.1702Z"
          fill="#B3BCF5"
        />
        <path
          d="M102.783 29.1492C104.472 29.1492 105.849 27.7717 105.849 26.0828C105.849 24.3938 104.472 23.0164 102.783 23.0164C101.094 23.0164 99.7163 24.3938 99.7163 26.0828C99.7166 27.7714 101.094 29.1492 102.783 29.1492Z"
          fill="#5C6AC4"
        />
        <path
          d="M143.872 110.101C142.183 110.101 140.806 111.479 140.806 113.168C140.806 114.857 142.183 116.234 143.872 116.234C145.561 116.234 146.939 114.857 146.939 113.168C146.939 111.479 145.561 110.101 143.872 110.101Z"
          fill="#B3BCF5"
        />
        <path
          d="M42.6821 9.19946C44.3711 9.19946 45.7485 7.82203 45.7485 6.13306C45.7485 4.44408 44.3711 3.06665 42.6821 3.06665C40.9932 3.06665 39.6157 4.44408 39.6157 6.13306C39.6157 7.82203 40.9932 9.19946 42.6821 9.19946Z"
          fill="#B3BCF5"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="157" height="157" fill="white" />
        </clipPath>
      </defs>
    </SVGIcon>
  );

  const Login = () => (
    <InviteForm>
      <Button icon={MobileBackArrowMajorMonotone} plain onClick={setDefault}>
        {' '}
        Back
      </Button>
      <SmallText style={{marginBottom: '40px'}}>
        Login to your account using email and password
      </SmallText>
      <FormLayout>
        <TextField
          type="email"
          label="Email"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={EmailMajorMonotone} />}
          placeholder="Email"
          error=""
        />
        <TextField
          type="password"
          label="Password"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={LockMajorMonotone} />}
          placeholder="Password"
          error=""
        />
        <Button primary fullWidth>
          Login
        </Button>
      </FormLayout>
    </InviteForm>
  );

  const Selection = () => (
    <FormInvite>
      <Button fullWidth onClick={setLogin}>
        Login
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button primary fullWidth onClick={setCreate}>
        Sign Up
      </Button>
    </FormInvite>
  );

  const Create = () => (
    <InviteForm>
      <Button icon={MobileBackArrowMajorMonotone} plain onClick={setDefault}>
        {' '}
        Back
      </Button>
      <SmallText style={{marginBottom: '40px'}}>
        Enter your basic info and password
      </SmallText>
      <FormLayout>
        <TextField
          type="text"
          label="Name"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={CustomersMajorMonotone} />}
          placeholder="Name"
          error=""
        />
        <TextField
          type="email"
          label="Email"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={EmailMajorMonotone} />}
          placeholder="Email"
          error=""
        />
        <TextField
          type="password"
          label="Password"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={LockMajorMonotone} />}
          placeholder="Password"
          error=""
        />
        <TextField
          type="password"
          label="Confirm Password"
          labelHidden
          onChange={() => {}}
          value=""
          prefix={<Icon source={LockMajorMonotone} />}
          placeholder="Confirm Password"
          error=""
        />
        <Button primary fullWidth>
          Create User
        </Button>
      </FormLayout>
    </InviteForm>
  );

  const onSubmit = (data) => {
    setInvalidEmail(false);
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_HOST}/login/go`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          history.push('/');
          return;
        }
        throw new Error('Network response was not ok');
      })
      .catch((ex) => {
        setLoading(false);
        setInvalidEmail(true);
      });
  };

  const View = () => {
    switch (form) {
      case 'login':
        return <Login />;
      case 'create':
        return <Create />;
      default:
        return <Selection />;
    }
  };

  return (
    <LoginContainer>
      <LeftSide>
        <LogoSVG />
        <LoginForm>
          <AnimateText size="extraLarge" style={{textAlign: 'center'}}>
            Holly Cardew and your team is waiting for you!
          </AnimateText>
          <SmallText
            style={{
              textAlign: 'center',
              marginTop: '30px',
              marginBottom: '20px',
            }}
          >
            You’ve been invited to join PrincessPolly on VOP.
          </SmallText>
          <View />
        </LoginForm>
        <CompanyDesc>
          <Icons />
        </CompanyDesc>
      </LeftSide>
      <RightSide>
        <Box />
        <Confetti />
      </RightSide>
    </LoginContainer>
  );
};

// import React from 'react'
// import {Form, Input, Button, Row, Col, Typography} from 'antd';
// import {useHistory} from "react-router-dom";
// import {ResetContainer} from "./styles"

// const { Title } = Typography;

// export default function PasswordReset() {
//     const history = useHistory();
//     const [validate, setvalidate] = React.useState("");
//     const [help, setHelp] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const resetPassword = (password) => {
//         setvalidate("validating");
//         const token = window.location.href.split("/").slice("-1");
//         const data = {
//             "new_password" : password
//          }
//         fetch(process.env.REACT_APP_API_HOST + `/admin/password/reset/${token[0]}`, {
//             method: 'POST',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         }).then(function(response) {
//             return response.json();
//         }).then(function(json) {
//             if(json.error){
//                 setHelp(json.message)
//                 setvalidate("error");
//                 return;
//             }
//             setHelp("Password reset was successful")
//             setvalidate("success");
//             setTimeout(()=>{
//                 history.push('/login');
//             }, 200)

//         }).catch(function(ex) {
//             setvalidate("error");
//             setHelp("An error occured while processing your request")
//         });

//       }

//     const formSubmit = (e) => {
//         e.preventDefault();
//         if(password.length === 0){
//             setHelp("Password fields cannot be empty")
//             setvalidate("warning");
//             return;
//         }
//             resetPassword(password);
//       };

//       const changePassword = (e) => {
//         setPassword(e.target.value);
//       }
//       const checkPassword = (e) => {
//         if(e.target.value !== password){
//             setvalidate("error");
//             setHelp("Passwords do not match")
//         }else{
//             setvalidate("success");
//             setHelp("Passwords match")
//         }
//       }

//     return (
//         <ResetContainer>
//         <div className="reset-container">
//             <Row className="logo-div">
//              <div className="logo"> <img src="/vop-black-300.png" alt="Tokshop" /></div>
//             </Row>
//             <Row className="reset-title_container">
//                 <Col lg={24} sm={12}>
//                      <Title level={3} style={{textAlign:"center"}}>Reset your password </Title>
//                 </Col>
//             </Row>
//             <Row type="flex" justify="center" align="middle" className="full-height">
//                     <Form
//                         name="basic"
//                         onSubmit={formSubmit}
//                         >
//                             <Col span={24}>
//                                 <Form.Item
//                                     name="new-password"
//                                     rules={[{ required: true, message: 'Enter new password'}]}
//                                     >
//                                     <Input.Password placeholder="New password" id="new-password" value={password} onChange={changePassword}/>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={24}>
//                                 <Form.Item
//                                     name="confirm-password"
//                                     validateStatus={validate}
//                                     hasFeedback
//                                     help={help}
//                                     rules={[{ required: true, message: 'confirm new password' }]}
//                                     >
//                                     <Input.Password placeholder="Confirm  Password" id="confirm-password" onChange={checkPassword}/>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={24}>
//                                 <Form.Item >
//                                     <Button type="primary" htmlType="submit" style={{width:"100%"}}>
//                                         Submit
//                                     </Button>
//                                 </Form.Item>
//                             </Col>
//                         </Form>
//             </Row>
//         </div>
//      </ResetContainer>
//     )
// }
