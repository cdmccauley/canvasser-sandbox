import { useSWRInfinite } from "swr";

import queueFetcher from "../libs/api-queue";

// `${req.body.url}/api/v1/courses/${course.id}/students/submissions?${urlParameters}&access_token=${req.body.key}`
const urlParameters = "student_ids[]=all&include[]=assignment&workflow_state[]=submitted&workflow_state[]=pending_review&enrollment_state=active";

let canvasUrl;
let apiKey;
let courses;

const getKey = (pageIndex, previousPageData) => {
    // if (previousPageData && !previousPageData.next) return null
    if (pageIndex > courses.length) return null

    // if (pageIndex === 0) return `${canvasUrl}/api/v1/courses/${courses[pageIndex]}/students/submissions?${urlParameters}&access_token=${apiKey}`
    return `${canvasUrl}/api/v1/courses/${courses[pageIndex]}/students/submissions?${urlParameters}&access_token=${apiKey}`

    // return `${previousPageData.next}&access_token=${apiKey}`
}

export default function useQueue(props) {
    // console.log('useQueue:', props)
    canvasUrl = props.canvasUrl;
    apiKey = props.apiKey;
    courses = Object.keys(props.courses);

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(getKey, queueFetcher, { initialSize: courses.length });

    // const queue = data ? [].concat(...data.map((page) => page.canvasData)) : [];
    let queue = { };
    data ? data.map((page) => {
        page.canvasData.map((submission) => {
            queue[submission.id] = {
                courseId: submission.assignment.course_id,
                assignmentId: submission.assignment_id,
                assignmentName: submission.assignment.name,
                userId: submission.user_id,
                userUrl: `${canvasUrl}/courses/${submission.assignment.course_id}/grades/${submission.user_id}`,
                submittedAt: submission.submitted_at,
                submissionUrl: `${canvasUrl}/courses/${submission.assignment.course_id}/gradebook/speed_grader?assignment_id=${submission.assignment_id}&student_id=${submission.user_id}`
            }
        })
    }) : { }

    const queueLoading = !data && !error;
    const queueError = error && error.status === 403;

    return {
        queueLoading,
        queueError,
        queue: queue,
        queueMutate: mutate,
    };
}