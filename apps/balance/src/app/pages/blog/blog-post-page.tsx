import {
  Box,
  Container,
  Grid,
  Paper,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material";
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { USDBLight, USDBDark } from "@fantohm/shared-ui-themes";
import { RootState } from "../../store";
import style from "./blog-post-page.module.scss";
import {
  BalanceHeroImage,
  BalanceLogoDark,
  BalanceTwitter,
} from "@fantohm/shared/images";
import { withDeps } from "@nrwl/workspace/src/core/project-graph";
import css from "../../pages/trad-fi/deposit-choice/deposit-choice.module.scss";
import { useLocation, useParams } from "react-router-dom";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BlogPostDTO } from "../../../../../nft-market/src/app/types/backend-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BlogPost from "../../components/blog-page/blog-post";
import { INLINES, Block, Inline, BLOCKS } from "@contentful/rich-text-types";
import Head from "../../components/template/head";
import { Helmet } from "react-helmet";

/* eslint-disable-next-line */
export interface BlogPostProps {
  className?: string;
  invertTheme?: boolean;
  setTheme?: "light" | "dark";
  tokenImage?: string;
  sx?: SxProps<Theme>;
  imageLink?: string;
  blogTitle?: string;
  product?: string;
  date?: string;
}

export type ContentfulLink = {
  value?: string;
};

export const BlogPostPage = (props: BlogPostProps): JSX.Element => {
  const themeType = useSelector((state: RootState) => state.app.theme);
  const { name } = useParams();
  const [post, setPost] = useState<BlogPostDTO | undefined>();

  const blogPosts = useSelector((state: RootState) => state.app.blogPosts);
  const location = useLocation();
  const id = location.pathname.substring(location.pathname.indexOf("blog/") + 5);
  const theme = useCallback(() => {
    if (props.invertTheme) {
      return themeType === "light" ? USDBDark : USDBLight;
    } else if (props.setTheme) {
      return props.setTheme === "light" ? USDBLight : USDBDark;
    } else {
      return themeType === "light" ? USDBLight : USDBDark;
    }
  }, [themeType, props.invertTheme, props.setTheme]);

  useEffect(() => {
    if (blogPosts && blogPosts.blogPosts) {
      setPost(blogPosts.blogPosts.find((post: BlogPostDTO) => post.id === id));
    }
  }, [blogPosts]);

  const website_url = "https://www.balance.capital/";

  const options = {
    renderText: (text: string) => {
      return text.split("\n").reduce((children: any, textSegment: any, index: number) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (
        node: Block | Inline,
        children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
      ) => (
        <a href={`/blog/${node.data["target"].fields.slug}`}>
          {`${(node.content[0] as any)["value"].toString()}`}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <img
          src={node.data?.target?.fields?.file?.url}
          alt={node.data?.target?.fields?.title}
          style={{ maxWidth: "90%" }}
        />
      ),
    },
  };
  return (
    <>
      {post ? Head(post.seoTitle, post.seoDescription) : Head("Blog Post", "")}
      <Helmet>
        <meta name="keywords" content={post?.seoKeywords} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <div style={{ width: "100%" }} className="change">
          <Box
            className={css["titleWrapper"]}
            sx={{
              height: "2em",
              marginLeft: { xs: "25%", md: "40%" },
              marginRight: { xs: "25%", md: "40%" },
              maxWidth: { xs: "50%", md: "20%" },
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                paddingTop: "8px",
                fontSize: "12px",
              }}
            >
              {post ? post.blogCategory : ""}
            </h3>
          </Box>
          <Box>
            <Grid
              container
              columnSpacing={2}
              rowSpacing={{ xs: 4, md: 0 }}
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "900px",
              }}
            >
              <Grid
                item
                md={12}
                order={{ lg: 1 }}
                className={style["iconsElement"]}
                style={{ textAlign: "center", maxWidth: "100%" }}
              >
                <h1>
                  {" "}
                  {blogPosts && blogPosts.blogPosts
                    ? blogPosts.blogPosts.find((post: BlogPostDTO) => post.id === id)
                        .blogTitle
                    : ""}
                </h1>
              </Grid>
              <Grid
                item
                xs={12}
                order={{ lg: 1 }}
                className={style["iconsElement"]}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={post && post.image ? post.image : BalanceHeroImage}
                  alt={post ? post.blogTitle : "Balancer Hero Logo"}
                  className={style["imageSymbol"]}
                />
              </Grid>

              <Grid
                item
                className="email-div"
                md={1}
                order={{ lg: 1 }}
                style={{ width: "60px", justifyContent: "center" }}
              >
                <img
                  src={BalanceTwitter}
                  alt="Balance Twitter logo"
                  style={{ width: "60px" }}
                />
              </Grid>
              <Grid
                item
                className="email-div"
                md={6}
                order={{ lg: 1 }}
                style={{ height: "100%", overflow: "hidden", textAlign: "start" }}
              >
                <h2 style={{ fontSize: "12px", marginLeft: "10px" }}>
                  {blogPosts && blogPosts.blogPosts
                    ? blogPosts.blogPosts.find((post: BlogPostDTO) => post.id === id)
                        .blogTitle
                    : ""}
                </h2>
                <h2 style={{ fontSize: "12px", marginLeft: "10px" }}>
                  {post && post.date
                    ? new Date(post.date.slice(0, 10)).toDateString().slice(4)
                    : ""}
                </h2>
              </Grid>
              <Grid
                item
                md={12}
                order={{ lg: 1 }}
                style={{ maxWidth: "90%" }}
                className={style["iconsElement"]}
              >
                {blogPosts && blogPosts.blogPosts
                  ? documentToReactComponents(
                      blogPosts.blogPosts.find((post: BlogPostDTO) => post.id === id)
                        .content,
                      options
                    )
                  : ""}
              </Grid>
              <Grid item md={12} order={{ lg: 1 }} className={style["iconsElement"]}>
                {blogPosts && blogPosts.blogPosts
                  ? documentToReactComponents(
                      blogPosts.blogPosts.find((post: BlogPostDTO) => post.id === id)
                        .getInTouch,
                      options
                    )
                  : ""}
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              order={{ lg: 1 }}
              className={style["iconsElement"]}
              style={{ textAlign: "center", maxWidth: "100%", marginTop: "100px" }}
            >
              <h1>More from the balance blog</h1>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              order={{ lg: 1 }}
              sx={{
                width: { xs: "90%", md: "90%" },
                marginLeft: { xs: "5%", md: "5%" },
                marginRight: { xs: "5%", md: "5%" },
                marginBottom: "20px",
              }}
            >
              <Grid container columnSpacing={2} rowSpacing={{ xs: 4, md: 0 }}>
                {blogPosts &&
                  blogPosts.blogPosts &&
                  blogPosts.blogPosts.slice(0, 3).map((post: BlogPostDTO) => (
                    <Grid
                      item
                      className="email-div"
                      xs={12}
                      md={4}
                      order={{ lg: 1 }}
                      style={{ width: "100%" }}
                    >
                      <BlogPost post={post} className={style["blogPost"]}>
                        <h2 className={style["daiAPR"]}>{post.blogTitle}</h2>
                      </BlogPost>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              order={{ lg: 1 }}
              sx={{
                width: { xs: "80%", md: "100%" },
                marginLeft: { xs: "10%", md: "12.5%" },
                alignItems: "center",
              }}
            >
              <Grid container columnSpacing={2} rowSpacing={{ xs: 4, md: 0 }}>
                {/*<Grid*/}
                {/*  item*/}
                {/*  className="email-div"*/}
                {/*  xs={12}*/}
                {/*  md={3}*/}
                {/*  order={{ lg: 1 }}*/}
                {/*  style={{ width: "100%" }}*/}
                {/*>*/}
                {/*  <BlogPost>*/}
                {/*    <h2 className={style["daiAPR"]}>Blog posts</h2>*/}
                {/*  </BlogPost>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*  item*/}
                {/*  className="email-div"*/}
                {/*  xs={12}*/}
                {/*  md={3}*/}
                {/*  order={{ lg: 1 }}*/}
                {/*  style={{ width: "100%" }}*/}
                {/*>*/}
                {/*  <BlogPost>*/}
                {/*    <h2 className={style["daiAPR"]}>Blog posts</h2>*/}
                {/*  </BlogPost>*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*  item*/}
                {/*  className="email-div"*/}
                {/*  xs={12}*/}
                {/*  md={3}*/}
                {/*  order={{ lg: 1 }}*/}
                {/*  style={{ width: "100%" }}*/}
                {/*>*/}
                {/*  <BlogPost>*/}
                {/*    <h2 className={style["daiAPR"]}>Blog posts</h2>*/}
                {/*  </BlogPost>*/}
                {/*</Grid>*/}
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default BlogPostPage;
