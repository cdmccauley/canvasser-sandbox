import React from 'react'

import useUser from "../data/use-user";

import { Avatar } from '@material-ui/core';

export default function User(props) {
    // console.log('user props: ', props)
    const { user, errored, mutate } = useUser(props.canvasUrl && props.apiKey ? `${props.canvasUrl}/api/v1/users/self?access_token=${props.apiKey}` : null);

    if (errored) return <img src='https://via.placeholder.com/128x128?text=error' />;
    if (!user) return <img src='https://via.placeholder.com/128x128?text=loading' />;

    // for debugging
    if (user) console.log(user)

    return (
        <Avatar src={user.avatar_url} alt={user.name} style={{height: 36, width: 36, border: '2px solid white' }} />
    )
}