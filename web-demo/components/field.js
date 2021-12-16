export default function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  required,
  accept,
  onChange,
}) {
  return (
    <div>
      <label id={`${id}-label`} htmlFor={[name, 'input'].join('-')}>
        {label}
        {' '}
        {required ? <span title="Required">*</span> : undefined}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={`${id}-input`}
        name={name}
        required={required}
        type={type}
        accept={accept}
        onChange={onChange}
      />
    </div>
  )
}
