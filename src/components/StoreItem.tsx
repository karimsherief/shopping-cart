import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../util/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}
function StoreItem({ id, name, price, imgUrl }: Props) {
  const { addToCart, getItemQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {getItemQuantity(id) ? (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  variant="danger"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>
                <span className="fs-3">{getItemQuantity(id)}</span>
                <Button onClick={() => addToCart(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button className="w-100" onClick={() => addToCart(id)}>
              Add to cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
