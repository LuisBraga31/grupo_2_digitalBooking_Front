import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemaContext } from '../../contexts/globalContext';

import styles from './ReservaForm.module.css';
import './calendarioSelect.css';
import { IoIosStar } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import map from '../../assets/icons/map.png';

import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { api } from '../../services/api';

export function ReservaFormulario( {id, nome, tipoCategoria, tipoCidade, imagens, reservas}) {
    
    const { tema } = useContext(TemaContext);
    const navigate = useNavigate();

    const [selectedHour, setSelectedHour] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const estaLogado = !!localStorage.getItem("token");
    const token = estaLogado ? localStorage.getItem("token") : null;
    const usuarioData = token ? jwtDecode(token) : null;

    const qtdEstrelas = new Array(5).fill(null);
    const [ horariosArray ] = useState(Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`));
    
    const [datasindisponiveis, setDatasIndisponiveis] = useState([]);

    const getDiasEntreDatas = (dataInicial, dataFinal) => {
      const datas = [];
    
      const dataAtual = new Date(dataInicial);
      const dataFim = new Date(dataFinal);

      dataAtual.setDate(dataAtual.getDate() + 1);
      dataFim.setDate(dataFim.getDate() + 1);

      while (dataAtual <= dataFim ) {
        if (!datas.includes(dataAtual.toDateString())) {
          datas.push(dataAtual.toDateString());
        }
        dataAtual.setDate(dataAtual.getDate() + 1);
      }
    
      return datas;
    };

    const desabilitarDatas = ({ date }) => {
        const dataAtual = new Date();
        const dataAnterior = date < dataAtual;
        const dataEspecifica = datasindisponiveis.some(dataEspecifica => dataEspecifica === date.toDateString());
        return dataAnterior || dataEspecifica;
      };

    const selectHour = (event) => {
        setSelectedHour(event.target.value); 
    };

    const handleDateChange = (date) => {
        setCheckIn(date[0]);
        setCheckOut(date[1]);
    };

    const handleReservaForm = async (e) => {
        e.preventDefault();
        
        if (!checkIn && !checkOut) {
            alert('Selecione um intervalo de datas válido.');
            return;
        } 

        const formInfoPost = {
            horaInicio: selectedHour+":00",
            dataInicio: checkIn.getFullYear() + "-" +  (checkIn.getMonth()+1).toString().padStart(2, "0") + "-" + checkIn.getDate().toString().padStart(2, "0"),
            dataFinal: checkOut.getFullYear() + "-" +  (checkOut.getMonth()+1).toString().padStart(2, "0") + "-" + checkOut.getDate().toString().padStart(2, "0"),
            status: "VAIVIAJAR",
            produtosId: id,
            usuariosId: usuarioData.id
        };
        
        try {        
            const response = await api.post('/v1/reservas' , formInfoPost, 
            {
              headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });


            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Muito Obrigado!',
                    background: `${tema ? '#F3F1ED' : '#112'}`,
                    color: `#1DBEB4`,
                    html: `<span style='color: ${tema ? '#000' : '#FFF'} ;'>Sua reserva foi feita com sucesso!</span>`,
                    confirmButtonColor: '#1DBEB4',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    } else {
                        navigate('/');
                    }
                })  
            }    
          
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const datasReservas = [];
        for(let i = 0; i < reservas.length; i++) {
          const testes = getDiasEntreDatas(reservas[i].dataInicio, reservas[i].dataFinal);
          datasReservas.push(testes)
        }
        setDatasIndisponiveis(datasReservas.flat(1))
    }, [reservas]);

    return (
        <form className={`${styles.reservaForm} ${tema ? '' : styles.darkMode}`} onSubmit={handleReservaForm}>

            <div className={`${styles.reservaFormLeft} ${tema ? '' : styles.darkMode}`}>
                <h1 className={styles.titleReserva}> Seus dados </h1>
                
                <div className={styles.input}>
                    
                    <div className={styles.inputItem}>
                        <label htmlFor="" >Nome</label>
                        <input type="text" placeholder={estaLogado ? usuarioData.nome : 'Nome'} disabled/>
                    </div>

                    <div className={styles.inputItem}>
                        <label htmlFor="">Sobrenome</label>
                        <input type="text" placeholder={estaLogado ?  usuarioData.sobrenome : 'Sobrenome'} disabled/>
                    </div>

                    <div className={styles.inputItem}>
                        <label htmlFor="">E-mail</label>
                        <input type="text" placeholder={estaLogado ? usuarioData.sub : 'Email'} disabled/>
                    </div>

                    <div className={styles.inputItem}>
                        <label htmlFor=""> Função </label>
                        <input type="text" placeholder={estaLogado ? usuarioData.role : 'Função'} disabled/>
                    </div>

                </div>

                <div className={styles.calendarioForm}>
                    <h1 className={styles.calendarioFormTitle}> Selecione sua data de reserva </h1>
                    <Calendar
                        className={styles.calendarForm}
                        onChange={handleDateChange}
                        showDoubleView
                        tileDisabled={desabilitarDatas}
                        showNavigation={true}
                        selectRange={true}
                    />
                    <Calendar
                        className={styles.calendarFormMobile}
                        onChange={handleDateChange}
                        tileDisabled={desabilitarDatas}
                        showNavigation={true}
                        selectRange={true}
                    />
                </div>


                <div className={styles.horaChegadaForm}>
                    <h1 className={styles.horaFormTitle}> Seu horário de chegada </h1>
                    
                    <div className={styles.horaFormBody}>
                        
                        <div className={styles.horaFormCheckText}> 
                            <FaRegCheckCircle size={28}/> 
                            <p> Seu quarto estará pronto para check-in entre 10h00 e 23h00</p> 
                        </div>
                        
                        <label htmlFor="hourOptions" className={styles.horaFormLabel}> Indique a sua hora prevista de chegada </label>
                        
                        <select id="hourOptions" value={selectedHour} onChange={selectHour} type="text" className={styles.horaFormSelect} required> 
                            <option value="" disabled hidden> Selecione a sua hora de chegada </option>
                            {horariosArray.map((horario, index) => (
                                <option key={index} value={horario}>
                                    {horario}
                                </option>
                            ))}
                        </select>
                         
                    </div>
                </div>

            </div>

            <div className={`${styles.reservaFormRight} ${tema ? '' : styles.darkMode}`} >
                <div className={styles.reservaInfos}>
                    
                    <h1 className={styles.reservaTitle}> Detalhe da Reserva </h1>
                    
                    <div className={styles.reservaDetails}>
                        
                        <div className={styles.reservaDetailsImage}>
                            {imagens[0] && <img src={imagens[0].url} className={styles.imageReserva} alt="" />}
                        </div>
                        
                        <div className={styles.reservaDetailsBody}>
                            
                            <div className={styles.reservaHeaderInfo}>
                                <span> {tipoCategoria.nome.toUpperCase()} </span>
                                <h3> {nome} </h3>
                                <div> {qtdEstrelas.map((_, index) => ( <IoIosStar key={index} className={styles.star} size={14}/>  ))}  </div>
                                <div className={styles.reservaLocation}>
                                    <img src={map} alt=""/>
                                    <p className={styles.localizacao}> {tipoCidade.nome} - {tipoCidade.pais}</p>
                                </div>
                            </div>

                            <div className={`${styles.check} ${styles.checkTop}`}>
                                <p>Check in</p>
                                <span>
                                    {checkIn ? checkIn.getDate().toString().padStart(2, "0") : '__'} / {checkIn ? (checkIn.getMonth() + 1).toString().padStart(2, "0") : '__'} / {checkIn ? checkIn.getFullYear() : '__'}
                                </span>   
                            </div>

                            <div className={styles.check}>
                                <p>Check out</p>
                                <span>
                                    {checkOut ? checkOut.getDate().toString().padStart(2, "0") : '__'} / {checkOut ? (checkOut.getMonth() + 1).toString().padStart(2, "0") : '__'} / {checkOut ? checkOut.getFullYear() : '__'}
                                </span>   
                            </div>

                            <button className={styles.botaoReserva}>Confirmar Reserva</button>

                        </div>

                    </div>
                    
                </div>
            </div>

        </form>
    )
}