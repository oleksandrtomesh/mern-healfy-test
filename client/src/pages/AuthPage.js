import { useContext, useState } from "react"
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { InputField } from "../components/InputField";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    //get data from useHttp hook
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        name: null, lastName: null, dateOfBirth: null, password: null
    })

    //save provided data from form
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value.toLowerCase()})
        clearError()
    }  

    //make register request and after success registration login
    const registerHandler = async () => {
        try{
            await request('/api/auth/register', 'POST', {...form})
            loginHandler()
        } catch(e){}
    }
    //make login request
    const loginHandler = async () => {
        try{
            console.log('inside login handler')
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.id)
        } catch(e){}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card">
                    <div className="card-content black-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <InputField
                                changeHandler={changeHandler}
                                placeholder="First name"
                                name="name"
                                type="text"
                                form={form}/>
                            <InputField
                                changeHandler={changeHandler}
                                placeholder="Last name"
                                name="lastName"
                                type="text"
                                form={form} />
                            <InputField
                                changeHandler={changeHandler}
                                placeholder="Date of birth"
                                name="dateOfBirth"
                                type="date" 
                                min="1910-01-01"
                                max={new Date().toISOString().split("T")[0]}
                                form={form}/>
                            <InputField
                                changeHandler={changeHandler}
                                placeholder="Password"
                                name="password"
                                min="6"
                                type="password"
                                form={form} />
                            {form.password !== null && form.password.length < 6 && <div className="error">Min. password length 6 characters</div>}
                            {!!error && <div className="error">{error}</div>}
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4 margin-right"
                            onClick={loginHandler}
                            disabled={loading || error || Object.keys(form).some(key => !form[key])}>
                                Login
                            </button>
                        <button 
                            className="btn grey lighten-4 black-text"
                            onClick={registerHandler}
                            disabled={loading || Object.keys(form).some(key => !form[key])}>Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}