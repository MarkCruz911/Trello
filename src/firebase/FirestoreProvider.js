import React, {useState} from 'react';
import {db} from "../firebase/firebaseConfig";
import {Timestamp,collection,deleteDoc, getDocs, doc, setDoc, addDoc, onSnapshot, query, where,orderBy,updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

let unsubscribe;
const initBoards=(setBoards,email)=>{
    const q = query(collection(db, "boards"),where("participantsEmail", "array-contains",email),orderBy("timeStamp", "desc"));
    unsubscribe=onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(),id:doc.id});
        });
        setBoards(items);
        console.log(items);
    });
};

const stop=()=>{
    return unsubscribe();
}

const createBoards=(name,user)=>{
    addDoc(collection(db, "boards"), {
        name:name,
        ownerId: user.uid,
        participantsEmail: [user.email],
        timeStamp: Timestamp.fromMillis(
            Date.parse((new Date()).toISOString()))
    });
};

const getBoard=(setBoard,boardId)=>{
    onSnapshot(doc(db, "boards", boardId), (doc) => {
        setBoard(doc.data());
    });
}

const deleteBoard=(documentId)=>{
    return deleteDoc(doc(db, "boards", documentId));
}

const addParticipant=(email, boardId)=>{
    updateDoc(doc(db, "boards", boardId), {
        participantsEmail: arrayUnion(email)
    });
}
const removeParticipant=(email, boardId)=>{
    updateDoc(doc(db, "boards", boardId), {
        participantsEmail: arrayRemove(email)
    });
}


const initBoxes=(setBoxes,boardId)=>{
    const q = query(collection(db, "boards",boardId,"boxes"),orderBy("id", "asc"));
    unsubscribe=onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(),docId:doc.id});
        });
        setBoxes(items);
        console.log(items)
    });
};
const createBox=(boardId,box)=>{
    addDoc(collection(db, "boards",boardId,"boxes"),box);
};
const updateBox=(boardId,box)=>{
    updateDoc(doc(db, "boards",boardId,"boxes",box.docId),box);

    //eliminar flechas tambien
}
const deleteBox=(boardId,docId,boxId)=>{
    console.log(boxId);
    const qStart = query(collection(db, "boards",boardId,"arrows"), where('start', '==', boxId));
    const qEnd = query(collection(db, "boards",boardId,"arrows"), where('end', '==', boxId));
    let finished=false;
    getDocs(qStart).then((snapshots)=>{
        snapshots.forEach((doc)=>{
            deleteDoc(doc.ref);
        });
        if (finished)deleteDoc(doc(db, "boards",boardId,"boxes",docId));
        else finished=!finished;
    });
    getDocs(qEnd).then((snapshots)=>{
        console.log(snapshots.docs.length);
        snapshots.forEach(doc=>{
            deleteDoc(doc.ref);
        });
        if (finished)deleteDoc(doc(db, "boards",boardId,"boxes",docId));
        else finished=!finished;
    });
}


const initArrows=(setArrows,boardId)=>{
    const q = query(collection(db, "boards",boardId,"arrows"),orderBy("id", "asc"));
    unsubscribe=onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(),docId:doc.id});
        });
        setArrows(items);
    });
};
const createArrow=(boardId,box)=>{
    addDoc(collection(db, "boards",boardId,"arrows"),box);
};
const updateArrow=(boardId,box)=>{
    updateDoc(doc(db, "boards",boardId,"arrows",box.docId),box);
}
const deleteArrow=(boardId,boxId)=>{
    deleteDoc(doc(db, "boards",boardId,"arrows",boxId));
}



const DB ={
    initBoards,
    createBoards,
    getBoard,
    deleteBoard,
    stop,
    addParticipant,
    removeParticipant,
    initBoxes,
    createBox,
    updateBox,
    deleteBox,
    initArrows,
    createArrow,
    updateArrow,
    deleteArrow
}


export default DB;