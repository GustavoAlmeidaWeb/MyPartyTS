// Redux
import { resetAuthStates } from "@src/slices/authSlice"
import { resetUserStates } from "@src/slices/userSlice"
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
