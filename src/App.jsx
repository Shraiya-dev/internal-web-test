// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
//import AddWorker from './pages/Registration/Dashboard'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { PrivateRoute } from './components'
import DashboardLayout from './components/Layouts/DashboardLayout'
import { AllocatedWorkers, AttendanceComponent, Customer, CustomerBookings, Login, WorkerProfile } from './pages'
import Attendance from './pages/Attendance'
import BookingById from './pages/Bookings/BookingById'
import Bookings from './pages/Bookings/Bookings'
import CreateBookingForm from './pages/Bookings/CreateBookingForm'
import CreateBookings from './pages/Bookings/CreateBookings'
import { Chats } from './pages/Chats/Chats'
import { AddCustomer } from './pages/Customer/AddCustomer'
import { AddEditCustomerDetail } from './pages/Customer/customerDetails/AddEditCustomerDetail'
import Dashboard from './pages/Dashboard/Dashboard'
import JCA from './pages/JCA/jobCards'
import JobCards from './pages/jobCards/JobCards'
import { Orders } from './pages/OrdersInfo/OrdersInfo'
import { Organisation } from './pages/Organization/Organization'
import { AddEditPartner } from './pages/Partner/EditPartner'
import Partner from './pages/Partner/Partner'
import CreateProject from './pages/Project/createProject'
import Project from './pages/Project/Project'
import ProjectById from './pages/Project/ProjectById'
import { ProjectProvider } from './pages/Project/provider/ProjectProvider'
import RewardAndPenalty from './pages/Rewards'
import { WorkerProfileProvider } from './pages/WorkerProfile/providers/WorkerProfileProvider/WorkerProfileProvider'
import AddEditWorkerProfile from './pages/workers/AddEditWorkerProfile'
import AddWorkerForBooking from './pages/workers/AddWorkerForBooking'
import { AddEditOrders } from './pages/WorkersInfo/AddEditOrders'
import WorkerInfoTable from './pages/WorkersInfo/workerInfo'
import { BookingProvider } from './providers/BookingProvider'
import { LoaderProvider } from './providers/LoaderProvider'
import { SnackbarProvider } from './providers/SnackbarProvider'
import {
    ADD_CUSTOMER_ROUTE,
    ADD_ORDERS_ROUTE,
    ADD_PARTNER_ROUTE,
    ADD_PROJECT_ROUTE,
    ADD_WORKER_IN_BOOKING_ROUTE,
    ADD_WORKER_ROUTE,
    ATTENDANCE_ROUTE,
    BOOKING_BOOKINGID_ROUTE,
    BOOKING_BY_ID_ROUTE,
    BOOKING_ROUTE,
    BOOKINGS_ATTENDANCE_ROUTE,
    CHATS,
    CUSTOMER_CUSTOMER_ID_BOOKINGS_CREATE,
    CUSTOMER_CUSTOMER_ID_ROUTE,
    CUSTOMER_ROUTE,
    DASHBOARD_ROUTE,
    EDIT_ORDERS_ROUTE,
    JCA_ROUTE,
    JOBCARDS_FOR_BOOKING_ROUTE,
    ORDERS_INFO_ROUTE,
    ORGANISATION_ORGANISATION_ID_CUSTOMER_CUSTOMER_ID_PROJECT_CREATE,
    ORGANIZATION_ROUTE,
    PARTNER_DETAIL_VIEW,
    PROJECT_BY_ID_ROUTE,
    PROJECT_PROJECT_ID_BOOKING_CREATE,
    PROJECT_ROUTE,
    REWARD_PENALTIES_ROUTE,
    WORKER_INFO_BY_ID_ROUTE,
    WORKER_INFO_ROUTE,
} from './routes'

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#244CB3',
            contrastText: '#fff',
            light: '#244CB3ef',
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
        },

        MuiInput: {
            defaultProps: {
                disableUnderline: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '14',
                    alignItems: 'center',
                },
            },
        },
    },
})

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <LoaderProvider>
                    <SnackbarProvider>
                        <div className="App">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <CustomerBookings />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={BOOKINGS_ATTENDANCE_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Attendance />
                                        </PrivateRoute>
                                    }
                                />
                                {/* added new route project */}
                                <Route
                                    path={PROJECT_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Project />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ADD_PROJECT_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <DashboardLayout>
                                                <CreateProject />
                                            </DashboardLayout>
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={REWARD_PENALTIES_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <RewardAndPenalty />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ADD_PARTNER_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Partner />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={PARTNER_DETAIL_VIEW}
                                    element={
                                        <PrivateRoute>
                                            <AddEditPartner />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={PROJECT_BY_ID_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <ProjectProvider>
                                                <ProjectById />
                                            </ProjectProvider>
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={ORDERS_INFO_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Orders />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={ADD_ORDERS_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddEditOrders />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={EDIT_ORDERS_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddEditOrders />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={WORKER_INFO_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <WorkerInfoTable />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={WORKER_INFO_BY_ID_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddEditWorkerProfile />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={ADD_WORKER_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddEditWorkerProfile />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={JOBCARDS_FOR_BOOKING_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <JobCards />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ADD_WORKER_IN_BOOKING_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddWorkerForBooking />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={JCA_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <JCA />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={CUSTOMER_CUSTOMER_ID_BOOKINGS_CREATE}
                                    element={
                                        <PrivateRoute>
                                            <CreateBookings />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ORGANISATION_ORGANISATION_ID_CUSTOMER_CUSTOMER_ID_PROJECT_CREATE}
                                    element={
                                        <PrivateRoute>
                                            <DashboardLayout>
                                                <CreateProject />
                                            </DashboardLayout>
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={DASHBOARD_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={BOOKING_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Bookings />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={BOOKING_BY_ID_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <BookingProvider>
                                                <BookingById />
                                            </BookingProvider>
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={PROJECT_PROJECT_ID_BOOKING_CREATE}
                                    element={
                                        <PrivateRoute>
                                            <ProjectProvider>
                                                <CreateBookingForm />
                                            </ProjectProvider>
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={BOOKING_BOOKINGID_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                {/* <Route
							path="/tap"
							element={
								<PrivateRoute>
								<TAP />
								</PrivateRoute>
							}
							/> */}

                                <Route
                                    path=":bookingId/workers/:status"
                                    element={
                                        <PrivateRoute>
                                            <AllocatedWorkers />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ATTENDANCE_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AttendanceComponent />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/profile/:workerId/:bookingId"
                                    element={
                                        <PrivateRoute>
                                            <WorkerProfileProvider>
                                                <WorkerProfile />
                                            </WorkerProfileProvider>
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={CUSTOMER_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Customer />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={ADD_CUSTOMER_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddCustomer />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path={CUSTOMER_CUSTOMER_ID_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <AddEditCustomerDetail />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={ORGANIZATION_ROUTE}
                                    element={
                                        <PrivateRoute>
                                            <Organisation />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path={CHATS}
                                    element={
                                        <PrivateRoute>
                                            <Chats />
                                        </PrivateRoute>
                                    }
                                />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                            <ToastContainer style={{ width: '600px', maxWidth: '100%' }} />
                        </div>
                    </SnackbarProvider>
                </LoaderProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
