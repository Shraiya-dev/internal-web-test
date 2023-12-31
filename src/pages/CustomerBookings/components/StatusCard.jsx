import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import { Requirements } from './Requirements'
import { StatusTracker } from './StatusTracker'
import { WorkerDetails } from './WorkerDetails'
import { BookingDetailsFooter } from './BookingDetailsFooter'
import { BookingDetailsHeader } from './BookingDetailsHeader'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    card: {
        flex: 1,
        padding: theme.spacing(2) + ' !important',
        paddingBottom: theme.spacing(0.5) + ' !important',
        backgroundColor: '#FFFEFE' + ' !important',
        borderRadius: theme.spacing(1) + ' !important',
        margin: 'auto' + ' !important',
        marginTop: theme.spacing(2) + ' !important',
    },
    showMoreContainer: {
        display: 'flex' + ' !important',
        justifyContent: 'space-between' + ' !important',
        alignItems: 'center' + ' !important',
    },
}))

export const StatusCard = ({ booking }) => {
    const classes = useStyles()
    const {
        jobType,
        state,
        city,
        status,
        createdOn,
        bookingDuration,
        hiringInfo,
        projectId,
        bookingId,
        workerDetails,
        shiftTime,
    } = booking

    const bookingDetailsHeaderProps = { jobType, bookingId, status, projectId }
    const requirementProps = { jobType, bookingDuration, state, city, shiftTime }
    const bookingDetailsFooterProps = { hiringInfo, createdOn }
    const statusTrackerProps = { hiringInfo, bookingId }

    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate()
    return (
        <Box className={classes.card} boxShadow={1}>
            <BookingDetailsHeader {...bookingDetailsHeaderProps} />
            <StatusTracker {...statusTrackerProps} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                    marginBottom: '0.25rem',
                    cursor: 'pointer',
                }}
                onClick={() => setShowMore((prev) => !prev)}
            >
                <Typography style={{ color: '#2563EB' }}>{showMore ? 'Show less' : 'Show more'} </Typography>
                {showMore ? (
                    <ExpandLessOutlinedIcon style={{ color: '#2563EB' }} />
                ) : (
                    <ExpandMoreOutlinedIcon style={{ color: '#2563EB' }} />
                )}
            </div>

            {showMore && (
                <div className={classes.showMoreContainer}>
                    <div>
                        <WorkerDetails workerDetails={workerDetails} />
                        <Requirements {...requirementProps} />
                        <BookingDetailsFooter {...bookingDetailsFooterProps} />
                    </div>
                    <div>
                        <Button
                            disabled={bookingDetailsHeaderProps.projectId === undefined}
                            onClick={() => {
                                navigate(`/attendance/${bookingDetailsHeaderProps.projectId}`)
                            }}
                            variant="contained"
                            color="secondary"
                        >
                            Manage Attendance
                        </Button>
                    </div>
                </div>
            )}
        </Box>
    )
}
