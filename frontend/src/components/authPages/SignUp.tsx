export default function SignUpForm(){
    return(
        <div>
            <form action="">
                <label htmlFor="">Name:</label>
                <input type="text" placeholder="Enter your name" />
                <label htmlFor="">Email:</label>
                <input type="Email" placeholder="Enter email"/>
                <label htmlFor="">Password:</label>
                <input type="password" placeholder="Enter password"/>

                <button>Submit</button>
            </form>
        </div>
    )
}