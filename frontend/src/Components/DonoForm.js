import {useForm, useField, splitFormProps} from "react-form";
import {forwardRef, Component} from "react";

function required(value) {
    if (!value) {
        return "This field is required.";
    }

    return false;
}

const InputField = forwardRef((props, ref) => {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    fieldOptions.validatePristine = true;

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: {error, isTouched, isValidating},
        getInputProps
    } = useField(field, fieldOptions);

    let InputTag = "input"
    if (props.textarea) {
        InputTag = "textarea"
    }

    // Build the field
    return (
        <>
            <InputTag {...getInputProps({ref, ...rest})} />{" "}
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    );
});

function DonoForm(props) {
    const {
        Form,
        meta: {isSubmitting, canSubmit},
        values
    } = useForm({
        onSubmit: async (values, instance) => {

        },
        //debugForm: true
    });

    if (props.onChange) {
        props.onChange(canSubmit, values);
    }


    return <Form>
        <div className="form">
            <div>
                <label>Full Name*</label>
                <InputField field="contact.name" validate={required}/>
            </div>
            <div>
                <label>Email*</label>
                <InputField field="contact.email" validate={required}/>
            </div>
            <div>
                <label>Message</label>
                <InputField textarea field="message.message"/>
            </div>
        </div>
    </Form>
}

export default DonoForm;
