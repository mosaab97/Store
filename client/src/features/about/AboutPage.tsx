import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import server from '../../app/server/server';

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationError = () => {
        server.TestErrors.get400VlidationError()
            .then(() => console.log('should not see this!'))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant={'h2'}>Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button onClick={() => server.TestErrors.get500().catch(error => console.log(error))} variant={'contained'}>Test 500 error</Button>
                <Button onClick={() => server.TestErrors.get404().catch(error => console.log(error))} variant={'contained'}>Test 404 error</Button>
                <Button onClick={() => server.TestErrors.get400().catch(error => console.log(error))} variant={'contained'}>Test 400 error</Button>
                <Button onClick={getValidationError} variant={'contained'}>Test 400 validation
                    error</Button>
                <Button onClick={() => server.TestErrors.get401().catch(error => console.log(error))} variant={'contained'}>Test 401 error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
        </Container>
    )
}