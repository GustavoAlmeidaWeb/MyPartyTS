// Redux
import { resetAuthStates } from "@src/slices/authSlice"
import { AppDispatch } from "@src/store/store"

export const useResetAuthStates = (dispatch: AppDispatch) => {
    return (): void => {
        setTimeout(() => {
            dispatch(resetAuthStates())
        }, 3000)
    }
}
