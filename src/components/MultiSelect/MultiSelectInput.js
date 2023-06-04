import React, { useState } from 'react';
import MultiSelect from 'react-select';
import { Label } from 'reactstrap';

const options = [
  { value: 'chocolate', label: 'Student' },
  { value: 'strawberry', label: 'Working part-time' },
  { value: 'vanilla', label: 'Working full-time' },
  { value: 'vanilla', label: 'Fresh graduate' },
];

const MultiSelectInput = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
    <Label>Current Occupation </Label>
      <MultiSelect
        defaultValue={selectedOption} 
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </div>
  );
}
export default MultiSelectInput