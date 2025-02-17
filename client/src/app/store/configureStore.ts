import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../../features/contact/CounterSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { basketSlice } from '../../features/basket/basketSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';

// export const configureStore = () => {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () =>  useDispatch<AppDispatch>()
export const useAppSelector:  TypedUseSelectorHook<RootState> = useSelector;