/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../modules/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {
    const context = useContext(StoreContext);

    if(context === undefined) {
        throw Error("out side the provider");
    }

    return context;
}

export const StoreProvider = ({children}: PropsWithChildren<unknown>) => {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if(!basket) return;
        const items = [...basket.items];
        const itemIdx = items.findIndex(i => i.productId === productId);

        if(itemIdx >= 0) {
            items[itemIdx].quantity -= quantity;

            if(items[itemIdx].quantity <= 0) items.splice(itemIdx, 1);
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return <StoreContext.Provider value={{basket, setBasket, removeItem}}>
        {children}
    </StoreContext.Provider>
}