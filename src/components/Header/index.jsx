import { IoMenu } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from "react";

import styles from './Header.module.css';

export default function Header() {

    const loginData = localStorage.getItem("isLogin");

    const [login, setLogin] = useState(loginData ? JSON.parse(loginData) : true);
    const [menuLateral, setMenuLateral] = useState(false);

    const showMenu = () => setMenuLateral(!menuLateral);

    const logout = () => {
        setLogin(true);
        localStorage.removeItem('isLogin');
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
               <Link to='/'> <div className={styles.image}> </div> </Link> 
            </div>

            { login ? (
            
            <div className={styles.loginBotoes}>
                <Link to='/form'><button className={styles.button}> Criar Conta </button></Link>
                <Link to='/login'><button className={styles.button}> Iniciar Sessão </button></Link>
            </div>

            ) : (
            <div className={styles.loginArea}>
                <div className={styles.loginAvatar}> DB </div>
                <div className={styles.loginText}> 
                    <p> Olá, </p>
                    <strong> Deborah Borges </strong>
                </div>
                <button className={styles.buttonLogout} onClick={logout}> Logout </button>
            </div>
            )

            }

            <div className={styles.menuHamburger}>
                <IoMenu className={styles.menu} size={28} onClick={showMenu}/>
            </div>

            <nav className={ menuLateral ? `${styles.menuLateral} ${styles.ativo}` : styles.menuLateral}>
                
                <div className={styles.menuHeader}>
                    <GrClose className={styles.closeButton} size={22} onClick={showMenu}/>
                    
                    { login ? (
                        <h4 className={styles.menuHeaderTitle}> MENU </h4>
                    ) : (
                        <div className={styles.menuHeaderLogado}>
                            <div className={styles.menuAvatar}> DB </div>
                            <div className={styles.menuText}> 
                                <p> Olá, </p>
                                <strong> Deborah Borges </strong>
                            </div>  
                        </div>
                    )}
                    
                </div>

                <div className={styles.menuBody}>
                    
                    { login ? (
                    
                    <div className={styles.menuButtons}>
                        <Link to="/form "> <button className={styles.buttonItem}> Criar Conta </button> </Link>
                        <hr color="black" width="90%" size="1" className={styles.linha}/>
                        <Link to="/login"> <button className={styles.buttonItem}>  Iniciar Sessão </button> </Link>
                    </div>
                    
                    ) : (
                    <div className={styles.menuBodyLogado}> 
                        <p> Deseja <span onClick={logout}> encerrar a sessão </span> ? </p>
                        <hr color="black" width="100%" size="1" />
                    </div>
                    )}

                    <div>
                        <ul className={styles.menuFooterLista}>
                            <li>
                                <FaFacebook size={24}/>
                            </li>
                            <li>
                                <FaInstagram size={24}/>
                            </li>
                            <li>
                                <FaLinkedin size={24}/>
                            </li>
                            <li>
                                <FaTwitter size={24}/>
                            </li>
                        </ul>
                    </div>

                </div>   

            </nav>

        </header>
    )

}