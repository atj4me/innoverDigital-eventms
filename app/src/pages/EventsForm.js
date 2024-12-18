import { Field, Fieldset, Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react"
import { NavigationButton } from "components/ui/NavigationButton"
import { confirmAlert, errorAlert, successAlert, warningAlert } from "components/ui/SweetAlert"
import React, { useEffect } from "react"
import { addEvent } from "../services/eventService"

export const EventsForm = () => {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const submitHandler = async (event) => {
        event.preventDefault();

        // Create FormData from the form submission
        const formData = new FormData(event.target);

        // Convert FormData to a plain object
        const data = Object.fromEntries(formData);

        // Validation
        if (data.event_title === "" || data.event_description === "" || data.event_start === "" || data.event_end === "") {
            errorAlert("Error", "Please fill in all the fields.");
            return;
        }

        if (data.event_start > data.event_end) {
            errorAlert("Date Range is invalid", "Event cannot start after the end date");
            return;
        }
        // Create a JSON object from the form data
        const jsonData = {
            // id: data.event_id,
            title: data.event_title,
            description: data.event_description,
            startDate: data.event_start,
            endDate: data.event_end
        };

        try {
            // Pass jsonData to the addEvent function
            setLoading(true);

            const confirmation = await confirmAlert("Are you sure you want to add this event?", `${jsonData.title} will be added and cannot be removed.`, "Yes", "Cancel");
            if (confirmation.isConfirmed) {
                const response = await addEvent(jsonData);
                if (response.success === true) {
                    successAlert("Event added successfully!", response?.message);
                    event.target.reset();
                } else {
                    setError(response.message);
                }
            }
            else {
                warningAlert("Cancelled", "Event not added");
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            errorAlert("Error", error);
        }
    }, [error]);

    return (
        <Flex 
        p={5} 
        bg="white" 
        borderRadius="md" 
        boxShadow="lg" 
        width="50%" 
        margin="0 auto" 
        justifyContent="center" 
        flexDirection="column"
        alignItems="Center" >
            <Heading size="3xl" color="teal.500" textAlign="center" paddingY={10}>
                Add a new event
            </Heading>
            <Fieldset.Root size="lg" maxW="md">
                <Stack>
                    <Fieldset.Legend>Event details</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Please provide the event details below.
                    </Fieldset.HelperText>
                </Stack>

                <form method="post" action="" onSubmit={submitHandler}>

                    <Fieldset.Content>

                        <Field.Root>
                            <Field.Label>Event Start</Field.Label>
                            <Input type="date" name="event_start" />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Event End</Field.Label>
                            <Input type="date" name="event_end" />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Event Title</Field.Label>
                            <Input name="event_title" placeholder="Event Title*" required />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Event Description</Field.Label>
                            <Textarea rows={15} name="event_description" placeholder="Event Description*" required />
                        </Field.Root>

                    </Fieldset.Content>

                    <Flex marginTop={10} paddingBottom={10}
                        justifyContent="space-between">

                        <NavigationButton
                            buttonType="button"
                            buttonText="Back"
                            showIcon="left"
                            colorScheme="red"
                            loading={loading}
                            path="/events" />
                            
                        <NavigationButton
                            buttonType="submit"
                            buttonText="Add Event"
                            showIcon="calendarLeft"
                            colorScheme="gray"
                            loading={loading} />

                        <NavigationButton
                            buttonType="reset"
                            buttonText="Cancel"
                            showIcon=""
                            colorScheme="red"
                            loading={loading} />
                    </Flex>

                </form>
            </Fieldset.Root>
        </Flex>
    )
}