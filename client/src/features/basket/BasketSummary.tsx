import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { BasketItem } from "../../app/modules/basket";
import { currencyFormat } from "../../app/util/util";

interface Props {
    items: BasketItem[]
}
export default function BasketSummary({ items } : Props) {
    const subtotal = items.reduce((sum: number, item: BasketItem) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 10000 ? 0 : 1000;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}