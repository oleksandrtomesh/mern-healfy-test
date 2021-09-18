
export const InputField = ({changeHandler, placeholder, name, type, min = 0, max = 0, form}) => {
    return <div className="input-field">
        <input
            id={name}
            type={type}
            name={name}
            onChange={changeHandler}
            className={`validate ${form[name] !== null && form[name].length >= min ? 'valid' : 'invalid'}`}
            min={min}
            max={max}
            required
        />
        <label htmlFor={name}>{placeholder}</label>
    </div>
}