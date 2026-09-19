import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchAllOrders = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated!');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'All') return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
      case 'Out for delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Packing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📦 Customer Orders
            <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
              {orders.length} Total
            </span>
          </h1>
          <p className="text-xs text-gray-500">
            Manage incoming book orders, delivery addresses, and payment tracking.
          </p>
        </div>

        {/* Filter & Refresh */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            onClick={fetchAllOrders}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-gray-600">Loading orders data...</p>
        </div>
      )}

      {/* Empty State when 0 Orders */}
      {!isLoading && orders.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm space-y-4 max-w-lg mx-auto my-6">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl mx-auto text-indigo-500 shadow-inner">
            📭
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
              When customers place book or stationary orders from the website, they will appear here in real-time with full shipping and payment details.
            </p>
          </div>
          <button
            onClick={fetchAllOrders}
            className="px-5 py-2 text-xs font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-all shadow"
          >
            Check Again
          </button>
        </div>
      )}

      {/* Empty State when Filter has 0 Results */}
      {!isLoading && orders.length > 0 && filteredOrders.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm">
          No orders found matching status "{statusFilter}".
        </div>
      )}

      {/* Orders List */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 sm:grid-cols-[60px_2.5fr_1.5fr] lg:grid-cols-[60px_2.5fr_1.5fr_1fr_180px] gap-4 items-start text-xs sm:text-sm text-gray-700"
            >
              {/* Parcel Icon */}
              <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <img className="w-8 h-8 object-contain" src={assets.parcel_icon} alt="Parcel" />
              </div>

              {/* Items & Shipping Address */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-gray-400">Order ID: {order._id}</span>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="font-medium text-gray-800 leading-snug">
                      • {item.name} <span className="font-bold">x {item.quantity}</span>{' '}
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-600 font-mono">
                        {item.size}
                      </span>
                    </p>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 space-y-0.5">
                  <p className="font-semibold text-gray-900">
                    👤 {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-500">
                    📍 {order.address.street}, {order.address.city}, {order.address.state},{' '}
                    {order.address.country} - {order.address.zipcode}
                  </p>
                  <p className="text-indigo-600 font-medium">📞 {order.address.phone}</p>
                </div>
              </div>

              {/* Summary & Date */}
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-gray-500">Total Items:</span>{' '}
                  <span className="font-semibold text-gray-800">{order.items.length}</span>
                </p>
                <p>
                  <span className="text-gray-500">Payment:</span>{' '}
                  <span
                    className={`font-semibold px-1.5 py-0.5 rounded text-[11px] ${
                      order.payment ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {order.paymentMethod} • {order.payment ? 'Paid ✓' : 'Pending'}
                  </span>
                </p>
                <p className="text-gray-500">
                  Date: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Total Price */}
              <div className="text-left lg:text-center">
                <span className="text-xs text-gray-500 block lg:inline">Total Amount</span>
                <p className="text-base font-bold text-gray-900 mt-0.5">
                  {currency}{order.amount}
                </p>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-500 block uppercase">
                  Order Status
                </label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full p-2 text-xs font-bold rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer ${getStatusBadge(
                    order.status
                  )}`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;