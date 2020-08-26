import React from 'react'
import {EmptyState, Button, Page} from '@shopify/polaris';

export const ConnectAccount = () => {
    return (
        <Page fullWidth title="Connect Account">
            <EmptyState
                heading="Pull Content from your existing social media account"
                image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
              >
                <p>New videos from TikTok will be imported when they are available.</p><br/>
                <Button primary>
                Check for Videos
              </Button>
              </EmptyState>
        </Page>
    )
}
