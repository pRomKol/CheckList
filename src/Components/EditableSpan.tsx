import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    let [editMode, setEditMod] = useState(false)
    let [inputTitle, setInputTitle] = useState('')
    const  activateEditMode = () => {
        setEditMod(true)
        setInputTitle(props.title)
    }

    const  activateViewMode = () => {
        setEditMod(false)
        props.onChange(inputTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value)
    return (
        editMode ? <input type="text" value={inputTitle} onBlur={ activateViewMode } onChange={onChangeHandler} autoFocus /> : <span onDoubleClick={activateEditMode}> {props.title}</span>
    )
}