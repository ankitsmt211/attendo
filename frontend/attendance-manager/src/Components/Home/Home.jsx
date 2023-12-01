import '../Home/Home.css'

export default function Home(){
    return <>
    <Login/>
    </>
}

function Login(){
    return<>
    <div id="form-container">
    <form>
        <div id="input-container">
            <div className='field-container'>
            <label htmlFor="username">username</label>
            <input type="text" name="username"/>
            </div>

            <div className='field-container'>
            <label htmlFor="password">password</label>
            <input type="password" name="password"/>
            </div>

        </div>
        <div id="button-container">
            <button type="submit">Login</button>
            <button type="button">Register</button>
        </div>
    </form>
    </div>
    </>
}