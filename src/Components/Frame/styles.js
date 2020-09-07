import tw, {styled} from 'twin.macro';

export const MenuBar = styled.div`
${tw`flex justify-between w-screen h-full`}
background:#212B36
`
export const AccountMenu = styled.div`
${tw``}
`
export const UserMenu = styled.div`
${tw``}
`

export const Spacing = styled.div`
${tw`mb-5`}
`
export const DropdownMenu = styled.div`
${tw`flex flex-col items-center p-10`}
.Polaris-Icon{
    fill:black;
}
.initials{
    display:flex; 
    align-items:center;
    justify-content:center; 
    margin-right:10px;
    width:40px;
    height:40px;
    padding:10px;
    border-radius:50%; 
    background:green;
    color:white;
}

width: 250px;
height:200px;
background:white;
border-radius:2px;
`

export const UserProfile = styled.div`
${tw`flex justify-end text-white p-5`}
cursor:pointer;
.initials{
    display:flex; 
    align-items:center;
    justify-content:center; 
    margin-right:10px;
    width:30px;
    height:30px;
    padding:10px;
    border-radius:50%; 
    background:green;
    color:white;
}
.username{
    display:flex; 
    align-items:center;
}
`
export const MenuIcon = styled.div`
padding-top: 10px;
padding-left:20px;
img{
 width:80px;
 @media screen and (max-width: 768px){
     display:none
 }
}
.Polaris-Icon{
    ${tw`md:hidden`}
    fill: white;
}
`