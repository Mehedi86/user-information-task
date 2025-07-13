import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';

const Form = () => {
    const [fields, setFields] = useState([
        { inputText: '', selectedOption: '', inputError: false, selectError: false },
    ]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (index, value) => {
        const newFields = [...fields];
        newFields[index].inputText = value;
        newFields[index].inputError = false;
        setFields(newFields);
    };

    const handleSelectChange = (index, value) => {
        const newFields = [...fields];
        newFields[index].selectedOption = value;
        newFields[index].selectError = false;
        setFields(newFields);
    };

    const addField = () => {
        setFields([
            ...fields,
            { inputText: '', selectedOption: '', inputError: false, selectError: false },
        ]);
    };

    const removeField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const updatedFields = fields.map((field) => ({
            ...field,
            inputError: field.inputText.trim() === '',
            selectError: field.selectedOption.trim() === '',
        }));

        setFields(updatedFields);

        const allValid = updatedFields.every(
            (field) => !field.inputError && !field.selectError
        );

        setFormSubmitted(allValid);

        if (allValid) {
            console.log('Submitted Form Data:', updatedFields);
        }
    };

    return (
        <div className="w-full max-w-3xl p-6 border shadow rounded space-y-6 bg-white">
            <h1 className="text-2xl font-semibold text-center">User Information Form</h1>

            <form onSubmit={submitHandler} className="space-y-4">
                {fields.map((field, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
                    >
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-[250px]"
                                value={field.inputText}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                            {field.inputError && (
                                <p className="text-red-600 text-sm">Please fill up this section</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <select
                                className="select select-bordered w-[200px] text-gray-700"
                                value={field.selectedOption}
                                onChange={(e) => handleSelectChange(index, e.target.value)}
                            >
                                <option value="">Select an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {field.selectError && (
                                <p className="text-red-600 text-sm">Please select an option</p>
                            )}
                        </div>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="btn btn-error btn-sm"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={addField}
                        className="btn btn-outline btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Field
                    </button>
                    <button type="submit" className="btn btn-neutral">
                        Submit
                    </button>
                </div>
            </form>

            {/* Always show raw state */}
            <div>
                <h3 className="text-xl font-semibold mt-6">What we get (Form State):</h3>
                <div className="text-sm space-y-2">
                    {fields.map((field, index) => (
                        <div key={index} className="border p-2 rounded">
                            <p><strong>Input:</strong> {field.inputText}</p>
                            <p><strong>Selected:</strong> {field.selectedOption}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Show table view only after successful submit */}
            {formSubmitted && (
                <div>
                    <h3 className="text-xl font-semibold mt-6">Your Submitted information</h3>
                    <div className="overflow-x-auto mt-2">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Input</th>
                                    <th>Selected Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((field, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{field.inputText}</td>
                                        <td>{field.selectedOption}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
