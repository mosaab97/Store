import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/modules/basket";
import server from "../../app/server/server";

interface BasketState {
    basket: Basket| null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await server.Basket.addItem(productId, quantity)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity?: number}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            await server.Basket.removeItem(productId, quantity)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAdd' + action.meta.arg.productId
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload
            state.status = 'idle'
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemove' + action.meta.arg.productId
            if(action.meta.arg.quantity) state.status = state.status + action.meta.arg.quantity
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity = 1 } = action.meta.arg;
            const itemIdx = state.basket?.items.findIndex(i => i.productId === productId)
            if(itemIdx === -1 || itemIdx === undefined) return;
            state.basket!.items[itemIdx].quantity -= quantity!; 
            if (state.basket?.items[itemIdx].quantity === 0) {
                console.log("first")
                state.basket.items.splice(itemIdx, 1)
                console.log(state.basket.items)
            }
            state.status = 'idle'
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle'
        });
    }) 
})

export const {setBasket} = basketSlice.actions;