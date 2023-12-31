import { envs } from './env'
const VITE_PUBLIC_APP_ENV = import.meta.env.VITE_PUBLIC_APP_ENV ?? 'PROD'

export const getBackendUrl = () => {
    return envs.SERVER_URL
}
export const SERVER_URL = getBackendUrl()

export const GET_JOB_TYPES_API = `${SERVER_URL}/job-type/formatted`
export const SEND_OTP_API = `${SERVER_URL}/send-otp`
export const VALIDATE_OTP_API = `${SERVER_URL}/login`
export const getCustomerBookingsAPI = (phoneNumber) => `${SERVER_URL}/admin/bookings/phoneNumber/${phoneNumber}`

export const getProfilesFromStatusAPI = (bookingId, status) =>
    `${SERVER_URL}/admin/bookings/${bookingId}/hiring-details/${status}`

export const getWorkerProfileAPI = (workerId, bookingId) =>
    `${SERVER_URL}/admin/workers/${workerId}?bookingId=${bookingId}&status=home`

export const getWorkProfileAPI = (workerId, bookingId) =>
    `${SERVER_URL}/admin/workers/${workerId}?status=work&bookingId=${bookingId}`
