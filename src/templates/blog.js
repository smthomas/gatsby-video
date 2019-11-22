import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/articlePreview";
import Pager from "../components/pager";

const Blog = ({ data, pageContext }) => {
  const articles = data.allNodeArticle.nodes;

  return (
    <Layout>
      <SEO title="Blog Posts" />
      <h1>Blog Posts</h1>
      {articles.map(article => (
        <ArticlePreview
          key={article.id}
          title={article.title}
          path={article.path.alias}
          image={article.relationships.field_image.localFile.childImageSharp.fluid}
          alt={article.field_image.alt}
          summary={article.body.summary ? article.body.summary : article.body.processed.substring(0, 300)}
        />
      ))}
      <Pager pageContext={pageContext} />
    </Layout>
  );
};

Blog.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNodeArticle(
      sort: {fields: created, order: DESC}
      skip: $skip
      limit: $limit
    ) {
      nodes {
        id
        title
        created
        body {
          processed
          summary
        }
        path {
          alias
        }
        field_image {
          alt
        }
        relationships {
          field_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Blog;
