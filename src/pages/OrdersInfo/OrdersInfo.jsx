import { Box, Button, LinearProgress, Pagination, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { ADD_ORDERS_ROUTE } from '../../routes'
import { DataGrid } from '@mui/x-data-grid'
import { useOrders } from './hooks/useOrders'
import { QueryField, QueryMultiSelect, QueryReset, QuerySelect } from '../../components/queryInputs'
import { orderTypeOptions } from '../WorkersInfo/AddEditOrders'
import { StatesOptions } from '../../constant/state'
import { CityOptions } from '../../constant/city'
const orderStatusOptions = [
    {
        label: 'Select Order Status',
        value: 'none',
    },
    {
        label: 'Pending',
        value: 'PENDING',
    },
    {
        label: 'Approved',
        value: 'APPROVED',
    },
    {
        label: 'Archived',
        value: 'ARCHIVED',
    },
]
export const Orders = () => {
    const [sp, setSp] = useSearchParams()
    const { getOrders, hasMore, isLoading, orders } = useOrders()
    const columns = [
        {
            field: 'orderId',
            headerName: 'ID',
            width: 250,
            renderCell: (params) => (
                <Link to={`/orders/edit/${params?.id}`}>
                    <Typography color="primary.main" sx={{ textDecoration: 'underline' }}>
                        {params?.row.orderId || 'N/A'}
                    </Typography>
                </Link>
            ),
        },
        {
            field: 'parentCustomerId',
            headerName: 'userId',
            width: 250,
            renderCell: (params) => (
                <Link to={`/customers/${params?.row?.parentCustomerId}`}>
                    <Typography color="primary.main" sx={{ textDecoration: 'underline' }}>
                        {params?.row.parentCustomerId || 'N/A'}
                    </Typography>
                </Link>
            ),
        },
        {
            field: 'orderType',
            headerName: 'Order Type',
            width: 250,
            editable: true,
        },
        {
            field: 'startDateLabel',
            headerName: 'Start Date Label',
            width: 250,
        },
        {
            field: 'city',
            headerName: 'city',
            width: 150,
            editable: true,
        },
        {
            field: 'state',
            headerName: 'State',
            sortable: true,
            width: 150,
        },
        {
            field: 'isActive',
            headerName: 'Active',
            width: 250,
        },
        {
            field: 'orderValue',
            headerName: 'Order Value',
            width: 250,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    &#8377; {params.row.orderValue}
                </Stack>
            ),
        },

        // {
        //     field: 'addBooking',
        //     headerName: 'AddBooking',
        //     renderCell: (params) => (
        //         <Stack direction="row" spacing={1}>
        //             <Button variant="outlined">Create Booking</Button>
        //         </Stack>
        //     ),
        //     width: 400,
        // },
    ]
    return (
        <DashboardLayout>
            <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                <Typography variant="h4" fontWeight={600} align="center">
                    Manage Orders
                </Typography>
                <Link to={ADD_ORDERS_ROUTE}>
                    <Button
                        sx={{
                            mb: 2,
                            height: 48,
                        }}
                        variant="contained"
                    >
                        Add Order
                    </Button>
                </Link>
            </Stack>
            <Paper variant="outlined">
                <Stack p={2} direction="row" spacing={2} alignItems={'stretch'}>
                    <QueryField label={'Customer Id'} trim name={'customerId'} />

                    <QueryMultiSelect sx={{ width: 200 }} name="orderStatus" options={orderStatusOptions} />
                    <QueryMultiSelect
                        sx={{ width: 200 }}
                        name="orderType"
                        options={[{ label: 'Select order type', value: 'none' }, ...orderTypeOptions]}
                    />
                    <QuerySelect
                        multiple={false}
                        sx={{ width: 200 }}
                        name="isCreatedByUser"
                        options={[
                            {
                                label: 'Select User Type',
                                value: 'none',
                            },
                            {
                                label: 'user',
                                value: true,
                            },
                            {
                                label: 'Admin',
                                value: false,
                            },
                        ]}
                    />
                    <QuerySelect
                        sx={{ width: 200 }}
                        name="state"
                        options={[{ label: 'Select state', value: 'none' }, ...StatesOptions]}
                    />
                    <QuerySelect
                        disabled={sp.get('state') === 'none'}
                        sx={{ width: 200 }}
                        name="city"
                        options={[{ label: 'Select city', value: 'none' }, ...CityOptions[sp.get('state') ?? 'none']]}
                    />

                    <QueryReset> Clear Filters</QueryReset>
                </Stack>
            </Paper>
            <Paper sx={{ mt: 2, height: '74vh', width: '100%', p: 2 }}>
                <DataGrid
                    disableColumnFilter
                    disableSelectionOnClick
                    disableColumnSelector
                    columns={columns}
                    rows={orders}
                    pageSize={100}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.orderId}
                    rowCount={1000}
                    paginationMode="server"
                    loading={isLoading}
                    components={{
                        LoadingOverlay: LinearProgress,

                        Pagination: () => (
                            <>
                                <Stack direction="row" alignItems="center">
                                    Orders: {0}
                                    <Pagination
                                        page={sp.get('pageNumber') ? Number(sp.get('pageNumber')) : 1}
                                        hideNextButton={!hasMore}
                                        count={hasMore ? 35 : Number(sp.get('pageNumber'))}
                                        siblingCount={0}
                                        disabled={isLoading}
                                        boundaryCount={0}
                                        showFirstButton={false}
                                        showLastButton={false}
                                        color="primary"
                                        onChange={(e, page) => {
                                            sp.set('pageNumber', page)
                                            setSp(sp)
                                            document.querySelector('.MuiDataGrid-virtualScroller').scrollTop = 0
                                        }}
                                    />
                                </Stack>
                            </>
                        ),
                    }}
                />
            </Paper>
        </DashboardLayout>
    )
}

const columns = []
