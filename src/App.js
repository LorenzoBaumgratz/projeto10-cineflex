import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {
    const [info, setInfo] = useState([]);
    const [reservar, setReservar] = useState([])
    const [nome, setNome] = useState([]);
    const [cpf, setCpf] = useState([]);
    const [reservarNum,setReservarNum]=useState([])

    function reset(){
        setReservarNum([]);
        setReservar([]);
    }

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage info={info} setInfo={setInfo} reservar={reservar} setReservar={setReservar} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} reservarNum={reservarNum} setReservarNum={setReservarNum}/>} />
                <Route path="/sucesso" element={<SuccessPage info={info} reservar={reservar} nome={nome} cpf={cpf} reservarNum={reservarNum} reset={reset}/>} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
