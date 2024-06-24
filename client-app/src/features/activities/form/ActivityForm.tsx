import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {  ActivityFormValues } from "../../../app/models/Activity";
import {v4 as uuid} from 'uuid'; 

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { loadActivity, loadingInitial,createActivity,updateActivity } = activityStore;
    const { id } = useParams();

    // Initial state for the activity form
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    // Yup validation schema
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    });
    function handleFormSubmit(activity: ActivityFormValues){
        if(!activity.id){
            const newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    // useEffect to load activity if id is present
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
    }, [id, loadActivity]);

    // Show loading component if initial data is being loaded
    if (loadingInitial) return <LoadingComponent content="Loading Activities ..." />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color = 'teal' />
            <Formik 
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3}name='description' placeholder='Description' />
                        <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
                        <MyDateInput name='date' 
                        showTimeSelect placeholderText="Date"
                        dateFormat='MMMM d,yyyy h:mm aa' />
                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput name='city' placeholder='City' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to={`/activities/`} floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});
