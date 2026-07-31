import { Category, useGetAllCategoriesQuery } from "@/entities/category";
import CategoryForm from "@/features/category-create/ui/CategoryForm";
import { EmptyState, ErrorState, Loader, PageHeader } from "@/shared/ui";
import { Container } from "@/shared/ui/container";
import Table, { Column } from "@/shared/ui/table";
import { useState } from "react";

const CategoriesPage = () => {
  const [query, setQuery] = useState("");
  const {
    data: categoriesData,
    isLoading: loadingCategories,
    isError,
  } = useGetAllCategoriesQuery();

  const categories = (categoriesData?.data ?? []).filter((c: Category) =>
    `${c.name} ${c.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const columns: Column<Category>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-medium text-ink-900",
    },
    {
      header: "Description",
      accessor: "description",
      className: "font-mono text-slate-600",
    },
  ];

  return (
    <Container size="full">
      <PageHeader
        title="Categories"
        description="Keep your catalogue organized and easy to filter."
        actions={<CategoryForm />}
      />
      {loadingCategories ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : categoriesData?.data.length === 0 ? (
        <EmptyState
          title="No customers found"
          description="Add your first customer to start recording sales against them."
        />
      ) : (
        <Table columns={columns} data={categories} />
      )}
    </Container>
  );
};
export default CategoriesPage;
