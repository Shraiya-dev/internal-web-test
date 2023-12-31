import { Badge, Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { CopyAll } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CTAMapByBookingType } from '../../utils/ctaHelpers'
import { formatEnum } from '../../utils/stringHelpers'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from '../../providers/SnackbarProvider'

const BookingCard = ({ bookingData }) => {
    const { booking, project, customer, stats, jobs } = bookingData
    const { showSnackbar } = useSnackbar()
    const allowedActions = useMemo(() => CTAMapByBookingType[booking?.bookingType || 'FPH'][booking?.status]?.actions, [booking])
    const allowedTabs = useMemo(() => CTAMapByBookingType[booking?.bookingType || 'FPH'][booking?.status]?.tabs, [booking])
    const totalPeopleRequired = useMemo(
        () => Object.values(booking?.peopleRequired)?.reduce((prev, next) => Number(prev) + Number(next)),
        [booking]
    )

    return (
        <>
            <Paper
                variant="outlined"
                sx={{ borderRadius: 1 }}
                style={{
                    padding: '16px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={600}>
                            {formatEnum(booking?.jobType)} ({totalPeopleRequired})
                        </Typography>
                        <Chip
                            sx={(theme) => ({
                                backgroundColor: booking?.bookingType === 'LIMITED_DISCOVERY' ? theme.palette.grey[500] : theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                                height: '24px',
                            })}
                            label={booking?.bookingType === 'LIMITED_DISCOVERY' ? 'Discovery' : 'FPH'}
                        />
                        <Chip
                            sx={(theme) => ({
                                backgroundColor: theme.palette.grey[200],
                                height: '24px',
                            })}
                            label={formatEnum(booking?.status)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={(theme) => ({ color: theme.palette.grey[700] })} variant="caption">
                            ID: {booking?._id}
                            <CopyToClipboard text={booking?._id} onCopy={() => showSnackbar({ msg: 'Copied!', sev: 'success', autoHideDuration: '500' })}>
                                <CopyAll fontSize='small'/>
                            </CopyToClipboard>
                        </Typography>
                        <Typography sx={(theme) => ({ color: theme.palette.grey[700] })} variant="caption">
                            Created on {new Date(booking?.createdAt).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                {allowedTabs && stats?.jobCardCounts && (
                    <Stack direction="row" flexWrap="wrap">
                        {Object.keys(allowedTabs).map((item) => {
                            const state = stats?.jobCardCounts[item]
                            return (
                                <Paper
                                    key={item}
                                    sx={(theme) => ({
                                        backgroundColor: theme.palette.grey[100],
                                        p: 0.5,
                                        m: 0.5,
                                        cursor: 'pointer',
                                    })}
                                >
                                    <Typography variant="h6" align="center">
                                        {(state?.HELPER ?? 0) + (state?.TECHNICIAN ?? 0) + (state?.SUPERVISOR ?? 0)}
                                        {item === 'DEPLOYMENT_COMPLETE' && <>/{totalPeopleRequired}</>}
                                    </Typography>

                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.grey[700],
                                        })}
                                        fontSize={12}
                                        align="center"
                                    >
                                        {formatEnum(item)}
                                    </Typography>
                                </Paper>
                            )
                        })}
                    </Stack>
                )}
                <Box pt={1} display="flex" justifyContent="space-between">
                    <Box>
                        {Object.keys(booking?.peopleRequired).map((item) => {
                            return (
                                <Box pb={1} pt={1} display="flex" alignItems="center" key={item} justifyContent="space-between">
                                    {formatEnum(item)}: {booking?.peopleRequired[item]}
                                    {jobs?.[item]?.isVisible ? <Chip sx={(theme) => ({backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText, height: '24px', ml: 1, fontSize: 10})} label='LIVE'/> : null}
                                </Box>
                            )
                        })}
                    </Box>
                    <Box style={{ maxWidth: '50%', overflow: 'hidden' }}>
                        <Box pb={1} pt={1} display="flex" sx={{ wordBreak: 'break-word' }} alignItems="center">
                            Project: {project?.name}
                        </Box>
                        <Box pb={1} pt={1} display="flex" sx={{ wordBreak: 'break-word' }} alignItems="center">
                            Company: {customer?.companyName}
                        </Box>
                        <Box pb={1} pt={1} display="flex" sx={{ wordBreak: 'break-word' }} alignItems="center">
                            Location: {project?.city}, {project?.state}
                        </Box>
                    </Box>
                </Box>
                <Divider style={{ margin: '16px 0' }} />
                <Box display="flex" justifyContent="flex-end">
                    {allowedActions && (
                        <>
                            {allowedActions.view && (
                                <Link to={`/bookings/${booking?._id}`}>
                                    <Button variant="outlined">View Booking</Button>
                                </Link>
                            )}
                        </>
                    )}
                    {booking?.status === 'CANCELLED' && (
                        <Stack flex={1}>
                            <Typography flex={1} textAlign="left">
                                <strong>Cancelation Reason: </strong>
                                {booking?.cancellationReason?.cancelReason ?? 'NA'}
                            </Typography>
                            <Typography flex={1} textAlign="left">
                                <strong>Cancelation Details: </strong>
                                {booking?.cancellationReason?.details ?? 'NA'}
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Paper>
        </>
    )
}

export default BookingCard
