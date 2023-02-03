// Redux
import { resetAuthStates } from "@src/slices/authSlice"
import { resetUserStates } from "@src/slices/userSlice"
import { resetServiceStates } from "@src/slices/serviceSlice"
import { resetPartyStates } from "@src/slices/partySlice"
import { AppDispatch } from "@src/store/store"

export const useResetAuthStates = (dispatch: AppDispatch) => {
    return (): void => {
        setTimeout(() => {
            dispatch(resetAuthStates())
        }, 3000)
    }
}

export const useResetUserStates = (dispatch: AppDispatch) => {
    return (): void => {
        setTimeout(() => {
            dispatch(resetUserStates())
        }, 3000)
    }
}

export const useResetServiceStates = (dispatch: AppDispatch) => {
    return (): void => {
        setTimeout(() => {
            dispatch(resetServiceStates())
        }, 3000)
    }
}

export const useResetPartyStates = (dispatch: AppDispatch) => {
    return (): void => {
        setTimeout(() => {
            dispatch(resetPartyStates())
        }, 3000)
    }
}
