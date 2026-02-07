# Implementation Plan: Community Nade Submissions & Review System

This plan outlines the steps to allow users to submit grenade lineups and for admins to review them before they are published.

## Phase 1: Data Model Update
- [ ] **Status Field**: Add a `status` property to the tutorial object (`pending`, `approved`).
- [ ] **Migration**: Update the central `DataContext.jsx` to ensure all existing grenade data is marked as `approved` by default.
- [ ] **Filtering Logic**: Modify `DataContext` and `MapDetail.jsx` to only display `approved` grenades in the public view.

## Phase 2: Refactoring the Submission Form
- [ ] **Public Route**: Create a new route `/submit-nade` accessible to all users.
- [ ] **Simplified Form**: Refactor `GrenadeForm.jsx` (or create a wrapper) that allows public users to fill in details.
- [ ] **Submission logic**: On submit, the grenade is added to the database with `status: 'pending'`. 
- [ ] **Feedback UI**: Add a success state/page: "Thank you! Your submission is in the review queue."

## Phase 3: Admin Review Dashboard
- [ ] **Review Interface**: Create a new page `/admin/review` (only for admins).
- [ ] **Queue Display**: List all grenades with a `pending` status.
- [ ] **Action Controls**:
    - **Approve**: Updates status to `approved`, making it live.
    - **Edit**: Allows admins to fix descriptions or coordinates before approving.
    - **Reject/Delete**: Removes the submission from the queue.

## Phase 4: UI/UX Integration
- [ ] **Header/Sidebar Update**: Link the "+ Submit nade" button in the sidebar and navigation to the new submission form.
- [ ] **Admin Notifications**: Add a small badge to the "Admin" link if there are pending submissions in the queue.

## Considerations for Multi-User Environment
*Note: Since the app currently uses `localStorage`, submissions will only be visible to the user who submitted them. To make this work across different users, we will eventually need to integrate a backend (e.g., Supabase or Firebase).*
