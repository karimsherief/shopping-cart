import { Offcanvas, Stack } from "react-bootstrap";
import CartItem from "./CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../util/formatCurrency";
import storeItems from "../data/items.json";
function Cart({ isOpen }: { isOpen: boolean }) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas placement="end" show={isOpen} onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;
