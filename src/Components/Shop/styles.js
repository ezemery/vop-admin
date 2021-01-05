import tw, {styled} from 'twin.macro';

export const ShopContent = styled.div`
${tw`flex justify-between py-10`}
border-bottom:1px solid #DFE3E8;
.copy{
    ${tw`inline-flex items-center`}
}
.clipboard_copy{
    ${tw`rounded-full py-2 px-4 mr-5`}
    background-color:#B4E0FA;
    cursor:pointer;
}

.Polaris-Icon{
    margin:0;
    width:1em;
    height:1em;
    cursor:pointer;
}
`;

export const ViewStyles = styled.div`
${tw`flex mb-14 justify-between`}
.copy{
    ${tw`inline-flex justify-between items-center mr-5`}
}
.clipboard_copy{
    ${tw`rounded-full py-2 px-4 mr-5`}
    background-color:#B4E0FA;
    cursor:pointer;
}

.Polaris-Icon{
    margin:0;
    width:1em;
    height:1em;
    cursor:pointer;
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
${tw`h-auto w-36 mr-5 rounded m-5`}
 object-fit:cover;
`;

export const ThumbnailContent = styled.div`
${tw`lg:flex justify-end hidden lg:w-3/4 sm:w-1/2`}
    overflow:scroll;
    cursor:pointer;
`

export const Upload = styled.div`
${tw`flex items-center py-10 my-5 border-b border-gray-300`}
img{
    border-raduis:50%;
    width:100px;
    height:100px;
    object-fit:contain;
}
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
`