import { useState } from "react";

export default function useForm (initial = {}) {
    //Create a state object for our inputs

    const [inputs, setInputs] = useState(initial);

    

    function handleChange(e) {
        let {value,name,type} = e.target
        
        if(type === 'number') {
            value = parseInt(value)
        }

        if(type==='file') {
            [value] = e.target.files;
        }

        setInputs({
            ...inputs, //Copy existing state
            [name]:value,
        })
    }

    function resetForm(){
        setInputs(initial);
    }

    function clearForm(){
    //object.entries converts the existing objects into array
        const blankState =Object.fromEntries(Object.entries(inputs).map(([key,value]) => [key,'']))
        setInputs(blankState)
    }
    //Return the things we want to surface from the custom hooks
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }

}