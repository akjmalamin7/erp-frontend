import {
  useGetLowStockQuery,
  useUpdateLowStockMutation,
} from "@/entities/low-stock";
import type { Product } from "@/entities/product";
import { EmptyState, ErrorState, Loader, PageHeader } from "@/shared/ui";
import { CheckCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function LowStockPage() {
  const { data, isLoading, isError } = useGetLowStockQuery();
  const [markRead] = useUpdateLowStockMutation();

  const alerts = data?.data ?? [];

  return (
    <div>
      <PageHeader
        title="Low stock alerts"
        description="Products that have dropped below their reorder threshold."
      />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : alerts.length === 0 ? (
        <EmptyState
          title="All stocked up"
          description="No products are currently below their threshold."
        />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>Product</th>
                <th>Current qty</th>
                <th>Threshold</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => {
                const productName =
                  typeof a.product === "object"
                    ? (a.product as Product).name
                    : a.product;
                return (
                  <tr key={a._id}>
                    <td className="font-medium text-ink-900">{productName}</td>
                    <td className="font-mono text-red-600">
                      {a.current_quantity}
                    </td>
                    <td className="font-mono text-slate-500">{a.threshold}</td>
                    <td>
                      <span
                        className={`badge ${a.is_read ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-700"}`}
                      >
                        {a.is_read ? "Acknowledged" : "New"}
                      </span>
                    </td>
                    <td className="text-right">
                      {!a.is_read && (
                        <button
                          className="btn-ghost px-2! py-1.5!"
                          title="Mark as acknowledged"
                          onClick={async () => {
                            try {
                              await markRead({
                                id: a._id,
                                is_read: true,
                              }).unwrap();
                              toast.success("Marked as acknowledged");
                            } catch {
                              toast.error("Couldn't update alert");
                            }
                          }}
                        >
                          <CheckCheck size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
