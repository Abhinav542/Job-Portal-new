import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";

/*
Features:
- Fetches jobs from a remote API (if available), falls back to local dataset.
- Pagination (page size, prev/next, direct page numbers).
- Infinite scroll (toggle on/off). Uses IntersectionObserver to load next page.
- Job detail modal with Apply form inside modal.
- Save job to localStorage (persisted).
- Filters, search, sort.
- "Realtime" refresh (poll every 60s) toggle.
*/

const FALLBACK_JOBS = [
  // sample jobs (you can extend)
  {
    id: 1,
    title: "Finance Executive",
    company: "Bajaj Finserv",
    experience: "2–4 years",
    location: "Indore",
    jobType: "Full Time",
    salary: "5–7 LPA",
    posted: "3 Days Ago",
    logo:
      "https://i.pinimg.com/1200x/0b/0a/8b/0b0a8bae46aa07d158aaf1ceaf4c2dac.jpg",
    skills: ["Account Management", "NCF", "Reporting", "Debt"],
    description:
      "Manage accounts, prepare reports, coordinate with teams, and handle debt management.",
  },
  {
    id: 2,
    title: "Senior Web Developer",
    company: "TCS",
    experience: "3–6 years",
    location: "Bangalore",
    jobType: "Full Time",
    salary: "8–12 LPA",
    posted: "1 Day Ago",
    logo:
      "https://tse3.mm.bing.net/th/id/OIP.YIRHdD5cZUr1YFGaW4LfFQHaFX?pid=Api&P=0&h=220",
    skills: ["React", "Node.js", "MongoDB", "API Integration", "CSS"],
    description:
      "Work on large enterprise web apps using React + Node. Mentor juniors and integrate APIs.",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Infosys",
    experience: "1–3 years",
    location: "Hyderabad",
    jobType: "Full Time",
    salary: "4–7 LPA",
    posted: "5 Days Ago",
    logo: "https://tse3.mm.bing.net/th/id/OIP.ESlxJSrRv5S-65IqdVPUmAHaHa?pid=Api&P=0&h=220",
    skills: ["Excel", "SQL", "BI Tools", "Data Cleaning"],
    description:
      "Analyze business data, create dashboards, and work closely with stakeholders.",
  },
  {
    id: 4,
    title: "React Developer",
    company: "Wipro",
    experience: "2–4 years",
    location: "Mumbai",
    jobType: "Remote",
    salary: "6–9 LPA",
    posted: "2 Days Ago",
    logo: "https://tse1.mm.bing.net/th/id/OIP.LCNgAL5L174Punk-ntgy4gHaD3?pid=Api&P=0&h=220",
    skills: ["React", "Redux", "JavaScript", "Figma"],
    description: "Develop UI components, optimize performance and accessibility.",
  },
  {
    id: 5,
    title: "AI Engineer",
    company: "Google",
    experience: "1–3 years",
    location: "Bangalore",
    jobType: "Full Time",
    salary: "20–32 LPA",
    posted: "10 Hours Ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    skills: ["Python", "TensorFlow", "ML Models"],
    description: "Build and productionize ML models and pipelines.",
  },
  {
    id: 6,
    title: "UI/UX Designer (Internship)",
    company: "Adobe",
    experience: "0–2 years",
    location: "Noida",
    jobType: "Internship",
    salary: "1–2 LPA",
    posted: "6 Hours Ago",
    logo:
      "https://tse4.mm.bing.net/th/id/OIP.MPHAVL52hadir7pe0HszoAHaEK?pid=Api&P=0&h=220",
    skills: ["Figma", "Illustrator", "User Flow", "Wireframes"],
    description: "Design interfaces and assist product teams with UX flows.",
  },
  {
    id: 7,
    title: "Backend Developer",
    company: "Amazon",
    experience: "3–6 years",
    location: "Hyderabad",
    jobType: "Full Time",
    salary: "12–18 LPA",
    posted: "1 Day Ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    skills: ["Node.js", "AWS", "API", "Docker"],
    description: "Build scalable backend services and deploy to AWS.",
  },
  // you can add more if needed
];

function useLocalStorage(key, initial = []) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

const PAGE_SIZE_DEFAULT = 4;

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useLocalStorage("savedJobs-v1", []);
  const [selectedJob, setSelectedJob] = useState(null); // job for modal
  const [showApplyForm, setShowApplyForm] = useState(false);

  // UI state
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    experience: [],
    location: [],
    jobType: [],
    salary: [],
    skills: [],
  });
  const [sortOption, setSortOption] = useState("none");

  // pagination + infinite scroll
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);
  const [page, setPage] = useState(1);
  const [infiniteScroll, setInfiniteScroll] = useState(false);

  // realtime fetch toggle
  const [realtime, setRealtime] = useState(false);
  const isMounted = useRef(false);
  const sentinelRef = useRef(null);

  // Fetch jobs from remote API with a fallback. This simulates "real-time" if toggled.
  const fetchJobs = async () => {
    try {
      // Replace this URL with your real jobs API.
      const res = await fetch("https://run.mocky.io/v3/7d5e7f4a-3df2-4f3e-8a3b-8d7c1f6c9c47", {
        // the above is an example mocky id — if it's unreachable code will fallback.
        method: "GET",
      });
      if (!res.ok) throw new Error("Bad response");
      const data = await res.json();
      // Expecting array of jobs; map/normalize if needed
      if (Array.isArray(data) && data.length > 0) {
        setAllJobs(data);
        setFilteredJobs(data);
        return;
      }
      throw new Error("Invalid data");
    } catch (err) {
      // fallback to bundled data
      setAllJobs(FALLBACK_JOBS);
      setFilteredJobs(FALLBACK_JOBS);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchJobs();
    isMounted.current = true;
  }, []);

  // realtime polling when enabled
  useEffect(() => {
    if (!realtime) return;
    const id = setInterval(fetchJobs, 60 * 1000); // every 60s
    return () => clearInterval(id);
  }, [realtime]);

  // Apply current filters / search / sort to the full list (not paging)
  const applyFiltersAndSort = () => {
    let temp = [...allJobs];

    // Experience filter (substring match)
    if (filters.experience.length) {
      temp = temp.filter((job) =>
        filters.experience.some((exp) =>
          job.experience?.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }

    // Location filter (exact)
    if (filters.location.length) {
      temp = temp.filter((job) => filters.location.includes(job.location));
    }

    // JobType exact
    if (filters.jobType.length) {
      temp = temp.filter((job) => filters.jobType.includes(job.jobType));
    }

    // Salary (substring)
    if (filters.salary.length) {
      temp = temp.filter((job) =>
        filters.salary.some((sal) =>
          job.salary?.toLowerCase().includes(sal.toLowerCase())
        )
      );
    }

    // Skills (job must include ALL selected skills)
    if (filters.skills.length) {
      temp = temp.filter((job) =>
        filters.skills.every((sk) =>
          job.skills?.some((s) => s.toLowerCase() === sk.toLowerCase())
        )
      );
    }

    // Search text (title or company)
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      temp = temp.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.company?.toLowerCase().includes(q) ||
          job.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sort (we only support salary-high / salary-low where salary starts with a number)
    if (sortOption === "salary-high" || sortOption === "salary-low") {
      const num = (s) => {
        if (!s) return 0;
        // extract first number from "5–7 LPA" or "20–32 LPA"
        const m = s.match(/\d{1,3}/);
        return m ? parseInt(m[0], 10) : 0;
      };
      temp.sort((a, b) =>
        sortOption === "salary-high" ? num(b.salary) - num(a.salary) : num(a.salary) - num(b.salary)
      );
    }

    setFilteredJobs(temp);
    // when filters applied, reset pagination to 1
    setPage(1);
  };

  // run apply when dependencies change
  useEffect(() => {
    // only after initial fetch
    if (!isMounted.current) return;
    applyFiltersAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchText, sortOption, allJobs]);

  // Pagination slice derived list
  const pagedJobs = useMemo(() => {
    if (infiniteScroll) {
      // if infinite scroll, we show up to page * pageSize items
      return filteredJobs.slice(0, page * pageSize);
    }
    const start = (page - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, page, pageSize, infiniteScroll]);

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

  const goToPage = (n) => setPage(Math.min(Math.max(1, n), totalPages));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  // Infinite scroll sentinel observer
  useEffect(() => {
    if (!infiniteScroll) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            // load next page if available
            setPage((curr) => {
              const next = curr + 1;
              if (next <= totalPages) return next;
              return curr;
            });
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [infiniteScroll, totalPages]);

  // Toggle save job
  const toggleSave = (jobId) => {
    setSavedJobs((prev) => {
      const has = prev.includes(jobId);
      return has ? prev.filter((id) => id !== jobId) : [...prev, jobId];
    });
  };

  // Open job modal
  const openJob = (job) => {
    setSelectedJob(job);
    setShowApplyForm(false);
    // lock scroll
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedJob(null);
    setShowApplyForm(false);
    document.body.style.overflow = "";
  };

  // Apply form submit (dummy)
  const handleApplySubmit = (form) => {
    // In real app you'd send form + job details to API
    // Here we simply show success and close
    alert(`Applied to ${selectedJob.title} — Name: ${form.name}, Email: ${form.email}`);
    setShowApplyForm(false);
    closeModal();
  };

  // Clear all filters
  const clearAll = () => {
    setFilters({
      experience: [],
      location: [],
      jobType: [],
      salary: [],
      skills: [],
    });
    setSearchText("");
    setSortOption("none");
    setPage(1);
    setFilteredJobs(allJobs);
  };

  return (
    <>
      <Navbar />

      <div className="jobs-wrapper">
        <aside className="jobs-sidebar">
          <div className="sidebar-top">
            <h3>Filters</h3>
            <input
              className="sidebar-search"
              type="text"
              placeholder="Search job or company..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="filter-block">
            <h4>Experience</h4>
            {["0–1 years", "1–3 years", "2–4 years", "3–6 years", "6+ years"].map((exp) => (
              <label key={exp} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.experience.includes(exp)}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.experience.includes(exp)
                        ? prev.experience.filter((v) => v !== exp)
                        : [...prev.experience, exp];
                      return { ...prev, experience: cur };
                    })
                  }
                />
                <span>{exp}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Location</h4>
            {["Indore", "Bangalore", "Hyderabad", "Noida", "Mumbai"].map((loc) => (
              <label key={loc} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.location.includes(loc)
                        ? prev.location.filter((v) => v !== loc)
                        : [...prev.location, loc];
                      return { ...prev, location: cur };
                    })
                  }
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Job Type</h4>
            {["Full Time", "Part Time", "Remote", "Internship"].map((jt) => (
              <label key={jt} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(jt)}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.jobType.includes(jt)
                        ? prev.jobType.filter((v) => v !== jt)
                        : [...prev.jobType, jt];
                      return { ...prev, jobType: cur };
                    })
                  }
                />
                <span>{jt}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Salary</h4>
            {["1–2 LPA", "4–7 LPA", "5–7 LPA", "6–9 LPA", "8–12 LPA", "12–18 LPA"].map((sal) => (
              <label key={sal} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.salary.includes(sal)}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.salary.includes(sal)
                        ? prev.salary.filter((v) => v !== sal)
                        : [...prev.salary, sal];
                      return { ...prev, salary: cur };
                    })
                  }
                />
                <span>{sal}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Skills</h4>
            {["React", "Node.js", "SQL", "Python", "Figma", "API"].map((sk) => (
              <label key={sk} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.skills.includes(sk)}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.skills.includes(sk)
                        ? prev.skills.filter((v) => v !== sk)
                        : [...prev.skills, sk];
                      return { ...prev, skills: cur };
                    })
                  }
                />
                <span>{sk}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-actions">
            <button className="apply-btn" onClick={() => applyFiltersAndSort()}>
              Apply Filters
            </button>
            <button className="clear-btn" onClick={clearAll}>
              Clear
            </button>
          </div>

          <div className="sidebar-extra">
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={infiniteScroll}
                onChange={(e) => {
                  setInfiniteScroll(e.target.checked);
                  setPage(1);
                }}
              />
              <span>Infinite scroll</span>
            </label>

            <label className="toggle-row">
              <input
                type="checkbox"
                checked={realtime}
                onChange={(e) => setRealtime(e.target.checked)}
              />
              <span>Realtime refresh (60s)</span>
            </label>

            <div className="page-size-row">
              <label>Page size</label>
              <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
                {[3, 4, 6, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="saved-list">
            <h4>Saved Jobs</h4>
            {savedJobs.length === 0 ? <p className="muted">No saved jobs</p> : null}
            <ul>
              {savedJobs.map((id) => {
                const job = allJobs.find((j) => j.id === id);
                return job ? (
                  <li key={id} className="saved-item" onClick={() => openJob(job)}>
                    <img src={job.logo} alt={`${job.company} logo`} />
                    <div>
                      <div className="saved-title">{job.title}</div>
                      <div className="saved-company">{job.company}</div>
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </aside>

        <main className="jobs-main">
          <div className="jobs-top-row">
            <h2>Job Openings</h2>

            <div className="jobs-controls">
              {/* <input
                type="text"
                placeholder="Quick search (title/company/skill)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="top-search"
              /> */}

              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="none">Sort by</option>
                <option value="salary-high">Salary: High → Low</option>
                <option value="salary-low">Salary: Low → High</option>
              </select>
            </div>
          </div>

          <div className="cards">
            {pagedJobs.length === 0 ? (
              <div className="no-results">No jobs found — try clearing filters.</div>
            ) : (
              pagedJobs.map((job) => (
                <article key={job.id} className="job-card">
                  <div className="job-card-left">
                    <img src={job.logo} alt={`${job.company} logo`} className="card-logo" />
                  </div>

                  <div className="job-card-body">
                    <div className="row-top">
                      <h3 className="job-title">{job.title}</h3>
                      <div className="meta">
                        <span className="company">{job.company}</span>
                        <span className="dot">•</span>
                        <span className="location">{job.location}</span>
                      </div>
                    </div>

                    <p className="job-desc-short">{job.description}</p>

                    <div className="tags">
                      <span className="tag">{job.experience}</span>
                      <span className="tag">{job.jobType}</span>
                      <span className="tag">{job.salary}</span>
                    </div>

                    <div className="card-bottom">
                      <div className="posted">{job.posted}</div>

                      <div className="actions">
                        <button className="btn ghost" onClick={() => toggleSave(job.id)}>
                          {savedJobs.includes(job.id) ? "Saved ✓" : "Save"}
                        </button>
                        <button className="btn primary" onClick={() => openJob(job)}>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* pagination controls (hidden when infinite scroll) */}
          {!infiniteScroll && (
            <div className="pagination">
              <button onClick={prevPage} disabled={page === 1}>
                ◀ Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === page ? "page active" : "page"}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              ))}

              <button onClick={nextPage} disabled={page === totalPages}>
                Next ▶
              </button>
            </div>
          )}

          {/* sentinel for infinite scroll */}
          {infiniteScroll && <div ref={sentinelRef} className="infinite-sentinel" />}

          <div className="footer-note">
            Showing <strong>{pagedJobs.length}</strong> of <strong>{filteredJobs.length}</strong> results
          </div>
        </main>
      </div>

      {/* Job detail modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-top">
              <img src={selectedJob.logo} alt="" />
              <div>
                <h3>{selectedJob.title}</h3>
                <p className="muted">
                  {selectedJob.company} • {selectedJob.location} • {selectedJob.experience}
                </p>
              </div>
            </div>

            <div className="modal-body">
              <h4>Job Details</h4>
              <p>{selectedJob.description}</p>

              <h4>Skills</h4>
              <div className="skills-list">
                {selectedJob.skills?.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>

              <div className="modal-actions">
                <button
                  className="btn primary"
                  onClick={() => {
                    setShowApplyForm(true);
                  }}
                >
                  Apply Now
                </button>
                <button className="btn ghost" onClick={() => toggleSave(selectedJob.id)}>
                  {savedJobs.includes(selectedJob.id) ? "Saved ✓" : "Save"}
                </button>
              </div>
            </div>

            {/* Apply form */}
           {showApplyForm && (
  <div className="apply-form-container">
    <div className="apply-form">
      <h4>Apply for {selectedJob.title}</h4>
                <ApplyForm
                  job={selectedJob}
                  onCancel={() => setShowApplyForm(false)}
                  onSubmit={(form) => handleApplySubmit(form)}
                />
    </div>
  </div>
)}

          </div>
        </div>
      )}
    </>
  );
};

/* Small ApplyForm component inside file for convenience */
function ApplyForm({ job, onCancel, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm((s) => ({ ...s, resume: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email) {
      alert("Please complete name & email");
      return;
    }
    // In real app upload resume and send to API
    onSubmit(form);
  };

  return (
    <form className="apply-form-inner" onSubmit={submit}>
      <label>
        Full name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <label className="resume-input">
        Resume (pdf)
        <input name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} />
      </label>

      <div className="apply-form-actions">
        <button type="button" className="btn ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn primary">
          Submit Application
        </button>
      </div>
    </form>
  );
}

export default Jobs;
