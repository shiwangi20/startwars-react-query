import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
    const res = await fetch('https://swapi.dev/api/people/');
    return res.json();
}

const People = () => {
    const {status, data} = useQuery('People',fetchPeople);
    console.log(data);
    return ( 
        <div>
            <h2>People</h2>

            {status === 'loading' && <div>Loading data</div>}

            {status === 'error' && <div>Error in fetching data</div>}

            {status === 'success' && <div>{data['results'].map(person => <Person key={person.name} person={person}/>)}</div>}
        </div>
     );
}

const queryClient = new QueryClient();

const PeopleWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <People />
        </QueryClientProvider>
    )
}
 
export default PeopleWrapper;