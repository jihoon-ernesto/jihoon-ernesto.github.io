/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const githubUsername = social?.github

  return (
    <div className="bio">
      {githubUsername && (
        <img
          className="bio-avatar"
          src={`https://github.com/${githubUsername}.png`}
          width={50}
          height={50}
          alt="GitHub profile"
        />
      )}
      {author?.name && (
        <p>
          Written by {author.name}{author?.summary ? `, ${author.summary}` : null}
          <br/>
          {githubUsername && (
            <>GitHub: <a href={`https://github.com/${githubUsername}`}>{githubUsername}</a></>
          )}
        </p>
      )}
    </div>
  )
}

export default Bio
