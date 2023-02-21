import { createFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        let value = event.target.value
        dispatch(createFilter(value))
    }

    return ( 
      <div>
        filter <input name='filter' onChange={create}/>
        <hr/>
      </div>
     );
}
 
export default Filter;