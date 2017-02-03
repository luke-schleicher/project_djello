- login screen (devise)
- auth for all other pages

Users
- profile photo (placeholder)

Boards
- x:x user
- can be changed from dropdown
- delete board link
- add board link
- has many lists
  - add list link
- model
  - id
  - title

Lists
- has many cards
  - add card link
- model
  - id
  - title
  - description
  - board id
  - card priority: '3, 2, 15'?

Cards
- model
  - id
  - title
  - description
  - priority/order: int?
  - list id (repeated data?)
  - completed_at (date)
- x:x members
- activity log (email)
- clickable in modal
- has many activities

Activities
- model:
  - user
  - card id

  - activity info
    - 'deleted card 'cardname''
    - 'added card 'cardname''
    - 'changed card to 'cardname''

  - activity type(str?):
    - modification title
    - deleted card
    - added card
  - modification itself
    - new title 'something'

Other
- edit in place, one field active at a time
- activity log

States
- static_page
  - SPA (root state)
    - nav (view)
    - workspace (view)
      - header: add, select, delete board, title (editable view)
      - repeat of lists (view)
        - header: title, description (editable view)
        - repeat of cards (view)
          - modal
  - card modal (editable)
    - title (editable)
    - description (editable)
    - members (view, dropdown)
    - activity
