import React from 'react'

import useCourses from "../data/use-courses";

export default function Queue(props) {
    // console.log('queue props: ', props)
    const { courses, errored, mutate } = useCourses({
        firstPage: `${props.canvasUrl}/api/v1/courses?enrollment_type=teacher&access_token=`,
        apiKey: props.apiKey
    })

    if (errored) return 'error';
    if (!courses) return 'loading';

    // for debugging
    if (courses) console.log(courses)

    return (
        <p>queue</p> 
    )
}