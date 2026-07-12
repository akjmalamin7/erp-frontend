import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetAllBrandsQuery,
  useCreateBrandMutation,
} from "@/services/inventoryApi";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/Loader";
import { EmptyState } from "@/components/States";
import Modal from "@/components/Modal";

function SimpleEntityPanel({
  title,
  items,
  isLoading,
  onCreate,
  creating,
}: {
  title: string;
  items: { _id: string; name: string; description?: string }[];
  isLoading: boolean;
  onCreate: (name: string, description: string) => Promise<void>;
  creating: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onCreate(name, description);
    setName("");
    setDescription("");
    setOpen(false);
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label">Description (optional)</label>
            <textarea
              className="input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-outline" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" disabled={creating} className="btn-accent">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function CategoriesBrandsPage() {
  const { data: categoriesData, isLoading: loadingCategories } = useGetAllCategoriesQuery();
  const { data: brandsData, isLoading: loadingBrands } = useGetAllBrandsQuery();
  const [createCategory, { isLoading: creatingCategory }] = useCreateCategoryMutation();
  const [createBrand, { isLoading: creatingBrand }] = useCreateBrandMutation();

  return (
    <div>
      <PageHeader title="Categories & Brands" description="Keep your catalogue organized and easy to filter." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SimpleEntityPanel
          title="Categories"
          items={categoriesData?.data ?? []}
          isLoading={loadingCategories}
          creating={creatingCategory}
          onCreate={async (name, description) => {
            try {
              await createCategory({ name, description: description || undefined }).unwrap();
              toast.success("Category added");
            } catch {
              toast.error("Couldn't add category");
            }
          }}
        />
        <SimpleEntityPanel
          title="Brands"
          items={brandsData?.data ?? []}
          isLoading={loadingBrands}
          creating={creatingBrand}
          onCreate={async (name, description) => {
            try {
              await createBrand({ name, description: description || undefined }).unwrap();
              toast.success("Brand added");
            } catch {
              toast.error("Couldn't add brand");
            }
          }}
        />
      </div>
    </div>
  );
}
