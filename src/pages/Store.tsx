import { StoreItem } from "../components";
import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
function Store() {
  return (
    <>
      <h2>Store</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
