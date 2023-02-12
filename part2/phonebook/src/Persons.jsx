const Persons = ({persons, filter}) => {
    return ( 
        <>
           {
             persons
               .filter(person => filter.test(person.name.toLowerCase()))
               .map(person => <p key={person.id}>{person.name} {person.number}</p>)
           }
        </>
     );
}
 
export default Persons;