const githubQuery = (
	queryString,
	pageCount,
	firstLast,
	beforeAfter,
	activCursor
) => {
	return {
		query: `
      {
        viewer {
          name
        }
        search(query: "${queryString} user:LinkedInLearning sort:updated-desc", type: REPOSITORY, ${firstLast}: ${pageCount}, ${beforeAfter}${activCursor}) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                name
                id
                description
                url
                viewerSubscription
                licenseInfo {
                  spdxId
                }
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
				`,
	}
}

export default githubQuery
