import {useForm, useField, splitFormProps} from "react-form";
import {forwardRef, Component} from "react";

const InputField = forwardRef((props, ref) => {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: {error, isTouched, isValidating},
        getInputProps
    } = useField(field, fieldOptions);

    // Build the field
    return (
        <>
            <input {...getInputProps({ref, ...rest})} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    );
});

function CorpForm(props) {
    const {
        Form,
        meta: {isSubmitting, canSubmit}
    } = useForm({
        onSubmit: async (values, instance) => {
            // onSubmit (and everything else in React Form)
            // has async support out-of-the-box
            await sendToFakeServer(values);
            console.log("Huzzah!");
        },
        debugForm: true
    });
}

export default CorpForm;
