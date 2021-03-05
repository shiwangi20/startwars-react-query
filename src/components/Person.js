const Person = ({person}) => {
    return ( 
        <div className="card">
            <h3>{ person.name }</h3>
            <p>Gender - { person.gender }</p>
            <p>Mass - { person.gender }</p>
        </div>
     );
}
 
export default Person;