import gql from 'graphql-tag';

export default gql`
  query GuestLists($eventId: String) {
    event(id: $eventId) {
      id
      start

      guestLists {
        id
        eventId
        name
        privacy
        limit
        registrationDeadline
        entranceDeadline
        socialIntegrations { mediaUrl }
        invitations {
          id
          name
          eventId
          guestListId
        }
      }
    }
  }
`;

export const createGuestListMutation = gql`
mutation CreateGuestList(
  $eventId: String!,
  $name: String,
  $registrationDeadline: Date,
  $entranceDeadline: Date,
  $socialIntegrations: [SocialIntegrationInputType],
) {
  createGuestList(
    eventId: $eventId,
    name: $name,
    registrationDeadline: $registrationDeadline,
    entranceDeadline: $entranceDeadline,
    socialIntegrations: $socialIntegrations,
  ) {
    id
    eventId
    name
    privacy
    limit
    registrationDeadline
    entranceDeadline
    socialIntegrations { mediaUrl }
    invitations {
      id
      name
      eventId
      guestListId
    }
  }
  }
`;

export const updateGuestListMutation = gql`
  mutation UpdateGuestList(
    $eventId: String!,
    $guestListId: String!,
    $patch: GuestListPatchInputType!
  ) {
    updateGuestList(eventId: $eventId, guestListId: $guestListId, patch: $patch)
  }
`;

export const removeGuestListMutation = gql`
  mutation RemoveGuestList($eventId: String!, $guestListId: String!) {
    removeGuestList(eventId: $eventId, guestListId: $guestListId)
  }
`;

export const addNamesToGuestListMutation = gql`
  mutation AddNamesToGuestList(
    $eventId: String!,
    $guestListId: String!,
    $names: [String],
  ) {
    addNamesToGuestList(
      eventId: $eventId,
      guestListId: $guestListId,
      names: $names,
    ) {
      id
      name
      eventId
      guestListId
    }
  }
`;

export const removeInvitationMutation = gql`
  mutation RemoveInvitation($eventId: String!, $invitationId: String!) {
    removeInvitation(eventId: $eventId, invitationId: $invitationId)
  }
`;
