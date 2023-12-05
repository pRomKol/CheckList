import {ChangeEvent, KeyboardEvent, useState} from "react";




export const FullInput = (props: any) => {
    const [error, setError] = useState< string | null >(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.setNewTaskTitle(e.currentTarget.value);
}
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
        if (e.ctrlKey && e.charCode) {
        if(props.newTaskTitle.trim() !== ''){
            props.addTusk(props.newTaskTitle.trim(), props.id);
            props.setNewTaskTitle('')
        }
    else {
        setError('Title is required')
        }
    }
}
const addTask = () => {
    if (props.newTaskTitle.trim() !== ''){
        props.addTusk(props.newTaskTitle.trim(), props.id);
        props.setNewTaskTitle('')
    }else {
        setError('Title is required')
    }

}
    return (
        <div>
            <input value={props.newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTask}>
                +
            </button>
            {error && <div className='error-message'>
                {error}
            </div>}
        </div>
    );
};

