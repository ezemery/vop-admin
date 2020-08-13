import tw, {styled} from 'twin.macro';

export const LoginContainer = styled.div`
  ${tw`h-screen w-screen flex justify-center items-center`}
  background: #0B0D1E;
`;

export const LoginForm = styled.div`
  ${tw`p-10 text-center bg-white rounded m-auto`}
  max-width: 445px;
  height: 400px;
`;
export const Logo = styled.svg`
  ${tw`mr-auto ml-auto mb-20`}
  width: 150px;
`;

export const FormContent = styled.div`
  ${tw`flex justify-between`}
`;

export const H1 = styled.h1`
  ${tw`text-5xl font-bold `}
`;

export const P = styled.p`
  ${tw`font-light mt-5 text-gray-500`}
`;

export const Form = styled.div`
  ${tw`mt-20`}
`;

export const CompanyDesc = styled.div`
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
export const Company = styled.div`
  ${tw`flex justify-between`}
  width:100rem;
`;

export const CompanyLogo = styled.svg``;
