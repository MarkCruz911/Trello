import React, {useEffect, useState} from 'react';
import {useXarrow} from "react-xarrows";
import Draggable from "react-draggable";
import DB from "../firebase/FirestoreProvider";
import {useLocation} from "react-router-dom";


function Box(props) {
    const location = useLocation();

        const updateXarrow = useXarrow();
        const [controlledPosition,setControlledPosition]=useState({
                x: props.posX, y: props.posY
        });

        useEffect(()=>{
            setControlledPosition({x: props.posX, y: props.posY});
        },[props.posX,props.posY]);



        const onControlledDrag = (e, position) => {
            let {x, y} = position;
            setControlledPosition({x, y});
        };
        const onStart = () => {
        };

        const onStop = () => {
            const box={id:props.id,x:controlledPosition.x,y:controlledPosition.y,
                boxType:props.boxType,title:props.title,content:props.content,type:'box',docId:props.docId};
            DB.updateBox(location.state.boardId,box)
        };

        const dragHandlers = {onStart: onStart, onStop: onStop, onDrag:onControlledDrag};

    function createBox() {
        if(props.boxType==='person'){
            return(
                <div className={props.action.name==='addArrow'?props.selected.id!==props.id?'personSelected':'person':'person'}  id={props.id}>
                    <div className={'rounded-full w-10 h-10 bg-blue-700'}></div>
                    <div className={'rounded w-full bg-blue-700 p-5 -mt-2 text-center'}>

                    <p className={'title'}>{props.title}</p>
                    <p >{props.content}</p>
                    </div>

                </div>
             /*   <div className={'rounded text-white flex flex-col justify-center items-center w-auto max-w-xs'} id={props.id}>
                    <p className={'rounded bg-blue-700 p-5 -mt-2 text-center'}>
                        <p className={'title'}>{props.title}</p>
                        <p >{props.content}</p>
                    </p>
                </div>*/
            )
        }

        if(props.boxType==='system'){
               return(
                   <div className={props.action.name==='addArrow'?props.selected.id!==props.id?'systemSelected':'system':'system'}  id={props.id}>
                       <p className={'title'}>{props.title}</p>
                       <p >{props.content}</p>
                   </div>
               )
        }
        if(props.boxType==='container'){
            return(
                <div className={props.action.name==='addArrow'?props.selected.id!==props.id?'containerSelected':'container':'container'}  id={props.id}>
                    <p className={'title'}>{props.title}</p>
                    <p >{props.content}</p>
                </div>
            )
        }

        if(props.boxType==='database'){
            return(
                <div className={props.action.name==='addArrow'?props.selected.id!==props.id?'cylinderSelected':'cylinder':'cylinder'}  id={props.id}>
                    <p className={'title'}>{props.title}</p>
                    <p className={'text-center text-white'}>{props.content}</p>
                </div>
            )
        }
        if(props.boxType==='component'){
            return(
                <div className={props.action.name==='addArrow'?props.selected.id!==props.id?'componentSelected':'component':'component'}  id={props.id}>
                    <p className={'title'}>{props.title}</p>
                    <p >{props.content}</p>
                </div>
            )
        }

    }

    function nexArrowId() {
        let id = 'arrow-0'
        if (props.arrows.length === 0) return id;
        else {
            const lastBox = props.arrows[props.arrows.length - 1];
            const lastNumber = Number((lastBox.id.split('-'))[1]) + 1;
            return 'arrow-' + lastNumber;
        }
    }

    function handleCLick(e) {
        if(e.button===2) {
            if(props.selected.id===props.id) {
                props.setShowOptions({box:!props.showOptions.box,arrow:false});
                props.setAction('');
            }else{
                props.setSelected({id:props.id,x:controlledPosition.x,y:controlledPosition.y,
                    boxType:props.boxType,title:props.title,content:props.content,type:'box',docId:props.docId});

                props.setShowOptions({box:true,arrow:false});
            }
        }
        if(e.button===0){
            switch (props.action.name) {
                case 'addArrow':
                    if(props.selected.id===props.id){
                        props.setAction('');
                        break;
                    }
                    const newArrow={id:nexArrowId(),start:props.selected.id, end:props.id,
                        dotted:props.action.options.dotted, label:'label',docId:0}

                    DB.createArrow(location.state.boardId,newArrow);

                    props.setArrows([...props.arrows,newArrow]);
                    props.setAction('');
                    break;
                default :
                    props.setAction('');
                    break;
            }

        }
    }

    return (
            <Draggable position={controlledPosition} {...dragHandlers}
                         bounds={{top: 0, left: 0}}
                        onMouseDown={(e)=>handleCLick(e)}>
                {createBox()}
            </Draggable>

        );
}

export default Box;