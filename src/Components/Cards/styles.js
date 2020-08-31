import tw, {styled} from 'twin.macro';

export const Card = styled.div`
    ${tw`flex flex-col justify-between border border-gray-300`}
    width: 280px;
    height: 550px;
    background:white;
`
export const Text = styled.div`
${tw`flex justify-center w-full items-center`}
color: #637381;
fill:#637381;
.Polaris-Icon{
    margin:0; 
}
`;

export const ButtonGroup  = styled.div`
${tw`flex justify-between border-t border-gray-300`}
`
export const Button = styled.button`
${tw`flex justify-between items-center w-full bg-white text-black`}
height: 40px;
&:hover{
    fill: white;
    background: #606EC7;
    color:white
}
`