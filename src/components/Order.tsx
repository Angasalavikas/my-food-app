import { useContext, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaShoppingBag,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaChevronDown,
  FaChevronUp,
  FaBoxOpen,
} from "react-icons/fa";

import { OrderContext } from "../ContextApi/OrderContext";
import "../Orders.css";

function Orders() {
  const { orders } = useContext(OrderContext);

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleOrder = (orderNumber: number) => {
    setExpandedOrder((prev) =>
      prev === orderNumber ? null : orderNumber
    );
  };

  if (orders.length === 0) {
    return (
      <div className="orders-empty-page">
        <FaBoxOpen className="empty-icon" />
        <h1>No Orders Yet</h1>
        <p>Your placed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-header">

        <h1>
          📦 My Orders
        </h1>

        <p>
          Track your previous food orders
        </p>

      </div>

      <div className="orders-container">

        {orders.map((order) => (

          <div
            key={order.orderNumber}
            className="order-card"
          >

            {/* Header */}

            <div
              className="order-card-header"
              onClick={() => toggleOrder(order.orderNumber)}
            >

              <div>

                <h2>
                  Order #{order.orderNumber}
                </h2>

                <div className="order-date">

                  <FaCalendarAlt />

                  <span>
                    {order.orderDate}
                  </span>

                </div>

              </div>

              <div className="header-right">

                <div className="status-badge">

                  <FaCheckCircle />

                  <span>
                    {order.status}
                  </span>

                </div>

                <div className="expand-icon">

                  {expandedOrder === order.orderNumber ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}

                </div>

              </div>

            </div>

            {expandedOrder === order.orderNumber && (

              <div className="order-content">

                {/* Left Side */}

                <div className="products-section">

                  <h3>

                    <FaShoppingBag />

                    Ordered Items

                  </h3>

                  <div className="products-list">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="product-card"
                      >

                        <img
                          src={item.imageUrl}
                          alt={item.description}
                        />

                        <div className="product-details">

                          <h4>
                            {item.description}
                          </h4>

                          <p>
                            Quantity : {item.quantity}
                          </p>

                        </div>

                        <div className="product-price">

                          ₹{item.price}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Right Side */}

                <div className="details-section">

                  <h3>
                    Order Details
                  </h3>

                  <div className="details-card">

                    <div className="detail-row">

                      <FaUser />

                      <span>{order.Name}</span>

                    </div>

                    <div className="detail-row">

                      <FaPhone />

                      <span>{order.mobile}</span>

                    </div>

                    <div className="detail-row address">

                      <FaMapMarkerAlt />

                      <span>{order.address}</span>

                    </div>

                    <div className="detail-row">

                      <FaCreditCard />

                      <span>{order.paymentMode}</span>

                    </div>

                    <hr />

                    <div className="price-summary">

                      <div className="price-row">

                        <span>Grand Total</span>

                        <span>
                          ₹{order.grandTotal}
                        </span>

                      </div>

                      <div className="price-row discount">

                        <span>Discount</span>

                        <span>
                          - ₹{order.discount}
                        </span>

                      </div>
                                            <div className="price-row final-price">

                        <span>

                          <FaMoneyBillWave />

                          Payable

                        </span>

                        <span>

                          ₹{order.finalAmount}

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );
}

export default Orders;