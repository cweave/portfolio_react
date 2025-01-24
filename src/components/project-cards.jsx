import React, { useCallback, useEffect, useState } from "react";

const ProjectCards = () => {
  const [filteredProjects, setFilteredProjects] = useState([])

  const filterGitResults = useCallback(async params => {
    const cloneFilter = [...filteredProjects]
    const days = 365;
    const currentDate = new Date(Date.now()).toISOString().slice(0, 10)
    const maxDateTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

    params
      .filter(event => event.updated_at.slice(0, 10) >= maxDateTime && event.updated_at.slice(0, 10) <= currentDate)
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .map(i => {
        const { name, html_url, description, language, updated_at } = i
        const date = updated_at.slice(0, 10)
        const dateObj = new Date(date + "T00:00:00")
        const formattedDate = new Intl.DateTimeFormat("en-US").format(dateObj)

        return cloneFilter.push({
          name,
          html_url,
          description,
          language,
          lastUpdated: formattedDate,
        })
      })

    setFilteredProjects(cloneFilter)
  }, [filteredProjects])

  useEffect(() => {
    const api = "https://api.github.com/users/cweave/repos"
    fetch(api)
      .then(response => response.json())
      .then(data => {
        filterGitResults(data)
      })
  }, [filterGitResults])

  const renderCards = () =>
    filteredProjects.map(proj => (
      <div className="project-cards" key={proj.name}>
        <div className="project-cards__heading">
          <span className="project-cards__heading-title">{proj.name}</span>
          <span className="project-cards__heading-updated">Last updated: {proj.lastUpdated}</span>
        </div>
        <div className="project-cards__description">
          <p>{proj.description ? proj.description : <i>This project doesn't have a description.</i>}</p>
        </div>
        <ul className="project__technologies">
          {proj.language ? (
            <li>
              <span className="accent">{proj.language}</span>
            </li>
          ) : null}
          <li>
            <a href={proj.html_url} rel="noreferrer noopener" className="accent" target="_blank" title={`View ${proj.name} repository on Github`}>
              View Repo
            </a>
          </li>
        </ul>
      </div>
    ))

  return (
    <section>
      {filteredProjects.length > 0 ? (
        <div className="project-cards-container">{renderCards()}</div>
      ) : (
        <p style={{ padding: `1em` }}>
          Nothing to show here 🙈. Check out existing repositories on{" "}
          <a href="https://github.com/cweave" rel="noreferrer noopener" target="_blank" title="view existing repositories on GIthub">
            Github
          </a>
          .
        </p>
      )}
    </section>
  )
}

export default ProjectCards