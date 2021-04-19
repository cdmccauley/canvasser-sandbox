import React from 'react'

import useCourses from "../data/use-courses";
import useQueue from '../data/use-queue';

export default function Queue(props) {
    // console.log('queue props: ', props)
    const { courses, courseError, courseMutate } = useCourses({
        firstPage: `${props.canvasUrl}/api/v1/courses?enrollment_type=teacher&access_token=`,
        apiKey: props.apiKey
    })
    const { queue, queueError, queueMutate } = useQueue({
        canvasUrl: props.canvasUrl,
        apiKey: props.apiKey,
        courses: courses
    })

    if (courseError) return 'course error';
    if (Object.keys(courses).length === 0) return 'loading courses';

    if (queueError) return 'queue error';
    if (Object.keys(queue).length === 0) return 'loading queue';

    // for debugging
    if (courses) console.log(courses)
    if (queue) console.log(queue)

    return (
        <button onClick={() => queueMutate()}>
            Refresh Queue
        </button>
    )
}