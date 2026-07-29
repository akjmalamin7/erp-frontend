import { useGetAllBrandsQuery } from "@/entities/brand";
import { PageHeader } from "@/shared/ui";

const Brands = () => {
  const { data: brandsData, isLoading: loadingBrands } = useGetAllBrandsQuery();
  return (
    <div>
      <PageHeader
        title="Brands"
        description="Keep your catalogue organized and easy to filter."
      />
    </div>
  );
};

export default Brands;
