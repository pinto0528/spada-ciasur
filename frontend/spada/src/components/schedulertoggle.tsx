import React, { useState } from 'react';

interface SchedulerToggleProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
}

const SchedulerToggle: React.FC<SchedulerToggleProps> = ({ onStart, onStop, isRunning }) => {
  const [isChecked, setIsChecked] = useState(isRunning);

  const handleChange = async () => {
    if (isChecked) {
      await onStop();
    } else {
      await onStart();
    }
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        Auto-download Data:
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        {isChecked ? ' Running' : ' Stopped'}
      </label>
    </div>
  );
};

export default SchedulerToggle;