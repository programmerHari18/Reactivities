import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props{
    setEditMode : (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditMode}: Props){
    const {profileStore:{profile, updateProfile}} = useStore();
    return (
        <Formik 
                initialValues={{displayName : profile?.displayName, bio: profile?.bio}}
                onSubmit={values => updateProfile(values).then(
                    () => {
                        setEditMode(false);
                    }
                )}
                validationSchema={Yup.object({
                    displayName: Yup.string().required('Display Name is required'),
                })}
            >
                {({  isValid, dirty, isSubmitting }) => (
                    <Form className='ui form' >
                        <MyTextInput name="displayName" placeholder="Display name" />
                        <MyTextArea rows={3}name='bio' placeholder='Add your Bio' />
                        <Button 
                        disabled={ !dirty || !isValid}
                        loading={isSubmitting}
                        floated="right" positive type="submit" content="Update Profile" />
                    </Form>
                )}
            </Formik>
    )
})