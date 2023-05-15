import { Dispatch, SetStateAction, useState } from "react";
import '../index.css';

type LoginFormProps = {
    setIdInstance: Dispatch<SetStateAction<string>>;
    setApiTokenInstance: Dispatch<SetStateAction<string>>;
}

function LoginForm({ setIdInstance, setApiTokenInstance }: LoginFormProps): JSX.Element {
    type initialStateType = {
        id: string;
        api: string;
    }
    const initialState = {
        id: '',
        api: '',
    }
    const [formData, setFormData] = useState<initialStateType>(initialState);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            setIdInstance(formData.id);
            setApiTokenInstance(formData.api);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label className="form_group">
                <h4>Введите IdInstance</h4>
                <input
                    name='id'
                    type='text'
                    className="input"
                    placeholder="IdInstance"
                    value={formData.id}
                    onChange={handleChange}
                    pattern={"[0-9]*"}
                    required
                />
            </label>
            <label className="form_group">
                <h4>Введите ApiTokenInstance</h4>
                <input
                    name='api'
                    type='text'
                    className="input"
                    placeholder="ApiTokenInstance"
                    value={formData.api}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit" className="btn">
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path className="btn_svg" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
            </button>
        </form>
    )
}

export default LoginForm;