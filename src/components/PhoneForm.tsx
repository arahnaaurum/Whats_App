import { Dispatch, SetStateAction, useState } from "react";
import '../index.css';

type PhoneFormProps = { setChatId: Dispatch<SetStateAction<string>>; }

function PhoneForm({ setChatId }: PhoneFormProps): JSX.Element {
    const [phone, setPhone] = useState<string>('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            let chatId = phone + '@c.us';
            setChatId(chatId);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Введите номер телефона собеседника</h4>
            <label className='form_group'>
                <input
                    name='id'
                    type='text'
                    className='input'
                    title='Номер должен начинаться с 7. Вводите только цифры, без знаков и пробелов'
                    placeholder='70123456789'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    pattern='^(7)[0-9]{10}'
                    required
                />
                <button type='submit' className='btn'>
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path className="btn_svg" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                </button>
            </label>
        </form>
    )
}

export default PhoneForm;