import Button from "@material-ui/core/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type FullInputPropsType = {
    addItem: (title: string) => void
}


export const FullInput = (props: FullInputPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode) {
            if (newTaskTitle.trim() !== '') {
                props.addItem(newTaskTitle.trim());
                setNewTaskTitle('')
            } else {
                setError('Title is required')
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim(),);
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }
    const styles =
        {
            maxWidth: '38px',
            minWidth: '38px',
            maxHeight: '38px',
            minHeight: '38px',
            marginLeft: '5px'
        }
    return (
        <div>
            <TextField
                error={!!error}
                size="small"
                id="outlined-basic"
                label={error ? error : 'Add'}
                variant="outlined"
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}/>
            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}/>*/}

            <Button style={styles} size="small" variant="contained" onClick={addTask}>+</Button>

        </div>
    );
};

