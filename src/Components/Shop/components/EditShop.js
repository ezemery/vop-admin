import React, {useContext, useCallback} from 'react';
import { useState, useEffect } from 'react';
import {TextField, FormLayout, Layout, Banner, Button, Form} from '@shopify/polaris';
import {
  Page
  } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../../Context/store";
import {useParams} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';


const Store = () => {
    const {handleSubmit, control} = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {shop_id, accountId} = useParams();
    const {user} = React.useContext(UserStore);
    const userId = user.id;
    const {setIsLoading,unsetIsLoading} = useContext(FrameStore)
    console.log(shop_id);
    const onSubmit = (data) => {
        if(!data.handle || !data.title || !data.description){
            setError(true);
            unsetIsLoading();
          return;
        }
       setIsLoading();
       setSuccess(false)
       setError(false);
       const request =  {...data,shop_id,account_id:accountId,user_id:userId}
        fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
           
            return response.json();
          })
          .then((json) => {
              if(json){
                setSuccess(true)
                unsetIsLoading();
              }else{
                unsetIsLoading();
              }
              
           
          })
          .catch((ex) => {
            unsetIsLoading();
          });
      };


    return(
      <>
         {success ? <Banner
                title="Your shop has been saved successfully."
                status="success"
                onDismiss={() => setSuccess(false)}
                />:null}
        <Layout>
            <Layout.AnnotatedSection
            title="Shop Details"
            description="Edit an existing vop shop"
            >
               <div style={{background:"#F9FAFB", padding:"30px"}}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormLayout>
                            
                        <Controller as={TextField}  control={control} type="text"  label="Handle" placeholder="Enter a handle"  name="handle"  error={error ? 'Field cannot be empty' : null}/>
                        <Controller as={TextField}  control={control} type="text"  label="Shop Title" placeholder="Enter a shop title"  name="title" error={error ? 'Field cannot be empty' : null} />
                        <Controller as={TextField}  control={control} type="text" label="Shop Bio" placeholder="Enter a short bio"  name="description" multiline={4} error={error ? 'Field cannot be empty' : null}/>
                        <div style={{display:"flex", justifyContent:"flex-end"}}><Button primary submit>Save</Button></div>
                        </FormLayout>
                    </Form>
               
                </div>
            </Layout.AnnotatedSection>
      </Layout>
      </>
    )
}

export const EditShop = () => {
    const {accountId} = useParams();
    return (
        <Page fullWidth
        title="Edit Shop"
        breadcrumbs={[
          {
            content: 'All shops',
            url: `/account/id/${accountId}/shop`,
          },
        ]}>
            <Store/> 
           
        </Page>
    ) ;

};