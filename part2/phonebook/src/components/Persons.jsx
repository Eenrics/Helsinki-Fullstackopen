const Persons = ({persons, filter, handleDelete}) => {
    return ( 
        <>
           {
             persons
               .filter(person => filter.test(person.name.toLowerCase()))
               .map(person => 
                    <p key={person.id}>{person.name} {person.number} 
                        <button onClick={() => handleDelete(person.id)} >delete</button> 
                    </p>)
           }
        </>
     );
}
 
export default Persons;