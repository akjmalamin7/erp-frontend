import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/entities/category";
import { useGetAllBrandsQuery } from "@/entities/brand";
import { PageHeader, Loader, EmptyState, Modal } from "@/shared/ui";
import CategoryForm from "@/features/category-create/ui/CategoryForm";
import BrandForm from "@/features/brand-create/ui/BrandForm";

function SimpleEntityPanel({
  title,
  items,
  isLoading,
  renderForm,
}: {
  title: string;
  items: { _id: string; name: string; description?: string }[];
  isLoading: boolean;
  renderForm: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink-900">{title}</h3>
        <button className="btn-outline !px-3 !py-1.5 text-xs" onClick={() => setOpen(true)}>
          <Plus size={14} /> Add
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : items.length === 0 ? (
        <EmptyState title={`No ${title.toLowerCase()} yet`} />
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-ink-900">{item.name}</p>
                {item.description && <p className="text-xs text-slate-500">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={`New ${title.slice(0, -1)}`}>
        {renderForm(() => setOpen(false))}
      </Modal>
    </div>
  );
}

export default function CategoriesBrandsPage() {
  const { data: categoriesData, isLoading: loadingCategories } = useGetAllCategoriesQuery();
  const { data: brandsData, isLoading: loadingBrands } = useGetAllBrandsQuery();

  return (
    <div>
      <PageHeader title="Categories & Brands" description="Keep your catalogue organized and easy to filter." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SimpleEntityPanel
          title="Categories"
          items={categoriesData?.data ?? []}
          isLoading={loadingCategories}
          renderForm={(close) => <CategoryForm onDone={close} onCancel={close} />}
        />
        <SimpleEntityPanel
          title="Brands"
          items={brandsData?.data ?? []}
          isLoading={loadingBrands}
          renderForm={(close) => <BrandForm onDone={close} onCancel={close} />}
        />
      </div>
    </div>
  );
}
