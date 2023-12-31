import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TemaContext } from "../../contexts/globalContext";
import Swal from 'sweetalert2';

import styles from "./Formulario.module.css";
import { api } from "../../services/api";

export default function Formulario() {

  const { tema } = useContext(TemaContext);

  const navigate = useNavigate();
  
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome:'',
    email: '',
    senha: '',
    repetirSenha: '',
  });

  const handleForm = async (e) => {
    e.preventDefault()

    if (validForm()) {
      
        try {
          const response = await api.post('/v1/authentication/register' , { 
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            email: formData.email, 
            senha: formData.senha, 
            role: "USER" 
          }, 
          {
            headers: {
              'Content-Type' : 'application/json',
              'Accept': 'application/json',
            },
          });

          if(response.status === 201) {
            
            localStorage.setItem('token', response.data.jwt);
            
            Swal.fire({
              title: "Cadastro realizado com sucesso!",
              background: `${tema ? '#F3F1ED' : '#1f242d'}`,
              color: `${tema ? '#000' : '#FFF'}`,
              confirmButtonColor: '#1DBEB4',
              icon: "success"
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/');
              } else {
                navigate('/');
              }
            });
          } 

        } catch (error) {
          setErrorForm(true);
        } 

    } else {
      return null;
    }

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  }

  const validForm = () => {
    let errors = {};
    
    if(formData.nome.trim() === '') {
     errors.nome='O nome é obrigatório!'; 
    }
    if(formData.sobrenome.trim() === '') {
      errors.sobrenome='O sobrenome é obrigatório!'; 
    }
    if(formData.email.trim() === '') {
      errors.email='O email é obrigatório!'; 
    }
    if(formData.senha.length < 6) {
      errors.senha='A senha tem que ter mais de 6 caracteres'; 
    }
    if(formData.repetirSenha != formData.senha) {
      errors.repetirSenha='Senhas não conferem!'; 
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
    
  }

  
  return (
    <div className={styles.container}>

      <h1 className={styles.titulo}>Criar conta</h1>

      <form className={`${styles.form} ${tema ? '' : styles.darkMode}`} onSubmit={handleForm}>

        <div className={styles.divInputs}>

          <div className={formErrors.nome ? `${styles.campoTexto} ${styles.error}` : `${styles.campoTexto}`}>
            <label htmlFor="">Nome</label>
            <input
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
            />
            {formErrors.nome && <span>{formErrors.nome}</span>}
          </div>

          <div className={formErrors.sobrenome ? `${styles.campoTexto} ${styles.error}` : `${styles.campoTexto}`}>
            <label htmlFor="">Sobrenome</label>
            <input
              name="sobrenome"
              type="text"
              value={formData.sobrenome}      
              onChange={handleChange}
            />
            {formErrors.sobrenome && <span>{formErrors.sobrenome}</span>}
          </div>

        </div>

        <div className={formErrors.email ? `${styles.campoTexto} ${styles.error}` : `${styles.campoTexto}`}>
          <label htmlFor="">E-mail</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>

        <div className={formErrors.senha ? `${styles.campoTexto} ${styles.error}` : `${styles.campoTexto}`}>
          <label htmlFor="">Senha</label>
          <input
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
          />
          {formErrors.senha && <span>{formErrors.senha}</span>}
        </div>

        <div className={formErrors.senha || formErrors.repetirSenha ? `${styles.campoTexto} ${styles.error}` : `${styles.campoTexto}`}>
          <label htmlFor="">Confirmar senha</label>
          <input
            name="repetirSenha"
            type="password"
            value={formData.repetirSenha}
            onChange={handleChange}
          />
          {formErrors.repetirSenha && <span>{formErrors.repetirSenha}</span>}
        </div>

        <button className={styles.botao} type="submit">
          Criar conta
        </button>

        <p className={styles.paragrafo}>Já tem uma conta? <Link to='../login' >Iniciar sessão</Link></p>
      </form>
    </div>
  );
}