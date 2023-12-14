import { AnnouncementRounded, NotificationImportant, NotificationsRounded } from '@mui/icons-material';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Popover } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../api/notification/notificationApi';
import { prepareNotificationText } from '../../components/Layout/helpers';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/slices/authSlice';
import { theme } from '../../styles/theme';

export const NotificationList = () => {
  const user = useAppSelector(userSelector);
  const { data: notifications } = useGetNotificationsQuery({ id: user?.id || 0 }, { skip: !user });
  const [markAsRead] = useMarkAsReadMutation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const ids = notifications?.data.map((item) => item.id);
    ids?.length && markAsRead({ body: { ids: ids } });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notificationList' : undefined;

  const unviewedNotifications = React.useMemo(
    () => notifications?.data.filter((item) => item.isViewed === false),
    [notifications]
  );

  return (
    <>
      <IconButton onClick={handleClick}>
        {unviewedNotifications?.length ? (
          <NotificationImportant sx={{ fill: theme.palette.error.light }} />
        ) : (
          <NotificationsRounded />
        )}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {notifications?.data.length ? (
            notifications.data.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AnnouncementRounded />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={prepareNotificationText(JSON.stringify(item))}
                  secondary={dayjs(item.createdAt).format(' DD MMM  HH:mm')}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Нет уведомлений" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};
