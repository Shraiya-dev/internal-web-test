import {
	Box,
	Button,
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
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { PopAlert } from '../../components/Snackbar'
import { getSelectOptions } from '../../utils/InputHelpers'
import {
	genderOptions,
	jobTypeOptions,
	languageOptions,
	phoneTypeOptions,
	vaccinatedOptions,
	workerProfileOptions,
	yesOrNoBooleanOptions,
	yoeOptions,
} from './helper'
import useAddEditWorkerProfile from './hooks/useAddEditWorkerProfile'

const AddEditWorkerProfile = () => {
	const { workerId } = useParams()
	const {
		form,
		cityOptions,
		stateOptions,
		disableForm,
		setDisableForm,
		isError,
		markWorkerAsAvailable,
		showSnackbar,
		worker,
		snackbarProps,
	} = useAddEditWorkerProfile(workerId)
	const formikProps = useCallback(
		(key) => ({
			name: key,
			id: key,
			value: form.values[key],
			onChange: form.handleChange,
			onBlur: form.handleBlur,
			disabled: disableForm,
		}),
		[form, disableForm]
	)

	return (
		<>
			<DashboardLayout>
				<Stack alignItems="stretch" margin="0 auto" maxWidth={1000}>
					<Paper sx={{ p: 2, m: 2 }}>
						<Container
							sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
							<h1>Worker Information</h1>
							<Box
								display="flex"
								justifyItems="flex-end"
								sx={{
									'*': {
										width: 180,
									},
								}}>
								{disableForm ? (
									<>
										<Button
											sx={{ mr: 2 }}
											variant="outlined"
											onClick={() => {
												setDisableForm(false)
											}}>
											Edit
										</Button>
										{worker?.isAvailableReady && (
											<Button variant="outlined" onClick={markWorkerAsAvailable}>
												Mark as Available
											</Button>
										)}
									</>
								) : (
									<>
										{workerId && (
											<Button
												variant="outlined"
												sx={{ mr: 2 }}
												onClick={() => {
													setDisableForm(true)
												}}>
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
									<TextField fullWidth label="Full Name" {...formikProps('name')} error={isError('name')} />
								</Grid>
								<Grid item xs={4}>
									<Select
										fullWidth
										{...formikProps('state')}
										error={isError('state')}
										onChange={(e) => {
											form.handleChange(e)
											form.setFieldValue('city', 'none')
										}}>
										{getSelectOptions(stateOptions)}
									</Select>
								</Grid>
								<Grid item xs={4}>
									<Select
										fullWidth
										{...formikProps('city')}
										error={isError('city')}
										disabled={form.values.state === 'none' || disableForm}>
										{getSelectOptions(cityOptions)}
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
									borderColor: isError('gender') ? t.palette.error : 'transparent',
								})}>
								<RadioGroup {...formikProps('gender')}>
									<Grid container spacing={2}>
										{genderOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={4}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
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
								}}>
								<RadioGroup {...formikProps('phoneType')}>
									<Grid container spacing={2}>
										{phoneTypeOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={4}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
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
									}}>
									<Grid container spacing={2}>
										{yesOrNoBooleanOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={6}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
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
								}}>
								<RadioGroup {...formikProps('vaccination')}>
									<Grid container spacing={2}>
										{vaccinatedOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={4}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
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
									<TextField fullWidth label="Pan Number" {...formikProps('panNumber')} error={isError('panNumber')} />
								</Grid>
								<Grid item xs={4}>
									<TextField fullWidth label="UAN Number" {...formikProps('uanNo')} error={isError('uanNo')} />
								</Grid>
							</Grid>
						</Container>
					</Paper>
					<Paper sx={{ p: 2, m: 2 }}>
						<Container>
							<h3>Job Information</h3>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<FormControl fullWidth>
										<Select {...formikProps('jobType')} error={isError('jobType')}>
											<MenuItem value="none">Select Job Type</MenuItem>
											{getSelectOptions(jobTypeOptions)}
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
								}}>
								<RadioGroup {...formikProps('workerType')}>
									<Grid container>
										{workerProfileOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={4}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
												</Grid>
											)
										})}
									</Grid>
								</RadioGroup>
							</FormControl>
						</Container>
					</Paper>
					<Paper sx={{ p: 2, m: 2 }}>
						<Container>
							<h3>Bank Information</h3>
							<h5>Do they have bank account</h5>
							<FormControl fullWidth disabled={disableForm}>
								<RadioGroup
									{...formikProps('bankAccount')}
									onChange={(e) => {
										form.setFieldValue('bankAccount', e.target.value === 'true')
									}}>
									<Grid container spacing={2}>
										{yesOrNoBooleanOptions.map((x) => {
											return (
												<Grid key={x.value} item xs={6}>
													<FormControlLabel value={x.value} control={<Radio />} label={x.label} />
												</Grid>
											)
										})}
									</Grid>
								</RadioGroup>
							</FormControl>
							{form.values.bankAccount && (
								<Paper>
									<h3>Bank Information</h3>
									<Grid container spacing={2}>
										<Grid item xs={4}>
											<TextField
												fullWidth
												label="Account holder name"
												{...formikProps('accHolderName')}
												error={isError('accHolderName')}
											/>
										</Grid>

										<Grid item xs={4}>
											<TextField
												fullWidth
												label="Account Number"
												{...formikProps('accountNumber')}
												error={isError('accountNumber')}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField fullWidth label="IFSC Code" {...formikProps('ifscCode')} error={isError('ifscCode')} />
										</Grid>
									</Grid>
								</Paper>
							)}
						</Container>
					</Paper>
				</Stack>
			</DashboardLayout>
			<PopAlert {...snackbarProps} />
		</>
	)
}

export default AddEditWorkerProfile