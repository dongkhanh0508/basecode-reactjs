// material
import { Skeleton, Grid } from '@mui/material';
import ShopProductCard from './ShopProductCard';
import ShopProductCardAdd from './ShopProductCardAdd';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(12)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

type ShopProductListProps = {
  products: any[];
  isLoad: boolean;
  onSelectProduct?: (template: any) => void;
  onViewProduct?: (template: any) => void;
  onAddProduct?: () => void;
  isShowAdd: boolean;
};

export default function ShopProductList({
  products,
  isLoad,
  onSelectProduct,
  onViewProduct,
  onAddProduct,
  isShowAdd,
}: ShopProductListProps) {
  return (
    <Grid container spacing={2}>
      {isShowAdd && (
        <Grid key={'add'} item xs={6} sm={4} md={3}>
          <ShopProductCardAdd
            onSelect={() => {
              if (onAddProduct) onAddProduct();
            }}
          />
        </Grid>
      )}
      {products.map((product) => (
        <Grid key={product.id} item xs={6} sm={4} md={3}>
          <ShopProductCard
            product={product}
            onSelect={() => {
              if (onSelectProduct) onSelectProduct(product);
            }}
            onView={() => {
              if (onViewProduct) onViewProduct(product);
            }}
          />
        </Grid>
      ))}
      {isLoad && SkeletonLoad}
    </Grid>
  );
}
