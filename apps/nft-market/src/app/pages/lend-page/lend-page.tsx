import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetListingsQuery } from "../../api/backend-api";
import LenderAssetFilter from "../../components/asset-filter/lender-asset-filter/lender-asset-filter";
import AssetList from "../../components/asset-list/asset-list";
import { RootState } from "../../store";
import { Asset, Listing, ListingStatus } from "../../types/backend-types";
import style from "./lend-page.module.scss";

export const LendPage = (): JSX.Element => {
  console.log("render LendPage");
  const [assets, setAssets] = useState<Asset[]>([]);
  const { authSignature } = useSelector((state: RootState) => state.backend);
  const { data: listings, isLoading } = useGetListingsQuery(
    { skip: 0, take: 50, status: ListingStatus.Listed },
    { skip: !authSignature }
  );

  useEffect(() => {
    if (!listings) {
      return;
    }
    setAssets(
      listings.map((listing: Listing): Asset => {
        console.log(listing.asset);
        return listing.asset;
      })
    );
  }, [listings]);

  return (
    <Container className={style["borrowPageContainer"]} maxWidth={`xl`}>
      <h1>Explore loan requests</h1>
      <Box sx={{ mt: "2em" }}>
        <Grid container maxWidth="xl" columnSpacing={5}>
          <Grid item xs={0} md={2}>
            <LenderAssetFilter />
          </Grid>
          <Grid item xs={12} md={10}>
            {isLoading && <CircularProgress />}
            <AssetList assets={assets} type="lend" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LendPage;
