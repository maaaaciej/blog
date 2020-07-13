import React from "react"
import { graphql,Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"


const BlogLink = styled(Link)`
text-decoration:none;
color:black; 
&:hover{
  text-decoration:underline; 
  
}
text-align:center;
`

export default  ({data}) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h4>{data.allMarkdownRemark.totalCount} posts posted so far!</h4>

      {
        data.allMarkdownRemark.edges.map(({node})=> 
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <h3>{node.frontmatter.title}</h3>
          </BlogLink>
          <h5>{node.frontmatter.date}</h5>
          <p>{node.excerpt}</p>

        </div>
        )
      }
    </div>

  </Layout>
)


export const query = graphql`
query MyQuery {
  allMarkdownRemark(sort: {fields:[frontmatter___date], order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          date
          description
          title
        }fields{
          slug
        }
        html
        excerpt
      }
    }
    totalCount
  }
}

`