import tw, {styled} from 'twin.macro';

export const ShopContent = styled.div`
${tw`grid md:grid-cols-3 sm:grid-cols-1 gap-2 pb-5`}
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
${tw`grid md:grid-cols-2 sm:grid-cols-1 gap-2 mb-14`}
.copy_container{
    ${tw`flex sm:items-start sm:justify-end justify-start sm:p-0 p-5`}
}
.copy{
    ${tw`inline-flex justify-between items-center`}
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
${tw`h-64 w-40 rounded object-cover`}
 object-fit:cover;
`;

export const ThumbnailContent = styled.div`
${tw`sm:mx-auto col-span-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-3 sm:gap-7 gap-1`}
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

export const Text = styled.div`
    font-size: 16px;
    color: #212B36;
    font-weight: bold; 
    max-width:220px;
    width:100%;
`;

export const FullText = styled.div`
    font-size: 16px;
    color: #212B36;
    font-weight: bold; 
    max-width:500px;
    width:100%;
`;