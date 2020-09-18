import React, {useState, useContext} from 'react';
import {Steps, Input, Button, Card, Table, Alert} from 'antd';
import 'whatwg-fetch'
import {OnboardingSteps} from "./styles"
import {useParams} from "react-router-dom";
import NumericLabel from "../NumericLabel";
import {UserStore,FrameStore,AccountStore} from "../../Context/store";

const { Step } = Steps;
const { Search } = Input;

export const SetupTags = ({complete, showSteps, initialTags}) => {
    const {user} = React.useContext(UserStore);
    const {updateContext} = React.useContext(AccountStore);
    const { unsetIsLoading, setIsLoading } = useContext(FrameStore);
    const [tags, setTags] = useState(initialTags);
    const { accountId } = useParams();
    const userId = user.id
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const saveTags = async () => {
        setIsLoading();
        try{
            const response =   await fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/tag_save`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tags: tags.map(tag => tag.tag),
                })
            })

            const json =  await response.json();

            if (json.success === true) {
                updateContext()
                unsetIsLoading()
                complete();
            }
        }catch(error){

        }

    };

    const removeTag = index => {
        return () => {
            setTags(oldArray => {
                oldArray.splice(index, 1);
                return [...oldArray]
            });
        };
    };

    const onSubmit = () => { saveTags(); };

    let params = {
        justification: 'L',
        commafy: false,
        shortFormat: true,
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Videos',
            dataIndex: 'posts',
            key: 'posts',
        },
        {
            title: 'Views',
            dataIndex: 'views',
            key: 'views',
            render: item => <NumericLabel params={params}>{item}</NumericLabel>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, record, idx) => (
                <span>
                    <Button type="link" onClick={removeTag(idx)}>Delete</Button>
                </span>
            ),
        },
        ];

    const AddHashTag = async (tag) => {
        setLoading(true)
        setError(null)
        try{
            const response = await fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/tag`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tag: tag,
                })
            })

        const json = await response.json();
        setLoading(false)
        if (json.body) {
            setTags(oldArray => [...oldArray, {
                id: json.body.challengeData.challengeId,
                tag: json.body.challengeData.challengeName,
                posts: json.body.challengeData.posts,
                views: json.body.challengeData.views,
                key:json.body.challengeData.challengeId
            }]);
        } else {
            setError("Unable to find tag")
        }
    }catch(error){
        setError("Unable to fetch tag information")
    }
    };

    return (
        <Card title="Setup hash tags" bordered={false}>
             <OnboardingSteps>
                { showSteps ? <div><Steps current={2}>
                    <Step />
                    <Step />
                    <Step />
                </Steps><p>&nbsp;</p></div> : "" }
            </OnboardingSteps>

            <p> Enter a list of hashtags you want to import</p>
            <Search
                placeholder="Enter a hashtag"
                enterButton="Add"
                prefix={"#"}
                loading={loading}
                onSearch={AddHashTag}
            />
            { error != null ? (  <div>
                <div style={{height:"10px"}} />
                <Alert message={error} type="error" showIcon />
            </div>) : ""}
            <p>&nbsp;</p>
            <Table columns={columns} dataSource={tags}/>
            <p>&nbsp;</p>
            <Button type="primary" className="login-form-button" onClick={onSubmit}>
                Save
            </Button>
            <Button onClick={complete} style={{float:"right"}} hidden={!showSteps}>Skip</Button>
        </Card>
    );
};
