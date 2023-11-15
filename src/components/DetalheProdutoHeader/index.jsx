/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './DetalheProdutoHeader.module.css';

import { AiOutlineArrowLeft } from "react-icons/ai";
import map from '../../assets/icons/map.png';

import { useContext } from "react";
import { TemaContext } from "../../contexts/globalContext";

export function DetalheProdutoHeader( { produto }) {    

    const { tema } = useContext(TemaContext);

    return(
        <>
            <div className={`${styles.headerContainer} ${tema ? '' : styles.darkModeHeader}`}>
                
                <div className={styles.headerConteudo}>
                    <span> {produto.category} </span>
                    <h2> {produto.title} </h2>
                </div>

                <Link to='/' className={styles.headerButton}> 
                    <AiOutlineArrowLeft size={32}/> 
                </Link>
                
            </div>
            
            <div className={`${styles.locationContainer} ${tema ? '' : styles.darkModeLocation}`}>

                <div className={styles.locationHeader}>
                    <img src={map} alt="" />
                    <p className={styles.localizacao}>
                        {produto.location}
                    </p>
                </div>
    
                <div className={styles.locationClassificacao}>
                    <p className={styles.classificacao}> Muito Bom <strong>8</strong></p>
                </div>
    
            </div>
        </>
        
    )
}