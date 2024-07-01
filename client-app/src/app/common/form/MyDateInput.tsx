import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-date-picker';

export default function MyDateInput(props: any) {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...props}
                value={field.value || null}
                onChange={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}
