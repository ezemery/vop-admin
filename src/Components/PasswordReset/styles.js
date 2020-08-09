import styled from "styled-components";
import {Layout} from 'antd';
const {  Content } = Layout;

export const ResetContainer = styled(Content)`
        min-height:100vh;
        min-width: 100%;
        display:flex;
        align-items:center;
        
        .reset-container{
            background-color:white;
            width:500px;
            margin:auto;
            padding:50px;
        }
        .logo-div{
          min-height:100%; 
          .logo{
            text-align: center;
            img{
                width: 200px;
            }
          }
        }

        .reset-title_container{
           min-height:100%;
           padding:"20px"
        }

        .text-align{
            text-align:center;
        }

        .full-width{
            width:100%;
        }
        .full-height{
            height:100%;
        }
`;
