import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton, Popover } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedSlot } from '../../store/slices/visitSlice';
import { busySlotsSelector, selectedSlotSelector } from '../../store/slices/visitSlice';
import { TIME_SLOTS } from './const';
import { Slot, StyledBox, Wrapper } from './styled';

export const TimeSlots = () => {
  const dispatch = useAppDispatch();
  const busySlots = new Set(useAppSelector(busySlotsSelector));
  const selectedSlot = useAppSelector(selectedSlotSelector);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [hours, minutes] = selectedSlot ? selectedSlot.split(':') : [];
  console.log(selectedSlot);

  const handleTimeFieldChange = debounce((newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const newTime = newValue.format('HH:mm');
      dispatch(setSelectedSlot(newTime));
    }
  }, 150);

  const handleSelectSlot = (slot: string) => () => {
    dispatch(setSelectedSlot(slot));
    setAnchorEl(null);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Wrapper>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledBox>
          {TIME_SLOTS.map((slot, i) => (
            <Slot
              key={i}
              type="button"
              variant="outlined"
              disabled={busySlots?.has(slot) || !busySlots}
              onClick={handleSelectSlot(slot)}
              className={selectedSlot === slot ? 'selected' : ''}
            >
              {slot}
            </Slot>
          ))}
        </StyledBox>
      </Popover>
      <TimeField
        label="Введите время посещения"
        variant="outlined"
        format="HH:mm"
        value={dayjs(new Date()).hour(+hours).minute(+minutes)}
        onChange={(e) => handleTimeFieldChange(e)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleOpenPopover}>
              <AccessTimeIcon />
            </IconButton>
          ),
        }}
      />
    </Wrapper>
  );
};

export default TimeSlots;
