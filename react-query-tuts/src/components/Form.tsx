import url from '../helpers/urldata';
import styles from '../styles/components/form.module.scss';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import useDarkLightTheme from '../context/DarkLightContext';

type props = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>,
    err: string,
    isLoading: boolean,
    formHeadText: string,
    children: React.ReactNode,
    width?: "medium" | "full"
}

export default function Form(props: props) {
    const navigate = useNavigate();
    const { theme } = useDarkLightTheme();

    return (
        <form className={clsx(styles.form, props.width?.length ? (props.width === "medium" ? styles.medium : styles.full) : "", theme === "light" && styles.formLight)} onSubmit={props.handleSubmit}>
            <h1>{props.formHeadText}</h1>
            <div className={styles.errmsg}>{props.err}</div>
            {props.children}
            <div className={styles.btngrps}>
                <input type="submit" disabled={props.isLoading} />
                <button type="button" onClick={() => navigate(url.home.value)}>Cancel</button>
            </div>
        </form>
    )
}