import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = 'https://rest-apis-demo.onrender.com/feedbacks';

const emptyFeedback = {
  name: '',
  age: '',
  rating: '',
  description: '',
};

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('get'); // get | post | put | delete
  const [form, setForm] = useState(emptyFeedback);
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [highlightId, setHighlightId] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 2500);
  };

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch feedbacks');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      showError(err.message || 'Unable to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.rating || !form.description) {
      showError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // Compute the smallest positive integer id not currently in use
      const usedIds = feedbacks
        .map((fb) => Number(fb.id))
        .filter((n) => Number.isFinite(n) && n > 0);
      let nextId = 1;
      while (usedIds.includes(nextId)) {
        nextId += 1;
      }

      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: nextId,
          name: form.name,
          age: Number(form.age),
          rating: Number(form.rating),
          description: form.description,
        }),
      });
      if (!res.ok) throw new Error('Failed to create feedback');
      await fetchFeedbacks();
      setForm(emptyFeedback);
    } catch (err) {
      showError(err.message || 'Error creating feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectForEdit = (fb) => {
    setActiveTab('put');
    setEditId(fb.id?.toString() || '');
    setForm({
      name: fb.name || '',
      age: fb.age?.toString() || '',
      rating: fb.rating?.toString() || '',
      description: fb.description || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editId) {
      showError('Please select a feedback to update');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: Number(form.age),
          rating: Number(form.rating),
          description: form.description,
        }),
      });
      if (!res.ok) throw new Error('Failed to update feedback');
      await fetchFeedbacks();
      setHighlightId(editId);
      setTimeout(() => setHighlightId(null), 1200);
    } catch (err) {
      showError(err.message || 'Error updating feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteId) {
      showError('Enter an id to delete');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete feedback');
      await fetchFeedbacks();
      setDeleteId('');
    } catch (err) {
      showError(err.message || 'Error deleting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rest-app">
      <div className="rest-bg" />

      <div className="rest-container">
        <header className="rest-header">
          <div className="rest-title-block">
            <span className="rest-pill">REST Playground</span>
            <h1>Feedback API Studio</h1>
            <p>
              Visual playground for <code>GET</code>, <code>POST</code>,{' '}
              <code>PUT</code> and <code>DELETE</code> on
              <span className="endpoint"> http://localhost:3000/feedbacks</span>.
              Start the JSON server separately and interact in real time.
            </p>
          </div>
          <div className="rest-endpoint-card">
            <div className="endpoint-row">
              <span className="verb get">GET</span>
              <span className="endpoint-text">/feedbacks</span>
            </div>
            <div className="endpoint-row">
              <span className="verb post">POST</span>
              <span className="endpoint-text">/feedbacks</span>
            </div>
            <div className="endpoint-row">
              <span className="verb put">PUT</span>
              <span className="endpoint-text">/feedbacks/:id</span>
            </div>
            <div className="endpoint-row">
              <span className="verb delete">DELETE</span>
              <span className="endpoint-text">/feedbacks/:id</span>
            </div>
          </div>
        </header>

        <div className="rest-layout">
          <aside className="rest-sidebar">
            <h2>Operations</h2>
            <ul>
              <li
                className={activeTab === 'get' ? 'active' : ''}
                onClick={() => setActiveTab('get')}
              >
                <span>GET</span>
                <small>View all feedbacks</small>
              </li>
              <li
                className={activeTab === 'post' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('post');
                  setForm(emptyFeedback);
                  setEditId('');
                }}
              >
                <span>POST</span>
                <small>Add new feedback</small>
              </li>
              <li
                className={activeTab === 'put' ? 'active' : ''}
                onClick={() => setActiveTab('put')}
              >
                <span>PUT</span>
                <small>Update existing</small>
              </li>
              <li
                className={activeTab === 'delete' ? 'active' : ''}
                onClick={() => setActiveTab('delete')}
              >
                <span>DELETE</span>
                <small>Remove by id</small>
              </li>
            </ul>

            <div className="rest-hint">
              <p>
                Example schema:
              </p>
              <pre>
{`{
  "id": "1",
  "name": "Abishek",
  "age": 24,
  "rating": 8,
  "description": "Dangerous if batted till end of powerplay"
}`}
              </pre>
            </div>
          </aside>

          <main className="rest-main">
            {error && <div className="rest-toast error">{error}</div>}
            {loading && <div className="rest-loading">Talking to the API…</div>}

            <section className="rest-section">
              {activeTab === 'get' && (
                <div className="rest-panel">
                  <div className="rest-panel-header">
                    <h2>All feedbacks</h2>
                    <button className="refresh-btn" onClick={fetchFeedbacks}>
                      Refresh
                    </button>
                  </div>
                  <div className="cards-grid">
                    {feedbacks.map((fb) => (
                      <article
                        key={fb.id}
                        className={
                          'feedback-card' +
                          (highlightId?.toString() === fb.id?.toString()
                            ? ' highlight'
                            : '')
                        }
                      >
                        <header className="card-header">
                          <div>
                            <h3>{fb.name}</h3>
                            <p className="card-sub">
                              Age {fb.age} · Rating {fb.rating}/10
                            </p>
                          </div>
                          <span className="card-id">#{fb.id}</span>
                        </header>
                        <p className="card-description">{fb.description}</p>
                        <footer className="card-footer">
                          <button
                            type="button"
                            className="ghost-btn"
                            onClick={() => handleSelectForEdit(fb)}
                          >
                            Edit via PUT
                          </button>
                        </footer>
                      </article>
                    ))}
                    {feedbacks.length === 0 && !loading && (
                      <p className="empty-text">No feedbacks yet. Try adding one with POST.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'post' && (
                <div className="rest-panel">
                  <h2>Create feedback (POST)</h2>
                  <form className="rest-form" onSubmit={handleCreate}>
                    <div className="field-row">
                      <label>Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Player name"
                      />
                    </div>
                    <div className="field-grid">
                      <div className="field-row">
                        <label>Age</label>
                        <input
                          name="age"
                          type="number"
                          value={form.age}
                          onChange={handleChange}
                          placeholder="24"
                        />
                      </div>
                      <div className="field-row">
                        <label>Rating /10</label>
                        <input
                          name="rating"
                          type="number"
                          min="0"
                          max="10"
                          value={form.rating}
                          onChange={handleChange}
                          placeholder="8"
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <label>Description</label>
                      <textarea
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Dangerous if batted till end of powerplay"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="primary-btn" disabled={loading}>
                        Send POST request
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'put' && (
                <div className="rest-panel">
                  <h2>Update feedback (PUT)</h2>
                  <p className="panel-hint">
                    Tip: click "Edit via PUT" on any card in the GET tab to
                    load it here.
                  </p>
                  <form className="rest-form" onSubmit={handleUpdate}>
                    <div className="field-row">
                      <label>Id to update</label>
                      <input
                        value={editId}
                        onChange={(e) => setEditId(e.target.value)}
                        placeholder="1"
                      />
                    </div>
                    <div className="field-row">
                      <label>Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Player name"
                      />
                    </div>
                    <div className="field-grid">
                      <div className="field-row">
                        <label>Age</label>
                        <input
                          name="age"
                          type="number"
                          value={form.age}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field-row">
                        <label>Rating /10</label>
                        <input
                          name="rating"
                          type="number"
                          min="0"
                          max="10"
                          value={form.rating}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <label>Description</label>
                      <textarea
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="primary-btn" disabled={loading}>
                        Send PUT request
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'delete' && (
                <div className="rest-panel">
                  <h2>Delete feedback (DELETE)</h2>
                  <form className="rest-form" onSubmit={handleDelete}>
                    <div className="field-row">
                      <label>Id to delete</label>
                      <input
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                        placeholder="2"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="danger-btn" disabled={loading}>
                        Send DELETE request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
