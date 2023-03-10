import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage(props) {
    const params = useParams()
    const [assentos, setAssentos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`);
        promise.then((res) => {
            props.setInfo(res.data)
            setAssentos(res.data.seats)
            console.log("info",res.data)
        });
        promise.catch((err) => console.log(err));

    }, [])
    if (props.info.length === 0 || assentos.length === 0) {
        return (
            <div>carregando</div>
        )
    }

    function selecionarAssento(i) {
        if (i.isAvailable === false) {
            alert("Esse assento não está disponível");
        } else {
            if (props.reservar.includes(i.id) === true) {
                const newArr = props.reservar.filter((item) => item !== i.id);
                props.setReservar(newArr);
                console.log("Novo arr de ID", newArr);

                const newArrNum = props.reservarNum.filter((item) => item !== i.name);
                props.setReservarNum(newArrNum);
                console.log("Novo arr num", newArrNum);
            } else {
                props.setReservar([...props.reservar, i.id]);
                console.log("array reservados ID", [...props.reservar, i.id])

                props.setReservarNum([...props.reservarNum, i.name]);
                console.log("array reservados num", [...props.reservarNum, i.name])
            }
        }
    }

    function formulario(e) {
        e.preventDefault();
        console.log("Nome", props.nome);
        console.log("CPF", props.cpf);
        console.log("array reservados submit", props.reservar);

        const post = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
            {
                ids: props.reservar,
                name: props.nome,
                cpf: props.cpf
            }
        )
        post.then((res)=>navigate("/sucesso"));

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((a) =>
                    <SeatItem onClick={(() => selecionarAssento(a))} estado={a.isAvailable} assentos={props.reservar} numero={a.id} data-test="seat">{a.name}</SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle marcador="selecionado" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle marcador="disponivel" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle marcador="indisponivel" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={formulario}>
                    Nome do Comprador:
                    <input type="text" placeholder="Digite seu nome..." data-test="client-name" required value={props.nome} onChange={e => props.setNome(e.target.value)} />

                    CPF do Comprador:
                    <input type="number" placeholder="Digite seu CPF..." data-test="client-cpf" required value={props.cpf} onChange={e => props.setCpf(e.target.value)} />

                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={props.info.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{props.info.movie.title}</p>
                    <p>{props.info.day.weekday} - {props.info.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => {
        if (props.marcador === "selecionado")
            return "#0e7d71"
        if (props.marcador === "disponivel")
            return "#7b8b99"
        if (props.marcador === "indisponivel")
            return "#f7c52b"
    }};         // Essa cor deve mudar
    background-color: ${props => {
        if (props.marcador === "selecionado")
            return "#1aae9e"
        if (props.marcador === "disponivel")
            return "#c3cfd9"
        if (props.marcador === "indisponivel")
            return "#fbe192"

    }};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => {
        if (props.assentos.includes(props.numero) === true && props.estado === true)
            return "#0e7d71"
        if (props.assentos.includes(props.numero) === false && props.estado === true)
            return "#7b8b99"
        if (props.estado === false)
            return "#f7c52b"

    }};          // Essa cor deve mudar
    background-color: ${props => {
        if (props.assentos.includes(props.numero) === true && props.estado === true)
            return "#1aae9e"
        if (props.assentos.includes(props.numero) === false && props.estado === true)
            return "#c3cfd9"
        if (props.estado === false)
            return "#fbe192"

    }};     
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`