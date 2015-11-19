/** @jsx element */
import element from 'virtual-element';


export default {
    render({
        props: {
            user,
            onLogout
        }
    }) {
        if(user) {
            return <div class="login-bar">
                Logged in as {user.email}
                &nbsp;|&nbsp;
                <a href="#" onClick={e => {
                    e.preventDefault();
                    onLogout();
                }}>Logout</a>
            </div>;
        }
        
        return <div/>;
    }
}