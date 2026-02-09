// client/src/app/store.ts

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import patientReducer from '../features/patients/patientSlice'
import doctorReducer from '../features/doctors/doctorSlice'
import appointmentReducer from '../features/appointments/appointmentSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        patients: patientReducer,
        doctors: doctorReducer,
        appointments: appointmentReducer,
        dashboard: dashboardReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch