import AdminLogin from './jwt-token/AdminLogin';
import CreateAdmin from './jwt-token/CreateAdmin';
import UpdateProfile from './jwt-token/UpdateProfile';


export default function JwtToken() {
    return (
        <>
            <div className='w-full'>
                {/* <CreateAdmin /> */}
                {/* <AdminLogin /> */}
                <UpdateProfile />
            </div>
        </>
    )
}
