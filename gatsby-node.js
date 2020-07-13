/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using i

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages =({graphql, actions})=>{
    const {createPage} = actions
    return graphql(`
    query MyQuery {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
      
    `).then(res=>{
        res.data.allMarkdownRemark.edges.forEach(({node})=>{
            createPage({
                path: node.fields.slug,
                component: path.resolve("./src/templates/post.template.jsx"),
                context: {
                    slug:node.fields.slug,
                }
            })
        })
    })
}
