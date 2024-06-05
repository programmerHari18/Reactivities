import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { ChangeEvent, useState } from "react";
interface Props{
    closeForm:() => void;
    activity: Activity | undefined;
    createOrEdit: (activity : Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({submitting,createOrEdit,closeForm,activity: selectedActivity} : Props){
    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        category: "",
        description: "",
        date:"",
        city:"",
        venue:""
    }
    const [activity, setActivity] = useState(initialState);
    function handleSubmit(){
        createOrEdit(activity);
    }

    function handleImputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' onChange = {handleImputChange}>
                <Form.Input placeholder='Title' value = {activity.title} name='title'/>
                <Form.Input placeholder='Description' value={activity.description} name='description'/>
                <Form.Input placeholder='Category' value={activity.category} name='category'/>
                <Form.Input type='Date'placeholder='Date' value={activity.date} name='date'/>
                <Form.Input placeholder='City' value={activity.city} name='city'/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue'/>
                <Button loading={submitting}floated="right" positive type="submit" content="Submit" />
                <Button floated="right" onClick={closeForm}type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}