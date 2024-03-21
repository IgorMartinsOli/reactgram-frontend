import "./EditProfile.css";
import { upload } from "../../utils/config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profile, resetMessage } from "../../slices/userSlice";
import Message from "../../components/Message";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user || {});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    console.log(user);
    // Load user data
    useEffect(async () => {
        await dispatch(profile());
    }, [dispatch]);

    // fill user form
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
    }

    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre voce...</p>
            {console.log(user.profileImage, previewImage)}
            {(user.profileImage || previewImage) && (
                <img 
                    src={previewImage || `${upload}/users/${user.profileImage}`} 
                    alt={name}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    type='email' 
                    placeholder='E-mail' 
                    disabled 
                    value={email} 
                />
                <label>
                    <span>Imagem do perfil</span>
                    <input 
                        type='file'
                        onChange={handleFile}
                    />
                </label>
                <label>
                    <span>Bio:</span>
                    <input 
                        type='text' 
                        placeholder='Fale mais sobre voce...' 
                        onChange={(e) => setBio(e.target.value)} 
                        value={bio}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input 
                        type='password' 
                        placeholder='Nova senha' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                    />
                </label>
                <input type='submit' value='Salvar'/>
            </form>
        </div>
    )
};

export default Profile;
