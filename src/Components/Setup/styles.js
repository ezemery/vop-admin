import styled from "styled-components";

export const OnboardingSteps = styled.div`
@media screen and (max-width: 760px){
    .ant-steps-horizontal.ant-steps-label-horizontal{
        display: flex;
        justify-content:space-between;
    }
    .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-content{
        display: none;
    }
}
`;