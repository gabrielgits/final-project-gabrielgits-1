import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetails from '../components/Daily/NoteDetails';
import AddNotes from '../components/Daily/AddNotes';
import EditNotes from '../components/Daily/EditNotes';
import NoteList from '../components/Daily/NoteList';

const Stack = createNativeStackNavigator();
export default function DailyScreen() {

    return (
        <Stack.Navigator >
            <Stack.Screen name="notelist" component={NoteList} />
            <Stack.Screen name="addnote" component={AddNotes} options={{ title: 'Add Notes' }} />
            <Stack.Screen name="editnote" component={EditNotes} options={{ title: 'Edit Notes'}} />
            <Stack.Screen name="notedetails" component={NoteDetails} options={{ title: 'Note Details'}} />
        </Stack.Navigator>
    );
}