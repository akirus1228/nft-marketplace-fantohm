import { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import DaiCard from "../../components/dai-card/dai-card";
import Faq, { FaqItem } from "../../components/faq/faq";
import Headline from "../../components/headline/headline";
import { StakingCard } from "./staking-card/staking-card";
import style from "./staking-choice.module.scss";
import { numberWithCommas, getStakedTVL } from "@fantohm/shared-web3";
import SsInfoBlock from "./staking-choice/ss-info-block/ss-info-block";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {DaiToken} from "@fantohm/shared/images";
import Logo from "../../components/logo/logo";

interface IDepositCardParams {
  bondType: string;
  term: number;
  roi: number;
  apy: number;
  bond: any;
}

export const faqItems: FaqItem[] = [
  {
    title: "What is Single Sided Staking?",
    content: "Single Sided Staking is similar to Liquidity Pair (LP) farming while also eliminating the impermanent losses. Instead of depositing both tokens of an LP to farm and earn rewards, investors only provide $DAI tokens, i.e., one side of the pair while our protocol deposits the other token of the liquidity pair which is $USDB. This pair is then farmed to earn rewards continuously."
  },
  {
    title: "How Single Sided Staking eliminates impermanent loss?",
    content: "By providing up to 20% reward in $FHM tokens to the dollar value of your $DAIs, we mitigate against impermanent losses! So no matter what the market state is and how much $FHM costs, as an investor, you will earn up to 20% rewards on your initial investment."
  },
  {
    title: "What happens if I want my money back?",
    content: "Unlike other Bonds, your investments and assets are not locked in Single Sided Staking. As such, you can withdraw your investments and claim rewards at any point in time."
  },
  {
    title: "What is IL redeem?",
    content: "To circumvent impermanent loss users will be able to claim back any impermanent losses incurred, paid out in FHM. \n" +
      "\n" +
      "To be eligible for this rebate. users need to:\n" +
      "\n" +
      "1. Incur impermanent loss. i.e The amount of DAI withdrawn is less than that originally deposited. \n" +
      "2. Have been staking for at least 24 hrs.\n" +
      "3. Withdraw the full amount or last part of the amount that was invested. To the last decimal."
  },
  // {
  //   title: "What happens at the end of the term of my Deposit?",
  //   content: "You will need to withdraw the bond back into your wallet. That action is not automatic. You will be paid out in USDB."
  // }
];

export const StakingChoicePage = (): JSX.Element => {
  const [ assetBalance, setAssetBalance ] = useState(-1);

  useEffect(() => {
    async function getBalance() {
      const balance = await getStakedTVL();
      setAssetBalance(balance);
    }

    getBalance();
  }, []);

  const heroContent = {
    hero: true,
    title: "Earn up to 20% on Dai",
    subtitle: ["The safest way to earn Yields on your Dai"]
  };
  const simpleSafe = {
    title: "Simple & safe returns",
    subtitle: ["To earn rewards, investors only provide one side of the pair while our protocol deposits the other."]
  };
  const getStarted = {
    title: "Get started today",
    subtitle: ["Single Sided Staking is similar to Liquidity Pair (LP) farming but eliminates impermanent loss."]
  };

  return (
    <>
      <Box className={style["__heading"]}>
        <Headline {...heroContent}/>
        <Box className={`${style['depositBox']} flexCenterCol`}>
          <DaiCard className={`${style['daiIcon']} dai`} tokenImage={DaiToken}>
            <h2 className={style['daiAPR']}>20.00% APR</h2>
            <Grid container>
              <Grid item xs={6} sx={{justifyContent:'left'}}>
                <span className={style['tvlInfo']}>Staked TVL</span>
              </Grid>
              <Grid item xs={6} sx={{display:'flex', justifyContent: 'flex-end'}}>
                {assetBalance === -1 ?
                  <Skeleton width="100px" /> :
                  <span className={style['tvlInfo']}>${numberWithCommas(assetBalance)}</span>}
              </Grid>
            </Grid>
          </DaiCard>
          <Grid container sx={{my: '2em'}} columnSpacing={2}>
            <Grid item xs={12} sm={6}  sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'flex-end'}}} className={style['buttonArea']}>
              <Button variant="contained" color="primary" sx={{width: '255px'}} href="staking#deposit" className={style['depositButton']}>Deposit</Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'flex-start'}}} className={style['buttonArea']}>
              <Button variant="outlined" sx={{width: '255px'}} href="staking#learn-more" className={style['learnMore']}>Learn More</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={style["__section"]}>
        <Headline {...simpleSafe} id="learn-more" sx={{mb: '5em'}} />
        <SsInfoBlock />
      </Box>
      <Box className={style["__section"]}>
        <Headline {...getStarted} />
        <Box className="flexCenterCol" sx={{marginTop: "3em", mb:'10em'}} id="deposit">
          <StakingCard bondType="6month" term={6} roi={15} apy={20.00} />
        </Box>
        <Faq faqItems={faqItems} sx={{mb: '10em'}}/>
      </Box>
      <Box className={style["__section"]}>
        <Headline {...simpleSafe} sx={{mb: '2em'}}/>
        <Logo />
      </Box>
    </>
  );
};

export default StakingChoicePage;
