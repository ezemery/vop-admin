import React, {useState} from 'react';
import {Steps, Input, Button, Card, Table, Alert} from 'antd';
import 'whatwg-fetch'
import {OnboardingSteps} from "./styles"
import {useParams} from "react-router-dom";
import NumericLabel from "../NumericLabel";
import {UserStore} from "../../Context/store";

const { Step } = Steps;
const { Search } = Input;

export const SetupTags = ({complete, showSteps, initialTags}) => {

    const [tags, setTags] = useState(initialTags);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const saveTags = () => {
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/tag_save`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: tags.map(tag => tag.tag),
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if (json.success === true) {
                complete();
            }
        }).catch(function(ex) {

        })

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

    const { accountId } = useParams();
    const {user} = React.useContext(UserStore);
    const userId = user.id

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

    const AddHashTag = (tag) => {
        setLoading(true)
        setError(null)
        fetch(process.env.REACT_APP_API_HOST + `/admin/user/id/${userId}/account/id/${accountId}/social/tiktok/tag`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tag: tag,
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            setLoading(false)
            if (json.challengeInfo) {
                setTags(oldArray => [...oldArray, {
                   id: json.challengeInfo.challenge.id,
                    tag: json.challengeInfo.challenge.title,
                    posts: json.challengeInfo.stats.videoCount,
                    views: json.challengeInfo.stats.viewCount
                }]);
            } else {
                setError("Unable to find tag")
            }
        }).catch(function(ex) {
            setError("Unable to fetch tag information")
        })

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
