import { useState } from 'react';

const statuses = ['Applied', 'Interview', 'Selected', 'Rejected'];
const emptyForm = {
  studentName: '',
  email: '',
  jobTitle: '',
  companyName: '',
  applicationDate: new Date().toISOString().slice(0, 10),
  status: 'Applied',
};

function validateForm(form) {
  const errors = {};
  for (const field of ['studentName', 'email', 'jobTitle', 'companyName', 'applicationDate', 'status']) {
    if (!form[field].trim()) errors[field] = 'This field is required.';
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }
  return errors;
}

export default function AddApplication({ draft, onSaved, onSubmit }) {
  const [form, setForm] = useState(() => ({ ...emptyForm, ...draft }));
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSuccess('');
    setSaveError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setSuccess('');
    setSaveError('');
    if (Object.keys(nextErrors).length) return;

    const saved = onSubmit({
      ...form,
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      jobTitle: form.jobTitle.trim(),
      companyName: form.companyName.trim(),
    });
    if (!saved) {
      setSaveError('The application could not be saved. Please try again.');
      return;
    }
    setSuccess('Application saved to your tracker.');
    setForm({ ...emptyForm, applicationDate: new Date().toISOString().slice(0, 10) });
    onSaved();
  }

  return (
    <div className="page form-page">
      <header className="page-title-row">
        <div>
          <p className="eyebrow">YOUR APPLICATIONS</p>
          <h1>Add an application</h1>
          <p className="heading-copy">Capture the details now. You can update your progress later.</p>
        </div>
      </header>
      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <div className="form-intro">
          <div className="form-icon" aria-hidden="true">＋</div>
          <div><h2>Application details</h2><p>Fields marked with <span aria-hidden="true">*</span> are required.</p></div>
        </div>
        <div className="form-grid">
          <label className="form-field">
            <span>Student name <span className="required-mark">*</span></span>
            <input name="studentName" value={form.studentName} onChange={updateField} autoComplete="name" aria-invalid={Boolean(errors.studentName)} aria-describedby={errors.studentName ? 'studentName-error' : undefined} />
            {errors.studentName && <small className="field-error" id="studentName-error">{errors.studentName}</small>}
          </label>
          <label className="form-field">
            <span>Email address <span className="required-mark">*</span></span>
            <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <small className="field-error" id="email-error">{errors.email}</small>}
          </label>
          <label className="form-field">
            <span>Job title <span className="required-mark">*</span></span>
            <input name="jobTitle" value={form.jobTitle} onChange={updateField} aria-invalid={Boolean(errors.jobTitle)} aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined} />
            {errors.jobTitle && <small className="field-error" id="jobTitle-error">{errors.jobTitle}</small>}
          </label>
          <label className="form-field">
            <span>Company name <span className="required-mark">*</span></span>
            <input name="companyName" value={form.companyName} onChange={updateField} aria-invalid={Boolean(errors.companyName)} aria-describedby={errors.companyName ? 'companyName-error' : undefined} />
            {errors.companyName && <small className="field-error" id="companyName-error">{errors.companyName}</small>}
          </label>
          <label className="form-field">
            <span>Application date <span className="required-mark">*</span></span>
            <input name="applicationDate" type="date" value={form.applicationDate} onChange={updateField} aria-invalid={Boolean(errors.applicationDate)} aria-describedby={errors.applicationDate ? 'applicationDate-error' : undefined} />
            {errors.applicationDate && <small className="field-error" id="applicationDate-error">{errors.applicationDate}</small>}
          </label>
          <label className="form-field">
            <span>Application status <span className="required-mark">*</span></span>
            <select name="status" value={form.status} onChange={updateField} aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? 'status-error' : undefined}>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            {errors.status && <small className="field-error" id="status-error">{errors.status}</small>}
          </label>
        </div>
        {success && <p className="form-success" role="status">{success} <a href="#applications">View applications</a></p>}
        {saveError && <p className="form-error-summary" role="alert">{saveError}</p>}
        <div className="form-actions">
          <button className="button button-primary" type="submit">Save application <span aria-hidden="true">→</span></button>
          <a className="button button-quiet" href="#applications">Cancel</a>
        </div>
      </form>
    </div>
  );
}
