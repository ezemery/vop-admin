import {Tag} from 'antd';
import React, {useContext, useCallback} from 'react';
import { useState, useEffect } from 'react';
import {Card, Tabs, TextField, FormLayout, Layout, Modal, DataTable, Filters, Link, Button} from '@shopify/polaris';
import {Col, Row} from "react-flexbox-grid";
import {SetupUsername} from "../Setup";
import {SetupTags} from "../Setup";
import {
  Page
  } from '@shopify/polaris';
import {FrameStore, UserStore} from "../../Context/store";
import {useParams} from "react-router-dom";
import {findUserInUsersById} from "../../services";


const InviteMember = ()=> {
    const [sortedRows, setSortedRows] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [changeRole, setChangeRoleActive] = useState(false);
    const [removeRole, setRemoveRoleActive] = useState(false);
    const [inviteRole, setInviteRoleActive] = useState(false);
    const handleChangeActivator = useCallback(() => setChangeRoleActive(!changeRole), [changeRole]);
    const handleRemoveActivator = useCallback(() => setRemoveRoleActive(!removeRole), [removeRole]);
    const handleInviteActivator = useCallback(() => setInviteRoleActive(!inviteRole), [inviteRole]);
    const appliedFilters = [];
    const changeActivator = <Button onClick={handleChangeActivator} plain>Change Role</Button>;
    const RemoveActivator = <Button onClick={handleRemoveActivator} plain>Remove</Button>;

    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
      );
      
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

    const initiallySortedRows = [
      [
        'Holly Cardew',
        'holly@getvop.com',
        'Admin',
        <>
       {changeActivator} | {RemoveActivator}
        </>
        
      ]
    ];
  
    const rows = sortedRows ? sortedRows : initiallySortedRows;
   
    return(
        <>
         <Modal
            open={changeRole}
            onClose={handleChangeActivator}
            title="Change Role"
        >
            <Modal.Section>
            
            </Modal.Section>
      </Modal>

      <Modal
            open={removeRole}
            onClose={handleRemoveActivator}
            title="Remove User"
        >
            <Modal.Section>
            
            </Modal.Section>
      </Modal>

      <Modal
            open={inviteRole}
            onClose={handleInviteActivator}
            title="Invite User"
        >
            <Modal.Section>
            
            </Modal.Section>
      </Modal>
      <div style={{display:"flex", justifyContent:"flex-end",marginBottom:"10px"}}> <Button primary onClick={handleInviteActivator}>Invite User</Button></div>
        <Filters
        queryValue={queryValue}
        filters={[]}
        appliedFilters={appliedFilters}
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={handleQueryValueRemove}
      />
       <DataTable
      columnContentTypes={[
        'text',
        'text',
        'text',
        'text',
      ]}
      headings={[
        'Name',
        'Email',
        'Role',
        'Action',
      ]}
      rows={rows}
      defaultSortDirection="descending"
      initialSortColumnIndex={4}
      footerContent={`Showing ${rows.length} of ${rows.length} results`}
    />
      </>
       
    )
}

const Personal = ()=>{
    return(
        <Layout>
            <Layout.AnnotatedSection
            title="Personal Information"
            description="Shopify and your customers will use this information to contact you."
            >
            <Card sectioned>
                <FormLayout>
                <FormLayout.Group condensed>
                    <TextField label="Contact Name" onChange={() => {}} />
                    <TextField label="Company Name" onChange={() => {}} />
                </FormLayout.Group>
                <TextField type="email" label="Personal Email" onChange={() => {}} />
                <TextField label="Website" onChange={() => {}} />
                </FormLayout>
            </Card>
            </Layout.AnnotatedSection>
      </Layout>
    )
}

export const Settings = () => {
    const { userId } = useParams();
    const {users} = React.useContext(UserStore);
    const user = findUserInUsersById(users, userId)
    const [usernameSaved, setUsernameSaved] = useState(false);
    const [tagsSaved, setTagsSaved] = useState(false);
    const [initialTags, setInitialTags] = useState([]);
    const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

    const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

    useEffect(() => {
        if (user) {
            user.tags && setInitialTags(user.tags.map(tag => {return {tag: tag, views: 0, videos: 0}}))
        }
        unsetIsLoading();
    }, [user]);



    const usernameComplete = () => setUsernameSaved(true);
    const tagsComplete = () => setTagsSaved(true);

   

    const tabs = [
        {
          id: 'personal',
          content: 'Personal',
          accessibilityLabel: 'personal info',
          panelID: 'personal-info-content',
        },
        {
          id: 'team-members',
          content: 'Team Members',
          panelID: 'team-members-content',
        }
      ];
    return user ? (
        <Page fullWidth title="Settings">
        <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section>
                {selected == 0 ? <Personal/> : <InviteMember/>} 
                </Card.Section>
            </Tabs>
        </Card>
        </Page>
    ) : <></>;

};
