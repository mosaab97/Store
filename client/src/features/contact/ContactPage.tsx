import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./CounterSlice";

function ContactPage() {
    const {data} = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch();
  return (
    <div>
        {data}
        <Button onClick={() => dispatch(increment(1))}>
            +
        </Button>
        <Button onClick={() => dispatch(decrement(1))}>
            -
        </Button>
    
    </div>
  )
}

export default ContactPage