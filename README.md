# Raider-Content-Manager
Spreadsheet with web-app for Content Managing Raids per Guild. 

## Purpose
Share spreadsheet with Editors.
Editors can and should do:
- Prepare and modify strategies
- Assign RoleIds or ClassRoleIds (depending on Role and Class + Role from Raid-Helper service).
- Add/Update/Remove images to be presented in the web-presentation of encounter.
- Add/Update/Remove raid notes (see MRT Raid Note documentation on how to make personal notes per player). 
Using the assignment part you can automaticly assign a player a personal Note depending on the RoleId or ClassRoleId that player was given from the Raid-Helper import.

Viewers:
Can pass a Guild Name, see list of raid dates (received from Raid-Helper when the raid is planned).
Selecting a raid will load a Dynamic menu with Encounters.
Opting a Encounter will load that encounters strategies, describing images for the encounter and how to over come it.
Abilities of the encounter.
General strategy (shared as "General Notes" in MRT)
Assignments will show Personal Notes for the Assignee (along with timers). Raid Leader decides what to import, Player only needs the MRT addon and WA to track timers.

## Application
Using backend to load data and store in the Guilds Raid Sheet, the idea is that Raids are a Templates.
Each encounter creates a new sheet for that raid date, applying the raid encounter ontop of the import data and setting up assignments with parsing "Template Personal Notes" so they are ready for import.
By adding additional Templates you could create a 25 man Template, 10 man Template or an entirely new Raid.

When saving a RaidId you choose from a dropdown which Raid your going for.
You can save several Raids on the same RaidId, though not Duplicates of the same Raid. 
Ulduar and ICC would work but not Ulduar and Ulduar as that would make an attempt at creating 2 sheets with the same name and Id.

### Famous Last words...
None...
This is a concept... lets see if it is doable.
