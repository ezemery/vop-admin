import tw, {styled} from 'twin.macro';

export const LoginContainer = styled.div`
  ${tw`h-screen w-screen flex`}
  background: #fff;
`;

export const LoginForm = styled.div`
  ${tw`p-10 sm:text-left text-center bg-white rounded m-auto`}
  max-width: 445px;
  height: 400px;
`;
export const Logo = styled.svg`
  ${tw`lg:absolute lg:left-10 lg:top-10 mr-auto ml-auto mt-10 mb-20`}
  width: 80px;
`;

export const FormContent = styled.div`
  ${tw`flex justify-between`}
`;

export const Text = styled.h1`
  ${tw`font-bold mt-10`}
  padding: 50px;
  font-size:3rem;
  line-height:3rem;
  color: #919EAB;
`;

export const P = styled.p`
  ${tw`font-light mt-5 text-gray-500`}
`;

export const Form = styled.div`
  ${tw`mt-20`}
`;

export const LeftSide = styled.div`
  ${tw`h-screen flex flex-grow flex-col justify-between items-center`}
`;

export const RightSide = styled.div`
  ${tw`xl:block h-screen flex-1 flex-col justify-around items-center hidden`}
  background: #0B0D1E;
`;

export const Background = styled.div`
  width: 500px;
  height: 500px;
  background: url("./login.png") no-repeat center center;
`;

export const CompanyDesc = styled.div`
${tw`lg:block items-end w-full hidden`}
background: #F9FAFB;
`;
export const Company = styled.div`
  ${tw`flex justify-around`}
`;

export const CompanyLogo = styled.svg`
width:100px;
height:50px;
`;
