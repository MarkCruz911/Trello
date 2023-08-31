import React from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';


function Arrow(props) {

    function handleCLick() {
        props.setAction('');
        props.setShowOptions({box:false,arrow:!props.showOptions.arrow});
        props.setSelected({id:props.id, start:props.start, end:props.end,
            dotted:props.dotted, label: props.label,type:'arrow',docId:props.docId});
    }

    const passProps={
        onClick: () => handleCLick(),
        cursor: 'pointer'
    }


    return (
        <Xarrow dashness={props.dotted} path={'straight'} strokeWidth={2} labels={{ middle: props.label }}
                start={props.start} end={props.end} passProps={passProps} color={'gray'}/>

    );
}

export default Arrow;