import Input from "./Input";
import Button from "./Button";

const PersonForm = ({handleSubmit, newName, newNum, handleNewName, handleNewNum}) => {
    return ( 
        <form onSubmit={handleSubmit}> 
            <Input text="name" value={newName} handleChange={handleNewName} />
            <Input text="number" value={newNum} handleChange={handleNewNum} />
            <Button type="submit" text="add" />
        </form> 
     );
}
 
export default PersonForm;