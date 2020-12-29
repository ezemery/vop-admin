import tw, {styled} from 'twin.macro';

export const ShopContent = styled.div`
${tw`flex justify-between py-10`}
border-bottom:1px solid #DFE3E8;
.clipboard_copy{
    ${tw`inline-flex rounded-full py-2 px-4 justify-between items-center`}
    background-color:#B4E0FA;
    cursor:pointer;
    .copy{
        margin-right:10px
    }
    .Polaris-Icon{
        margin:0;
        width:1em;
        height:1em;
    }
}
`;

export const ViewStyles = styled.div`
${tw`flex mb-14 justify-between`}
.clipboard_copy{
    ${tw`inline-flex rounded-full py-2 px-4 justify-between items-center`}
    background-color:#B4E0FA;
    height:30px;
    cursor:pointer;
    .copy{
        margin-right:10px
    }
    .Polaris-Icon{
        margin:0;
        width:1em;
        height:1em;
    }
}

.list-item{
    ${tw`flex mt-3`}
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
  }

  .drop:hover .dropdown-content{
    display: flex;
  }
`

export const ProductImage = styled.img`
${tw`h-auto w-28 mr-5 rounded`}
 object-fit:cover;
`;

export const ThumbnailContent = styled.div`
${tw`lg:flex justify-end hidden  `}
    cursor:pointer;
`

export const Upload = styled.div`
${tw`flex items-center py-10 my-5 border-b border-gray-300`}
`