# Admin Authentication — User Stories

## Overview
A password gate protects the Agency HQ leads panel so that only authorized Smart Maids ZW personnel can view or manage employer inquiries and academy applications.

---

### Story 1: Password-protected Admin Access
**As** an agency owner  
**I want** to access the admin panel by entering a password  
**So that** only authorized personnel can view and manage leads.

**Acceptance Criteria:**
- Navigating to the admin tab shows a password prompt instead of the data panel
- The correct password (`VITE_ADMIN_PASSWORD` env var, fallback `smadmin2024`) unlocks access
- An incorrect password shows a clear error message: "Incorrect password. Please try again."
- The password input has a show/hide toggle

---

### Story 2: Session-persistent Authentication
**As** an agency owner  
**I want** my authenticated session to persist across page navigations within the tab  
**So that** I don't have to re-enter the password repeatedly during a work session.

**Acceptance Criteria:**
- Authentication state is stored in `sessionStorage`
- Navigating between landing/academy/admin tabs does not re-prompt for password
- Refreshing the page does not clear the session
- Closing the browser tab clears the session (automatic lock)

---

### Story 3: Manual Lock Panel
**As** an agency owner  
**I want** a "Lock Panel" button visible while authenticated  
**So that** I can manually lock the panel when stepping away from my computer.

**Acceptance Criteria:**
- A small "Lock Panel" button appears in the bottom-left corner when authenticated
- Clicking it clears the session and returns to the password prompt
- The button is semi-transparent by default and becomes fully visible on hover

---

### Story 4: Invisible to Public Users
**As** a site visitor (job seeker or employer)  
**I want** no admin functionality or data exposed in the UI  
**So that** my browsing experience is clean and focused on placement and training services.

**Acceptance Criteria:**
- The admin tab link is still visible in the footer (navigable)
- Without authentication, no booking or application data is rendered
- The password prompt is the only UI shown for the admin route

---

### Story 5: Configurable Password
**As** an agency owner  
**I want** to change the admin password via an environment variable  
**So that** I can rotate credentials without modifying application code.

**Acceptance Criteria:**
- Password is read from `VITE_ADMIN_PASSWORD` in `.env.local`
- If the env var is not set, a secure fallback password is used
- Password can be updated by editing `.env.local` and redeploying
