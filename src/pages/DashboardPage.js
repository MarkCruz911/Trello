import React, {useEffect, useState} from 'react';
import DB from "../firebase/FirestoreProvider";
import UseAuth from "../middlewares/UseAuth";
import Modal from "./Modal";
import authProvider from "../firebase/AuthProvider";

import {Link} from "react-router-dom";


function DashboardPage(props) {

    const auth = UseAuth();
    const [boards, setBoards] = useState([]);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        if(auth.user) DB.initBoards(setBoards,auth.user.email);
    }, [auth.user]);




    return (
        <div className={'bg-blue-50 min-h-screen'}>
            <header>
                <div className={'h-16 bg-white shadow-lg flex justify-between items-center px-5'}>
                    <h1 className={'text-xl font-medium'}>{'Tableros'}</h1>
                    <button className={'order-last border rounded p-2 hover:shadow-lg'}
                    onClick={e=>{authProvider.logout(auth.setUser)}}>{'Cerrar sesión'}</button>
                </div>
            </header>
            <div className={'flex flex-col justify-center m-10 space-y-10'}>

                <div className={'flex justify-center'}>
                    <button className={'rounded p-2 hover:shadow-lg bg-blue-500 text-white font-medium'}
                            onClick={e => setModal(true)}>{'Crear nuevo'}</button>
                </div>
                <div className={'grid grid-cols-5 gap-4'}>
                    {
                        boards.map((board, index) => {
                            return  <Link  key={index} to={{pathname:`/board/${board.name}`,state:{boardId:board.id}}} onClick={e =>DB.stop()}>
                             <div className={'bg-white h-48 flex justify-center items-center shadow-lg rounded hover:bg-gray-200'}>
                                 <h2 className={'text-xl order-none capitalize font-medium pt-5'}>{board.name}</h2>
                             </div>
                            </Link>
                        })
                    }
                </div>
            </div>
            {modal && <Modal title={'Crear Tablero'} setModal={setModal} value={false}>
                <form className={'w-full p-5 flex flex-col justify-center space-y-2'}
                      onSubmit={e => {e.preventDefault();DB.createBoards(e.target.name.value, auth.user);setModal(false)}}>
                    <div>
                    <label>Nombre</label>
                    <input className={'w-full'} type="text" id={'name'}/>
                    </div>
                    <div className={'flex justify-center'}>
                    <button className={'rounded p-2 hover:shadow-lg bg-blue-500 text-white font-medium'}>{'Crear'}</button>
                    </div>
                </form>
            </Modal>}
        </div>
    );
}

export default DashboardPage;