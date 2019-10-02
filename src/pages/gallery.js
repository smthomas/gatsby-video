import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Gallery = ({ data }) => (
  <Layout>
    <SEO title="Image gallery" />
    <h1>Image Gallery</h1>
    <Img fluid={data.astronautImage.childImageSharp.fluid} alt="Astronaut" />
    <Img fixed={data.gatsbyIcon.childImageSharp.fixed} alt="Gatsby Logo" />
  </Layout>
);

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  {
    gatsbyIcon: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fixed(width: 512) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    astronautImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Gallery;
