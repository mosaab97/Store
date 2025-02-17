import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/modules/product";
import server from "../../app/server/server";
import { RootState } from "../../app/store/configureStore";

const productAdaptar = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await server.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await server.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdaptar.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdaptar.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingProduct'
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productAdaptar.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const productSelectores = productAdaptar.getSelectors((state: RootState) => state.catalog)