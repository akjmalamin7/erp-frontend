import { useState } from "react";
import { Ban, Wallet2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useGetAllOrdersQuery, useCancelOrderMutation, useReceiveOrderPaymentMutation } from "@/services/ordersApi";
import type { Order, Customer } from "@/types";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/Loader";
import { EmptyState, ErrorState } from "@/components/States";
import Modal from "@/components/Modal";

const statusBadge: Record<Order["status"], string> = {
  pending: "bg-brass-100 text-brass-700",
  completed: "bg-sea-500/10 text-sea-600",
  canceled: "bg-red-100 text-red-700",
};

const paymentBadge: Record<Order["payment_status"], string> = {
  paid: "bg-sea-500/10 text-sea-600",
  partial: "bg-brass-100 text-brass-700",
  unpaid: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();
  const [receivePayment, { isLoading: paying }] = useReceiveOrderPaymentMutation();
  const [payFor, setPayFor] = useState<Order | null>(null);
  const [amount, setAmount] = useState("");

  const orders = data?.data ?? [];

  const handleCancel = async (id: string) => {
    try {
      await cancelOrder(id).unwrap();
      toast.success("Order canceled");
    } catch {
      toast.error("Couldn't cancel order");
    }
  };

  const handlePayment = async () => {
    if (!payFor) return;
    try {
      await receivePayment({ order_id: payFor._id, amount: Number(amount) }).unwrap();
      toast.success("Payment recorded");
      setPayFor(null);
      setAmount("");
    } catch {
      toast.error("Couldn't record payment");
    }
  };

  return (
    <div>
      <PageHeader title="Orders" description="All sales orders, their payment and fulfilment status." />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : orders.length === 0 ? (
        <EmptyState title="No orders yet" description="Orders created from your POS or storefront will show up here." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Payment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const customerName =
                  typeof o.customer === "object" && o.customer
                    ? (o.customer as Customer).name
                    : "Walk-in";
                return (
                  <tr key={o._id}>
                    <td className="font-mono text-xs text-slate-500">{o.order_number ?? o._id.slice(-8)}</td>
                    <td className="font-medium text-ink-900">{customerName}</td>
                    <td className="font-mono">৳ {o.total_amount?.toLocaleString()}</td>
                    <td className="font-mono">৳ {o.paid_amount?.toLocaleString()}</td>
                    <td><span className={`badge ${statusBadge[o.status]}`}>{o.status}</span></td>
                    <td><span className={`badge ${paymentBadge[o.payment_status]}`}>{o.payment_status}</span></td>
                    <td>
                      <div className="flex justify-end gap-1">
                        {o.payment_status !== "paid" && o.status !== "canceled" && (
                          <button
                            className="btn-ghost !px-2 !py-1.5"
                            title="Receive payment"
                            onClick={() => setPayFor(o)}
                          >
                            <Wallet2 size={14} />
                          </button>
                        )}
                        {o.status === "pending" && (
                          <button
                            className="btn-ghost !px-2 !py-1.5 text-red-600"
                            title="Cancel order"
                            onClick={() => handleCancel(o._id)}
                          >
                            <Ban size={14} />
                          </button>
                        )}
                        <button className="btn-ghost !px-2 !py-1.5" title="View invoice">
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!payFor} onClose={() => setPayFor(null)} title="Receive payment">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Order total <strong className="font-mono">৳ {payFor?.total_amount?.toLocaleString()}</strong>, already
            paid <strong className="font-mono">৳ {payFor?.paid_amount?.toLocaleString()}</strong>.
          </p>
          <div>
            <label className="label">Amount received</label>
            <input
              type="number"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button className="btn-outline" onClick={() => setPayFor(null)}>Cancel</button>
            <button className="btn-accent" disabled={paying} onClick={handlePayment}>Record payment</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
