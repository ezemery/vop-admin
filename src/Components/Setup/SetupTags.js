import React, {useState} from 'react';
import {Steps, Input, Button, Card, Table, Alert} from 'antd';
import NumericLabel from 'react-pretty-numbers';
import 'whatwg-fetch'
import {OnboardingSteps} from "./styles"


const { Step } = Steps;
const { Search } = Input;

const SetupTags = ({complete, showSteps, initialTags}) => {

    const [tags, setTags] = useState(initialTags);
    const onSubmit = data => { saveTags(); };
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const removeTag = index => {
        return () => {
            setTags(oldArray => {
                oldArray.splice(index, 1);
                return [...oldArray]
            });
        };
    };

    const AddHashTag = (tag) => {
        setLoading(true)
        setError(null)
        fetch('/api/tiktok/tag', {
            method: 'POST',
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
            if (json.tag) {
                setTags(oldArray => [...oldArray, json]);
            } else {
                setError("Unable to find tag")
            }
        }).catch(function(ex) {
            setError("Unable to fetch tag information")
        })

    };

    const saveTags = () => {
        fetch('/api/tiktok/tag_save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: tags.map(tag => tag.tag),
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json);
            if (json === "Success") {
                complete();
            }
        }).catch(function(ex) {
            console.log('parsing failed', ex)
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
            <Table columns={columns} dataSource={tags} />
            <p>&nbsp;</p>
            <Button type="primary" className="login-form-button" onClick={onSubmit}>
                Save
            </Button>
            <Button onClick={complete} style={{float:"right"}} hidden={!showSteps}>Skip</Button>
        </Card>
    );
};

export default SetupTags