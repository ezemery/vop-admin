import tw, {styled} from 'twin.macro';

export const Social = styled.div`
  ${tw`flex justify-between mb-10`}
`;

export const Container = styled.div`
  ${tw`flex justify-center md:w-1/2 pb-10`}
  height: auto;
  margin-left: auto;
  margin-right: auto;
  background: #f9fafb;
  border-radius: 3px;
`;

export const FormField = styled.div`
`;

export const Resource = styled.div`
.Polaris-ResourceList__ItemWrapper{
  overflow:visible;
  z-index: auto;
}
.Polaris-ResourceItem__Container {
  z-index: auto;
}
`;
export const ConnectList = styled.div`
  ${tw`flex flex-wrap flex-col items-center md:flex-row md:justify-between`}
  .list-item{
    ${tw`flex items-center md:m-0 m-2`}
  }

  .dropdown {
    position: relative;
    display: inline-block;
    padding:5px 10px 5px 10px;
    background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
    border: 1px solid #C4CDD5;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(22, 29, 37, 0.05);
    border-radius: 3px;
    z-index: 999999;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    background-color: #f9f9f9;
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 10px;
    z-index: 999999999;
    right: 20px;
    top: 45px;
    @media only screen and (max-width: 600px){
      right: 0px;
      top: 250px;
      left:0px;
    }
  }
  
  .Polaris-Icon {
      display: block;
      max-height: 10px;
      max-width:10px;
      margin:5px;
      border-radius: 100px;
      background: #F4F6F8;
  }

  .complete{
    background: #BBE5B3;
    border: 2px solid #FFFFFF;
    border-radius: 100px;
    padding:5px;
    font-size: 13px;
    line-height: 16px;
  }

  .progress{
    background: #FFEA8A;
    border: 2px solid #FFFFFF;
    border-radius: 100px;
    font-size: 13px;
    padding:5px;
    line-height: 16px;
  }

  .inactive{
    background: #DE3618;
    border: 2px solid #FFFFFF;
    border-radius: 100px;
    padding:5px;
    font-size: 13px;
    line-height: 16px;
  }

  .drop:hover .dropdown-content{
    display: flex;
  }
`;