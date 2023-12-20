import {ChangeEvent, KeyboardEvent, useState} from "react";

type FullInputPropsType = {
    addItem: (title: string) => void
}


export const FullInput = (props: FullInputPropsType) => {
    const [error, setError] = useState< string | null >(null)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
}
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
        if (e.ctrlKey && e.charCode) {
        if(newTaskTitle.trim() !== ''){
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('')
        }
    else {
        setError('Title is required')
        }
    }
}
const addTask = () => {
    if (newTaskTitle.trim() !== ''){
        props.addItem(newTaskTitle.trim(), );
        setNewTaskTitle('')
    }else {
        setError('Title is required')
    }

}
    return (
        <div>
            <input value={newTaskTitle}
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

