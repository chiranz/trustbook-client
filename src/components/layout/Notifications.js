// Module Imports
import React, { useState, Fragment } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";

// MUI imports
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import { markNotificationsRead } from "../../redux/actions/userActions";

export default function Notifications() {
  dayjs.extend(relativeTime);

  const { notifications } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const onMenuOpened = () => {
    let unreadNotificationIds = notifications
      .filter((notf) => !notf.read)
      .map((notf) => notf.notificationsId);
    if (unreadNotificationIds.length) {
      dispatch(markNotificationsRead(unreadNotificationIds));
    }
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    const notificationCount = notifications.filter(
      (notification) => notification.read === false
    ).length;
    notificationCount
      ? (notificationIcon = (
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === "like" ? "liked" : "commented on";
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? "primary" : "secondary";
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: "10px" }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: "10px" }} />
          );
        return (
          <MenuItem
            key={notification.createdAt}
            onClick={() => setAnchorEl(null)}
          >
            {icon}
            <Typography
              color="primary"
              component={Link}
              to={`/user/${notification.recipient}/scream/${notification.screamId}`}
            >
              {notification.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={() => setAnchorEl(null)}>
        You have no notifications yet.
      </MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.target)}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}
