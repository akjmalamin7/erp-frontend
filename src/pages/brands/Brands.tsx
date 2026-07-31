import { useGetAllBrandsQuery } from "@/entities/brand";
import { Category } from "@/entities/category";
import { BrandForm } from "@/features/brand-create";
import { EmptyState, ErrorState, Loader, PageHeader } from "@/shared/ui";
import { Container } from "@/shared/ui/container";
import Table, { Column } from "@/shared/ui/table";
import { useState } from "react";

const BrandsPage = () => {
  const [query, setQuery] = useState("");
  const {
    data: brandData,
    isLoading: loadingBrands,
    isError,
  } = useGetAllBrandsQuery();

  const brands = (brandData?.data ?? []).filter((c: Category) =>
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
        title="Brands"
        description="Keep your catalogue organized and easy to filter."
        actions={<BrandForm />}
      />
      {loadingBrands ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : brandData?.data.length === 0 ? (
        <EmptyState
          title="No brands found"
          description="Add your first customer to start recording sales against them."
        />
      ) : (
        <Table columns={columns} data={brands} />
      )}
    </Container>
  );
};
export default BrandsPage;
