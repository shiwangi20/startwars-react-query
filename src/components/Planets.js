import {useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Planet from './Planet';

const fetchPlanets = async ({queryKey}) => {
    const [_key, page] = queryKey;
    console.log(page);
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {

    const [page, setPage] = useState(1);

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
      } = useQuery(['planets',page],fetchPlanets, { keepPreviousData : true });

    return ( 
        <div>
            <h2>Planets</h2>
            
            {isLoading ? 
                <div>Loading...</div> :
            isError ? 
                <div>Error fetching data</div> :
            (
                <>
                    <button 
                        onClick={() => setPage(old => Math.max(old-1, 1))}
                        disabled={page === 1}>Previous</button>
                    <span>{page}</span>
                    <button 
                        onClick={() => setPage(old => data.next ? old+1 : old)}
                        disabled={isPreviousData || !data.next}>Next</button>
                    <div>
                        { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
                    </div>
                </>
            )}
        </div>
     );
}

const queryClient = new QueryClient();

export default function Wrapped() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
          <Planets />
        </QueryClientProvider>
      )
}