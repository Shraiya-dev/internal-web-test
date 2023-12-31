import {
    Box,
    Button,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { PopAlert } from '../../components/Snackbar'
import { useFormikProps } from '../../hooks/useFormikProps'
import { getSelectOptions } from '../../utils/InputHelpers'
import { JobTypeOptions } from '../../utils/optionHelpers'
import {
    genderOptions,
    languageOptions,
    phoneTypeOptions,
    vaccinatedOptions,
    workerProfileOptions,
    yesOrNoBooleanOptions,
    yoeOptions,
} from './helper'
import useAddEditWorkerProfile from './hooks/useAddEditWorkerProfile'
import { Membership } from './Membership'
import { PaymentDetails } from './PaymentDetails'
import { Verification } from './Verification'

const AddEditWorkerProfile = () => {
    const { workerId } = useParams()
    const {
        states,
        districts,
        setStateId,
        form,
        disableForm,
        setDisableForm,
        isError,
        markWorkerAsAvailable,
        worker,
        snackbarProps,
        fetchWorker,
    } = useAddEditWorkerProfile(workerId)
    const formikProps = useFormikProps(form, { disabled: disableForm })

    return (
        <>
            <DashboardLayout>
                <Stack alignItems="stretch" margin="0 auto" maxWidth={1000}>
                    <Paper sx={{ p: 2, m: 2 }}>
                        <Container
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                mb: 4,
                            }}
                        >
                            <Stack justifyContent="flex-start" alignItems="flex-start">
                                <Typography variant="h3">Worker Information</Typography>
                                {worker && (
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {worker?.status && <Chip label={worker?.status} />}
                                        {worker?.bookingId &&
                                            worker?.status &&
                                            ['EMPLOYED', 'CONFIRMED'].includes(worker?.status) && (
                                                <Typography>
                                                    Booking Id:&nbsp;
                                                    <Link
                                                        style={{
                                                            textDecoration: 'underline',
                                                            color: '#244CB3',
                                                        }}
                                                        to={`/bookings/${worker?.bookingId}`}
                                                    >
                                                        {worker?.bookingId}
                                                    </Link>
                                                </Typography>
                                            )}
                                    </Stack>
                                )}
                            </Stack>
                            <Box
                                display="flex"
                                justifyItems="flex-end"
                                sx={{
                                    '*': {
                                        width: 180,
                                    },
                                }}
                            >
                                {disableForm ? (
                                    workerId && (
                                        <>
                                            <Button
                                                sx={{ mr: 2 }}
                                                variant="outlined"
                                                onClick={() => {
                                                    setDisableForm(false)
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            {
                                                <Button
                                                    disabled={!worker?.isAvailableReady}
                                                    variant="outlined"
                                                    onClick={markWorkerAsAvailable}
                                                >
                                                    Mark as Available
                                                </Button>
                                            }
                                        </>
                                    )
                                ) : (
                                    <>
                                        {workerId && (
                                            <Button
                                                variant="outlined"
                                                sx={{ mr: 2 }}
                                                onClick={() => {
                                                    setDisableForm(true)
                                                    fetchWorker()
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        <Button variant="outlined" onClick={form.handleSubmit}>
                                            Submit
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Container>
                        <Container>
                            <h3>Personal Information</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        {...formikProps('name')}
                                        onChange={(e) => {
                                            if (e.target.value.trim().length > 0) {
                                                form.setFieldValue('name', e.target.value)
                                            } else {
                                                form.setFieldValue('name', e.target.value.trim())
                                            }
                                        }}
                                        error={isError('name')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Select
                                        fullWidth
                                        {...formikProps('state')}
                                        error={isError('state')}
                                        onChange={(e) => {
                                            form.handleChange(e)
                                            form.setFieldValue('city', 'none')
                                            setStateId(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="none">Select State</MenuItem>
                                        {states?.map((item) => (
                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={4}>
                                    <Select
                                        fullWidth
                                        {...formikProps('city')}
                                        value={form.values.city}
                                        error={isError('city')}
                                        disabled={form.values.state === 'none' || disableForm}
                                    >
                                        <MenuItem value="none">Select Districts</MenuItem>
                                        {districts?.map((item) => (
                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        {...formikProps('phoneNumber')}
                                        error={isError('phoneNumber')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Select fullWidth {...formikProps('lp')} error={isError('lp')}>
                                        <MenuItem value="none">Select Language</MenuItem>
                                        {getSelectOptions(languageOptions)}
                                    </Select>
                                </Grid>
                            </Grid>
                            <h3>Gender</h3>
                            <FormControl
                                fullWidth
                                disabled={disableForm}
                                sx={(t) => ({
                                    border: '2px solid transparent',
                                    borderRadius: 1,
                                    borderColor: isError('gender') ? t.palette.error.light : 'transparent',
                                })}
                            >
                                <RadioGroup {...formikProps('gender')}>
                                    <Grid container spacing={2}>
                                        {genderOptions.map((x) => {
                                            return (
                                                <Grid key={x.value} item xs={4}>
                                                    <FormControlLabel
                                                        value={x.value}
                                                        control={<Radio />}
                                                        label={x.label}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <h3>Phone Type</h3>
                            <FormControl
                                fullWidth
                                disabled={disableForm}
                                sx={{
                                    border: '2px solid transparent',
                                    borderRadius: 1,
                                    borderColor: isError('phoneType') ? '#FF99A2' : 'transparent',
                                }}
                            >
                                <RadioGroup {...formikProps('phoneType')}>
                                    <Grid container spacing={2}>
                                        {phoneTypeOptions.map((x) => {
                                            return (
                                                <Grid key={x.value} item xs={4}>
                                                    <FormControlLabel
                                                        value={x.value}
                                                        control={<Radio />}
                                                        label={x.label}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <h3>Open to working out of native city?</h3>
                            <h5>Is the worker okay to be placed out of the native city if a good opportunity comes</h5>

                            <FormControl fullWidth disabled={disableForm}>
                                <RadioGroup
                                    {...formikProps('optOutOfCity')}
                                    onChange={(e) => {
                                        form.setFieldValue('optOutOfCity', e.target.value === 'true')
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        {yesOrNoBooleanOptions.map((x) => {
                                            return (
                                                <Grid key={x.value} item xs={6}>
                                                    <FormControlLabel
                                                        value={x.value}
                                                        control={<Radio />}
                                                        label={x.label}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <h3>Are You Vaccinated?</h3>

                            <FormControl
                                fullWidth
                                disabled={disableForm}
                                sx={{
                                    border: '2px solid transparent',
                                    borderRadius: 1,
                                    borderColor: isError('vaccination') ? '#FF99A2' : 'transparent',
                                }}
                            >
                                <RadioGroup {...formikProps('vaccination')}>
                                    <Grid container spacing={2}>
                                        {vaccinatedOptions.map((x) => {
                                            return (
                                                <Grid key={x.value} item xs={4}>
                                                    <FormControlLabel
                                                        value={x.value}
                                                        control={<Radio />}
                                                        label={x.label}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <h3>Aadhaar and PAN Details</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Aadhaar Number"
                                        {...formikProps('aadhaarNumber')}
                                        error={isError('aadhaarNumber')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Pan Number"
                                        {...formikProps('panNumber')}
                                        error={isError('panNumber')}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="UAN Number"
                                        {...formikProps('uanNo')}
                                        error={isError('uanNo')}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>

                    {worker?.onboardingDetails && (
                        <Paper sx={{ p: 2, m: 2 }}>
                            <Container>
                                <h3>Onboarding Channel Information</h3>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <h4 style={{ margin: '5px 0' }}>Onboarding Type</h4>
                                        <Typography>{worker.onboardingDetails.type}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <h4 style={{ margin: '5px 0' }}>Partner Name</h4>
                                        <Typography>{worker.onboardingDetails.partner.name}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <h4 style={{ margin: '5px 0' }}>Partner Number</h4>
                                        <Typography>{worker.onboardingDetails.partner.phoneNumber}</Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <h4 style={{ margin: '5px 0' }}>Referral Code</h4>

                                        <Chip color="primary" label={worker.onboardingDetails.partner.referralCode} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    )}
                    <Paper sx={{ p: 2, m: 2 }}>
                        <Container>
                            <h3>Job Information</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Select {...formikProps('jobType')} error={isError('jobType')}>
                                            <MenuItem value="none">Select Job Type</MenuItem>
                                            {getSelectOptions(JobTypeOptions)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Select {...formikProps('experience')} error={isError('experience')}>
                                            <MenuItem value="none">Select Experience</MenuItem>
                                            {getSelectOptions(yoeOptions)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <h3>Worker Profile</h3>
                            <FormControl
                                fullWidth
                                disabled={disableForm}
                                sx={{
                                    border: '2px solid transparent',
                                    borderRadius: 1,
                                    borderColor: isError('workerType') ? '#FF99A2' : 'transparent',
                                }}
                            >
                                <RadioGroup {...formikProps('workerType')}>
                                    <Grid container>
                                        {workerProfileOptions.map((x) => {
                                            return (
                                                <Grid key={x.value} item xs={4}>
                                                    <FormControlLabel
                                                        value={x.value}
                                                        control={<Radio />}
                                                        label={x.label}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Container>
                    </Paper>
                    {workerId && (
                        <Paper sx={{ p: 2, m: 2 }}>
                            <Membership uid={workerId} user={worker} fetchWorker={fetchWorker} />
                        </Paper>
                    )}
                    {workerId && (
                        <Paper sx={{ p: 2, m: 2 }}>
                            <Verification uid={workerId} user={worker} fetchWorker={fetchWorker} />
                        </Paper>
                    )}
                    {workerId && (
                        <Paper sx={{ p: 2, m: 2 }}>
                            <PaymentDetails uid={workerId} userType="worker" />
                        </Paper>
                    )}
                </Stack>
            </DashboardLayout>
            <PopAlert {...snackbarProps} />
        </>
    )
}

export default AddEditWorkerProfile
