import { useState } from "react";
import { Search } from "lucide-react";
import { useGetInvoiceQuery } from "@/entities/order";
import type { OrderItem } from "@/entities/order";
import type { Customer } from "@/entities/customer";
import type { Product } from "@/entities/product";
import { PageHeader, Loader, EmptyState, ErrorState } from "@/shared/ui";

export default function InvoicesPage() {
  const [orderId, setOrderId] = useState("");
  const [searchId, setSearchId] = useState("");
  const { data, isLoading, isError, isFetching } = useGetInvoiceQuery(searchId, {
    skip: !searchId,
  });

  const order = data?.data;

  return (
    <div>
      <PageHeader title="Invoices" description="Look up an order's invoice by its order ID." />

      <div className="mb-6 flex max-w-md gap-2">
        <input
          className="input"
          placeholder="Paste order ID…"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button className="btn-primary shrink-0" onClick={() => setSearchId(orderId.trim())}>
          <Search size={16} /> Find
        </button>
      </div>

      {!searchId && (
        <EmptyState title="Search for an order" description="Enter an order ID above to view its invoice." />
      )}

      {searchId && (isLoading || isFetching) && <Loader />}
      {searchId && isError && <ErrorState message="No invoice found for that order ID." />}

      {order && (
        <div className="card max-w-2xl p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Invoice</p>
              <p className="font-mono text-sm text-ink-900">{order.order_number ?? order._id}</p>
            </div>
            <span className={`badge ${order.payment_status === "paid" ? "bg-sea-500/10 text-sea-600" : "bg-brass-100 text-brass-700"}`}>
              {order.payment_status}
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Billed to{" "}
            <span className="font-medium text-ink-900">
              {typeof order.customer === "object" && order.customer ? (order.customer as Customer).name : "Walk-in customer"}
            </span>
          </p>

          <table className="table-shell mt-4">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item: OrderItem, idx: number) => {
                const productName = typeof item.product === "object" ? (item.product as Product).name : item.product;
                return (
                  <tr key={idx}>
                    <td>{productName}</td>
                    <td>{item.quantity}</td>
                    <td className="font-mono">৳ {item.price?.toLocaleString()}</td>
                    <td className="font-mono">৳ {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <div className="w-56 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Total</span>
                <span className="font-mono font-semibold">৳ {order.total_amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paid</span>
                <span className="font-mono font-semibold">৳ {order.paid_amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-1.5">
                <span className="text-slate-500">Due</span>
                <span className="font-mono font-semibold">
                  ৳ {(order.total_amount - order.paid_amount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
