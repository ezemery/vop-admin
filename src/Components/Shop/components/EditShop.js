import React, {useContext, useCallback, useState, useEffect} from 'react';
import {
  TextField,
  FormLayout,
  Layout,
  Banner,
  Button,
  Form,
  Page,
} from '@shopify/polaris';

import {useParams} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {FrameStore, UserStore} from '../../../Context/store';
import {Upload} from '../styles';

const Store = () => {
  const {handleSubmit, control} = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {shop_id, accountId} = useParams();
  const [handle, setHandle] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const {user} = React.useContext(UserStore);
  const [shopImageFile, setShopImageFile] = useState();
  const [avatar, setAvatar] = useState(
    'data:image/png;base64,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',
  );
  const userId = user.id;
  const {setIsLoading, unsetIsLoading, isLoading} = useContext(FrameStore);
  useEffect(() => {
    setIsLoading();
    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setHandle(json.shop.handle);
        setTitle(json.shop.title);
        setDesc(json.shop.description);
        if (json.shop.shop_image) {
          setAvatar(json.shop.shop_image);
        }
        unsetIsLoading();
      })
      .catch((ex) => {});
  }, []);

  const handleChange = (e) => {
    setHandle(e);
  };

  const titleChange = (e) => {
    setTitle(e);
  };

  const descChange = (e) => {
    setDesc(e);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setShopImageFile(file);
    }
  };

  const onSubmit = () => {
    if (!handle || !title || !description) {
      setError(true);
      unsetIsLoading();
      return;
    }
    setIsLoading();
    setSuccess(false);
    setError(false);

    const formData = new FormData();
    formData.append('account_id', accountId);
    formData.append('user_id', userId);

    if (handle) formData.append('handle', handle.toLowerCase());
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (shopImageFile) formData.append('shop_image', shopImageFile);

    fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/shop/id/${shop_id}`,
      {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((json) => {
        if (json) {
          setSuccess(true);
          unsetIsLoading();
        } else {
          unsetIsLoading();
        }
      })
      .catch((ex) => {
        unsetIsLoading();
      });
  };

  return (
    <>
      {success ? (
        <Banner
          title="Your shop has been updated successfully."
          status="success"
          onDismiss={() => setSuccess(false)}
        />
      ) : null}

      <Upload>
        <img src={avatar} />
        <label className="custom-file-upload">
          <input
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageUpload}
          />
          Update Picture
        </label>
      </Upload>

      <Layout>
        <Layout.AnnotatedSection
          title="Shop Details"
          description="Edit an existing vop shop"
        >
          <div style={{background: '#F9FAFB', padding: '30px'}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormLayout>
                <TextField
                  type="text"
                  label="Handle"
                  placeholder="Enter a handle"
                  name="handle"
                  value={handle}
                  onChange={handleChange}
                  error={error ? 'Field cannot be empty' : null}
                />
                <TextField
                  type="text"
                  label="Shop Title"
                  placeholder="Enter a shop title"
                  value={title}
                  onChange={titleChange}
                  name="title"
                  error={error ? 'Field cannot be empty' : null}
                />
                <TextField
                  type="text"
                  label="Shop Bio"
                  placeholder="Enter a short bio"
                  value={description}
                  onChange={descChange}
                  name="description"
                  multiline={4}
                  error={error ? 'Field cannot be empty' : null}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button primary submit disabled={isLoading}>
                    Update
                  </Button>
                </div>
              </FormLayout>
            </Form>
          </div>
        </Layout.AnnotatedSection>
      </Layout>
    </>
  );
};

export const EditShop = () => {
  const {accountId} = useParams();
  return (
    <Page
      fullWidth
      title="Edit Shop"
      breadcrumbs={[
        {
          content: 'All shops',
          url: `/account/id/${accountId}/shop`,
        },
      ]}
    >
      <Store />
    </Page>
  );
};
