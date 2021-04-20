import React from 'react'

import useCourses from "../data/use-courses";
import useQueue from '../data/use-queue';

import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableSortLabel,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,

  } from '@material-ui/core';

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
    if (courses) console.log('courses:', courses)
    if (queue) console.log('queue:', queue)

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell><TableSortLabel>Priority</TableSortLabel></TableCell>
                            <TableCell><TableSortLabel>Course</TableSortLabel></TableCell>
                            <TableCell><TableSortLabel>Assignment</TableSortLabel></TableCell>
                            <TableCell><TableSortLabel>Submitted</TableSortLabel></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(queue).map((submission) => (
                            <TableRow 
                                hover 
                                key={submission}
                            >
                                <TableCell padding='checkbox'><Checkbox /></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{courses[queue[submission].courseId].name}</TableCell>
                                <TableCell>{queue[submission].assignmentName}</TableCell>
                                <TableCell>{queue[submission].submittedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}