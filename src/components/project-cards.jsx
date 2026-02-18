import React, { useCallback, useEffect, useState } from "react";

const GITHUB_USER = "cweave";
const CACHE_KEY = `github_repos_${GITHUB_USER}`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const ProjectCards = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState(null); // 'rate_limit' | 'error' | null

  const filterGitResults = useCallback(params => {
    const cloneFilter = [];
    const days = 365;
    const currentDate = new Date(Date.now()).toISOString().slice(0, 10);
    const maxDateTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const repos = Array.isArray(params) ? params : [];
    repos
      .filter(event => event.updated_at && event.updated_at.slice(0, 10) >= maxDateTime && event.updated_at.slice(0, 10) <= currentDate)
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .map(i => {
        const { name, html_url, description, language, updated_at } = i;
        const date = updated_at.slice(0, 10);
        const dateObj = new Date(date + "T00:00:00");
        const formattedDate = new Intl.DateTimeFormat("en-US").format(dateObj);

        return cloneFilter.push({
          name,
          html_url,
          description,
          language,
          lastUpdated: formattedDate,
        });
      });

    setFilteredProjects(cloneFilter);
  }, []);

  useEffect(() => {
    const api = `https://api.github.com/users/${GITHUB_USER}/repos`;
    const headers = {};
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const getCachedRepos = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { data, at } = JSON.parse(raw);
        if (Date.now() - at < CACHE_TTL_MS && Array.isArray(data)) return data;
      } catch (_) {}
      return null;
    };

    const setCached = data => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, at: Date.now() }));
      } catch (_) {}
    };

    const cached = getCachedRepos();
    if (cached) {
      setError(null);
      filterGitResults(cached);
      return;
    }

    fetch(api, { headers })
      .then(response => {
        if (response.status === 429) {
          setError("rate_limit");
          return null;
        }
        if (!response.ok) {
          setError("error");
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (!data) return;
        setError(null);
        setCached(data);
        filterGitResults(data);
      })
      .catch(() => setError("error"));
  }, [filterGitResults]);

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
      {error === "rate_limit" && (
        <p style={{ padding: "1em" }}>
          GitHub rate limit reached. You can try again later or add{" "}
          <code>REACT_APP_GITHUB_TOKEN</code> to a <code>.env</code> file for higher limits. Repos are cached for 1 hour when loaded.
        </p>
      )}
      {error === "error" && (
        <p style={{ padding: "1em" }}>
          Couldn’t load repositories. Check the link below or try again later.
        </p>
      )}
      {!error && filteredProjects.length > 0 ? (
        <div className="project-cards-container">{renderCards()}</div>
      ) : !error ? (
        <p style={{ padding: "1em" }}>
          Nothing to show here 🙈. Check out{" "}
          <a href={`https://github.com/${GITHUB_USER}`} rel="noreferrer noopener" target="_blank" title={`View ${GITHUB_USER} on GitHub`}>
            GitHub
          </a>.
        </p>
      ) : null}
    </section>
  );
}

export default ProjectCards