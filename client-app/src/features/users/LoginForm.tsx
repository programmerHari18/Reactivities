import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm(){
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{email: '', password:'', error : null}}
            onSubmit={(values, {setErrors}) => userStore.login(values)
                .catch(() => setErrors({error: 'Invalid Email or Password'}))}
            >
                {({handleSubmit, isSubmitting,errors }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Header as='h2' content='Login to Reactivites' color="teal" textAlign="center"/>
                        <MyTextInput placeholder="Email" name="email" />
                        <MyTextInput placeholder="Passsword" name="password" type="Password" />
                        <ErrorMessage 
                        name="error" render={() =>
                         <Label style={{marginBotton: 10}} basic color="red" content={errors.error} />}
                        />
                        <Button loading={isSubmitting}positive content="Login" type="submit" fluid />
                    </Form>
                )}

        </Formik>
    )
})