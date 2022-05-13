import { Box, Grid, Typography } from "@mui/material";
import IconLink from "../../../components/icon-link/icon-link";
import style from "./icon-grid.module.scss";
import {
  WalletIcon,
  TradFiIcon,
  BankIcon,
  BridgeIcon,
  xFhmIcon,
  MintIcon,
  USDBFHMIcon,
  FinancialNftsIcon,
  LiquidityIcon,
  NFTLendingIcon,
} from "@fantohm/shared/images";

export const IconGrid = (): JSX.Element => {
  return (
    <Grid container rowSpacing={6} className={style["productGrid"]}>
      <Grid
        container
        rowSpacing={6}
        className={style["productGrid"]}
        style={{
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item md={12} xs={6}>
          <Typography style={{ fontSize: "36px" }}>Our products</Typography>
        </Grid>
        <Grid item md={3} xs={6}>
          <IconLink
            title="USDB Stablecoin"
            icon={TradFiIcon}
            link="/trad-fi"
            text="USDB is an ideal tool of decentralised commerce"
          />
        </Grid>
        <Grid item md={3} xs={6}>
          <IconLink
            title="FHM"
            icon={USDBFHMIcon}
            link="/staking"
            text="The FHM protocol is ideal as a value-capturing reserve"
          />
        </Grid>
        <Grid item md={3} xs={6}>
          <IconLink
            title="Liquidity Solutions"
            icon={LiquidityIcon}
            link="/mint"
            text="Our business-to-business solution for on-chain liquidity"
          />
          {/*<IconLink title="Mint USDB" icon={MintIcon} />*/}
        </Grid>
      </Grid>
      <Grid item md={3} xs={6}>
        <IconLink
          title="NFT Lending"
          icon={NFTLendingIcon}
          link="/mint"
          text="Need brief one-line summary here to describe item"
        />
        {/*<IconLink title="Mint USDB" icon={MintIcon} />*/}
      </Grid>
      <Grid item md={3} xs={6}>
        <IconLink
          title="Financial NFTs"
          icon={FinancialNftsIcon}
          link="https://synapseprotocol.com/?inputCurrency=USDB&outputCurrency=USDB&outputChain=1"
          text="Need brief one-line summary here to describe item"
        />
      </Grid>
      <Grid item md={3} xs={6}>
        <IconLink
          title="USDB Bank"
          icon={BankIcon}
          text="Need brief one-line summary here to describe item"
        />
      </Grid>
      <Grid item md={3} xs={6}>
        <IconLink
          title="Dex & Bridge"
          icon={BridgeIcon}
          link="https://synapseprotocol.com/?inputCurrency=USDB&outputCurrency=USDB&outputChain=1"
          text="Need brief one-line summary here to describe item"
        />
      </Grid>
    </Grid>
  );
};

export default IconGrid;
