// material
import { Skeleton, Grid, GridSize } from '@mui/material';
import { GridItemObj } from 'models';
import GridProductItem from './GridProductItem';
import GridProductItemContent from './GridProductItemContent';
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

type GridListProps = {
  products: GridItemObj[];
  isLoad: boolean;
  onSelectProduct?: (id: number | string) => void;
  onViewProduct?: (id: number | string) => void;
  onAddProduct?: () => void;
  xs: number;
  lg: number;
  md: number;
  sm: number;
  isShowAdd: boolean;
  defaultImage?: string;
  isCardContent: boolean;
};

export default function GridList({
  products,
  isLoad,
  onSelectProduct,
  onViewProduct,
  onAddProduct,
  isShowAdd,
  lg,
  md,
  xs,
  sm,
  defaultImage,
  isCardContent,
}: GridListProps) {
  return (
    <Grid container spacing={2}>
      {isShowAdd && (
        <Grid
          key={'add'}
          item
          xs={xs as GridSize}
          sm={sm as GridSize}
          md={md as GridSize}
          lg={lg as GridSize}
        >
          <ShopProductCardAdd
            onSelect={() => {
              if (onAddProduct) onAddProduct();
            }}
          />
        </Grid>
      )}
      {products.map((product) => (
        <Grid
          key={product.id}
          item
          xs={xs as GridSize}
          sm={sm as GridSize}
          md={md as GridSize}
          lg={lg as GridSize}
        >
          {isCardContent ? (
            <GridProductItemContent
              product={product}
              onSelect={() => {
                if (onSelectProduct) onSelectProduct(product.id);
              }}
              onView={() => {
                if (onViewProduct) onViewProduct(product.id);
              }}
              defaultImage={defaultImage}
            />
          ) : (
            <GridProductItem
              product={product}
              onSelect={() => {
                if (onSelectProduct) onSelectProduct(product.id);
              }}
              onView={() => {
                if (onViewProduct) onViewProduct(product.id);
              }}
              defaultImage={defaultImage}
            />
          )}
        </Grid>
      ))}
      {isLoad && SkeletonLoad}
    </Grid>
  );
}
