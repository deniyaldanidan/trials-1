import clsx from 'clsx';
import { FaFacebook, FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const basicFooterMenuClassNames = "text-lg text-secForeground hover:text-accent duration-150 ease-in-out cursor-pointer";
const basicFooterMenusClassNames = "flex justify-center items-center gap-x-6"


export default function Footer() {

    return (
        <footer className="px-myspace py-7 border-t-[1.5px] border-t-border">
            <div className="flex justify-evenly items-center gap-x-8">
                <div className="flex flex-col items-center justify-center text-xl text-center font-serif text-primary"><span>Pixel</span><span>Ratings</span></div>
                <div className={clsx(basicFooterMenusClassNames)}>
                    <Link className={clsx(basicFooterMenuClassNames)} to="/">Home</Link>
                    <Link className={clsx(basicFooterMenuClassNames)} to="/privacy-policy">Privacy Policy</Link>
                    <Link className={clsx(basicFooterMenuClassNames)} to="/terms-n-conditions">Terms & Conditions</Link>
                    <Link className={clsx(basicFooterMenuClassNames)} to="/cookie-policy">Cookie Policy</Link>
                </div>
                <div className={clsx(basicFooterMenusClassNames)}>
                    <FaFacebook className={clsx(basicFooterMenuClassNames)} />
                    <FaSquareInstagram className={clsx(basicFooterMenuClassNames)} />
                    <FaSquareXTwitter className={clsx(basicFooterMenuClassNames)} />
                </div>
            </div>
            <div className="text-base text-center mt-5 text-secForeground">
                &copy; Copyright 2023.
            </div>
        </footer>
    )
}