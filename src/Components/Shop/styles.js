import tw, {styled} from 'twin.macro';

export const ShopContent = styled.div`
${tw`h-48 flex mt-10 mb-10`}
border-bottom:1px solid #DFE3E8;
.clipboard_copy{
    ${tw`flex rounded-full py-2 px-4 justify-between items-center`}
    background-color:#B4E0FA;
    cursor:pointer;
    .Polaris-Icon{
        margin:0;
        width:1em;
        height:1em;
    }
}
`;