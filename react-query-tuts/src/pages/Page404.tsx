import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/pages/404.module.scss';

export default function Page404() {
    const navigate = useNavigate();
    return (
        <div className={styles.page404}>
            <p>OOPS! Requested page not found.</p>
            <div className={styles.btns}>
                <button onClick={() => navigate(-1)}>Go Back</button>
                <Link to="/" replace>Go Home</Link>
            </div>
        </div>
    )
}