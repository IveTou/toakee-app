export const mapGuestListToInvitations =
  guestList => guestList.invitations.map(i => ({ ...i, guestList }));
