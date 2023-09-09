import headerLogo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="header page__section">
            <img src={headerLogo} alt="Логотип" className="logo"/>
        </header>
    );
}
