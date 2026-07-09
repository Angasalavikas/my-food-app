import { useContext, useRef, useState } from "react";
import { CartContext } from "../ContextApi/CartContext";
import { toast } from "react-toastify";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaTicketAlt,
  FaCreditCard,
  FaCheckCircle,
  FaTrash,
  FaPlus,
  FaMinus,
  FaUser,
  FaEnvelope,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Cart.css";
import { coupons } from "../data/Coupons";
import { QRCode } from "react-qr-code";
import { sendOrderEmail } from "../services/EmailService";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const couponRef = useRef<HTMLInputElement>(null);
  const [couponPercent, setCouponPercent] = useState(0);
  const [message, setMessage] = useState("");
  
  // Custom checkout UI states
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Address Form states
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isLocating, setIsLocating] = useState(false);

const placeOrder = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill all address details.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert("Order Placed Successfully!");

    //prepare the email information 
    // Map the template params & our Data.
   
  const order = {
      order_id: Math.floor(Math.random() * 100000),
      name: customerName,
      email: customerEmail, // Recipient email
	  
      orders: cart.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
        image_url: item.imageUrl,
      })),

      cost: {
        shipping: 100,
        tax: 100,
        coupon: discount,
        total: finalAmount,
      },
    };
    
    await sendOrderEmail(order);

    clearCart();
    navigate("/cart");
  };



  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    toast.info("Fetching your current location...");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              setCustomerAddress(data.display_name);
              toast.success("📍 Location updated successfully!");
              setIsLocating(false);
              return;
            }
          }
          setCustomerAddress(`Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`);
          toast.success("📍 GPS coordinates loaded!");
        } catch (error) {
          console.error(error);
          setCustomerAddress(`Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`);
          toast.success("📍 GPS coordinates loaded!");
        }
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        toast.error("Unable to retrieve location. Please type manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const applyCoupon = () => {
    const couponCode = couponRef.current?.value.trim() || "";

    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (coupon) {
      setCouponPercent(coupon.discount);
      setMessage(`🎉 Coupon Applied (${coupon.discount}% OFF)`);
      toast.success(`🎉 Coupon "${couponCode.toUpperCase()}" Applied (${coupon.discount}% OFF)!`);
    } else {
      setCouponPercent(0);
      setMessage("❌ Invalid Coupon Code ");
      toast.error("❌ Invalid Coupon Code!");
    }
  };

  const discount = (grandTotal * couponPercent) / 100;
  const finalAmount = grandTotal - discount;

  let navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckoutForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerAddress.trim() || !customerPhone.trim()) {
      toast.warn("⚠️ Please fill in all the details to complete your order.");
      return;
    }
    setShowCheckoutForm(false);
    setIsOrderPlaced(true);
    toast.success("🎉 Order Placed Successfully!");
  };

  const handleCloseModal = () => {
    setIsOrderPlaced(false);
    clearCart();
    navigate("/home");
  };

  if (cart.length === 0 && !isOrderPlaced && !showCheckoutForm) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-container">
          <div className="empty-cart-illustration">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11629/11629473.png"
              alt="Empty Cart"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/2038/2038854.png";
              }}
            />
          </div>
          <h1>Your Cart is Empty 😔</h1>
          <p>Add some fresh food and dairy items from the menu to start ordering.</p>
          <button onClick={() => navigate("/home")} className="browse-food-btn">
            SEE FOOD OPTIONS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-checkout-layout">
        {/* LEFT SIDE - Selected Items & Payment Method */}
        <div className="checkout-left-column">
          {/* Step 1: Selected Items list */}
          <div className="checkout-card items-list-card">
            <div className="card-header-icon">
              <span className="step-number">1</span>
            </div>
            <div className="card-body-content">
              <h3>Review Selected Items</h3>

              <div className="checkout-items-wrapper" style={{ marginTop: '16px' }}>
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item-card-row">
                    <div className="item-img-box">
                      <img
                        src={item.imageUrl || item.imageUrl}
                        alt={item.description || item.name}
                      />
                    </div>

                    <div className="item-details-box-row">
                      <div className="item-main-info">
                        <span className={`indicator-badge ${item.id < 200 ? "veg" : item.id < 300 ? "nonveg" : "dairy"}`}>
                          ●
                        </span>
                        <h2>{item.description || item.name}</h2>
                      </div>
                      <p className="item-price-desc">₹{item.price}</p>
                      <p className="item-qty-desc">Quantity : {item.quantity}</p>
                      <p className="item-total-desc">Total : ₹{item.price * item.quantity}</p>
                    </div>

                    <div className="item-actions-box-row">
                      <div className="qty-controls-row">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="qty-btn-row dec"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="qty-val-row">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="qty-btn-row inc"
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn-row"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Choose Payment Method */}
          <div className="checkout-card payment-card">
            <div className="card-header-icon">
              <span className="step-number">2</span>
            </div>
            <div className="card-body-content">
              <h3>Choose Payment Method</h3>
              
              <div className="payment-options-list">
                <label className={`payment-option-row ${paymentMethod === "upi" ? "selected" : ""}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <div className="payment-label-info">
                    <strong>UPI (Google Pay / PhonePe / Paytm)</strong>
                    <span>Instant pay from bank account using virtual ID</span>
                  </div>
                </label>
                {paymentMethod === "upi" && (
              <div className="qr-section">
                <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode
                  value={`upi://pay?pa=9100212550@ibl&pn=vikasMart&am=${finalAmount.toFixed(2)}&cu=INR`}
                />
                <p>UPI ID: 9100212550@ibl</p>
              </div>
            )}

                <label className={`payment-option-row ${paymentMethod === "card" ? "selected" : ""}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div className="payment-label-info">
                    <strong>Credit / Debit / ATM Card</strong>
                    <span>Visa, MasterCard, RuPay, Maestro supported</span>
                  </div>
                </label>

                <label className={`payment-option-row ${paymentMethod === "cod" ? "selected" : ""}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="payment-label-info">
                    <strong>Cash on Delivery (COD)</strong>
                    <span>Pay in cash or digital scan upon delivery</span>
                  </div>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-input-details">
                  <div className="card-input-row">
                    <input type="text" placeholder="Card Number" className="card-input-field" disabled value="•••• •••• •••• 4321" />
                    <input type="text" placeholder="MM/YY" className="card-input-field half" disabled value="12/29" />
                    <input type="password" placeholder="CVV" className="card-input-field half" disabled value="•••" />
                  </div>
                  <p className="card-input-note"><FaCreditCard /> Secured card details powered by RazorPay</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Order Summary Panel */}
        <div className="checkout-right-column">
          <div className="sticky-bill-container">
            <div className="bill-header">
              <div className="flex items-center gap-3">
                <FaShoppingCart className="text-3xl text-green-600" style={{ fontSize: '24px', marginRight: '6px' }} />
                <h2>Order Summary</h2>
              </div>
            </div>

            {/* Promo Voucher Area */}
            <div className="coupon-promo-box">
              <div className="coupon-title">
                <FaTicketAlt className="coupon-icon-tag" style={{ color: '#fc8019', marginRight: '6px' }} />
                <span>Apply Promo Coupon</span>
              </div>
              
              <div className="coupon-input-row">
                <input 
                  ref={couponRef}
                  type="text" 
                  placeholder="Enter Coupon (e.g. SAVE30)" 
                  defaultValue={couponPercent > 0 ? coupons.find(c => c.discount === couponPercent)?.code : ""}
                  disabled={couponPercent > 0}
                />
                {couponPercent > 0 ? (
                  <button className="remove-coupon-btn" onClick={() => {
                    setCouponPercent(0);
                    setMessage("");
                    if (couponRef.current) couponRef.current.value = "";
                  }}>REMOVE</button>
                ) : (
                  <button className="apply-coupon-btn" onClick={applyCoupon}>APPLY</button>
                )}
              </div>

              {message && (
                <p className={`coupon-feedback ${couponPercent > 0 ? "success" : "error"}`}>
                  {message}
                </p>
              )}

              <p className="coupon-helper">Try coupons like: <strong>SAVE10</strong>, <strong>SAVE20</strong>, <strong>SAVE30</strong>, or <strong>NEW50</strong></p>
            </div>

            {/* Calculations Breakdown */}
            <div className="bill-calculations">
              <div className="calc-row">
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" style={{ color: '#22c55e', marginRight: '6px' }} />
                  <span>Grand Total</span>
                </div>
                <span className="font-bold text-lg">₹{grandTotal.toFixed(2)}</span>
              </div>

              <div className="calc-row discount-row">
                <div className="flex items-center gap-2">
                  <FaTicketAlt className="text-orange-500" style={{ color: '#fc8019', marginRight: '6px' }} />
                  <span>Coupon Discount</span>
                </div>
                <span className="font-bold text-red-600">- ₹{discount.toFixed(2)}</span>
              </div>

              <hr className="calc-divider" />
              
              <div className="calc-row grand-total-row">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" style={{ color: '#2563eb', marginRight: '6px' }} />
                  <span className="font-bold">Payable Amount</span>
                </div>
                <span className="text-3xl font-bold text-green-700">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button 
              className="place-order-checkout-btn" 
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Address Form Modal Overlay */}
      {showCheckoutForm && (
        <div className="modal-overlay">
          <div className="address-form-modal-card">
            <div className="form-modal-header">
              <h2>Delivery Details</h2>
              <p>Please enter your contact and delivery address below to complete the checkout.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="checkout-address-form">
              <div className="form-input-group">
                <label><FaUser /> Name</label>
                <input 
                  type="text" 
                  placeholder="Enter full name" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-input-group">
                <label><FaEnvelope /> Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-input-group">
            <label>
           📞 Phone Number
          </label>

          <input
             type="tel"
             placeholder="Enter Mobile Number"
              value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
           required
           />
           </div>

           <div className="form-input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaMapMarkedAlt /> Delivery Address</span>
                  <button 
                    type="button" 
                    className="current-location-btn" 
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fc8019',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      transition: 'all 0.2s',
                    }}
                    title="Use Current Location"
                  >
                    <FaMapMarkerAlt /> {isLocating ? "Locating..." : "Use Current Location"}
                  </button>
                </label>
                <textarea 
                  placeholder="Flat No, Building, Street, Area, City & Pincode" 
                  rows={4}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-actions-row">
                <button 
                  type="button" 
                  className="form-cancel-btn"
                  onClick={() => setShowCheckoutForm(false)}
                >
                  Cancel
                </button>
                <button onClick={placeOrder} className="form-confirm-btn">
                  Confirm Order & Pay (₹{finalAmount.toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {/* Simulated Receipt Modal Overlay */}
      {isOrderPlaced && (
        <div className="modal-overlay">
          <div className="receipt-modal-card">
            <div className="success-icon-badge">
              <FaCheckCircle />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-tagline">FreshFood delivery partner is arriving soon.</p>
            
            <div className="simulated-receipt">
              <div className="receipt-header">
                <h3>RECEIPT BREAKDOWN</h3>
                <span className="receipt-id">BITE-7890-4321</span>
              </div>
              <hr />
              <div className="receipt-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="receipt-item">
                    <span>{item.description || item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="receipt-bill-row">
                <span>Subtotal:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="receipt-bill-row discount">
                  <span>Coupon Discount:</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <hr className="double-hr" />
              <div className="receipt-bill-row total">
                <span>Paid via {paymentMethod.toUpperCase()}:</span>
                <span>₹{finalAmount.toFixed(2)}</span>
              </div>
          
              <div className="receipt-footer">
                <p>Deliver to: <strong>{customerName}</strong> ({customerEmail})</p>
                <p className="est-address">Address: <strong>{customerAddress}</strong></p>
                <p className="est-delivery" style={{ marginTop: '4px' }}>Estimated Delivery Time: <strong>25 mins</strong></p>
              </div>
            </div>
            <button className="close-receipt-btn" onClick={handleCloseModal}>
              Done & Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;