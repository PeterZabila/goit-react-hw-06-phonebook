import { Label, Input, MainTitle } from '../Main.styled';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';

export default function Filter () {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setFilter(value));
  }

    return (
        <div>
          <Label htmlFor="filter">
             <MainTitle>Find contacts by name</MainTitle>
             <Input 
                type="text" 
                name="filter"
                value={filter} 
                onChange={handleChange}
                placeholder="Filter contacts"
            />
          </Label>
        </div>
     ) 
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}