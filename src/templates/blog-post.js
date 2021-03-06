import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import { DiscussionEmbed } from 'disqus-react'
import Layout from '../components/layout'
import Share from '../components/Share'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const twitterHandle = get(this.props, 'data.site.siteMetadata.twitterHandle')
    const url = get(this.props, 'data.site.siteMetadata.siteUrl')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const disqusShortname = 'workinblocks'
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    }
    const slug = post.fields.slug;
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <h1 style={{ marginBottom: 35 }}>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            color: '#777',
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
        <hr
          style={{
            marginBottom: rhythm(1),
            color: '#61f79e',
          }}
        />
        {/* <Bio /> */}

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,

          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
        <Share
          socialConfig={{
            twitterHandle,
            config: {
              url: `${url}${slug}`,
              title: `${siteTitle}`,
            },
          }}
        />
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig}/>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author
        twitterHandle
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
			  slug
		  }
    }
  }
`
